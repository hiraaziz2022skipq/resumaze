from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter
from fastapi.responses import JSONResponse
from sqlmodel import Session, SQLModel
from starlette import status 
from resume.db import engine
from resume.model import User
from resume.model import Resume, ProfessionalInfo, SocialMedia, Experience, Education, Projects, Certifications, Languages, References, ExtraInfo, ResumeSteps
from pydantic import BaseModel
from typing import Optional, List, Any
from fastapi import HTTPException
from sqlalchemy.future import select
from fastapi.encoders import jsonable_encoder

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

class ProfessionalInfoInput(BaseModel):
    name: Optional[str] = None
    image: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    nationality: Optional[str] = None
    date_of_birth: Optional[str] = None
    job_title: Optional[str] = None
    professional_summary: Optional[str] = None

class SocialMediaInput(BaseModel):
    social_media: List[dict] = []

class ExperienceInput(BaseModel):
    company_name: Optional[str] = None
    job_title: Optional[str] = None
    job_description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    location: Optional[str] = None
    is_current: Optional[bool] = None

class EducationInput(BaseModel):
    institute_name: Optional[str] = None
    degree: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    location: Optional[str] = None
    is_current: Optional[bool] = None


class ProjectInput(BaseModel):
    project_name: Optional[str] = None
    project_description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class CertificationInput(BaseModel):
    certification_name: Optional[str] = None
    certification_link: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class LanguageInput(BaseModel):
    language: Optional[str] = None
    proficiency: Optional[str] = None

class ReferenceInput(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    relationship: Optional[str] = None

class ExtraInfoInput(BaseModel):
    key: Optional[str] = None
    value: Optional[str] = None

class UserInput(BaseModel):
    name: str
    email: str
    password: str


# Helper function to update resume steps
def update_resume_steps(resume_id: int, field: str, session: Session, is_complete: bool):
    resume_steps = session.get(ResumeSteps, resume_id) or ResumeSteps(resume_id=resume_id)
    setattr(resume_steps, field, is_complete)
    session.add(resume_steps)

def get_resume_steps(resume_id: int, session: Session) -> dict:
    resume_steps = session.get(ResumeSteps, resume_id)
    if not resume_steps:
        return {}
    return resume_steps.model_dump()

def hash_password(password: str) -> str:
    # This is a placeholder. Use a proper password hashing library like bcrypt
    return f"hashed_{password}"

# Helper function to check if all mandatory fields are filled
def all_mandatory_fields_filled(data: dict, mandatory_fields: list) -> bool:
    return all(data.get(field) for field in mandatory_fields)

# Add this API to create a user with an empty resume
@router.post("/create-user", status_code=status.HTTP_201_CREATED)
def create_user(user_input: UserInput, session: db_dependency):
    # Check if user with this email already exists
    existing_user = session.exec(select(User).where(User.email == user_input.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    # Create an empty resume
    new_resume = Resume()
    session.add(new_resume)
    session.flush()  # This assigns an id to new_resume

    # Create the user
    new_user = User(
        name=user_input.name,
        email=user_input.email,
        hashed_password=hash_password(user_input.password),
        resumes=new_resume.id
    )
    session.add(new_user)

    session.commit()
    session.refresh(new_user)
    session.refresh(new_resume)

    return JSONResponse(content=jsonable_encoder({
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "resumes": new_user.resumes
        },
        "resume": new_resume,
    }))
# API routes
@router.get("/{resume_id}/steps")
def get_steps(resume_id: int, session: db_dependency):
    steps = get_resume_steps(resume_id, session)
    if not steps:
        raise HTTPException(status_code=404, detail="Resume steps not found")
    return JSONResponse(content=steps)

#skills route
@router.get("/{resume_id}/skills")
def get_skills(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return JSONResponse(content=jsonable_encoder({"skills": resume.skill_set}))

@router.post("/{resume_id}/skills", response_model=Resume)
def post_skills(resume_id: int, skills: List[str], session: db_dependency):
    resume = session.get(Resume, resume_id)
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    resume.skill_set = skills
    session.commit()
    session.refresh(resume)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"resume": resume.model_dump(), "steps": steps}))

@router.put("/{resume_id}/skills", response_model=Resume)
def update_skills(resume_id: int, skills: List[str], session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    resume.skill_set = skills
    session.commit()
    session.refresh(resume)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"resume": resume.model_dump(), "steps": steps}))


