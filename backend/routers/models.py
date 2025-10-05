from ast import List
from typing import List, Literal, Optional
from pydantic import BaseModel


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

class TeamStaff(BaseModel):
    id: int
    full_name: str
    position: Optional[str]
    is_assistant: bool
    coach_type: Optional[str]

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



class TeamStats(BaseModel):
    team_id: int
    team_city: str
    team_name: str
    year: str
    gp: int
    min: float
    wins: int
    losses: int
    win_pct: float
    conf_rank: int
    div_rank: int
    po_wins: int
    po_losses: int
    conf_count: int
    div_count: int
    nba_finals_appearance: int
    fgm: int
    fga: int
    fg_pct: float
    fg3m: int
    fg3a: int
    fg3_pct: float
    ftm: int
    fta: int
    ft_pct: float
    oreb: float
    dreb: float
    reb: float
    ast: float
    pf: float
    stl: float
    tov: float
    blk: float
    pts: float
    pts_rank: int
    plus_minus: float
