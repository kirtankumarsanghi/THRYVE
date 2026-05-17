from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import (
    Base,
    engine
)

from app.api.api_router import router

from app.models.user import User
from app.models.goal import Goal

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="THRYVE API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "THRYVE Backend Running"
    }