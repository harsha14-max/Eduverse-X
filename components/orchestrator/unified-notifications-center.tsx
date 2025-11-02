"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Settings, MessageSquare, Zap, TrendingUp } from "lucide-react"
import { groupNotifications, type NotificationItem } from "./notification-grouping"
import { RealtimeSyncIndicator } from "./realtime-sync-indicator"
import { useTiming } from "@/lib/hooks/useTiming"
import { INTERVALS, TimingPriority } from "@/lib/timing-constants"

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "social",
    title: "Post reached 500+ views!",
    description: "Your post 'AI Tools for Students' reached 500+ views",
    timestamp: "10 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "mentor",
    title: "Mentor AI: Weekly growth target",
    description: "You're close to your weekly growth target. Only 1 more post needed!",
    timestamp: "30 minutes ago",
    read: false,
  },
  {
    id: "3",
    type: "automation",
    title: "Workflow executed successfully",
    description: "Portfolio sync automation completed",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "System update available",
    description: "New features available in the dashboard",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "5",
    type: "social",
    title: "New follower",
    description: "You gained 5 new followers this week",
    timestamp: "3 hours ago",
    read: true,
  },
]

export function UnifiedNotificationsCenter() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications)
  const [isConnected, setIsConnected] = useState(true)
  const [activeGroup, setActiveGroup] = useState<string>("all")
  const { interval } = useTiming()

  useEffect(() => {
    // Simulate WebSocket connection with centralized timing manager
    // This acts as polling fallback when WebSocket drops
    const taskId = interval(
      () => {
        // In real app, this would listen to WebSocket events
        // For now, simulate with polling fallback
        console.log("Checking for new notifications...")
        // In production, this would fetch new notifications if WebSocket is disconnected
      },
      INTERVALS.NOTIFICATION_POLL,
      { priority: TimingPriority.HIGH, enabled: !isConnected }
    )

    return () => {
      // Cleanup handled by useTiming hook
    }
  }, [isConnected, interval])

  const groupedNotifications = groupNotifications(notifications)
  const totalUnread = notifications.filter((n) => !n.read).length

  const getGroupIcon = (type: string) => {
    switch (type) {
      case "system":
        return Settings
      case "mentor":
        return MessageSquare
      case "social":
        return TrendingUp
      case "automation":
        return Zap
      default:
        return Bell
    }
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Unified Notifications</CardTitle>
              <CardDescription className="text-xs">
                Real-time updates from all sections
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {totalUnread > 0 && (
              <Badge variant="destructive" className="text-xs">
                {totalUnread} new
              </Badge>
            )}
            <RealtimeSyncIndicator isConnected={isConnected} lastSync={new Date()} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <Tabs value={activeGroup} onValueChange={setActiveGroup} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="all" className="text-xs">
              All
              {totalUnread > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs px-1">
                  {totalUnread}
                </Badge>
              )}
            </TabsTrigger>
            {groupedNotifications.map((group) => {
              const Icon = getGroupIcon(group.type)
              return (
                <TabsTrigger key={group.type} value={group.type} className="text-xs">
                  <Icon className="h-3 w-3 mr-1" />
                  {group.label}
                  {group.unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-1 text-xs px-1">
                      {group.unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value="all" className="flex-1 m-0 overflow-hidden min-h-0">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-2">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-lg border transition-all ${
                      notification.read
                        ? "bg-muted/50 border-border"
                        : "bg-blue-500/10 border-blue-500/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm mb-1">{notification.title}</div>
                        <div className="text-xs text-muted-foreground">{notification.description}</div>
                      </div>
                      <div className="text-xs text-muted-foreground shrink-0">
                        {notification.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {groupedNotifications.map((group) => {
            const Icon = getGroupIcon(group.type)
            return (
              <TabsContent key={group.type} value={group.type} className="flex-1 m-0 overflow-hidden min-h-0">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-2">
                    {group.items.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-3 rounded-lg border transition-all ${
                          notification.read
                            ? "bg-muted/50 border-border"
                            : "bg-blue-500/10 border-blue-500/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm mb-1">{notification.title}</div>
                              <div className="text-xs text-muted-foreground">{notification.description}</div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground shrink-0">
                            {notification.timestamp}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}

