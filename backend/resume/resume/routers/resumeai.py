# Add these imports at the top of the file
from groq import Groq
import os
from typing import List, Annotated
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from resume.model import Resume
from sqlmodel import Session
from resume.db import engine
from resume.settings import LAMAAPI_KEY

groq_client = Groq(api_key=LAMAAPI_KEY)

def get_session():
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()
        
db_dependency = Annotated[Session, Depends(get_session)]

router = APIRouter(
    prefix="/api/resume/ai",
    tags=["resumeai"],
)

# Add these new input models
class JobDescriptionRewriteInput(BaseModel):
    job_title: str
    description: str


# Add these new API endpoints
@router.post("/rewrite-job-description")
def rewrite_job_description(input_data: JobDescriptionRewriteInput):
    prompt = f"""
    Job Title: {input_data.job_title}
    Original Description: {input_data.description}

    Please rewrite the job description only in 3 concise bullet points with maximum 20 words on each bullet point and only returning the bullet points, focusing on the most important aspects of the role and using action verbs. Make the description more impactful and professional.
    """

    response = groq_client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a professional resume writer, skilled in creating impactful job descriptions.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        model="llama3-8b-8192",
        max_tokens=200,
    )

    print("response", response)
    rewritten_description = response.choices[0].message.content.strip().split("\n")
    return JSONResponse(content={"rewritten_description": rewritten_description})

# take resume id as query parameter
@router.post("/generate-professional-summary")
def generate_professional_summary(  resume_id: int, session: db_dependency):
    resume = session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    if not resume.experience and not resume.projects and not resume.certifications and not resume.skill_set:
        raise HTTPException(status_code=400, detail="Resume has no experience, projects, or certifications")
    
    experiences = [exp.model_dump() for exp in resume.experience]
    skills = resume.skill_set or []
    projects = [proj.model_dump() for proj in resume.projects]
    certifications = [cert.model_dump() for cert in resume.certifications]

    prompt = f"""
    Based on the following information, generate 3 different professional summaries for a resume:

    Experiences: {experiences}
    Skills: {skills}
    Projects: {projects}
    Certifications: {certifications}

    Each summary should be 2-3 sentences long, no more than 60 words and returning the array of 3 summaries only, highlighting the candidate's key strengths, experiences, and achievements. Make each summary unique and tailored to different aspects of the candidate's profile.
    """

    response = groq_client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a professional resume writer, skilled in creating impactful professional summaries.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        model="llama3-8b-8192",
        max_tokens=500,
    )

    generated_summaries = response.choices[0].message.content.strip().split("\n\n")
    return JSONResponse(content={"generated_summaries": generated_summaries})