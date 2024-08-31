from datetime import timedelta, datetime
from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter,status
from sqlmodel import Session, SQLModel, select
from resume.db import engine
from resume.model import User
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
)

SECRET_KEY = "12345678"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_session():
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()
        
db_dependency = Annotated[Session, Depends(get_session)]

class Token(SQLModel):
    access_token: str
    token_type: str
    id: int | None = None

class TokenData(SQLModel):
    email: str
    id: int | None = None

class UserCreate(SQLModel):
    name: str
    email: str
    role: str
    password: str

class UserLogin(SQLModel):
    email: str
    password: str

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dependency to get the current user from the token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    print(token)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email, id=payload.get("id"))
    except JWTError:
        raise credentials_exception
    with Session(engine) as session:
        statement = select(User).where(User.email == token_data.email)
        user = session.exec(statement).first()
        if user is None:
            raise credentials_exception
    return user

# {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoaW5hMTIzQGdtYWlsLmNvbSIsImlkIjoxOSwiZXhwIjoxNzI1MDkyMTMxfQ.7IK66Sr-sdNpW7Ab-aMaPKUFEnbhdTGHZozvhVeJBp0",
#   "token_type": "bearer"
#   }

# User registration API
@router.post("/register", response_model=Token)
async def register(user_create: UserCreate):
    hashed_password = get_password_hash(user_create.password)
    user = User(name=user_create.name, email=user_create.email, hashed_password=hashed_password, role=user_create.role)
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        # Create JWT token after registration
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"sub": user.email, "id": user.id}, expires_delta=access_token_expires)
        user.session_token = access_token
        session.add(user)
        session.commit()
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(user_login: UserLogin):
    with Session(engine) as session:
        statement = select(User).where(User.email == user_login.email)
        user = session.exec(statement).first()
        print(user)
        if not user or not verify_password(user_login.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        # Create JWT token after successful login
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"sub": user.email, "id": user.id}, expires_delta=access_token_expires)
        print(access_token)
        user.session_token = access_token
        session.add(user)
        session.commit()
    return {"access_token": access_token, "token_type": "bearer", "id": user.id}

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user