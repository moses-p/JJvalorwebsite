from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from auth import get_current_admin
from database import get_db
from models import GalleryImage as GalleryImageModel, User as UserModel
from schemas import GalleryImageBase, GalleryImage as GalleryImageSchema

router = APIRouter(prefix="/api/gallery", tags=["gallery"])


@router.get("/public", response_model=List[GalleryImageSchema])
async def get_public_gallery(db: Session = Depends(get_db), limit: int = 50):
    return (
        db.query(GalleryImageModel)
        .filter(GalleryImageModel.is_published == True)
        .order_by(GalleryImageModel.priority.desc(), GalleryImageModel.created_at.desc())
        .limit(limit)
        .all()
    )


@router.get("/", response_model=List[GalleryImageSchema])
async def get_gallery_admin(
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    return (
        db.query(GalleryImageModel)
        .order_by(GalleryImageModel.priority.desc(), GalleryImageModel.created_at.desc())
        .all()
    )


@router.post("/", response_model=GalleryImageSchema)
async def create_gallery_image(
    payload: GalleryImageBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    item = GalleryImageModel(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=GalleryImageSchema)
async def update_gallery_image(
    item_id: int,
    payload: GalleryImageBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    item = db.query(GalleryImageModel).filter(GalleryImageModel.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery image not found")
    for key, value in payload.model_dump().items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
async def delete_gallery_image(
    item_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    item = db.query(GalleryImageModel).filter(GalleryImageModel.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery image not found")
    db.delete(item)
    db.commit()
    return {"message": "Gallery image deleted"}