# professional info route
@router.get("/{resume_id}/professional-info")
def get_professional_info(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume or not resume.professional_info:
        raise HTTPException(status_code=404, detail="Professional info not found")
    return JSONResponse(content=jsonable_encoder({"professional_info": resume.professional_info.model_dump()}))

@router.post("/{resume_id}/professional-info", response_model=ProfessionalInfo)
def post_professional_info(resume_id: int, info: ProfessionalInfoInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    new_professional_info = ProfessionalInfo(**info.model_dump(), resume_id=resume_id)
    session.add(new_professional_info)
    
    mandatory_fields = ["name", "image", "email", "phone", "address", "job_title"]
    is_complete = all_mandatory_fields_filled(info.model_dump(), mandatory_fields)
    update_resume_steps(resume_id, "professional_info", session, is_complete)
    
    session.commit()
    session.refresh(new_professional_info)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({
        "professional_info": new_professional_info.model_dump(),
        "steps": steps
    }))

@router.put("/{resume_id}/professional-info", response_model=ProfessionalInfo)
def update_professional_info(resume_id: int, info: ProfessionalInfoInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    if resume.professional_info:
        for field, value in info.model_dump(exclude_unset=True).items():
            setattr(resume.professional_info, field, value)
    else:
        professional_info = ProfessionalInfo(**info.model_dump(), resume_id=resume_id)
        session.add(professional_info)
    
    mandatory_fields = ["name", "image", "email", "phone", "address", "job_title"]
    is_complete = all_mandatory_fields_filled(info.model_dump(), mandatory_fields)
    update_resume_steps(resume_id, "professional_info", session, is_complete)
    
    session.commit()
    session.refresh(resume.professional_info)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({
        "professional_info": resume.professional_info.model_dump(),
        "steps": steps
    }))


#social media route
@router.get("/{resume_id}/social-media")
def get_social_media(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume or not resume.social_media:
        raise HTTPException(status_code=404, detail="Social media not found")
    return JSONResponse(content=jsonable_encoder({"social_media": resume.social_media.model_dump()}))

@router.post("/{resume_id}/social-media", response_model=SocialMedia)
def post_social_media(resume_id: int, social_media: SocialMediaInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    new_social_media = SocialMedia(resume_id=resume_id, social_media=social_media.social_media)
    session.add(new_social_media)
    update_resume_steps(resume_id, "social_media", session, bool(social_media.social_media))
    session.commit()
    session.refresh(new_social_media)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"social_media": new_social_media.model_dump(), "steps": steps}))

@router.put("/{resume_id}/social-media", response_model=SocialMedia)
def update_social_media(resume_id: int, social_media: SocialMediaInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    if resume.social_media:
        resume.social_media.social_media = social_media.social_media
    else:
        new_social_media = SocialMedia(resume_id=resume_id, social_media=social_media.social_media)
        session.add(new_social_media)
    
    update_resume_steps(resume_id, "social_media", session, bool(social_media.social_media))
    session.commit()
    session.refresh(resume.social_media)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"social_media": resume.social_media.model_dump(), "steps": steps}))


# experience route
@router.get("/{resume_id}/experience")
def get_experience(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    experiences = session.exec(select(Experience).where(Experience.resume_id == resume_id)).all()
    return JSONResponse(content=jsonable_encoder({"experience": [exp.model_dump() for exp in experiences]}))

@router.post("/{resume_id}/experience", response_model=Experience)
def add_experience(resume_id: int, experience: ExperienceInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    new_experience = Experience(**experience.model_dump(), resume_id=resume_id)
    session.add(new_experience)
    
    mandatory_fields = ["company_name", "job_title", "start_date", "end_date"]
    is_complete = all_mandatory_fields_filled(experience.model_dump(), mandatory_fields)
    update_resume_steps(resume_id, "experience", session, is_complete)
    
    session.commit()
    session.refresh(new_experience)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"experience": new_experience.model_dump(), "steps": steps}))

@router.put("/{resume_id}/experience/{experience_id}", response_model=Experience)
def update_experience(resume_id: int, experience_id: int, experience: ExperienceInput, session: db_dependency):
    db_experience = session.get(Experience, experience_id)
    if not db_experience or db_experience.resume_id != resume_id:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    for field, value in experience.model_dump(exclude_unset=True).items():
        setattr(db_experience, field, value)
    
    mandatory_fields = ["company_name", "job_title", "start_date", "end_date"]
    is_complete = all_mandatory_fields_filled(db_experience.model_dump(), mandatory_fields)
    update_resume_steps(resume_id, "experience", session, is_complete)
    
    session.commit()
    session.refresh(db_experience)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"experience": db_experience.model_dump(), "steps": steps}))

        
