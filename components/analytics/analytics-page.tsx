"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AnalyticsHeader } from "./analytics-header"
import { LearningGrowthPanel } from "./learning-growth-panel"
import { AutomationWorkflowPanel } from "./automation-workflow-panel"
import { SocialIntegrationPanel } from "./social-integration-panel"
import { SystemTrustPanel } from "./system-trust-panel"
import { AIInsightCenter } from "./ai-insight-center"
import { DataPrivacyVisualization } from "./data-privacy-visualization"
import { DashboardHeader } from "../dashboard/dashboard-header"
import { SidebarNavigation } from "../dashboard/sidebar-navigation"

export function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex">
      {/* Sidebar */}
      <SidebarNavigation />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <DashboardHeader />
        
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Top Navigation Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnalyticsHeader />
            </motion.div>

            {/* Main Analytics Workspace - 4 Smart Panels */}
            <div className="grid lg:grid-cols-3 gap-6 mt-6">
              {/* Left Column - Main Panels */}
              <div className="lg:col-span-2 space-y-6">
                {/* Learning & Growth Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <LearningGrowthPanel />
                </motion.div>

                {/* Automation & Workflow Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <AutomationWorkflowPanel />
                </motion.div>

                {/* Social & Network Presence Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <SocialIntegrationPanel />
                </motion.div>

                {/* System & Trust Layer Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <SystemTrustPanel />
                </motion.div>
              </div>

              {/* Right Column - AI Context Panel */}
              <div className="lg:col-span-1 space-y-6">
                {/* AI Insight Center 2.0 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <AIInsightCenter />
                </motion.div>

                {/* Data Privacy Visualization */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <DataPrivacyVisualization />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

