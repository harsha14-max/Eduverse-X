"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, CheckCircle2, Zap, AlertTriangle, TrendingUp } from "lucide-react"

interface SecurityAction {
  id: string
  action: string
  points: number
  timestamp: string
  icon: typeof CheckCircle2
}

const securityActions: SecurityAction[] = [
  {
    id: "1",
    action: "Backed-up key",
    points: 2,
    timestamp: "2 hours ago",
    icon: CheckCircle2,
  },
  {
    id: "2",
    action: "Revoked expired key",
    points: 1,
    timestamp: "1 day ago",
    icon: Zap,
  },
  {
    id: "3",
    action: "Detected leak",
    points: -5,
    timestamp: "3 days ago",
    icon: AlertTriangle,
  },
  {
    id: "4",
    action: "Backed-up key",
    points: 2,
    timestamp: "5 days ago",
    icon: CheckCircle2,
  },
]

function SecurityGamification() {
  const [actions] = useState<SecurityAction[]>(securityActions)
  const totalPoints = actions.reduce((sum, action) => sum + action.points, 0)
  const level = Math.floor(totalPoints / 10) + 1
  const pointsToNextLevel = 10 - (totalPoints % 10)

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Security Gamification</CardTitle>
              <CardDescription className="text-xs">
                Points for security actions: +2 backed-up, +1 revoked expired, -5 detected leak
              </CardDescription>
            </div>
          </div>
          <Badge variant="default" className="text-xs">
            Level {level}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Points & Level */}
        <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Security Points</div>
            <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
          </div>
          <Progress value={(totalPoints % 10) * 10} className="h-2 mb-2" />
          <div className="text-xs text-muted-foreground">
            {pointsToNextLevel} points until Level {level + 1}
          </div>
        </div>

        {/* Recent Actions */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Recent Actions</div>
          {actions.map((action, index) => {
            const Icon = action.icon
            const isPositive = action.points > 0
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 border rounded-lg transition-all ${
                  isPositive
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-red-500/10 border-red-500/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`h-4 w-4 ${isPositive ? "text-green-600" : "text-red-600"}`}
                    />
                    <span className="text-sm font-medium">{action.action}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={isPositive ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {action.points > 0 ? "+" : ""}
                      {action.points} pts
                    </Badge>
                    <span className="text-xs text-muted-foreground">{action.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Rewards Info */}
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-xs text-muted-foreground">
            <div className="font-medium mb-1">How to Earn Points:</div>
            <ul className="space-y-1 list-disc list-inside">
              <li>✅ +2 points: Back up a key to IPFS/Filecoin</li>
              <li>⚡ +1 point: Revoke an expired key</li>
              <li>🚨 -5 points: Security leak detected (automatic)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { SecurityGamification }
