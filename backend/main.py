from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .routers import players, teams, live

load_dotenv()

app = FastAPI(title="NBA Stats Backend")

allowed_origins = os.getenv("NBA_API_ALLOWED_ORIGINS", "http://localhost:3000")
origins = [origin.strip() for origin in allowed_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(players.router)
app.include_router(teams.router)
app.include_router(live.router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}
