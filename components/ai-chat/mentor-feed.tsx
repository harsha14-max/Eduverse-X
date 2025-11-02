"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Lightbulb, Target, TrendingUp } from "lucide-react"

interface FeedItem {
  id: string
  type: "suggestion" | "motivation" | "feedback"
  title: string
  message: string
  timestamp: string
  icon: typeof MessageSquare
}

const feedItems: FeedItem[] = [
  {
    id: "1",
    type: "suggestion",
    title: "New Skill Suggestion",
    message: "You posted 2 updates this week — let's improve your engagement with an infographic next time!",
    timestamp: "2 hours ago",
    icon: Lightbulb,
  },
  {
    id: "2",
    type: "motivation",
    title: "Daily Motivation",
    message: "Great progress on your learning journey! You're on track to complete 5 courses this month.",
    timestamp: "1 day ago",
    icon: TrendingUp,
  },
  {
    id: "3",
    type: "feedback",
    title: "Portfolio Feedback",
    message: "Your portfolio could benefit from adding more project details. Consider including tech stack and challenges faced.",
    timestamp: "2 days ago",
    icon: Target,
  },
]

export function MentorFeed() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "suggestion":
        return "bg-blue-50 text-blue-700 border-blue-300"
      case "motivation":
        return "bg-green-50 text-green-700 border-green-300"
      case "feedback":
        return "bg-purple-50 text-purple-700 border-purple-300"
      default:
        return ""
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Mentor Feed</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {feedItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`h-4 w-4 mt-0.5 ${item.type === "suggestion" ? "text-blue-500" : item.type === "motivation" ? "text-green-500" : "text-purple-500"}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold">{item.title}</h4>
                        <Badge variant="outline" className={`text-xs ${getTypeColor(item.type)}`}>
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{item.message}</p>
                      <div className="text-xs text-muted-foreground">{item.timestamp}</div>
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

