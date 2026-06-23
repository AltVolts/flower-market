# Flower Shop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a flower shop website with product catalog, order form, and admin panel for a small business in Mari El.

**Architecture:** React frontend + FastAPI backend + SQLite database. Frontend on Vercel, backend on Render.

**Tech Stack:** React 18, Tailwind CSS, FastAPI, SQLAlchemy, SQLite, Python 3.11+

---

## File Structure

```
mimo-flower-shop/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # Database connection and session
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── routers/
│   │   ├── products.py      # Product CRUD endpoints
│   │   ├── categories.py    # Category CRUD endpoints
│   │   ├── orders.py        # Order endpoints
│   │   └── settings.py      # Site settings endpoints
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main app with routing
│   │   ├── main.jsx         # Entry point
│   │   ├── index.css        # Tailwind imports
│   │   ├── components/
│   │   │   ├── Header.jsx   # Site header
│   │   │   ├── Footer.jsx   # Site footer
│   │   │   ├── ProductCard.jsx  # Product display card
│   │   │   └── CategoryFilter.jsx  # Category filter sidebar
│   │   ├── pages/
│   │   │   ├── Home.jsx     # Landing page
│   │   │   ├── Catalog.jsx  # Product catalog
│   │   │   ├── Product.jsx  # Single product page
│   │   │   ├── Order.jsx    # Order form
│   │   │   ├── Contacts.jsx # Contact info page
│   │   │   └── admin/
│   │   │       ├── Login.jsx        # Admin login
│   │   │       ├── Dashboard.jsx    # Admin dashboard
│   │   │       ├── Products.jsx     # Product management
│   │   │       ├── Categories.jsx   # Category management
│   │   │       ├── Orders.jsx       # Order management
│   │   │       └── Settings.jsx     # Site settings
│   │   └── api/
│   │       └── client.js    # API client functions
│   ├── index.html           # HTML entry point
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
└── docs/
    └── compose/
        ├── specs/
        │   └── 2026-06-22-flower-shop-design.md
        └── plans/
            └── 2026-06-22-flower-shop-impl.md
```

---

## Task 1: Backend Project Setup

**Covers:** [S5, S10]

**Files:**
- Create: `backend/main.py`
- Create: `backend/database.py`
- Create: `backend/models.py`
- Create: `backend/requirements.txt`

- [ ] **Step 1: Create backend directory and requirements.txt**

```bash
mkdir -p backend/routers
```

Create `backend/requirements.txt`:
```
fastapi==0.109.0
uvicorn==0.27.0
sqlalchemy==2.0.25
pydantic==2.5.3
python-multipart==0.0.6
aiofiles==23.2.1
```

- [ ] **Step 2: Create database.py**

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./flower_shop.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

- [ ] **Step 3: Create models.py**

```python
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    sort_order = Column(Integer, default=0)
    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    price = Column(Float)
    image_url = Column(String)
    in_stock = Column(Boolean, default=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    category = relationship("Category", back_populates="products")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    phone = Column(String)
    comment = Column(Text)
    status = Column(String, default="new")  # new, in_progress, completed
    created_at = Column(DateTime, default=datetime.utcnow)
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)
    order = relationship("Order", back_populates="items")
    product = relationship("Product")

class SiteSettings(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True)
    value = Column(Text)
```

