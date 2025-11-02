"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Linkedin,
  Twitter,
  FileCode,
  Edit,
  Calendar,
  Copy,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import { motion } from "framer-motion"

interface Post {
  id: string
  platform: "linkedin" | "twitter" | "devto"
  title: string
  content: string
  status: "published" | "scheduled" | "draft"
  publishDate: string
  engagement: {
    views: number
    likes: number
    shares: number
  }
}

const posts: Post[] = [
  {
    id: "1",
    platform: "linkedin",
    title: "Weekly Learning Progress",
    content: "Just completed the ML specialization...",
    status: "published",
    publishDate: "2 days ago",
    engagement: {
      views: 1250,
      likes: 89,
      shares: 12,
    },
  },
  {
    id: "2",
    platform: "twitter",
    title: "Tech Tips Thread",
    content: "5 React 19 features you should know...",
    status: "published",
    publishDate: "5 days ago",
    engagement: {
      views: 890,
      likes: 45,
      shares: 8,
    },
  },
  {
    id: "3",
    platform: "devto",
    title: "Building with LangChain",
    content: "How to integrate LangChain in your Next.js app...",
    status: "scheduled",
    publishDate: "Tomorrow 9 AM",
    engagement: {
      views: 0,
      likes: 0,
      shares: 0,
    },
  },
]

const platformIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  devto: FileCode,
}

export function PostCommandPanel() {
  const [activeTab, setActiveTab] = useState<"posts" | "performance">("posts")

  const getPlatformIcon = (platform: string) => {
    const Icon = platformIcons[platform as keyof typeof platformIcons] || FileText
    return <Icon className="h-4 w-4" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "scheduled":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "draft":
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Post Command Panel</CardTitle>
              <CardDescription className="text-xs">
                All past and scheduled posts with editing and performance tracking
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="posts">
              <FileText className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="performance">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="flex-1 m-0 overflow-hidden min-h-0">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-3">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border ${getStatusColor(post.status)} transition-all hover:shadow-md`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(post.platform)}
                            <div className="font-semibold text-sm">{post.title}</div>
                            <Badge variant="outline" className="text-xs">
                              {post.status}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{post.content}</div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Published: {post.publishDate}</span>
                          {post.status === "published" && (
                            <div className="flex items-center gap-3">
                              <span>{post.engagement.views} views</span>
                              <span>{post.engagement.likes} likes</span>
                              <span>{post.engagement.shares} shares</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="performance" className="flex-1 m-0">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="font-semibold mb-2">Cross-platform Performance</h3>
                  <div className="text-sm text-muted-foreground mb-4">
                    Comparison chart showing performance across platforms
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </div>
                    <div className="text-sm font-bold">1,250 views</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium">Twitter/X</span>
                    </div>
                    <div className="text-sm font-bold">890 views</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-gray-700" />
                      <span className="text-sm font-medium">Dev.to</span>
                    </div>
                    <div className="text-sm font-bold">Scheduled</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

