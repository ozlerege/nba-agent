import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPercent } from "@/lib/formatters";
import type { TeamStats } from "@/lib/api/types";

interface TeamSummaryCardsProps {
  teamStats: TeamStats[];
}

export function TeamSummaryCards({ teamStats }: TeamSummaryCardsProps) {
  const latestStats = teamStats[0]; // Get the most recent season stats

  if (!latestStats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Record
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {latestStats.wins}-{latestStats.losses}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Win %
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatPercent(latestStats.winPct)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Conf Rank
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{latestStats.confRank}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Div Rank
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{latestStats.divRank}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Playoffs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {latestStats.poWins}-{latestStats.poLosses}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
