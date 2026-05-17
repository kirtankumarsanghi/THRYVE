from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User

router = APIRouter()


@router.get("/auth")
def auth_health(db: Session = Depends(get_db)):
    """
    Auth health check:
    - Verifies DB connectivity
    - Reports demo-account presence
    """
    db.execute(text("SELECT 1"))
    demo_emails = ["employee@thryve.com", "manager@thryve.com", "admin@thryve.com"]
    demo_count = db.query(User).filter(User.email.in_(demo_emails)).count()

    return {
        "status": "ok",
        "auth": "ready",
        "database": "connected",
        "demo_accounts_present": demo_count,
    }
