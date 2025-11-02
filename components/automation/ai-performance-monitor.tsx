"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTiming } from "@/lib/hooks/useTiming"
import { INTERVALS, TimingPriority } from "@/lib/timing-constants"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react"

interface AutomationMetrics {
  avgExecutionTime: number // in seconds
  successRate: number // percentage
  topApps: Array<{ name: string; count: number }>
}

interface AIPerformanceMonitorProps {
  className?: string
}

// Mock metrics - in production, this would fetch from analytics API
function getMockMetrics(): AutomationMetrics {
  return {
    avgExecutionTime: 2.3,
    successRate: 94,
    topApps: [
      { name: "LinkedIn", count: 45 },
      { name: "GitHub", count: 32 },
      { name: "Slack", count: 28 },
    ],
  }
}

export function AIPerformanceMonitor({ className }: AIPerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<AutomationMetrics>(getMockMetrics())
  const [isExpanded, setIsExpanded] = useState(false)

  // Simulate real-time updates using centralized timing
  const { interval } = useTiming()

  useEffect(() => {
    const taskId = interval(
      () => {
        // Simulate minor fluctuations
        setMetrics((prev) => ({
          ...prev,
          avgExecutionTime: Math.max(1.8, Math.min(3.0, prev.avgExecutionTime + (Math.random() - 0.5) * 0.2)),
          successRate: Math.max(90, Math.min(98, prev.successRate + (Math.random() - 0.5) * 2)),
        }))
      },
      INTERVALS.AI_METRICS_REFRESH,
      { priority: TimingPriority.MEDIUM }
    )

    return () => {
      // Cleanup handled by useTiming hook
    }
  }, [interval])

  const getStatusColor = (value: number, threshold: { good: number; medium: number }) => {
    if (value >= threshold.good) return "text-green-600"
    if (value >= threshold.medium) return "text-yellow-600"
    return "text-red-600"
  }

  const getSuccessRateColor = () => getStatusColor(metrics.successRate, { good: 95, medium: 85 })
  const getExecutionTimeColor = () => getStatusColor(metrics.avgExecutionTime, { good: 2, medium: 3 })

  const getStatusBadge = () => {
    if (metrics.successRate >= 95 && metrics.avgExecutionTime <= 2.5) {
      return (
        <Badge variant="outline" className="text-xs gap-1 bg-green-100 text-green-700 border-green-300">
          <CheckCircle2 className="h-3 w-3" />
          Excellent
        </Badge>
      )
    }
    if (metrics.successRate >= 85 && metrics.avgExecutionTime <= 3.5) {
      return (
        <Badge variant="outline" className="text-xs gap-1 bg-yellow-100 text-yellow-700 border-yellow-300">
          <AlertCircle className="h-3 w-3" />
          Good
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="text-xs gap-1 bg-red-100 text-red-700 border-red-300">
        <AlertCircle className="h-3 w-3" />
        Needs Attention
      </Badge>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card className="border-border shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setIsExpanded(!isExpanded)}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-3">
            {/* Compact View */}
            {!isExpanded && (
              <>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <BarChart3 className="h-4 w-4 text-primary shrink-0" />
                  <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-1 min-w-0">
                      <Clock className={`h-3 w-3 ${getExecutionTimeColor()}`} />
                      <span className={`text-xs font-semibold ${getExecutionTimeColor()}`}>
                        {metrics.avgExecutionTime.toFixed(1)}s
                      </span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <CheckCircle2 className={`h-3 w-3 ${getSuccessRateColor()}`} />
                      <span className={`text-xs font-semibold ${getSuccessRateColor()}`}>
                        {Math.round(metrics.successRate)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <Zap className="h-3 w-3 text-primary" />
                      <span className="text-xs text-muted-foreground truncate">
                        {metrics.topApps[0]?.name || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                {getStatusBadge()}
              </>
            )}

            {/* Expanded View */}
            {isExpanded && (
              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <div className="text-sm font-semibold">AI Performance Monitor</div>
                  </div>
                  {getStatusBadge()}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Average Execution Time */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Avg Execution Time</span>
                    </div>
                    <div className={`text-lg font-bold ${getExecutionTimeColor()}`}>
                      {metrics.avgExecutionTime.toFixed(1)}s
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {metrics.avgExecutionTime <= 2.5 ? (
                        <TrendingDown className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingUp className="h-3 w-3 text-yellow-600" />
                      )}
                      <span className="text-muted-foreground">
                        {metrics.avgExecutionTime <= 2.5 ? "Fast" : "Normal"}
                      </span>
                    </div>
                  </div>

                  {/* Success Rate */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Success Rate</span>
                    </div>
                    <div className={`text-lg font-bold ${getSuccessRateColor()}`}>
                      {Math.round(metrics.successRate)}%
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {metrics.successRate >= 95 ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-yellow-600" />
                      )}
                      <span className="text-muted-foreground">
                        {metrics.successRate >= 95 ? "Excellent" : "Good"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top 3 Used Apps */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="text-xs font-semibold">Top 3 Used Apps</div>
                  <div className="space-y-1">
                    {metrics.topApps.map((app, index) => (
                      <div key={app.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            index === 0 ? "bg-green-500" :
                            index === 1 ? "bg-yellow-500" : "bg-blue-500"
                          }`} />
                          <span>{app.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {app.count} runs
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
