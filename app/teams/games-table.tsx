import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { TeamGame } from "@/lib/api/types";
import { TeamLogo } from "./team-logo";

interface GamesTableProps {
  title: string;
  games: TeamGame[];
  teamId: number;
}

export function GamesTable({ title, games, teamId }: GamesTableProps) {
  if (games.length === 0) {
    return (
      <EmptyState
        title={title}
        message="No games found for the selected filters."
      />
    );
  }

  return (
    <div className="rounded-lg border p-4 text-sm text-muted-foreground space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Matchup</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{game.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {game.is_home ? (
                    game.opponent_team_id ? (
                      <TeamLogo
                        teamId={game.opponent_team_id}
                        size="sm"
                        className="shrink-0"
                      />
                    ) : null
                  ) : (
                    <TeamLogo teamId={teamId} size="sm" className="shrink-0" />
                  )}

                  <span className="tabular-nums whitespace-nowrap">
                    {game.matchup ?? "Unknown"}
                  </span>

                  {game.is_home ? (
                    <TeamLogo teamId={teamId} size="sm" className="shrink-0" />
                  ) : game.opponent_team_id ? (
                    <TeamLogo
                      teamId={game.opponent_team_id}
                      size="sm"
                      className="shrink-0"
                    />
                  ) : null}
                </div>
              </TableCell>
              <TableCell>{game.is_home ? "Home" : "Away"}</TableCell>
              <TableCell>
                {game.team_score !== null && game.opponent_score !== null
                  ? `${game.team_score} - ${game.opponent_score}`
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
