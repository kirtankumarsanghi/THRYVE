from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime


class CheckinCreate(BaseModel):
    quarter: str
    planned_value: float = 0
    achieved_value: float = 0
    comment: Optional[str] = ""
    status: Optional[str] = "Not Started"  # Standardized: Not Started, On Track, Completed

    @field_validator("status")
    @classmethod
    def validate_status(cls, value: Optional[str]):
        if value is None:
            return value
        allowed = {"Not Started", "On Track", "Completed"}
        if value not in allowed:
            raise ValueError("status must be one of: Not Started, On Track, Completed")
        return value


class CheckinUpdate(BaseModel):
    """Schema for manager to update check-in with comments."""
    manager_comment: Optional[str] = ""
    status: Optional[str] = None
    reviewed_at: Optional[str] = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, value: Optional[str]):
        if value is None:
            return value
        allowed = {"Not Started", "On Track", "Completed"}
        if value not in allowed:
            raise ValueError("status must be one of: Not Started, On Track, Completed")
        return value


class CheckinResponse(BaseModel):
    id: int
    quarter: str
    planned_value: float
    achieved_value: float
    progress_percentage: float
    status: str
    comment: str
    manager_comment: str
    goal_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
