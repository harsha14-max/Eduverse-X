"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Network, 
  Clock, 
  Shield,
  ChevronDown,
  ChevronUp,
  Maximize2,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts"
import { Badge } from "@/components/ui/badge"

const dependencyData = [
  { name: "Portfolio Sync", connections: 3, success: 45, failed: 2 },
  { name: "Social Post", connections: 5, success: 38, failed: 1 },
  { name: "Learning Track", connections: 2, success: 28, failed: 0 },
  { name: "Certificate Upload", connections: 1, success: 12, failed: 0 },
]

const timelineData = [
  { day: "Mon", hour: 0, value: 0 },
  { day: "Mon", hour: 1, value: 0 },
  { day: "Mon", hour: 8, value: 2 },
  { day: "Mon", hour: 12, value: 5 },
  { day: "Mon", hour: 18, value: 3 },
  { day: "Tue", hour: 8, value: 1 },
  { day: "Tue", hour: 12, value: 4 },
  { day: "Tue", hour: 18, value: 2 },
  { day: "Wed", hour: 8, value: 3 },
  { day: "Wed", hour: 12, value: 6 },
  { day: "Wed", hour: 18, value: 4 },
  { day: "Thu", hour: 8, value: 2 },
  { day: "Thu", hour: 12, value: 5 },
  { day: "Thu", hour: 18, value: 3 },
  { day: "Fri", hour: 8, value: 1 },
  { day: "Fri", hour: 12, value: 4 },
  { day: "Fri", hour: 18, value: 2 },
]

const confidenceData = [
  { automation: "Post Creation", confidence: 92, success: 95 },
  { automation: "GitHub Sync", confidence: 88, success: 98 },
  { automation: "Learning Track", confidence: 85, success: 100 },
  { automation: "Portfolio Update", confidence: 90, success: 97 },
]

const getHeatmapColor = (value: number) => {
  if (value === 0) return "#e2e8f0"
  if (value <= 2) return "#93c5fd"
  if (value <= 4) return "#60a5fa"
  if (value <= 6) return "#3b82f6"
  return "#2563eb"
}

export function AutomationWorkflowPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedView, setSelectedView] = useState<"dependency" | "timeline" | "confidence" | "failures">("dependency")

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Automation & Workflow</CardTitle>
              <CardDescription className="text-xs">
                Dependency graph, execution timeline, AI confidence, and failure analysis
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="space-y-6">
          {/* View Selector */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedView === "dependency" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("dependency")}
              className="gap-2"
            >
              <Network className="h-3 w-3" />
              Dependencies
            </Button>
            <Button
              variant={selectedView === "timeline" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("timeline")}
              className="gap-2"
            >
              <Clock className="h-3 w-3" />
              Timeline
            </Button>
            <Button
              variant={selectedView === "confidence" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("confidence")}
              className="gap-2"
            >
              <Shield className="h-3 w-3" />
              AI Confidence
            </Button>
            <Button
              variant={selectedView === "failures" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("failures")}
              className="gap-2"
            >
              <AlertCircle className="h-3 w-3" />
              Failures
            </Button>
          </div>

          {/* Automation Dependency Graph */}
          {selectedView === "dependency" && (
            <motion.div
              key="dependency"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Network className="h-4 w-4 text-purple-600" />
                  Automation Dependency Graph
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Shows how workflows are interconnected
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={dependencyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="connections" fill="#a855f7" radius={[4, 4, 0, 0]} name="Connections" />
                      <Line
                        type="monotone"
                        dataKey="success"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ fill: "#2563eb", r: 4 }}
                        name="Success"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {dependencyData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {item.connections} connections
                        </Badge>
                        <Badge variant="outline" className="text-xs text-green-600">
                          {item.success} success
                        </Badge>
                        {item.failed > 0 && (
                          <Badge variant="outline" className="text-xs text-red-600">
                            {item.failed} failed
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Execution Timeline Heatmap */}
          {selectedView === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  Execution Timeline Heatmap
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Timeline colored by execution success/failure ratio
                </p>
                <div className="h-64 overflow-auto">
                  <div className="grid grid-cols-7 gap-1 min-w-[600px]">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="space-y-1">
                        <div className="text-xs font-medium text-center mb-2">{day}</div>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                          const dataPoint = timelineData.find(
                            (d) => d.day === day && d.hour === hour
                          )
                          const value = dataPoint?.value || 0
                          return (
                            <div
                              key={`${day}-${hour}`}
                              className="w-full h-3 rounded border border-border"
                              style={{
                                backgroundColor: getHeatmapColor(value),
                              }}
                              title={`${day} ${hour}:00 - ${value} executions`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gray-200" />
                    <span>0 executions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-300" />
                    <span>1-2 executions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500" />
                    <span>3-4 executions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-700" />
                    <span>5+ executions</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Confidence Meter */}
          {selectedView === "confidence" && (
            <motion.div
              key="confidence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  AI Confidence Meter
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Gauges how certain the AI was before triggering an automation
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={confidenceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={12} />
                      <YAxis dataKey="automation" type="category" stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="confidence" fill="#a855f7" radius={[0, 4, 4, 0]} name="AI Confidence" />
                      <Bar dataKey="success" fill="#10b981" radius={[0, 4, 4, 0]} name="Success Rate" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {confidenceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{item.automation}</div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Confidence: {item.confidence}%</span>
                          <span>Success: {item.success}%</span>
                        </div>
                      </div>
                      <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-green-500"
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Failure Root Cause Cards */}
          {selectedView === "failures" && (
            <motion.div
              key="failures"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-purple-600" />
                  Failure Root Cause Cards
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  AI-generated summaries of automation failures
                </p>
                <div className="space-y-3">
                  {[
                    {
                      automation: "LinkedIn Post Automation",
                      timestamp: "2 hours ago",
                      reason: "API rate limit exceeded",
                      solution: "Retry after 15 minutes or use queue system",
                      status: "resolved",
                    },
                    {
                      automation: "GitHub Repo Sync",
                      timestamp: "1 day ago",
                      reason: "Authentication token expired",
                      solution: "Refresh OAuth token in settings",
                      status: "pending",
                    },
                  ].map((failure, index) => (
                    <Card key={index} className="border-red-200 bg-red-50/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-sm mb-1">{failure.automation}</div>
                            <div className="text-xs text-muted-foreground">{failure.timestamp}</div>
                          </div>
                          <Badge
                            variant={failure.status === "resolved" ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {failure.status === "resolved" ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {failure.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 mt-3">
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-1">Reason:</div>
                            <div className="text-sm">{failure.reason}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-1">AI Solution:</div>
                            <div className="text-sm">{failure.solution}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

