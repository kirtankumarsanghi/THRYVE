from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime


class Checkin(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True)
    quarter = Column(String, nullable=False)
    planned_value = Column(Float, default=0)
    achieved_value = Column(Float, default=0)
    progress_percentage = Column(Float, default=0)
    status = Column(String, default="submitted")
    comment = Column(String, default="")
    
    # ── Manager Check-in Comment ──
    manager_comment = Column(String, default="")

    # ── Foreign keys ──
    goal_id = Column(Integer, ForeignKey("goals.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)

    # ── Relationships ──
    goal = relationship("Goal", back_populates="checkins")
