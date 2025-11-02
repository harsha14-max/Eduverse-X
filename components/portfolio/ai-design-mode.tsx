"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Palette,
} from "lucide-react"

interface AIDesignModeProps {
  onApply: (theme: string) => void
}

const recommendations = [
  {
    type: "layout",
    title: "Layout Improvement",
    description: "Rearrange sections for better visual hierarchy. Move Growth Insights to the top for immediate impact.",
    action: "Apply Layout",
  },
  {
    type: "color",
    title: "Color Palette",
    description: "Consider using a warmer color scheme to match your creative projects. Suggested: Purple and Orange gradient.",
    action: "Apply Colors",
  },
  {
    type: "spacing",
    title: "Spacing Optimization",
    description: "Increase padding in project cards for better readability. This will improve user engagement by 15%.",
    action: "Apply Spacing",
  },
]

export function AIDesignMode({ onApply }: AIDesignModeProps) {
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([])

  const handleToggleRecommendation = (type: string) => {
    setSelectedRecommendations((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    )
  }

  const handleApply = () => {
    // In real app, apply selected recommendations
    onApply("modern") // Apply recommended theme
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="text-sm text-muted-foreground">
        AI has analyzed your portfolio and suggests the following improvements:
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all ${
                selectedRecommendations.includes(rec.type)
                  ? "border-primary border-2 bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleToggleRecommendation(rec.type)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Palette className="h-4 w-4 text-primary" />
                      <div className="text-sm font-semibold">{rec.title}</div>
                      {selectedRecommendations.includes(rec.type) && (
                        <Badge variant="outline" className="text-xs gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          Selected
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{rec.description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
        <Button variant="outline" onClick={() => onApply("modern")}>
          Cancel
        </Button>
        <Button onClick={handleApply} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Apply AI Suggestions
        </Button>
      </div>
    </div>
  )
}

