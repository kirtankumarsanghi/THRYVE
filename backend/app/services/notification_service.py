from sqlalchemy.orm import Session

from app.models.goal import Goal
from app.models.checkin import Checkin
from app.models.user import User
from datetime import datetime


def _as_iso(value):
    if value is None:
        return None
    return value.isoformat()


def _goal_event_type(goal: Goal) -> str:
    status = (goal.approval_status or "pending").lower()
    if status == "approved":
        return "goal_approved"
    if status == "rejected":
        return "goal_rejected"
    return "goal_pending"


def _goal_title(event_type: str) -> str:
    if event_type == "goal_approved":
        return "Goal approved"
    if event_type == "goal_rejected":
        return "Goal rejected"
    return "Goal pending approval"


def build_notifications_for_user(db: Session, user_id: int, role: str, limit: int = 50):
    users = db.query(User).all()
    user_name_by_id = {u.id: u.full_name for u in users}

    goals_query = db.query(Goal)
    if role == "employee":
        goals_query = goals_query.filter(Goal.employee_id == user_id)
    goals = goals_query.all()
    goal_ids = [g.id for g in goals]

    checkins = []
    if goal_ids:
        checkins = db.query(Checkin).filter(Checkin.goal_id.in_(goal_ids)).all()

    notifications = []

    for goal in goals:
        event_type = _goal_event_type(goal)
        owner = user_name_by_id.get(goal.employee_id, "Employee")
        manager_note = (goal.manager_comment or "").strip()
        message = f"{owner}: {goal.title} ({goal.quarter})"
        if manager_note:
            message = f"{message}. Manager note: {manager_note}"

        notifications.append(
            {
                "id": f"goal-{goal.id}-{event_type}",
                "type": event_type,
                "title": _goal_title(event_type),
                "message": message,
                "entity_type": "goal",
                "entity_id": goal.id,
                "role_scope": role,
                "created_at": _as_iso(goal.updated_at or goal.created_at),
                "route": f"/employee/goals/{goal.id}",
                "_sort_at": goal.updated_at or goal.created_at,
            }
        )

        if goal.is_locked:
            notifications.append(
                {
                    "id": f"goal-{goal.id}-locked",
                    "type": "goal_locked",
                    "title": "Goal locked",
                    "message": f"{owner}: {goal.title} is locked by admin governance.",
                    "entity_type": "goal",
                    "entity_id": goal.id,
                    "role_scope": role,
                    "created_at": _as_iso(goal.updated_at or goal.created_at),
                    "route": f"/employee/goals/{goal.id}",
                    "_sort_at": goal.updated_at or goal.created_at,
                }
            )

    goal_lookup = {g.id: g for g in goals}
    for checkin in checkins:
        goal = goal_lookup.get(checkin.goal_id)
        if not goal:
            continue
        owner = user_name_by_id.get(goal.employee_id, "Employee")
        notifications.append(
            {
                "id": f"checkin-{checkin.id}-submitted",
                "type": "checkin_submitted",
                "title": "Check-in submitted",
                "message": f"{owner} submitted a {checkin.quarter} check-in for {goal.title}.",
                "entity_type": "checkin",
                "entity_id": checkin.id,
                "role_scope": role,
                "created_at": _as_iso(checkin.updated_at or checkin.created_at),
                "route": f"/employee/goals/{goal.id}",
                "_sort_at": checkin.updated_at or checkin.created_at,
            }
        )
        if (checkin.manager_comment or "").strip():
            notifications.append(
                {
                    "id": f"checkin-{checkin.id}-reviewed",
                    "type": "checkin_reviewed",
                    "title": "Manager feedback received",
                    "message": f"{owner}: manager reviewed check-in for {goal.title}.",
                    "entity_type": "checkin",
                    "entity_id": checkin.id,
                    "role_scope": role,
                    "created_at": _as_iso(checkin.updated_at or checkin.created_at),
                    "route": f"/employee/goals/{goal.id}",
                    "_sort_at": checkin.updated_at or checkin.created_at,
                }
            )

    notifications.sort(key=lambda item: item["_sort_at"] or datetime.min, reverse=True)
    trimmed = notifications[: max(1, min(limit, 200))]
    for item in trimmed:
        item.pop("_sort_at", None)

    return {"items": trimmed, "total": len(trimmed)}
