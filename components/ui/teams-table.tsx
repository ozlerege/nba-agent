import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamLogo } from "@/components/ui/team-logo";
import { Team } from "@/lib/api/types";
import { useRouter } from "next/navigation";

export function TeamsTable({ teams }: { teams: Team[] }) {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Conference</TableHead>
          <TableHead>Division</TableHead>
          <TableHead>Founded</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team) => (
          <TableRow
            key={team.id}
            onClick={() => router.push(`/teams/${team.id}`)}
            className="cursor-pointer"
          >
            <TableCell>
              <TeamLogo teamId={team.id.toString()} />
            </TableCell>
            <TableCell>{team.full_name}</TableCell>
            <TableCell>{team.city}</TableCell>
            <TableCell>{team.conference}</TableCell>
            <TableCell>{team.division}</TableCell>
            <TableCell>{team.year_founded}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
