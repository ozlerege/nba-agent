from typing import List, Optional

from fastapi import APIRouter, HTTPException, Query
from nba_api.stats.static import players as static_players
from pydantic import BaseModel

router = APIRouter(prefix="/api/players", tags=["players"])


class Player(BaseModel):
    id: int
    full_name: str
    first_name: str
    last_name: str
    is_active: bool


@router.get("/", summary="List NBA players", response_model=List[Player])
async def list_players(search: Optional[str] = Query(default=None, description="Filter players by name")):
    try:
        players = static_players.get_players()
    except Exception as exc:  # pragma: no cover - library error handling
        raise HTTPException(status_code=500, detail=f"Failed to fetch players: {exc}") from exc

    if search:
        normalized = search.lower()
        players = [player for player in players if normalized in player["full_name"].lower()]

    return [
        Player(
            id=player["id"],
            full_name=player["full_name"],
            first_name=player["first_name"],
            last_name=player["last_name"],
            is_active=player["is_active"],
        )
        for player in players
    ]
