"use client"

import { memo } from "react"
import { Handle, Position, NodeProps } from "@xyflow/react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, CheckCircle2, Code } from "lucide-react"
import { PerformanceGlow } from "./performance-glow"
import { NodeTrustBadge } from "./node-trust-badge"

interface CustomNodeData {
  label: string
  prompt?: string
  reasoning?: string
  decision?: string
  action?: string
  type: "prompt" | "reasoning" | "decision" | "action"
}

export const CustomNode = memo(({ data, selected }: any) => {
  const nodeData = data?.data || data
  const nodeType = (nodeData?.type || "action") as "prompt" | "reasoning" | "decision" | "action"
  
  const getNodeColor = () => {
    switch (nodeType) {
      case "prompt":
        return "border-purple-500 bg-purple-50"
      case "reasoning":
        return "border-blue-500 bg-blue-50"
      case "decision":
        return "border-green-500 bg-green-50"
      case "action":
        return "border-orange-500 bg-orange-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getNodeIcon = () => {
    switch (nodeType) {
      case "prompt":
        return <Zap className="h-4 w-4 text-purple-600" />
      case "reasoning":
        return <Brain className="h-4 w-4 text-blue-600" />
      case "decision":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "action":
        return <Code className="h-4 w-4 text-orange-600" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getNodeBadgeColor = () => {
    switch (nodeType) {
      case "prompt":
        return "bg-purple-100 text-purple-700 border-purple-300"
      case "reasoning":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "decision":
        return "bg-green-100 text-green-700 border-green-300"
      case "action":
        return "bg-orange-100 text-orange-700 border-orange-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  // Get success rate from node data or historical cache (default to 90% if not provided)
  // In production, this would fetch from a historical cache/analytics service
  const nodeId = (data as any)?.id || ""
  const historicalSuccessRate = nodeId ? 
    (typeof window !== "undefined" && (window as any).historicalCache?.[nodeId]) : null
  const successRate = nodeData?.successRate ?? historicalSuccessRate ?? 90

  // Check if node is decentralized (has IPFS/blockchain storage)
  const isDecentralized = nodeData?.isDecentralized || nodeId.includes("decentralized")
  const ipfsCluster = nodeData?.ipfsCluster || (isDecentralized ? 12 : undefined)

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Handle type="target" position={Position.Left} />
      
      <Card
        className={`min-w-[200px] border-2 ${getNodeColor()} relative ${
          selected ? "ring-2 ring-primary ring-offset-2" : ""
        }`}
      >
        {/* Performance Glow */}
        <PerformanceGlow successRate={successRate} />
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getNodeIcon()}
              <Badge variant="outline" className={`text-xs ${getNodeBadgeColor()}`}>
                {nodeType}
              </Badge>
              {isDecentralized && (
                <NodeTrustBadge
                  ipfsCluster={ipfsCluster}
                  isVerified={true}
                  integrity="verified"
                  className="shrink-0"
                />
              )}
            </div>
          </div>
          
          <div className="font-semibold text-sm">{nodeData?.label || "Node"}</div>
          
          {nodeData?.prompt && (
            <div className="text-xs text-muted-foreground">
              <strong>Prompt:</strong> {nodeData.prompt}
            </div>
          )}
          
          {nodeData?.reasoning && (
            <div className="text-xs text-muted-foreground">
              <strong>Reasoning:</strong> {nodeData.reasoning}
            </div>
          )}
          
          {nodeData?.decision && (
            <div className="text-xs text-muted-foreground">
              <strong>Decision:</strong> {nodeData.decision}
            </div>
          )}
          
          {nodeData?.action && (
            <div className="text-xs text-muted-foreground">
              <strong>Action:</strong> {nodeData.action}
            </div>
          )}
        </div>
      </Card>
      
      <Handle type="source" position={Position.Right} />
    </motion.div>
  )
})

CustomNode.displayName = "CustomNode"

