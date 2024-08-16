from datetime import timedelta, datetime
from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter
from sqlmodel import Session, SQLModel
from starlette import status 
from resume.db import engine
from resume.model import User
from dotenv import load_dotenv
import os 

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
)

def get_session():
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()
        
db_dependency = Annotated[Session, Depends(get_session)]

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: User, session: db_dependency):
    user = User(
        name=user.name,
        email=user.email,
        hashed_password=user.hashed_password,
        role=user.role,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user