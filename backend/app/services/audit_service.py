"""
Audit Service - Enterprise-grade audit logging system
Tracks all critical actions for compliance and governance
"""
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional, Dict, Any
import json

from app.models.audit import AuditLog


def create_audit_log(
    db: Session,
    user_id: int,
    action: str,
    target: str,
    target_id: Optional[int] = None,
    old_value: Optional[Dict[str, Any]] = None,
    new_value: Optional[Dict[str, Any]] = None,
    user_email: Optional[str] = None,
    ip_address: Optional[str] = None,
    details: Optional[str] = None,
) -> AuditLog:
    """
    Create an audit log entry.
    
    Args:
        db: Database session
        user_id: ID of user performing the action
        action: Action type (e.g., "goal_created", "goal_approved")
        target: Human-readable target (e.g., "Goal #14")
        target_id: ID of the affected entity
        old_value: Previous state (will be JSON serialized)
        new_value: New state (will be JSON serialized)
        user_email: Email of user (optional, for denormalization)
        ip_address: IP address of request (optional)
        details: Additional context (optional)
    
    Returns:
        Created AuditLog instance
    """
    audit_log = AuditLog(
        user_id=user_id,
        user_email=user_email,
        action=action,
        target=target,
        target_id=target_id,
        old_value=json.dumps(old_value) if old_value else None,
        new_value=json.dumps(new_value) if new_value else None,
        timestamp=datetime.utcnow(),
        ip_address=ip_address,
        details=details,
    )
    
    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)
    
    return audit_log


def log_goal_created(db: Session, user_id: int, goal_id: int, goal_data: Dict[str, Any], user_email: Optional[str] = None):
    """Log goal creation"""
    return create_audit_log(
        db=db,
        user_id=user_id,
        action="goal_created",
        target=f"Goal #{goal_id}",
        target_id=goal_id,
        new_value=goal_data,
        user_email=user_email,
        details=f"Created goal: {goal_data.get('title', 'Untitled')}"
    )


def log_goal_updated(db: Session, user_id: int, goal_id: int, old_data: Dict[str, Any], new_data: Dict[str, Any], user_email: Optional[str] = None):
    """Log goal update"""
    return create_audit_log(
        db=db,
        user_id=user_id,
        action="goal_updated",
        target=f"Goal #{goal_id}",
        target_id=goal_id,
        old_value=old_data,
        new_value=new_data,
        user_email=user_email,
        details=f"Updated goal: {new_data.get('title', 'Untitled')}"
    )


def log_goal_deleted(db: Session, user_id: int, goal_id: int, goal_title: str, user_email: Optional[str] = None):
    """Log goal deletion"""
    return create_audit_log(
        db=db,
        user_id=user_id,
        action="goal_deleted",
        target=f"Goal #{goal_id}",
        target_id=goal_id,
        old_value={"title": goal_title},
        user_email=user_email,
        details=f"Deleted goal: {goal_title}"
    )


def log_goal_approved(db: Session, user_id: int, goal_id: int, goal_title: str, comment: str = "", user_email: Optional[str] = None):
    """Log goal approval"""
    return create_audit_log(
        db=db,
        user_id=user_id,
        action="goal_approved",
        target=f"Goal #{goal_id}",
        target_id=goal_id,
        new_value={"status": "approved", "comment": comment},
        user_email=user_email,
        details=f"Approved goal: {goal_title}"
    )


def log_goal_rejected(db: Session, user_id: int, goal_id: int, goal_title: str, comment: str = "", user_email: Optional[str] = None):
    """Log goal rejection"""
    return create_audit_log(
        db=db,
        user_id=user_id,
        action="goal_rejected",
        target=f"Goal #{goal_id}",
        target_id=goal_id,
        new_value={"status": "rejected", "comment": comment},
        user_email=user_email,
        details=f"Rejected goal: {goal_title}"
    )


def log_goal_unlocked(db: Session, user_id: int, goal_id: int, goal_title: str, user_email: Optional[str] = None):
    """Log goal unlock (admin action)"""
    return create_audit_log(
        db=db,
        user_id=user_id,
        action="goal_unlocked",
        target=f"Goal #{goal_id}",
        target_id=goal_id,
        old_value={"is_locked": True},
        new_value={"is_locked": False},
        user_email=user_email,
        details=f"Admin unlocked goal: {goal_title}"
    )


def log_checkin_created(db: Session, user_id: int, checkin_id: int, goal_id: int, progress: float, user_email: Optional[str] = None):
    """Log check-in creation"""
    return create_audit_log(
        db=db,
        user_id=user_id,
        action="checkin_created",
        target=f"Check-in #{checkin_id} for Goal #{goal_id}",
        target_id=checkin_id,
        new_value={"progress": progress, "goal_id": goal_id},
        user_email=user_email,
        details=f"Created quarterly check-in with {progress}% progress"
    )


def log_user_created(db: Session, admin_id: int, new_user_id: int, user_email: str, role: str, admin_email: Optional[str] = None):
    """Log user creation"""
    return create_audit_log(
        db=db,
        user_id=admin_id,
        action="user_created",
        target=f"User #{new_user_id}",
        target_id=new_user_id,
        new_value={"email": user_email, "role": role},
        user_email=admin_email,
        details=f"Created new user: {user_email} with role {role}"
    )


def log_user_role_changed(db: Session, admin_id: int, target_user_id: int, old_role: str, new_role: str, admin_email: Optional[str] = None):
    """Log user role change"""
    return create_audit_log(
        db=db,
        user_id=admin_id,
        action="user_role_changed",
        target=f"User #{target_user_id}",
        target_id=target_user_id,
        old_value={"role": old_role},
        new_value={"role": new_role},
        user_email=admin_email,
        details=f"Changed user role from {old_role} to {new_role}"
    )


def get_audit_logs(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    user_id: Optional[int] = None,
    action: Optional[str] = None,
    target_id: Optional[int] = None,
):
    """
    Retrieve audit logs with optional filtering.
    
    Args:
        db: Database session
        skip: Number of records to skip (pagination)
        limit: Maximum number of records to return
        user_id: Filter by user ID
        action: Filter by action type
        target_id: Filter by target entity ID
    
    Returns:
        List of AuditLog instances
    """
    query = db.query(AuditLog)
    
    if user_id:
        query = query.filter(AuditLog.user_id == user_id)
    if action:
        query = query.filter(AuditLog.action == action)
    if target_id:
        query = query.filter(AuditLog.target_id == target_id)
    
    return query.order_by(AuditLog.timestamp.desc()).offset(skip).limit(limit).all()


def get_recent_activity(db: Session, limit: int = 50):
    """Get recent activity across the system"""
    return db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(limit).all()
