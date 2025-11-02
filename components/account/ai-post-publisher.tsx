"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Sparkles,
  Send,
  Calendar,
  Linkedin,
  Twitter,
  CheckCircle2,
  TrendingUp,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const platforms = [
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, enabled: true },
  { id: "twitter", name: "Twitter/X", icon: Twitter, enabled: true },
  { id: "medium", name: "Medium", icon: Send, enabled: false },
]

const draftPosts = [
  {
    id: "1",
    content: "🎉 Just completed my Machine Learning Specialization! Excited to apply these new skills to real-world projects. #MachineLearning #AI #ContinuousLearning",
    engagement: "High",
    timing: "Now",
  },
  {
    id: "2",
    content: "📊 My portfolio views increased by 34% this week! Grateful for the support and excited to share more projects soon. #Developer #Portfolio #Growth",
    engagement: "Very High",
    timing: "12 PM (Best Time)",
  },
]

export function AIPostPublisher() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["linkedin", "twitter"])
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [customContent, setCustomContent] = useState("")

  const handleTogglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handlePublish = () => {
    // In real app, publish to selected platforms
    console.log("Publishing to:", selectedPlatforms)
  }

  return (
    <div className="space-y-4">
      {/* Platform Selection */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="text-sm font-semibold mb-3">Select Platforms</div>
          <div className="space-y-3">
            {platforms.map((platform) => {
              const Icon = platform.icon
              return (
                <div key={platform.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <Label htmlFor={`platform-${platform.id}`} className="text-sm cursor-pointer">
                      {platform.name}
                    </Label>
                  </div>
                  <Switch
                    id={`platform-${platform.id}`}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => handleTogglePlatform(platform.id)}
                    disabled={!platform.enabled}
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Draft Posts */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <div className="text-sm font-semibold">AI-Generated Post Drafts</div>
          </div>
          <div className="space-y-3">
            {draftPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedPost === post.id ? "border-primary border-2" : "border-border"
                  }`}
                  onClick={() => setSelectedPost(post.id)}
                >
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">{post.content}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline" className="gap-1 text-xs">
                          <TrendingUp className="h-3 w-3" />
                          {post.engagement} Engagement
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {post.timing}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Content */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="text-sm font-semibold mb-3">Or Write Custom Post</div>
          <Textarea
            placeholder="Write your post content..."
            value={customContent}
            onChange={(e) => setCustomContent(e.target.value)}
            rows={4}
            className="mb-3"
          />
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""} selected
            </div>
            <Button
              onClick={handlePublish}
              disabled={!customContent && !selectedPost}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

