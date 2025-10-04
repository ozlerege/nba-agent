import { PageHeader } from "@/components/page-header";
import { TeamPageSetup } from "./team-page-setup";

export default function TeamPage() {
  return (
    <>
      <PageHeader title="Team" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex-1 rounded-xl md:min-h-min">
          <TeamPageSetup />
        </div>
      </div>
    </>
  );
}
