from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.goal import Goal
from typing import Optional


def validate_goal_weightage(db: Session, employee_id: int, new_weightage: float, exclude_goal_id: Optional[int] = None):
    """Ensure total weightage does not exceed 100% and minimum is 10%."""
    if new_weightage < 10:
        raise HTTPException(
            status_code=400,
            detail="Minimum weightage per goal is 10%",
        )

    existing_goals = db.query(Goal).filter(Goal.employee_id == employee_id)
    
    # Exclude current goal when updating
    if exclude_goal_id:
        existing_goals = existing_goals.filter(Goal.id != exclude_goal_id)
    
    existing_goals = existing_goals.all()
    total = sum(g.weightage for g in existing_goals if g.weightage)

    if total + new_weightage > 100:
        raise HTTPException(
            status_code=400,
            detail=f"Total goal weightage would be {total + new_weightage}%. Cannot exceed 100%.",
        )


def validate_goal_count(db: Session, employee_id: int):
    """Ensure employee has no more than 8 goals."""
    count = db.query(Goal).filter(Goal.employee_id == employee_id).count()
    if count >= 8:
        raise HTTPException(
            status_code=400,
            detail="Maximum 8 goals allowed per employee",
        )