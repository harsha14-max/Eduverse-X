"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Brain, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

interface NodeSuggestion {
  nodeId: string
  suggestedNodes: {
    id: string
    type: string
    label: string
    confidence: number
    reason: string
  }[]
}

export function useSmartLinking(currentNodeId: string | null) {
  const [suggestions, setSuggestions] = useState<NodeSuggestion | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (!currentNodeId) return

    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const aiSuggestions = getAISuggestions(currentNodeId)
      setSuggestions(aiSuggestions)
      setIsAnalyzing(false)
      
      if (aiSuggestions.suggestedNodes.length > 0) {
        toast.success("AI suggestions available!", {
          description: `${aiSuggestions.suggestedNodes.length} node suggestions based on context`,
        })
      }
    }, 800)
  }, [currentNodeId])

  return { suggestions, isAnalyzing }
}

function getAISuggestions(nodeId: string): NodeSuggestion {
  // AI suggests next nodes based on current node context
  const suggestionsMap: Record<string, any> = {
    "1": {
      nodeId: "1",
      suggestedNodes: [
        {
          id: "suggest-1",
          type: "aiReasoning",
          label: "AI Reasoning Node",
          confidence: 92,
          reason: "Based on prompt analysis, next step should process the content",
        },
        {
          id: "suggest-2",
          type: "action",
          label: "LinkedIn Post Action",
          confidence: 88,
          reason: "Context suggests posting to LinkedIn",
        },
      ],
    },
    "2": {
      nodeId: "2",
      suggestedNodes: [
        {
          id: "suggest-3",
          type: "aiDecision",
          label: "AI Decision Node",
          confidence: 95,
          reason: "After reasoning, decision point is recommended",
        },
      ],
    },
    "3": {
      nodeId: "3",
      suggestedNodes: [
        {
          id: "suggest-4",
          type: "action",
          label: "LinkedIn Post Action",
          confidence: 98,
          reason: "Decision approved, proceed with posting",
        },
      ],
    },
  }

  return suggestionsMap[nodeId] || { nodeId, suggestedNodes: [] }
}

interface SmartLinkingPanelProps {
  currentNodeId: string | null
  onAddNode: (nodeType: string, label: string) => void
}

export function SmartLinkingPanel({ currentNodeId, onAddNode }: SmartLinkingPanelProps) {
  const { suggestions, isAnalyzing } = useSmartLinking(currentNodeId)

  if (!currentNodeId) {
    return null
  }

  return (
    <AnimatePresence>
      {suggestions && suggestions.suggestedNodes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <Card className="border-2 border-primary shadow-lg bg-background">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">AI Smart Linking</span>
                {isAnalyzing && (
                  <Badge variant="outline" className="text-xs animate-pulse">
                    Analyzing...
                  </Badge>
                )}
              </div>

              <div className="text-xs text-muted-foreground mb-3">
                Based on your current node, AI suggests:
              </div>

              <div className="space-y-2">
                {suggestions.suggestedNodes.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border border-primary/20 bg-primary/5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">{suggestion.label}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {suggestion.reason}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.confidence}%
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 gap-2 text-xs"
                        onClick={() => onAddNode(suggestion.type, suggestion.label)}
                      >
                        <Zap className="h-3 w-3" />
                        Add to Canvas
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Brain className="h-3 w-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground text-center">
                AI analyzes context to suggest optimal next nodes
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

