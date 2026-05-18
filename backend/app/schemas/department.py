"""
Department Schemas
Pydantic models for department API requests/responses
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class DepartmentBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Department name")
    code: str = Field(..., min_length=2, max_length=20, description="Department code (e.g., ENG, HR)")
    description: Optional[str] = Field(None, description="Department description")
    manager_name: Optional[str] = Field(None, description="Department manager name")
    manager_email: Optional[str] = Field(None, description="Department manager email")
    budget: Optional[str] = Field(None, description="Department budget")
    location: Optional[str] = Field(None, description="Department location")
    status: Optional[str] = Field("active", description="Department status (active/inactive)")


class DepartmentCreate(DepartmentBase):
    """Schema for creating a new department"""
    pass


class DepartmentUpdate(BaseModel):
    """Schema for updating a department (all fields optional)"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    code: Optional[str] = Field(None, min_length=2, max_length=20)
    description: Optional[str] = None
    manager_name: Optional[str] = None
    manager_email: Optional[str] = None
    budget: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None


class DepartmentResponse(DepartmentBase):
    """Schema for department response"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class DepartmentWithStats(DepartmentResponse):
    """Department with analytics statistics"""
    employee_count: int = 0
    total_goals: int = 0
    completed_goals: int = 0
    avg_performance: float = 0.0
    completion_rate: float = 0.0
