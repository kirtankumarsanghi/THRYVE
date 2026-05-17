from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.notification import NotificationListResponse
from app.services.notification_service import build_notifications_for_user

router = APIRouter()


@router.get("/", response_model=NotificationListResponse)
def get_notifications(
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return build_notifications_for_user(
        db=db,
        user_id=current_user["user_id"],
        role=current_user.get("role", "employee"),
        limit=limit,
    )
