"""
Admin Routes - Governance and administrative controls
Provides admin-only features for system management
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import io

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.goal import Goal
from app.models.user import User
from app.models.quarterly_window import QuarterlyWindow
from app.services import audit_service, analytics_service
from app.utils import csv_export
from app.utils.quarterly_windows import WINDOW_CONFIG, validate_no_window_overlap

router = APIRouter()


def require_admin(current_user: dict = Depends(get_current_user)):
    """Restrict route to admin role only."""
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin role required"
        )
    return current_user


class UnlockGoalBody(BaseModel):
    reason: Optional[str] = ""


@router.put("/goals/{goal_id}/unlock")
def unlock_goal(
    goal_id: int,
    body: UnlockGoalBody,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Unlock an approved/locked goal for editing.
    This is a powerful admin governance feature.
    
    Use cases:
        - Correct errors in approved goals
        - Allow adjustments due to business changes
        - Emergency modifications
    
    Access: Admin only
    """
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    if not goal.is_locked:
        raise HTTPException(status_code=400, detail="Goal is already unlocked")
    
    # Unlock the goal
    goal.is_locked = False
    db.commit()
    db.refresh(goal)
    
    # Get admin user for audit log
    admin = db.query(User).filter(User.id == current_user["user_id"]).first()
    admin_email = admin.email if admin else None
    
    # Create audit log
    audit_service.log_goal_unlocked(
        db=db,
        user_id=current_user["user_id"],
        goal_id=goal_id,
        goal_title=goal.title,
        user_email=admin_email
    )
    
    return {
        "message": "Goal unlocked successfully",
        "goal_id": goal_id,
        "is_locked": goal.is_locked,
        "reason": body.reason
    }


