"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Clock, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ForecastedAction {
  id: string
  action: string
  resource: string
  probability: number // 0-100
  basedOn: string
  estimatedTime: string
}

const forecastedActions: ForecastedAction[] = [
  {
    id: "1",
    action: "AI will request Twitter Write Access",
    resource: "Twitter Account",
    probability: 85,
    basedOn: "You post content daily at 9 AM",
    estimatedTime: "Tomorrow 9:00 AM",
  },
  {
    id: "2",
    action: "AI will request Notion Write Access",
    resource: "Notion Workspace",
    probability: 70,
    basedOn: "You update portfolio weekly on Mondays",
    estimatedTime: "Next Monday 10:00 AM",
  },
  {
    id: "3",
    action: "AI will request LinkedIn Write Access",
    resource: "LinkedIn Account",
    probability: 60,
    basedOn: "You post career updates bi-weekly",
    estimatedTime: "In 2 weeks",
  },
]

function AIActionForecaster() {
  const [forecasts] = useState<ForecastedAction[]>(forecastedActions)

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "bg-green-500"
    if (probability >= 50) return "bg-yellow-500"
    return "bg-gray-500"
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Brain className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">AI Action Forecaster</CardTitle>
            <CardDescription className="text-xs">
              Predicts future access needs based on user habits
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Forecasts List */}
        <div className="space-y-3">
          {forecasts.map((forecast, index) => (
            <motion.div
              key={forecast.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border rounded-lg border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm mb-1">{forecast.action}</div>
                  <div className="text-xs text-muted-foreground mb-1">{forecast.resource}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    <span className="font-medium">Based on:</span> {forecast.basedOn}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{forecast.estimatedTime}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground mb-1">Probability</div>
                  <div className="text-lg font-bold text-primary">{forecast.probability}%</div>
                </div>
              </div>
              <Progress
                value={forecast.probability}
                className="h-2 mt-2"
                style={{
                  backgroundColor: `${getProbabilityColor(forecast.probability)}20`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <div className="text-xs text-muted-foreground">
            AI Action Forecaster analyzes your habits and predicts future access needs. Higher
            probability = more likely to happen based on your usage patterns.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { AIActionForecaster }
