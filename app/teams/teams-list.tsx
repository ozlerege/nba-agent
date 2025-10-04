"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { ApiCallPrior } from "@/components/ui/apiCallPrior"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TeamsApi } from "@/lib/api/endpoints/teams"
import { Team } from "@/lib/api/types"

import { TeamsTable } from "./teams-table"

export function TeamsList() {
  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: TeamsApi.getTeams,
  })

  const { easternTeams, westernTeams } = useMemo(() => {
    const result = { easternTeams: [] as Team[], westernTeams: [] as Team[] }

    if (!teams) return result

    for (const team of teams ?? []) {
      if (team.conference === "Eastern") {
        result.easternTeams.push(team)
      } else if (team.conference === "Western") {
        result.westernTeams.push(team)
      }
    }

    return result
  }, [teams])

  return (
    <div className="flex flex-col gap-4">
      <ApiCallPrior loading={isLoading} error={error?.message ?? ""} />

      <Card>
        <CardHeader>
          <CardTitle>Western Conference</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamsTable teams={westernTeams} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Eastern Conference</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamsTable teams={easternTeams} />
        </CardContent>
      </Card>
    </div>
  )
}