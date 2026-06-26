import os

from database import SessionLocal
from models import User as UserModel
from auth import get_password_hash


def seed_admin_user() -> None:
    db = SessionLocal()
    try:
        username = os.getenv("ADMIN_USERNAME", "admin")
        existing = db.query(UserModel).filter(UserModel.username == username).first()
        if existing:
            return

        admin = UserModel(
            email=os.getenv("ADMIN_EMAIL", "admin@jjvalor.com"),
            username=username,
            hashed_password=get_password_hash(os.getenv("ADMIN_PASSWORD", "admin123")),
            full_name="J.J Valor Administrator",
            is_active=True,
            is_admin=True,
        )
        db.add(admin)
        db.commit()
    finally:
        db.close()
