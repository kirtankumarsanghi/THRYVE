"""
Analytics Routes - Real-time analytics API endpoints
Powers all dashboard charts and metrics
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_manager
from app.services import analytics_service

router = APIRouter()


@router.get("/overview")
def get_overview(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get organization-wide overview metrics.
    
    Returns:
        - total_goals, completed_goals, pending_goals
        - avg_progress, completion_rate
        - employee and department counts
    
    Access: All authenticated users
    """
    return analytics_service.get_organization_overview(db)


@router.get("/team")
def get_team_analytics(
    manager_id: Optional[int] = Query(None, description="Filter by manager ID"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get team performance analytics.
    Shows individual employee metrics and rankings.
    
    Query params:
        - manager_id: Optional filter for specific manager's team
    
    Returns:
        List of employees with their performance metrics
    
    Access: Managers and admins
    """
    # For now, return all team data
    # In future, filter by manager_id if provided
    return analytics_service.get_team_analytics(db, manager_id)


@router.get("/departments")
def get_department_analytics(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get analytics broken down by department.
    Powers department comparison charts.
    
    Returns:
        List of departments with their performance metrics
    
    Access: Managers and admins
    """
    return analytics_service.get_department_analytics(db)


@router.get("/trends")
def get_quarterly_trends(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get quarterly trend data (Q1, Q2, Q3, Q4).
    Powers line charts showing progression over time.
    
    Returns:
        Quarterly breakdown of goals, completion rates, and progress
    
    Access: All authenticated users
    """
    return analytics_service.get_quarterly_trends(db)


@router.get("/strategic-areas")
def get_strategic_area_breakdown(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get goal distribution by strategic area.
    Powers pie charts and strategic focus analysis.
    
    Returns:
        List of strategic areas with goal counts and completion rates
    
    Access: All authenticated users
    """
    return analytics_service.get_strategic_area_breakdown(db)


@router.get("/approval-pipeline")
def get_approval_pipeline_metrics(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    """
    Get metrics about the approval pipeline.
    Shows workflow health and bottlenecks.
    
    Returns:
        Pending, approved, rejected counts and approval rate
    
    Access: Managers and admins only
    """
    return analytics_service.get_approval_pipeline_metrics(db)


@router.get("/rankings")
def get_employee_ranking(
    limit: int = Query(10, ge=1, le=100, description="Number of top employees to return"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get top performing employees (leaderboard).
    Powers recognition and gamification features.
    
    Query params:
        - limit: Number of top employees (default 10, max 100)
    
    Returns:
        Ranked list of employees by completion rate
    
    Access: All authenticated users
    """
    return analytics_service.get_employee_ranking(db, limit)


@router.get("/status-distribution")
def get_goal_status_distribution(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get distribution of goals by status.
    Powers status overview charts (pie/donut charts).
    
    Returns:
        Count of goals in each status (pending, in_progress, completed, at_risk)
    
    Access: All authenticated users
    """
    return analytics_service.get_goal_status_distribution(db)
