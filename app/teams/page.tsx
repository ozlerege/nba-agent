import { PageHeader } from "@/components/page-header";
import { TeamsList } from "./teams-list";

export default function TeamsPage() {
  return (
    <>
      <PageHeader title="Teams" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Teams</h1>
        <div className="flex-1 rounded-xl md:min-h-min">
          <TeamsList />
        </div>
      </div>
    </>
  );
}
