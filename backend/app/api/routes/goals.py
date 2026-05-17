from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.goal import GoalCreate, GoalResponse, GoalUpdate, SharedGoalCreate
from app.services.goal_service import (
    create_goal, 
    get_goals, 
    get_goal_by_id, 
    update_goal,
    create_shared_goal,
    validate_total_weightage
)
from app.models.goal import Goal
from app.models.user import User
from app.services import audit_service

router = APIRouter()


@router.post("/", response_model=GoalResponse)
def create_new_goal(
    data: GoalCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Create a new goal for the authenticated employee."""
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    user_email = user.email if user else None
    
    return create_goal(data, current_user["user_id"], db, user_email=user_email)


@router.post("/shared", response_model=dict)
def create_new_shared_goal(
    data: SharedGoalCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Create a shared goal and push to multiple employees.
    Only admin or manager can use this endpoint.
    """
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    if not user or user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Only admin or manager can create shared goals")
    
    user_email = user.email if user else None
    result = create_shared_goal(data, current_user["user_id"], db, user_email=user_email)
    
    return {
        "message": "Shared goal created successfully",
        "parent_goal_id": result["parent_goal"].id,
        "recipients_count": len(result["child_goals"]),
        "child_goal_ids": [g.id for g in result["child_goals"]]
    }


@router.get("/", response_model=List[GoalResponse])
def fetch_goals(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Get all goals for the authenticated employee."""
    return get_goals(current_user["user_id"], db)


@router.get("/validate/weightage", response_model=dict)
def validate_weightage(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Validate that total weightage equals 100% for current user."""
    return validate_total_weightage(current_user["user_id"], db)


@router.get("/{goal_id}", response_model=GoalResponse)
def fetch_goal(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Get a specific goal by ID."""
    return get_goal_by_id(goal_id, db)


@router.put("/{goal_id}", response_model=GoalResponse)
def update_existing_goal(
    goal_id: int,
    data: GoalUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Update a goal (only if not locked)."""
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    user_email = user.email if user else None
    
    return update_goal(goal_id, data, current_user["user_id"], db, user_email=user_email)


@router.delete("/{goal_id}")
def delete_goal(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Delete a goal (only if not locked and owned by user)."""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    if goal.employee_id != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="You do not own this goal")
    
    if goal.is_locked:
        raise HTTPException(status_code=400, detail="Goal is locked and cannot be deleted")
    
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    user_email = user.email if user else None
    
    audit_service.log_goal_deleted(
        db=db,
        user_id=current_user["user_id"],
        goal_id=goal_id,
        goal_title=goal.title,
        user_email=user_email
    )
    
    db.delete(goal)
    db.commit()
    
    return {"message": "Goal deleted successfully", "goal_id": goal_id}
