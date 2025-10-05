"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { DataCard } from "@/components/ui/data-card";
import { TeamsApi } from "@/lib/api/endpoints/teams";
import { Team } from "@/lib/api/types";

import { TeamsTable } from "@/components/ui/teams-table";

export function TeamsList() {
  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: TeamsApi.getTeams,
  });

  const { easternTeams, westernTeams } = useMemo(() => {
    const result = { easternTeams: [] as Team[], westernTeams: [] as Team[] };

    if (!teams) return result;

    for (const team of teams ?? []) {
      if (team.conference === "Eastern") {
        result.easternTeams.push(team);
      } else if (team.conference === "Western") {
        result.westernTeams.push(team);
      }
    }

    return result;
  }, [teams]);

  return (
    <div className="flex flex-col gap-4">
      <DataCard
        title="Western Conference"
        isLoading={isLoading}
        error={error?.message}
      >
        <TeamsTable teams={westernTeams} />
      </DataCard>

      <DataCard
        title="Eastern Conference"
        isLoading={isLoading}
        error={error?.message}
      >
        <TeamsTable teams={easternTeams} />
      </DataCard>
    </div>
  );
}
