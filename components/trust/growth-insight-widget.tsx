"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Sparkles,
  Linkedin,
  ArrowRight,
} from "lucide-react"

const growthInsights = [
  {
    id: "1",
    message: "AI found 3 trending LinkedIn topics in Cloud AI",
    action: "Generate Post",
    timestamp: "5 minutes ago",
    match: "92%",
  },
  {
    id: "2",
    message: "New course recommendation based on your skills",
    action: "View Course",
    timestamp: "15 minutes ago",
    match: "88%",
  },
  {
    id: "3",
    message: "Portfolio update opportunity detected",
    action: "Add to Portfolio",
    timestamp: "30 minutes ago",
    match: "85%",
  },
]

export function GrowthInsightWidget() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-5 w-5 text-primary" />
        <div className="text-sm font-semibold">Growth Insights</div>
        <Badge variant="outline" className="text-xs">AI-Powered</Badge>
      </div>
      {growthInsights.map((insight, index) => (
        <motion.div
          key={insight.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">{insight.message}</div>
                    <div className="text-xs text-muted-foreground">{insight.timestamp}</div>
                  </div>
                  <Badge variant="outline" className="text-xs gap-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    {insight.match} Match
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                  {insight.action === "Generate Post" && <Linkedin className="h-3 w-3" />}
                  {insight.action}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-xs font-medium">5 AI recommendations available</div>
            <Badge variant="outline" className="text-xs ml-auto">View All</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

