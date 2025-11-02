"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  X,
  Check,
  ArrowRight,
  Brain,
} from "lucide-react"

interface AINodeSuggestion {
  id: string
  suggestion: string
  nodeType: string
  position: { x: number; y: number }
  reason: string
}

interface AINodeSuggestionsProps {
  suggestions: AINodeSuggestion[]
  onAccept: (suggestion: AINodeSuggestion) => void
  onDismiss: (id: string) => void
}

export function AINodeSuggestions({ suggestions, onAccept, onDismiss }: AINodeSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <AnimatePresence>
      {suggestions.map((suggestion) => (
        <motion.div
          key={suggestion.id}
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute z-50"
          style={{
            left: `${suggestion.position.x}px`,
            top: `${suggestion.position.y}px`,
          }}
        >
          <Card className="border-primary/50 bg-primary/10 shadow-lg min-w-[280px]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <div className="text-sm font-semibold">AI Suggestion</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onDismiss(suggestion.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                {suggestion.suggestion}
              </div>
              <div className="text-xs text-muted-foreground mb-3 italic">
                {suggestion.reason}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onAccept(suggestion)}
                  className="gap-2 text-xs flex-1"
                >
                  <Check className="h-3 w-3" />
                  Add Node
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDismiss(suggestion.id)}
                  className="text-xs"
                >
                  Ignore
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

