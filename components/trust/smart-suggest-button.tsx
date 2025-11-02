"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Lightbulb,
  CheckCircle2,
  ExternalLink,
} from "lucide-react"

const suggestions = [
  {
    id: "1",
    type: "post",
    title: "Share your Machine Learning journey",
    message: "Based on your recent course completion, share your ML learning experience",
    platforms: ["LinkedIn", "Twitter/X"],
    match: "92%",
  },
  {
    id: "2",
    type: "project",
    title: "Showcase your Weather App",
    message: "Your recent project aligns with trending topics. Share it to boost visibility",
    platforms: ["LinkedIn", "Dev.to"],
    match: "88%",
  },
  {
    id: "3",
    type: "course",
    title: "Next.js Advanced Course",
    message: "Complete your React expertise with Next.js Advanced course",
    platforms: [],
    match: "85%",
  },
]

export function SmartSuggestButton() {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentSuggestion, setCurrentSuggestion] = useState<any>(null)

  const handleGenerate = () => {
    // Simulate AI generation
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    setCurrentSuggestion(randomSuggestion)
    setShowSuggestions(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Smart Suggest</CardTitle>
            <CardDescription className="text-xs">
              One-click AI idea generator for growth
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          onClick={handleGenerate}
          className="w-full gap-2"
          size="lg"
        >
          <Sparkles className="h-5 w-5" />
          Suggest me a post idea related to what I'm learning this week
        </Button>

        {showSuggestions && currentSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <div className="text-sm font-semibold">{currentSuggestion.title}</div>
                  <Badge variant="outline" className="text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    {currentSuggestion.match} Match
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">{currentSuggestion.message}</div>
                {currentSuggestion.platforms.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {currentSuggestion.platforms.map((platform: string) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-2 rounded-lg bg-background border border-border">
              <div className="text-xs font-medium mb-1">AI-suggested based on verified web trend data</div>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                <ExternalLink className="h-3 w-3" />
                View Source
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowSuggestions(false)}>
                Dismiss
              </Button>
              <Button size="sm" className="flex-1 gap-2">
                Use This Idea
                <Sparkles className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}

        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <div className="text-xs text-muted-foreground">
            AI analyzes your learning profile, recent activities, and trending topics to suggest the best growth opportunities
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

