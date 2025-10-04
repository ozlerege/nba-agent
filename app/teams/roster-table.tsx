import { formatExperience } from "@/components/functions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamRosterPlayer } from "@/lib/api/types";

export function RosterTable({ roster }: { roster: TeamRosterPlayer[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Height</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Birth Date</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>College</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roster.map((player) => (
          <TableRow key={player.id}>
            <TableCell>{player.full_name}</TableCell>
            <TableCell>{player.number ?? "—"}</TableCell>
            <TableCell>{player.position ?? "—"}</TableCell>
            <TableCell>{player.height ?? "—"}</TableCell>
            <TableCell>{player.weight ?? "—"}</TableCell>
            <TableCell>{player.birth_date ?? "—"}</TableCell>
            <TableCell>{player.age ?? "—"}</TableCell>
            <TableCell>{formatExperience(player.experience)}</TableCell>
            <TableCell>{player.college ?? "—"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
