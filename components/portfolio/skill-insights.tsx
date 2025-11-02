"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Brain, ArrowRight, Sparkles } from "lucide-react"

const insights = [
  {
    type: "trending",
    title: "Trending Skill",
    message: "You're trending in Full Stack Web Dev — +8% skill score this month.",
    action: "View Details",
  },
  {
    type: "recommendation",
    title: "Skill Gap Recommendation",
    message: "Recommended: Learn Cloud Deployment to complement your Backend skills.",
    action: "Find Courses",
  },
  {
    type: "suggestion",
    title: "Complementary Skill",
    message: "Based on your React expertise, consider learning Next.js for better job prospects.",
    action: "Explore",
  },
]

export function SkillInsights() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <div className="text-sm font-semibold">AI Skill Insights</div>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg bg-background border border-border"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {insight.type === "trending" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <Sparkles className="h-3 w-3 mr-1" />
                      )}
                      {insight.title}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{insight.message}</div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  {insight.action}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

