"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  TrendingUp,
  BarChart3,
  Users,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Calculate skill diversity from team members
const teamMembers = [
  { name: "Sara", skills: ["Figma", "UI/UX", "Design Systems"] },
  { name: "Mike", skills: ["React", "TypeScript", "Node.js"] },
  { name: "Riya", skills: ["Python", "ML", "Pandas"] },
  { name: "Alex", skills: ["Next.js", "PostgreSQL", "AWS"] },
]

// Aggregate all skills across team
const allSkills = teamMembers.flatMap((member) => member.skills)
const skillCounts = allSkills.reduce((acc, skill) => {
  acc[skill] = (acc[skill] || 0) + 1
  return acc
}, {} as Record<string, number>)

const skillDiversityData = Object.entries(skillCounts)
  .map(([skill, count]) => ({ skill, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 8)

const diversityMetrics = {
  totalSkills: Object.keys(skillCounts).length,
  uniqueSkills: new Set(allSkills).size,
  coverage: "85%",
  strength: "High",
  recommendation: "Add a DevOps specialist for better infrastructure coverage",
}

export function GrowthInsightsColumn() {
  return (
    <Card className="border-primary/20 bg-primary/5 h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full min-h-0">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <div className="text-sm font-semibold">Growth Insights</div>
          <Badge variant="outline" className="text-xs">Skill Diversity</Badge>
        </div>

        {/* Skill Diversity Chart */}
        <div className="mb-4 flex-1 min-h-0">
          <div className="text-xs font-medium mb-2 text-muted-foreground">Team Skill Distribution</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillDiversityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="skill" 
                  stroke="#64748b" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Diversity Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Card className="border-border">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground mb-1">Total Skills</div>
              <div className="text-lg font-bold text-primary">{diversityMetrics.totalSkills}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground mb-1">Unique Skills</div>
              <div className="text-lg font-bold text-primary">{diversityMetrics.uniqueSkills}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground mb-1">Coverage</div>
              <div className="text-lg font-bold text-primary">{diversityMetrics.coverage}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground mb-1">Strength</div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <div className="text-sm font-bold text-green-600">{diversityMetrics.strength}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendation */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-3">
            <div className="flex items-start gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-primary mt-0.5" />
              <div className="text-xs font-semibold">AI Recommendation</div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-3 w-3 text-yellow-600 mt-0.5" />
              <div className="text-xs text-muted-foreground flex-1">
                {diversityMetrics.recommendation}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skill Categories */}
        <div className="mt-4">
          <div className="text-xs font-medium mb-2 text-muted-foreground">Skill Categories</div>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="text-xs">Frontend (3)</Badge>
            <Badge variant="outline" className="text-xs">Backend (3)</Badge>
            <Badge variant="outline" className="text-xs">Data Science (2)</Badge>
            <Badge variant="outline" className="text-xs">Design (3)</Badge>
            <Badge variant="outline" className="text-xs">Infrastructure (2)</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

