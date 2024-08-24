from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter
from fastapi.responses import JSONResponse
from sqlmodel import Session, SQLModel
from starlette import status 
from resume.db import engine
from resume.model import User
from resume.model import Resume, ResumeSteps, CoverLetter, JobApplication
from pydantic import BaseModel
from typing import Optional, List, Any
from fastapi import HTTPException
from sqlalchemy.future import select
from fastapi.encoders import jsonable_encoder
from enum import Enum

router = APIRouter(
    prefix="/api/jobapplication",
    tags=["jobapplication"],
)

def get_session():
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()
        
db_dependency = Annotated[Session, Depends(get_session)]

# create api to create job application
@router.post("/create")
async def create_job_application(job_application: JobApplication, db: db_dependency):
    db.add(job_application)
    db.commit()
    db.refresh(job_application)
    return job_application