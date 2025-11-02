"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

const skillProgressionData = [
  { month: "Jan", skill: 45 },
  { month: "Feb", skill: 52 },
  { month: "Mar", skill: 58 },
  { month: "Apr", skill: 65 },
  { month: "May", skill: 72 },
  { month: "Jun", skill: 78 },
]

const engagementData = [
  { month: "Jan", engagement: 120 },
  { month: "Feb", engagement: 145 },
  { month: "Mar", engagement: 168 },
  { month: "Apr", engagement: 192 },
  { month: "May", engagement: 210 },
  { month: "Jun", engagement: 245 },
]

const activitySplitData = [
  { name: "Learning", value: 45, color: "#3b82f6" },
  { name: "Posting", value: 30, color: "#10b981" },
  { name: "Automating", value: 25, color: "#f59e0b" },
]

interface GrowthChartsProps {
  type?: "analytics" | "learning"
}

export function GrowthCharts({ type = "analytics" }: GrowthChartsProps) {
  if (type === "learning") {
    return (
      <div className="space-y-4">
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-4">Skill Progression Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={skillProgressionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="skill"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Skill Level"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Engagement Insights */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold mb-4">Engagement Insights</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#10b981"
                strokeWidth={2}
                name="Engagement"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Activity Split */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold mb-4">Activity Split</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activitySplitData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name} ${((entry.percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activitySplitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

