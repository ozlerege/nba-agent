import { apiClient } from "@/lib/api/client";
import {
  Team,
  TeamRosterPlayer,
  TeamStaff,
  TeamGameScheduleResponse,
  TeamScheduleFilters,
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

export const TeamsApi = {
  getTeams,
  getTeam,
  getTeamPlayers,
  getTeamStaff,
  getTeamSchedule,
};
