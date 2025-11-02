"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bell,
  X,
  Search,
  Settings,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Sparkles,
  Filter,
} from "lucide-react"
import { NotificationCard } from "./notification-card"
import { NotificationFilterChips } from "./notification-filter-chips"
import { groupNotifications, type NotificationItem } from "../orchestrator/notification-grouping"

interface NotificationDrawerProps {
  embedded?: boolean
  isOpen?: boolean
  onClose?: () => void
}

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
  {
    id: "6",
    type: "automation",
    title: "AI Automation Failed",
    description: "Workflow #7 failed at step 4",
    timestamp: "4 hours ago",
    read: false,
  },
]

export function NotificationDrawer({ embedded = false, isOpen, onClose }: NotificationDrawerProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Load read state from localStorage
  useEffect(() => {
    const savedReadState = localStorage.getItem("notificationReadState")
    if (savedReadState) {
      try {
        const readState = JSON.parse(savedReadState)
        setNotifications((prev) =>
          prev.map((n) => ({
            ...n,
            read: readState[n.id] !== undefined ? readState[n.id] : n.read,
          }))
        )
      } catch (e) {
        console.error("Failed to load read state", e)
      }
    }
  }, [])

  // Save read state to localStorage
  useEffect(() => {
    const readState: Record<string, boolean> = {}
    notifications.forEach((n) => {
      readState[n.id] = n.read
    })
    localStorage.setItem("notificationReadState", JSON.stringify(readState))
  }, [notifications])

  const unreadCount = notifications.filter((n) => !n.read).length

  const groupedNotifications = groupNotifications(notifications)

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "unread" && !notification.read) ||
      (selectedFilter === "read" && notification.read)

    const matchesCategory =
      selectedCategory === null ||
      notification.type === selectedCategory ||
      (selectedCategory === "ai" && notification.type === "mentor") ||
      (selectedCategory === "learning" && notification.type === "mentor") ||
      (selectedCategory === "security" && notification.type === "system")

    return matchesSearch && matchesFilter && matchesCategory
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const content = (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Notifications</CardTitle>
              <div className="text-xs text-muted-foreground">
                {unreadCount} unread • {notifications.length} total
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="gap-2 text-xs">
                <CheckCircle2 className="h-3 w-3" />
                Mark All Read
              </Button>
            )}
            {!embedded && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 p-0">
        {/* Search & Filter */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <NotificationFilterChips
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1">
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <div className="text-sm font-semibold mb-2">No notifications</div>
                <div className="text-xs text-muted-foreground">
                  {searchQuery || selectedCategory || selectedFilter !== "all"
                    ? "Try adjusting your filters"
                    : "You're all caught up!"}
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {/* Grouped by Category */}
                {groupedNotifications
                  .filter((group) =>
                    selectedCategory === null ||
                    group.type === selectedCategory ||
                    (selectedCategory === "ai" && group.type === "mentor") ||
                    (selectedCategory === "learning" && group.type === "mentor") ||
                    (selectedCategory === "security" && group.type === "system")
                  )
                  .map((group) => {
                    const groupItems = filteredNotifications.filter((n) => n.type === group.type)
                    if (groupItems.length === 0) return null

                    return (
                      <motion.div
                        key={group.type}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center gap-2 px-2 text-xs font-semibold text-muted-foreground uppercase">
                          {group.label}
                          <Badge variant="outline" className="text-xs">
                            {groupItems.filter((n) => !n.read).length}
                          </Badge>
                        </div>
                        {groupItems.map((notification, index) => (
                          <NotificationCard
                            key={notification.id}
                            notification={notification}
                            index={index}
                            onMarkAsRead={() => handleMarkAsRead(notification.id)}
                            onDismiss={() => handleDismiss(notification.id)}
                          />
                        ))}
                      </motion.div>
                    )
                  })}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )

  if (embedded) {
    return content
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-xl z-50"
          >
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

