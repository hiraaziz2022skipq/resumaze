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
    oauth_provider: str | None = Field(default=None)
    oauth_id: str | None = Field(default=None)
    session_token: str | None = Field(default=None)
    role: UserRole = Field(default=UserRole.employee, sa_type=SAEnum(UserRole))
    created_at: datetime = Field(default=datetime.utcnow())
    resumes: List["Resume"] = Relationship(back_populates="user")
    cover_letters: List["CoverLetter"] = Relationship(back_populates="user")
    job_applications: List["JobApplication"] = Relationship(back_populates="user")

class ResumeType(Enum):
    generic = "generic"
    job = "job"

class Resume(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    title: Optional[str] = Field(default=None)
    skill_set: Optional[List[str]] = Field(sa_type=JSON, default=None)
    created_at: datetime = Field(default=datetime.utcnow(), nullable=False)
    user: Optional[User] = Relationship(back_populates="resumes")
    type: ResumeType = Field(default=ResumeType.generic, sa_type=SAEnum(ResumeType))
    resume_template: Optional[str] = Field(default=None)
    template_color: Optional[str] = Field(default=None)
    ats_score: Optional[float] = Field(default=None)
    access: Optional[str] = Field(default='private')

    steps: Optional["ResumeSteps"] = Relationship(back_populates="resume", sa_relationship_kwargs={"uselist": False})
    professional_info: Optional["ProfessionalInfo"] = Relationship(back_populates="resume", sa_relationship_kwargs={"uselist": False})
    social_media: Optional["SocialMedia"] = Relationship(back_populates="resume", sa_relationship_kwargs={"uselist": False})
    experience: List[Optional["Experience"]] = Relationship(back_populates="resume")
    education: List["Education"] = Relationship(back_populates="resume")
    projects: List[Optional["Projects"]] = Relationship(back_populates="resume")
    certifications: List[Optional["Certifications"]] = Relationship(back_populates="resume")
    languages: List[Optional["Languages"]] = Relationship(back_populates="resume")
    references: List[Optional["References"]] = Relationship(back_populates="resume")
    extra_info: List[Optional["ExtraInfo"]] = Relationship(back_populates="resume")
    job_applications: List["JobApplication"] = Relationship(back_populates="resume")

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
    resume: Optional[Resume] = Relationship(back_populates="education")

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
    extra: List[dict[str, str]] = Field(sa_type=JSON, default=[])
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Optional[Resume] = Relationship(back_populates="extra_info")

class CoverLetter(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str | None = None
    content: str
    cover_letter_template: Optional[str] = Field(default=None)
    created_at: datetime = Field(default=datetime.utcnow(), nullable=False)
    user_id: int = Field(foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="cover_letters")
    job_applications: List["JobApplication"] = Relationship(back_populates="cover_letter")

class JobApplicationStatus(Enum):
    in_progress = "in_progress"
    interview = "interview"
    applied = "applied"
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"

class JobApplication(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    resume_id: Optional[int] = Field(default=None, foreign_key="resume.id")
    resume: Optional[Resume] = Relationship(back_populates="job_applications")
    cover_letter_id: Optional[int] = Field(default=None, foreign_key="coverletter.id")
    cover_letter: Optional[CoverLetter] = Relationship(back_populates="job_applications")
    title: Optional[str] = None
    job_description: Optional[str] = None
    created_at: datetime = Field(default=datetime.utcnow(), nullable=False)
    status: JobApplicationStatus = Field(default=JobApplicationStatus.in_progress)
    user_id: int = Field(foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="job_applications")

