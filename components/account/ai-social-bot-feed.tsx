"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Send,
  Calendar,
  TrendingUp,
  Linkedin,
  Twitter,
  CheckCircle2,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const postDrafts = [
  {
    id: "1",
    platform: "LinkedIn",
    caption: "🎉 Just completed my Machine Learning Specialization! Excited to apply these new skills to real-world projects. #MachineLearning #AI #ContinuousLearning",
    engagement: "High",
    timing: "Now",
    status: "draft",
  },
  {
    id: "2",
    platform: "Twitter",
    caption: "📊 My portfolio views increased by 34% this week! Grateful for the support and excited to share more projects soon. #Developer #Portfolio #Growth",
    engagement: "Very High",
    timing: "12 PM (Best Time)",
    status: "draft",
  },
  {
    id: "3",
    platform: "LinkedIn",
    caption: "🚀 New project alert! Just launched a weather prediction app using React and OpenWeather API. Check it out on GitHub! #React #WebDev #OpenSource",
    engagement: "Medium",
    timing: "6 PM",
    status: "ready",
  },
]

export function AISocialBotFeed() {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])

  const handlePost = (postId: string) => {
    // In real app, post to selected platform
    console.log("Posting:", postId)
  }

  const handleSchedule = (postId: string) => {
    // In real app, schedule post
    console.log("Scheduling:", postId)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "LinkedIn":
        return <Linkedin className="h-4 w-4" />
      case "Twitter":
        return <Twitter className="h-4 w-4" />
      default:
        return <Send className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      {/* AI Bot Header */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <div className="text-sm font-semibold">AI Social Bot</div>
            <Badge variant="outline" className="text-xs">Auto-Drafting</Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            AI continuously monitors your achievements and generates social media post drafts
          </div>
        </CardContent>
      </Card>

      {/* Post Drafts */}
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {postDrafts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border ${post.status === "ready" ? "border-green-300 bg-green-50/50" : "border-border"}`}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(post.platform)}
                        <div className="text-sm font-medium">{post.platform}</div>
                        {post.status === "ready" && (
                          <Badge variant="outline" className="text-xs gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            Ready
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {post.engagement} Engagement
                      </Badge>
                    </div>

                    {/* Caption */}
                    <div className="text-sm text-muted-foreground p-3 rounded-lg bg-muted/50">
                      {post.caption}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {post.timing}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handlePost(post.id)}
                        className="flex-1 gap-2 text-xs"
                      >
                        <Send className="h-3 w-3" />
                        Post Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSchedule(post.id)}
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

      {/* AI Status */}
      <Card className="border-border">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI is analyzing your recent achievements to generate new post drafts...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

