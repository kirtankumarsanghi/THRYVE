"""
Analytics Service - Real-time analytics engine for dashboards
Powers all charts, metrics, and insights across the platform
"""
from sqlalchemy.orm import Session
from sqlalchemy import func, and_, case
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta

from app.models.user import User
from app.models.goal import Goal
from app.models.checkin import Checkin


def get_organization_overview(db: Session) -> Dict[str, Any]:
    """
    Get high-level organization metrics.
    Powers the main dashboard overview cards.
    
    Returns:
        {
            "total_goals": int,
            "completed_goals": int,
            "pending_goals": int,
            "in_progress_goals": int,
            "avg_progress": float,
            "completion_rate": float,
            "total_employees": int,
            "active_employees": int,
            "total_departments": int
        }
    """
    # Goal statistics
    total_goals = db.query(Goal).count()
    completed_goals = db.query(Goal).filter(Goal.status == "Completed").count()
    pending_goals = db.query(Goal).filter(Goal.approval_status == "pending").count()
    in_progress_goals = db.query(Goal).filter(
        and_(Goal.approval_status == "approved", Goal.status != "Completed")
    ).count()
    
    # Average progress calculation
    avg_progress_result = db.query(func.avg(Goal.achieved_value / Goal.target_value * 100)).filter(
        Goal.target_value > 0
    ).scalar()
    avg_progress = round(avg_progress_result or 0, 2)
    
    # Completion rate
    completion_rate = round((completed_goals / total_goals * 100) if total_goals > 0 else 0, 2)
    
    # Employee statistics
    total_employees = db.query(User).filter(User.role == "employee").count()
    active_employees = db.query(User).filter(
        and_(User.role == "employee", User.status == "active")
    ).count()
    
    # Department count
    total_departments = db.query(func.count(func.distinct(User.department))).scalar() or 0
    
    return {
        "total_goals": total_goals,
        "completed_goals": completed_goals,
        "pending_goals": pending_goals,
        "in_progress_goals": in_progress_goals,
        "avg_progress": avg_progress,
        "completion_rate": completion_rate,
        "total_employees": total_employees,
        "active_employees": active_employees,
        "total_departments": total_departments,
    }


def get_team_analytics(db: Session, manager_id: Optional[int] = None) -> List[Dict[str, Any]]:
    """
    Get team performance analytics.
    Can be filtered by manager or return all teams.
    
    Returns list of team members with their performance metrics:
        [{
            "employee_id": int,
            "employee_name": str,
            "employee_email": str,
            "department": str,
            "total_goals": int,
            "completed_goals": int,
            "avg_progress": float,
            "completion_rate": float,
            "quarterly_breakdown": {"Q1": {...}, "Q2": {...}, ...}
        }]
    """
    # Get all employees (optionally filtered by manager in future)
    employees = db.query(User).filter(User.role == "employee").all()
    
    team_data = []
    
    for employee in employees:
        # Goal statistics for this employee
        employee_goals = db.query(Goal).filter(Goal.employee_id == employee.id)
        total_goals = employee_goals.count()
        completed_goals = employee_goals.filter(Goal.status == "Completed").count()
        
        # Average progress
        avg_progress_result = db.query(
            func.avg(Goal.achieved_value / Goal.target_value * 100)
        ).filter(
            and_(Goal.employee_id == employee.id, Goal.target_value > 0)
        ).scalar()
        avg_progress = round(avg_progress_result or 0, 2)
        
        # Completion rate
        completion_rate = round((completed_goals / total_goals * 100) if total_goals > 0 else 0, 2)
        
        # Quarterly breakdown
        quarterly_breakdown = {}
        for quarter in ["Q1", "Q2", "Q3", "Q4"]:
            q_goals = employee_goals.filter(Goal.quarter == quarter)
            q_total = q_goals.count()
            q_completed = q_goals.filter(Goal.status == "Completed").count()
            q_completion_rate = round((q_completed / q_total * 100) if q_total > 0 else 0, 2)
            
            quarterly_breakdown[quarter] = {
                "total_goals": q_total,
                "completed_goals": q_completed,
                "completion_rate": q_completion_rate,
            }
        
        team_data.append({
            "employee_id": employee.id,
            "employee_name": employee.full_name,
            "employee_email": employee.email,
            "department": employee.department or "Unassigned",
            "total_goals": total_goals,
            "completed_goals": completed_goals,
            "avg_progress": avg_progress,
            "completion_rate": completion_rate,
            "quarterly_breakdown": quarterly_breakdown,
        })
    
    # Sort by completion rate descending (employee ranking)
    team_data.sort(key=lambda x: x["completion_rate"], reverse=True)
    
    return team_data


