from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
import uuid

from auth import get_current_admin
from database import get_db
from models import BlogPost as BlogPostModel, User as UserModel
from schemas import BlogPostBase, BlogPost as BlogPostSchema

router = APIRouter(prefix="/api/blog", tags=["blog"])

BACKEND_DIR = os.path.dirname(os.path.dirname(__file__))
UPLOAD_DIR = os.path.abspath(os.path.join(BACKEND_DIR, "..", "public", "uploads", "blog"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/public", response_model=List[BlogPostSchema])
async def get_public_blog_posts(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    posts = (
        db.query(BlogPostModel)
        .filter(BlogPostModel.published == True)
        .order_by(BlogPostModel.published_at.desc(), BlogPostModel.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return posts

@router.get("/", response_model=List[BlogPostSchema])
async def get_blog_posts(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    published_only: bool = False,
    _admin: UserModel = Depends(get_current_admin),
):
    query = db.query(BlogPostModel)
    if published_only:
        query = query.filter(BlogPostModel.published == True)
    posts = query.offset(skip).limit(limit).all()
    return posts

@router.get("/{post_id}", response_model=BlogPostSchema)
async def get_blog_post(
    post_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    post = db.query(BlogPostModel).filter(BlogPostModel.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post

@router.get("/slug/{slug}", response_model=BlogPostSchema)
async def get_blog_post_by_slug(
    slug: str,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    post = db.query(BlogPostModel).filter(BlogPostModel.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post

@router.post("/", response_model=BlogPostSchema)
async def create_blog_post(
    post: BlogPostBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_post = BlogPostModel(**post.model_dump())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.put("/{post_id}", response_model=BlogPostSchema)
async def update_blog_post(
    post_id: int,
    post: BlogPostBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_post = db.query(BlogPostModel).filter(BlogPostModel.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    for key, value in post.model_dump().items():
        setattr(db_post, key, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/{post_id}")
async def delete_blog_post(
    post_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_post = db.query(BlogPostModel).filter(BlogPostModel.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    db.delete(db_post)
    db.commit()
    return {"message": "Blog post deleted successfully"}

@router.post("/{post_id}/upload-image")
async def upload_blog_image(
    post_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_post = db.query(BlogPostModel).filter(BlogPostModel.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    db_post.featured_image = f"/uploads/blog/{unique_filename}"
    db.commit()
    db.refresh(db_post)
    
    return {"featured_image": db_post.featured_image}
