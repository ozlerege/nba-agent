import { getHeadshot } from "@/components/functions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamStaff } from "@/lib/api/types";

export function StaffTable({ staff }: { staff: TeamStaff[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staff.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <img
                src={getHeadshot(member.id)}
                alt={`${member.full_name} headshot`}
                className="rounded-full w-16 h-16 cursor-pointer"
                onClick={() => {
                  window.open(getHeadshot(member.id), "_blank");
                }}
              />
            </TableCell>
            <TableCell>{member.full_name}</TableCell>
            <TableCell>{member.position ?? "—"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
