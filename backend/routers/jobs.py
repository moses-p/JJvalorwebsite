from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from auth import get_current_admin
from database import get_db
from models import JobListing as JobListingModel, User as UserModel
from schemas import JobListingBase, JobListing as JobListingSchema

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

@router.get("/", response_model=List[JobListingSchema])
async def get_jobs(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    _admin: UserModel = Depends(get_current_admin),
):
    query = db.query(JobListingModel)
    if status:
        query = query.filter(JobListingModel.status == status)
    jobs = query.offset(skip).limit(limit).all()
    return jobs

@router.get("/{job_id}", response_model=JobListingSchema)
async def get_job(
    job_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    job = db.query(JobListingModel).filter(JobListingModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job listing not found")
    return job

@router.get("/slug/{slug}", response_model=JobListingSchema)
async def get_job_by_slug(
    slug: str,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    job = db.query(JobListingModel).filter(JobListingModel.slug == slug).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job listing not found")
    return job

@router.post("/", response_model=JobListingSchema)
async def create_job(
    job: JobListingBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_job = JobListingModel(**job.model_dump())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

@router.put("/{job_id}", response_model=JobListingSchema)
async def update_job(
    job_id: int,
    job: JobListingBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_job = db.query(JobListingModel).filter(JobListingModel.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job listing not found")
    
    for key, value in job.model_dump().items():
        setattr(db_job, key, value)
    
    db.commit()
    db.refresh(db_job)
    return db_job

@router.delete("/{job_id}")
async def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_job = db.query(JobListingModel).filter(JobListingModel.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job listing not found")
    
    db.delete(db_job)
    db.commit()
    return {"message": "Job listing deleted successfully"}