def get_department_analytics(db: Session) -> List[Dict[str, Any]]:
    """
    Get analytics broken down by department.
    Powers department comparison charts.
    
    Returns:
        [{
            "department": str,
            "total_goals": int,
            "completed_goals": int,
            "avg_progress": float,
            "completion_rate": float,
            "employee_count": int
        }]
    """
    # Get all unique departments
    departments = db.query(User.department).filter(
        User.department.isnot(None)
    ).distinct().all()
    
    department_data = []
    
    for (dept,) in departments:
        # Get employees in this department
        dept_employees = db.query(User).filter(User.department == dept).all()
        employee_ids = [emp.id for emp in dept_employees]
        
        if not employee_ids:
            continue
        
        # Goal statistics for this department
        dept_goals = db.query(Goal).filter(Goal.employee_id.in_(employee_ids))
        total_goals = dept_goals.count()
        completed_goals = dept_goals.filter(Goal.status == "Completed").count()
        
        # Average progress
        avg_progress_result = db.query(
            func.avg(Goal.achieved_value / Goal.target_value * 100)
        ).filter(
            and_(Goal.employee_id.in_(employee_ids), Goal.target_value > 0)
        ).scalar()
        avg_progress = round(avg_progress_result or 0, 2)
        
        # Completion rate
        completion_rate = round((completed_goals / total_goals * 100) if total_goals > 0 else 0, 2)
        
        department_data.append({
            "department": dept,
            "total_goals": total_goals,
            "completed_goals": completed_goals,
            "avg_progress": avg_progress,
            "completion_rate": completion_rate,
            "employee_count": len(employee_ids),
        })
    
    # Sort by completion rate
    department_data.sort(key=lambda x: x["completion_rate"], reverse=True)
    
    return department_data


def get_quarterly_trends(db: Session) -> Dict[str, Any]:
    """
    Get quarterly trend data for line charts.
    Shows progression across Q1, Q2, Q3, Q4.
    
    Returns:
        {
            "quarters": ["Q1", "Q2", "Q3", "Q4"],
            "total_goals": [int, int, int, int],
            "completed_goals": [int, int, int, int],
            "completion_rates": [float, float, float, float],
            "avg_progress": [float, float, float, float]
        }
    """
    quarters = ["Q1", "Q2", "Q3", "Q4"]
    total_goals = []
    completed_goals = []
    completion_rates = []
    avg_progress_list = []
    
    for quarter in quarters:
        q_goals = db.query(Goal).filter(Goal.quarter == quarter)
        q_total = q_goals.count()
        q_completed = q_goals.filter(Goal.status == "Completed").count()
        q_completion_rate = round((q_completed / q_total * 100) if q_total > 0 else 0, 2)
        
        # Average progress for this quarter
        q_avg_progress_result = db.query(
            func.avg(Goal.achieved_value / Goal.target_value * 100)
        ).filter(
            and_(Goal.quarter == quarter, Goal.target_value > 0)
        ).scalar()
        q_avg_progress = round(q_avg_progress_result or 0, 2)
        
        total_goals.append(q_total)
        completed_goals.append(q_completed)
        completion_rates.append(q_completion_rate)
        avg_progress_list.append(q_avg_progress)
    
    return {
        "quarters": quarters,
        "total_goals": total_goals,
        "completed_goals": completed_goals,
        "completion_rates": completion_rates,
        "avg_progress": avg_progress_list,
    }


