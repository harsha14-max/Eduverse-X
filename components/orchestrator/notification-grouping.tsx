"use client"

import { Badge } from "@/components/ui/badge"
import { Bell, MessageSquare, Zap, TrendingUp, Settings } from "lucide-react"

export interface NotificationItem {
  id: string
  type: "system" | "mentor" | "social" | "automation"
  title: string
  description: string
  timestamp: string
  read: boolean
}

export interface NotificationGroup {
  type: "system" | "mentor" | "social" | "automation"
  label: string
  icon: typeof Bell
  items: NotificationItem[]
  unreadCount: number
}

export function groupNotifications(
  notifications: NotificationItem[]
): NotificationGroup[] {
  const groups: NotificationGroup[] = [
    {
      type: "system",
      label: "System Updates",
      icon: Settings,
      items: [],
      unreadCount: 0,
    },
    {
      type: "mentor",
      label: "Mentor Suggestions",
      icon: MessageSquare,
      items: [],
      unreadCount: 0,
    },
    {
      type: "social",
      label: "Social Activities",
      icon: TrendingUp,
      items: [],
      unreadCount: 0,
    },
    {
      type: "automation",
      label: "Automation Alerts",
      icon: Zap,
      items: [],
      unreadCount: 0,
    },
  ]

  notifications.forEach((notification) => {
    const group = groups.find((g) => g.type === notification.type)
    if (group) {
      group.items.push(notification)
      if (!notification.read) {
        group.unreadCount++
      }
    }
  })

  return groups.filter((group) => group.items.length > 0)
}

