"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiCallPrior } from "@/components/ui/apiCallPrior";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { TeamsApi } from "@/lib/api/endpoints/teams";
import type { TeamStats as TeamStatsModel } from "@/lib/api/types";
import { TeamStatsTable } from "../team-stats-table";

const DEFAULT_SEASON = "2025-26";

export function TeamStats({ teamId }: { teamId: number }) {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery<TeamStatsModel[]>({
    queryKey: ["teamStats", teamId],
    queryFn: () => TeamsApi.getTeamStats(Number(teamId)),
    enabled: !!teamId,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  const sortedStats = useMemo(() => {
    if (!stats?.length) return [];
    return [...stats].sort(
      (a, b) => b.seasonStartYear - a.seasonStartYear || b.winPct - a.winPct
    );
  }, [stats]);

  const [selectedSeason, setSelectedSeason] = useState<string | undefined>(
    DEFAULT_SEASON
  );

  const seasonOptions = useMemo(() => {
    if (!sortedStats.length) return [];
    const unique = Array.from(
      new Set(sortedStats.map((stat) => stat.year).filter(Boolean))
    ) as string[];
    return unique;
  }, [sortedStats]);

  useEffect(() => {
    if (!seasonOptions.length) {
      if (selectedSeason !== undefined) {
        setSelectedSeason(undefined);
      }
      return;
    }

    if (selectedSeason && seasonOptions.includes(selectedSeason)) {
      return;
    }

    if (seasonOptions.includes(DEFAULT_SEASON)) {
      setSelectedSeason(DEFAULT_SEASON);
      return;
    }

    setSelectedSeason(seasonOptions[0]);
  }, [seasonOptions, selectedSeason]);

  const filteredStats = useMemo(() => {
    if (!selectedSeason) return sortedStats;
    return sortedStats.filter((stat) => stat.year === selectedSeason);
  }, [sortedStats, selectedSeason]);

  const hasData = !!sortedStats.length;
  const errorMessage =
    error instanceof Error
      ? error.message
      : error
      ? "Failed to load stats"
      : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <ApiCallPrior loading={isLoading} error={errorMessage} />

        {!isLoading && !error && !hasData && (
          <p className="text-sm text-muted-foreground">
            No historical stats available for this team.
          </p>
        )}

        {!isLoading && !error && hasData && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div>
                <label
                  className="text-sm font-medium"
                  htmlFor="team-stats-season"
                >
                  Season
                </label>
                <select
                  id="team-stats-season"
                  value={selectedSeason ?? ""}
                  onChange={(event) =>
                    setSelectedSeason(event.target.value || undefined)
                  }
                  className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {seasonOptions.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>
              {selectedSeason && (
                <p className="text-sm text-muted-foreground">
                  Showing {selectedSeason} season performance.
                </p>
              )}
            </div>
            <div className="mt-4">
              <TeamStatsTable teamStats={filteredStats} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
