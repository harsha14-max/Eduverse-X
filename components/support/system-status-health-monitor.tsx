"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  Bell,
  BellOff,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface SystemStatus {
  name: string
  status: "operational" | "minor" | "critical"
  uptime: number
  latency: number
  lastSync: string
}

const systemStatuses: SystemStatus[] = [
  {
    name: "Main API",
    status: "operational",
    uptime: 99.9,
    latency: 120,
    lastSync: "2 minutes ago",
  },
  {
    name: "AI Services",
    status: "operational",
    uptime: 99.8,
    latency: 180,
    lastSync: "1 minute ago",
  },
  {
    name: "Instagram API",
    status: "minor",
    uptime: 95.2,
    latency: 450,
    lastSync: "5 minutes ago",
  },
  {
    name: "LinkedIn API",
    status: "operational",
    uptime: 98.5,
    latency: 200,
    lastSync: "3 minutes ago",
  },
  {
    name: "Database",
    status: "operational",
    uptime: 99.95,
    latency: 50,
    lastSync: "30 seconds ago",
  },
]

export function SystemStatusHealthMonitor() {
  const [alertsEnabled, setAlertsEnabled] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "minor":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "critical":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-700 border-green-300"
      case "minor":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "critical":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return ""
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "operational":
        return "All Good"
      case "minor":
        return "Minor Issues"
      case "critical":
        return "Critical Outage"
      default:
        return status
    }
  }

  const overallStatus =
    systemStatuses.every((s) => s.status === "operational")
      ? "operational"
      : systemStatuses.some((s) => s.status === "critical")
      ? "critical"
      : "minor"

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              System Status & Health Monitor
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="alerts"
                  checked={alertsEnabled}
                  onCheckedChange={setAlertsEnabled}
                />
                <Label htmlFor="alerts" className="text-sm flex items-center gap-2 cursor-pointer">
                  {alertsEnabled ? (
                    <>
                      <Bell className="h-4 w-4" />
                      Alerts On
                    </>
                  ) : (
                    <>
                      <BellOff className="h-4 w-4" />
                      Alerts Off
                    </>
                  )}
                </Label>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Overall Status */}
          <div className="mb-6 p-4 rounded-lg border-2 border-border bg-muted">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(overallStatus)}
                <span className="font-semibold">Overall System Status</span>
              </div>
              <Badge variant="outline" className={`text-xs ${getStatusColor(overallStatus)}`}>
                {getStatusLabel(overallStatus)}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {overallStatus === "operational"
                ? "All systems are operational"
                : overallStatus === "minor"
                ? "Some services experiencing minor issues"
                : "Critical outage detected"}
            </div>
          </div>

          {/* System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemStatuses.map((system, index) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm">{system.name}</h3>
                            {getStatusIcon(system.status)}
                          </div>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(system.status)}`}>
                            {getStatusLabel(system.status)}
                          </Badge>
                        </div>
                      </div>

                      {/* Uptime */}
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Uptime</span>
                          <span className="font-semibold">{system.uptime}%</span>
                        </div>
                        <Progress value={system.uptime} className="h-2" />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Zap className="h-3 w-3" />
                          <span>{system.latency}ms</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{system.lastSync}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

