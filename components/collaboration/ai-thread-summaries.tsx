"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Pin, MessageSquare } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ThreadSummary {
  threadId: string
  summary: string
  pinned: boolean
}

interface AIThreadSummariesProps {
  threadId: string
  messages: { id: string; user: string; content: string; timestamp: string }[]
  onSummaryGenerated?: (summary: string) => void
}

export function AIThreadSummaries({
  threadId,
  messages,
  onSummaryGenerated,
}: AIThreadSummariesProps) {
  const [summary, setSummary] = useState<ThreadSummary | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateSummary = () => {
    setIsGenerating(true)
    // Simulate AI summary generation
    setTimeout(() => {
      const generatedSummary: ThreadSummary = {
        threadId,
        summary: `Summary: The team discussed error handling for API failures, agreed to use environment variables for API keys, and approved the current implementation. Key points: ${messages.length} messages exchanged, 3 solutions proposed, 1 accepted.`,
        pinned: false,
      }
      setSummary(generatedSummary)
      setIsGenerating(false)
      if (onSummaryGenerated) {
        onSummaryGenerated(generatedSummary.summary)
      }
    }, 2000)
  }

  const handleTogglePin = () => {
    if (summary) {
      setSummary({ ...summary, pinned: !summary.pinned })
    }
  }

  return (
    <div className="space-y-2">
      {/* Generate Summary Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="gap-2 text-xs"
            >
              <Sparkles className={`h-3 w-3 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Generating..." : "Summarize Thread"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">AI will summarize the conversation</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Summary Display */}
      <AnimatePresence>
        {summary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-3 rounded-lg border ${
              summary.pinned
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/50"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-primary" />
                <Badge variant="outline" className="text-xs">
                  AI Summary
                </Badge>
                {summary.pinned && (
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                    <Pin className="h-3 w-3 mr-1" />
                    Pinned
                  </Badge>
                )}
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={handleTogglePin}
              >
                <Pin className={`h-3 w-3 ${summary.pinned ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">{summary.summary}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

