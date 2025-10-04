"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiCallPrior } from "@/components/ui/apiCallPrior";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamsApi } from "@/lib/api/endpoints/teams";
import { RosterTable } from "../roster-table";
import { StaffTable } from "../staff-table";

export function TeamDetail({ teamId }: { teamId: number }) {
  const {
    data: team,
    isLoading: isLoadingTeam,
    error: teamError,
  } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => TeamsApi.getTeam(Number(teamId)),
    enabled: !!teamId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 60 minutes
  });

  const {
    data: players,
    isLoading: isLoadingPlayers,
    error: playersError,
  } = useQuery({
    queryKey: ["roster", teamId],
    queryFn: () => TeamsApi.getTeamPlayers(Number(teamId)),
    enabled: !!teamId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 60 minutes
  });

  const {
    data: staff,
    isLoading: isLoadingStaff,
    error: staffError,
  } = useQuery({
    queryKey: ["staff", teamId],
    queryFn: () => TeamsApi.getTeamStaff(Number(teamId)),
    enabled: !!teamId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 60 minutes
  });

  if (!teamId) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Invalid team identifier.
      </div>
    );
  }

  return (
    <div>
      <ApiCallPrior loading={isLoadingTeam} error={teamError?.message ?? ""} />
      <Card>
        <CardHeader>
          <CardTitle>Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <ApiCallPrior
            loading={isLoadingPlayers}
            error={playersError?.message ?? ""}
          />
          {!isLoadingPlayers && !playersError && (
            <RosterTable roster={players ?? []} />
          )}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Coaching Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <ApiCallPrior
            loading={isLoadingStaff}
            error={staffError?.message ?? ""}
          />
          {!isLoadingStaff && !staffError && <StaffTable staff={staff ?? []} />}
        </CardContent>
      </Card>
    </div>
  );
}
