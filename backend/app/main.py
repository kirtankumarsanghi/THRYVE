from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine, SessionLocal
from app.api.api_router import router
from app.core.security import hash_password

# Import all models so SQLAlchemy registers them
from app.models.user import User  # noqa: F401
from app.models.goal import Goal  # noqa: F401
from app.models.checkin import Checkin  # noqa: F401
from app.models.audit import AuditLog  # noqa: F401
from app.models.quarterly_window import QuarterlyWindow  # noqa: F401
from app.utils.quarterly_windows import WINDOW_CONFIG

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="THRYVE API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


def ensure_demo_users():
    """Ensure demo accounts exist so hackathon quick-login always works."""
    demo_users = [
        {
            "full_name": "Alex Johnson",
            "email": "employee@thryve.com",
            "password": "employee123",
            "role": "employee",
            "department": "Engineering",
            "status": "active",
        },
        {
            "full_name": "Sarah Chen",
            "email": "manager@thryve.com",
            "password": "manager123",
            "role": "manager",
            "department": "Engineering",
            "status": "active",
        },
        {
            "full_name": "Marcus Rivera",
            "email": "admin@thryve.com",
            "password": "admin123",
            "role": "admin",
            "department": "Executive",
            "status": "active",
        },
    ]

    db = SessionLocal()
    try:
        for data in demo_users:
            existing = db.query(User).filter(User.email == data["email"]).first()
            if existing:
                continue

            db.add(
                User(
                    full_name=data["full_name"],
                    email=data["email"],
                    password=hash_password(data["password"]),
                    role=data["role"],
                    department=data["department"],
                    status=data["status"],
                )
            )
        db.commit()
    finally:
        db.close()


def ensure_default_quarterly_windows():
    db = SessionLocal()
    try:
        existing = db.query(QuarterlyWindow).count()
        if existing > 0:
            return

        for name, cfg in WINDOW_CONFIG.items():
            sm, sd = cfg["start"]
            em, ed = cfg["end"]
            db.add(
                QuarterlyWindow(
                    window_name=name,
                    start_month=sm,
                    start_day=sd,
                    end_month=em,
                    end_day=ed,
                )
            )
        db.commit()
    finally:
        db.close()


@app.on_event("startup")
def startup_bootstrap():
    ensure_demo_users()
    ensure_default_quarterly_windows()


@app.get("/")
def root():
    return {"message": "THRYVE Backend Running"}
