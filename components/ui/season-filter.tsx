interface SeasonFilterProps {
  selectedSeason: string | undefined;
  setSelectedSeason: (season: string | undefined) => void;
  seasonOptions: string[];
  label?: string;
  id?: string;
  className?: string;
  showReset?: boolean;
  onReset?: () => void;
}

export function SeasonFilter({
  selectedSeason,
  setSelectedSeason,
  seasonOptions,
  label = "Season",
  id = "season-filter",
  className = "",
  showReset = false,
  onReset,
}: SeasonFilterProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <div className="flex gap-2">
        <select
          id={id}
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
        {showReset && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
