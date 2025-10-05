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
    teamId: int
    teamCity: str
    teamName: str
    year: str
    seasonStartYear: int
    gp: int
    min: float
    wins: int
    losses: int
    winPct: float
    confRank: int
    divRank: int
    poWins: int
    poLosses: int
    confCount: int
    divCount: int
    nbaFinalsAppearance: int
    fgm: int
    fga: int
    fgPct: float
    fg3m: int
    fg3a: int
    fg3Pct: float
    ftm: int
    fta: int
    ftPct: float
    oreb: float
    dreb: float
    reb: float
    ast: float
    pf: float
    stl: float
    tov: float
    blk: float
    pts: float
    ptsRank: int
    plusMinus: float
