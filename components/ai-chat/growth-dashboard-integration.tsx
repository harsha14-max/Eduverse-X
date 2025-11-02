"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, FileText, GraduationCap, Target, MessageSquare } from "lucide-react"
import { GrowthCharts } from "./growth-charts"

interface Metric {
  id: string
  label: string
  value: string | number
  change: number
  icon: typeof TrendingUp
  color: string
}

const metrics: Metric[] = [
  {
    id: "1",
    label: "Total Posts",
    value: 42,
    change: 12,
    icon: FileText,
    color: "text-blue-600",
  },
  {
    id: "2",
    label: "Engagement Rate",
    value: "68%",
    change: 8,
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    id: "3",
    label: "New Followers",
    value: 245,
    change: 15,
    icon: Users,
    color: "text-purple-600",
  },
  {
    id: "4",
    label: "Skill Progress",
    value: "78%",
    change: 5,
    icon: GraduationCap,
    color: "text-orange-600",
  },
  {
    id: "5",
    label: "Courses Completed",
    value: 12,
    change: 3,
    icon: Target,
    color: "text-indigo-600",
  },
  {
    id: "6",
    label: "AI Mentor Feedback",
    value: "8.5/10",
    change: 0.5,
    icon: MessageSquare,
    color: "text-pink-600",
  },
]

export function GrowthDashboardIntegration() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Growth & Identity Analytics</h2>
        <p className="text-muted-foreground">
          Comprehensive overview of your professional growth and engagement metrics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                      <span className="text-xs font-medium text-muted-foreground">
                        {metric.label}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        metric.change > 0
                          ? "bg-green-50 text-green-700 border-green-300"
                          : "bg-red-50 text-red-700 border-red-300"
                      }`}
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <GrowthCharts />

      {/* AI Mentor Feedback Summary */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">AI Mentor Feedback Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border bg-primary/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Overall Performance</span>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                  8.5/10
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Great progress on your learning journey! Continue focusing on practical projects
                and engagement.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Content Quality</span>
                <Badge variant="outline" className="text-xs">
                  9.0/10
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Your posts show strong technical depth and professional presentation.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Learning Consistency</span>
                <Badge variant="outline" className="text-xs">
                  8.0/10
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Maintain your learning streak to maximize growth potential.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

