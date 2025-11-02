"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Wrench,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react"

interface AIRepairSuggestion {
  id: string
  nodeId: string
  issue: string
  possibleFix: string
  action: string
  confidence?: number
  errorType?: "api_key" | "connection" | "timeout" | "validation" | "rate_limit" | "unknown"
}

interface AIRepairModeProps {
  suggestion: AIRepairSuggestion | null
  onFix: (suggestion: AIRepairSuggestion) => void
  onDismiss: () => void
}

// Frontend AI detection for common failure patterns
export function detectFailurePattern(errorMessage: string, nodeLabel: string, nodeType: string): AIRepairSuggestion | null {
  const errorLower = errorMessage.toLowerCase()
  const labelLower = nodeLabel.toLowerCase()
  
  // API Key detection
  if (errorLower.includes("api key") || errorLower.includes("api_key") || errorLower.includes("authentication") || errorLower.includes("unauthorized")) {
    return {
      id: `repair-${Date.now()}`,
      nodeId: "",
      issue: `Node "${nodeLabel}" failed: Missing or expired API key`,
      possibleFix: "API key may be missing or expired. Would you like to regenerate token?",
      action: "Regenerate Token",
      confidence: 95,
      errorType: "api_key",
    }
  }
  
  // Connection issues
  if (errorLower.includes("connection") || errorLower.includes("network") || errorLower.includes("timeout")) {
    return {
      id: `repair-${Date.now()}`,
      nodeId: "",
      issue: `Node "${nodeLabel}" failed: Connection timeout or network error`,
      possibleFix: "Check your internet connection or try increasing timeout duration",
      action: "Retry Connection",
      confidence: 85,
      errorType: "connection",
    }
  }
  
  // Rate limit detection
  if (errorLower.includes("rate limit") || errorLower.includes("too many requests") || errorLower.includes("429")) {
    return {
      id: `repair-${Date.now()}`,
      nodeId: "",
      issue: `Node "${nodeLabel}" failed: Rate limit exceeded`,
      possibleFix: "API rate limit reached. Consider adding a delay node or upgrading your API plan",
      action: "Add Delay Node",
      confidence: 90,
      errorType: "rate_limit",
    }
  }
  
  // Validation errors
  if (errorLower.includes("validation") || errorLower.includes("invalid") || errorLower.includes("format")) {
    return {
      id: `repair-${Date.now()}`,
      nodeId: "",
      issue: `Node "${nodeLabel}" failed: Invalid input format or validation error`,
      possibleFix: "Check input data format and required fields. Node may need different input structure",
      action: "Fix Input",
      confidence: 80,
      errorType: "validation",
    }
  }
  
  // Generic timeout
  if (errorLower.includes("timeout")) {
    return {
      id: `repair-${Date.now()}`,
      nodeId: "",
      issue: `Node "${nodeLabel}" failed: Request timeout`,
      possibleFix: "Request took too long. Try increasing timeout duration or check if service is available",
      action: "Increase Timeout",
      confidence: 75,
      errorType: "timeout",
    }
  }
  
  return null
}

export function AIRepairMode({ suggestion, onFix, onDismiss }: AIRepairModeProps) {
  if (!suggestion) return null
  
  const confidenceColor = suggestion.confidence && suggestion.confidence >= 90 ? "text-green-600" : suggestion.confidence && suggestion.confidence >= 70 ? "text-yellow-600" : "text-red-600"

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Card className="border-red-300 bg-red-50/50 shadow-lg min-w-[320px]">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="text-sm font-semibold">AI Repair Mode</div>
              </div>
              <Badge variant="outline" className="text-xs gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                Auto-Detected
                {suggestion.confidence !== undefined && (
                  <span className={`ml-1 ${confidenceColor}`}>
                    {suggestion.confidence}%
                  </span>
                )}
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium mb-1">Issue Detected</div>
                <div className="text-sm text-muted-foreground">{suggestion.issue}</div>
              </div>

              <div>
                <div className="text-xs font-medium mb-1">Possible Fix</div>
                <div className="text-sm text-muted-foreground">{suggestion.possibleFix}</div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onFix(suggestion)}
                  className="gap-2 text-xs flex-1"
                >
                  <Wrench className="h-3 w-3" />
                  {suggestion.action}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDismiss}
                  className="text-xs"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

