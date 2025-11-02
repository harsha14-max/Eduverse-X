"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Network,
  Lock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Server,
} from "lucide-react"

const nodes = [
  { id: "1", name: "IPFS Node #45", status: "verified", location: "US-East", type: "Storage" },
  { id: "2", name: "IPFS Node #23", status: "verified", location: "EU-West", type: "Storage" },
  { id: "3", name: "Verification Node #12", status: "active", location: "Asia-Pacific", type: "Verification" },
  { id: "4", name: "Execution Node #8", status: "active", location: "US-West", type: "Execution" },
]

const securityLogs = [
  {
    id: "1",
    type: "verification",
    message: "IPFS Node #45 verified new data block for your automation",
    timestamp: "2 minutes ago",
    status: "success",
  },
  {
    id: "2",
    type: "access",
    message: "New access request from trusted device",
    timestamp: "15 minutes ago",
    status: "pending",
  },
  {
    id: "3",
    type: "verification",
    message: "DID identity verified for portfolio update",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: "4",
    type: "alert",
    message: "Unusual activity detected in verification node",
    timestamp: "2 hours ago",
    status: "warning",
  },
]

export function SecurityNodesTab() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500"
      case "active":
        return "bg-blue-500"
      case "warning":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Node Status Overview */}
      <div className="grid lg:grid-cols-4 gap-4">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                selectedNode === node.id ? "border-primary border-2" : ""
              }`}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(node.status)}`} />
                    <div className="text-sm font-medium">{node.name}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {node.type}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{node.location}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Security Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Security Logs</CardTitle>
              <CardDescription className="text-xs">
                Recent security events and verifications
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                {getStatusIcon(log.status)}
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1">{log.message}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {log.type}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Decentralized Execution Map */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Network className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Decentralized Execution Map</CardTitle>
              <CardDescription className="text-xs">
                Network visualization of nodes and data flow
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 rounded-lg border border-border bg-muted/30 flex items-center justify-center">
            <div className="text-center">
              <Network className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                Network visualization (ready for ReactFlow/D3.js integration)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Control & Privacy Settings */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Access Control</CardTitle>
                <CardDescription className="text-xs">
                  Manage permissions and access levels
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="text-sm font-medium">Public Portfolio</div>
                <Badge variant="outline" className="text-xs">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="text-sm font-medium">API Access</div>
                <Badge variant="outline" className="text-xs">Restricted</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="text-sm font-medium">Automation Execution</div>
                <Badge variant="outline" className="text-xs">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Privacy Settings</CardTitle>
                <CardDescription className="text-xs">
                  Control data sharing and privacy levels
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="text-sm font-medium">Data Encryption</div>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="text-sm font-medium">IPFS Storage</div>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="text-sm font-medium">Analytics Sharing</div>
                <Badge variant="outline" className="text-xs">Opt-In</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

