import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { TeamStats } from "@/lib/api/types";
import {
  formatPercent,
  formatDecimal,
  formatInteger,
  formatPlusMinus,
  formatPerGame,
} from "@/lib/formatters";

export function TeamStatsTable({ teamStats }: { teamStats: TeamStats[] }) {
  return (
    <div className="rounded-lg border border-border/60">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead>Overall</TableHead>
            <TableHead className="text-right">GP</TableHead>
            <TableHead className="text-right">MIN</TableHead>
            <TableHead className="text-right">PTS</TableHead>
            <TableHead className="text-right">FGM</TableHead>
            <TableHead className="text-right">FGA</TableHead>
            <TableHead className="text-right">FG%</TableHead>
            <TableHead className="text-right">3PM</TableHead>
            <TableHead className="text-right">3PA</TableHead>
            <TableHead className="text-right">3P%</TableHead>
            <TableHead className="text-right">FTM</TableHead>
            <TableHead className="text-right">FTA</TableHead>
            <TableHead className="text-right">FT%</TableHead>
            <TableHead className="text-right">OREB</TableHead>
            <TableHead className="text-right">DREB</TableHead>
            <TableHead className="text-right">REB</TableHead>
            <TableHead className="text-right">AST</TableHead>
            <TableHead className="text-right">TOV</TableHead>
            <TableHead className="text-right">STL</TableHead>
            <TableHead className="text-right">BLK</TableHead>
            <TableHead className="text-right">PF</TableHead>
            <TableHead className="text-right">+/-</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamStats.map((stat, index) => (
            <TableRow key={`${stat.teamId || "team"}-${stat.year || index}`}>
              <TableCell className="font-medium">{stat.year || "—"}</TableCell>
              <TableCell className="text-right">
                {formatInteger(stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatDecimal(stat.min)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.pts, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.fgm, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.fga, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPercent(stat.fgPct)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.fg3m, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.fg3a, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPercent(stat.fg3Pct)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.ftm, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.fta, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPercent(stat.ftPct)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.oreb, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.dreb, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.reb, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.ast, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.tov, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.stl, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.blk, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPerGame(stat.pf, stat.gp)}
              </TableCell>
              <TableCell className="text-right">
                {formatPlusMinus(stat.plusMinus)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
