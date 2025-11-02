"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  Star,
  Zap,
  TrendingUp,
  Award,
  Target,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

interface AutomationPoints {
  total: number
  thisWeek: number
  level: number
  nextLevelPoints: number
  achievements: {
    id: string
    name: string
    description: string
    unlocked: boolean
    icon: string
  }[]
}

interface GamifiedFeedbackProps {
  points?: AutomationPoints
}

// Mock data - in production, fetch from user profile
const mockPoints: AutomationPoints = {
  total: 1250,
  thisWeek: 85,
  level: 3,
  nextLevelPoints: 500,
  achievements: [
    {
      id: "1",
      name: "First Automation",
      description: "Created your first automation",
      unlocked: true,
      icon: "🚀",
    },
    {
      id: "2",
      name: "Power User",
      description: "Created 10 automations",
      unlocked: true,
      icon: "⚡",
    },
    {
      id: "3",
      name: "Efficiency Master",
      description: "Saved 100 hours with automations",
      unlocked: false,
      icon: "🎯",
    },
    {
      id: "4",
      name: "Social Butterfly",
      description: "Published 50 posts via automation",
      unlocked: false,
      icon: "📱",
    },
  ],
}

export function GamifiedFeedback({ points }: GamifiedFeedbackProps) {
  const automationPoints = points || mockPoints
  const [showNotification, setShowNotification] = useState(false)
  const [recentPoints, setRecentPoints] = useState(0)

  useEffect(() => {
    // Simulate points earned from automation completion
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const earned = Math.floor(Math.random() * 10) + 5
        setRecentPoints(earned)
        setShowNotification(true)
        setTimeout(() => {
          setShowNotification(false)
        }, 3000)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const currentLevelProgress = ((automationPoints.total % 500) / 500) * 100

  return (
    <>
      <Card className="border-border shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div className="text-sm font-semibold">Automation Points</div>
                <Badge variant="outline" className="text-xs gap-1 bg-yellow-50 text-yellow-700 border-yellow-300">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-600" />
                  Level {automationPoints.level}
                </Badge>
              </div>
            </div>

            {/* Points Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{automationPoints.total.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  +{automationPoints.thisWeek} this week
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress to Level {automationPoints.level + 1}</span>
                  <span>{automationPoints.total % 500} / 500</span>
                </div>
                <Progress value={currentLevelProgress} className="h-2" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{automationPoints.total}</div>
                <div className="text-xs text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{automationPoints.thisWeek}</div>
                <div className="text-xs text-muted-foreground">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">{automationPoints.achievements.filter(a => a.unlocked).length}</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold">Achievements</div>
                <Button variant="ghost" size="sm" className="text-xs h-6">
                  View All
                </Button>
              </div>
              <ScrollArea className="max-h-32">
                <div className="space-y-2">
                  {automationPoints.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-2 p-2 rounded-lg border ${
                        achievement.unlocked
                          ? "border-primary/20 bg-primary/5"
                          : "border-border/50 bg-muted/30 opacity-60"
                      }`}
                    >
                      <div className="text-lg">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                      {achievement.unlocked ? (
                        <Award className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <Target className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Points Breakdown */}
            <div className="pt-2 border-t border-border">
              <div className="text-xs font-semibold mb-2">How Points Work:</div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-primary" />
                  <span>+10 points per automation created</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span>+5 points per successful automation run</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-3 w-3 text-yellow-600" />
                  <span>+25 points per achievement unlocked</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Points Notification */}
      <AnimatePresence>
        {showNotification && recentPoints > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-4 z-50"
          >
            <Card className="border-primary/20 bg-primary/5 shadow-lg">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🎉</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Points Earned!</div>
                    <div className="text-xs text-muted-foreground">
                      +{recentPoints} points for automation completion
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs bg-primary text-primary-foreground border-primary">
                    +{recentPoints}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

