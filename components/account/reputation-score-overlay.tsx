"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react"

interface Member {
  id: string
  name: string
  email: string
  role: string
  skills: string[]
  reputation: number
  status: string
}

interface ReputationScoreOverlayProps {
  member: Member
}

export function ReputationScoreOverlay({ member }: ReputationScoreOverlayProps) {
  const reputationBreakdown = [
    { label: "Completed Tasks", value: "45", trend: "+12%" },
    { label: "Team Collaborations", value: "18", trend: "+5" },
    { label: "Workflows Published", value: "8", trend: "+3" },
    { label: "Posts Reused", value: "24", trend: "+8" },
  ]

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold mb-2">Reputation Breakdown</div>
      <div className="grid grid-cols-2 gap-2">
        {reputationBreakdown.map((item, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-2">
              <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
              <div className="text-sm font-bold mb-1">{item.value}</div>
              <div className="text-xs text-green-600">{item.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reputation Score */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <div className="text-xs font-semibold">Reputation Score</div>
            </div>
            <div className="text-xl font-bold text-primary">{member.reputation}</div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>High reliability in group tasks</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

