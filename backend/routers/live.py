from fastapi import APIRouter

router = APIRouter(prefix="/api/live", tags=["live"])


@router.get("/scoreboard", summary="Get live NBA scoreboard")
async def get_live_scoreboard():
    """Placeholder endpoint that will return live game data."""
    return {"message": "Live scoreboard endpoint coming soon"}
