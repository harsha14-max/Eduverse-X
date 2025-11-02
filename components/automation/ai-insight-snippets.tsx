"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface WorkflowInsight {
  id: string
  workflowName: string
  insight: string
  metric?: string
  trend?: "up" | "down" | "stable"
}

// Enhanced insights with engagement metrics and AI-generated summaries
const insights: Record<string, WorkflowInsight> = {
  "linkedin-poster": {
    id: "linkedin-poster",
    workflowName: "LinkedIn Auto Poster",
    insight: "This automation helped you gain 12 LinkedIn interactions last week (+25% engagement). Posts perform best on weekdays between 10 AM - 2 PM. Consider scheduling more posts during peak hours.",
    metric: "+12 interactions",
    trend: "up",
  },
  "github-sync": {
    id: "github-sync",
    workflowName: "GitHub Sync",
    insight: "Workflow reliability improved 8% this month. Running smoothly with 98% success rate. This automation has synced 45 commits this week. Consider adding error notifications for failed syncs.",
    metric: "98% success rate",
    trend: "up",
  },
  "slack-bot": {
    id: "slack-bot",
    workflowName: "Slack Summary Bot",
    insight: "Average execution time reduced by 2 seconds this week. This automation saves you approximately 30 minutes per week and has sent 28 summaries to your team channels.",
    metric: "2.3s avg",
    trend: "up",
  },
  "course-tracker": {
    id: "course-tracker",
    workflowName: "Course Progress Tracker",
    insight: "3 failed runs detected in the last 7 days - API key may need refresh. Last successful run: 2 days ago. This workflow tracked 15 course modules before the issue occurred.",
    metric: "Needs attention",
    trend: "down",
  },
}

interface AIInsightSnippetsProps {
  workflowId: string
}

export function AIInsightSnippets({ workflowId }: AIInsightSnippetsProps) {
  const insight = insights[workflowId]

  if (!insight) return null

  const getTrendIcon = () => {
    switch (insight.trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <AlertCircle className="h-3 w-3 text-red-600" />
      default:
        return <CheckCircle2 className="h-3 w-3 text-blue-600" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute left-full ml-2 top-0 z-50 w-72"
    >
      <Card className="border-primary/20 bg-primary/5 shadow-xl">
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-xs font-semibold">{insight.workflowName}</div>
                <Badge variant="outline" className="text-xs gap-1">
                  <Sparkles className="h-2 w-2 text-primary" />
                  AI Insight
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-2">
                {insight.insight}
              </div>
              {insight.metric && (
                <div className="flex items-center gap-2">
                  {getTrendIcon()}
                  <Badge 
                    variant={insight.trend === "up" ? "default" : insight.trend === "down" ? "destructive" : "outline"} 
                    className="text-xs"
                  >
                    {insight.metric}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

