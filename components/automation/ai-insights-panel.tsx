"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AIInsight {
  id: string
  type: "pattern" | "recommendation" | "warning" | "success"
  title: string
  description: string
  metric?: string
  trend?: "up" | "down" | "stable"
  action?: string
}

interface AIInsightsPanelProps {
  insights?: AIInsight[]
}

// Generate AI insights based on automation patterns
function generateInsights(): AIInsight[] {
  return [
    {
      id: "1",
      type: "pattern",
      title: "LinkedIn Performance Pattern",
      description: "Your automations involving LinkedIn perform 27% better on weekdays between 10 AM - 2 PM. Consider scheduling more posts during peak hours.",
      metric: "+27% engagement",
      trend: "up",
      action: "Optimize Schedule",
    },
    {
      id: "2",
      type: "recommendation",
      title: "Automation Efficiency",
      description: "Your GitHub sync automations have reduced manual work by 15 hours per week. This is a high-impact automation worth sharing.",
      metric: "15 hrs/week saved",
      trend: "up",
      action: "Share Template",
    },
    {
      id: "3",
      type: "warning",
      title: "API Rate Limit Approaching",
      description: "Your LinkedIn automations are using 85% of your API rate limit. Consider adding delays or upgrading your plan.",
      metric: "85% usage",
      trend: "down",
      action: "Optimize Workflow",
    },
    {
      id: "4",
      type: "success",
      title: "Workflow Reliability",
      description: "Your Slack summary bot has achieved 98% success rate over the last 30 days. Excellent reliability!",
      metric: "98% success rate",
      trend: "up",
      action: "View Details",
    },
  ]
}

export function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  const aiInsights = insights || generateInsights()

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "pattern":
        return <Brain className="h-4 w-4 text-blue-600" />
      case "recommendation":
        return <Sparkles className="h-4 w-4 text-primary" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
    }
  }

  const getInsightColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "pattern":
        return "border-blue-200 bg-blue-50/50"
      case "recommendation":
        return "border-primary/20 bg-primary/5"
      case "warning":
        return "border-yellow-200 bg-yellow-50/50"
      case "success":
        return "border-green-200 bg-green-50/50"
    }
  }

  const getTrendIcon = (trend?: AIInsight["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-600" />
      default:
        return null
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <div className="text-sm font-semibold">AI Insights Panel</div>
              <Badge variant="outline" className="text-xs gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                AI Analysis
              </Badge>
            </div>
          </div>

          {/* Insights List */}
          <ScrollArea className="max-h-96">
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border ${getInsightColor(insight.type)}`}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {getInsightIcon(insight.type)}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate">{insight.title}</div>
                              {insight.metric && (
                                <div className="flex items-center gap-2 mt-1">
                                  {getTrendIcon(insight.trend)}
                                  <Badge variant="outline" className="text-xs">
                                    {insight.metric}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs capitalize shrink-0">
                            {insight.type}
                          </Badge>
                        </div>

                        {/* Description */}
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {insight.description}
                        </div>

                        {/* Action */}
                        {insight.action && (
                          <div className="flex items-center justify-end pt-2 border-t border-border/50">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 text-xs"
                              onClick={() => {
                                // In production, execute the action
                                console.log(`Executing action: ${insight.action}`)
                              }}
                            >
                              {insight.action}
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

