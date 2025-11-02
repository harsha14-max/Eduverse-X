"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Brain,
  GraduationCap,
  Zap,
  BarChart3,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SkillGrowthData {
  skill: string
  level: number // 0-100
  growth: number // percentage change
  automations: number // number of automations contributing
  courses?: string[]
}

interface SkillGrowthGraphProps {
  skills?: SkillGrowthData[]
}

// Mock data - in production, fetch from Section 7 learning profile
const mockSkillData: SkillGrowthData[] = [
  {
    skill: "Data Analysis",
    level: 85,
    growth: 15,
    automations: 5,
    courses: ["Coursera - Data Science", "Kaggle"],
  },
  {
    skill: "Web Development",
    level: 72,
    growth: 8,
    automations: 3,
    courses: ["Udemy - React"],
  },
  {
    skill: "Machine Learning",
    level: 68,
    growth: 12,
    automations: 4,
    courses: ["Coursera - ML Specialization"],
  },
]

// Generate chart data for skill growth over time
const generateChartData = (skill: string, level: number, growth: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const currentLevel = level
  const startLevel = currentLevel - growth

  return months.map((month, index) => {
    const progress = index / (months.length - 1)
    const level = Math.round(startLevel + (currentLevel - startLevel) * progress)
    return {
      month,
      level,
    }
  })
}

export function SkillGrowthGraph({ skills }: SkillGrowthGraphProps) {
  const skillData = skills || mockSkillData
  const [selectedSkill, setSelectedSkill] = useState<SkillGrowthData | null>(skillData[0] || null)

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="text-sm font-semibold">Skill Growth Graph</div>
              <Badge variant="outline" className="text-xs">
                Section 7 Integration
              </Badge>
            </div>
          </div>

          {/* Skills List */}
          <ScrollArea className="max-h-48">
            <div className="space-y-2">
              {skillData.map((skill) => (
                <div
                  key={skill.skill}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSkill?.skill === skill.skill
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="h-4 w-4 text-primary" />
                      <div className="text-sm font-semibold truncate">{skill.skill}</div>
                      <Badge variant="outline" className="text-xs">
                        {skill.level}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span>+{skill.growth}% growth</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-primary" />
                        <span>{skill.automations} automations</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Growth Chart */}
          {selectedSkill && (
            <motion.div
              key={selectedSkill.skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t border-border"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{selectedSkill.skill} Growth</div>
                  <Badge variant="outline" className="text-xs gap-1">
                    <GraduationCap className="h-3 w-3" />
                    {selectedSkill.courses?.length || 0} courses
                  </Badge>
                </div>
                
                {/* Chart */}
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateChartData(selectedSkill.skill, selectedSkill.level, selectedSkill.growth)}>
                      <defs>
                        <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="month"
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        domain={[0, 100]}
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="level"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorLevel)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Contributing Automations */}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Contributing Automations:</span>
                    <Badge variant="outline" className="text-xs">
                      {selectedSkill.automations} workflows
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3 text-primary" />
                    <span>
                      Automations have contributed to {selectedSkill.growth}% growth in this skill
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

