from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import Optional, List

from app.models.goal import Goal
from app.models.user import User
from app.schemas.goal import GoalCreate, GoalUpdate, SharedGoalCreate
from app.utils.validators import validate_goal_weightage, validate_goal_count
from app.utils.uom_calculator import calculate_achievement_percentage
from app.utils.quarterly_windows import enforce_window
from app.services import audit_service


def create_goal(data: GoalCreate, user_id: int, db: Session, user_email: Optional[str] = None):
    """Create a new goal with validation and audit logging."""
    try:
        enforce_window("Phase 1 - Goal Setting", db=db)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    validate_goal_count(db, user_id)
    validate_goal_weightage(db, user_id, data.weightage)

    db_goal = Goal(
        title=data.title,
        description=data.description,
        strategic_area=data.strategic_area,
        target_value=data.target_value,
        weightage=data.weightage,
        uom_type=data.uom_type,
        uom_direction=data.uom_direction,
        target_date=data.target_date,
        quarter=data.quarter,
        employee_id=user_id,
        status="Not Started",  # Standardized status
        approval_status="pending",
        is_locked=False,
        is_shared=False,
    )
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    
    # Create audit log
    goal_data = {
        "title": db_goal.title,
        "description": db_goal.description,
        "strategic_area": db_goal.strategic_area,
        "target_value": db_goal.target_value,
        "weightage": db_goal.weightage,
        "quarter": db_goal.quarter,
        "uom_type": db_goal.uom_type,
    }
    audit_service.log_goal_created(
        db=db,
        user_id=user_id,
        goal_id=db_goal.id,
        goal_data=goal_data,
        user_email=user_email
    )
    
    return db_goal


def create_shared_goal(data: SharedGoalCreate, creator_id: int, db: Session, user_email: Optional[str] = None):
    """
    Create a shared goal and push it to multiple employees.
    Only admin or manager can create shared goals.
    """
    # Verify creator is admin or manager
    try:
        enforce_window("Phase 1 - Goal Setting", db=db)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    creator = db.query(User).filter(User.id == creator_id).first()
    if not creator or creator.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Only admin or manager can create shared goals")
    
    # Create parent goal (owned by creator)
    parent_goal = Goal(
        title=data.title,
        description=data.description,
        strategic_area=data.strategic_area,
        target_value=data.target_value,
        weightage=0,  # Parent goal doesn't count toward creator's weightage
        uom_type=data.uom_type,
        uom_direction=data.uom_direction,
        target_date=data.target_date,
        quarter=data.quarter,
        employee_id=creator_id,
        status="Not Started",
        approval_status="approved",  # Auto-approved
        is_locked=True,  # Locked for creator
        is_shared=True,
        shared_by_id=creator_id,
    )
    db.add(parent_goal)
    db.commit()
    db.refresh(parent_goal)
    
    # Create child goals for each recipient
    created_goals = []
    for recipient_id in data.recipient_ids:
        # Validate recipient exists
        recipient = db.query(User).filter(User.id == recipient_id).first()
        if not recipient:
            continue
        
        # Check if recipient already has 8 goals
        try:
            validate_goal_count(db, recipient_id)
        except HTTPException:
            # Skip this recipient if they have too many goals
            continue
        
        child_goal = Goal(
            title=data.title,
            description=data.description,
            strategic_area=data.strategic_area,
            target_value=data.target_value,
            achieved_value=0,
            weightage=data.default_weightage,
            uom_type=data.uom_type,
            uom_direction=data.uom_direction,
            target_date=data.target_date,
            quarter=data.quarter,
            employee_id=recipient_id,
            status="Not Started",
            approval_status="approved",  # Auto-approved for shared goals
            is_locked=False,  # Recipients can edit weightage
            is_shared=True,
            shared_by_id=creator_id,
            parent_goal_id=parent_goal.id,
        )
        db.add(child_goal)
        created_goals.append(child_goal)
    
    db.commit()
    
    # Audit log
    audit_service.log_goal_created(
        db=db,
        user_id=creator_id,
        goal_id=parent_goal.id,
        goal_data={"title": parent_goal.title, "shared_to": len(created_goals)},
        user_email=user_email
    )
    
    return {"parent_goal": parent_goal, "child_goals": created_goals}


def sync_shared_goal_achievement(parent_goal_id: int, achieved_value: float, db: Session):
    """
    Sync achievement value from parent goal to all child goals.
    Called when primary owner updates achievement.
    """
    # Get all child goals
    child_goals = db.query(Goal).filter(Goal.parent_goal_id == parent_goal_id).all()
    
    for child_goal in child_goals:
        child_goal.achieved_value = achieved_value
        # Recalculate achievement percentage
        # This will be done in the response serialization
    
    db.commit()
    return len(child_goals)


