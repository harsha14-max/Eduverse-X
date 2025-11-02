"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Calendar,
  TrendingUp,
  Send,
  Clock,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const suggestions = [
  {
    id: "1",
    type: "achievement",
    caption: "🎉 Just completed my Machine Learning Specialization on Coursera! Excited to apply these new skills to real-world projects. #MachineLearning #AI #ContinuousLearning",
    timing: "Now",
    engagement: "High",
    platforms: ["LinkedIn", "Twitter"],
  },
  {
    id: "2",
    type: "growth",
    caption: "📊 My portfolio views increased by 34% this week! Grateful for the support and excited to share more projects soon. #Developer #Portfolio #Growth",
    timing: "12 PM (Best Time)",
    engagement: "Very High",
    platforms: ["LinkedIn"],
  },
  {
    id: "3",
    type: "project",
    caption: "🚀 New project alert! Just launched a weather prediction app using React and OpenWeather API. Check it out on GitHub! #React #WebDev #OpenSource",
    timing: "6 PM",
    engagement: "Medium",
    platforms: ["Twitter", "GitHub"],
  },
]

export function AIPostSuggestions() {
  const handlePost = (suggestionId: string) => {
    // In real app, post to selected platforms
    console.log("Posting suggestion:", suggestionId)
  }

  const handleSchedule = (suggestionId: string) => {
    // In real app, schedule post
    console.log("Scheduling suggestion:", suggestionId)
  }

  return (
    <Card className="border-primary/20 bg-primary/5 h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <div className="text-sm font-semibold">AI Post Suggestions</div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border">
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      {/* Caption */}
                      <div className="text-sm text-muted-foreground">
                        {suggestion.caption}
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {suggestion.timing}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <TrendingUp className="h-3 w-3" />
                          {suggestion.engagement} Engagement
                        </div>
                        <div className="flex items-center gap-1">
                          {suggestion.platforms.map((platform, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t border-border">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handlePost(suggestion.id)}
                          className="flex-1 gap-2 text-xs"
                        >
                          <Send className="h-3 w-3" />
                          Post Now
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSchedule(suggestion.id)}
                          className="flex-1 gap-2 text-xs"
                        >
                          <Calendar className="h-3 w-3" />
                          Schedule
                        </Button>
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

