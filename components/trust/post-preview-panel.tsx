"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Linkedin,
  Twitter,
  Send,
  Hash,
} from "lucide-react"

interface PostPreviewPanelProps {
  post: {
    caption: string
    tone: string
    hashtags: string[]
    engagement: string
    platform: string
  }
}

const platformIcons: Record<string, any> = {
  LinkedIn: Linkedin,
  Twitter: Twitter,
  "Dev.to": Send,
}

export function PostPreviewPanel({ post }: PostPreviewPanelProps) {
  const PlatformIcon = platformIcons[post.platform] || Linkedin

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PlatformIcon className="h-4 w-4 text-primary" />
              <div className="text-sm font-semibold">{post.platform} Post Preview</div>
            </div>
            <Badge variant="outline" className="text-xs">
              {post.tone} Tone
            </Badge>
          </div>

          {/* Caption */}
          <div className="p-3 rounded-lg bg-background border border-border">
            <div className="text-sm whitespace-pre-wrap">{post.caption}</div>
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1">
            {post.hashtags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs gap-1">
                <Hash className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

