from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Session

from app.models.checkin import Checkin
from app.models.escalation import EscalationLog
from app.models.goal import Goal
from app.models.user import User
from app.services.notification_service import send_escalation_notifications_stub
from app.utils.quarterly_windows import CHECKIN_WINDOW_BY_QUARTER, _window_dates, is_window_active


GOAL_SUBMISSION_DAYS = 3
GOAL_APPROVAL_DAYS = 3
CHECKIN_COMPLETION_DAYS = 2


def _manager_emails_for_department(db: Session, department: Optional[str]) -> list[str]:
    if not department:
        return []
    managers = (
        db.query(User)
        .filter(User.role == "manager", User.status == "active", User.department == department)
        .all()
    )
    return [m.email for m in managers if m.email]


def _hr_emails(db: Session) -> list[str]:
    admins = db.query(User).filter(User.role == "admin", User.status == "active").all()
    return [a.email for a in admins if a.email]


def _upsert_open_escalation(
    db: Session,
    *,
    rule_type: str,
    entity_type: str,
    entity_id: int,
    level: int,
    recipient_role: str,
    recipient_emails: list[str],
    message: str,
) -> tuple[EscalationLog, bool]:
    existing = (
        db.query(EscalationLog)
        .filter(
            EscalationLog.rule_type == rule_type,
            EscalationLog.entity_type == entity_type,
            EscalationLog.entity_id == entity_id,
            EscalationLog.level == level,
            EscalationLog.status == "open",
        )
        .first()
    )
    email_csv = ",".join(sorted(set(recipient_emails)))
    if existing:
        existing.recipient_emails = email_csv
        existing.message = message
        return existing, False

    row = EscalationLog(
        rule_type=rule_type,
        entity_type=entity_type,
        entity_id=entity_id,
        level=level,
        status="open",
        recipient_role=recipient_role,
        recipient_emails=email_csv,
        message=message,
    )
    db.add(row)
    return row, True


def _escalation_level(days_late: int, base_days: int) -> int:
    if days_late >= base_days + 4:
        return 3
    if days_late >= base_days + 2:
        return 2
    return 1


def run_escalation_scan(
    db: Session,
    now: Optional[datetime] = None,
    actor_user_id: int = 1,
    actor_user_email: Optional[str] = None,
) -> dict:
    current = now or datetime.utcnow()
    created = 0
    touched = 0

    phase_start, _ = _window_dates("Phase 1 - Goal Setting", current.year, db)
    days_since_phase_open = (current.date() - phase_start).days
    if is_window_active("Phase 1 - Goal Setting", current.date(), db) and days_since_phase_open >= GOAL_SUBMISSION_DAYS:
        employees = db.query(User).filter(User.role == "employee", User.status == "active").all()
        for employee in employees:
            has_goals = db.query(Goal).filter(Goal.employee_id == employee.id).first() is not None
            if has_goals:
                continue
            level = _escalation_level(days_since_phase_open, GOAL_SUBMISSION_DAYS)
            if level == 1:
                recipients = [employee.email] if employee.email else []
                role = "employee"
            elif level == 2:
                recipients = _manager_emails_for_department(db, employee.department)
                role = "manager"
            else:
                recipients = _hr_emails(db)
                role = "hr"
            row, is_new = _upsert_open_escalation(
                db,
                rule_type="goal_submission_delay",
                entity_type="user",
                entity_id=employee.id,
                level=level,
                recipient_role=role,
                recipient_emails=recipients,
                message=f"{employee.full_name} has not submitted goals {days_since_phase_open} days after cycle open.",
            )
            touched += 1
            if is_new:
                created += 1

    pending_goals = db.query(Goal).filter(Goal.approval_status == "pending").all()
    for goal in pending_goals:
        if not goal.created_at:
            continue
        days_pending = (current - goal.created_at).days
        if days_pending < GOAL_APPROVAL_DAYS:
            continue
        owner = db.query(User).filter(User.id == goal.employee_id).first()
        level = _escalation_level(days_pending, GOAL_APPROVAL_DAYS)
        if level == 1:
            recipients = _manager_emails_for_department(db, owner.department if owner else None)
            role = "manager"
        elif level == 2:
            recipients = _hr_emails(db)
            role = "hr"
        else:
            recipients = _hr_emails(db)
            role = "hr"
        row, is_new = _upsert_open_escalation(
            db,
            rule_type="manager_approval_delay",
            entity_type="goal",
            entity_id=goal.id,
            level=level,
            recipient_role=role,
            recipient_emails=recipients,
            message=f"Goal #{goal.id} is pending manager approval for {days_pending} days.",
        )
        touched += 1
        if is_new:
            created += 1

    for quarter, window_name in CHECKIN_WINDOW_BY_QUARTER.items():
        if not is_window_active(window_name, current.date(), db):
            continue
        window_start, _ = _window_dates(window_name, current.year, db)
        days_since_window_open = (current.date() - window_start).days
        if days_since_window_open < CHECKIN_COMPLETION_DAYS:
            continue
        goals = db.query(Goal).filter(Goal.quarter == quarter, Goal.approval_status == "approved").all()
        for goal in goals:
            has_checkin = (
                db.query(Checkin)
                .filter(Checkin.goal_id == goal.id, Checkin.quarter == quarter)
                .first()
                is not None
            )
            if has_checkin:
                continue
            owner = db.query(User).filter(User.id == goal.employee_id).first()
            level = _escalation_level(days_since_window_open, CHECKIN_COMPLETION_DAYS)
            if level == 1:
                recipients = [owner.email] if owner and owner.email else []
                role = "employee"
            elif level == 2:
                recipients = _manager_emails_for_department(db, owner.department if owner else None)
                role = "manager"
            else:
                recipients = _hr_emails(db)
                role = "hr"
            row, is_new = _upsert_open_escalation(
                db,
                rule_type="checkin_completion_delay",
                entity_type="goal",
                entity_id=goal.id,
                level=level,
                recipient_role=role,
                recipient_emails=recipients,
                message=f"Goal #{goal.id} has no {quarter} check-in {days_since_window_open} days after window open.",
            )
            touched += 1
            if is_new:
                created += 1

    db.commit()
    if created:
        new_rows = (
            db.query(EscalationLog)
            .filter(EscalationLog.status == "open")
            .order_by(EscalationLog.created_at.desc())
            .limit(created)
            .all()
        )
        for row in new_rows:
            send_escalation_notifications_stub(
                db=db,
                escalation=row,
                actor_user_id=actor_user_id,
                actor_user_email=actor_user_email,
            )
    return {"created": created, "touched": touched}
