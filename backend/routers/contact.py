from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from auth import get_current_admin
from database import get_db
from models import ContactMessage as ContactMessageModel, User as UserModel
from schemas import ContactMessageBase, ContactMessage as ContactMessageSchema
from email import send_contact_notification

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.get("/", response_model=List[ContactMessageSchema])
async def get_messages(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    _admin: UserModel = Depends(get_current_admin),
):
    messages = db.query(ContactMessageModel).offset(skip).limit(limit).all()
    return messages

@router.get("/{message_id}", response_model=ContactMessageSchema)
async def get_message(
    message_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    message = db.query(ContactMessageModel).filter(ContactMessageModel.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

@router.post("/", response_model=ContactMessageSchema)
async def create_message(message: ContactMessageBase, db: Session = Depends(get_db)):
    # Sanitize inputs to prevent abuse
    if message.message:
        message.message = message.message.strip()[:2000]
    if message.subject:
        message.subject = message.subject.strip()[:200]
    
    db_message = ContactMessageModel(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # Send email notification
    await send_contact_notification(
        name=message.name,
        email=message.email,
        subject=message.subject or "No Subject",
        message=message.message,
    )
    
    return db_message

@router.put("/{message_id}/status")
async def update_message_status(
    message_id: int,
    status: str,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_message = db.query(ContactMessageModel).filter(ContactMessageModel.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db_message.status = status
    db.commit()
    db.refresh(db_message)
    return db_message
