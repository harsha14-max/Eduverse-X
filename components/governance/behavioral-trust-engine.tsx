"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Shield, Lock } from "lucide-react"

interface TrustAction {
  id: string
  action: string
  impact: number // -10 to +10
  timestamp: string
  category: "security" | "privacy" | "transparency" | "compliance"
}

const trustActions: TrustAction[] = [
  {
    id: "1",
    action: "Backed up keys to IPFS",
    impact: +5,
    timestamp: "2 hours ago",
    category: "security",
  },
  {
    id: "2",
    action: "Enabled privacy mode",
    impact: +3,
    timestamp: "1 day ago",
    category: "privacy",
  },
  {
    id: "3",
    action: "Granted transparent access",
    impact: +2,
    timestamp: "2 days ago",
    category: "transparency",
  },
  {
    id: "4",
    action: "Security leak detected",
    impact: -5,
    timestamp: "3 days ago",
    category: "security",
  },
]

function BehavioralTrustEngine() {
  const [actions] = useState<TrustAction[]>(trustActions)
  const [trustScore, setTrustScore] = useState(85)

  useEffect(() => {
    // Calculate trust score from actions
    const totalImpact = actions.reduce((sum, action) => sum + action.impact, 0)
    const baseScore = 85
    const calculatedScore = Math.max(0, Math.min(100, baseScore + totalImpact))
    setTrustScore(calculatedScore)
  }, [actions])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "security":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      case "privacy":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "transparency":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "compliance":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  const getImpactIcon = (impact: number) => {
    if (impact > 0) {
      return <TrendingUp className="h-4 w-4 text-green-600" />
    } else {
      return <TrendingDown className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* Trust Score */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Trust Score</div>
            <div className="text-2xl font-bold text-primary">{trustScore}/100</div>
          </div>
          <Progress value={trustScore} className="h-2" />
          <div className="text-xs text-muted-foreground mt-2">
            Analyzed from {actions.length} privacy actions
          </div>
        </div>

        {/* Recent Actions */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Recent Privacy Actions</div>
          {actions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 border rounded-lg transition-all ${getCategoryColor(action.category)}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getImpactIcon(action.impact)}
                  <div className="font-semibold text-sm">{action.action}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant={action.impact > 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {action.impact > 0 ? "+" : ""}
                    {action.impact} pts
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {action.category}
                  </Badge>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{action.timestamp}</div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-xs text-muted-foreground">
            Behavioral Trust Engine (BTE) analyzes your privacy actions to generate a Trust Score.
            Positive actions increase your score, negative actions decrease it.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { BehavioralTrustEngine }
