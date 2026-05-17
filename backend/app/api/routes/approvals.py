from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_manager
from app.services.approval_service import approve_goal, reject_goal
from app.models.user import User
from app.models.goal import Goal

router = APIRouter()


class ApprovalBody(BaseModel):
    comment: Optional[str] = ""


@router.get("/pending")
def get_pending_approvals(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    """Get all goals pending approval (manager/admin only)."""
    pending_goals = db.query(Goal).filter(Goal.approval_status == "pending").all()
    
    # Enrich with employee data
    result = []
    for goal in pending_goals:
        employee = db.query(User).filter(User.id == goal.employee_id).first()
        result.append({
            "id": goal.id,
            "title": goal.title,
            "description": goal.description,
            "strategic_area": goal.strategic_area,
            "target_value": goal.target_value,
            "weightage": goal.weightage,
            "uom_type": goal.uom_type,
            "quarter": goal.quarter,
            "status": goal.status,
            "approval_status": goal.approval_status,
            "employee_id": goal.employee_id,
            "employee_name": employee.full_name if employee else "Unknown",
            "employee_email": employee.email if employee else "Unknown",
            "department": employee.department if employee else "Unknown",
        })
    
    return result


@router.put("/{goal_id}/approve")
def approve(
    goal_id: int,
    body: ApprovalBody,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    """Approve a goal (manager/admin only). Locks the goal."""
    # Get manager email for audit log
    manager = db.query(User).filter(User.id == current_user["user_id"]).first()
    manager_email = manager.email if manager else None
    
    return approve_goal(
        goal_id, 
        body.comment, 
        db, 
        manager_id=current_user["user_id"],
        manager_email=manager_email
    )


@router.put("/{goal_id}/reject")
def reject(
    goal_id: int,
    body: ApprovalBody,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    """Reject a goal (manager/admin only). Goal stays editable."""
    # Get manager email for audit log
    manager = db.query(User).filter(User.id == current_user["user_id"]).first()
    manager_email = manager.email if manager else None
    
    return reject_goal(
        goal_id, 
        body.comment, 
        db,
        manager_id=current_user["user_id"],
        manager_email=manager_email
    )

