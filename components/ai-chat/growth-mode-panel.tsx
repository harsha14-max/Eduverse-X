"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Sparkles, TrendingUp, Linkedin, Twitter, Flame } from "lucide-react"
import { AIChatConsole } from "../dashboard/ai-chat-console"
import { AISocialPostGenerator } from "../trust/ai-social-post-generator"

interface TrendingTopic {
  id: string
  title: string
  category: string
  engagement: number
  icon: typeof Flame
}

const trendingTopics: TrendingTopic[] = [
  { id: "1", title: "AI Career Trends 2025", category: "AI", engagement: 85, icon: Flame },
  { id: "2", title: "React 19 New Features", category: "Tech", engagement: 72, icon: TrendingUp },
  { id: "3", title: "Web3 Developer Guide", category: "Web3", engagement: 68, icon: Flame },
]

const influencers = [
  { id: "1", name: "AI Thought Leader", platform: "LinkedIn", followers: "125K", posts: "12 posts today" },
  { id: "2", name: "Tech Educator", platform: "LinkedIn", followers: "89K", posts: "8 posts today" },
  { id: "3", name: "Dev Advocate", platform: "Twitter/X", followers: "45K", posts: "15 posts today" },
]

export function GrowthModePanel() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {/* Main Chat */}
      <div className="lg:col-span-2">
        <AIChatConsole />
      </div>

      {/* Growth Features Sidebar */}
      <div className="space-y-4">
        {/* Trending Topics */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-4 w-4 text-orange-500" />
              <h3 className="text-sm font-semibold">🔥 Trending Topics</h3>
            </div>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {trendingTopics.map((topic) => {
                  const Icon = topic.icon
                  return (
                    <motion.div
                      key={topic.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedTopic === topic.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedTopic(topic.id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className="h-3 w-3 text-primary" />
                          <span className="text-xs font-medium">{topic.title}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {topic.engagement}%
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">{topic.category}</div>
                    </motion.div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Top Influencers */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-semibold">📈 Top Influencers</h3>
            </div>
            <ScrollArea className="h-[150px]">
              <div className="space-y-2">
                {influencers.map((influencer) => {
                  const PlatformIcon = influencer.platform === "LinkedIn" ? Linkedin : Twitter
                  return (
                    <div
                      key={influencer.id}
                      className="p-2 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <PlatformIcon className="h-3 w-3 text-primary" />
                        <span className="text-xs font-medium">{influencer.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {influencer.followers} • {influencer.posts}
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* AI Post Generator */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">AI Post Generator</h3>
            </div>
            <AISocialPostGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

