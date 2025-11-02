"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, CheckCircle2, ArrowRight, X } from "lucide-react"

interface OptimizationSuggestion {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  type: "timing" | "connection" | "efficiency" | "logic"
}

interface WorkflowOptimizationModalProps {
  open: boolean
  onClose: () => void
  workflowId: string
  workflowName: string
}

const mockSuggestions: OptimizationSuggestion[] = [
  {
    id: "1",
    title: "Add delay before post for better timing",
    description: "Adding a 2-hour delay before posting improves engagement by 15% based on historical data",
    impact: "high",
    type: "timing",
  },
  {
    id: "2",
    title: "Optimize API connection retry logic",
    description: "Current retry logic may cause failures. Implementing exponential backoff will improve reliability",
    impact: "medium",
    type: "connection",
  },
  {
    id: "3",
    title: "Combine duplicate API calls",
    description: "Two separate API calls can be merged into one, reducing execution time by 30%",
    impact: "medium",
    type: "efficiency",
  },
  {
    id: "4",
    title: "Add error handling for edge cases",
    description: "Adding error handling for rate limits and API failures will improve success rate",
    impact: "low",
    type: "logic",
  },
]

export function WorkflowOptimizationModal({
  open,
  onClose,
  workflowId,
  workflowName,
}: WorkflowOptimizationModalProps) {
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>(mockSuggestions)
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set())

  const handleApply = (suggestionId: string) => {
    // Frontend-only: simulate applying suggestion
    console.log(`Applying suggestion ${suggestionId} to workflow ${workflowId}`)
    setAppliedSuggestions(new Set([...appliedSuggestions, suggestionId]))
    // In real app, this would send API request to backend
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "low":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "timing":
        return "⏰"
      case "connection":
        return "🔌"
      case "efficiency":
        return "⚡"
      case "logic":
        return "🧠"
      default:
        return "💡"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Optimization Suggestions
          </DialogTitle>
          <DialogDescription>
            AI-generated suggestions for optimizing "{workflowName}"
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-3 mt-4">
            {suggestions.map((suggestion) => {
              const isApplied = appliedSuggestions.has(suggestion.id)
              return (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-lg p-4 ${getImpactColor(suggestion.impact)} ${
                    isApplied ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-2xl shrink-0">
                        {getTypeIcon(suggestion.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-semibold text-sm">{suggestion.title}</div>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.impact} impact
                          </Badge>
                          {isApplied && (
                            <Badge variant="default" className="text-xs bg-green-600">
                              Applied
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mb-3">
                          {suggestion.description}
                        </div>
                        {!isApplied && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-xs gap-1"
                            onClick={() => handleApply(suggestion.id)}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            Apply Suggestion
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            {appliedSuggestions.size} of {suggestions.length} suggestions applied
          </div>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
