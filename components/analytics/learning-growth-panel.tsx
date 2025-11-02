"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  GraduationCap, 
  TrendingUp, 
  Target, 
  Brain,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2
} from "lucide-react"
import {
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

const courseData = [
  { name: "Week 1", difficulty: 2, performance: 75 },
  { name: "Week 2", difficulty: 3, performance: 80 },
  { name: "Week 3", difficulty: 4, performance: 85 },
  { name: "Week 4", difficulty: 3, performance: 90 },
  { name: "Week 5", difficulty: 5, performance: 88 },
  { name: "Week 6", difficulty: 4, performance: 92 },
]

const consistencyData = [
  { subject: "Focus", A: 85, fullMark: 100 },
  { subject: "Diversity", A: 75, fullMark: 100 },
  { subject: "Completion", A: 90, fullMark: 100 },
  { subject: "Consistency", A: 88, fullMark: 100 },
  { subject: "Depth", A: 82, fullMark: 100 },
]

const predictionData = [
  { week: "Current", hours: 12 },
  { week: "Week 1", hours: 15 },
  { week: "Week 2", hours: 18 },
  { week: "Week 3", hours: 20 },
  { week: "Week 4", hours: 22 },
]

export function LearningGrowthPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<"impact" | "consistency" | "prediction">("impact")

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Learning & Growth</CardTitle>
              <CardDescription className="text-xs">
                Course impact, consistency radar, and AI predictions
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
          {/* Metric Selector */}
          <div className="flex gap-2">
            <Button
              variant={selectedMetric === "impact" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric("impact")}
            >
              Course Impact
            </Button>
            <Button
              variant={selectedMetric === "consistency" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric("consistency")}
            >
              Consistency Radar
            </Button>
            <Button
              variant={selectedMetric === "prediction" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric("prediction")}
            >
              AI Prediction
            </Button>
          </div>

          {/* Course Impact Meter */}
          {selectedMetric === "impact" && (
            <motion.div
              key="impact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Course Impact Meter
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Correlates course difficulty vs performance over time
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={courseData}>
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
                      <Area
                        type="monotone"
                        dataKey="difficulty"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.2}
                        name="Difficulty"
                      />
                      <Area
                        type="monotone"
                        dataKey="performance"
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.2}
                        name="Performance"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="flex-1 p-3 rounded-lg bg-muted/50">
                    <div className="font-semibold text-primary">92%</div>
                    <div className="text-xs text-muted-foreground">Avg Performance</div>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-muted/50">
                    <div className="font-semibold text-primary">3.5/5</div>
                    <div className="text-xs text-muted-foreground">Avg Difficulty</div>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-muted/50">
                    <div className="font-semibold text-primary">+15%</div>
                    <div className="text-xs text-muted-foreground">Growth Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Learning Consistency Radar */}
          {selectedMetric === "consistency" && (
            <motion.div
              key="consistency"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  Learning Consistency Radar
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Spider chart comparing daily focus, topic diversity, and completion rate
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={consistencyData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: "#64748b", fontSize: 10 }}
                      />
                      <Radar
                        name="Consistency"
                        dataKey="A"
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.3}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-xs text-muted-foreground">
                    <strong>Insight:</strong> Your focus and completion rates are consistently high (85%+). 
                    Consider diversifying topics to broaden your skill set.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Prediction Overlay */}
          {selectedMetric === "prediction" && (
            <motion.div
              key="prediction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  AI Prediction Overlay
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Shows where AI thinks you will reach next week/month
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ fill: "#2563eb", r: 4 }}
                      />
                      <ReferenceLine x="Current" stroke="#ef4444" strokeDasharray="3 3" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-xs text-muted-foreground">
                    <strong>AI Prediction:</strong> Based on your current learning pace, you're projected to 
                    reach 22 hours/week by Week 4. Keep your current consistency to achieve this milestone! 🎯
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

