"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Network,
  X,
  ChevronDown,
  ChevronUp,
  Globe,
  Server,
  Database,
  Shield,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DecentralizedNode {
  id: string
  type: "ipfs" | "blockchain" | "storage"
  location: string
  status: "active" | "pending" | "inactive"
  cluster?: number
}

const decentralizedNodes: DecentralizedNode[] = [
  { id: "ipfs-1", type: "ipfs", location: "Cluster #12", status: "active", cluster: 12 },
  { id: "ipfs-2", type: "ipfs", location: "Cluster #8", status: "active", cluster: 8 },
  { id: "blockchain-1", type: "blockchain", location: "Polygon Network", status: "active" },
  { id: "storage-1", type: "storage", location: "Supabase", status: "active" },
  { id: "ipfs-3", type: "ipfs", location: "Cluster #5", status: "pending", cluster: 5 },
]

interface DecentralizedRunMapProps {
  isOpen?: boolean
  onToggle?: () => void
}

export function DecentralizedRunMap({ isOpen = false, onToggle }: DecentralizedRunMapProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen)

  const getNodeIcon = (type: DecentralizedNode["type"]) => {
    switch (type) {
      case "ipfs":
        return <Network className="h-4 w-4 text-blue-600" />
      case "blockchain":
        return <Globe className="h-4 w-4 text-green-600" />
      case "storage":
        return <Database className="h-4 w-4 text-purple-600" />
    }
  }

  const getStatusColor = (status: DecentralizedNode["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "inactive":
        return "bg-gray-400"
    }
  }

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="fixed bottom-4 left-4 z-40 w-80"
        >
          <Card className="border-primary/20 bg-primary/5 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Network className="h-4 w-4 text-primary" />
                  Decentralized Run Map
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs gap-1">
                    <Shield className="h-3 w-3 text-green-600" />
                    Secure
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setIsExpanded(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="max-h-64">
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground mb-3">
                    Data routing visualization for current automation
                  </div>
                  
                  {/* Network Graph Preview */}
                  <div className="relative h-32 bg-background rounded-lg border border-border p-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Server className="h-8 w-8 text-primary" />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        </div>
                        <div className="h-0.5 w-8 bg-primary/30" />
                        <div className="relative">
                          <Network className="h-8 w-8 text-blue-600" />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        </div>
                        <div className="h-0.5 w-8 bg-primary/30" />
                        <div className="relative">
                          <Globe className="h-8 w-8 text-green-600" />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Node List */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold">Active Nodes:</div>
                    {decentralizedNodes.map((node) => {
                      const Icon = getNodeIcon(node.type)
                      return (
                        <div
                          key={node.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-background border border-border"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {Icon}
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold truncate">{node.location}</div>
                              <div className="text-xs text-muted-foreground">{node.type}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(node.status)}`} />
                            {node.cluster && (
                              <Badge variant="outline" className="text-xs">
                                #{node.cluster}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Summary */}
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Total Nodes:</span>
                      <Badge variant="outline" className="text-xs">
                        {decentralizedNodes.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Active:</span>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                        {decentralizedNodes.filter(n => n.status === "active").length}
                      </Badge>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Toggle Button */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 left-4 z-40"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="gap-2 shadow-lg"
          >
            <Network className="h-4 w-4" />
            <span className="text-xs">Decentralized Map</span>
            <ChevronUp className="h-3 w-3" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

