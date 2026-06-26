from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from auth import get_current_admin
from database import get_db
from models import SiteUpdate as SiteUpdateModel, User as UserModel
from schemas import SiteUpdateBase, SiteUpdate as SiteUpdateSchema

router = APIRouter(prefix="/api/updates", tags=["updates"])

@router.get("/public", response_model=List[SiteUpdateSchema])
async def get_public_updates(
    db: Session = Depends(get_db),
    marquee_only: bool = False,
    limit: int = 20,
):
    query = db.query(SiteUpdateModel).filter(SiteUpdateModel.is_published == True)
    if marquee_only:
        query = query.filter(SiteUpdateModel.show_in_marquee == True)
    updates = (
        query.order_by(SiteUpdateModel.priority.desc(), SiteUpdateModel.published_at.desc())
        .limit(limit)
        .all()
    )
    return updates

@router.get("/", response_model=List[SiteUpdateSchema])
async def get_all_updates(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    _admin: UserModel = Depends(get_current_admin),
):
    updates = (
        db.query(SiteUpdateModel)
        .order_by(SiteUpdateModel.priority.desc(), SiteUpdateModel.published_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return updates

@router.get("/{update_id}", response_model=SiteUpdateSchema)
async def get_update(
    update_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    update = db.query(SiteUpdateModel).filter(SiteUpdateModel.id == update_id).first()
    if not update:
        raise HTTPException(status_code=404, detail="Update not found")
    return update

@router.post("/", response_model=SiteUpdateSchema)
async def create_update(
    payload: SiteUpdateBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_update = SiteUpdateModel(**payload.model_dump())
    db.add(db_update)
    db.commit()
    db.refresh(db_update)
    return db_update

@router.put("/{update_id}", response_model=SiteUpdateSchema)
async def update_site_update(
    update_id: int,
    payload: SiteUpdateBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_update = db.query(SiteUpdateModel).filter(SiteUpdateModel.id == update_id).first()
    if not db_update:
        raise HTTPException(status_code=404, detail="Update not found")

    for key, value in payload.model_dump().items():
        setattr(db_update, key, value)

    db.commit()
    db.refresh(db_update)
    return db_update

@router.delete("/{update_id}")
async def delete_update(
    update_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_update = db.query(SiteUpdateModel).filter(SiteUpdateModel.id == update_id).first()
    if not db_update:
        raise HTTPException(status_code=404, detail="Update not found")

    db.delete(db_update)
    db.commit()
    return {"message": "Update deleted successfully"}
