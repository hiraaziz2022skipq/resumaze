from datetime import timedelta, datetime
from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter, Request, status
from sqlmodel import Session, SQLModel, select
from resume.db import engine
from resume.model import User
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from authlib.integrations.starlette_client import OAuth
from fastapi.responses import RedirectResponse

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
)

SECRET_KEY = "12345678"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

# Initialize OAuth
oauth = OAuth()
oauth.register(
    name='google',
  
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri='https://adb2-2407-aa80-314-f623-addf-e2c8-34ad-5dce.ngrok-free.app',
    client_kwargs={'scope': 'openid profile email'},
)

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
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        email: str = payload.get("sub")
        print(email)
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
        print(user.id)
    return user

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
        password_check = verify_password(user_login.password, user.hashed_password)
        if not user or not password_check:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        # Create JWT token after successful login
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"sub": user.email, "id": user.id}, expires_delta=access_token_expires)
        user.session_token = access_token
        session.add(user)
        session.commit()
    return {"access_token": user.session_token, "token_type": "bearer", "id": user.id}

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get('/google/login')
async def google_login(request: Request):
    print("google login", request)
    redirect_uri = request.url_for('google_callback')
    print("redirect_uri", redirect_uri)
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get('/google/callback')
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = await oauth.google.parse_id_token(request, token)
    email = user_info['email']
    name = user_info['name']

    with Session(engine) as session:
        statement = select(User).where(User.email == email)
        user = session.exec(statement).first()
        if not user:
            user = User(name=name, email=email, role='user')
            session.add(user)
            session.commit()
            session.refresh(user)
        
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"sub": user.email, "id": user.id}, expires_delta=access_token_expires)
        user.session_token = access_token
        session.add(user)
        session.commit()
    
    response = RedirectResponse(url='/')
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    return response