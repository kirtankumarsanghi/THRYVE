from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import date


class GoalCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    strategic_area: Optional[str] = ""
    target_value: float = 0
    weightage: float = Field(..., ge=10, le=100, description="Weightage must be between 10% and 100%")
    
    # UoM Type Enhancement
    uom_type: str = Field(default="Numeric", description="One of: Numeric, Percentage, Timeline, Zero-based")
    uom_direction: Optional[str] = Field(default="Higher is Better", description="For Numeric/Percentage: Higher is Better or Lower is Better")
    target_date: Optional[date] = None
    
    quarter: str = "Q1"
    
    # Shared Goals
    is_shared: Optional[bool] = False
    recipient_ids: Optional[list[int]] = []  # For creating shared goals
    
    @validator('uom_type')
    def validate_uom_type(cls, v):
        valid_types = ["Numeric", "Percentage", "Timeline", "Zero-based"]
        if v not in valid_types:
            raise ValueError(f"uom_type must be one of: {', '.join(valid_types)}")
        return v
    
    @validator('uom_direction')
    def validate_uom_direction(cls, v):
        valid_directions = ["Higher is Better", "Lower is Better"]
        if v not in valid_directions:
            raise ValueError(f"uom_direction must be one of: {', '.join(valid_directions)}")
        return v


class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    strategic_area: Optional[str] = None
    target_value: Optional[float] = None
    weightage: Optional[float] = Field(None, ge=10, le=100)
    uom_type: Optional[str] = None
    uom_direction: Optional[str] = None
    target_date: Optional[date] = None
    completion_date: Optional[date] = None
    quarter: Optional[str] = None
    status: Optional[str] = None
    achieved_value: Optional[float] = None
    
    @validator('status')
    def validate_status(cls, v):
        if v is not None:
            valid_statuses = ["Not Started", "On Track", "Completed"]
            if v not in valid_statuses:
                raise ValueError(f"status must be one of: {', '.join(valid_statuses)}")
        return v


class GoalResponse(BaseModel):
    id: int
    title: str
    description: str
    strategic_area: str
    target_value: float
    achieved_value: float
    weightage: float
    uom_type: str
    uom_direction: Optional[str] = "Higher is Better"
    target_date: Optional[date] = None
    completion_date: Optional[date] = None
    quarter: str
    status: str
    approval_status: str
    manager_comment: str
    is_locked: bool
    is_shared: bool
    shared_by_id: Optional[int] = None
    parent_goal_id: Optional[int] = None
    employee_id: int
    achievement_percentage: Optional[float] = None  # Calculated field

    class Config:
        from_attributes = True


class SharedGoalCreate(BaseModel):
    """Schema for creating a shared goal pushed to multiple employees."""
    title: str
    description: Optional[str] = ""
    strategic_area: Optional[str] = ""
    target_value: float = 0
    uom_type: str = "Numeric"
    uom_direction: Optional[str] = "Higher is Better"
    target_date: Optional[date] = None
    quarter: str = "Q1"
    recipient_ids: list[int] = Field(..., min_items=1, description="List of employee IDs to receive this shared goal")
    default_weightage: float = Field(default=10, ge=10, le=100, description="Default weightage for recipients")
