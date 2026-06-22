from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
