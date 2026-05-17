from sqlalchemy.orm import Session

from app.models.user import User

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


def register_user(data, db: Session):

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:
        return None

    user = User(
        full_name=data.full_name,
        email=data.email,
        password=hash_password(data.password),
        role=data.role,
        department=data.department
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def login_user(data, db: Session):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        return None

    valid = verify_password(
        data.password,
        user.password
    )

    if not valid:
        return None

    token = create_access_token({
        "user_id": user.id,
        "role": user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role
        }
    }