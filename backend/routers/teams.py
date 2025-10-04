from datetime import datetime
from typing import List, Literal, Optional, Any
import time

from fastapi import APIRouter, HTTPException, Query
from nba_api.stats.static import teams as static_teams
from nba_api.stats.endpoints import commonteamroster as team_roster
from nba_api.stats.endpoints import scheduleleaguev2
from pydantic import BaseModel
import pandas as pd

from backend.constants.team_meta import TEAM_META

router = APIRouter(prefix="/api/teams", tags=["teams"])


class Team(BaseModel):
    id: int
    full_name: str
    abbreviation: str
    nickname: str
    city: str
    state: str
    year_founded: int
    conference: str
    division: str


@router.get("/", summary="List NBA teams", response_model=List[Team])
async def list_teams():
    try:
        teams = static_teams.get_teams()
        for team in teams:
            meta = TEAM_META.get(team["id"])
            team["conference"] = meta["conference"] if meta else "Unknown"
            team["division"] = meta["division"] if meta else "Unknown"
    except Exception as exc:  # pragma: no cover - library error handling
        raise HTTPException(status_code=500, detail=f"Failed to fetch teams: {exc}") from exc

    return [
        Team(
            id=team["id"],
            full_name=team["full_name"],
            abbreviation=team["abbreviation"],
            nickname=team["nickname"],
            city=team["city"],
            state=team["state"],
            year_founded=team["year_founded"],
            conference=team["conference"],
            division=team["division"],
        )
        for team in teams
    ]


@router.get("/{id}", summary="Get NBA team by ID", response_model=Team)
async def get_team(id: int):
    try:
        team = static_teams._find_team_name_by_id(id)
        meta = TEAM_META.get(id)
        team["conference"] = meta["conference"] if meta else "Unknown"
        team["division"] = meta["division"] if meta else "Unknown"
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch team: {exc}") from exc
    return Team(
        id=team["id"],
        full_name=team["full_name"],
        abbreviation=team["abbreviation"],
        nickname=team["nickname"],
        city=team["city"],
        state=team["state"],
        year_founded=team["year_founded"],
        conference=team["conference"],
        division=team["division"],
    )


class TeamRosterPlayer(BaseModel):
    id: int
    full_name: str
    number: Optional[str]
    position: Optional[str]
    height: Optional[str]
    weight: Optional[str]
    birth_date: Optional[str]
    age: Optional[float]
    experience: Optional[str]
    college: Optional[str]


@router.get("/{id}/players", summary="Get NBA team roster by ID", response_model=List[TeamRosterPlayer])
async def get_team_players(id: int):
    try:
        roster_endpoint = team_roster.CommonTeamRoster(team_id=id)
        players_df = roster_endpoint.get_data_frames()[0]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch team roster: {exc}") from exc

    return [
        TeamRosterPlayer(
            id=int(row["PLAYER_ID"]),
            full_name=row["PLAYER"],
            number=row.get("NUM"),
            position=row.get("POSITION"),
            height=row.get("HEIGHT"),
            weight=row.get("WEIGHT"),
            birth_date=row.get("BIRTH_DATE"),
            age=float(row["AGE"]) if row.get("AGE") else None,
            experience=row.get("EXP"),
            college=row.get("SCHOOL"),
        )
        for _, row in players_df.iterrows()
    ]


class TeamStaff(BaseModel):
    id: int
    full_name: str
    position: Optional[str]
    is_assistant: bool
    coach_type: Optional[str]


@router.get("/{id}/staff", summary="Get NBA team staff", response_model=List[TeamStaff])
async def get_team_staff(id: int):
    try:
        roster_endpoint = team_roster.CommonTeamRoster(team_id=id)
        staff_df = roster_endpoint.get_data_frames()[1]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch team staff: {exc}") from exc

    return [
        TeamStaff(
            id=int(row["COACH_ID"]),
            full_name=row["COACH_NAME"],
            position=row.get("COACH_TYPE"),
            is_assistant=bool(row.get("IS_ASSISTANT")),
            coach_type=row.get("COACH_TYPE"),
        )
        for _, row in staff_df.iterrows()
    ]


class TeamGame(BaseModel):
    id: int
    date: str
    matchup: Optional[str]
    is_home: bool
    status: Literal["completed", "upcoming"]
    team_score: Optional[int]
    opponent_score: Optional[int]
    season: Optional[str]
    opponent_team_id: Optional[int]


class TeamGameScheduleResponse(BaseModel):
    previous: List[TeamGame]
    upcoming: List[TeamGame]


