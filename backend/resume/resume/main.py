from resume.model import Resume, ProfessionalInfo, SocialMedia, Experience, Education, Projects, Certifications, Languages, References, ExtraInfo
from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from typing import Annotated
from sqlmodel import Session
from resume.db import create_db_and_tables
from resume.routers import auth, resumedata, jobapplication
from resume.db import engine
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables..")
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(auth.router)
app.include_router(resumedata.router)
app.include_router(jobapplication.router)
origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://localhost:3000/login",
    "http://localhost:8000",
    "https://localhost:8000",
    "http://127.0.0.1:3000",
    "https://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "https://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

app.json_encoder = CustomJSONEncoder

def get_session():
    with Session(engine) as session:
        yield session

db_dependency = Annotated[Session, Depends(get_session)]

@app.get("/")
def root():
    return {"Hello": "world"}




