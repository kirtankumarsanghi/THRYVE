from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import Optional

from app.models.checkin import Checkin
from app.models.goal import Goal
from app.models.user import User
from app.schemas.checkin import CheckinCreate, CheckinUpdate
from app.utils.uom_calculator import calculate_achievement_percentage
from app.utils.quarterly_windows import CHECKIN_WINDOW_BY_QUARTER, enforce_window
from app.services import audit_service


def create_checkin(goal_id: int, data: CheckinCreate, user_id: int, db: Session, user_email: Optional[str] = None):
    """Submit a quarterly check-in and update goal progress with audit logging."""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    if goal.employee_id != user_id:
        raise HTTPException(status_code=403, detail="You do not own this goal")

    if goal.is_locked:
        raise HTTPException(status_code=400, detail="Goal is locked and cannot add check-ins")

    window_name = CHECKIN_WINDOW_BY_QUARTER.get(data.quarter)
    if window_name:
        try:
            enforce_window(window_name, db=db)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc))

    progress = calculate_achievement_percentage(
        uom_type=goal.uom_type,
        target_value=goal.target_value,
        achieved_value=data.achieved_value,
        uom_direction=goal.uom_direction,
        target_date=goal.target_date,
        completion_date=goal.completion_date,
    )

    checkin = Checkin(
        quarter=data.quarter,
        planned_value=data.planned_value,
        achieved_value=data.achieved_value,
        progress_percentage=progress,
        status=data.status or "Not Started",
        comment=data.comment,
        manager_comment="",
        goal_id=goal_id,
    )
    db.add(checkin)

    goal.achieved_value = data.achieved_value
    if progress >= 100:
        goal.status = "Completed"
    elif progress > 0:
        goal.status = "On Track"
    else:
        goal.status = "Not Started"

    db.commit()
    db.refresh(checkin)

    audit_service.log_checkin_created(
        db=db,
        user_id=user_id,
        checkin_id=checkin.id,
        goal_id=goal_id,
        progress=progress,
        user_email=user_email
    )

    return {
        "checkin_id": checkin.id,
        "progress_percentage": checkin.progress_percentage,
        "goal_status": goal.status,
        "message": "Check-in submitted successfully",
    }


def update_checkin_manager_comment(
    checkin_id: int,
    data: CheckinUpdate,
    manager_id: int,
    db: Session,
    user_email: Optional[str] = None
):
    """Manager adds comment to a check-in. Only managers can use this endpoint."""
    manager = db.query(User).filter(User.id == manager_id).first()
    if not manager or manager.role != "manager":
        raise HTTPException(status_code=403, detail="Only managers can add check-in comments")

    checkin = db.query(Checkin).filter(Checkin.id == checkin_id).first()
    if not checkin:
        raise HTTPException(status_code=404, detail="Check-in not found")

    if data.manager_comment is not None:
        reviewed_at = data.reviewed_at or datetime.utcnow().isoformat()
        checkin.manager_comment = f"[{manager.full_name} | {reviewed_at}] {data.manager_comment}".strip()

    if data.status is not None:
        checkin.status = data.status
        goal = db.query(Goal).filter(Goal.id == checkin.goal_id).first()
        if goal:
            goal.status = data.status

    db.commit()
    db.refresh(checkin)

    audit_service.log_checkin_updated(
        db=db,
        user_id=manager_id,
        checkin_id=checkin_id,
        old_data={"manager_comment": ""},
        new_data={"manager_comment": checkin.manager_comment},
        user_email=user_email
    )

    return checkin


def get_checkins_for_goal(goal_id: int, db: Session):
    """Get all check-ins for a specific goal."""
    return db.query(Checkin).filter(Checkin.goal_id == goal_id).all()

