"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamDetail } from "./team-detail";
import { TeamSchedule } from "./team-schedule";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { TeamsApi } from "@/lib/api/endpoints/teams";
import { TeamLogo } from "@/components/ui/team-logo";
import { TeamStats } from "./team-stats";

export function TeamPageSetup() {
  const params = useParams<{ id: string }>();
  const teamId = params?.id ? Number(params.id) : undefined;
  const { data: team } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => TeamsApi.getTeam(Number(teamId)),
    enabled: !!teamId,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
  return (
    <div className="w-full ">
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <TeamLogo size="lg" teamId={teamId ?? 0} />
          <h1 className="text-3xl font-bold">{team?.full_name}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-muted-foreground">
            {team?.city} • {team?.conference} • {team?.division}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-muted-foreground">
            Founded {team?.year_founded} &mdash; {team?.abbreviation}
          </p>
        </div>
      </div>
      <Tabs defaultValue="profile" className="w-full mt-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <TeamDetail teamId={teamId ?? 0} />
        </TabsContent>
        <TabsContent value="schedule">
          <TeamSchedule teamId={teamId ?? 0} />
        </TabsContent>
        <TabsContent value="stats">
          <TeamStats teamId={teamId ?? 0} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
