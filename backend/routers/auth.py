from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List

from auth import authenticate_user, create_access_token, get_current_admin, get_password_hash
from database import get_db
from models import User as UserModel
from schemas import User as UserSchema, UserCreate

router = APIRouter(prefix="/api/auth", tags=["auth"])


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserSchema


class UserCreateWithPrivileges(UserCreate):
    can_manage_content: bool = False
    can_manage_users: bool = False
    can_view_analytics: bool = False


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, payload.username, payload.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    if not user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    token = create_access_token(user.username)
    return TokenResponse(access_token=token, user=user)


@router.get("/me", response_model=UserSchema)
async def get_me(current_user: UserModel = Depends(get_current_admin)):
    return current_user


@router.get("/users", response_model=List[UserSchema])
async def list_users(current_user: UserModel = Depends(get_current_admin), db: Session = Depends(get_db)):
    if not current_user.is_admin and not current_user.can_manage_users:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User management permission required",
        )
    users = db.query(UserModel).all()
    return users


@router.post("/users", response_model=UserSchema)
async def create_user(
    user_data: UserCreateWithPrivileges,
    current_user: UserModel = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    if not current_user.is_admin and not current_user.can_manage_users:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User management permission required",
        )
    
    existing_user = db.query(UserModel).filter(
        (UserModel.username == user_data.username) | (UserModel.email == user_data.email)
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists",
        )
    
    new_user = UserModel(
        email=user_data.email,
        username=user_data.username,
        full_name=user_data.full_name,
        hashed_password=get_password_hash(user_data.password),
        is_active=True,
        is_admin=False,
        can_manage_content=user_data.can_manage_content,
        can_manage_users=user_data.can_manage_users,
        can_view_analytics=user_data.can_view_analytics,
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user


@router.put("/users/{user_id}", response_model=UserSchema)
async def update_user(
    user_id: int,
    user_data: UserCreateWithPrivileges,
    current_user: UserModel = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    if not current_user.is_admin and not current_user.can_manage_users:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User management permission required",
        )
    
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    if user.is_admin and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot modify admin users",
        )
    
    user.email = user_data.email
    user.username = user_data.username
    user.full_name = user_data.full_name
    if user_data.password:
        user.hashed_password = get_password_hash(user_data.password)
    user.can_manage_content = user_data.can_manage_content
    user.can_manage_users = user_data.can_manage_users
    user.can_view_analytics = user_data.can_view_analytics
    
    db.commit()
    db.refresh(user)
    
    return user


@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    current_user: UserModel = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    if user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot delete admin users",
        )
    
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}
