"use client"

import { memo, useState } from "react"
import { Handle, Position, NodeProps } from "@xyflow/react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Workflow, Zap } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SubFlowNodeData {
  label: string
  subFlowId: string
  subFlowName: string
  nodeCount: number
  isCollapsed: boolean
  type: "subflow"
}

export const SubFlowNode = memo(({ data, selected }: any) => {
  const nodeData = data?.data || data
  const [isCollapsed, setIsCollapsed] = useState(nodeData?.isCollapsed ?? true)
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Handle type="target" position={Position.Left} />
      
      <Card
        className={`min-w-[200px] border-2 border-purple-500 bg-purple-50 ${
          selected ? "ring-2 ring-primary ring-offset-2" : ""
        }`}
      >
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-purple-600" />
              <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                Sub-flow
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronUp className="h-3 w-3" />
              )}
            </Button>
          </div>
          
          <div className="font-semibold text-sm">{nodeData?.label || "Sub-flow"}</div>
          
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-2 space-y-2 border-t border-border"
            >
              <div className="text-xs text-muted-foreground">
                <strong>Sub-flow:</strong> {nodeData?.subFlowName || "Untitled"}
              </div>
              <div className="text-xs text-muted-foreground">
                <strong>Nodes:</strong> {nodeData?.nodeCount || 0}
              </div>
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                    <Zap className="h-3 w-3" />
                    View Sub-flow
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>{nodeData?.subFlowName || "Untitled"}</DialogTitle>
                    <DialogDescription>
                      Nested workflow containing {nodeData?.nodeCount || 0} nodes
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Sub-flow Preview */}
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="text-sm font-medium mb-2">Sub-flow Nodes:</div>
                      <div className="space-y-2">
                        {Array.from({ length: nodeData?.nodeCount || 0 }, (_, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded bg-background"
                          >
                            <Zap className="h-3 w-3 text-primary" />
                            <span className="text-xs">Node {i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Sub-flows allow you to create reusable workflow components that can be
                      embedded in larger flows. They can be collapsed for cleaner visualization.
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          )}
          
          <div className="text-xs text-muted-foreground">
            {isCollapsed ? `${nodeData?.nodeCount || 0} nodes` : "Click to expand"}
          </div>
        </div>
      </Card>
      
      <Handle type="source" position={Position.Right} />
    </>
  )
})

SubFlowNode.displayName = "SubFlowNode"

