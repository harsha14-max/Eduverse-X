"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle2, Zap, TrendingUp, Award } from "lucide-react"

interface TimelineEvent {
  id: string
  type: "course" | "automation" | "post" | "achievement" | "sync"
  title: string
  description: string
  timestamp: string
  icon: any
  status: "success" | "pending" | "failed"
}

export function TimelineSection() {
  const events: TimelineEvent[] = [
    {
      id: "1",
      type: "course",
      title: "Completed: React Advanced Patterns",
      description: "Course finished with 95% score",
      timestamp: "2 hours ago",
      icon: CheckCircle2,
      status: "success",
    },
    {
      id: "2",
      type: "automation",
      title: "Portfolio Auto-Update",
      description: "3 new projects synced from GitHub",
      timestamp: "5 hours ago",
      icon: Zap,
      status: "success",
    },
    {
      id: "3",
      type: "post",
      title: "LinkedIn Post Published",
      description: "Weekly learning summary posted",
      timestamp: "1 day ago",
      icon: TrendingUp,
      status: "success",
    },
    {
      id: "4",
      type: "achievement",
      title: "Badge Unlocked: Code Warrior",
      description: "Reached 10 GitHub commits this week",
      timestamp: "2 days ago",
      icon: Award,
      status: "success",
    },
    {
      id: "5",
      type: "sync",
      title: "Coursera Sync",
      description: "Latest course progress updated",
      timestamp: "3 days ago",
      icon: CheckCircle2,
      status: "success",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Recent Activity</CardTitle>
            <CardDescription className="text-xs">
              Timeline of your recent events
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
          
          {/* Events */}
          <div className="space-y-0">
            {events.map((event, index) => {
              const Icon = event.icon
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12 pb-6 last:pb-0"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-3.5 top-1">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)} border-2 border-background`} />
                  </div>

                  {/* Event Content */}
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      event.status === "success" 
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{event.description}</p>
                      <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