def get_goals(user_id: int, db: Session):
    """Get all goals for a specific employee with calculated achievement percentage."""
    goals = db.query(Goal).filter(Goal.employee_id == user_id).all()
    
    # Calculate achievement percentage for each goal
    for goal in goals:
        goal.achievement_percentage = calculate_achievement_percentage(
            uom_type=goal.uom_type,
            target_value=goal.target_value,
            achieved_value=goal.achieved_value,
            uom_direction=goal.uom_direction,
            target_date=goal.target_date,
            completion_date=goal.completion_date,
        )
    
    return goals


def get_goal_by_id(goal_id: int, db: Session):
    """Fetch a single goal by ID with calculated achievement percentage."""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    # Calculate achievement percentage
    goal.achievement_percentage = calculate_achievement_percentage(
        uom_type=goal.uom_type,
        target_value=goal.target_value,
        achieved_value=goal.achieved_value,
        uom_direction=goal.uom_direction,
        target_date=goal.target_date,
        completion_date=goal.completion_date,
    )
    
    return goal


def update_goal(goal_id: int, data: GoalUpdate, user_id: int, db: Session, user_email: Optional[str] = None):
    """Update a goal with audit logging and shared goal sync."""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    if goal.employee_id != user_id:
        raise HTTPException(status_code=403, detail="You do not own this goal")
    
    # Check if this is a shared goal (recipient)
    if goal.is_shared and goal.parent_goal_id is not None:
        # Recipients can only edit weightage
        if data.title or data.description or data.target_value or data.strategic_area:
            raise HTTPException(
                status_code=400,
                detail="Only weightage can be modified for shared goals"
            )
    
    if goal.is_locked and not (goal.is_shared and goal.parent_goal_id is not None):
        raise HTTPException(status_code=400, detail="Goal is locked and cannot be edited")
    
    # Store old values for audit log
    old_data = {
        "title": goal.title,
        "description": goal.description,
        "strategic_area": goal.strategic_area,
        "target_value": goal.target_value,
        "weightage": goal.weightage,
        "achieved_value": goal.achieved_value,
    }
    
    # Update fields
    if data.title is not None and not goal.parent_goal_id:
        goal.title = data.title
    if data.description is not None and not goal.parent_goal_id:
        goal.description = data.description
    if data.strategic_area is not None and not goal.parent_goal_id:
        goal.strategic_area = data.strategic_area
    if data.target_value is not None and not goal.parent_goal_id:
        goal.target_value = data.target_value
    if data.weightage is not None:
        validate_goal_weightage(db, user_id, data.weightage, exclude_goal_id=goal_id)
        goal.weightage = data.weightage
    if data.uom_type is not None:
        goal.uom_type = data.uom_type
    if data.uom_direction is not None:
        goal.uom_direction = data.uom_direction
    if data.target_date is not None:
        goal.target_date = data.target_date
    if data.completion_date is not None:
        goal.completion_date = data.completion_date
    if data.status is not None:
        goal.status = data.status
    if data.achieved_value is not None:
        goal.achieved_value = data.achieved_value
        
        # If this is a parent shared goal, sync to children
        if goal.is_shared and goal.parent_goal_id is None:
            sync_shared_goal_achievement(goal.id, data.achieved_value, db)
    
    db.commit()
    db.refresh(goal)
    
    # Create audit log
    new_data = {
        "title": goal.title,
        "description": goal.description,
        "strategic_area": goal.strategic_area,
        "target_value": goal.target_value,
        "weightage": goal.weightage,
        "achieved_value": goal.achieved_value,
    }
    audit_service.log_goal_updated(
        db=db,
        user_id=user_id,
        goal_id=goal_id,
        old_data=old_data,
        new_data=new_data,
        user_email=user_email
    )
    
    return goal


def validate_total_weightage(user_id: int, db: Session) -> dict:
    """
    Validate that total weightage equals 100% for an employee.
    Returns validation result with details.
    """
    goals = db.query(Goal).filter(Goal.employee_id == user_id).all()
    total_weightage = sum(g.weightage for g in goals)
    
    return {
        "is_valid": total_weightage == 100,
        "total_weightage": total_weightage,
        "goal_count": len(goals),
        "message": f"Total weightage: {total_weightage}%. " + 
                   ("Valid ✓" if total_weightage == 100 else f"Must equal 100%")
    }

