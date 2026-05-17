"""
Reports Service
Handles achievement reports export and completion dashboard.
"""
from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List, Dict, Optional
import csv
import io
from datetime import datetime

from app.models.goal import Goal
from app.models.user import User
from app.models.checkin import Checkin
from app.utils.uom_calculator import calculate_achievement_percentage
from app.utils.quarterly_windows import _get_window_config, is_window_active


def generate_achievement_report_data(db: Session, department: str = None) -> List[Dict]:
    query = db.query(Goal, User).join(User, Goal.employee_id == User.id)

    if department:
        query = query.filter(User.department == department)

    results = query.all()

    report_data = []
    for goal, user in results:
        achievement_pct = calculate_achievement_percentage(
            uom_type=goal.uom_type,
            target_value=goal.target_value,
            achieved_value=goal.achieved_value,
            uom_direction=goal.uom_direction,
            target_date=goal.target_date,
            completion_date=goal.completion_date,
        )

        report_data.append({
            "employee_name": user.full_name,
            "employee_email": user.email,
            "department": user.department,
            "goal_title": goal.title,
            "strategic_area": goal.strategic_area,
            "quarter": goal.quarter,
            "uom_type": goal.uom_type,
            "target_value": goal.target_value,
            "achieved_value": goal.achieved_value,
            "achievement_percentage": round(achievement_pct, 2),
            "weightage": goal.weightage,
            "status": goal.status,
            "approval_status": goal.approval_status,
            "is_shared": goal.is_shared,
            "shared_by": goal.shared_by.full_name if goal.shared_by else None,
        })

    return report_data


def generate_achievement_report_csv(db: Session, department: str = None) -> str:
    data = generate_achievement_report_data(db, department)

    if not data:
        return ""

    output = io.StringIO()
    fieldnames = [
        "employee_name", "employee_email", "department", "goal_title",
        "strategic_area", "quarter", "uom_type", "target_value",
        "achieved_value", "achievement_percentage", "weightage",
        "status", "approval_status", "is_shared", "shared_by"
    ]

    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)

    return output.getvalue()


def generate_achievement_report_xlsx(db: Session, department: str = None) -> bytes:
    try:
        from openpyxl import Workbook
        from openpyxl.styles import Font
    except ImportError:
        raise HTTPException(
            status_code=500,
            detail="XLSX export requires openpyxl. Install dependency: pip install openpyxl",
        )

    data = generate_achievement_report_data(db, department)
    if not data:
        return b""

    wb = Workbook()
    ws = wb.active
    ws.title = "Achievement Report"

    headers = [
        "Employee Name", "Employee Email", "Department", "Goal Title",
        "Strategic Area", "Quarter", "UoM Type", "Target Value",
        "Achieved Value", "Achievement %", "Weightage",
        "Status", "Approval Status", "Is Shared", "Shared By"
    ]
    ws.append(headers)

    for col in ws[1]:
        col.font = Font(bold=True)

    for row in data:
        ws.append([
            row.get("employee_name"),
            row.get("employee_email"),
            row.get("department"),
            row.get("goal_title"),
            row.get("strategic_area"),
            row.get("quarter"),
            row.get("uom_type"),
            row.get("target_value"),
            row.get("achieved_value"),
            f"{row.get('achievement_percentage', 0):.2f}%",
            f"{row.get('weightage', 0):.2f}%",
            row.get("status"),
            row.get("approval_status"),
            row.get("is_shared"),
            row.get("shared_by"),
        ])

    stream = io.BytesIO()
    wb.save(stream)
    stream.seek(0)
    return stream.read()


def get_completion_dashboard_data(
    db: Session,
    quarter: str = None,
    department: str = None,
    completion_status: str = None
) -> Dict:
    employees_query = db.query(User).filter(User.role == "employee")

    if department:
        employees_query = employees_query.filter(User.department == department)

    employees = employees_query.all()

    completion_data = []
    total_completed = 0
    total_incomplete = 0

    for employee in employees:
        goals_query = db.query(Goal).filter(Goal.employee_id == employee.id)

        if quarter:
            goals_query = goals_query.filter(Goal.quarter == quarter)

        goals = goals_query.all()

        if not goals:
            continue

        completed_checkins = 0
        total_goals = len(goals)

        for goal in goals:
            checkin_query = db.query(Checkin).filter(Checkin.goal_id == goal.id)

            if quarter:
                checkin_query = checkin_query.filter(Checkin.quarter == quarter)

            checkin = checkin_query.first()

            if checkin:
                completed_checkins += 1

        completion_rate = (completed_checkins / total_goals * 100) if total_goals > 0 else 0
        is_completed = completed_checkins == total_goals

        if completion_status == "completed" and not is_completed:
            continue
        if completion_status == "incomplete" and is_completed:
            continue

        if is_completed:
            total_completed += 1
        else:
            total_incomplete += 1

        completion_data.append({
            "employee_id": employee.id,
            "employee_name": employee.full_name,
            "employee_email": employee.email,
            "department": employee.department,
            "total_goals": total_goals,
            "completed_checkins": completed_checkins,
            "completion_rate": round(completion_rate, 2),
            "is_completed": is_completed,
            "quarter": quarter or "All",
        })

    total_employees = len(completion_data)
    overall_completion_rate = (total_completed / total_employees * 100) if total_employees > 0 else 0

    return {
        "quarter": quarter or "All",
        "department": department or "All",
        "completion_status": completion_status or "All",
        "total_employees": total_employees,
        "completed": total_completed,
        "incomplete": total_incomplete,
        "overall_completion_rate": round(overall_completion_rate, 2),
        "employees": completion_data,
    }


def get_quarterly_window_status(db: Optional[Session] = None) -> Dict:
    current_date = datetime.now()
    cfg = _get_window_config(db)

    current_window = None
    for name in cfg.keys():
        if is_window_active(name, current_date.date(), db):
            current_window = name
            break

    windows = []
    for name, item in cfg.items():
        sm, sd = item["start"]
        em, ed = item["end"]
        windows.append({
            "window_name": name,
            "start": f"{sm:02d}-{sd:02d}",
            "end": f"{em:02d}-{ed:02d}",
            "is_active": is_window_active(name, current_date.date(), db),
        })

    next_window = None
    if current_window is None and windows:
        next_window = windows[0]["window_name"]

    return {
        "current_month": current_date.strftime("%B %Y"),
        "current_window": current_window,
        "next_window": next_window,
        "is_active_window": current_window is not None,
        "windows": windows,
    }
