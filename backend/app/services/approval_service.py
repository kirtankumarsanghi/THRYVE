from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.goal import Goal
from app.services import audit_service
from app.utils.validators import validate_goal_weightage


def approve_goal(
    goal_id: int,
    comment: str,
    db: Session,
    manager_id: int = None,
    manager_email: str = None,
    target_value: float | None = None,
    weightage: float | None = None,
):
    """Approve a goal, optionally applying manager inline edits, then lock it."""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    if goal.approval_status == "approved":
        raise HTTPException(status_code=400, detail="Goal is already approved")

    if target_value is not None:
        if target_value <= 0:
            raise HTTPException(status_code=400, detail="Target value must be greater than 0")
        goal.target_value = target_value

    if weightage is not None:
        validate_goal_weightage(
            db=db,
            employee_id=goal.employee_id,
            new_weightage=weightage,
            exclude_goal_id=goal.id,
        )
        goal.weightage = weightage

    employee_goals = db.query(Goal).filter(Goal.employee_id == goal.employee_id).all()
    total_weightage = sum(float(g.weightage or 0) for g in employee_goals)
    if abs(total_weightage - 100.0) > 1e-6:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot approve goal sheet until total employee goal weightage equals 100% (current: {total_weightage}%)",
        )

    goal.approval_status = "approved"
    goal.manager_comment = comment
    goal.is_locked = True

    db.commit()
    db.refresh(goal)

    if manager_id:
        audit_service.log_goal_approved(
            db=db,
            user_id=manager_id,
            goal_id=goal_id,
            goal_title=goal.title,
            comment=comment,
            user_email=manager_email,
        )

    return {
        "goal_id": goal.id,
        "approval_status": goal.approval_status,
        "is_locked": goal.is_locked,
        "message": "Goal approved and locked",
    }


def reject_goal(goal_id: int, comment: str, db: Session, manager_id: int = None, manager_email: str = None):
    """Reject a goal and keep it editable."""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    goal.approval_status = "rejected"
    goal.manager_comment = comment
    goal.is_locked = False

    db.commit()
    db.refresh(goal)

    if manager_id:
        audit_service.log_goal_rejected(
            db=db,
            user_id=manager_id,
            goal_id=goal_id,
            goal_title=goal.title,
            comment=comment,
            user_email=manager_email,
        )

    return {
        "goal_id": goal.id,
        "approval_status": goal.approval_status,
        "is_locked": goal.is_locked,
        "message": "Goal rejected - employee can edit",
    }
