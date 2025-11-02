"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  TrendingUp,
  Briefcase,
  BookOpen,
  Scale,
  Eye,
  ExternalLink,
  MessageSquare,
  Zap,
} from "lucide-react"

interface UpgradedNotification {
  id: string
  category: "ai-discovery" | "social-growth" | "portfolio" | "learning" | "governance"
  title: string
  description: string
  priority: "low" | "medium" | "high"
  timestamp: string
  actionUrl?: string
  metadata?: Record<string, any>
}

const mockUpgradedNotifications: UpgradedNotification[] = [
  {
    id: "1",
    category: "ai-discovery",
    title: "AI Discovery: New Trending Automation",
    description:
      "Users are loving 'Social Media Auto-Poster' template. It has 95% compatibility with your current integrations.",
    priority: "medium",
    timestamp: "2 hours ago",
    actionUrl: "/dashboard/marketplace",
    metadata: {
      compatibility: 95,
      installs: 1247,
    },
  },
  {
    id: "2",
    category: "social-growth",
    title: "Social Growth Prompt: Weekly Engagement",
    description:
      "Your engagement rate increased by 15% this week! Consider posting 2 more times to maximize reach.",
    priority: "high",
    timestamp: "4 hours ago",
    actionUrl: "/dashboard/social",
    metadata: {
      engagementIncrease: 15,
      recommendedPosts: 2,
    },
  },
  {
    id: "3",
    category: "portfolio",
    title: "Portfolio Reminder: Update Showcase",
    description:
      "It's been 2 weeks since you last updated your portfolio. Add your latest automation to showcase growth.",
    priority: "low",
    timestamp: "1 day ago",
    actionUrl: "/dashboard/portfolio",
    metadata: {
      daysSinceUpdate: 14,
    },
  },
  {
    id: "4",
    category: "learning",
    title: "Learning Momentum: Complete Your Course",
    description:
      "You're 80% through 'Advanced Automation Techniques'. Finish it to unlock the certification badge.",
    priority: "medium",
    timestamp: "2 days ago",
    actionUrl: "/dashboard/learning",
    metadata: {
      progress: 80,
    },
  },
  {
    id: "5",
    category: "governance",
    title: "AI Governance Summary: Weekly Review",
    description:
      "Your AI activity this week: 45 actions taken, 89% ethical score, 0 privacy concerns. Great work!",
    priority: "low",
    timestamp: "3 days ago",
    actionUrl: "/dashboard/account?tab=governance",
    metadata: {
      actionsCount: 45,
      ethicalScore: 89,
      privacyConcerns: 0,
    },
  },
]

export function UpgradedNotificationFeatures() {
  const [notifications, setNotifications] = useState<UpgradedNotification[]>(
    mockUpgradedNotifications
  )
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ai-discovery":
        return Sparkles
      case "social-growth":
        return TrendingUp
      case "portfolio":
        return Briefcase
      case "learning":
        return BookOpen
      case "governance":
        return Scale
      default:
        return MessageSquare
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "ai-discovery":
        return "AI Discovery"
      case "social-growth":
        return "Social Growth"
      case "portfolio":
        return "Portfolio"
      case "learning":
        return "Learning"
      case "governance":
        return "Governance"
      default:
        return "Other"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ai-discovery":
        return "bg-purple-100 text-purple-700 border-purple-300"
      case "social-growth":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "portfolio":
        return "bg-green-100 text-green-700 border-green-300"
      case "learning":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "governance":
        return "bg-indigo-100 text-indigo-700 border-indigo-300"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "low":
        return "bg-gray-100 text-gray-700 border-gray-300"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const filteredNotifications =
    selectedCategory === null
      ? notifications
      : notifications.filter((n) => n.category === selectedCategory)

  const categories = [
    ...new Set(notifications.map((n) => n.category)),
  ] as UpgradedNotification["category"][]

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Upgraded Notification Features
          </CardTitle>
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedCategory(selectedCategory === category ? null : category)
                }
                className="text-xs h-7"
              >
                {getCategoryLabel(category)}
              </Button>
            ))}
            {selectedCategory !== null && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-xs h-7"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <div className="text-sm font-semibold mb-2">No notifications</div>
                <div className="text-xs text-muted-foreground">
                  {selectedCategory ? "Try a different category" : "You're all caught up!"}
                </div>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => {
                const Icon = getCategoryIcon(notification.category)

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`border-2 transition-all hover:shadow-lg cursor-pointer ${getCategoryColor(
                        notification.category
                      )}`}
                      onClick={() => {
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/50 backdrop-blur-sm flex items-center justify-center shrink-0">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm">{notification.title}</h3>
                              <Badge
                                variant="outline"
                                className={`text-xs ${getPriorityBadge(notification.priority)}`}
                              >
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-xs opacity-90 line-clamp-2 mb-2">
                              {notification.description}
                            </p>
                            {notification.metadata && (
                              <div className="flex items-center gap-2 text-xs opacity-75 mb-2">
                                {notification.metadata.compatibility && (
                                  <span>Compatibility: {notification.metadata.compatibility}%</span>
                                )}
                                {notification.metadata.engagementIncrease && (
                                  <span>
                                    Engagement: +{notification.metadata.engagementIncrease}%
                                  </span>
                                )}
                                {notification.metadata.progress && (
                                  <span>Progress: {notification.metadata.progress}%</span>
                                )}
                                {notification.metadata.actionsCount && (
                                  <span>{notification.metadata.actionsCount} actions</span>
                                )}
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-xs opacity-75">{notification.timestamp}</span>
                              {notification.actionUrl && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-3 text-xs gap-1 bg-white/50 hover:bg-white/70"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    window.location.href = notification.actionUrl!
                                  }}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  View
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

