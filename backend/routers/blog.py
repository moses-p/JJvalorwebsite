from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
import uuid

from database import get_db
from models import BlogPost, User
from schemas import BlogPostBase, BlogPost

router = APIRouter(prefix="/api/blog", tags=["blog"])

UPLOAD_DIR = "../public/uploads/blog"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[BlogPost])
async def get_blog_posts(db: Session = Depends(get_db), skip: int = 0, limit: int = 100, published_only: bool = True):
    query = db.query(BlogPost)
    if published_only:
        query = query.filter(BlogPost.published == True)
    posts = query.offset(skip).limit(limit).all()
    return posts

@router.get("/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post

@router.get("/slug/{slug}", response_model=BlogPost)
async def get_blog_post_by_slug(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post

@router.post("/", response_model=BlogPost)
async def create_blog_post(post: BlogPostBase, db: Session = Depends(get_db)):
    db_post = BlogPost(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.put("/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: int, post: BlogPostBase, db: Session = Depends(get_db)):
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    for key, value in post.dict().items():
        setattr(db_post, key, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/{post_id}")
async def delete_blog_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    db.delete(db_post)
    db.commit()
    return {"message": "Blog post deleted successfully"}

@router.post("/{post_id}/upload-image")
async def upload_blog_image(post_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
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
