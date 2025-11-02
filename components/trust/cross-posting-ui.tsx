"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Send,
  Linkedin,
  Twitter,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"

const platforms = [
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, enabled: true },
  { id: "twitter", name: "Twitter/X", icon: Twitter, enabled: true },
  { id: "devto", name: "Dev.to", icon: FileText, enabled: false },
]

const postStatus = [
  {
    id: "1",
    platform: "LinkedIn",
    status: "posted",
    timestamp: "2 minutes ago",
    icon: CheckCircle2,
  },
  {
    id: "2",
    platform: "Twitter/X",
    status: "drafted",
    timestamp: "5 minutes ago",
    icon: Clock,
  },
  {
    id: "3",
    platform: "Dev.to",
    status: "verified",
    timestamp: "1 hour ago",
    icon: CheckCircle2,
  },
]

export function CrossPostingUI() {
  const [enabledPlatforms, setEnabledPlatforms] = useState<string[]>(["linkedin", "twitter"])

  const handleTogglePlatform = (platformId: string) => {
    setEnabledPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "posted":
        return "bg-green-50 text-green-700 border-green-300"
      case "verified":
        return "bg-blue-50 text-blue-700 border-blue-300"
      case "drafted":
        return "bg-yellow-50 text-yellow-700 border-yellow-300"
      default:
        return "bg-gray-50 text-gray-700 border-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <Send className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Cross-Posting Integration</CardTitle>
            <CardDescription className="text-xs">
              Auto-post to multiple platforms with status tracking
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Platform Toggles */}
        <div>
          <Label className="text-sm font-medium mb-3">Enable Platforms</Label>
          <div className="space-y-3">
            {platforms.map((platform) => {
              const Icon = platform.icon
              return (
                <div
                  key={platform.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <Label htmlFor={platform.id} className="text-sm cursor-pointer">
                      {platform.name}
                    </Label>
                  </div>
                  <Switch
                    id={platform.id}
                    checked={enabledPlatforms.includes(platform.id)}
                    onCheckedChange={() => handleTogglePlatform(platform.id)}
                    disabled={!platform.enabled}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Status Timeline */}
        <div>
          <Label className="text-sm font-medium mb-3">Post Status Timeline</Label>
          <div className="space-y-2">
            {postStatus.map((post, index) => {
              const StatusIcon = post.icon
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(post.status)}`}
                >
                  <div className="flex items-center gap-2">
                    <StatusIcon className="h-4 w-4" />
                    <div className="text-sm font-medium">{post.platform}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {post.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Auto-Posting Info */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="text-xs font-medium mb-1">Auto-Posting Workflow</div>
          <div className="text-xs text-muted-foreground">
            When you add a tile, it will automatically post to selected platforms with verification
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

