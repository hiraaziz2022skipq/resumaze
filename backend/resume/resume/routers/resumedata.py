from datetime import timedelta, datetime
from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter
from sqlmodel import Session, SQLModel
from starlette import status 
from resume.db import engine
from resume.model import User
from dotenv import load_dotenv
import os 
from resume.model import Resume, ProfessionalInfo, SocialMedia, Experience, Education, Projects, Certifications, Languages, References, ExtraInfo

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

@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_resume(resume_input: ResumeInput, session: db_dependency):
    new_resume = Resume()

    if resume_input.professional_info:
        professional_info = ProfessionalInfo(**resume_input.professional_info.dict())
        session.add(professional_info)
        session.flush()
        new_resume.professional_info_id = professional_info.id

    if resume_input.social_media:
        social_media = SocialMedia(**resume_input.social_media.dict())
        session.add(social_media)
        session.flush()
        new_resume.social_media_id = social_media.id

    if resume_input.experience:
        experience = Experience(**resume_input.experience.dict())
        session.add(experience)
        session.flush()
        new_resume.experience_id = experience.id

    if resume_input.education:
        education = Education(**resume_input.education.dict())
        session.add(education)
        session.flush()
        new_resume.education_id = education.id

    if resume_input.projects:
        projects = Projects(**resume_input.projects.dict())
        session.add(projects)
        session.flush()
        new_resume.projects_id = projects.id

    if resume_input.certifications:
        certifications = Certifications(**resume_input.certifications.dict())
        session.add(certifications)
        session.flush()
        new_resume.certifications_id = certifications.id

    if resume_input.languages:
        languages = Languages(**resume_input.languages.dict())
        session.add(languages)
        session.flush()
        new_resume.languages_id = languages.id

    if resume_input.references:
        references = References(**resume_input.references.dict())
        session.add(references)
        session.flush()
        new_resume.references_id = references.id

    if resume_input.extra_info:
        extra_info = ExtraInfo(**resume_input.extra_info.dict())
        session.add(extra_info)
        session.flush()
        new_resume.extra_info_id = extra_info.id

    if resume_input.skill_set:
        new_resume.skill_set = resume_input.skill_set

    session.add(new_resume)
    session.commit()
    session.refresh(new_resume)
    return new_resume
    
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
            selectinload(Resume.extra_info)
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
        skill_set=resume.skill_set
    )

@router.put("/{resume_id}", response_model=ResumeOutput)
def update_resume(resume_id: int, resume_input: ResumeInput, session: db_dependency):
    # Fetch the existing resume
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    # Update professional info
    if resume_input.professional_info:
        if resume.professional_info_id:
            professional_info = session.get(ProfessionalInfo, resume.professional_info_id)
            for key, value in resume_input.professional_info.dict(exclude_unset=True).items():
                setattr(professional_info, key, value)
        else:
            professional_info = ProfessionalInfo(**resume_input.professional_info.dict())
            session.add(professional_info)
            session.flush()
            resume.professional_info_id = professional_info.id

    # Update social media
    if resume_input.social_media:
        if resume.social_media_id:
            social_media = session.get(SocialMedia, resume.social_media_id)
            for key, value in resume_input.social_media.dict(exclude_unset=True).items():
                setattr(social_media, key, value)
        else:
            social_media = SocialMedia(**resume_input.social_media.dict())
            session.add(social_media)
            session.flush()
            resume.social_media_id = social_media.id

    # Update experience
    if resume_input.experience:
        if resume.experience_id:
            experience = session.get(Experience, resume.experience_id)
            for key, value in resume_input.experience.dict(exclude_unset=True).items():
                setattr(experience, key, value)
        else:
            experience = Experience(**resume_input.experience.dict())
            session.add(experience)
            session.flush()
            resume.experience_id = experience.id

    # Update education
    if resume_input.education:
        if resume.education_id:
            education = session.get(Education, resume.education_id)
            for key, value in resume_input.education.dict(exclude_unset=True).items():
                setattr(education, key, value)
        else:
            education = Education(**resume_input.education.dict())
            session.add(education)
            session.flush()
            resume.education_id = education.id

    # Update projects
    if resume_input.projects:
        if resume.projects_id:
            projects = session.get(Projects, resume.projects_id)
            for key, value in resume_input.projects.dict(exclude_unset=True).items():
                setattr(projects, key, value)
        else:
            projects = Projects(**resume_input.projects.dict())
            session.add(projects)
            session.flush()
            resume.projects_id = projects.id

    # Update certifications
    if resume_input.certifications:
        if resume.certifications_id:
            certifications = session.get(Certifications, resume.certifications_id)
            for key, value in resume_input.certifications.dict(exclude_unset=True).items():
                setattr(certifications, key, value)
        else:
            certifications = Certifications(**resume_input.certifications.dict())
            session.add(certifications)
            session.flush()
            resume.certifications_id = certifications.id

    # Update languages
    if resume_input.languages:
        if resume.languages_id:
            languages = session.get(Languages, resume.languages_id)
            for key, value in resume_input.languages.dict(exclude_unset=True).items():
                setattr(languages, key, value)
        else:
            languages = Languages(**resume_input.languages.dict())
            session.add(languages)
            session.flush()
            resume.languages_id = languages.id

    # Update references
    if resume_input.references:
        if resume.references_id:
            references = session.get(References, resume.references_id)
            for key, value in resume_input.references.dict(exclude_unset=True).items():
                setattr(references, key, value)
        else:
            references = References(**resume_input.references.dict())
            session.add(references)
            session.flush()
            resume.references_id = references.id

    # Update extra info
    if resume_input.extra_info:
        if resume.extra_info_id:
            extra_info = session.get(ExtraInfo, resume.extra_info_id)
            for key, value in resume_input.extra_info.dict(exclude_unset=True).items():
                setattr(extra_info, key, value)
        else:
            extra_info = ExtraInfo(**resume_input.extra_info.dict())
            session.add(extra_info)
            session.flush()
            resume.extra_info_id = extra_info.id

    # Update skill set
    if resume_input.skill_set is not None:
        resume.skill_set = resume_input.skill_set

    session.commit()
    session.refresh(resume)

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
        skill_set=resume.skill_set
    )


    