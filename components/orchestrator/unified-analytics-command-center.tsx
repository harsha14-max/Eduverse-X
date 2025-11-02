"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SocialInsightsTab } from "./social-insights-tab"
import { LearningInsightsTab } from "./learning-insights-tab"
import { AutomationEfficiencyTab } from "./automation-efficiency-tab"
import { CauseEffectVisualization } from "./cause-effect-visualization"

export function UnifiedAnalyticsCommandCenter() {
  const [activeTab, setActiveTab] = useState("social")

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold mb-2">Unified Analytics & Progress Command Center</h2>
        <p className="text-muted-foreground">
          Merges social analytics + learning analytics + automation analytics into one dashboard
        </p>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="social">Social Insights</TabsTrigger>
          <TabsTrigger value="learning">Learning Insights</TabsTrigger>
          <TabsTrigger value="automation">Automation Efficiency</TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="mt-0">
          <SocialInsightsTab />
        </TabsContent>

        <TabsContent value="learning" className="mt-0">
          <LearningInsightsTab />
        </TabsContent>

        <TabsContent value="automation" className="mt-0">
          <AutomationEfficiencyTab />
        </TabsContent>
      </Tabs>

      {/* Cause-Effect Visualization (Always Visible) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CauseEffectVisualization />
      </motion.div>
    </div>
  )
}

