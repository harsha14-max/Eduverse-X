"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Sparkles, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "suggestion" | "success" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  action?: string
  read: boolean
}

export function NotificationPanel() {
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "suggestion",
      title: "Course Recommendation",
      message: "A new AI course matches your GitHub project topics. Want to explore?",
      timestamp: "2m ago",
      action: "View Course",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Engagement Drop",
      message: "Your LinkedIn reach dropped 8%. Should I analyze why?",
      timestamp: "15m ago",
      action: "Analyze",
      read: false,
    },
    {
      id: "3",
      type: "suggestion",
      title: "Automation Suggestion",
      message: "Would you like to automate certificate uploads to your portfolio?",
      timestamp: "1h ago",
      action: "Setup",
      read: false,
    },
    {
      id: "4",
      type: "success",
      title: "Post Published",
      message: "Your LinkedIn post was published successfully!",
      timestamp: "2h ago",
      read: true,
    },
    {
      id: "5",
      type: "info",
      title: "Weekly Summary Ready",
      message: "Your weekly learning summary is ready for review.",
      timestamp: "3h ago",
      action: "View",
      read: true,
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "suggestion":
        return Sparkles
      case "success":
        return CheckCircle2
      case "warning":
        return AlertCircle
      case "info":
        return Clock
      default:
        return Bell
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "suggestion":
        return "bg-primary/10 text-primary border-primary/20"
      case "success":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "warning":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "info":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">AI Notifications</CardTitle>
              <CardDescription className="text-xs">
                Smart suggestions and updates
              </CardDescription>
            </div>
          </div>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
            {notifications.filter((n) => !n.read).length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
        {notifications.map((notification, index) => {
          const Icon = getIcon(notification.type)
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`border transition-all cursor-pointer hover:shadow-sm ${
                  notification.read
                    ? "bg-muted/50 border-border"
                    : `bg-background border-2 ${getColor(notification.type)}`
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      notification.read ? "bg-muted" : getColor(notification.type).split(" ")[0]
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        notification.read ? "text-muted-foreground" : getColor(notification.type).split(" ")[1]
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-semibold ${
                          notification.read ? "text-muted-foreground" : ""
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className={`text-xs mb-2 ${
                        notification.read ? "text-muted-foreground" : ""
                      }`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                        {notification.action && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => console.log(`Action: ${notification.action}`)}
                          >
                            {notification.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}

