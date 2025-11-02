"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface CauseEffect {
  id: string
  cause: string
  effect: string
  metric: string
  value: number
  direction: "up" | "down"
}

const causeEffects: CauseEffect[] = [
  {
    id: "1",
    cause: "3 new posts this week",
    effect: "Follower increase",
    metric: "+12%",
    value: 12,
    direction: "up",
  },
  {
    id: "2",
    cause: "Completed ML course",
    effect: "Skill level boost",
    metric: "+5 points",
    value: 5,
    direction: "up",
  },
  {
    id: "3",
    cause: "Posting on Tuesday morning",
    effect: "Engagement spike",
    metric: "+18%",
    value: 18,
    direction: "up",
  },
  {
    id: "4",
    cause: "Consistent weekly posting",
    effect: "Brand recognition",
    metric: "+25%",
    value: 25,
    direction: "up",
  },
]

export function CauseEffectVisualization() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Cause-Effect Relationships</CardTitle>
        <CardDescription className="text-xs">
          Visualizing connections between actions and outcomes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {causeEffects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex-1">
                <div className="text-sm font-medium mb-1">{item.cause}</div>
                <div className="text-xs text-muted-foreground">{item.effect}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              <div
                className={`flex items-center gap-1 font-bold text-sm ${
                  item.direction === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.direction === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingUp className="h-4 w-4 rotate-180" />
                )}
                {item.metric}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Tooltip Example */}
        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-xs text-muted-foreground mb-1">Example Insight</div>
          <div className="text-sm font-medium">
            "3 new posts this week → +12% follower increase"
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Based on Recharts tooltips showing cause-effect relationships
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
