"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Sparkles,
  Eye,
  RefreshCw,
  ExternalLink,
  Zap,
  MessageSquare,
  TrendingUp,
  Settings,
} from "lucide-react"

interface TimelineNotification {
  id: string
  date: string
  time: string
  title: string
  description: string
  type: "automation" | "mentor" | "social" | "system"
  priority?: "info" | "warning" | "critical" | "success"
  status: "success" | "pending" | "failed"
  action?: string
  actionUrl?: string
}

const timelineNotifications: TimelineNotification[] = [
  {
    id: "1",
    date: "2024-12-20",
    time: "14:30:22",
    title: "Workflow Executed Successfully",
    description: "LinkedIn Auto Poster completed successfully. Post published.",
    type: "automation",
    priority: "success",
    status: "success",
    action: "View Post",
    actionUrl: "/dashboard/social",
  },
  {
    id: "2",
    date: "2024-12-20",
    time: "14:25:10",
    title: "Mentor AI: Weekly Growth Target",
    description: "You're close to your weekly growth target. Only 1 more post needed!",
    type: "mentor",
    priority: "info",
    status: "success",
    action: "View Progress",
    actionUrl: "/dashboard/orchestrator",
  },
  {
    id: "3",
    date: "2024-12-20",
    time: "14:20:05",
    title: "Post Reached 500+ Views",
    description: "Your post 'AI Tools for Students' reached 500+ views",
    type: "social",
    priority: "success",
    status: "success",
    action: "View Analytics",
    actionUrl: "/dashboard/analytics",
  },
  {
    id: "4",
    date: "2024-12-20",
    time: "14:15:33",
    title: "GitHub Sync Failed",
    description: "Authentication token expired. Please refresh OAuth token.",
    type: "automation",
    priority: "critical",
    status: "failed",
    action: "Retry",
    actionUrl: "/dashboard/automation",
  },
  {
    id: "5",
    date: "2024-12-20",
    time: "14:10:18",
    title: "System Update Available",
    description: "New features available in the dashboard",
    type: "system",
    priority: "info",
    status: "pending",
    action: "View Update",
    actionUrl: "/dashboard/settings",
  },
  {
    id: "6",
    date: "2024-12-19",
    time: "16:45:22",
    title: "New Follower",
    description: "You gained 5 new followers this week",
    type: "social",
    priority: "info",
    status: "success",
  },
  {
    id: "7",
    date: "2024-12-19",
    time: "15:30:15",
    title: "AI Discovery: TypeScript 5.7 Update",
    description: "New TypeScript 5.7 update detected. Want to view summary?",
    type: "system",
    priority: "info",
    status: "success",
    action: "View Summary",
    actionUrl: "/dashboard/support?tab=knowledge",
  },
]

export function NotificationTimelineView() {
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null)

  // Group by date
  const groupedByDate = timelineNotifications.reduce(
    (acc, notif) => {
      if (!acc[notif.date]) {
        acc[notif.date] = []
      }
      acc[notif.date].push(notif)
      return acc
    },
    {} as Record<string, TimelineNotification[]>
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "automation":
        return Zap
      case "mentor":
        return MessageSquare
      case "social":
        return TrendingUp
      case "system":
        return Settings
      default:
        return Sparkles
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return CheckCircle2
      case "pending":
        return Clock
      case "failed":
        return XCircle
      default:
        return Info
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      case "failed":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Notification Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          <ScrollArea className="h-[600px]">
            <div className="space-y-8 relative pl-16">
              {Object.entries(groupedByDate).map(([date, notifications], dateIndex) => (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: dateIndex * 0.1 }}
                  className="relative"
                >
                  {/* Date Separator */}
                  <div className="flex items-center gap-3 mb-4 -ml-8">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <div className="text-sm font-semibold text-muted-foreground">{date}</div>
                  </div>

                  {/* Notifications for this date */}
                  <div className="space-y-4">
                    {notifications.map((notification, index) => {
                      const Icon = getTypeIcon(notification.type)
                      const StatusIcon = getStatusIcon(notification.status)

                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: dateIndex * 0.1 + index * 0.05 }}
                          className="relative"
                        >
                          {/* Timeline Dot */}
                          <div className="absolute -left-8 top-2 w-4 h-4 rounded-full border-2 border-background bg-primary" />

                          {/* Notification Card */}
                          <Card
                            className={`border-2 transition-all cursor-pointer ${
                              selectedNotification === notification.id
                                ? "border-primary shadow-lg"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() =>
                              setSelectedNotification(
                                selectedNotification === notification.id ? null : notification.id
                              )
                            }
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                {/* Left: Icon */}
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                  <Icon className="h-5 w-5 text-primary" />
                                </div>

                                {/* Center: Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-sm">{notification.title}</h3>
                                    <StatusIcon
                                      className={`h-4 w-4 ${getStatusColor(notification.status)}`}
                                    />
                                    {notification.priority && (
                                      <Badge variant="outline" className="text-xs shrink-0">
                                        {notification.priority}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    {notification.description}
                                  </p>
                                  <div className="text-xs text-muted-foreground">
                                    {notification.time}
                                  </div>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex flex-col gap-2 shrink-0">
                                  {notification.action && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 px-3 text-xs gap-1"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        if (notification.actionUrl) {
                                          window.location.href = notification.actionUrl
                                        }
                                      }}
                                    >
                                      {notification.action === "View Post" && <Eye className="h-3 w-3" />}
                                      {notification.action === "Retry" && <RefreshCw className="h-3 w-3" />}
                                      {notification.action === "View" && (
                                        <ExternalLink className="h-3 w-3" />
                                      )}
                                      {notification.action}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

