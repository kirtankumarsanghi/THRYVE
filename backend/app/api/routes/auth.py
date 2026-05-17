from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

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

    return response