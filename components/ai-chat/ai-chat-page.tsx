"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import SidebarNavigation from "../dashboard/sidebar-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartAIChatHub } from "./smart-ai-chat-hub"
import { AIPromptBuilder } from "./ai-prompt-builder"
import { CareerIntelligenceTracker } from "./career-intelligence-tracker"
import { AIOutputVisualizer } from "./ai-output-visualizer"
import { HumanAICollaboration } from "./human-ai-collaboration"
import { AIPortfolioBuilder } from "./ai-portfolio-builder"
import { WebIntelligenceTab } from "./web-intelligence-tab"
import { GrowthDashboardIntegration } from "./growth-dashboard-integration"

export default function AIChatPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-3xl font-bold mb-2">AI Interaction & Growth Hub</h1>
              <p className="text-muted-foreground">
                Your personal co-pilot for automation, content generation, and professional growth
              </p>
            </motion.div>

            {/* Main Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="chat">Chat & Commands</TabsTrigger>
                  <TabsTrigger value="prompts">Prompt Studio</TabsTrigger>
                  <TabsTrigger value="career">Career Intelligence</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio Builder</TabsTrigger>
                  <TabsTrigger value="growth">Growth Dashboard</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="mt-0">
                  <SmartAIChatHub />
                </TabsContent>

                <TabsContent value="prompts" className="mt-0">
                  <AIPromptBuilder />
                </TabsContent>

                <TabsContent value="career" className="mt-0">
                  <CareerIntelligenceTracker />
                </TabsContent>

                <TabsContent value="portfolio" className="mt-0">
                  <AIPortfolioBuilder />
                </TabsContent>

                <TabsContent value="growth" className="mt-0">
                  <GrowthDashboardIntegration />
                </TabsContent>
              </Tabs>

              {/* Additional Features (Always Visible) */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AIOutputVisualizer />
                <HumanAICollaboration />
                <WebIntelligenceTab />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

