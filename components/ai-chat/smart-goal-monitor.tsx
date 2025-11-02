"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, CheckCircle2, TrendingUp } from "lucide-react"

interface Goal {
  id: string
  title: string
  current: number
  target: number
  unit: string
  color: string
}

const goals: Goal[] = [
  {
    id: "1",
    title: "Weekly Posts",
    current: 3,
    target: 5,
    unit: "posts",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Courses Completed",
    current: 2,
    target: 3,
    unit: "courses",
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Portfolio Updates",
    current: 1,
    target: 2,
    unit: "updates",
    color: "bg-purple-500",
  },
]

export function SmartGoalMonitor() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Smart Goal Monitor</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100
            const isComplete = goal.current >= goal.target

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-primary" />
                    )}
                    <span className="text-sm font-medium">{goal.title}</span>
                  </div>
                  <Badge variant={isComplete ? "default" : "outline"} className="text-xs">
                    {goal.current} / {goal.target} {goal.unit}
                  </Badge>
                </div>
                <Progress
                  value={percentage}
                  className="h-2"
                />
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs text-green-600 font-medium"
                  >
                    ✅ Goal achieved!
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

