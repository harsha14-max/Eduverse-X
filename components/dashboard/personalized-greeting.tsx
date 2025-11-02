"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function PersonalizedGreeting() {
  const [greeting, setGreeting] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    hoursStudied: 0,
    streak: 0,
  })

  useEffect(() => {
    // Simulate AI-generated greeting
    const name = "Suraj" // This would come from user session
    const timeOfDay = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening"
    
    setGreeting(`${timeOfDay}, ${name}! 👋`)
    setSuggestions([
      "You completed 3 courses this week.",
      "Would you like me to create a post summarizing your progress?",
      "Or suggest what to learn next?",
    ])
    setStats({
      coursesCompleted: 3,
      hoursStudied: 12,
      streak: 7,
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-border shadow-sm bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{greeting || "Welcome back!"}</h1>
                  <p className="text-sm text-muted-foreground">
                    AI-powered insights for your learning journey
                  </p>
                </div>
              </div>
              
              {/* AI Suggestions */}
              {suggestions.length > 0 && (
                <div className="space-y-2 mt-4">
                  {suggestions.map((suggestion, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-sm text-muted-foreground"
                    >
                      {suggestion}
                    </motion.p>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="text-center p-3 rounded-lg bg-muted/50 min-w-[80px]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold text-primary">{stats.coursesCompleted}</span>
                </div>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50 min-w-[80px]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold text-primary">{stats.hoursStudied}h</span>
                </div>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50 min-w-[80px]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-2xl font-bold text-primary">{stats.streak}🔥</span>
                </div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

