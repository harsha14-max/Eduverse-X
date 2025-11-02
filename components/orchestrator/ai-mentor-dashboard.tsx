"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MentorTimeline } from "./mentor-timeline"
import { GoalsForWeek } from "./goals-for-week"
import { MentorComparisonWidget } from "./mentor-comparison-widget"
import { SmartNudges } from "./smart-nudges"
import { Brain, Target, MessageSquare, Users } from "lucide-react"

export function AIMentorDashboard() {
  const [activeTab, setActiveTab] = useState("timeline")

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Brain className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Mentor Dashboard</h2>
              <p className="text-muted-foreground">
                Continuous data-backed mentorship with real-time guidance stream
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="timeline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="goals">
              <Target className="h-4 w-4 mr-2" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="comparison">
              <Users className="h-4 w-4 mr-2" />
              Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-0">
            <MentorTimeline />
          </TabsContent>

          <TabsContent value="goals" className="mt-0">
            <GoalsForWeek />
          </TabsContent>

          <TabsContent value="comparison" className="mt-0">
            <MentorComparisonWidget />
          </TabsContent>
        </Tabs>
      </div>

      {/* Smart Nudges (Floating) */}
      <SmartNudges />
    </>
  )
}

