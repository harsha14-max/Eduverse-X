"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sparkles,
  Linkedin,
  GraduationCap,
  MessageSquare,
  Zap,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react"

interface ActionItem {
  id: string
  type: "ai-course" | "social-post" | "portfolio" | "mentor" | "automation"
  title: string
  description: string
  timestamp: string
  status: "success" | "pending" | "failed"
  source: string
}

const initialActions: ActionItem[] = [
  {
    id: "1",
    type: "ai-course",
    title: "New AI course recommended",
    description: "Advanced Machine Learning Specialization",
    timestamp: "Just now",
    status: "success",
    source: "AI Growth Feed",
  },
  {
    id: "2",
    type: "social-post",
    title: "LinkedIn post published successfully",
    description: "Weekly learning progress shared with network",
    timestamp: "5 minutes ago",
    status: "success",
    source: "Social Manager",
  },
  {
    id: "3",
    type: "portfolio",
    title: "Portfolio updated with LangChain badge",
    description: "New skill badge added to portfolio",
    timestamp: "10 minutes ago",
    status: "success",
    source: "Portfolio Sync",
  },
  {
    id: "4",
    type: "mentor",
    title: "Mentor suggested a weekly reflection",
    description: "AI Mentor recommends weekly growth reflection",
    timestamp: "15 minutes ago",
    status: "pending",
    source: "AI Mentor",
  },
  {
    id: "5",
    type: "automation",
    title: "Workflow executed successfully",
    description: "Portfolio sync automation completed",
    timestamp: "20 minutes ago",
    status: "success",
    source: "Automation",
  },
  {
    id: "6",
    type: "social-post",
    title: "Twitter post scheduled",
    description: "Tech tips post scheduled for tomorrow",
    timestamp: "30 minutes ago",
    status: "pending",
    source: "Social Manager",
  },
]

export function ActionFeed() {
  const [actions, setActions] = useState<ActionItem[]>(initialActions)
  const [isConnected, setIsConnected] = useState(true) // WebSocket connection status

  useEffect(() => {
    // Simulate real-time updates (WebSocket-ready)
    const interval = setInterval(() => {
      // In real app, this would listen to WebSocket events
      // For now, simulate with polling fallback
      console.log("Checking for new actions...")
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ai-course":
        return <GraduationCap className="h-4 w-4 text-blue-600" />
      case "social-post":
        return <Linkedin className="h-4 w-4 text-blue-500" />
      case "portfolio":
        return <TrendingUp className="h-4 w-4 text-purple-600" />
      case "mentor":
        return <MessageSquare className="h-4 w-4 text-green-600" />
      case "automation":
        return <Zap className="h-4 w-4 text-yellow-600" />
      default:
        return <Sparkles className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-3 w-3 text-green-600" />
      case "pending":
        return <Clock className="h-3 w-3 text-yellow-600" />
      case "failed":
        return <span className="h-3 w-3 text-red-600">✕</span>
      default:
        return <Clock className="h-3 w-3 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ai-course":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "social-post":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "portfolio":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20"
      case "mentor":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "automation":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
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
              <Sparkles className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Action Feed</CardTitle>
              <CardDescription className="text-xs">
                Real-time updates from Sections 10 & 11
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-xs text-muted-foreground">
              {isConnected ? "Live" : "Offline"}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4">
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {actions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`border ${getTypeColor(action.type)} transition-all hover:shadow-md`}>
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                          {getTypeIcon(action.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm mb-1">{action.title}</div>
                              <div className="text-xs text-muted-foreground mb-2">
                                {action.description}
                              </div>
                            </div>
                            <div className="shrink-0">
                              {getStatusIcon(action.status)}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {action.source}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {action.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
