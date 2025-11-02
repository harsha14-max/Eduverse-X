"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Globe, Database, AlertCircle, CheckCircle2, MapPin, Server } from "lucide-react"

interface StorageNode {
  id: string
  name: string
  location: string
  provider: string
  healthStatus: "healthy" | "warning" | "critical"
  uptime: number
  dataType: string
  encryption: boolean
  lat: number
  lng: number
}

const storageNodes: StorageNode[] = [
  {
    id: "1",
    name: "IPFS Node Alpha",
    location: "New York, USA",
    provider: "IPFS",
    healthStatus: "healthy",
    uptime: 99.9,
    dataType: "User Data",
    encryption: true,
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: "2",
    name: "Filecoin Node Beta",
    location: "London, UK",
    provider: "Filecoin",
    healthStatus: "healthy",
    uptime: 98.5,
    dataType: "Backup Data",
    encryption: true,
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: "3",
    name: "Arweave Node Gamma",
    location: "Tokyo, Japan",
    provider: "Arweave",
    healthStatus: "warning",
    uptime: 95.2,
    dataType: "Audit Logs",
    encryption: true,
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    id: "4",
    name: "Storage Node Delta",
    location: "Berlin, Germany",
    provider: "Decentralized",
    healthStatus: "critical",
    uptime: 85.0,
    dataType: "Temporary Data",
    encryption: false,
    lat: 52.52,
    lng: 13.405,
  },
]

function DataPrivacyStorageMap() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const getHealthColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHealthIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const activeNode = storageNodes.find((n) => n.id === selectedNode)

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Data Privacy & Storage Visualizer</CardTitle>
              <CardDescription className="text-xs">
                Interactive world map with nodes (Three.js/Mapbox in production)
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            View Map
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* World Map Placeholder */}
        <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-border overflow-hidden">
          {/* Map Nodes Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {storageNodes.map((node, index) => {
                const position = {
                  left: `${(node.lng + 180) / 360 * 100}%`,
                  top: `${(90 - node.lat) / 180 * 100}%`,
                }
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className={`absolute w-4 h-4 rounded-full ${getHealthColor(node.healthStatus)} cursor-pointer transition-all hover:scale-150 hover:shadow-lg z-20`}
                    style={position}
                    onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full bg-current opacity-50"
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Map Info */}
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <div className="text-xs text-muted-foreground bg-background/80 p-2 rounded">
              World Map Visualization (Three.js/Mapbox in production)
            </div>
          </div>
        </div>

        {/* Node Details Modal */}
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-muted rounded-lg border border-border"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {getHealthIcon(activeNode.healthStatus)}
                <div>
                  <div className="font-semibold text-sm">{activeNode.name}</div>
                  <div className="text-xs text-muted-foreground">{activeNode.location}</div>
                </div>
              </div>
              <Badge
                variant={
                  activeNode.healthStatus === "healthy"
                    ? "default"
                    : activeNode.healthStatus === "warning"
                    ? "secondary"
                    : "destructive"
                }
                className="text-xs shrink-0"
              >
                {activeNode.healthStatus}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium">Provider:</span> {activeNode.provider}
              </div>
              <div>
                <span className="font-medium">Uptime:</span> {activeNode.uptime}%
              </div>
              <div>
                <span className="font-medium">Data Type:</span> {activeNode.dataType}
              </div>
              <div>
                <span className="font-medium">Encryption:</span>{" "}
                {activeNode.encryption ? "Yes" : "No"}
              </div>
            </div>
          </motion.div>
        )}

        {/* Storage Nodes List */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Storage Nodes</div>
          {storageNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 border rounded-lg transition-all hover:border-primary/50 cursor-pointer ${
                selectedNode === node.id
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
              onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getHealthIcon(node.healthStatus)}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{node.name}</div>
                    <div className="text-xs text-muted-foreground mb-1">{node.location}</div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-xs">
                        {node.provider}
                      </Badge>
                      <Badge
                        variant={node.encryption ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {node.encryption ? "Encrypted" : "Not Encrypted"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground mb-1">Uptime</div>
                  <div className="text-sm font-bold">{node.uptime}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-xs text-muted-foreground">
            Nodes pulse with health status (🟢 healthy, 🟡 warning, 🔴 critical). Click a node to
            see metadata: provider, uptime, data type, encryption.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { DataPrivacyStorageMap }
