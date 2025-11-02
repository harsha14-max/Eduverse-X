"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Sparkles,
  X,
  Eye,
  RefreshCw,
  ExternalLink,
  Zap,
  MessageSquare,
  TrendingUp,
  Settings,
} from "lucide-react"
import type { NotificationItem } from "../orchestrator/notification-grouping"

interface NotificationCardProps {
  notification: NotificationItem & {
    priority?: "info" | "warning" | "critical" | "success"
    action?: string
    actionUrl?: string
  }
  index: number
  onMarkAsRead: () => void
  onDismiss: () => void
}

export function NotificationCard({
  notification,
  index,
  onMarkAsRead,
  onDismiss,
}: NotificationCardProps) {
  const [hovered, setHovered] = useState(false)

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

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case "info":
        return Info
      case "warning":
        return AlertCircle
      case "critical":
        return XCircle
      case "success":
        return CheckCircle2
      default:
        return getTypeIcon(notification.type)
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "critical":
        return "bg-red-100 text-red-700 border-red-300 animate-pulse"
      case "success":
        return "bg-purple-100 text-purple-700 border-purple-300"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getPriorityAnimation = (priority?: string) => {
    switch (priority) {
      case "critical":
        return {
          animate: {
            x: [0, -2, 2, -2, 2, 0],
            opacity: [1, 0.9, 1, 0.9, 1, 1],
          },
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
          },
        }
      case "warning":
        return {
          animate: {
            scale: [1, 1.02, 1],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
          },
        }
      case "success":
        return {
          animate: {
            boxShadow: [
              "0 0 0px rgba(168, 85, 247, 0)",
              "0 0 10px rgba(168, 85, 247, 0.5)",
              "0 0 0px rgba(168, 85, 247, 0)",
            ],
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
          },
        }
      default:
        return {}
    }
  }

  const Icon = notification.priority
    ? getPriorityIcon(notification.priority)
    : getTypeIcon(notification.type)

  const priority = notification.priority || "info"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...getPriorityAnimation(priority)}
    >
      <Card
        className={`border-2 transition-all cursor-pointer ${
          hovered ? "border-primary shadow-lg" : "border-border"
        } ${!notification.read ? "bg-primary/5" : "bg-background"} ${
          priority === "critical" ? "border-red-300" : ""
        }`}
        onClick={onMarkAsRead}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    priority === "info"
                      ? "bg-blue-100 text-blue-700"
                      : priority === "warning"
                      ? "bg-yellow-100 text-yellow-700"
                      : priority === "critical"
                      ? "bg-red-100 text-red-700"
                      : priority === "success"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{notification.title}</h3>
                    {!notification.read && (
                      <Badge variant="outline" className="text-xs bg-primary text-primary-foreground shrink-0">
                        New
                      </Badge>
                    )}
                    {notification.priority && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${getPriorityColor(notification.priority)} shrink-0`}
                      >
                        {notification.priority}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.description}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={(e) => {
                  e.stopPropagation()
                  onDismiss()
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{notification.timestamp}</span>
              <div className="flex items-center gap-2">
                {notification.action && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs gap-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (notification.actionUrl) {
                        window.location.href = notification.actionUrl
                      }
                    }}
                  >
                    {notification.action === "View Post" && <Eye className="h-3 w-3" />}
                    {notification.action === "Retry" && <RefreshCw className="h-3 w-3" />}
                    {notification.action === "View" && <ExternalLink className="h-3 w-3" />}
                    {notification.action}
                  </Button>
                )}
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMarkAsRead()
                    }}
                  >
                    Mark Read
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

