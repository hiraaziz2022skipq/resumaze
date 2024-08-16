from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Field, SQLModel, create_engine
from contextlib import asynccontextmanager
from typing import List, Annotated
from datetime import datetime
from resume import settings
from sqlalchemy.dialects.postgresql import JSON
from enum import Enum
from sqlmodel import Session, select, update
from resume.model import Resume, ProfessionalInfo, SocialMedia, Experience, Education, Projects, Certifications, Languages, References, ExtraInfo
from resume.db import create_db_and_tables
from resume.routers import auth, resumedata

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

@app.post("/resume", response_model=Resume)
def create_resume(resume: Resume, session: db_dependency):
    session.add(resume)
    session.commit()
    session.refresh(resume)
    return resume

@app.get("/resume/{resume_id}", response_model=Resume)
def get_resume(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume

@app.patch("/resume/{resume_id}", response_model=Resume)
def update_resume(resume_id: int, resume: Resume, session: db_dependency):
    statement = select(Resume).where(Resume.id == resume_id)
    results = session.exec(statement)
    if not results:
        raise HTTPException(status_code=404, detail="Resume not found")
    results = resume
    session.add(results)
    session.commit()
    session.refresh(results)
    return results