# education route
@router.get("/{resume_id}/education",response_model=list[Education])
def get_education(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    results = session.exec(select(Education).where(Education.resume_id == resume_id)).all()
    # Extract Education objects from the tuples
    educations = [result[0] for result in results]

    # Convert SQLAlchemy ORM objects to Pydantic schemas
    educations_schema = [
        Education(
            id=edu.id,
            institute_name=edu.institute_name,
            degree=edu.degree,
            start_date=edu.start_date,
            end_date=edu.end_date,
            location=edu.location,
            is_current=edu.is_current,
            resume_id=edu.resume_id
        )
        for edu in educations
    ]

    return educations_schema

@router.post("/{resume_id}/education", response_model=Education)
def add_education(resume_id: int, education: EducationInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    new_education = Education(**education.model_dump(), resume_id=resume_id)
    session.add(new_education)
    
    mandatory_fields = ["institute_name", "degree", "start_date", "end_date"]
    is_complete = all_mandatory_fields_filled(education.model_dump(), mandatory_fields)
    update_resume_steps(resume_id, "education", session, is_complete)
    
    session.commit()
    session.refresh(new_education)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"education": new_education.model_dump(), "steps": steps}))

@router.put("/{resume_id}/education/{education_id}", response_model=Education)
def update_education(resume_id: int, education_id: int, education: EducationInput, session: db_dependency):
    db_education = session.get(Education, education_id)
    if not db_education or db_education.resume_id != resume_id:
        raise HTTPException(status_code=404, detail="Education not found")
    
    for field, value in education.model_dump(exclude_unset=True).items():
        setattr(db_education, field, value)

    mandatory_fields = ["institute_name", "degree", "start_date", "end_date"]
    is_complete = all_mandatory_fields_filled(education.model_dump(), mandatory_fields)
    update_resume_steps(resume_id, "education", session, is_complete)
    
    session.commit()
    session.refresh(db_education)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"education": db_education.model_dump(), "steps": steps}))


# projects route
@router.get("/{resume_id}/projects",response_model=List[Projects])
def get_projects(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    results = session.exec(select(Projects).where(Projects.resume_id == resume_id)).all()
    projects = [result[0] for result in results]
    projects_schema = [
        Projects(
            id=proj.id,
            project_name=proj.project_name,
            project_description=proj.project_description,
            start_date=proj.start_date,
            end_date=proj.end_date,
            resume_id=proj.resume_id
        )
        for proj in projects
    ]
    return projects_schema

@router.post("/{resume_id}/projects", response_model=Projects)
def add_projects(resume_id: int, projects: ProjectInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    new_projects = Projects(**projects.model_dump(), resume_id=resume_id)
    session.add(new_projects)
    
    is_complete = bool(projects.project_name)
    update_resume_steps(resume_id, "projects", session, is_complete)
    
    session.commit()
    session.refresh(new_projects)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"projects": new_projects.model_dump(), "steps": steps}))

@router.put("/{resume_id}/projects/{projects_id}", response_model=Projects)
def update_projects(resume_id: int, projects_id: int, projects: ProjectInput, session: db_dependency):
    db_projects = session.get(Projects, projects_id)
    if not db_projects or db_projects.resume_id != resume_id:
        raise HTTPException(status_code=404, detail="Projects not found")
    
    for field, value in projects.model_dump(exclude_unset=True).items():
        setattr(db_projects, field, value)

    is_complete = bool(projects.project_name)
    update_resume_steps(resume_id, "projects", session, is_complete)
    
    session.commit()
    session.refresh(db_projects)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"projects": db_projects.model_dump(), "steps": steps}))


# certifications route
@router.get("/{resume_id}/certifications",response_model=List[Certifications])
def get_certifications(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    results = session.exec(select(Certifications).where(Certifications.resume_id == resume_id)).all()
    certifications = [result[0] for result in results]
    certifications_schema = [
        Certifications(
            id=cert.id,
            certification_name=cert.certification_name,
            certification_link=cert.certification_link,
            start_date=cert.start_date,
            end_date=cert.end_date,
            resume_id=cert.resume_id
        )
        for cert in certifications
    ]
    return certifications_schema
    

@router.post("/{resume_id}/certifications", response_model=Certifications)
def add_certifications(resume_id: int, certifications: CertificationInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    new_certifications = Certifications(**certifications.model_dump(), resume_id=resume_id)
    session.add(new_certifications)
    
    is_complete = bool(certifications.certification_name)
    update_resume_steps(resume_id, "certifications", session, is_complete)
    
    session.commit()
    session.refresh(new_certifications)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"certifications": new_certifications.model_dump(), "steps": steps}))

@router.put("/{resume_id}/certifications/{certifications_id}", response_model=Certifications)
def update_certifications(resume_id: int, certifications_id: int, certifications: CertificationInput, session: db_dependency):
    db_certifications = session.get(Certifications, certifications_id)
    if not db_certifications or db_certifications.resume_id != resume_id:
        raise HTTPException(status_code=404, detail="Certifications not found")
    
    for field, value in certifications.model_dump(exclude_unset=True).items():
        setattr(db_certifications, field, value)

    is_complete = bool(certifications.certification_name)
    update_resume_steps(resume_id, "certifications", session, is_complete)
    
    session.commit()
    session.refresh(db_certifications)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"certifications": db_certifications.model_dump(), "steps": steps}))

