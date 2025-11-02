"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, TrendingUp, Target, BookOpen, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface TimelineEvent {
  id: string
  type: "feedback" | "suggestion" | "achievement" | "goal"
  title: string
  description: string
  timestamp: string
  mentor: "Career Coach" | "Automation Strategist" | "Human Mentor"
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "feedback",
    title: "Portfolio improvement feedback",
    description: "Your portfolio shows strong technical skills. Consider adding more soft skills examples.",
    timestamp: "2 hours ago",
    mentor: "Career Coach",
  },
  {
    id: "2",
    type: "suggestion",
    title: "Weekly reflection recommended",
    description: "Take 15 minutes to reflect on this week's learning progress and set next week's goals.",
    timestamp: "5 hours ago",
    mentor: "Automation Strategist",
  },
  {
    id: "3",
    type: "achievement",
    title: "Goal achieved! 🎉",
    description: "You completed your weekly posting goal. Great consistency!",
    timestamp: "1 day ago",
    mentor: "Career Coach",
  },
  {
    id: "4",
    type: "goal",
    title: "New learning goal set",
    description: "Based on your progress, focus on system design fundamentals next.",
    timestamp: "2 days ago",
    mentor: "Automation Strategist",
  },
  {
    id: "5",
    type: "suggestion",
    title: "Engagement optimization tip",
    description: "Posting on Tuesday mornings shows 18% higher engagement. Try scheduling your next post then.",
    timestamp: "3 days ago",
    mentor: "Career Coach",
  },
]

export function MentorTimeline() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feedback":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "suggestion":
        return <Sparkles className="h-4 w-4 text-purple-600" />
      case "achievement":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "goal":
        return <Target className="h-4 w-4 text-orange-600" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  const getMentorColor = (mentor: string) => {
    switch (mentor) {
      case "Career Coach":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "Automation Strategist":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20"
      case "Human Mentor":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Mentor Timeline</CardTitle>
              <CardDescription className="text-xs">
                Chat + Action feed showing every feedback and suggestion
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border ${getMentorColor(event.mentor)} transition-all hover:shadow-md`}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">
                        {getTypeIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="font-semibold text-sm">{event.title}</div>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {event.type}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {event.description}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {event.mentor}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {event.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

