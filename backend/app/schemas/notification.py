from pydantic import BaseModel
from typing import Optional


class NotificationItem(BaseModel):
    id: str
    type: str
    title: str
    message: str
    entity_type: str
    entity_id: int
    role_scope: str
    created_at: Optional[str] = None
    route: str


class NotificationListResponse(BaseModel):
    items: list[NotificationItem]
    total: int
