from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import ContactMessage
from schemas import ContactMessageBase, ContactMessage

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.get("/", response_model=List[ContactMessage])
async def get_messages(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    messages = db.query(ContactMessage).offset(skip).limit(limit).all()
    return messages

@router.get("/{message_id}", response_model=ContactMessage)
async def get_message(message_id: int, db: Session = Depends(get_db)):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

@router.post("/", response_model=ContactMessage)
async def create_message(message: ContactMessageBase, db: Session = Depends(get_db)):
    db_message = ContactMessage(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.put("/{message_id}/status")
async def update_message_status(message_id: int, status: str, db: Session = Depends(get_db)):
    db_message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db_message.status = status
    db.commit()
    db.refresh(db_message)
    return db_message
