"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  TrendingUp,
  Flame,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const trends = [
  {
    id: "1",
    topic: "Generative AI Tools 2025",
    category: "AI",
    engagement: "72% engagement spike this week",
    match: "High",
    timestamp: "Just now",
  },
  {
    id: "2",
    topic: "Next.js 15 Features",
    category: "Web Dev",
    engagement: "58% engagement spike",
    match: "High",
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    topic: "Cloud Infrastructure Best Practices",
    category: "DevOps",
    engagement: "45% engagement spike",
    match: "Medium",
    timestamp: "5 hours ago",
  },
  {
    id: "4",
    topic: "React Server Components",
    category: "Web Dev",
    engagement: "63% engagement spike",
    match: "High",
    timestamp: "1 day ago",
  },
]

export function TrendSynchronizer() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Trend Synchronizer</CardTitle>
            <CardDescription className="text-xs">
              Trending topics across your learning categories
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3 pr-4">
            {trends.map((trend, index) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Flame className="h-4 w-4 text-orange-600" />
                        <div className="text-sm font-semibold">{trend.topic}</div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            trend.match === "High"
                              ? "bg-green-50 text-green-700 border-green-300"
                              : "bg-yellow-50 text-yellow-700 border-yellow-300"
                          }`}
                        >
                          {trend.match} Match
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {trend.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Engagement */}
                  <div className="p-2 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-xs font-medium mb-1">🔥 Engagement Spike</div>
                    <div className="text-xs text-muted-foreground">{trend.engagement}</div>
                  </div>

                  {/* Action */}
                  <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                    <Sparkles className="h-3 w-3" />
                    Generate Post
                    <ArrowRight className="h-3 w-3" />
                  </Button>

                  {/* Timestamp */}
                  <div className="text-xs text-muted-foreground">{trend.timestamp}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

