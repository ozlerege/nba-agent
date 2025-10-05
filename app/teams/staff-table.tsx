import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeadshotImage } from "@/components/ui/headshot-image";
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
              <HeadshotImage
                personId={member.id}
                personName={member.full_name}
                size="md"
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
