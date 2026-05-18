"""
Employee Experience Routes - Achievements, Development, Calendar
"""
from datetime import datetime
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.services import employee_service

router = APIRouter()


@router.get("/achievements")
def get_employee_achievements(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return employee_service.get_employee_achievements(db, current_user["user_id"])


@router.get("/development")
def get_employee_development(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return employee_service.get_employee_development(db, current_user["user_id"])


@router.get("/calendar")
def get_employee_calendar(
    year: int = Query(None, ge=2000, le=2100),
    month: int = Query(None, ge=1, le=12),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    now = datetime.utcnow()
    use_year = year or now.year
    use_month = month or now.month
    return employee_service.get_employee_calendar(db, current_user["user_id"], use_year, use_month)
