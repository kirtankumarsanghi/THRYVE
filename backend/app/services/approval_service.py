from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.goal import Goal
from app.services import audit_service


def approve_goal(goal_id: int, comment: str, db: Session, manager_id: int = None, manager_email: str = None):
    """Approve a goal — locks it and sets approval status."""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    if goal.approval_status == "approved":
        raise HTTPException(status_code=400, detail="Goal is already approved")

    goal.approval_status = "approved"
    goal.manager_comment = comment
    goal.is_locked = True

    db.commit()
    db.refresh(goal)
    
    # Create audit log
    if manager_id:
        audit_service.log_goal_approved(
            db=db,
            user_id=manager_id,
            goal_id=goal_id,
            goal_title=goal.title,
            comment=comment,
            user_email=manager_email
        )
    
    return {
        "goal_id": goal.id,
        "approval_status": goal.approval_status,
        "is_locked": goal.is_locked,
        "message": "Goal approved and locked",
    }


def reject_goal(goal_id: int, comment: str, db: Session, manager_id: int = None, manager_email: str = None):
    """Reject a goal — keeps it editable."""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    goal.approval_status = "rejected"
    goal.manager_comment = comment
    goal.is_locked = False

    db.commit()
    db.refresh(goal)
    
    # Create audit log
    if manager_id:
        audit_service.log_goal_rejected(
            db=db,
            user_id=manager_id,
            goal_id=goal_id,
            goal_title=goal.title,
            comment=comment,
            user_email=manager_email
        )
    
    return {
        "goal_id": goal.id,
        "approval_status": goal.approval_status,
        "is_locked": goal.is_locked,
        "message": "Goal rejected — employee can edit",
    }

