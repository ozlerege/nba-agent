export interface Player {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

export interface Team {
  id: number;
  full_name: string;
  abbreviation: string;
  nickname: string;
  city: string;
  state: string;
  year_founded: number;
  conference: string;
  division: string;
}

export interface TeamRosterPlayer {
  id: number;
  full_name: string;
  number: string | null;
  position: string | null;
  height: string | null;
  weight: string | null;
  birth_date: string | null;
  age: number | null;
  experience: string | null;
  college: string | null;
}

export interface TeamStaff {
  id: number;
  full_name: string;
  position: string | null;
  is_assistant: boolean;
  coach_type: string | null;
}

export interface TeamScheduleFilters {
  season?: string; // Format: "YYYY-YY" (e.g., "2024-25")
  month?: number;
  season_type?: "Regular Season" | "Pre Season" | "Playoffs";
}

export interface TeamGame {
  id: number;
  date: string;
  matchup: string | null;
  is_home: boolean;
  status: "completed" | "upcoming";
  team_score: number | null;
  opponent_score: number | null;
  season: string | null;
  opponent_team_id: number | null;
}

export interface TeamGameScheduleResponse {
  previous: TeamGame[];
  upcoming: TeamGame[];
}

export interface TeamStatsApiResponse {
  TEAM_ID: number;
  TEAM_CITY: string;
  TEAM_NAME: string;
  YEAR: string;
  GP: number;
  MIN: number;
  WINS: number;
  LOSSES: number;
  WIN_PCT: number;
  CONF_RANK: number;
  DIV_RANK: number;
  PO_WINS: number;
  PO_LOSSES: number;
  CONF_COUNT: number;
  DIV_COUNT: number;
  NBA_FINALS_APPEARANCE: number;
  FGM: number;
  FGA: number;
  FG_PCT: number;
  FG3M: number;
  FG3A: number;
  FG3_PCT: number;
  FTM: number;
  FTA: number;
  FT_PCT: number;
  OREB: number;
  DREB: number;
  REB: number;
  AST: number;
  PF: number;
  STL: number;
  TOV: number;
  BLK: number;
  PTS: number;
  PTS_RANK: number;
  PLUS_MINUS: number;
}

export interface TeamStats {
  teamId: number;
  teamCity: string;
  teamName: string;
  year: string;
  seasonStartYear: number;
  gp: number;
  min: number;
  wins: number;
  losses: number;
  winPct: number;
  confRank: number;
  divRank: number;
  poWins: number;
  poLosses: number;
  confCount: number;
  divCount: number;
  nbaFinalsAppearance: number;
  fgm: number;
  fga: number;
  fgPct: number;
  fg3m: number;
  fg3a: number;
  fg3Pct: number;
  ftm: number;
  fta: number;
  ftPct: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  pf: number;
  stl: number;
  tov: number;
  blk: number;
  pts: number;
  ptsRank: number;
  plusMinus: number;
}
