import { DataCard } from "@/components/ui/data-card";
import { GamesFilter } from "../games-filter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAvailableSeasons, MONTH_OPTIONS, SEASON_TYPES } from "@/lib/enums";
import { SeasonType } from "@/lib/enums";
import { TeamsApi } from "@/lib/api/endpoints/teams";
const seasonTypesList = SEASON_TYPES;
const monthOptions = MONTH_OPTIONS;
const seasonOptions = getAvailableSeasons();
export function TeamSchedule({ teamId }: { teamId: number }) {
  // Default to current season
  const [selectedSeason, setSelectedSeason] = useState<string | undefined>(
    seasonOptions[0]
  );
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    undefined
  );
  const [seasonType, setSeasonType] = useState<(typeof SEASON_TYPES)[number]>(
    SeasonType.REGULAR_SEASON
  );
  const {
    data: schedule,
    isLoading: isLoadingSchedule,
    error: scheduleError,
  } = useQuery({
    queryKey: ["schedule", teamId, selectedSeason, selectedMonth, seasonType],
    queryFn: () =>
      TeamsApi.getTeamSchedule(Number(teamId), {
        season: selectedSeason,
        month: selectedMonth,
        season_type: seasonType,
      }),
    enabled: !!teamId,
    staleTime: 60 * 1000, // 1 minute to reduce flicker when switching tabs
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
  return (
    <DataCard
      title="Schedule"
      footer={
        <div className="text-xs text-muted-foreground">
          Data provided by NBA.com
        </div>
      }
    >
      <div className="space-y-4">
        <GamesFilter
          teamId={teamId}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          seasonType={seasonType}
          setSeasonType={setSeasonType}
          monthOptions={monthOptions}
          seasonOptions={seasonOptions}
          isLoadingSchedule={isLoadingSchedule}
          scheduleError={scheduleError ?? undefined}
          schedule={schedule}
          seasonTypesList={seasonTypesList}
        />
      </div>
    </DataCard>
  );
}
