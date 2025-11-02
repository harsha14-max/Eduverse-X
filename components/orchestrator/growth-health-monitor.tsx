"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react"
import {
  calculateGrowthScore,
  getGrowthScoreFromStorage,
  saveGrowthScoreToStorage,
  type GrowthScore,
  type GrowthMetrics,
} from "./growth-score-calculator"

export function GrowthHealthMonitor() {
  const [growthScore, setGrowthScore] = useState<GrowthScore | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load from storage or calculate new
    const stored = getGrowthScoreFromStorage()
    if (stored) {
      setGrowthScore(stored)
      setIsLoading(false)
    } else {
      // Mock metrics (in real app, fetch from API)
      const mockMetrics: GrowthMetrics = {
        skillProgress: 78, // 78% skill progress
        postingFrequency: 6, // 6 posts per week
        networkEngagement: 72, // 72% engagement
        mentorFeedback: 8.5, // 8.5/10 mentor feedback
      }
      
      const calculated = calculateGrowthScore(mockMetrics)
      setGrowthScore(calculated)
      saveGrowthScoreToStorage(calculated)
      setIsLoading(false)
    }
  }, [])

  if (isLoading || !growthScore) {
    return (
      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <div className="animate-pulse">Loading growth score...</div>
        </CardContent>
      </Card>
    )
  }

  const getGaugeColor = () => {
    switch (growthScore.color) {
      case "red":
        return "text-red-600"
      case "yellow":
        return "text-yellow-600"
      case "green":
        return "text-green-600"
      case "blue":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getGaugeBgColor = () => {
    switch (growthScore.color) {
      case "red":
        return "bg-red-500/10"
      case "yellow":
        return "bg-yellow-500/10"
      case "green":
        return "bg-green-500/10"
      case "blue":
        return "bg-blue-500/10"
      default:
        return "bg-gray-500/10"
    }
  }

  const getLevelIcon = () => {
    switch (growthScore.level) {
      case "low":
        return <TrendingDown className="h-5 w-5 text-red-600" />
      case "medium":
        return <Activity className="h-5 w-5 text-yellow-600" />
      case "high":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case "excellent":
        return <Target className="h-5 w-5 text-blue-600" />
      default:
        return <Activity className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${getGaugeBgColor()} flex items-center justify-center`}>
              {getLevelIcon()}
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Growth Health Monitor</CardTitle>
              <CardDescription className="text-xs">
                Overall growth score calculated from multiple metrics
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${getGaugeColor()} border-current`}>
            {growthScore.level.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Gauge */}
        <div className="flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className={`text-6xl font-bold ${getGaugeColor()}`}>
              {growthScore.total}
            </div>
            <div className="text-sm text-muted-foreground text-center mt-2">Growth Score</div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full mt-4">
            <Progress value={growthScore.total} className="h-3" />
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-3">
          <div className="text-sm font-semibold mb-2">Score Breakdown</div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Skill Progress</span>
              <span className="font-medium">{Math.round(growthScore.breakdown.skillProgress)} pts</span>
            </div>
            <Progress value={(growthScore.breakdown.skillProgress / 30) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Posting Frequency</span>
              <span className="font-medium">{Math.round(growthScore.breakdown.postingFrequency)} pts</span>
            </div>
            <Progress value={(growthScore.breakdown.postingFrequency / 25) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Network Engagement</span>
              <span className="font-medium">{Math.round(growthScore.breakdown.networkEngagement)} pts</span>
            </div>
            <Progress value={(growthScore.breakdown.networkEngagement / 25) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Mentor Feedback</span>
              <span className="font-medium">{Math.round(growthScore.breakdown.mentorFeedback)} pts</span>
            </div>
            <Progress value={(growthScore.breakdown.mentorFeedback / 20) * 100} className="h-2" />
          </div>
        </div>

        {/* Color-Coded Status */}
        <div className={`p-3 rounded-lg ${getGaugeBgColor()} border border-current/20`}>
          <div className="text-xs font-medium mb-1">Current Status</div>
          <div className="text-sm">
            {growthScore.level === "low" && "Focus on consistent posting and skill development"}
            {growthScore.level === "medium" && "Good progress! Increase engagement and mentor feedback"}
            {growthScore.level === "high" && "Excellent growth! Maintain consistency"}
            {growthScore.level === "excellent" && "Outstanding growth! Keep up the momentum"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
