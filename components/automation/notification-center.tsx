"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Info,
  RefreshCw,
  Sparkles,
  Clock,
  Zap,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  nodeId?: string
  action?: string
  aiSuggestion?: string
  smartRerun?: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Flow Executed Successfully",
    message: "LinkedIn Auto Poster completed successfully. Post published at 12:00 PM.",
    timestamp: "2 minutes ago",
    nodeId: "node-4",
    action: "View Post",
  },
  {
    id: "2",
    type: "error",
    title: "GitHub Sync Failed",
    message: "Authentication token expired. Please refresh OAuth token.",
    timestamp: "15 minutes ago",
    nodeId: "node-2",
    aiSuggestion: "Token expired → Refresh in Settings → Integrations → GitHub",
    smartRerun: true,
  },
  {
    id: "3",
    type: "warning",
    title: "API Rate Limit Warning",
    message: "LinkedIn API rate limit approaching (85% used). Next reset in 2 hours.",
    timestamp: "1 hour ago",
    nodeId: "node-4",
    aiSuggestion: "Consider batching requests or scheduling during off-peak hours",
  },
  {
    id: "4",
    type: "info",
    title: "AI Suggestion Available",
    message: "Based on your recent activity, try optimizing your post timing.",
    timestamp: "2 hours ago",
    aiSuggestion: "Posts at 12 PM perform 2.3x better than current schedule",
  },
  {
    id: "5",
    type: "success",
    title: "New Template Available",
    message: "AI-Curated template 'Social Media Scheduler' matches your workflow.",
    timestamp: "3 hours ago",
    action: "View Template",
  },
]

const executionLogs = [
  {
    id: "1",
    flowName: "LinkedIn Auto Poster",
    status: "success",
    startedAt: "14:30:15",
    completedAt: "14:30:22",
    duration: "7s",
    nodes: [
      { id: "n1", name: "AI Prompt Node", status: "success", duration: "2s" },
      { id: "n2", name: "AI Reasoning Node", status: "success", duration: "3s" },
      { id: "n3", name: "AI Decision Node", status: "success", duration: "1s" },
      { id: "n4", name: "LinkedIn Post Action", status: "success", duration: "1s" },
    ],
  },
  {
    id: "2",
    flowName: "GitHub Sync",
    status: "error",
    startedAt: "14:15:00",
    completedAt: "14:15:05",
    duration: "5s",
    nodes: [
      { id: "n1", name: "GitHub API Call", status: "error", duration: "5s", error: "Token expired" },
    ],
    smartRerun: true,
  },
]

export function NotificationCenter() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50/50"
      case "error":
        return "border-red-200 bg-red-50/50"
      case "warning":
        return "border-yellow-200 bg-yellow-50/50"
      default:
        return "border-blue-200 bg-blue-50/50"
    }
  }

  const handleSmartRerun = (notificationId: string) => {
    // Simulate AI auto-detection and fix
    console.log("Smart Rerun triggered for:", notificationId)
    // AI would analyze the error and suggest a fix
  }

  return (
    <Card className="h-full border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">Notification & Execution Center</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {notifications.filter((n) => n.type === "error" || n.type === "warning").length} Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-full rounded-none border-b border-border">
            <TabsTrigger value="notifications" className="flex-1">
              <Bell className="h-3 w-3 mr-1" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="executions" className="flex-1">
              <Zap className="h-3 w-3 mr-1" />
              Executions
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex-1">
              <Clock className="h-3 w-3 mr-1" />
              Timeline
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="flex-1 m-0 p-4 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-2 ${getNotificationColor(notification.type)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-2">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="font-semibold text-sm mb-1">{notification.title}</div>
                            <div className="text-xs text-muted-foreground">{notification.message}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{notification.timestamp}</div>
                        </div>

                        {/* Inline AI Context Tip */}
                        {notification.aiSuggestion && (
                          <div className="mt-3 p-2 rounded-lg bg-primary/5 border border-primary/20">
                            <div className="flex items-start gap-2">
                              <Sparkles className="h-3 w-3 text-primary mt-0.5" />
                              <div className="flex-1">
                                <div className="text-xs font-medium text-primary mb-1">AI Context Tip:</div>
                                <div className="text-xs text-muted-foreground">
                                  {notification.aiSuggestion}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Smart Rerun */}
                        {notification.smartRerun && (
                          <div className="mt-3 flex items-center gap-2">
                            <Button
                              variant="default"
                              size="sm"
                              className="flex-1 gap-2"
                              onClick={() => handleSmartRerun(notification.id)}
                            >
                              <RefreshCw className="h-3 w-3" />
                              Smart Rerun
                            </Button>
                            <Badge variant="outline" className="text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI Fix Available
                            </Badge>
                          </div>
                        )}

                        {/* Node Reference */}
                        {notification.nodeId && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            <strong>Node:</strong> {notification.nodeId}
                          </div>
                        )}

                        {/* Actions */}
                        {notification.action && (
                          <div className="mt-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              {notification.action}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Executions Tab */}
          <TabsContent value="executions" className="flex-1 m-0 p-4 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {executionLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-2 ${
                      log.status === "success"
                        ? "border-green-200 bg-green-50/50"
                        : "border-red-200 bg-red-50/50"
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-semibold text-sm mb-1">{log.flowName}</div>
                            <div className="text-xs text-muted-foreground">
                              {log.startedAt} - {log.completedAt} ({log.duration})
                            </div>
                          </div>
                          <Badge
                            variant={log.status === "success" ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {log.status === "success" ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {log.status}
                          </Badge>
                        </div>

                        {/* Node Execution Details */}
                        <div className="space-y-2">
                          {log.nodes.map((node) => (
                            <div
                              key={node.id}
                              className="flex items-center justify-between p-2 rounded bg-muted/50"
                            >
                              <div className="flex items-center gap-2">
                                {node.status === "success" ? (
                                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                                ) : (
                                  <XCircle className="h-3 w-3 text-red-600" />
                                )}
                                <span className="text-xs font-medium">{node.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{node.duration}</span>
                                {"error" in node && node.error && (
                                  <Badge variant="destructive" className="text-xs">
                                    {node.error}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Smart Rerun */}
                        {log.smartRerun && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <Button
                              variant="default"
                              size="sm"
                              className="w-full gap-2"
                              onClick={() => handleSmartRerun(log.id)}
                            >
                              <RefreshCw className="h-3 w-3" />
                              Smart Rerun (AI Auto-Fix)
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="flex-1 m-0 p-4 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {executionLogs.map((log, index) => (
                  <div key={log.id} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          log.status === "success" ? "bg-green-500" : "bg-red-500"
                        }`} />
                        {index < executionLogs.length - 1 && (
                          <div className="w-0.5 h-16 bg-border" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="font-semibold text-sm mb-1">{log.flowName}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {log.startedAt} - {log.completedAt}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Status: <Badge variant={log.status === "success" ? "default" : "destructive"} className="text-xs">
                            {log.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