- [ ] **Step 4: Create main.py**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, Base
from routers import products, categories, orders, settings

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Flower Shop API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(categories.router, prefix="/api/categories", tags=["categories"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(settings.router, prefix="/api/settings", tags=["settings"])

@app.get("/")
def root():
    return {"message": "Flower Shop API"}
```

- [ ] **Step 5: Create placeholder routers**

Create `backend/routers/__init__.py` (empty).

Create `backend/routers/products.py`:
```python
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
def get_products():
    return {"products": []}
```

Create `backend/routers/categories.py`:
```python
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
def get_categories():
    return {"categories": []}
```

Create `backend/routers/orders.py`:
```python
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
def get_orders():
    return {"orders": []}
```

Create `backend/routers/settings.py`:
```python
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
def get_settings():
    return {"settings": {}}
```

- [ ] **Step 6: Test backend starts**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Visit http://localhost:8000 - should show `{"message":"Flower Shop API"}`.

- [ ] **Step 7: Commit**

```bash
git add backend/
git commit -m "feat: backend project setup with FastAPI and SQLAlchemy"
```

---

## Task 2: Database Models and CRUD

**Covers:** [S4, S7]

**Files:**
- Modify: `backend/routers/products.py`
- Modify: `backend/routers/categories.py`
- Modify: `backend/routers/orders.py`
- Modify: `backend/routers/settings.py`
- Create: `backend/schemas.py`

- [ ] **Step 1: Create schemas.py**

```python
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
```

- [ ] **Step 2: Implement products router**

```python
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Product
from schemas import ProductCreate, Product as ProductSchema
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[ProductSchema])
def get_products(category_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Product)
    if category_id:
        query = query.filter(Product.category_id == category_id)
    return query.all()

@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductSchema)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=ProductSchema)
def update_product(product_id: int, product: ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in product.model_dump().items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted"}

@router.post("/upload")
def upload_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"url": f"/uploads/{file.filename}"}
```

- [ ] **Step 3: Implement categories router**

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Category
from schemas import CategoryCreate, Category as CategorySchema

router = APIRouter()

@router.get("/", response_model=List[CategorySchema])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).order_by(Category.sort_order).all()

@router.get("/{category_id}", response_model=CategorySchema)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/", response_model=CategorySchema)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    db_category = Category(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.put("/{category_id}", response_model=CategorySchema)
def update_category(category_id: int, category: CategoryCreate, db: Session = Depends(get_db)):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    for key, value in category.model_dump().items():
        setattr(db_category, key, value)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(db_category)
    db.commit()
    return {"message": "Category deleted"}

@router.put("/sort")
def sort_categories(category_ids: List[int], db: Session = Depends(get_db)):
    for idx, category_id in enumerate(category_ids):
        db_category = db.query(Category).filter(Category.id == category_id).first()
        if db_category:
            db_category.sort_order = idx
    db.commit()
    return {"message": "Categories sorted"}
```

- [ ] **Step 4: Implement orders router**

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Order, OrderItem
from schemas import OrderCreate, Order as OrderSchema

router = APIRouter()

@router.get("/", response_model=List[OrderSchema])
def get_orders(status: str = None, db: Session = Depends(get_db)):
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
```

- [ ] **Step 5: Implement settings router**

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import SiteSettings
from schemas import SiteSettingsCreate, SiteSettings as SiteSettingsSchema

router = APIRouter()

@router.get("/")
def get_settings(db: Session = Depends(get_db)):
    settings = db.query(SiteSettings).all()
    return {s.key: s.value for s in settings}

@router.put("/")
def update_settings(settings: dict, db: Session = Depends(get_db)):
    for key, value in settings.items():
        db_setting = db.query(SiteSettings).filter(SiteSettings.key == key).first()
        if db_setting:
            db_setting.value = value
        else:
            db_setting = SiteSettings(key=key, value=value)
            db.add(db_setting)
    db.commit()
    return {"message": "Settings updated"}
```

- [ ] **Step 6: Test API endpoints**

```bash
cd backend
uvicorn main:app --reload
```

Test with curl:
```bash
# Create category
curl -X POST http://localhost:8000/api/categories/ -H "Content-Type: application/json" -d '{"name": "Цветы", "sort_order": 0}'

# Get categories
curl http://localhost:8000/api/categories/

# Create product
curl -X POST http://localhost:8000/api/products/ -H "Content-Type: application/json" -d '{"name": "Роза", "price": 300, "category_id": 1}'

# Get products
curl http://localhost:8000/api/products/
```

- [ ] **Step 7: Commit**

```bash
git add backend/
git commit -m "feat: implement CRUD for products, categories, orders, settings"
```

---

## Task 3: Frontend Project Setup

