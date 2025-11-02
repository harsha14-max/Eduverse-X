"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  ChevronUp,
  ChevronDown,
  Info,
  Zap,
  Brain,
  CheckCircle2,
  Code,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NodeHelpInfo {
  type: "prompt" | "reasoning" | "decision" | "action"
  name: string
  description: string
  purpose: string
  useCases: string[]
  icon: typeof Zap
}

const nodeHelpInfo: Record<string, NodeHelpInfo> = {
  prompt: {
    type: "prompt",
    name: "AI Prompt Node",
    description: "The starting point for AI-powered workflows",
    purpose: "Receives user input or triggers and initiates AI processing",
    useCases: [
      "User input collection",
      "Webhook triggers",
      "Scheduled events",
      "Manual workflow start",
    ],
    icon: Zap,
  },
  reasoning: {
    type: "reasoning",
    name: "AI Reasoning Node",
    description: "AI analyzes and processes data using intelligent reasoning",
    purpose: "Performs AI-powered analysis, summarization, or decision-making",
    useCases: [
      "Content summarization",
      "Data analysis",
      "Text processing",
      "AI-powered transformations",
    ],
    icon: Brain,
  },
  decision: {
    type: "decision",
    name: "AI Decision Node",
    description: "AI makes decisions based on criteria and context",
    purpose: "Evaluates conditions and routes workflow based on AI decisions",
    useCases: [
      "Content approval",
      "Conditional routing",
      "Quality checks",
      "Smart filtering",
    ],
    icon: CheckCircle2,
  },
  action: {
    type: "action",
    name: "Action Node",
    description: "Executes actions on external platforms or services",
    purpose: "Performs actual operations like posting, syncing, or updating",
    useCases: [
      "Social media posting",
      "API calls",
      "Data synchronization",
      "File operations",
    ],
    icon: Code,
  },
}

interface AIHelpDrawerProps {
  selectedNodeType?: string
  className?: string
}

export function AIHelpDrawer({ selectedNodeType, className }: AIHelpDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedNodeType, setExpandedNodeType] = useState<string | null>(selectedNodeType || null)

  const nodeTypes = Object.values(nodeHelpInfo)

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isExpanded ? 0 : "calc(100% - 48px)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background shadow-lg ${className}`}
    >
      <div className="container mx-auto">
        {/* Header - Always Visible */}
        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <div className="text-sm font-semibold">AI Help Drawer</div>
            <Badge variant="outline" className="text-xs">Node Guide</Badge>
          </div>
          <div className="flex items-center gap-2">
            {expandedNodeType && (
              <Badge variant="outline" className="text-xs">
                {nodeHelpInfo[expandedNodeType]?.name || "Selected Node"}
              </Badge>
            )}
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border"
            >
              <ScrollArea className="max-h-[400px]">
                <div className="p-4 space-y-4">
                  {/* Selected Node Info */}
                  {expandedNodeType && nodeHelpInfo[expandedNodeType] && (
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          {(() => {
                            const Icon = nodeHelpInfo[expandedNodeType].icon
                            return <Icon className="h-4 w-4 text-primary" />
                          })()}
                          {nodeHelpInfo[expandedNodeType].name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="text-xs font-semibold mb-1">Description:</div>
                          <div className="text-xs text-muted-foreground">
                            {nodeHelpInfo[expandedNodeType].description}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold mb-1">Purpose:</div>
                          <div className="text-xs text-muted-foreground">
                            {nodeHelpInfo[expandedNodeType].purpose}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold mb-2">Common Use Cases:</div>
                          <div className="space-y-1">
                            {nodeHelpInfo[expandedNodeType].useCases.map((useCase, index) => (
                              <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <Info className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                                <span>{useCase}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* All Node Types */}
                  <div>
                    <div className="text-xs font-semibold mb-3">All Node Types:</div>
                    <div className="grid grid-cols-2 gap-3">
                      {nodeTypes.map((nodeInfo) => {
                        const Icon = nodeInfo.icon
                        const isSelected = expandedNodeType === nodeInfo.type
                        
                        return (
                          <Card
                            key={nodeInfo.type}
                            className={`border cursor-pointer transition-colors ${
                              isSelected
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setExpandedNodeType(nodeInfo.type)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className="h-4 w-4 text-primary" />
                                <div className="text-xs font-semibold">{nodeInfo.name}</div>
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-2">
                                {nodeInfo.description}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quick Tips */}
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs font-semibold mb-2">Quick Tips:</div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <Info className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                        <span>Hover over nodes to see detailed information</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                        <span>Connect nodes by dragging from output to input handles</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                        <span>Use AI suggestions to automatically build workflows</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

