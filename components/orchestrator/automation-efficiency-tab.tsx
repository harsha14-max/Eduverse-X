"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, TrendingUp, Clock, AlertTriangle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const successRateData = [
  { workflow: "Post Scheduling", success: 95, failures: 5 },
  { workflow: "Portfolio Sync", success: 98, failures: 2 },
  { workflow: "Skill Tracking", success: 92, failures: 8 },
  { workflow: "LinkedIn Auto Post", success: 75, failures: 25 },
]

const optimizableFlows = [
  {
    id: "1",
    name: "LinkedIn Auto Post",
    issue: "High failure rate due to API rate limits",
    potential: "Add retry logic with exponential backoff",
    impact: "high",
  },
  {
    id: "2",
    name: "Portfolio Sync",
    issue: "Slow execution time",
    potential: "Batch API calls to reduce execution time by 40%",
    impact: "medium",
  },
]

export function AutomationEfficiencyTab() {
  const avgSuccessRate = 90
  const avgTimeSaved = 42 // hours per month
  const totalExecutions = 1248

  return (
    <div className="space-y-6">
      {/* Success/Failure Rates */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Success/Failure Rates</CardTitle>
          <CardDescription className="text-xs">
            Workflow execution success rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={successRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="workflow" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="success" fill="#22c55e" name="Success %" />
              <Bar dataKey="failures" fill="#ef4444" name="Failures %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Average Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div className="text-xs text-muted-foreground">Avg Success Rate</div>
            </div>
            <div className="text-2xl font-bold text-green-600">{avgSuccessRate}%</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <div className="text-xs text-muted-foreground">Time Saved</div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{avgTimeSaved}h</div>
            <div className="text-xs text-muted-foreground">per month</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-purple-600" />
              <div className="text-xs text-muted-foreground">Total Executions</div>
            </div>
            <div className="text-2xl font-bold text-purple-600">{totalExecutions}</div>
            <div className="text-xs text-muted-foreground">this month</div>
          </CardContent>
        </Card>
      </div>

      {/* Optimizable Flows */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Optimizable Flows</CardTitle>
          <CardDescription className="text-xs">
            Workflows highlighted by AI for optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {optimizableFlows.map((flow) => (
              <div
                key={flow.id}
                className={`p-3 rounded-lg border ${
                  flow.impact === "high"
                    ? "bg-red-500/10 border-red-500/20"
                    : "bg-yellow-500/10 border-yellow-500/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="font-semibold text-sm">{flow.name}</div>
                  <Badge variant="outline" className="text-xs">
                    {flow.impact} priority
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  <div className="font-medium mb-1">Issue: {flow.issue}</div>
                  <div>Potential: {flow.potential}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

