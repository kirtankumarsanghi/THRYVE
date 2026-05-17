from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Date, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, default="")
    strategic_area = Column(String, default="")
    target_value = Column(Float, default=0)
    achieved_value = Column(Float, default=0)
    weightage = Column(Float, default=0)
    
    # ── UoM Type Enhancement ──
    # Valid values: "Numeric", "Percentage", "Timeline", "Zero-based"
    uom_type = Column(String, default="Numeric")
    # For Numeric/Percentage: "Higher is Better" or "Lower is Better"
    uom_direction = Column(String, default="Higher is Better")
    # For Timeline UoM
    target_date = Column(Date, nullable=True)
    completion_date = Column(Date, nullable=True)
    
    quarter = Column(String, default="Q1")
    # Standardized status: "Not Started", "On Track", "Completed"
    status = Column(String, default="Not Started")

    # ── Approval workflow fields ──
    approval_status = Column(String, default="pending")  # pending | approved | rejected
    manager_comment = Column(String, default="")
    is_locked = Column(Boolean, default=False)

    # ── Shared Goals fields ──
    is_shared = Column(Boolean, default=False)
    shared_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Primary owner
    parent_goal_id = Column(Integer, ForeignKey("goals.id"), nullable=True)  # Link to parent shared goal
    created_at = Column(DateTime, default=datetime.utcnow, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)

    # ── Foreign keys ──
    employee_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # ── Relationships ──
    employee = relationship("User", back_populates="goals", foreign_keys=[employee_id])
    shared_by = relationship("User", foreign_keys=[shared_by_id])
    parent_goal = relationship("Goal", remote_side=[id], foreign_keys=[parent_goal_id])
    checkins = relationship("Checkin", back_populates="goal", lazy="select")
