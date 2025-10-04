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
