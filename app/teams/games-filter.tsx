import { ApiCallPrior } from "@/components/ui/apiCallPrior";
import { Button } from "@/components/ui/button";
import { SeasonType } from "@/lib/enums";
import { GamesTable } from "./games-table";
import { TeamGameScheduleResponse } from "@/lib/api/types";

export function GamesFilter({
  teamId,
  isLoadingSchedule,
  scheduleError,
  schedule,
  selectedSeason,
  setSelectedSeason,
  selectedMonth,
  setSelectedMonth,
  seasonType,
  setSeasonType,
  monthOptions,
  seasonOptions,
  seasonTypesList,
}: {
  teamId: number;
  isLoadingSchedule: boolean;
  scheduleError: Error | undefined;
  schedule: TeamGameScheduleResponse | undefined;
  selectedSeason: string | undefined;
  setSelectedSeason: (season: string | undefined) => void;
  selectedMonth: number | undefined;
  setSelectedMonth: (month: number | undefined) => void;
  seasonType: SeasonType;
  setSeasonType: (seasonType: SeasonType) => void;
  monthOptions: { value: number; label: string }[];
  seasonOptions: string[];
  seasonTypesList: readonly SeasonType[];
}) {
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-4">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="schedule-season">
            Season
          </label>
          <select
            id="schedule-season"
            value={selectedSeason || ""}
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
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="schedule-month">
            Month
          </label>
          <select
            id="schedule-month"
            value={selectedMonth}
            onChange={(event) =>
              setSelectedMonth(
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All months</option>
            {monthOptions.map((month: { value: number; label: string }) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="schedule-season">
            Season Type
          </label>
          <select
            id="schedule-season"
            value={seasonType}
            onChange={(event) =>
              setSeasonType(event.target.value as SeasonType)
            }
            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {seasonTypesList.map((option: SeasonType) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedSeason(seasonOptions[0]);
              setSelectedMonth(undefined);
              setSeasonType(SeasonType.REGULAR_SEASON);
            }}
            className="w-full"
          >
            Reset filters
          </Button>
        </div>
      </div>

      <ApiCallPrior
        loading={isLoadingSchedule}
        error={scheduleError?.message ?? ""}
      />

      {!isLoadingSchedule && !scheduleError && schedule && (
        <div className="grid gap-4 lg:grid-cols-2 mt-4">
          <GamesTable title="Previous Games" games={schedule.previous} teamId={teamId} />
          <GamesTable title="Upcoming Games" games={schedule.upcoming} teamId={teamId} />
        </div>
      )}
    </div>
  );
}
