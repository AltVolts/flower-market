from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import SiteSettings

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
