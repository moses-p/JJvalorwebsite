from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from auth import get_current_admin
from database import get_db
from models import LeadershipMember as LeadershipMemberModel, User as UserModel
from schemas import LeadershipMemberBase, LeadershipMember as LeadershipMemberSchema

router = APIRouter(prefix="/api/leadership", tags=["leadership"])


@router.get("/public", response_model=List[LeadershipMemberSchema])
async def get_public_leadership(db: Session = Depends(get_db), limit: int = 50):
    return (
        db.query(LeadershipMemberModel)
        .filter(LeadershipMemberModel.is_published == True)
        .order_by(LeadershipMemberModel.sort_order.asc(), LeadershipMemberModel.name.asc())
        .limit(limit)
        .all()
    )


@router.get("/", response_model=List[LeadershipMemberSchema])
async def get_leadership_admin(
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    return (
        db.query(LeadershipMemberModel)
        .order_by(LeadershipMemberModel.sort_order.asc(), LeadershipMemberModel.name.asc())
        .all()
    )


@router.post("/", response_model=LeadershipMemberSchema)
async def create_leadership_member(
    payload: LeadershipMemberBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    item = LeadershipMemberModel(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=LeadershipMemberSchema)
async def update_leadership_member(
    item_id: int,
    payload: LeadershipMemberBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    item = db.query(LeadershipMemberModel).filter(LeadershipMemberModel.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Leadership member not found")
    for key, value in payload.model_dump().items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
async def delete_leadership_member(
    item_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    item = db.query(LeadershipMemberModel).filter(LeadershipMemberModel.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Leadership member not found")
    db.delete(item)
    db.commit()
    return {"message": "Leadership member deleted"}
