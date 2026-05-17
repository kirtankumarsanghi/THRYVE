from sqlalchemy import Column, Integer, String

from app.core.database import Base


class QuarterlyWindow(Base):
    __tablename__ = "quarterly_windows"

    id = Column(Integer, primary_key=True, index=True)
    window_name = Column(String, unique=True, nullable=False)
    start_month = Column(Integer, nullable=False)
    start_day = Column(Integer, nullable=False)
    end_month = Column(Integer, nullable=False)
    end_day = Column(Integer, nullable=False)
