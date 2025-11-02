"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Target,
  ChevronRight,
  Sparkles,
  Brain,
} from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"
import { SkillInsights } from "./skill-insights"

const skillData = [
  { skill: "React", value: 85, level: "Expert", color: "#2563eb" },
  { skill: "TypeScript", value: 78, level: "Advanced", color: "#3b82f6" },
  { skill: "Node.js", value: 72, level: "Advanced", color: "#60a5fa" },
  { skill: "Python", value: 68, level: "Intermediate", color: "#93c5fd" },
  { skill: "Machine Learning", value: 55, level: "Intermediate", color: "#10b981" },
  { skill: "AWS", value: 45, level: "Beginner", color: "#f59e0b" },
]

const radarData = [
  { dimension: "Focus", value: 85 },
  { dimension: "Diversity", value: 72 },
  { dimension: "Completion", value: 88 },
  { dimension: "Consistency", value: 80 },
  { dimension: "Depth", value: 75 },
]

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#10b981", "#f59e0b"]

export function SkillGraph() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"bar" | "radar">("bar")

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill === selectedSkill ? null : skill)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-green-500"
      case "Advanced":
        return "bg-blue-500"
      case "Intermediate":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Skill Graph & Learning Summary</CardTitle>
              <CardDescription className="text-xs">
                Interactive skill visualization and AI insights
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("bar")}
            >
              Bar
            </Button>
            <Button
              variant={viewMode === "radar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("radar")}
            >
              Radar
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Skill Visualization */}
        <div>
          {viewMode === "bar" ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillData}>
                  <XAxis dataKey="skill" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {skillData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
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
          )}
        </div>

        {/* Skill List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Skill Levels</div>
            <div className="text-xs text-muted-foreground">
              Click on a skill to see related courses & projects
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skillData.map((skill, index) => (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedSkill === skill.skill ? "border-primary border-2" : "border-border"
                  }`}
                  onClick={() => handleSkillClick(skill.skill)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getLevelColor(skill.level)}`} />
                        <span className="font-semibold text-sm">{skill.skill}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.value}%` }}
                          transition={{ delay: index * 0.1, duration: 1 }}
                          className={`h-full rounded-full`}
                          style={{ backgroundColor: skill.color }}
                        />
                      </div>
                      <span className="text-xs font-medium text-primary w-12 text-right">
                        {skill.value}%
                      </span>
                    </div>
                    {selectedSkill === skill.skill && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-border space-y-2"
                      >
                        <div className="text-xs font-medium text-muted-foreground">
                          Related Resources:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                            <ChevronRight className="h-3 w-3 mr-1" />
                            Related Courses (3)
                          </Badge>
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                            <ChevronRight className="h-3 w-3 mr-1" />
                            Related Projects (2)
                          </Badge>
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                            <ChevronRight className="h-3 w-3 mr-1" />
                            Certifications (1)
                          </Badge>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <SkillInsights />
      </CardContent>
    </Card>
  )
}

