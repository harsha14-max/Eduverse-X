"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import SidebarNavigation from "../dashboard/sidebar-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UnifiedSupportDashboard } from "./unified-support-dashboard"
import { ConversationalAIHelpAssistant } from "./conversational-ai-help-assistant"
import { InteractiveTroubleshootingGuides } from "./interactive-troubleshooting-guides"
import { KnowledgeBaseBrowser } from "./knowledge-base-browser"
import { FeedbackCollectionPortal } from "./feedback-collection-portal"
import { SystemStatusHealthMonitor } from "./system-status-health-monitor"
import { DecentralizedTransparencyLogViewer } from "./decentralized-transparency-log-viewer"
import { HelpCircle, MessageSquare, BookOpen, FileText, Activity, Shield } from "lucide-react"

export default function SupportPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col md:ml-64">
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-3xl font-bold mb-2">Feedback & Support Center</h1>
              <p className="text-muted-foreground">
                Get AI-powered help, submit feedback, and track system health
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6 mb-6">
                  <TabsTrigger value="dashboard" className="gap-2 text-xs">
                    <HelpCircle className="h-4 w-4" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="gap-2 text-xs">
                    <MessageSquare className="h-4 w-4" />
                    AI Help
                  </TabsTrigger>
                  <TabsTrigger value="guides" className="gap-2 text-xs">
                    <BookOpen className="h-4 w-4" />
                    Guides
                  </TabsTrigger>
                  <TabsTrigger value="knowledge" className="gap-2 text-xs">
                    <FileText className="h-4 w-4" />
                    Knowledge Base
                  </TabsTrigger>
                  <TabsTrigger value="feedback" className="gap-2 text-xs">
                    <FileText className="h-4 w-4" />
                    Feedback
                  </TabsTrigger>
                  <TabsTrigger value="status" className="gap-2 text-xs">
                    <Activity className="h-4 w-4" />
                    Status
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="mt-0">
                  <UnifiedSupportDashboard />
                </TabsContent>

                <TabsContent value="chat" className="mt-0">
                  <ConversationalAIHelpAssistant />
                </TabsContent>

                <TabsContent value="guides" className="mt-0">
                  <InteractiveTroubleshootingGuides />
                </TabsContent>

                <TabsContent value="knowledge" className="mt-0">
                  <KnowledgeBaseBrowser />
                </TabsContent>

                <TabsContent value="feedback" className="mt-0">
                  <FeedbackCollectionPortal />
                </TabsContent>

                <TabsContent value="status" className="mt-0 space-y-6">
                  <SystemStatusHealthMonitor />
                  <DecentralizedTransparencyLogViewer />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

