"""
Audit Routes - Audit log access for managers and admins
Provides transparency and compliance tracking
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_manager
from app.services import audit_service

router = APIRouter()


@router.get("/logs")
def get_my_audit_logs(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(50, ge=1, le=200, description="Maximum records to return"),
    action: Optional[str] = Query(None, description="Filter by action type"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get audit logs for the current user's actions.
    Allows users to see their own activity history.
    
    Query params:
        - skip: Pagination offset (default 0)
        - limit: Max records (default 50, max 200)
        - action: Filter by action type
    
    Returns:
        List of audit log entries for current user
    
    Access: All authenticated users (see own logs only)
    """
    logs = audit_service.get_audit_logs(
        db=db,
        skip=skip,
        limit=limit,
        user_id=current_user["user_id"],
        action=action
    )
    
    return [
        {
            "id": log.id,
            "action": log.action,
            "target": log.target,
            "target_id": log.target_id,
            "timestamp": log.timestamp.isoformat(),
            "details": log.details,
        }
        for log in logs
    ]


@router.get("/team-logs")
def get_team_audit_logs(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=500, description="Maximum records to return"),
    user_id: Optional[int] = Query(None, description="Filter by specific user ID"),
    action: Optional[str] = Query(None, description="Filter by action type"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    """
    Get audit logs for team members.
    Managers can see activity of their team.
    
    Query params:
        - skip: Pagination offset (default 0)
        - limit: Max records (default 100, max 500)
        - user_id: Filter by specific user
        - action: Filter by action type
    
    Returns:
        List of audit log entries for team
    
    Access: Managers and admins only
    """
    # For now, return all logs (in future, filter by manager's team)
    logs = audit_service.get_audit_logs(
        db=db,
        skip=skip,
        limit=limit,
        user_id=user_id,
        action=action
    )
    
    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "user_email": log.user_email,
            "action": log.action,
            "target": log.target,
            "target_id": log.target_id,
            "timestamp": log.timestamp.isoformat(),
            "details": log.details,
        }
        for log in logs
    ]


@router.get("/goal/{goal_id}/history")
def get_goal_audit_history(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get complete audit history for a specific goal.
    Shows all changes and actions related to this goal.
    
    Returns:
        List of audit log entries for the specified goal
    
    Access: All authenticated users
    """
    logs = audit_service.get_audit_logs(
        db=db,
        target_id=goal_id,
        limit=500  # Get all history for this goal
    )
    
    return [
        {
            "id": log.id,
            "user_email": log.user_email,
            "action": log.action,
            "old_value": log.old_value,
            "new_value": log.new_value,
            "timestamp": log.timestamp.isoformat(),
            "details": log.details,
        }
        for log in logs
    ]
