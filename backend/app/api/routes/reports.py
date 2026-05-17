"""
Reports API Routes
Handles achievement reports export and completion dashboard.
"""
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.reports_service import (
    generate_achievement_report_data,
    generate_achievement_report_csv,
    generate_achievement_report_xlsx,
    get_completion_dashboard_data,
    get_quarterly_window_status,
)

router = APIRouter()


@router.get("/achievement")
def get_achievement_report(
    department: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get achievement report data (JSON format).
    Only admin and manager can access.
    """
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    if not user or user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Only admin or manager can access reports")
    
    data = generate_achievement_report_data(db, department)
    
    return {
        "report_type": "Achievement Report",
        "department": department or "All",
        "total_records": len(data),
        "data": data,
    }


@router.get("/achievement/export/csv")
def export_achievement_report_csv(
    department: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Export achievement report as CSV file.
    Only admin and manager can access.
    """
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    if not user or user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Only admin or manager can export reports")
    
    csv_content = generate_achievement_report_csv(db, department)
    
    if not csv_content:
        raise HTTPException(status_code=404, detail="No data available for export")
    
    # Generate filename with timestamp
    from datetime import datetime
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"achievement_report_{timestamp}.csv"
    
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename={filename}"
        }
    )


@router.get("/achievement/export/xlsx")
def export_achievement_report_xlsx(
    department: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Export achievement report as XLSX file."""
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    if not user or user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Only admin or manager can export reports")

    xlsx_bytes = generate_achievement_report_xlsx(db, department)
    if not xlsx_bytes:
        raise HTTPException(status_code=404, detail="No data available for export")

    from datetime import datetime
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"achievement_report_{timestamp}.xlsx"

    return Response(
        content=xlsx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )


@router.get("/completion-dashboard")
def get_completion_dashboard(
    quarter: Optional[str] = None,
    department: Optional[str] = None,
    completion_status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Get completion dashboard showing check-in completion rates.
    Only admin and manager can access.
    """
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    if not user or user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Only admin or manager can access completion dashboard")
    
    data = get_completion_dashboard_data(db, quarter, department, completion_status)
    
    return data


@router.get("/quarterly-window")
def get_quarterly_window(db: Session = Depends(get_db)):
    """
    Get current quarterly window status.
    Available to all authenticated users.
    """
    return get_quarterly_window_status(db)
