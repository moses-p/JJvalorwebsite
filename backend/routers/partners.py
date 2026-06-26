from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from auth import get_current_admin
from database import get_db
from models import Partner as PartnerModel, User as UserModel
from schemas import PartnerBase, Partner as PartnerSchema

router = APIRouter(prefix="/api/partners", tags=["partners"])


@router.get("/public", response_model=List[PartnerSchema])
async def get_public_partners(db: Session = Depends(get_db), limit: int = 50):
    return (
        db.query(PartnerModel)
        .filter(PartnerModel.is_published == True)
        .order_by(PartnerModel.priority.desc(), PartnerModel.name.asc())
        .limit(limit)
        .all()
    )


@router.get("/", response_model=List[PartnerSchema])
async def get_partners_admin(
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    return db.query(PartnerModel).order_by(PartnerModel.priority.desc(), PartnerModel.name.asc()).all()


@router.post("/", response_model=PartnerSchema)
async def create_partner(
    payload: PartnerBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    item = PartnerModel(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=PartnerSchema)
async def update_partner(
    item_id: int,
    payload: PartnerBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    item = db.query(PartnerModel).filter(PartnerModel.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Partner not found")
    for key, value in payload.model_dump().items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
async def delete_partner(
    item_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    item = db.query(PartnerModel).filter(PartnerModel.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Partner not found")
    db.delete(item)
    db.commit()
    return {"message": "Partner deleted"}
