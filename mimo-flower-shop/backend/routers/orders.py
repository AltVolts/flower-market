from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import Order, OrderItem
from schemas import OrderCreate, Order as OrderSchema

router = APIRouter()

@router.get("/", response_model=List[OrderSchema])
def get_orders(status: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == status)
    return query.order_by(Order.created_at.desc()).all()

@router.get("/{order_id}", response_model=OrderSchema)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=OrderSchema)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    db_order = Order(
        customer_name=order.customer_name,
        phone=order.phone,
        comment=order.comment
    )
    db.add(db_order)
    db.flush()

    for item in order.items:
        db_item = OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity=item.quantity
        )
        db.add(db_item)

    db.commit()
    db.refresh(db_order)
    return db_order

@router.put("/{order_id}/status")
def update_order_status(order_id: int, status: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status
    db.commit()
    return {"message": "Order status updated"}
