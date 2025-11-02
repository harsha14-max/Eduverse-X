"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Zap, User, MessageSquare } from "lucide-react"

interface MentorAdvice {
  id: string
  mentor: "Career Coach" | "Automation Strategist" | "Human Mentor"
  advice: string
  priority: "high" | "medium" | "low"
}

const mentorAdvice: MentorAdvice[] = [
  {
    id: "1",
    mentor: "Career Coach",
    advice: "Focus on completing your system design course to advance to senior level. Your portfolio is strong but needs more architectural examples.",
    priority: "high",
  },
  {
    id: "2",
    mentor: "Automation Strategist",
    advice: "Your LinkedIn post automation is failing 25% of the time. Consider adding retry logic with exponential backoff to improve reliability.",
    priority: "high",
  },
  {
    id: "3",
    mentor: "Human Mentor",
    advice: "Great progress this week! Keep up the consistent posting. Consider engaging more with comments to build relationships.",
    priority: "medium",
  },
]

export function MentorComparisonWidget() {
  const getMentorIcon = (mentor: string) => {
    switch (mentor) {
      case "Career Coach":
        return <Brain className="h-5 w-5 text-blue-600" />
      case "Automation Strategist":
        return <Zap className="h-5 w-5 text-purple-600" />
      case "Human Mentor":
        return <User className="h-5 w-5 text-green-600" />
      default:
        return <MessageSquare className="h-5 w-5 text-gray-600" />
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
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Mentor Comparison Widget</CardTitle>
            <CardDescription className="text-xs">
              Side-by-side mentor advice (Career Coach vs Automation Strategist vs Human Mentor)
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {mentorAdvice.map((item) => (
              <Card key={item.id} className={`border ${getMentorColor(item.mentor)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0">
                      {getMentorIcon(item.mentor)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="font-semibold text-sm">{item.mentor}</div>
                        <Badge
                          variant={item.priority === "high" ? "destructive" : "outline"}
                          className="text-xs"
                        >
                          {item.priority} priority
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.advice}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

