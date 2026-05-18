from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.database import Base, engine, SessionLocal
from app.api.api_router import router
from app.core.security import hash_password

# Import all models so SQLAlchemy registers them
from app.models.user import User  # noqa: F401
from app.models.goal import Goal  # noqa: F401
from app.models.checkin import Checkin  # noqa: F401
from app.models.audit import AuditLog  # noqa: F401
from app.models.quarterly_window import QuarterlyWindow  # noqa: F401
from app.models.department import Department  # noqa: F401
from app.utils.quarterly_windows import WINDOW_CONFIG

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="THRYVE API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=False,
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


def ensure_legacy_schema_columns():
    """Add missing columns for legacy SQLite tables if missing."""
    with engine.begin() as conn:
        goal_columns = conn.execute(text("PRAGMA table_info(goals)")).fetchall()
        goal_column_names = {row[1] for row in goal_columns}
        goal_additions = [
            ("uom_type", "TEXT DEFAULT 'Numeric'"),
            ("uom_direction", "TEXT DEFAULT 'Higher is Better'"),
            ("target_date", "DATE"),
            ("completion_date", "DATE"),
            ("approval_status", "TEXT DEFAULT 'pending'"),
            ("manager_comment", "TEXT DEFAULT ''"),
            ("is_locked", "BOOLEAN DEFAULT 0"),
            ("is_shared", "BOOLEAN DEFAULT 0"),
            ("shared_by_id", "INTEGER"),
            ("parent_goal_id", "INTEGER"),
            ("created_at", "DATETIME"),
            ("updated_at", "DATETIME"),
        ]
        for column_name, definition in goal_additions:
            if column_name not in goal_column_names:
                conn.execute(text(f"ALTER TABLE goals ADD COLUMN {column_name} {definition}"))

        conn.execute(text("UPDATE goals SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL"))
        conn.execute(text("UPDATE goals SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL"))

        checkin_columns = conn.execute(text("PRAGMA table_info(checkins)")).fetchall()
        checkin_column_names = {row[1] for row in checkin_columns}
        checkin_additions = [
            ("manager_comment", "TEXT DEFAULT ''"),
            ("created_at", "DATETIME"),
            ("updated_at", "DATETIME"),
        ]
        for column_name, definition in checkin_additions:
            if column_name not in checkin_column_names:
                conn.execute(text(f"ALTER TABLE checkins ADD COLUMN {column_name} {definition}"))

        conn.execute(text("UPDATE checkins SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL"))
        conn.execute(text("UPDATE checkins SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL"))


@app.on_event("startup")
def startup_bootstrap():
    ensure_legacy_schema_columns()
    ensure_demo_users()
    ensure_default_quarterly_windows()


@app.get("/")
def root():
    return {"message": "THRYVE Backend Running"}
