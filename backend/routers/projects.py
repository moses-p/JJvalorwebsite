from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
import uuid

from auth import get_current_admin
from database import get_db
from models import Project as ProjectModel, User as UserModel
from schemas import ProjectBase, Project as ProjectSchema

router = APIRouter(prefix="/api/projects", tags=["projects"])

BACKEND_DIR = os.path.dirname(os.path.dirname(__file__))
UPLOAD_DIR = os.path.abspath(os.path.join(BACKEND_DIR, "..", "public", "uploads", "projects"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/public", response_model=List[ProjectSchema])
async def get_public_projects(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    projects = (
        db.query(ProjectModel)
        .filter(ProjectModel.status == "active")
        .order_by(ProjectModel.featured.desc(), ProjectModel.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return projects

@router.get("/", response_model=List[ProjectSchema])
async def get_projects(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    _admin: UserModel = Depends(get_current_admin),
):
    projects = db.query(ProjectModel).offset(skip).limit(limit).all()
    return projects

@router.get("/{project_id}", response_model=ProjectSchema)
async def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/slug/{slug}", response_model=ProjectSchema)
async def get_project_by_slug(
    slug: str,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    project = db.query(ProjectModel).filter(ProjectModel.slug == slug).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("/", response_model=ProjectSchema)
async def create_project(
    project: ProjectBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_project = ProjectModel(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.put("/{project_id}", response_model=ProjectSchema)
async def update_project(
    project_id: int,
    project: ProjectBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    for key, value in project.model_dump().items():
        setattr(db_project, key, value)
    
    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/{project_id}")
async def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted successfully"}

@router.post("/{project_id}/upload-image")
async def upload_project_image(
    project_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    db_project.image_url = f"/uploads/projects/{unique_filename}"
    db.commit()
    db.refresh(db_project)
    
    return {"image_url": db_project.image_url}
