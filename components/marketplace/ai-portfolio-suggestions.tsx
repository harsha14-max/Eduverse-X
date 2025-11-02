"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Video, TrendingUp, Plus } from "lucide-react"

export function AIPortfolioSuggestions() {
  const suggestions = [
    {
      id: "1",
      type: "video",
      message: "Add a video demo to attract more downloads",
      action: "Add Demo Video",
      priority: "high",
    },
    {
      id: "2",
      type: "tags",
      message: "Tag with relevant technologies to improve discoverability",
      action: "Update Tags",
      priority: "medium",
    },
    {
      id: "3",
      type: "description",
      message: "Enhance description with more details about features",
      action: "Improve Description",
      priority: "low",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Portfolio Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`p-3 rounded-lg border ${
                  suggestion.priority === "high"
                    ? "bg-primary/5 border-primary/20"
                    : suggestion.priority === "medium"
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1">
                    {suggestion.type === "video" && <Video className="h-4 w-4 text-primary mt-0.5 shrink-0" />}
                    {suggestion.type === "tags" && <TrendingUp className="h-4 w-4 text-primary mt-0.5 shrink-0" />}
                    {suggestion.type === "description" && (
                      <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-1">{suggestion.message}</div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          suggestion.priority === "high"
                            ? "bg-red-50 text-red-700 border-red-300"
                            : suggestion.priority === "medium"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                            : "bg-gray-50 text-gray-700 border-gray-300"
                        }`}
                      >
                        {suggestion.priority === "high"
                          ? "High Priority"
                          : suggestion.priority === "medium"
                          ? "Medium Priority"
                          : "Low Priority"}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 text-xs shrink-0">
                    <Plus className="h-3 w-3" />
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

