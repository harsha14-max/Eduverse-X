"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap } from "lucide-react"

interface Skill {
  name: string
  level: number
  trend: "up" | "down" | "stable"
  color: string
}

const skills: Skill[] = [
  { name: "React", level: 85, trend: "up", color: "bg-blue-500" },
  { name: "TypeScript", level: 78, trend: "up", color: "bg-blue-600" },
  { name: "Python", level: 72, trend: "up", color: "bg-green-500" },
  { name: "AI/ML", level: 68, trend: "up", color: "bg-purple-500" },
  { name: "Node.js", level: 65, trend: "stable", color: "bg-green-600" },
  { name: "Cloud", level: 58, trend: "up", color: "bg-yellow-500" },
  { name: "Web3", level: 45, trend: "up", color: "bg-indigo-500" },
  { name: "DevOps", level: 42, trend: "stable", color: "bg-orange-500" },
]

export function SkillHeatmap() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
      default:
        return <Zap className="h-3 w-3 text-gray-600" />
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Skill Heatmap</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Visual representation of your technology skills and improvement
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  {getTrendIcon(skill.trend)}
                </div>
                <Badge variant="outline" className="text-xs">
                  {skill.level}%
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full ${skill.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