**Covers:** [S5, S10]

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.js`
- Create: `frontend/tailwind.config.js`
- Create: `frontend/postcss.config.js`
- Create: `frontend/index.html`
- Create: `frontend/src/main.jsx`
- Create: `frontend/src/App.jsx`
- Create: `frontend/src/index.css`

- [ ] **Step 1: Create frontend directory and package.json**

```bash
mkdir -p frontend/src/components frontend/src/pages/admin frontend/src/api
```

Create `frontend/package.json`:
```json
{
  "name": "flower-shop-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.8"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
```

- [ ] **Step 3: Create tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        'primary-dark': '#2E7D32',
        cream: '#FFF8E7',
        warm: '#8D6E63',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Create postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <title>Цветы Марий Эл</title>
  </head>
  <body class="bg-cream font-body">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 7: Create index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Open Sans', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}
```

- [ ] **Step 8: Create App.jsx**

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Order from './pages/Order'
import Contacts from './pages/Contacts'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import Categories from './pages/admin/Categories'
import Orders from './pages/admin/Orders'
import Settings from './pages/admin/Settings'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={
            <div className="flex">
              <aside className="w-64 bg-primary-dark text-white min-h-screen p-4">
                <h2 className="text-xl font-heading mb-6">Админ-панель</h2>
                <nav className="space-y-2">
                  <a href="/admin" className="block p-2 hover:bg-primary rounded">Главная</a>
                  <a href="/admin/products" className="block p-2 hover:bg-primary rounded">Товары</a>
                  <a href="/admin/categories" className="block p-2 hover:bg-primary rounded">Категории</a>
                  <a href="/admin/orders" className="block p-2 hover:bg-primary rounded">Заказы</a>
                  <a href="/admin/settings" className="block p-2 hover:bg-primary rounded">Настройки</a>
                </nav>
              </aside>
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/products" element={<Products />} />
                  <Route path="/admin/categories" element={<Categories />} />
                  <Route path="/admin/orders" element={<Orders />} />
                  <Route path="/admin/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          } />
          <Route path="*" element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/contacts" element={<Contacts />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
```

- [ ] **Step 9: Install dependencies and test**

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000 - should show empty page (no components yet).

- [ ] **Step 10: Commit**

```bash
git add frontend/
git commit -m "feat: frontend project setup with React, Tailwind, routing"
```

---

## Task 4: Frontend Components

**Covers:** [S6, S9]

**Files:**
- Create: `frontend/src/components/Header.jsx`
- Create: `frontend/src/components/Footer.jsx`
- Create: `frontend/src/components/ProductCard.jsx`
- Create: `frontend/src/components/CategoryFilter.jsx`

- [ ] **Step 1: Create Header.jsx**

```jsx
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-primary-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🌸</span>
            <div>
              <h1 className="text-xl font-heading font-bold">Цветы Марий Эл</h1>
              <p className="text-xs text-cream">Цветы и дары природы из сердца Марий Эл</p>
            </div>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/catalog" className="hover:text-cream transition">Каталог</Link>
            <Link to="/contacts" className="hover:text-cream transition">Контакты</Link>
            <Link to="/order" className="bg-cream text-primary-dark px-4 py-2 rounded-lg font-semibold hover:bg-white transition">
              Заказать
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Create Footer.jsx**

```jsx
export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">О нас</h3>
            <p className="text-cream text-sm">
              Мы выращиваем цветы в теплицах Марий Эл и собираем ягоды и грибы в лесах нашего края.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Контакты</h3>
            <p className="text-cream text-sm">Телефон: +7 (XXX) XXX-XX-XX</p>
            <p className="text-cream text-sm">Адрес: г. Йошкар-Ола</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Режим работы</h3>
            <p className="text-cream text-sm">Пн-Пт: 8:00 - 18:00</p>
            <p className="text-cream text-sm">Сб-Вс: 9:00 - 16:00</p>
          </div>
        </div>
        <div className="border-t border-primary mt-8 pt-4 text-center text-cream text-sm">
          © 2024 Цветы Марий Эл. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create ProductCard.jsx**

```jsx
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={product.image_url || '/placeholder.jpg'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-warm text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary-dark font-bold text-xl">{product.price} ₽</span>
          <Link
            to={`/product/${product.id}`}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create CategoryFilter.jsx**

```jsx
export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-heading font-semibold text-lg mb-4">Категории</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-3 py-2 rounded transition ${
            selected === null
              ? 'bg-primary text-white'
              : 'hover:bg-cream'
          }`}
        >
          Все товары
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`w-full text-left px-3 py-2 rounded transition ${
              selected === category.id
                ? 'bg-primary text-white'
                : 'hover:bg-cream'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/
git commit -m "feat: add Header, Footer, ProductCard, CategoryFilter components"
```

---

## Task 5: Frontend Pages (Public)

**Covers:** [S6, S8]

**Files:**
- Create: `frontend/src/pages/Home.jsx`
- Create: `frontend/src/pages/Catalog.jsx`
- Create: `frontend/src/pages/Product.jsx`
- Create: `frontend/src/pages/Order.jsx`
- Create: `frontend/src/pages/Contacts.jsx`
- Create: `frontend/src/api/client.js`

- [ ] **Step 1: Create API client**

```javascript
const API_BASE = '/api'

export async function fetchProducts(categoryId = null) {
  const url = categoryId
    ? `${API_BASE}/products/?category_id=${categoryId}`
    : `${API_BASE}/products/`
  const res = await fetch(url)
  return res.json()
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`)
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories/`)
  return res.json()
}

export async function createOrder(order) {
  const res = await fetch(`${API_BASE}/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
  return res.json()
}

