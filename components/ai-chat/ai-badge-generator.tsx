"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Award, TrendingUp } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GeneratedBadge {
  id: string
  name: string
  description: string
  icon: typeof Award
  unlocked: boolean
  unlockedAt?: string
}

const badges: GeneratedBadge[] = [
  {
    id: "1",
    name: "Automation Architect",
    description: "Built 10+ automation workflows",
    icon: Sparkles,
    unlocked: true,
    unlockedAt: "2 days ago",
  },
  {
    id: "2",
    name: "AI Explorer",
    description: "Completed 5 AI-related courses",
    icon: TrendingUp,
    unlocked: true,
    unlockedAt: "1 week ago",
  },
  {
    id: "3",
    name: "Social Growth Master",
    description: "Published 20+ posts with high engagement",
    icon: Award,
    unlocked: false,
  },
  {
    id: "4",
    name: "Learning Streak",
    description: "7-day learning streak active",
    icon: TrendingUp,
    unlocked: true,
    unlockedAt: "Today",
  },
]

export function AIBadgeGenerator() {
  const [badgesList, setBadgesList] = useState<GeneratedBadge[]>(badges)

  const handleUnlock = (id: string) => {
    setBadgesList(
      badgesList.map((badge) =>
        badge.id === id
          ? { ...badge, unlocked: true, unlockedAt: "Just now" }
          : badge
      )
    )
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">AI-Driven Badges</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Achievements automatically generated based on your activity
        </p>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badgesList.map((badge) => {
              const Icon = badge.icon
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border ${
                    badge.unlocked
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        badge.unlocked ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${badge.unlocked ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold mb-1">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                      {badge.unlocked ? (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                          Unlocked {badge.unlockedAt}
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUnlock(badge.id)}
                          className="text-xs"
                        >
                          Unlock Badge
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

