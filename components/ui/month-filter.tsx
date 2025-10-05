interface MonthFilterProps {
  selectedMonth: number | undefined;
  setSelectedMonth: (month: number | undefined) => void;
  monthOptions: { value: number; label: string }[];
  label?: string;
  id?: string;
  className?: string;
}

export function MonthFilter({
  selectedMonth,
  setSelectedMonth,
  monthOptions,
  label = "Month",
  id = "month-filter",
  className = "",
}: MonthFilterProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={selectedMonth || ""}
        onChange={(event) =>
          setSelectedMonth(
            event.target.value ? Number(event.target.value) : undefined
          )
        }
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">All months</option>
        {monthOptions.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
}
