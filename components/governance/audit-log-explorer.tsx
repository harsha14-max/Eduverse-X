"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, XCircle, Clock, AlertCircle, Shield } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AuditEvent {
  id: string
  action: string
  resource: string
  status: "granted" | "denied" | "expired"
  duration: string
  timestamp: string
  hash: string
}

const auditEvents: AuditEvent[] = [
  {
    id: "1",
    action: "AI requested Twitter Write Access",
    resource: "Twitter Account",
    status: "granted",
    duration: "Temporary 24h",
    timestamp: "2 hours ago",
    hash: "0x1234...5678",
  },
  {
    id: "2",
    action: "Course data exported to IPFS",
    resource: "IPFS Storage",
    status: "granted",
    duration: "Auto-Encrypted",
    timestamp: "1 day ago",
    hash: "0xabcd...efgh",
  },
  {
    id: "3",
    action: "AI requested Notion Write Access",
    resource: "Notion Workspace",
    status: "granted",
    duration: "Temporary 12h",
    timestamp: "3 days ago",
    hash: "0xijkl...mnop",
  },
  {
    id: "4",
    action: "Permission expired",
    resource: "LinkedIn Account",
    status: "expired",
    duration: "Expired",
    timestamp: "5 days ago",
    hash: "0xqrst...uvwx",
  },
]

function AuditLogExplorer() {
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredEvents =
    filterStatus === "all"
      ? auditEvents
      : auditEvents.filter((e) => e.status === filterStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "granted":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "denied":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "expired":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "granted":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "denied":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      case "expired":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* Filter */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Audit Log Timeline</div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="granted">Granted</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timeline Cards */}
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 border rounded-lg transition-all ${getStatusColor(event.status)}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {getStatusIcon(event.status)}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-1">{event.action}</div>
                      <div className="text-xs text-muted-foreground">{event.resource}</div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      event.status === "granted"
                        ? "default"
                        : event.status === "denied"
                        ? "destructive"
                        : "secondary"
                    }
                    className="text-xs shrink-0"
                  >
                    {event.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                  <div>
                    <span className="font-medium">Duration:</span> {event.duration}
                  </div>
                  <div>
                    <span className="font-medium">Timestamp:</span> {event.timestamp}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Shield className="h-3 w-3 text-muted-foreground" />
                  <span className="font-mono text-muted-foreground">Hash: {event.hash}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Summary */}
        <div className="p-3 bg-muted rounded-lg border border-border">
          <div className="text-xs text-muted-foreground">
            <div className="font-medium mb-1">AI Summary:</div>
            <div>
              You granted {filteredEvents.filter((e) => e.status === "granted").length}{" "}
              permissions this week; all expire within 2 days.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { AuditLogExplorer }
