from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
import uuid
import json

from auth import get_current_admin
from database import get_db
from models import Product as ProductModel, User as UserModel
from schemas import ProductBase, Product as ProductSchema

router = APIRouter(prefix="/api/products", tags=["products"])

BACKEND_DIR = os.path.dirname(os.path.dirname(__file__))
UPLOAD_DIR = os.path.abspath(os.path.join(BACKEND_DIR, "..", "public", "uploads", "products"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/public", response_model=List[ProductSchema])
async def get_public_products(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    products = (
        db.query(ProductModel)
        .filter(ProductModel.status == "active")
        .order_by(ProductModel.featured.desc(), ProductModel.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return products

@router.get("/", response_model=List[ProductSchema])
async def get_products(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    status: str = None,
    _admin: UserModel = Depends(get_current_admin),
):
    query = db.query(ProductModel)
    if category:
        query = query.filter(ProductModel.category == category)
    if status:
        query = query.filter(ProductModel.status == status)
    products = query.offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=ProductSchema)
async def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/slug/{slug}", response_model=ProductSchema)
async def get_product_by_slug(
    slug: str,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    product = db.query(ProductModel).filter(ProductModel.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductSchema)
async def create_product(
    product: ProductBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_product = ProductModel(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=ProductSchema)
async def update_product(
    product_id: int,
    product: ProductBase,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in product.model_dump().items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}

@router.post("/{product_id}/upload-images")
async def upload_product_images(
    product_id: int,
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    image_urls = []
    for file in files:
        file_extension = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        image_urls.append(f"/uploads/products/{unique_filename}")
    
    db_product.images = json.dumps(image_urls)
    db.commit()
    db.refresh(db_product)
    
    return {"images": image_urls}
