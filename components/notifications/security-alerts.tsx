"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Key,
  Network,
  Lock,
  Unlock,
  ExternalLink,
  Eye,
  Info,
} from "lucide-react"

interface SecurityAlert {
  id: string
  type: "security" | "decentralization" | "node" | "access"
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
  nodeId?: string
  nodeStatus?: "active" | "inactive" | "compromised"
  action?: {
    label: string
    url: string
  }
}

const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: "1",
    type: "security",
    title: "Suspicious Activity Detected",
    description: "Unusual login pattern detected from a new location",
    severity: "high",
    timestamp: "5 minutes ago",
    action: {
      label: "View Details",
      url: "/dashboard/account?tab=security",
    },
  },
  {
    id: "2",
    type: "node",
    title: "IPFS Node Status Changed",
    description: "Node 'ipfs-001' is now active and verified",
    severity: "low",
    timestamp: "15 minutes ago",
    nodeId: "ipfs-001",
    nodeStatus: "active",
  },
  {
    id: "3",
    type: "decentralization",
    title: "DID Credential Expiring Soon",
    description: "Your decentralized identity credential will expire in 7 days",
    severity: "medium",
    timestamp: "1 hour ago",
    action: {
      label: "Renew Credential",
      url: "/dashboard/account?tab=identity",
    },
  },
  {
    id: "4",
    type: "access",
    title: "API Key Rotation Recommended",
    description: "It's been 90 days since your last API key rotation",
    severity: "medium",
    timestamp: "2 hours ago",
    action: {
      label: "Rotate Key",
      url: "/dashboard/settings?tab=api",
    },
  },
]

export function SecurityAlerts() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>(mockSecurityAlerts)
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null)

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return XCircle
      case "high":
        return AlertTriangle
      case "medium":
        return Shield
      case "low":
        return CheckCircle2
      default:
        return Info
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "from-red-500 via-red-600 to-red-700 border-red-300"
      case "high":
        return "from-orange-500 via-orange-600 to-orange-700 border-orange-300"
      case "medium":
        return "from-yellow-500 via-yellow-600 to-yellow-700 border-yellow-300"
      case "low":
        return "from-green-500 via-green-600 to-green-700 border-green-300"
      default:
        return "from-blue-500 via-blue-600 to-blue-700 border-blue-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "security":
        return Shield
      case "node":
        return Network
      case "decentralization":
        return Key
      case "access":
        return Lock
      default:
        return AlertTriangle
    }
  }

  const getNodeStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "text-green-600"
      case "inactive":
        return "text-yellow-600"
      case "compromised":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const criticalAlerts = alerts.filter((a) => a.severity === "critical" || a.severity === "high")

  return (
    <div className="space-y-4">
      {criticalAlerts.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Critical Security Alerts
          </h3>
        </div>
      )}

      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert, index) => {
            const SeverityIcon = getSeverityIcon(alert.severity)
            const TypeIcon = getTypeIcon(alert.type)

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`border-2 bg-gradient-to-br ${getSeverityColor(
                    alert.severity
                  )} text-white cursor-pointer hover:shadow-xl transition-all`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <TypeIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{alert.title}</h3>
                          <Badge
                            variant="outline"
                            className={`text-xs bg-white/20 text-white border-white/30 ${
                              alert.severity === "critical" ? "animate-pulse" : ""
                            }`}
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs opacity-90 line-clamp-2 mb-2">
                          {alert.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs opacity-75">
                            <SeverityIcon className="h-3 w-3" />
                            <span>{alert.timestamp}</span>
                            {alert.nodeId && (
                              <>
                                <span>•</span>
                                <span
                                  className={`flex items-center gap-1 ${getNodeStatusColor(
                                    alert.nodeStatus
                                  )}`}
                                >
                                  <Network className="h-3 w-3" />
                                  {alert.nodeId}
                                </span>
                              </>
                            )}
                          </div>
                          {alert.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-3 text-xs gap-1 bg-white/10 text-white border-white/30 hover:bg-white/20"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.location.href = alert.action!.url
                              }}
                            >
                              <ExternalLink className="h-3 w-3" />
                              {alert.action.label}
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
        </AnimatePresence>
      </div>

      {/* Alert Detail Modal */}
      <Dialog open={selectedAlert !== null} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl">
          {selectedAlert && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getSeverityColor(
                      selectedAlert.severity
                    )} flex items-center justify-center`}
                  >
                    {(() => {
                      const TypeIcon = getTypeIcon(selectedAlert.type)
                      return <TypeIcon className="h-5 w-5 text-white" />
                    })()}
                  </div>
                  {selectedAlert.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold mb-2">Description</div>
                  <div className="text-sm text-muted-foreground">{selectedAlert.description}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">
                      Severity
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getSeverityColor(selectedAlert.severity).split(" ")[0]} text-white border-0`}
                    >
                      {selectedAlert.severity}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">
                      Timestamp
                    </div>
                    <div className="text-sm">{selectedAlert.timestamp}</div>
                  </div>
                  {selectedAlert.nodeId && (
                    <>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">
                          Node ID
                        </div>
                        <div className="text-sm font-mono">{selectedAlert.nodeId}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">
                          Node Status
                        </div>
                        <div
                          className={`text-sm ${getNodeStatusColor(selectedAlert.nodeStatus)}`}
                        >
                          {selectedAlert.nodeStatus}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {selectedAlert.action && (
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedAlert(null)}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        window.location.href = selectedAlert.action!.url
                        setSelectedAlert(null)
                      }}
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {selectedAlert.action.label}
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

