from datetime import datetime
from pydantic import BaseModel, Field


class MeetingCreateSchema(BaseModel):
    employee_id: int
    starts_at: datetime
    notes: str = Field(default="", max_length=2000)


class MeetingUpdateSchema(BaseModel):
    starts_at: datetime | None = None
    notes: str | None = Field(default=None, max_length=2000)


class MeetingResponseSchema(BaseModel):
    id: int
    manager_id: int
    employee_id: int
    employee_name: str
    starts_at: datetime
    notes: str
    created_at: datetime
    updated_at: datetime
