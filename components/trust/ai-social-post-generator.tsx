"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Sparkles,
  Linkedin,
  Twitter,
  Send,
  TrendingUp,
  CheckCircle2,
} from "lucide-react"
import { PostPreviewPanel } from "./post-preview-panel"

const draftPost = {
  caption: "🎉 Just completed my Machine Learning Specialization! Excited to apply these new skills to real-world projects. #MachineLearning #AI #ContinuousLearning",
  tone: "Professional",
  hashtags: ["#MachineLearning", "#AI", "#ContinuousLearning", "#Tech"],
  engagement: "High",
  platform: "LinkedIn",
}

export function AISocialPostGenerator() {
  const [post, setPost] = useState(draftPost)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["LinkedIn"])
  const [autoVerification, setAutoVerification] = useState(true)

  const handleGenerate = () => {
    // Simulate AI generation
    setPost({
      caption: "📊 My portfolio views increased by 34% this week! Grateful for the support and excited to share more projects soon. #Developer #Portfolio #Growth",
      tone: "Casual",
      hashtags: ["#Developer", "#Portfolio", "#Growth", "#Tech"],
      engagement: "Very High",
      platform: "Twitter",
    })
  }

  const handleTogglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">AI Social Post Generator</CardTitle>
            <CardDescription className="text-xs">
              AI-powered post generation with engagement predictions
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Preview */}
        <PostPreviewPanel post={post} />

        {/* Platform Selection */}
        <div>
          <Label className="text-sm font-medium mb-2">Select Platforms</Label>
          <div className="grid grid-cols-3 gap-2">
            {["LinkedIn", "Twitter/X", "Dev.to"].map((platform) => {
              const Icon = platform === "LinkedIn" ? Linkedin : platform === "Twitter/X" ? Twitter : Send
              return (
                <Button
                  key={platform}
                  variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTogglePlatform(platform)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {platform}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Auto-Verification */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <Label htmlFor="auto-verify" className="text-sm">
              Auto-Verification
            </Label>
          </div>
          <Switch
            id="auto-verify"
            checked={autoVerification}
            onCheckedChange={setAutoVerification}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2" onClick={handleGenerate}>
            <Sparkles className="h-4 w-4" />
            Generate New Post
          </Button>
          <Button className="flex-1 gap-2">
            <Send className="h-4 w-4" />
            Post Now
          </Button>
        </div>

        {/* Engagement Prediction */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div className="text-xs font-semibold">Engagement Prediction</div>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
              {post.engagement}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            Estimated reach: {post.engagement === "High" ? "5K-10K" : "10K-20K"} views
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

