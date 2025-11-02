"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SmartGoalMonitor } from "./smart-goal-monitor"
import { TimelineCards } from "./timeline-cards"
import { CareerIntelligenceFeed } from "./career-intelligence-feed"

export function CareerIntelligenceTracker() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Career Intelligence Tracker</h2>
        <p className="text-muted-foreground">
          Track your career progress, goals, and automated activities
        </p>
      </div>

      {/* Goal Monitor */}
      <SmartGoalMonitor />

      {/* Timeline Cards */}
      <TimelineCards />

      {/* Career Intelligence Feed */}
      <CareerIntelligenceFeed />
    </div>
  )
}

