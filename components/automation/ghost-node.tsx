"use client"

import { memo } from "react"
import { Handle, Position, NodeProps } from "@xyflow/react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Zap, CheckCircle2, Code, Check, X } from "lucide-react"

interface GhostNodeData {
  label: string
  type: "prompt" | "reasoning" | "decision" | "action"
  reason?: string
  onAccept?: () => void
  onDismiss?: () => void
}

export const GhostNode = memo(({ data, selected }: any) => {
  const nodeData = data?.data || data
  
  const getNodeColor = () => {
    switch (nodeData?.type) {
      case "prompt":
        return "border-purple-300 bg-purple-50/50"
      case "reasoning":
        return "border-blue-300 bg-blue-50/50"
      case "decision":
        return "border-green-300 bg-green-50/50"
      case "action":
        return "border-orange-300 bg-orange-50/50"
      default:
        return "border-gray-300 bg-gray-50/50"
    }
  }

  const getNodeIcon = () => {
    switch (nodeData?.type) {
      case "prompt":
        return <Zap className="h-4 w-4 text-purple-400" />
      case "reasoning":
        return <Brain className="h-4 w-4 text-blue-400" />
      case "decision":
        return <CheckCircle2 className="h-4 w-4 text-green-400" />
      case "action":
        return <Code className="h-4 w-4 text-orange-400" />
      default:
        return <Zap className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.6 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Handle type="target" position={Position.Left} />
      
      <Card
        className={`min-w-[200px] border-2 border-dashed ${getNodeColor()} relative opacity-60 hover:opacity-80 transition-opacity`}
      >
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getNodeIcon()}
              <Badge variant="outline" className="text-xs opacity-70">
                {nodeData?.type || "ghost"}
              </Badge>
              <Badge variant="outline" className="text-xs bg-primary/20 border-primary/30">
                AI Suggestion
              </Badge>
            </div>
          </div>
          
          <div className="font-semibold text-sm opacity-80">{nodeData?.label || "Suggested Node"}</div>
          
          {nodeData?.reason && (
            <div className="text-xs text-muted-foreground italic opacity-70">
              {nodeData.reason}
            </div>
          )}
          
          <div className="flex items-center gap-2 pt-2 border-t border-border/30">
            <Button
              variant="default"
              size="sm"
              className="h-6 text-xs gap-1 flex-1"
              onClick={nodeData?.onAccept}
            >
              <Check className="h-3 w-3" />
              Accept
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={nodeData?.onDismiss}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Card>
      
      <Handle type="source" position={Position.Right} />
    </motion.div>
  )
})

GhostNode.displayName = "GhostNode"

