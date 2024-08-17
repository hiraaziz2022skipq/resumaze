from datetime import timedelta, datetime
from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter
from sqlmodel import Session, SQLModel
from starlette import status 
from resume.db import engine
from resume.model import User
from dotenv import load_dotenv
import os 
from resume.model import Resume, ProfessionalInfo, SocialMedia, Experience, Education, Projects, Certifications, Languages, References, ExtraInfo, ResumeSteps

from pydantic import BaseModel
from typing import Optional, List
from fastapi import HTTPException
from sqlalchemy.orm import selectinload
from sqlalchemy.future import select

class ResumeInput(BaseModel):
    professional_info: Optional[ProfessionalInfo] = None
    social_media: Optional[SocialMedia] = None
    experience: Optional[Experience] = None
    education: Optional[Education] = None
    projects: Optional[Projects] = None
    certifications: Optional[Certifications] = None
    languages: Optional[Languages] = None
    references: Optional[References] = None
    extra_info: Optional[ExtraInfo] = None
    skill_set: Optional[List[str]] = None

class ResumeOutput(BaseModel):
    id: int
    professional_info: Optional[ProfessionalInfo] = None
    social_media: Optional[SocialMedia] = None
    experience: Optional[Experience] = None
    education: Optional[Education] = None
    projects: Optional[Projects] = None
    certifications: Optional[Certifications] = None
    languages: Optional[Languages] = None
    references: Optional[References] = None
    extra_info: Optional[ExtraInfo] = None
    skill_set: Optional[List[str]] = None
    steps: Optional[ResumeSteps] = None
    class Config:
        orm_mode = True

router = APIRouter(
    prefix="/api/resume",
    tags=["resume"],
)

def get_session():
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()
        
db_dependency = Annotated[Session, Depends(get_session)]

@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=ResumeOutput)
def create_resume(resume_input: dict, session: db_dependency):
    new_resume = Resume()
    session.add(new_resume)
    session.commit()
    session.refresh(new_resume)

    resume_steps = ResumeSteps(resume_id=new_resume.id)

    for key, value in resume_input.items():
        if value is not None and key != 'skill_set':
            model_class = globals()[key.replace('_', ' ').title().replace(' ', '')]
            model_instance = model_class(**value)
            session.add(model_instance)
            session.flush()
            setattr(new_resume, f"{key}_id", model_instance.id)
            
            # Update resume_steps based on mandatory fields
            if key == 'professional_info':
                resume_steps.professional_info = all([
                    value.get('name'), value.get('email'), value.get('phone'),
                    value.get('address'), value.get('job_title'), value.get('professional_summary')
                ])
            elif key == 'social_media':
                resume_steps.social_media = any([
                    value.get('linkedin'), value.get('github'), value.get('twitter'),
                    value.get('facebook'), value.get('instagram'), value.get('youtube'), value.get('website')
                ])
            elif key == 'experience':
                resume_steps.experience = all([
                    value.get('company_name'), value.get('job_title'), value.get('start_date'),
                    value.get('end_date'), value.get('location'), value.get('is_current')
                ])
            elif key == 'education':
                resume_steps.education = all([
                    value.get('institute_name'), value.get('degree'), value.get('start_date'), value.get('end_date')
                ])
            elif key == 'projects':
                resume_steps.projects = all([value.get('project_name'), value.get('project_description')])
            elif key == 'certifications':
                resume_steps.certifications = bool(value.get('certification_name'))
            elif key == 'languages':
                resume_steps.languages = bool(value.get('language'))

    if 'skill_set' in resume_input:
        new_resume.skill_set = resume_input['skill_set']

    session.add(new_resume)
    session.add(resume_steps)
    session.commit()
    session.refresh(new_resume)
    session.refresh(resume_steps)

    return ResumeOutput(
        id=new_resume.id,
        professional_info=session.get(ProfessionalInfo, new_resume.professional_info_id),
        social_media=session.get(SocialMedia, new_resume.social_media_id),
        experience=session.get(Experience, new_resume.experience_id),
        education=session.get(Education, new_resume.education_id),
        projects=session.get(Projects, new_resume.projects_id),
        certifications=session.get(Certifications, new_resume.certifications_id),
        languages=session.get(Languages, new_resume.languages_id),
        references=session.get(References, new_resume.references_id),
        extra_info=session.get(ExtraInfo, new_resume.extra_info_id),
        skill_set=new_resume.skill_set,
        steps=resume_steps
    )


