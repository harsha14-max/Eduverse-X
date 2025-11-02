"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Target,
  Sparkles,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"

const skillTreeData = [
  { dimension: "React", value: 85 },
  { dimension: "TypeScript", value: 78 },
  { dimension: "Node.js", value: 72 },
  { dimension: "Python", value: 68 },
  { dimension: "ML", value: 55 },
  { dimension: "AWS", value: 45 },
]

const growthMetrics = [
  { label: "Skills Mastered", value: "12", trend: "+3 this month", icon: Target },
  { label: "Courses Completed", value: "8", trend: "+2 this month", icon: TrendingUp },
  { label: "Projects Published", value: "15", trend: "+4 this month", icon: Brain },
  { label: "Reputation Score", value: "892", trend: "+45 this month", icon: CheckCircle2 },
]

const aiInsights = [
  {
    type: "trending",
    message: "Your React skills improved 8% this month. Consider learning Next.js for full-stack development.",
  },
  {
    type: "recommendation",
    message: "Based on your Python expertise, Machine Learning specialization would complement your skills.",
  },
  {
    type: "gap",
    message: "Skill gap detected: You have Python but not Pandas. Add 'Data Analysis with Pandas' course.",
  },
]

export function GrowthProfileCard() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* AI-Analyzed Skill Tree */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <div className="text-sm font-semibold">AI-Analyzed Skill Tree</div>
            <Badge variant="outline" className="text-xs">Live Analysis</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillTreeData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" stroke="#64748b" fontSize={12} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#64748b" />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-center">
            AI continuously analyzes your skills based on courses, projects, and certifications
          </div>
        </CardContent>
      </Card>

      {/* Growth Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {growthMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-xs text-green-600">{metric.trend}</div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* AI Insights */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <div className="text-sm font-semibold">AI Growth Insights</div>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg bg-background border border-border"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <Badge variant="outline" className="text-xs mb-2">
                      {insight.type === "trending" ? "Trending" : insight.type === "recommendation" ? "Recommendation" : "Gap Detection"}
                    </Badge>
                    <div className="text-sm text-muted-foreground">{insight.message}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    View
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

