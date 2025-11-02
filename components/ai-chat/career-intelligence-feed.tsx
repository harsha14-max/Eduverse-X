"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, GraduationCap, Target, Lightbulb } from "lucide-react"

interface IntelligenceItem {
  id: string
  type: "recommendation" | "suggestion" | "milestone"
  title: string
  description: string
  icon: typeof TrendingUp
  priority: "high" | "medium" | "low"
}

const items: IntelligenceItem[] = [
  {
    id: "1",
    type: "recommendation",
    title: "Advanced AI Course Recommended",
    description: "Based on your learning profile, consider 'Advanced Machine Learning' course",
    icon: GraduationCap,
    priority: "high",
  },
  {
    id: "2",
    type: "suggestion",
    title: "Portfolio Update Suggestion",
    description: "You just built a LangChain bot — add it to your portfolio?",
    icon: Target,
    priority: "medium",
  },
  {
    id: "3",
    type: "milestone",
    title: "Milestone Achieved",
    description: "You've completed 10 courses this month! Keep up the great work.",
    icon: TrendingUp,
    priority: "high",
  },
  {
    id: "4",
    type: "suggestion",
    title: "Skill Gap Detected",
    description: "Consider learning 'Cloud Architecture' to align with your goals",
    icon: Lightbulb,
    priority: "medium",
  },
]

export function CareerIntelligenceFeed() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-300"
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-300"
      case "low":
        return "bg-blue-50 text-blue-700 border-blue-300"
      default:
        return ""
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Career Intelligence Feed</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`h-4 w-4 ${item.priority === "high" ? "text-red-500" : item.priority === "medium" ? "text-yellow-500" : "text-blue-500"} mt-0.5`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold">{item.title}</h4>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

