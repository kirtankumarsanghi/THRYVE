from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.core.database import Base


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True)

    title = Column(String, nullable=False)

    description = Column(String)

    target_value = Column(Float)

    achieved_value = Column(Float, default=0)

    weightage = Column(Float)

    uom_type = Column(String)

    status = Column(
        String,
        default="pending"
    )

    employee_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    employee = relationship("User")