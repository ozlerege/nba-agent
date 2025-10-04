import { PageHeader } from "@/components/page-header";

export default function PlayersPage() {
  return (
    <>
      <PageHeader title="Players" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Players</h1>
        <div className="flex-1 rounded-xl md:min-h-min" />
      </div>
    </>
  );
}
