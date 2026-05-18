from sqlalchemy.orm import Session
import os
from types import SimpleNamespace

from app.models.user import User

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

DEMO_USERS = {
    "employee@thryve.com": {
        "full_name": "Alex Johnson",
        "password": "employee123",
        "role": "employee",
        "department": "Engineering",
        "status": "active",
    },
    "manager@thryve.com": {
        "full_name": "Sarah Chen",
        "password": "manager123",
        "role": "manager",
        "department": "Engineering",
        "status": "active",
    },
    "admin@thryve.com": {
        "full_name": "Marcus Rivera",
        "password": "admin123",
        "role": "admin",
        "department": "Executive",
        "status": "active",
    },
}

DEMO_ROLE_TO_EMAIL = {
    "employee": "employee@thryve.com",
    "manager": "manager@thryve.com",
    "admin": "admin@thryve.com",
}


def ensure_demo_user_for_login(email: str, password: str, db: Session):
    """
    Self-healing demo auth:
    - If a demo user is deleted, recreate it on login.
    - If password/status drifts, repair it so demo login always works.
    """
    demo = DEMO_USERS.get(email)
    if not demo or password != demo["password"]:
        return

    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            full_name=demo["full_name"],
            email=email,
            password=hash_password(demo["password"]),
            role=demo["role"],
            department=demo["department"],
            status=demo["status"],
        )
        db.add(user)
        db.commit()
        return

    repaired = False
    if user.status != "active":
        user.status = "active"
        repaired = True
    if user.role != demo["role"]:
        user.role = demo["role"]
        repaired = True
    if not verify_password(demo["password"], user.password):
        user.password = hash_password(demo["password"])
        repaired = True

    if repaired:
        db.commit()

def auto_provision_user_if_enabled(email: str, password: str, db: Session):
    """
    Dev/demo safety net:
    - If enabled, first-time login auto-creates an active employee account.
    - Prevents lockouts during demos when registration flow is skipped.
    """
    enabled = os.getenv("AUTH_AUTO_PROVISION", "true").lower() == "true"
    if not enabled:
        return None

    user = db.query(User).filter(User.email == email).first()
    if user:
        return user

    local_name = email.split("@")[0].replace(".", " ").replace("_", " ").strip()
    full_name = " ".join(part.capitalize() for part in local_name.split()) or "Demo User"
    user = User(
        full_name=full_name,
        email=email,
        password=hash_password(password),
        role="employee",
        department="General",
        status="active",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def register_user(data, db: Session):
    normalized_email = data.email.strip().lower()
    existing_user = db.query(User).filter(
        User.email == normalized_email
    ).first()

    if existing_user:
        return None

    user = User(
        full_name=data.full_name,
        email=normalized_email,
        password=hash_password(data.password),
        role=data.role,
        department=data.department
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def login_user(data, db: Session):
    normalized_email = data.email.strip().lower()
    ensure_demo_user_for_login(normalized_email, data.password, db)
    user = db.query(User).filter(
        User.email == normalized_email
    ).first()

    if not user:
        user = auto_provision_user_if_enabled(normalized_email, data.password, db)
        if not user:
            return None

    if user.status and user.status.lower() != "active":
        return {
            "error": "Account is inactive. Please contact an administrator."
        }

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


def login_demo_user(role: str, db: Session):
    email = DEMO_ROLE_TO_EMAIL.get(role)
    if not email:
        return None

    demo = DEMO_USERS[email]
    return login_user(
        SimpleNamespace(email=email, password=demo["password"]),
        db,
    )