@router.get("/{resume_id}", response_model=ResumeOutput)
def get_resume(resume_id: int, session: db_dependency):
    stmt = (
        select(Resume)
        .options(
            selectinload(Resume.professional_info),
            selectinload(Resume.social_media),
            selectinload(Resume.experience),
            selectinload(Resume.education),
            selectinload(Resume.projects),
            selectinload(Resume.certifications),
            selectinload(Resume.languages),
            selectinload(Resume.references),
            selectinload(Resume.extra_info),
            selectinload(Resume.steps)
        )
        .where(Resume.id == resume_id)
    )

    result = session.exec(stmt)
    resume = result.scalars().first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    return ResumeOutput(
        id=resume.id,
        professional_info=resume.professional_info,
        social_media=resume.social_media,
        experience=resume.experience,
        education=resume.education,
        projects=resume.projects,
        certifications=resume.certifications,
        languages=resume.languages,
        references=resume.references,
        extra_info=resume.extra_info,
        skill_set=resume.skill_set,
        steps=resume.steps
    )


@router.put("/{resume_id}", response_model=ResumeOutput)
def update_resume(resume_id: int, resume_input: dict, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume_steps = session.get(ResumeSteps, resume.steps.id) if resume.steps else ResumeSteps(resume_id=resume.id)

    for key, value in resume_input.items():
        if value is not None and key != 'skill_set':
            model_class = globals()[key.replace('_', ' ').title().replace(' ', '')]
            model_id = getattr(resume, f"{key}_id")
            
            if model_id:
                model_instance = session.get(model_class, model_id)
                for field, field_value in value.items():
                    setattr(model_instance, field, field_value)
            else:
                model_instance = model_class(**value)
                session.add(model_instance)
                session.flush()
                setattr(resume, f"{key}_id", model_instance.id)
            
            # Update resume_steps based on mandatory fields
            if key == 'professional_info':
                resume_steps.professional_info = all([
                    model_instance.name, model_instance.email, model_instance.phone,
                    model_instance.address, model_instance.job_title, model_instance.professional_summary
                ])
            elif key == 'social_media':
                resume_steps.social_media = any([
                    model_instance.linkedin, model_instance.github, model_instance.twitter,
                    model_instance.facebook, model_instance.instagram, model_instance.youtube, model_instance.website
                ])
            elif key == 'experience':
                resume_steps.experience = all([
                    model_instance.company_name, model_instance.job_title, model_instance.start_date,
                    model_instance.end_date, model_instance.location, model_instance.is_current
                ])
            elif key == 'education':
                resume_steps.education = all([
                    model_instance.institute_name, model_instance.degree, model_instance.start_date, model_instance.end_date
                ])
            elif key == 'projects':
                resume_steps.projects = all([model_instance.project_name, model_instance.project_description])
            elif key == 'certifications':
                resume_steps.certifications = bool(model_instance.certification_name)
            elif key == 'languages':
                resume_steps.languages = bool(model_instance.language)

    if 'skill_set' in resume_input:
        resume.skill_set = resume_input['skill_set']

    session.add(resume)
    session.add(resume_steps)
    session.commit()
    session.refresh(resume)
    session.refresh(resume_steps)

    return ResumeOutput(
        id=resume.id,
        professional_info=session.get(ProfessionalInfo, resume.professional_info_id),
        social_media=session.get(SocialMedia, resume.social_media_id),
        experience=session.get(Experience, resume.experience_id),
        education=session.get(Education, resume.education_id),
        projects=session.get(Projects, resume.projects_id),
        certifications=session.get(Certifications, resume.certifications_id),
        languages=session.get(Languages, resume.languages_id),
        references=session.get(References, resume.references_id),
        extra_info=session.get(ExtraInfo, resume.extra_info_id),
        skill_set=resume.skill_set,
        steps=resume_steps
    )