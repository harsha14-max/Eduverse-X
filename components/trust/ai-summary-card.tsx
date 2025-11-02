"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  ArrowRight,
  Info,
  Plus,
  ExternalLink,
} from "lucide-react"

interface AISummaryCardProps {
  discovery: {
    id: string
    title: string
    source: string
    relevance: string
    match: string
    timestamp: string
  }
}

export function AISummaryCard({ discovery }: AISummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`cursor-pointer transition-all hover:border-primary/50 ${
        isHovered ? "border-primary border-2 shadow-md" : "border-border"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-primary" />
                <div className="text-sm font-semibold">{discovery.title}</div>
                <Badge variant="outline" className="text-xs gap-1">
                  <Info className="h-3 w-3 text-primary" />
                  {discovery.match}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-1">{discovery.source}</div>
              <div className="text-xs text-muted-foreground">{discovery.timestamp}</div>
            </div>
          </div>

          {/* Relevance */}
          <div className="p-2 rounded-lg bg-primary/5 border border-primary/20">
            <div className="text-xs font-medium mb-1">Relevance to You:</div>
            <div className="text-xs text-muted-foreground">{discovery.relevance}</div>
          </div>

          {/* Expanded Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 pt-2 border-t border-border"
              >
                <div className="text-xs text-muted-foreground">
                  AI suggests adding this to your career goals. Estimated relevance: {discovery.match}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2 text-xs">
                    <Plus className="h-3 w-3" />
                    Add to Portfolio
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2 text-xs">
                    <ExternalLink className="h-3 w-3" />
                    Learn More
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover Indicator */}
          {isHovered && !isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <ArrowRight className="h-3 w-3" />
              Click to view details
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