def _parse_game_date(value: Any) -> datetime:
    
    if isinstance(value, datetime):
        return value
    ts = getattr(value, "to_pydatetime", None)
    if callable(ts):
        return ts()
    s = str(value)
    
    for fmt in ("%m/%d/%Y %H:%M:%S", "%b %d, %Y", "%Y-%m-%d"):
        try:
            return datetime.strptime(s, fmt)
        except ValueError:
            continue
   
    raise ValueError(f"Unsupported date format: {value}")


@router.get("/{id}/games", summary="Get NBA team games", response_model=TeamGameScheduleResponse)
async def get_team_games(
    id: int,
    season: Optional[str] = Query(
        default=None,
        description="NBA season in format YYYY-YY (e.g., 2024-25)",
        pattern=r"^\d{4}-\d{2}$",
    ),
    month: Optional[int] = Query(default=None, ge=1, le=12),
    season_type: str = Query(
        default="Regular Season",
        description="Season type: Regular Season, Pre Season, or Playoffs",
    ),
):
    try:
        
        current_year = datetime.utcnow().year
        if datetime.utcnow().month >= 10:  
            current_season_year = current_year
        else:
            current_season_year = current_year - 1
        current_season_str = f"{current_season_year}-{str((current_season_year + 1) % 100).zfill(2)}"
        
        
        filtered_season_str: str = season if season else current_season_str
        
        
        all_games_dfs = []
        
        
        schedule_endpoint = scheduleleaguev2.ScheduleLeagueV2(season=filtered_season_str)
        all_games_dfs.append(schedule_endpoint.get_data_frames()[0])

        print("All games dfs:", all_games_dfs)
        
       
        if filtered_season_str != current_season_str:
            time.sleep(0.6)  
            current_schedule = scheduleleaguev2.ScheduleLeagueV2(season=current_season_str)
            all_games_dfs.append(current_schedule.get_data_frames()[0])
        
      
        all_games_df = pd.concat(all_games_dfs, ignore_index=True)
        
        
        games_df = all_games_df[
            (all_games_df["homeTeam_teamId"] == id) | (all_games_df["awayTeam_teamId"] == id)
        ].copy()
        
        
        if season_type == "Regular Season":
            
            games_df = games_df[
                ~games_df["gameLabel"].str.contains("Preseason|Playoff", na=False, case=False)
            ]
        elif season_type == "Pre Season":
            games_df = games_df[games_df["gameLabel"].str.contains("Preseason", na=False, case=False)]
        elif season_type == "Playoffs":
            games_df = games_df[games_df["gameLabel"].str.contains("Playoff", na=False, case=False)]
            
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch team games: {exc}") from exc

    games: List[TeamGame] = []
    now = datetime.utcnow()

    
    abbr_to_id = {t["abbreviation"]: t["id"] for t in static_teams.get_teams()}

    for _, row in games_df.iterrows():
        raw_date = row.get("gameDate")
        if not raw_date or pd.isna(raw_date):
            continue
        try:
            game_date = _parse_game_date(raw_date)
        except ValueError:
            continue

        
        game_status_text = row.get("gameStatusText", "")
        
        is_completed = game_status_text and ("Final" in str(game_status_text))
        status: Literal["completed", "upcoming"] = "completed" if is_completed else "upcoming"

            
            
        if status == "completed":
            if month and game_date.month != month:
                continue

        
        is_home = row["homeTeam_teamId"] == id
        
        
        away_abbr = row.get("awayTeam_teamTricode", "")
        home_abbr = row.get("homeTeam_teamTricode", "")
        matchup = f"{away_abbr} @ {home_abbr}"
        
        
        opponent_team_id = row["awayTeam_teamId"] if is_home else row["homeTeam_teamId"]
        
        
        home_score = row.get("homeTeam_score")
        away_score = row.get("awayTeam_score")
        
        
        try:
            home_score = int(home_score) if home_score and not pd.isna(home_score) else None
            away_score = int(away_score) if away_score and not pd.isna(away_score) else None
        except (ValueError, TypeError):
            home_score = None
            away_score = None
        
        team_score = home_score if is_home else away_score
        opponent_score = away_score if is_home else home_score

        games.append(
            TeamGame(
                id=int(row["gameId"]),
                date=game_date.strftime("%Y-%m-%d"),
                matchup=matchup,
                is_home=is_home,
                status=status,
                team_score=team_score,
                opponent_score=opponent_score,
                season=str(row.get("seasonYear", "")),
                opponent_team_id=int(opponent_team_id) if opponent_team_id and not pd.isna(opponent_team_id) else None,
            )
        )

    previous_games = sorted(
        [game for game in games if game.status == "completed"],
        key=lambda game: game.date,
        reverse=True,
    )
    upcoming_games = sorted(
        [game for game in games if game.status == "upcoming"],
        key=lambda game: game.date,
    )

    return TeamGameScheduleResponse(previous=previous_games, upcoming=upcoming_games)
