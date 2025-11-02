"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Shield,
  Activity,
  Brain,
  User,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
} from "lucide-react"

interface TransparencyLog {
  id: string
  date: string
  action: string
  type: "ai-action" | "user-confirmation" | "external-app"
  status: "success" | "pending" | "failed"
  metadata?: string
  nodeId?: string
}

const transparencyLogs: TransparencyLog[] = [
  {
    id: "1",
    date: "2024-12-20 14:30:22",
    action: "AI Generated Post",
    type: "ai-action",
    status: "success",
    metadata: "This post was made via decentralized node X",
    nodeId: "node-ipfs-abc123",
  },
  {
    id: "2",
    date: "2024-12-20 14:25:10",
    action: "User Confirmed Automation",
    type: "user-confirmation",
    status: "success",
    metadata: "User approved workflow execution",
  },
  {
    id: "3",
    date: "2024-12-20 14:20:05",
    action: "LinkedIn API Call",
    type: "external-app",
    status: "success",
    metadata: "Posted to LinkedIn via OAuth",
  },
  {
    id: "4",
    date: "2024-12-20 14:15:33",
    action: "AI Analysis Completed",
    type: "ai-action",
    status: "success",
    metadata: "Content analyzed via IPFS node Y",
    nodeId: "node-ipfs-def456",
  },
  {
    id: "5",
    date: "2024-12-20 14:10:18",
    action: "User Confirmed Data Access",
    type: "user-confirmation",
    status: "success",
    metadata: "User granted permission for data access",
  },
  {
    id: "6",
    date: "2024-12-20 14:05:42",
    action: "Instagram API Call",
    type: "external-app",
    status: "pending",
    metadata: "Pending Instagram post publication",
  },
]

export function DecentralizedTransparencyLogViewer() {
  const [selectedLog, setSelectedLog] = useState<string | null>(null)
  const [hoveredLog, setHoveredLog] = useState<string | null>(null)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ai-action":
        return <Brain className="h-4 w-4 text-blue-600" />
      case "user-confirmation":
        return <User className="h-4 w-4 text-green-600" />
      case "external-app":
        return <ExternalLink className="h-4 w-4 text-purple-600" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ai-action":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "user-confirmation":
        return "bg-green-100 text-green-700 border-green-300"
      case "external-app":
        return "bg-purple-100 text-purple-700 border-purple-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ai-action":
        return "AI Action"
      case "user-confirmation":
        return "User Confirmation"
      case "external-app":
        return "External App"
      default:
        return type
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 border-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "failed":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Decentralized Transparency Log Viewer
          </CardTitle>
          <Badge variant="outline" className="gap-1">
            <Zap className="h-3 w-3" />
            Decentralized
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          <ScrollArea className="h-96">
            <div className="space-y-4 relative pl-16">
              {transparencyLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredLog(log.id)}
                  onMouseLeave={() => setHoveredLog(null)}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-[-32px] top-2 w-4 h-4 rounded-full border-2 border-background ${
                      log.type === "ai-action"
                        ? "bg-blue-500"
                        : log.type === "user-confirmation"
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                  />

                  {/* Log Card */}
                  <Card
                    className={`border-2 transition-all cursor-pointer ${
                      selectedLog === log.id ? "border-primary shadow-lg" : "border-border"
                    } ${hoveredLog === log.id ? "border-primary/50 shadow-md" : ""}`}
                    onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            {getTypeIcon(log.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-sm">{log.action}</h3>
                                {getStatusIcon(log.status)}
                              </div>
                              <div className="text-xs text-muted-foreground">{log.date}</div>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Badge variant="outline" className={`text-xs ${getTypeColor(log.type)}`}>
                              {getTypeLabel(log.type)}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${getStatusColor(log.status)}`}>
                              {log.status}
                            </Badge>
                          </div>
                        </div>

                        {/* Metadata (on hover or selection) */}
                        {(hoveredLog === log.id || selectedLog === log.id) && log.metadata && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pt-2 border-t border-border"
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="text-xs text-muted-foreground p-2 rounded bg-muted border border-border cursor-help">
                                    {log.metadata}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1">
                                    <div className="text-xs font-semibold">Action Details</div>
                                    <div className="text-xs">{log.metadata}</div>
                                    {log.nodeId && (
                                      <div className="text-xs font-mono mt-2">{log.nodeId}</div>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            {log.nodeId && (
                              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                <Shield className="h-3 w-3" />
                                <span className="font-mono">{log.nodeId}</span>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-xs font-semibold mb-2">Legend:</div>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Brain className="h-3 w-3 text-blue-600" />
              <span>AI Action</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-3 w-3 text-green-600" />
              <span>User Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="h-3 w-3 text-purple-600" />
              <span>External App Communication</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

