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
import { TEAM_META } from "@/lib/enums";

async function getTeams() {
  const response = await apiClient.get<Team[]>("/api/teams");
  // Add team metadata (conference/division) from frontend constants
  return response.data.map((team) => {
    const meta = TEAM_META[team.id];
    return {
      ...team,
      conference: meta?.conference || "Unknown",
      division: meta?.division || "Unknown",
    };
  });
}

async function getTeam(id: number) {
  const response = await apiClient.get<Team>(`/api/teams/${id}`);
  // Add team metadata (conference/division) from frontend constants
  const meta = TEAM_META[id];
  return {
    ...response.data,
    conference: meta?.conference || "Unknown",
    division: meta?.division || "Unknown",
  };
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

function mapTeamStats(
  raw: TeamStatsApiResponse | Record<string, unknown>
): TeamStats {
  // Backend now returns camelCase, so we can use the data directly
  return raw as unknown as TeamStats;
}

async function getTeamStats(id: number) {
  const response = await apiClient.get<TeamStats[]>(`/api/teams/${id}/stats`);

  return response.data;
}

export const TeamsApi = {
  getTeams,
  getTeam,
  getTeamPlayers,
  getTeamStaff,
  getTeamSchedule,
  getTeamStats,
};
