from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime
from sqlalchemy import Enum as SAEnum 
from sqlalchemy.dialects.postgresql import JSON
from enum import Enum
from typing import List, Optional
from typing import TYPE_CHECKING

class UserRole(Enum):
    employee = "employee"
    admin = "admin"
    recruiter = "recruiter"

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str
    hashed_password: str = Field(max_length=255, min_length=6)
    role: UserRole = Field(default=UserRole.employee, sa_type=SAEnum(UserRole))
    created_at: datetime = Field(default=datetime.utcnow())
    resumes: int | None = Field(default=None, foreign_key="resume.id")

class Resume(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    skill_set: Optional[List[str]] = Field(sa_type=JSON, default=None)
    created_at: datetime = Field(default=datetime.utcnow(), nullable=False)
    
    steps: Optional["ResumeSteps"] = Relationship(back_populates="resume", sa_relationship_kwargs={"uselist": False})
    professional_info: Optional["ProfessionalInfo"] = Relationship(back_populates="resume", sa_relationship_kwargs={"uselist": False})
    social_media: Optional["SocialMedia"] = Relationship(back_populates="resume", sa_relationship_kwargs={"uselist": False})
    
    experience: List[Optional["Experience"]] = Relationship(back_populates="resume")
    education: List[Optional["Education"]] = Relationship(back_populates="resume")
    projects: List[Optional["Projects"]] = Relationship(back_populates="resume")
    certifications: List[Optional["Certifications"]] = Relationship(back_populates="resume")
    languages: List[Optional["Languages"]] = Relationship(back_populates="resume")
    references: List[Optional["References"]] = Relationship(back_populates="resume")
    extra_info: List[Optional["ExtraInfo"]] = Relationship(back_populates="resume")

class ResumeSteps(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    resume_id: int = Field(foreign_key="resume.id")
    professional_info: bool = Field(default=False)
    social_media: bool = Field(default=False)
    experience: bool = Field(default=False)
    education: bool = Field(default=False)
    projects: bool = Field(default=False)
    certifications: bool = Field(default=False)
    languages: bool = Field(default=False)
    resume: Optional[Resume] = Relationship(back_populates="steps")

class ProfessionalInfo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str | None = None
    image: str | None = None
    email: str | None = None
    phone: str | None = None
    address: str | None = None
    nationality: str | None = None
    date_of_birth: str | None = None
    job_title: str | None = None
    professional_summary: str | None = None
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Optional[Resume] = Relationship(back_populates="professional_info")

class SocialMedia(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    social_media: dict = Field(sa_type=JSON, default={})
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Optional[Resume] = Relationship(back_populates="social_media")

class Experience(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    company_name: str | None = None
    job_title: str | None = None
    job_description: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    location: str | None = None
    is_current: bool | None = None
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Optional[Resume] = Relationship(back_populates="experience")

class Education(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    institute_name: str | None = None
    degree: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    location: Optional[str] = None
    is_current: Optional[bool] = None
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Resume = Relationship(back_populates="education")

class Projects(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    project_name: str | None = None
    project_description: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Optional[Resume] = Relationship(back_populates="projects")

class Certifications(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    certification_name: str | None = None
    certification_link: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Optional[Resume] = Relationship(back_populates="certifications")

class LanguageProficiency(Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"
    native = "native"

class Languages(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    language: List[dict[str,LanguageProficiency | str]] = Field(sa_type=JSON, default=[])
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Optional[Resume] = Relationship(back_populates="languages")

class References(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    relationship: str | None = None
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id") 
    resume: Optional[Resume] = Relationship(back_populates="references")

class ExtraInfo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    key: str | None = None
    value: str | None = None
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Optional[Resume] = Relationship(back_populates="extra_info")
