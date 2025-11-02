"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, GraduationCap, Code, TrendingUp, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeedItem {
  id: string
  type: "course" | "project" | "trend" | "achievement"
  title: string
  description: string
  icon: any
  timestamp: string
  action?: string
  color: string
}

export function PersonalizedAIFeed() {
  const feedItems: FeedItem[] = [
    {
      id: "1",
      type: "course",
      title: "AI for Beginners",
      description: "Recommended based on your GitHub projects. 85% match with your interests.",
      icon: GraduationCap,
      timestamp: "2h ago",
      action: "Enroll Now",
      color: "bg-blue-500/10 border-blue-500/20 text-blue-600",
    },
    {
      id: "2",
      type: "project",
      title: "New GitHub Repository Trend",
      description: "React TypeScript projects are trending this week. You have 3 similar projects!",
      icon: Code,
      timestamp: "5h ago",
      action: "View Trends",
      color: "bg-green-500/10 border-green-500/20 text-green-600",
    },
    {
      id: "3",
      type: "achievement",
      title: "Milestone Unlocked!",
      description: "You've completed 12 courses this month. Share your achievement?",
      icon: TrendingUp,
      timestamp: "1d ago",
      action: "Share",
      color: "bg-purple-500/10 border-purple-500/20 text-purple-600",
    },
    {
      id: "4",
      type: "trend",
      title: "Web3 Development Surge",
      description: "Web3 courses increased 200% this week. Would you like recommendations?",
      icon: TrendingUp,
      timestamp: "2d ago",
      action: "Explore",
      color: "bg-orange-500/10 border-orange-500/20 text-orange-600",
    },
  ]

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "course":
        return "Course"
      case "project":
        return "Trend"
      case "trend":
        return "Trend"
      case "achievement":
        return "Achievement"
      default:
        return "Update"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Personalized AI Feed</CardTitle>
            <CardDescription className="text-xs">
              Courses, projects, and AI suggestions
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {feedItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-muted-foreground">
                              {getTypeLabel(item.type)}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      {item.action && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => console.log(`Action: ${item.action}`)}
                          >
                            {item.action}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

