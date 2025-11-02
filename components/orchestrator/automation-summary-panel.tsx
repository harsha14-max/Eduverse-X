"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Play,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Settings,
  TrendingUp,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Workflow {
  id: string
  name: string
  status: "running" | "queued" | "failed" | "paused"
  nextTrigger: string
  lastRun: string
  successRate: number
  aiRecommendation?: string
}

const workflows: Workflow[] = [
  {
    id: "1",
    name: "Post Scheduling",
    status: "running",
    nextTrigger: "2 hours",
    lastRun: "1 hour ago",
    successRate: 95,
    aiRecommendation: "Optimize timing for better engagement",
  },
  {
    id: "2",
    name: "Portfolio Sync",
    status: "running",
    nextTrigger: "30 minutes",
    lastRun: "5 minutes ago",
    successRate: 98,
  },
  {
    id: "3",
    name: "Skill Tracking",
    status: "queued",
    nextTrigger: "1 hour",
    lastRun: "3 hours ago",
    successRate: 92,
    aiRecommendation: "Add GitHub integration for better tracking",
  },
  {
    id: "4",
    name: "LinkedIn Auto Post",
    status: "failed",
    nextTrigger: "Retry in 15 min",
    lastRun: "10 minutes ago",
    successRate: 75,
    aiRecommendation: "Check API credentials",
  },
  {
    id: "5",
    name: "Course Progress Tracker",
    status: "running",
    nextTrigger: "6 hours",
    lastRun: "2 hours ago",
    successRate: 88,
  },
  {
    id: "6",
    name: "Social Engagement Monitor",
    status: "paused",
    nextTrigger: "Paused",
    lastRun: "1 day ago",
    successRate: 90,
  },
]

export function AutomationSummaryPanel() {
  const [runningWorkflows, setRunningWorkflows] = useState<Set<string>>(new Set(["1", "2", "5"]))

  const handleRunNow = (workflowId: string) => {
    // Frontend-only: simulate running workflow
    console.log(`Running workflow: ${workflowId}`)
    // In real app, this would trigger backend API call
  }

  const handleOptimize = (workflowId: string) => {
    // Frontend-only: simulate AI optimization
    console.log(`Optimizing workflow: ${workflowId}`)
    // In real app, this would open optimization modal
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "queued":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "paused":
        return <AlertCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "queued":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "failed":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      case "paused":
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return "text-green-600"
    if (rate >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Automation Summary</CardTitle>
              <CardDescription className="text-xs">
                All active n8n workflows and automations
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {workflows.filter((w) => w.status === "running").length} Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {workflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`border-2 ${getStatusColor(workflow.status)} transition-all hover:shadow-md`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {getStatusIcon(workflow.status)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-semibold text-sm truncate">{workflow.name}</div>
                            <Badge variant="outline" className="text-xs shrink-0">
                              {workflow.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Next: {workflow.nextTrigger}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              <span className={getSuccessRateColor(workflow.successRate)}>
                                {workflow.successRate}% success
                              </span>
                            </div>
                          </div>
                          {workflow.aiRecommendation && (
                            <div className="flex items-start gap-2 mt-2 p-2 bg-blue-500/10 rounded-md border border-blue-500/20">
                              <Sparkles className="h-3 w-3 text-blue-600 shrink-0 mt-0.5" />
                              <span className="text-xs text-blue-700">{workflow.aiRecommendation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs gap-1"
                                onClick={() => handleRunNow(workflow.id)}
                                disabled={workflow.status === "paused"}
                              >
                                <Play className="h-3 w-3" />
                                Run Now
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Manually trigger this workflow</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-3 text-xs gap-1"
                                onClick={() => handleOptimize(workflow.id)}
                              >
                                <Sparkles className="h-3 w-3" />
                                Optimize
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>AI optimization suggestions</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
