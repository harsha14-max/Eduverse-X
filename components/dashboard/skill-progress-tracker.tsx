"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Award, TrendingUp, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  progress: number
  level: string
  xp: number
}

interface Badge {
  id: string
  name: string
  icon: string
  earned: boolean
}

export function SkillProgressTracker() {
  const skills: Skill[] = [
    { name: "React", progress: 85, level: "Advanced", xp: 245 },
    { name: "TypeScript", progress: 70, level: "Intermediate", xp: 180 },
    { name: "Python", progress: 60, level: "Intermediate", xp: 150 },
    { name: "Node.js", progress: 55, level: "Intermediate", xp: 135 },
    { name: "AI/ML", progress: 40, level: "Beginner", xp: 95 },
  ]

  const badges: Badge[] = [
    { id: "1", name: "Course Master", icon: "🎓", earned: true },
    { id: "2", name: "Code Warrior", icon: "⚔️", earned: true },
    { id: "3", name: "Streak Champion", icon: "🔥", earned: true },
    { id: "4", name: "Social Butterfly", icon: "🦋", earned: false },
    { id: "5", name: "Automation Pro", icon: "⚙️", earned: false },
  ]

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Skill Progress</CardTitle>
            <CardDescription className="text-xs">
              Track your learning journey
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skills Progress */}
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">({skill.level})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{skill.xp} XP</span>
                  <span className="text-xs font-bold text-primary">{skill.progress}%</span>
                </div>
              </div>
              <Progress value={skill.progress} className="h-2" />
            </motion.div>
          ))}
        </div>

        {/* Level & XP */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-lg font-bold">Level 5</span>
              </div>
              <p className="text-xs text-muted-foreground">1,245 / 2,000 XP</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">62%</div>
              <p className="text-xs text-muted-foreground">to Level 6</p>
            </div>
          </div>
          <Progress value={62} className="h-2" />
        </div>

        {/* Badges */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Recent Badges</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-2 rounded-lg border-2 transition-all ${
                  badge.earned
                    ? "bg-primary/10 border-primary/20 hover:border-primary/40"
                    : "bg-muted/50 border-border opacity-50"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-medium">{badge.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Growth Stats */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Growth This Week</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <div className="text-lg font-bold text-primary">+3</div>
              <p className="text-xs text-muted-foreground">New Skills</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <div className="text-lg font-bold text-primary">+245</div>
              <p className="text-xs text-muted-foreground">XP Gained</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

