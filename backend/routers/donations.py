from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from auth import get_current_admin
from database import get_db
from models import Donation as DonationModel, User as UserModel
from schemas import DonationBase, Donation as DonationSchema

router = APIRouter(prefix="/api/donations", tags=["donations"])

@router.post("/", response_model=DonationSchema)
async def create_donation(donation: DonationBase, db: Session = Depends(get_db)):
    # Validate amount
    if donation.amount < 1000:
        raise HTTPException(status_code=400, detail="Minimum donation amount is UGX 1,000")
    if donation.amount > 100000000:
        raise HTTPException(status_code=400, detail="Maximum donation amount is UGX 100,000,000")
    
    # Sanitize message to prevent XSS
    if donation.message:
        donation.message = donation.message.strip()[:1000]
    
    payment_reference = f"DON-{uuid.uuid4().hex[:12].upper()}"
    db_donation = DonationModel(
        **donation.model_dump(),
        payment_reference=payment_reference
    )
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation

@router.get("/", response_model=List[DonationSchema])
async def get_donations(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    _admin: UserModel = Depends(get_current_admin),
):
    donations = db.query(DonationModel).offset(skip).limit(limit).all()
    return donations

@router.get("/{donation_id}", response_model=DonationSchema)
async def get_donation(
    donation_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    donation = db.query(DonationModel).filter(DonationModel.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    return donation

@router.put("/{donation_id}/status")
async def update_donation_status(
    donation_id: int,
    status: str,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_donation = db.query(DonationModel).filter(DonationModel.id == donation_id).first()
    if not db_donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    db_donation.status = status
    db.commit()
    db.refresh(db_donation)
    return db_donation
