from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter
from fastapi.responses import JSONResponse
from sqlmodel import Session, SQLModel
from starlette import status 
from resume.db import engine
from resume.model import User
from resume.model import Resume, ResumeSteps, CoverLetter, JobApplication, JobApplicationStatus
from pydantic import BaseModel
from typing import Optional, List, Any
from fastapi import HTTPException
from sqlalchemy.future import select
from fastapi.encoders import jsonable_encoder
from enum import Enum
from datetime import datetime

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

class JobApplicationRead(SQLModel):
    id: Optional[int]
    user_id: Optional[int]
    resume_id: Optional[int]
    cover_letter_id: Optional[int]
    job_description: Optional[str]
    created_at: datetime
    status: JobApplicationStatus
    resume: Optional[Resume]
    cover_letter: Optional[CoverLetter]
    class Config:
        from_attributes = True


# create api to create job application
@router.post("/create")
async def create_job_application(job_application: JobApplication, db: db_dependency):
    db.add(job_application)
    db.commit()
    db.refresh(job_application)
    return job_application


# get all job applications of a user
@router.get("/{user_id}/jobapplications",response_model=List[JobApplicationRead])
async def get_job_applications(user_id: int, db: db_dependency):
    job_applications = db.exec(select(JobApplication).where(JobApplication.user_id == user_id)).scalars().all()
    return job_applications

# class BookRead(SQLModel):
#     id: int
#     title: str


# class AuthorRead(SQLModel):
#     id: int
#     name: str
#     books: List[BookRead]


# @router.get("/authors", response_model=List[AuthorRead])
# def read_authors(db: db_dependency):
#     authors = db.exec(select(Author).options(selectinload(Author.books))).scalars().all()
#     print(authors)
#     print(authors[0].books)
#     # for author in authors:
#     #     print(author.books)  # Check if books are being loaded for each author
#     return authors