def get_strategic_area_breakdown(db: Session) -> List[Dict[str, Any]]:
    """
    Get goal distribution by strategic area.
    Powers pie charts and strategic focus analysis.
    
    Returns:
        [{
            "strategic_area": str,
            "goal_count": int,
            "completed_count": int,
            "completion_rate": float
        }]
    """
    # Get all unique strategic areas
    strategic_areas = db.query(Goal.strategic_area).filter(
        Goal.strategic_area.isnot(None),
        Goal.strategic_area != ""
    ).distinct().all()
    
    area_data = []
    
    for (area,) in strategic_areas:
        area_goals = db.query(Goal).filter(Goal.strategic_area == area)
        goal_count = area_goals.count()
        completed_count = area_goals.filter(Goal.status == "Completed").count()
        completion_rate = round((completed_count / goal_count * 100) if goal_count > 0 else 0, 2)
        
        area_data.append({
            "strategic_area": area,
            "goal_count": goal_count,
            "completed_count": completed_count,
            "completion_rate": completion_rate,
        })
    
    # Sort by goal count
    area_data.sort(key=lambda x: x["goal_count"], reverse=True)
    
    return area_data


def get_approval_pipeline_metrics(db: Session) -> Dict[str, Any]:
    """
    Get metrics about the approval pipeline.
    Shows workflow health and bottlenecks.
    
    Returns:
        {
            "pending_approvals": int,
            "approved_goals": int,
            "rejected_goals": int,
            "approval_rate": float,
            "avg_approval_time": float (in days, if tracked)
        }
    """
    pending_approvals = db.query(Goal).filter(Goal.approval_status == "pending").count()
    approved_goals = db.query(Goal).filter(Goal.approval_status == "approved").count()
    rejected_goals = db.query(Goal).filter(Goal.approval_status == "rejected").count()
    
    total_reviewed = approved_goals + rejected_goals
    approval_rate = round((approved_goals / total_reviewed * 100) if total_reviewed > 0 else 0, 2)
    
    return {
        "pending_approvals": pending_approvals,
        "approved_goals": approved_goals,
        "rejected_goals": rejected_goals,
        "approval_rate": approval_rate,
        "total_reviewed": total_reviewed,
    }


def get_employee_ranking(db: Session, limit: int = 10) -> List[Dict[str, Any]]:
    """
    Get top performing employees.
    Powers leaderboard and recognition features.
    
    Returns:
        [{
            "rank": int,
            "employee_id": int,
            "employee_name": str,
            "department": str,
            "completion_rate": float,
            "total_goals": int,
            "completed_goals": int
        }]
    """
    employees = db.query(User).filter(User.role == "employee").all()
    
    rankings = []
    
    for employee in employees:
        employee_goals = db.query(Goal).filter(Goal.employee_id == employee.id)
        total_goals = employee_goals.count()
        completed_goals = employee_goals.filter(Goal.status == "Completed").count()
        completion_rate = round((completed_goals / total_goals * 100) if total_goals > 0 else 0, 2)
        
        rankings.append({
            "employee_id": employee.id,
            "employee_name": employee.full_name,
            "department": employee.department or "Unassigned",
            "completion_rate": completion_rate,
            "total_goals": total_goals,
            "completed_goals": completed_goals,
        })
    
    # Sort by completion rate, then by total goals
    rankings.sort(key=lambda x: (x["completion_rate"], x["total_goals"]), reverse=True)
    
    # Add rank
    for idx, employee in enumerate(rankings[:limit], start=1):
        employee["rank"] = idx
    
    return rankings[:limit]


def get_goal_status_distribution(db: Session) -> Dict[str, int]:
    """
    Get distribution of goals by status.
    Powers status overview charts.
    
    Returns:
        {
            "pending": int,
            "in_progress": int,
            "Completed": int,
            "at_risk": int
        }
    """
    pending = db.query(Goal).filter(Goal.approval_status == "pending").count()
    completed = db.query(Goal).filter(Goal.status == "Completed").count()
    
    # In progress: approved but not completed
    in_progress = db.query(Goal).filter(
        and_(Goal.approval_status == "approved", Goal.status != "Completed")
    ).count()
    
    # At risk: goals with low progress (you can define your own logic)
    # Example: approved goals with < 25% progress
    at_risk = db.query(Goal).filter(
        and_(
            Goal.approval_status == "approved",
            Goal.status != "Completed",
            (Goal.achieved_value / Goal.target_value * 100) < 25
        )
    ).count()
    
    return {
        "pending": pending,
        "in_progress": in_progress,
        "Completed": completed,
        "at_risk": at_risk,
    }

