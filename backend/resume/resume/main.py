from fastapi import FastAPI, Depends, HTTPException
from contextlib import asynccontextmanager
from typing import List, Annotated
from resume import settings
from sqlalchemy.dialects.postgresql import JSON
from sqlmodel import Session, select, update
from resume.model import Resume, ProfessionalInfo, SocialMedia, Experience, Education, Projects, Certifications, Languages, References, ExtraInfo
from resume.db import create_db_and_tables
from resume.routers import auth, resumedata
from resume.db import engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables..")
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(auth.router)
app.include_router(resumedata.router)
def get_session():
    with Session(engine) as session:
        yield session
db_dependency = Annotated[Session, Depends(get_session)]

@app.get("/")
def root():
    return {"Hello": "world"}




