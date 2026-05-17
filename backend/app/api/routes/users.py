from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_manager
from app.models.user import User

router = APIRouter()


@router.get("/employees")
def list_employees(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    employees = db.query(User).filter(User.role == "employee").all()
    return [
        {
            "id": e.id,
            "full_name": e.full_name,
            "email": e.email,
            "department": e.department,
            "status": e.status,
        }
        for e in employees
    ]