@router.get("/audit-logs")
def get_audit_logs(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=500, description="Maximum records to return"),
    user_id: Optional[int] = Query(None, description="Filter by user ID"),
    action: Optional[str] = Query(None, description="Filter by action type"),
    target_id: Optional[int] = Query(None, description="Filter by target entity ID"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Get audit logs with filtering and pagination.
    
    Query params:
        - skip: Pagination offset (default 0)
        - limit: Max records (default 100, max 500)
        - user_id: Filter by user
        - action: Filter by action type (e.g., "goal_approved")
        - target_id: Filter by target entity
    
    Returns:
        List of audit log entries with full details
    
    Access: Admin only
    """
    logs = audit_service.get_audit_logs(
        db=db,
        skip=skip,
        limit=limit,
        user_id=user_id,
        action=action,
        target_id=target_id
    )
    
    # Convert to dict for JSON response
    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "user_email": log.user_email,
            "action": log.action,
            "target": log.target,
            "target_id": log.target_id,
            "old_value": log.old_value,
            "new_value": log.new_value,
            "timestamp": log.timestamp.isoformat(),
            "details": log.details,
        }
        for log in logs
    ]


@router.get("/recent-activity")
def get_recent_activity(
    limit: int = Query(50, ge=1, le=200, description="Number of recent activities"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Get recent system activity.
    Shows the latest actions across the platform.
    
    Query params:
        - limit: Number of activities (default 50, max 200)
    
    Returns:
        List of recent audit log entries
    
    Access: Admin only
    """
    logs = audit_service.get_recent_activity(db=db, limit=limit)
    
    return [
        {
            "id": log.id,
            "user_email": log.user_email,
            "action": log.action,
            "target": log.target,
            "timestamp": log.timestamp.isoformat(),
            "details": log.details,
        }
        for log in logs
    ]


@router.get("/org-analytics")
def get_org_analytics(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Get comprehensive organization analytics.
    Combines multiple analytics endpoints for admin dashboard.
    
    Returns:
        {
            "overview": {...},
            "departments": [...],
            "trends": {...},
            "approval_pipeline": {...},
            "top_performers": [...]
        }
    
    Access: Admin only
    """
    return {
        "overview": analytics_service.get_organization_overview(db),
        "departments": analytics_service.get_department_analytics(db),
        "trends": analytics_service.get_quarterly_trends(db),
        "approval_pipeline": analytics_service.get_approval_pipeline_metrics(db),
        "top_performers": analytics_service.get_employee_ranking(db, limit=10),
        "status_distribution": analytics_service.get_goal_status_distribution(db),
    }


class UpdateUserRoleBody(BaseModel):
    role: str  # "employee", "manager", or "admin"


class QuarterlyWindowItem(BaseModel):
    window_name: str
    start_month: int
    start_day: int
    end_month: int
    end_day: int


class QuarterlyWindowsUpdateBody(BaseModel):
    windows: list[QuarterlyWindowItem]


@router.put("/users/{user_id}/role")
def update_user_role(
    user_id: int,
    body: UpdateUserRoleBody,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Update a user's role.
    Admin governance feature for role management.
    
    Body:
        - role: New role ("employee", "manager", or "admin")
    
    Access: Admin only
    """
    if body.role not in ["employee", "manager", "admin"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid role. Must be 'employee', 'manager', or 'admin'"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    old_role = user.role
    user.role = body.role
    db.commit()
    db.refresh(user)
    
    # Get admin user for audit log
    admin = db.query(User).filter(User.id == current_user["user_id"]).first()
    admin_email = admin.email if admin else None
    
    # Create audit log
    audit_service.log_user_role_changed(
        db=db,
        admin_id=current_user["user_id"],
        target_user_id=user_id,
        old_role=old_role,
        new_role=body.role,
        admin_email=admin_email
    )
    
    return {
        "message": "User role updated successfully",
        "user_id": user_id,
        "old_role": old_role,
        "new_role": body.role
    }


@router.get("/system-health")
def get_system_health(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Get system health metrics.
    Shows overall platform health and potential issues.
    
    Returns:
        {
            "total_users": int,
            "active_users": int,
            "total_goals": int,
            "locked_goals": int,
            "pending_approvals": int,
            "recent_audit_count": int
        }
    
    Access: Admin only
    """
    total_users = db.query(User).count()
    active_users = db.query(User).filter(User.status == "active").count()
    total_goals = db.query(Goal).count()
    locked_goals = db.query(Goal).filter(Goal.is_locked == True).count()
    pending_approvals = db.query(Goal).filter(Goal.approval_status == "pending").count()
    
    # Recent audit activity (last 24 hours)
    from datetime import datetime, timedelta
    yesterday = datetime.utcnow() - timedelta(days=1)
    from app.models.audit import AuditLog
    recent_audit_count = db.query(AuditLog).filter(AuditLog.timestamp >= yesterday).count()
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "total_goals": total_goals,
        "locked_goals": locked_goals,
        "pending_approvals": pending_approvals,
        "recent_audit_count": recent_audit_count,
        "status": "healthy" if pending_approvals < 50 else "attention_needed"
    }


# ═══════════════════════════════════════════════════════════════
# CSV EXPORT ENDPOINTS
# ═══════════════════════════════════════════════════════════════

@router.get("/export/goals")
def export_goals_csv(
    quarter: Optional[str] = Query(None, description="Filter by quarter"),
    department: Optional[str] = Query(None, description="Filter by department"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Export goals to CSV format.
    
    Query params:
        - quarter: Filter by quarter (Q1, Q2, Q3, Q4)
        - department: Filter by department
    
    Returns:
        CSV file download
    
    Access: Admin only
    """
    # Query goals with filters
    query = db.query(Goal)
    
    if quarter:
        query = query.filter(Goal.quarter == quarter)
    
    if department:
        query = query.join(User).filter(User.department == department)
    
    goals = query.all()
    
    # Convert to dict format
    goals_data = []
    for goal in goals:
        employee = db.query(User).filter(User.id == goal.employee_id).first()
        goals_data.append({
            "id": goal.id,
            "title": goal.title,
            "description": goal.description,
            "strategic_area": goal.strategic_area,
            "employee_name": employee.full_name if employee else "",
            "employee_email": employee.email if employee else "",
            "department": employee.department if employee else "",
            "quarter": goal.quarter,
            "target_value": goal.target_value,
            "achieved_value": goal.achieved_value,
            "weightage": goal.weightage,
            "uom_type": goal.uom_type,
            "status": goal.status,
            "approval_status": goal.approval_status,
            "is_locked": goal.is_locked,
            "manager_comment": goal.manager_comment,
        })
    
    # Generate CSV
    csv_content = csv_export.export_goals_to_csv(goals_data)
    
    # Return as downloadable file
    return StreamingResponse(
        io.StringIO(csv_content),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=goals_export.csv"}
    )


@router.get("/export/analytics")
def export_analytics_csv(
    report_type: str = Query(..., description="Type: overview, team, departments, or trends"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Export analytics data to CSV format.
    
    Query params:
        - report_type: Type of report (overview, team, departments, trends)
    
    Returns:
        CSV file download
    
    Access: Admin only
    """
    if report_type == "overview":
        data = analytics_service.get_organization_overview(db)
    elif report_type == "team":
        data = analytics_service.get_team_analytics(db)
    elif report_type == "departments":
        data = analytics_service.get_department_analytics(db)
    elif report_type == "trends":
        data = analytics_service.get_quarterly_trends(db)
    else:
        raise HTTPException(status_code=400, detail="Invalid report type")
    
    # Generate CSV
    csv_content = csv_export.export_analytics_to_csv(data, report_type)
    
    # Return as downloadable file
    filename = f"analytics_{report_type}_export.csv"
    return StreamingResponse(
        io.StringIO(csv_content),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )


@router.get("/export/audit-logs")
def export_audit_logs_csv(
    limit: int = Query(1000, ge=1, le=10000, description="Max records to export"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Export audit logs to CSV format.
    
    Query params:
        - limit: Maximum records to export (default 1000, max 10000)
    
    Returns:
        CSV file download
    
    Access: Admin only
    """
    logs = audit_service.get_audit_logs(db=db, skip=0, limit=limit)
    
    # Convert to dict format
    logs_data = [
        {
            "id": log.id,
            "user_email": log.user_email,
            "action": log.action,
            "target": log.target,
            "target_id": log.target_id,
            "timestamp": log.timestamp.isoformat(),
            "details": log.details,
        }
        for log in logs
    ]
    
    # Generate CSV
    csv_content = csv_export.export_audit_logs_to_csv(logs_data)
    
    # Return as downloadable file
    return StreamingResponse(
        io.StringIO(csv_content),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=audit_logs_export.csv"}
    )


@router.get("/export/users")
def export_users_csv(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    """
    Export users to CSV format.
    
    Returns:
        CSV file download
    
    Access: Admin only
    """
    users = db.query(User).all()
    
    # Convert to dict format
    users_data = [
        {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "department": user.department,
            "status": user.status,
        }
        for user in users
    ]
    
    # Generate CSV
    csv_content = csv_export.export_users_to_csv(users_data)
    
    # Return as downloadable file
    return StreamingResponse(
        io.StringIO(csv_content),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=users_export.csv"}
    )


@router.get("/quarterly-windows")
def get_quarterly_windows(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    rows = db.query(QuarterlyWindow).all()
    if not rows:
        return {
            "windows": [
                {
                    "window_name": k,
                    "start_month": v["start"][0],
                    "start_day": v["start"][1],
                    "end_month": v["end"][0],
                    "end_day": v["end"][1],
                }
                for k, v in WINDOW_CONFIG.items()
            ]
        }
    return {
        "windows": [
            {
                "window_name": r.window_name,
                "start_month": r.start_month,
                "start_day": r.start_day,
                "end_month": r.end_month,
                "end_day": r.end_day,
            }
            for r in rows
        ]
    }


@router.put("/quarterly-windows")
def update_quarterly_windows(
    body: QuarterlyWindowsUpdateBody,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    proposed = {
        w.window_name: {"start": (w.start_month, w.start_day), "end": (w.end_month, w.end_day)}
        for w in body.windows
    }

    try:
        validate_no_window_overlap(proposed)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    db.query(QuarterlyWindow).delete()
    for w in body.windows:
        db.add(
            QuarterlyWindow(
                window_name=w.window_name,
                start_month=w.start_month,
                start_day=w.start_day,
                end_month=w.end_month,
                end_day=w.end_day,
            )
        )
    db.commit()

    return {"message": "Quarterly windows updated successfully", "count": len(body.windows)}
