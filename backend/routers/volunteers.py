from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from auth import get_current_admin
from database import get_db
from models import Volunteer as VolunteerModel, User as UserModel
from schemas import VolunteerBase, Volunteer as VolunteerSchema

router = APIRouter(prefix="/api/volunteers", tags=["volunteers"])

@router.get("/", response_model=List[VolunteerSchema])
async def get_volunteers(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    _admin: UserModel = Depends(get_current_admin),
):
    query = db.query(VolunteerModel)
    if status:
        query = query.filter(VolunteerModel.status == status)
    volunteers = query.offset(skip).limit(limit).all()
    return volunteers

@router.get("/{volunteer_id}", response_model=VolunteerSchema)
async def get_volunteer(
    volunteer_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    volunteer = db.query(VolunteerModel).filter(VolunteerModel.id == volunteer_id).first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    return volunteer

@router.post("/", response_model=VolunteerSchema)
async def create_volunteer(volunteer: VolunteerBase, db: Session = Depends(get_db)):
    # Sanitize inputs to prevent abuse
    if volunteer.message:
        volunteer.message = volunteer.message.strip()[:2000]
    if volunteer.skills:
        volunteer.skills = volunteer.skills.strip()[:500]
    if volunteer.availability:
        volunteer.availability = volunteer.availability.strip()[:200]
    
    db_volunteer = VolunteerModel(**volunteer.model_dump())
    db.add(db_volunteer)
    db.commit()
    db.refresh(db_volunteer)
    return db_volunteer

@router.put("/{volunteer_id}/status")
async def update_volunteer_status(
    volunteer_id: int,
    status: str,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_volunteer = db.query(VolunteerModel).filter(VolunteerModel.id == volunteer_id).first()
    if not db_volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    
    db_volunteer.status = status
    db.commit()
    db.refresh(db_volunteer)
    return db_volunteer
