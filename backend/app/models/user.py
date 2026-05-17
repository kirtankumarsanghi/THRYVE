from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="employee")
    department = Column(String)
    status = Column(String, default="active")

    # ── Relationships ──
    goals = relationship(
        "Goal",
        back_populates="employee",
        lazy="select",
        foreign_keys="Goal.employee_id",
    )
