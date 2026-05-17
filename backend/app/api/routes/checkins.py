from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_manager
from app.schemas.checkin import CheckinCreate, CheckinUpdate
from app.services.checkin_service import create_checkin, update_checkin_manager_comment, get_checkins_for_goal
from app.models.user import User

router = APIRouter()


@router.post("/{goal_id}")
def submit_checkin(
    goal_id: int,
    data: CheckinCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Submit a quarterly check-in for a specific goal."""
    # Get user email for audit log
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    user_email = user.email if user else None
    
    return create_checkin(goal_id, data, current_user["user_id"], db, user_email=user_email)


@router.put("/{checkin_id}/manager-review")
def manager_review_checkin(
    checkin_id: int,
    data: CheckinUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    """Manager adds structured comment and status update for a check-in."""
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    user_email = user.email if user else None
    return update_checkin_manager_comment(checkin_id, data, current_user["user_id"], db, user_email=user_email)


@router.get("/goal/{goal_id}")
def get_goal_checkin_history(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Get check-in history including employee and manager comments."""
    return get_checkins_for_goal(goal_id, db)
