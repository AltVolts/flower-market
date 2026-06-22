from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    sort_order: int = 0

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    in_stock: bool = True
    category_id: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    created_at: datetime
    category: Optional[Category] = None
    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int = 1

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    product: Optional[Product] = None
    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_name: str
    phone: str
    comment: Optional[str] = None

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: int
    status: str
    created_at: datetime
    items: List[OrderItem] = []
    class Config:
        from_attributes = True

class SiteSettingsBase(BaseModel):
    key: str
    value: Optional[str] = None

class SiteSettingsCreate(SiteSettingsBase):
    pass

class SiteSettings(SiteSettingsBase):
    id: int
    class Config:
        from_attributes = True
