import { apiClient } from "@/lib/api/client";
import {
  Team,
  TeamRosterPlayer,
  TeamStaff,
  TeamGameScheduleResponse,
  TeamScheduleFilters,
  TeamStats,
  TeamStatsApiResponse,
} from "@/lib/api/types";

async function getTeams() {
  const response = await apiClient.get<Team[]>("/api/teams");
  return response.data;
}

async function getTeam(id: number) {
  const response = await apiClient.get<Team>(`/api/teams/${id}`);
  return response.data;
}

async function getTeamPlayers(id: number) {
  const response = await apiClient.get<TeamRosterPlayer[]>(
    `/api/teams/${id}/players`
  );
  return response.data;
}

async function getTeamStaff(id: number) {
  const response = await apiClient.get<TeamStaff[]>(`/api/teams/${id}/staff`);
  return response.data;
}

async function getTeamSchedule(id: number, filters: TeamScheduleFilters = {}) {
  const searchParams = new URLSearchParams();
  if (filters.season) searchParams.set("season", filters.season);
  if (filters.month) searchParams.set("month", String(filters.month));
  if (filters.season_type) searchParams.set("season_type", filters.season_type);

  const query = searchParams.toString();
  const response = await apiClient.get<TeamGameScheduleResponse>(
    `/api/teams/${id}/games${query ? `?${query}` : ""}`
  );
  return response.data;
}

function readNumber(value: unknown, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function readString(value: unknown, fallback = "") {
  if (value === null || value === undefined) return fallback;
  const str = String(value);
  return str === "nan" ? fallback : str;
}

function mapTeamStats(raw: TeamStatsApiResponse | Record<string, unknown>): TeamStats {
  const row = raw as Record<string, unknown> & Partial<TeamStatsApiResponse>;

  const rawYear =
    row.YEAR ??
    row.year ??
    row.YR ??
    row.season ??
    "";

  const startYear = Number.parseInt(readString(rawYear).slice(0, 4), 10);

  return {
    teamId: row.TEAM_ID ?? readNumber(row.teamId ?? row.team_id),
    teamCity: row.TEAM_CITY ?? readString(row.teamCity ?? row.team_city),
    teamName: row.TEAM_NAME ?? readString(row.teamName ?? row.team_name),
    year: readString(rawYear),
    seasonStartYear: Number.isFinite(startYear) ? startYear : 0,
    gp: row.GP ?? readNumber(row.gp ?? row.GP, 0),
    min: row.MIN ?? readNumber(row.min ?? row.MIN, 0),
    wins: row.WINS ?? readNumber(row.wins ?? row.WINS, 0),
    losses: row.LOSSES ?? readNumber(row.losses ?? row.LOSSES, 0),
    winPct: row.WIN_PCT ?? readNumber(row.winPct ?? row.win_pct, 0),
    confRank: row.CONF_RANK ?? readNumber(row.confRank ?? row.conf_rank, 0),
    divRank: row.DIV_RANK ?? readNumber(row.divRank ?? row.div_rank, 0),
    poWins: row.PO_WINS ?? readNumber(row.poWins ?? row.po_wins, 0),
    poLosses: row.PO_LOSSES ?? readNumber(row.poLosses ?? row.po_losses, 0),
    confCount: row.CONF_COUNT ?? readNumber(row.confCount ?? row.conf_count, 0),
    divCount: row.DIV_COUNT ?? readNumber(row.divCount ?? row.div_count, 0),
    nbaFinalsAppearance:
      row.NBA_FINALS_APPEARANCE ??
      readNumber(row.nbaFinalsAppearance ?? row.nba_finals_appearance, 0),
    fgm: row.FGM ?? readNumber(row.fgm ?? row.FGM, 0),
    fga: row.FGA ?? readNumber(row.fga ?? row.FGA, 0),
    fgPct: row.FG_PCT ?? readNumber(row.fgPct ?? row.fg_pct, 0),
    fg3m: row.FG3M ?? readNumber(row.fg3m ?? row.FG3M, 0),
    fg3a: row.FG3A ?? readNumber(row.fg3a ?? row.FG3A, 0),
    fg3Pct: row.FG3_PCT ?? readNumber(row.fg3Pct ?? row.fg3_pct, 0),
    ftm: row.FTM ?? readNumber(row.ftm ?? row.FTM, 0),
    fta: row.FTA ?? readNumber(row.fta ?? row.FTA, 0),
    ftPct: row.FT_PCT ?? readNumber(row.ftPct ?? row.ft_pct, 0),
    oreb: row.OREB ?? readNumber(row.oreb ?? row.OREB, 0),
    dreb: row.DREB ?? readNumber(row.dreb ?? row.DREB, 0),
    reb: row.REB ?? readNumber(row.reb ?? row.REB, 0),
    ast: row.AST ?? readNumber(row.ast ?? row.AST, 0),
    pf: row.PF ?? readNumber(row.pf ?? row.PF, 0),
    stl: row.STL ?? readNumber(row.stl ?? row.STL, 0),
    tov: row.TOV ?? readNumber(row.tov ?? row.TOV, 0),
    blk: row.BLK ?? readNumber(row.blk ?? row.BLK, 0),
    pts: row.PTS ?? readNumber(row.pts ?? row.PTS, 0),
    ptsRank: row.PTS_RANK ?? readNumber(row.ptsRank ?? row.pts_rank, 0),
    plusMinus:
      row.PLUS_MINUS ?? readNumber(row.plusMinus ?? row.plus_minus, 0),
  };
}

async function getTeamStats(id: number) {
  const response = await apiClient.get<TeamStatsApiResponse[]>(
    `/api/teams/${id}/stats`
  );

  return response.data.map(mapTeamStats);
}

export const TeamsApi = {
  getTeams,
  getTeam,
  getTeamPlayers,
  getTeamStaff,
  getTeamSchedule,
  getTeamStats,
};
