from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

from app.schemas.auth import (
    RegisterSchema,
    LoginSchema
)

from app.services.auth_service import (
    register_user,
    login_user
)

router = APIRouter()


@router.post("/register")
def register(
    data: RegisterSchema,
    db: Session = Depends(get_db)
):

    user = register_user(data, db)

    if not user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    return {
        "message": "User created"
    }


@router.post("/login")
def login(
    data: LoginSchema,
    db: Session = Depends(get_db)
):

    response = login_user(data, db)

    if not response:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if response.get("error"):
        raise HTTPException(
            status_code=403,
            detail=response["error"]
        )

    return response


@router.get("/me")
def get_me(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get the currently authenticated user's profile."""
    user = db.query(User).filter(User.id == current_user["user_id"]).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "name": user.full_name,
        "email": user.email,
        "role": user.role,
        "department": user.department,
        "status": user.status,
    }
