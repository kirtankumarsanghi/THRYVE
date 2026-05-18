from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_manager
from app.models.meeting import ManagerMeeting
from app.models.user import User
from app.schemas.meeting import MeetingCreateSchema, MeetingResponseSchema, MeetingUpdateSchema

router = APIRouter()


def _serialize(meeting: ManagerMeeting, db: Session):
    employee = db.query(User).filter(User.id == meeting.employee_id).first()
    return {
        "id": meeting.id,
        "manager_id": meeting.manager_id,
        "employee_id": meeting.employee_id,
        "employee_name": employee.full_name if employee else "Unknown Employee",
        "starts_at": meeting.starts_at,
        "notes": meeting.notes or "",
        "created_at": meeting.created_at,
        "updated_at": meeting.updated_at,
    }


@router.get("", response_model=list[MeetingResponseSchema])
def list_manager_meetings(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    query = db.query(ManagerMeeting)
    if current_user["role"] != "admin":
        query = query.filter(ManagerMeeting.manager_id == current_user["user_id"])

    meetings = query.order_by(ManagerMeeting.starts_at.asc()).all()
    return [_serialize(m, db) for m in meetings]


@router.post("", response_model=MeetingResponseSchema)
def create_manager_meeting(
    data: MeetingCreateSchema,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    employee = db.query(User).filter(User.id == data.employee_id, User.role == "employee").first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    meeting = ManagerMeeting(
        manager_id=current_user["user_id"],
        employee_id=data.employee_id,
        starts_at=data.starts_at,
        notes=data.notes.strip(),
    )
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return _serialize(meeting, db)


@router.put("/{meeting_id}", response_model=MeetingResponseSchema)
def update_manager_meeting(
    meeting_id: int,
    data: MeetingUpdateSchema,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    meeting = db.query(ManagerMeeting).filter(ManagerMeeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    if current_user["role"] != "admin" and meeting.manager_id != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not allowed to modify this meeting")

    if data.starts_at is not None:
        meeting.starts_at = data.starts_at
    if data.notes is not None:
        meeting.notes = data.notes.strip()

    db.commit()
    db.refresh(meeting)
    return _serialize(meeting, db)


@router.delete("/{meeting_id}")
def delete_manager_meeting(
    meeting_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_manager),
):
    meeting = db.query(ManagerMeeting).filter(ManagerMeeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    if current_user["role"] != "admin" and meeting.manager_id != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not allowed to delete this meeting")

    db.delete(meeting)
    db.commit()
    return {"message": "Meeting deleted"}