export async function fetchSettings() {
  const res = await fetch(`${API_BASE}/settings/`)
  return res.json()
}

export async function login(password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })
  return res.json()
}
```

- [ ] **Step 2: Create Home.jsx**

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories, fetchSettings } from '../api/client'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [settings, setSettings] = useState({})

  useEffect(() => {
    fetchProducts().then(setProducts)
    fetchCategories().then(setCategories)
    fetchSettings().then(setSettings)
  }, [])

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-96 bg-gradient-to-r from-primary-dark to-primary">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {settings.slogan || 'Цветы и дары природы из сердца Марий Эл'}
            </h1>
            <p className="text-xl mb-6 text-cream">
              Свежие цветы из теплиц, ягоды и грибы из леса
            </p>
            <Link
              to="/catalog"
              className="bg-cream text-primary-dark px-6 py-3 rounded-lg font-semibold hover:bg-white transition inline-block"
            >
              Смотреть каталог
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary-dark">
            О нас
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-warm text-lg mb-4">
              {settings.about || 'Мы — небольшой цветочный бизнес из Марий Эл. Выращиваем цветы в наших теплицах и собираем ягоды и грибы в лесах родного края.'}
            </p>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary-dark">
            Популярные товары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/catalog"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition inline-block"
            >
              Смотреть весь каталог
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary-dark">
            Наши категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog?category=${category.id}`}
                className="bg-cream p-6 rounded-lg text-center hover:shadow-md transition"
              >
                <span className="text-3xl mb-2 block">
                  {category.name === 'Цветы' && '🌸'}
                  {category.name === 'Кашпо и горшки' && '🪴'}
                  {category.name === 'Ягоды' && '🍓'}
                  {category.name === 'Грибы' && '🍄'}
                  {category.name === 'Аксессуары' && '🧤'}
                </span>
                <span className="font-heading font-semibold text-primary-dark">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Create Catalog.jsx**

```jsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '../api/client'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const selectedCategory = searchParams.get('category')

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  useEffect(() => {
    fetchProducts(selectedCategory).then(setProducts)
  }, [selectedCategory])

  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-primary-dark">Каталог</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory ? Number(selectedCategory) : null}
            onSelect={handleCategorySelect}
          />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12 text-warm">
              Товары не найдены
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create Product.jsx**

```jsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct } from '../api/client'

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetchProduct(id).then(setProduct)
  }, [id])

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Загрузка...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image_url || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-heading font-bold mb-4 text-primary-dark">
              {product.name}
            </h1>
            <p className="text-warm mb-6">{product.description}</p>
            <div className="mb-4">
              <span className="text-primary-dark font-bold text-3xl">
                {product.price} ₽
              </span>
            </div>
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.in_stock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {product.in_stock ? 'В наличии' : 'Под заказ'}
              </span>
            </div>
            <Link
              to="/order"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition inline-block"
            >
              Заказать
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create Order.jsx**

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../api/client'

