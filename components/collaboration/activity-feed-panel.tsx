"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, X, Play, ArrowRight } from "lucide-react"

interface ActivityItem {
  id: string
  user: string
  avatar: string
  action: string
  target: string
  timestamp: string
  type: "update" | "comment" | "suggestion" | "accept"
  canReplay: boolean
}

const activities: ActivityItem[] = [
  {
    id: "1",
    user: "Kiran",
    avatar: "KR",
    action: "updated",
    target: "automation flow",
    timestamp: "2 minutes ago",
    type: "update",
    canReplay: true,
  },
  {
    id: "2",
    user: "Riya",
    avatar: "RP",
    action: "accepted",
    target: "AI suggested optimization",
    timestamp: "5 minutes ago",
    type: "accept",
    canReplay: true,
  },
  {
    id: "3",
    user: "AI",
    avatar: "AI",
    action: "suggested",
    target: "optimization in Report Flow",
    timestamp: "10 minutes ago",
    type: "suggestion",
    canReplay: false,
  },
  {
    id: "4",
    user: "Aarav",
    avatar: "AA",
    action: "commented on",
    target: "node #23",
    timestamp: "15 minutes ago",
    type: "comment",
    canReplay: false,
  },
]

export default function ActivityFeedPanel() {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)

  const handleReplay = (activityId: string) => {
    setSelectedActivity(activityId)
    // In real app, would replay the action visually
    setTimeout(() => setSelectedActivity(null), 2000)
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "update":
        return "bg-blue-50 text-blue-700 border-blue-300"
      case "comment":
        return "bg-purple-50 text-purple-700 border-purple-300"
      case "suggestion":
        return "bg-green-50 text-green-700 border-green-300"
      case "accept":
        return "bg-yellow-50 text-yellow-700 border-yellow-300"
      default:
        return ""
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border shadow-xl z-50"
        >
          <Card className="h-full border-0 rounded-none flex flex-col">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-bold">Activity Feed</CardTitle>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Recent activities and actions
              </p>
            </CardHeader>

            <CardContent className="flex-1 min-h-0 p-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-3">
                  {activities.map((activity) => {
                    const isReplaying = selectedActivity === activity.id
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          isReplaying
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => activity.canReplay && handleReplay(activity.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 border-2 border-background">
                            <AvatarFallback className="text-xs">{activity.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold">{activity.user}</span>
                              <span className="text-xs text-muted-foreground">
                                {activity.action}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {activity.target}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={`text-xs ${getActivityColor(activity.type)}`}>
                                {activity.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {activity.timestamp}
                              </span>
                            </div>
                          </div>
                          {activity.canReplay && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleReplay(activity.id)
                              }}
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        {isReplaying && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 pt-2 border-t border-border flex items-center gap-2 text-xs text-primary"
                          >
                            <Play className="h-3 w-3 animate-pulse" />
                            <span>Replaying action...</span>
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

