"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, Flame, Zap } from "lucide-react"

interface Trend {
  id: string
  topic: string
  category: string
  engagement: number
  change: number
  icon: typeof Flame
}

const trends: Trend[] = [
  { id: "1", topic: "AI Career Trends", category: "AI", engagement: 85, change: 12, icon: Flame },
  { id: "2", topic: "React 19 Features", category: "Tech", engagement: 72, change: 8, icon: Zap },
  { id: "3", topic: "Web3 Development", category: "Web3", engagement: 68, change: -5, icon: TrendingUp },
  { id: "4", topic: "Machine Learning", category: "AI", engagement: 65, change: 15, icon: Flame },
  { id: "5", topic: "TypeScript Patterns", category: "Tech", engagement: 58, change: 3, icon: Zap },
]

export function TrendExplorer() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold">Trending Topics</h3>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-3">
          {trends.map((trend) => {
            const Icon = trend.icon
            return (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="text-sm font-semibold mb-1">{trend.topic}</h4>
                          <Badge variant="outline" className="text-xs">
                            {trend.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{trend.engagement}%</div>
                        <div
                          className={`text-xs ${
                            trend.change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {trend.change > 0 ? "+" : ""}
                          {trend.change}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

