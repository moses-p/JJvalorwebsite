from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from auth import get_current_admin
from database import get_db
from models import Order as OrderModel, User as UserModel
from schemas import OrderBase, Order as OrderSchema

router = APIRouter(prefix="/api/orders", tags=["orders"])

@router.get("/", response_model=List[OrderSchema])
async def get_orders(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    _admin: UserModel = Depends(get_current_admin),
):
    query = db.query(OrderModel)
    if status:
        query = query.filter(OrderModel.status == status)
    orders = query.order_by(OrderModel.created_at.desc()).offset(skip).limit(limit).all()
    return orders

@router.get("/{order_id}", response_model=OrderSchema)
async def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.get("/number/{order_number}", response_model=OrderSchema)
async def get_order_by_number(
    order_number: str,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    order = db.query(OrderModel).filter(OrderModel.order_number == order_number).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=OrderSchema)
async def create_order(order: OrderBase, db: Session = Depends(get_db)):
    order_number = f"ORD-{uuid.uuid4().hex[:12].upper()}"
    db_order = OrderModel(
        **order.model_dump(),
        order_number=order_number
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.put("/{order_id}/status")
async def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db),
    _admin: UserModel = Depends(get_current_admin),
):
    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    db_order.status = status
    db.commit()
    db.refresh(db_order)
    return db_order