# languages route
@router.get("/{resume_id}/languages",response_model=list[Languages])
def get_languages(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    results = session.exec(select(Languages).where(Languages.resume_id == resume_id)).all()
    languages = [result[0] for result in results]
    languages_schema = [
        Languages(
            id=lang.id,
            language=lang.language,
            proficiency=lang.proficiency,
            resume_id=lang.resume_id
        )
        for lang in languages
    ]
    return languages_schema

@router.post("/{resume_id}/languages", response_model=Languages)
def add_languages(resume_id: int, languages: LanguageInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    new_languages = Languages(**languages.model_dump(), resume_id=resume_id)
    session.add(new_languages)
    
    is_complete = bool(languages.language)
    update_resume_steps(resume_id, "languages", session, is_complete)
    
    session.commit()
    session.refresh(new_languages)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"languages": new_languages.model_dump(), "steps": steps}))

@router.put("/{resume_id}/languages/{languages_id}", response_model=Languages)
def update_languages(resume_id: int, languages_id: int, languages: LanguageInput, session: db_dependency):
    db_languages = session.get(Languages, languages_id)
    if not db_languages or db_languages.resume_id != resume_id:
        raise HTTPException(status_code=404, detail="Languages not found")
    
    for field, value in languages.model_dump(exclude_unset=True).items():
        setattr(db_languages, field, value)

    is_complete = bool(languages.language)
    update_resume_steps(resume_id, "languages", session, is_complete)
    
    session.commit()
    session.refresh(db_languages)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"languages": db_languages.model_dump(), "steps": steps}))


# do not add resume steps in reference and extra info 
@router.get("/{resume_id}/references",response_model=list[References])
def get_references(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    results = session.exec(select(References).where(References.resume_id == resume_id)).all()
    references = [result[0] for result in results]
    references_schema = [
        References(
            id=ref.id,
            name=ref.name,
            email=ref.email,
            phone=ref.phone,
            relationship=ref.relationship,
            resume_id=ref.resume_id
        )
        for ref in references
    ]
    return references_schema
    

@router.post("/{resume_id}/references", response_model=References)
def add_references(resume_id: int, references: ReferenceInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    new_references = References(**references.model_dump(), resume_id=resume_id)
    session.add(new_references)
    session.commit()
    session.refresh(new_references)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"references": new_references.model_dump(), "steps": steps}))

@router.put("/{resume_id}/references/{references_id}", response_model=References)
def update_references(resume_id: int, references_id: int, references: ReferenceInput, session: db_dependency):
    db_references = session.get(References, references_id)
    if not db_references or db_references.resume_id != resume_id:
        raise HTTPException(status_code=404, detail="References not found")
    
    for field, value in references.model_dump(exclude_unset=True).items():
        setattr(db_references, field, value)
    
    session.commit()
    session.refresh(db_references)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"references": db_references.model_dump(), "steps": steps}))


# extra info route
@router.get("/{resume_id}/extra-info",response_model=list[ExtraInfo])
def get_extra_info(resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    results = session.exec(select(ExtraInfo).where(ExtraInfo.resume_id == resume_id)).all()
    extra_info = [result[0] for result in results]
    extra_info_schema = [
        ExtraInfo(
            id=info.id,
            key=info.key,
            value=info.value,
            resume_id=info.resume_id
        )
        for info in extra_info
    ]
    return extra_info_schema

@router.post("/{resume_id}/extra-info", response_model=ExtraInfo)
def add_extra_info(resume_id: int, extra_info: ExtraInfoInput, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    new_extra_info = ExtraInfo(**extra_info.model_dump(), resume_id=resume_id)
    session.add(new_extra_info)
    session.commit()
    session.refresh(new_extra_info)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"extra_info": new_extra_info.model_dump(), "steps": steps}))

@router.put("/{resume_id}/extra-info/{extra_info_id}", response_model=ExtraInfo)
def update_extra_info(resume_id: int, extra_info_id: int, extra_info: ExtraInfoInput, session: db_dependency):
    db_extra_info = session.get(ExtraInfo, extra_info_id)
    if not db_extra_info or db_extra_info.resume_id != resume_id:
        raise HTTPException(status_code=404, detail="ExtraInfo not found")
    
    for field, value in extra_info.model_dump(exclude_unset=True).items():
        setattr(db_extra_info, field, value)
    
    session.commit()
    session.refresh(db_extra_info)
    steps = get_resume_steps(resume_id, session)
    return JSONResponse(content=jsonable_encoder({"extra_info": db_extra_info.model_dump(), "steps": steps}))

