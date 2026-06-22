from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from database import get_db
from models import Donation
from schemas import DonationBase, Donation

router = APIRouter(prefix="/api/donations", tags=["donations"])

@router.get("/", response_model=List[Donation])
async def get_donations(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    donations = db.query(Donation).offset(skip).limit(limit).all()
    return donations

@router.get("/{donation_id}", response_model=Donation)
async def get_donation(donation_id: int, db: Session = Depends(get_db)):
    donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    return donation

@router.post("/", response_model=Donation)
async def create_donation(donation: DonationBase, db: Session = Depends(get_db)):
    payment_reference = f"DON-{uuid.uuid4().hex[:12].upper()}"
    db_donation = Donation(
        **donation.dict(),
        payment_reference=payment_reference
    )
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation

@router.put("/{donation_id}/status")
async def update_donation_status(donation_id: int, status: str, db: Session = Depends(get_db)):
    db_donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not db_donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    db_donation.status = status
    db.commit()
    db.refresh(db_donation)
    return db_donation
