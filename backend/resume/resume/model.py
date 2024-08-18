from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime
from sqlalchemy import Enum as SAEnum 
from sqlalchemy.dialects.postgresql import JSON
from enum import Enum
from typing import List, Optional

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
    resume: "Resume" = Relationship(back_populates="steps")

class Resume(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    skill_set : List[str] | None = Field(sa_type=JSON)
    professional_info_id: int | None = Field(default=None, foreign_key="professionalinfo.id")
    social_media_id: int | None = Field(default=None, foreign_key="socialmedia.id")
    experience_id: int | None = Field(default=None, foreign_key="experience.id")
    education_id: int | None = Field(default=None, foreign_key="education.id")
    projects_id: int | None = Field(default=None, foreign_key="projects.id")
    certifications_id: int | None = Field(default=None, foreign_key="certifications.id")
    languages_id: int | None = Field(default=None, foreign_key="languages.id")
    references_id: int | None = Field(default=None, foreign_key="references.id")
    extra_info_id: int | None = Field(default=None, foreign_key="extrainfo.id")
    created_at: datetime = Field(default=datetime.utcnow())
    steps: Optional[ResumeSteps] = Relationship(back_populates="resume")

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

class SocialMedia(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    linkedin: str | None = None
    github: str | None = None
    twitter: str | None = None
    facebook: str | None = None
    instagram: str | None = None
    youtube: str | None = None
    website: str | None = None

class Experience(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    company_name: str | None = None
    job_title: str | None = None
    job_description: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    location: str | None = None
    is_current: bool | None = None

class Education(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    institute_name: str | None = None
    degree: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    location: str | None = None
    is_current: bool | None = None

class Projects(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    project_name: str | None = None
    project_description: str | None = None
    start_date: str | None = None
    end_date: str | None = None

class Certifications(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    certification_name: str | None = None
    certification_link: str | None = None
    start_date: str | None = None
    end_date: str | None = None

class LanguageProficiency(Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"
    native = "native"

class Languages(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    language: str | None = None
    proficiency: LanguageProficiency | None = Field(default=None, sa_type=SAEnum(LanguageProficiency))

class References(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    relationship: str | None = None

class ExtraInfo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    key: str | None = None
    value: str | None = None
