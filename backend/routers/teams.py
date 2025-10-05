from datetime import datetime
from typing import List, Literal, Optional
import time
from nba_api.stats.endpoints import teamyearbyyearstats as team_year_by_year_stats
from fastapi import APIRouter, HTTPException, Query
from nba_api.stats.static import teams as static_teams
from nba_api.stats.endpoints import commonteamroster as team_roster
from nba_api.stats.endpoints import scheduleleaguev2
from pydantic import BaseModel
import pandas as pd
from backend.routers.helpers import _parse_game_date, _safe_int, _safe_float
from backend.constants.team_meta import TEAM_META
from backend.routers.models import Team, TeamGameScheduleResponse, TeamRosterPlayer, TeamStaff, TeamStats, TeamGame

router = APIRouter(prefix="/api/teams", tags=["teams"])




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


@router.get("/{id}/stats", summary="Get NBA team stats by ID", response_model=List[TeamStats] )
async def get_team_stats(id: int, season: Optional[str] = Query(
        default=None,
        description="NBA season in format YYYY-YY (e.g., 2024-25)",
        pattern=r"^\d{4}-\d{2}$",
    ),):
    try:
        stats_endpoint = team_year_by_year_stats.TeamYearByYearStats(team_id=id)
        stats_df = stats_endpoint.get_data_frames()[0]
        stats_df = stats_df[stats_df["YEAR"] == season] if season else stats_df
    except Exception as exc:  # pragma: no cover - library error handling
        raise HTTPException(status_code=500, detail=f"Failed to fetch team stats: {exc}") from exc

    return [
        TeamStats(
            team_id=_safe_int(row.get("TEAM_ID")),
            team_city=row.get("TEAM_CITY", ""),
            team_name=row.get("TEAM_NAME", ""),
            year=str(row.get("YEAR", "")),
            gp=_safe_int(row.get("GP")),
            min=_safe_float(row.get("MIN")),
            wins=_safe_int(row.get("WINS")),
            losses=_safe_int(row.get("LOSSES")),
            win_pct=_safe_float(row.get("WIN_PCT")),
            conf_rank=_safe_int(row.get("CONF_RANK")),
            div_rank=_safe_int(row.get("DIV_RANK")),
            po_wins=_safe_int(row.get("PO_WINS")),
            po_losses=_safe_int(row.get("PO_LOSSES")),
            conf_count=_safe_int(row.get("CONF_COUNT")),
            div_count=_safe_int(row.get("DIV_COUNT")),
            nba_finals_appearance=_safe_int(row.get("NBA_FINALS_APPEARANCE")),
            fgm=_safe_int(row.get("FGM")),
            fga=_safe_int(row.get("FGA")),
            fg_pct=_safe_float(row.get("FG_PCT")),
            fg3m=_safe_int(row.get("FG3M")),
            fg3a=_safe_int(row.get("FG3A")),
            fg3_pct=_safe_float(row.get("FG3_PCT")),
            ftm=_safe_int(row.get("FTM")),
            fta=_safe_int(row.get("FTA")),
            ft_pct=_safe_float(row.get("FT_PCT")),
            oreb=_safe_float(row.get("OREB")),
            dreb=_safe_float(row.get("DREB")),
            reb=_safe_float(row.get("REB")),
            ast=_safe_float(row.get("AST")),
            pf=_safe_float(row.get("PF")),
            stl=_safe_float(row.get("STL")),
            tov=_safe_float(row.get("TOV")),
            blk=_safe_float(row.get("BLK")),
            pts=_safe_float(row.get("PTS")),
            pts_rank=_safe_int(row.get("PTS_RANK")),
            plus_minus=_safe_float(row.get("PLUS_MINUS")),
        )
        for _, row in stats_df.iterrows()
    ]
