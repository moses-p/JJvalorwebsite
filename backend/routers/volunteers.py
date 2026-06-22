from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Volunteer
from schemas import VolunteerBase, Volunteer

router = APIRouter(prefix="/api/volunteers", tags=["volunteers"])

@router.get("/", response_model=List[Volunteer])
async def get_volunteers(db: Session = Depends(get_db), skip: int = 0, limit: int = 100, status: str = None):
    query = db.query(Volunteer)
    if status:
        query = query.filter(Volunteer.status == status)
    volunteers = query.offset(skip).limit(limit).all()
    return volunteers

@router.get("/{volunteer_id}", response_model=Volunteer)
async def get_volunteer(volunteer_id: int, db: Session = Depends(get_db)):
    volunteer = db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    return volunteer

@router.post("/", response_model=Volunteer)
async def create_volunteer(volunteer: VolunteerBase, db: Session = Depends(get_db)):
    db_volunteer = Volunteer(**volunteer.dict())
    db.add(db_volunteer)
    db.commit()
    db.refresh(db_volunteer)
    return db_volunteer

@router.put("/{volunteer_id}/status")
async def update_volunteer_status(volunteer_id: int, status: str, db: Session = Depends(get_db)):
    db_volunteer = db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()
    if not db_volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    
    db_volunteer.status = status
    db.commit()
    db.refresh(db_volunteer)
    return db_volunteer
