from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from app.core.database import Base


class AuditLog(Base):
    """
    Audit log model for tracking all important actions in the system.
    Provides enterprise-grade compliance and governance tracking.
    """
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    user_email = Column(String, nullable=True)  # Denormalized for quick access
    action = Column(String, nullable=False, index=True)  # e.g., "goal_created", "goal_approved"
    target = Column(String, nullable=False)  # e.g., "Goal #14", "User #5"
    target_id = Column(Integer, nullable=True, index=True)  # ID of the affected entity
    old_value = Column(Text, nullable=True)  # JSON string of old state
    new_value = Column(Text, nullable=True)  # JSON string of new state
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    ip_address = Column(String, nullable=True)  # Optional: track IP for security
    details = Column(Text, nullable=True)  # Additional context

    def __repr__(self):
        return f"<AuditLog {self.user_email} {self.action} {self.target} at {self.timestamp}>"