export default function Order() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    comment: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createOrder({
      ...formData,
      items: [] // Will be connected to cart later
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-heading font-bold mb-4 text-primary-dark">
          Заказ отправлен!
        </h1>
        <p className="text-warm mb-8">
          Мы свяжемся с вами для подтверждения заказа.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Вернуться на главную
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-primary-dark">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-warm mb-2">Ваше имя *</label>
          <input
            type="text"
            required
            value={formData.customer_name}
            onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-warm mb-2">Телефон *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            placeholder="+7 (XXX) XXX-XX-XX"
          />
        </div>

        <div className="mb-6">
          <label className="block text-warm mb-2">Комментарий</label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            rows={4}
            placeholder="Пожелания к заказу..."
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Отправить заказ
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 6: Create Contacts.jsx**

```jsx
export default function Contacts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-primary-dark">Контакты</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Свяжитесь с нами</h2>
          <div className="space-y-4">
            <div>
              <p className="text-warm font-semibold">Телефон:</p>
              <p className="text-primary-dark">+7 (XXX) XXX-XX-XX</p>
            </div>
            <div>
              <p className="text-warm font-semibold">Адрес:</p>
              <p className="text-primary-dark">г. Йошкар-Ола, Марий Эл</p>
            </div>
            <div>
              <p className="text-warm font-semibold">Время работы:</p>
              <p className="text-primary-dark">Пн-Пт: 8:00 - 18:00</p>
              <p className="text-primary-dark">Сб-Вс: 9:00 - 16:00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Как нас найти</h2>
          <div className="aspect-video bg-cream rounded-lg flex items-center justify-center">
            <p className="text-warm">Карта будет здесь</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Test pages**

```bash
cd frontend
npm run dev
```

Visit http://localhost:3000 - should show home page with header/footer.

- [ ] **Step 8: Commit**

```bash
git add frontend/src/pages/ frontend/src/api/
git commit -m "feat: add public pages (Home, Catalog, Product, Order, Contacts)"
```

---

## Task 6: Admin Panel Pages

**Covers:** [S7]

**Files:**
- Create: `frontend/src/pages/admin/Login.jsx`
- Create: `frontend/src/pages/admin/Dashboard.jsx`
- Create: `frontend/src/pages/admin/Products.jsx`
- Create: `frontend/src/pages/admin/Categories.jsx`
- Create: `frontend/src/pages/admin/Orders.jsx`
- Create: `frontend/src/pages/admin/Settings.jsx`

- [ ] **Step 1: Create Login.jsx**

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple password check for MVP
    if (password === 'admin123') {
      localStorage.setItem('admin_token', 'true')
      navigate('/admin')
    } else {
      alert('Неверный пароль')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-heading font-bold text-center mb-6 text-primary-dark">
          Админ-панель
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-warm mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              placeholder="Введите пароль"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create Dashboard.jsx**

```jsx
import { useState, useEffect } from 'react'
import { fetchOrders } from '../../api/client'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    newOrders: 0,
    completedOrders: 0
  })

  useEffect(() => {
    fetchOrders().then(orders => {
      setStats({
        totalOrders: orders.length,
        newOrders: orders.filter(o => o.status === 'new').length,
        completedOrders: orders.filter(o => o.status === 'completed').length
      })
    })
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Главная</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-warm">Всего заказов</h3>
          <p className="text-3xl font-bold text-primary-dark">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-warm">Новых заказов</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.newOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-warm">Выполнено</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completedOrders}</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create Products.jsx**

```jsx
import { useState, useEffect } from 'react'
import { fetchProducts, fetchCategories } from '../../api/client'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchProducts().then(setProducts)
    fetchCategories().then(setCategories)
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold">Товары</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
          + Добавить товар
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream">
            <tr>
              <th className="p-4 text-left">Название</th>
              <th className="p-4 text-left">Категория</th>
              <th className="p-4 text-left">Цена</th>
              <th className="p-4 text-left">Наличие</th>
              <th className="p-4 text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category?.name}</td>
                <td className="p-4">{product.price} ₽</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    product.in_stock ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.in_stock ? 'В наличии' : 'Под заказ'}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-primary hover:underline mr-2">Ред.</button>
                  <button className="text-red-500 hover:underline">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create Categories.jsx**

```jsx
import { useState, useEffect } from 'react'
import { fetchCategories } from '../../api/client'

export default function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold">Категории</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
          + Добавить категорию
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream">
            <tr>
              <th className="p-4 text-left">Название</th>
              <th className="p-4 text-left">Порядок</th>
              <th className="p-4 text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="p-4">{category.name}</td>
                <td className="p-4">{category.sort_order}</td>
                <td className="p-4">
                  <button className="text-primary hover:underline mr-2">Ред.</button>
                  <button className="text-red-500 hover:underline">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create Orders.jsx**

```jsx
import { useState, useEffect } from 'react'
import { fetchOrders } from '../../api/client'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchOrders(filter === 'all' ? null : filter).then(setOrders)
  }, [filter])

  const getStatusLabel = (status) => {
    const labels = {
      new: 'Новый',
      in_progress: 'В работе',
      completed: 'Выполнен'
    }
    return labels[status] || status
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Заказы</h1>

      <div className="flex gap-2 mb-6">
        {['all', 'new', 'in_progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              filter === status ? 'bg-primary text-white' : 'bg-white text-warm'
            }`}
          >
            {status === 'all' ? 'Все' : getStatusLabel(status)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">Заказ #{order.id}</h3>
                <p className="text-warm text-sm">{order.customer_name} • {order.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            {order.comment && (
              <p className="text-warm mb-4">Комментарий: {order.comment}</p>
            )}
            <div className="flex gap-2">
              <button className="text-primary hover:underline">В работу</button>
              <button className="text-green-600 hover:underline">Выполнен</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create Settings.jsx**

```jsx
import { useState, useEffect } from 'react'
import { fetchSettings } from '../../api/client'

export default function Settings() {
  const [settings, setSettings] = useState({
    store_name: '',
    phone: '',
    address: '',
    work_hours: '',
    about: '',
    slogan: ''
  })

  useEffect(() => {
    fetchSettings().then(setSettings)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Save settings
    alert('Настройки сохранены!')
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Настройки</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label className="block text-warm mb-2">Название магазина</label>
            <input
              type="text"
              value={settings.store_name}
              onChange={(e) => setSettings({...settings, store_name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">Слоган</label>
            <input
              type="text"
              value={settings.slogan}
              onChange={(e) => setSettings({...settings, slogan: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">Телефон</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({...settings, phone: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">Адрес</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">Время работы</label>
            <input
              type="text"
              value={settings.work_hours}
              onChange={(e) => setSettings({...settings, work_hours: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">О нас</label>
            <textarea
              value={settings.about}
              onChange={(e) => setSettings({...settings, about: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  )
}
```

- [ ] **Step 7: Test admin panel**

```bash
cd frontend
npm run dev
```

Visit http://localhost:3000/admin/login - login with password "admin123".

- [ ] **Step 8: Commit**

```bash
git add frontend/src/pages/admin/
git commit -m "feat: add admin panel pages (Login, Dashboard, Products, Categories, Orders, Settings)"
```

---

## Task 7: Integration and Final Testing

**Covers:** [S6, S7, S8]

**Files:**
- Modify: `frontend/src/api/client.js`
- Modify: `frontend/src/pages/admin/Products.jsx`
- Modify: `frontend/src/pages/admin/Categories.jsx`

- [ ] **Step 1: Add admin API functions**

Update `frontend/src/api/client.js`:

```javascript
// Add these functions

export async function createProduct(product) {
  const res = await fetch(`${API_BASE}/products/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
  return res.json()
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
  return res.json()
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}

export async function createCategory(category) {
  const res = await fetch(`${API_BASE}/categories/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  })
  return res.json()
}

export async function updateCategory(id, category) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  })
  return res.json()
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${API_BASE}/orders/${id}/status?status=${status}`, {
    method: 'PUT'
  })
  return res.json()
}

export async function updateSettings(settings) {
  const res = await fetch(`${API_BASE}/settings/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  })
  return res.json()
}
```

- [ ] **Step 2: Add product form to Products.jsx**

Add modal and form to `frontend/src/pages/admin/Products.jsx`:

```jsx
// Add state
const [showModal, setShowModal] = useState(false)
const [editingProduct, setEditingProduct] = useState(null)
const [formData, setFormData] = useState({
  name: '',
  description: '',
  price: '',
  image_url: '',
  in_stock: true,
  category_id: ''
})

// Add modal component
const ProductModal = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-heading font-bold mb-4">
        {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Название" value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full mb-3 px-3 py-2 border rounded" />
        <textarea placeholder="Описание" value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full mb-3 px-3 py-2 border rounded" />
        <input type="number" placeholder="Цена" value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          className="w-full mb-3 px-3 py-2 border rounded" />
        <select value={formData.category_id}
          onChange={(e) => setFormData({...formData, category_id: e.target.value})}
          className="w-full mb-3 px-3 py-2 border rounded">
          <option value="">Выберите категорию</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="flex gap-2">
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Сохранить</button>
          <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">Отмена</button>
        </div>
      </form>
    </div>
  </div>
)

// Add handlers
const handleSubmit = async (e) => {
  e.preventDefault()
  if (editingProduct) {
    await updateProduct(editingProduct.id, formData)
  } else {
    await createProduct(formData)
  }
  setShowModal(false)
  fetchProducts().then(setProducts)
}

const handleEdit = (product) => {
  setEditingProduct(product)
  setFormData(product)
  setShowModal(true)
}

const handleDelete = async (id) => {
  if (confirm('Удалить товар?')) {
    await deleteProduct(id)
    fetchProducts().then(setProducts)
  }
}

// Update table actions
<button onClick={() => handleEdit(product)} className="text-primary hover:underline mr-2">Ред.</button>
<button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline">Удалить</button>

// Add modal to render
{showModal && <ProductModal />}
```

- [ ] **Step 3: Add category form to Categories.jsx**

Similar pattern to Products.jsx with add/edit/delete functionality.

- [ ] **Step 4: Add order status update to Orders.jsx**

```javascript
const handleStatusChange = async (orderId, newStatus) => {
  await updateOrderStatus(orderId, newStatus)
  fetchOrders(filter === 'all' ? null : filter).then(setOrders)
}

// Update buttons
<button onClick={() => handleStatusChange(order.id, 'in_progress')} className="text-primary hover:underline mr-2">В работу</button>
<button onClick={() => handleStatusChange(order.id, 'completed')} className="text-green-600 hover:underline">Выполнен</button>
```

- [ ] **Step 5: Add settings save to Settings.jsx**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  await updateSettings(settings)
  alert('Настройки сохранены!')
}
```

- [ ] **Step 6: Full integration test**

1. Start backend: `cd backend && uvicorn main:app --reload`
2. Start frontend: `cd frontend && npm run dev`
3. Test all flows:
   - Add categories in admin
   - Add products in admin
   - View catalog on public site
   - Place order
   - View orders in admin
   - Update order status
   - Change settings

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: complete admin panel integration with CRUD operations"
```

---

## Task 8: Deployment Preparation

**Covers:** [S5]

**Files:**
- Create: `backend/Dockerfile`
- Create: `frontend/vercel.json`
- Create: `.gitignore`
- Create: `README.md`

- [ ] **Step 1: Create backend Dockerfile**

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- [ ] **Step 2: Create frontend vercel.json**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "env": {
    "VITE_API_URL": "@api-url"
  }
}
```

- [ ] **Step 3: Create .gitignore**

```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
*.egg-info/

# Node
node_modules/
dist/
build/

# Database
*.db

# Uploads
backend/uploads/

# Environment
.env
.env.local
```

- [ ] **Step 4: Create README.md**

```markdown
# Цветы Марий Эл

Сайт-витрина для микробизнеса по продаже цветов, ягод и грибов.

## Стек технологий

- **Фронтенд:** React 18, Tailwind CSS
- **Бэкенд:** FastAPI, SQLAlchemy, SQLite
- **Деплой:** Vercel (фронтенд), Render (бэкенд)

## Запуск локально

### Бэкенд

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Фронтенд

```bash
cd frontend
npm install
npm run dev
```

## Админ-панель

- URL: `/admin/login`
- Пароль: `admin123`

## Деплой

### Render (бэкенд)

1. Создайте аккаунт на render.com
2. Создайте новый Web Service
3. Подключите GitHub репозиторий
4. Настройте:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Vercel (фронтенд)

1. Создайте аккаунт на vercel.com
2. Импортируйте GitHub репозиторий
3. Настройте:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add deployment configuration (Dockerfile, vercel.json, README)"
```

---

## Summary

This plan implements a complete flower shop website with:

1. **Backend API** (FastAPI + SQLAlchemy + SQLite)
   - Product CRUD
   - Category CRUD with sorting
   - Order management
   - Site settings

2. **Frontend** (React + Tailwind CSS)
   - Public pages: Home, Catalog, Product, Order, Contacts
   - Admin panel: Dashboard, Products, Categories, Orders, Settings

3. **Deployment** (Vercel + Render)
   - Free tier for MVP
   - Easy scaling later

**Total tasks:** 8
**Estimated time:** 4-6 hours for experienced developer
