"use client";
import { useQuery } from "@tanstack/react-query";
import { DataCard } from "@/components/ui/data-card";
import { TeamsApi } from "@/lib/api/endpoints/teams";
import { RosterTable } from "@/components/ui/roster-table";
import { StaffTable } from "@/components/ui/staff-table";

export function TeamDetail({ teamId }: { teamId: number }) {
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
      <DataCard
        title="Roster"
        isLoading={isLoadingPlayers}
        error={playersError?.message}
      >
        <RosterTable roster={players ?? []} />
      </DataCard>

      <DataCard
        title="Coaching Staff"
        isLoading={isLoadingStaff}
        error={staffError?.message}
        className="mt-4"
      >
        <StaffTable staff={staff ?? []} />
      </DataCard>
    </div>
  );
}
