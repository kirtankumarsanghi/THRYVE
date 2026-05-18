import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Use PostgreSQL in production, SQLite in development
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./thryve.db")

# Fix for Render's postgres:// URL (needs to be postgresql://)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Add SSL parameter to PostgreSQL URL if not already present
if "postgresql" in DATABASE_URL and "sslmode" not in DATABASE_URL:
    separator = "&" if "?" in DATABASE_URL else "?"
    DATABASE_URL = f"{DATABASE_URL}{separator}sslmode=require"

# Configure connection arguments and engine kwargs
connect_args = {}
engine_kwargs = {
    "pool_pre_ping": True,  # Verify connections before using
    "pool_recycle": 300,  # Recycle connections after 5 minutes
    "echo": False,  # Set to True for SQL query logging
}

if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}
else:
    # Pool sizing is useful for client/server DBs (PostgreSQL/MySQL/etc.)
    engine_kwargs.update(
        {
            "pool_size": 10,  # Maximum number of connections in the pool
            "max_overflow": 20,  # Maximum overflow connections
            "pool_timeout": 30,
        }
    )

if "postgresql" in DATABASE_URL:
    # Additional connection settings for PostgreSQL
    connect_args = {
        "connect_timeout": 10,
        "options": "-c timezone=utc",
    }

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    **engine_kwargs,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
