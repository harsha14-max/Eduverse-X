"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import SidebarNavigation from "../dashboard/sidebar-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIGrowthOrchestrator } from "./ai-growth-orchestrator"
import { UnifiedAnalyticsCommandCenter } from "./unified-analytics-command-center"
import { AIMentorDashboard } from "./ai-mentor-dashboard"
import { PersonalBrandCommandCenter } from "./personal-brand-command-center"
import { UnifiedNotificationsCenter } from "./unified-notifications-center"
import { AIQuickActionsSidebar } from "./ai-quick-actions-sidebar"
import { SmartNudges } from "./smart-nudges"
import {
  Brain,
  BarChart3,
  MessageSquare,
  Briefcase,
  Bell,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrchestratorPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("orchestrator")
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Keyboard shortcut for quick actions (Command+K / Ctrl+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsQuickActionsOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
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

        {/* Quick Actions Button */}
        <div className="px-4 py-2 border-b border-border bg-background/95 backdrop-blur shrink-0 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            AI Growth Orchestrator & Personal Control Center
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
          >
            <Sparkles className="h-4 w-4" />
            Quick Actions
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘K</kbd>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6 h-auto flex-wrap">
                <TabsTrigger value="orchestrator" className="flex flex-col h-auto py-2">
                  <Brain className="h-5 w-5 mb-1" />
                  <span className="text-xs">Orchestrator</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex flex-col h-auto py-2">
                  <BarChart3 className="h-5 w-5 mb-1" />
                  <span className="text-xs">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="mentor" className="flex flex-col h-auto py-2">
                  <MessageSquare className="h-5 w-5 mb-1" />
                  <span className="text-xs">Mentor</span>
                </TabsTrigger>
                <TabsTrigger value="brand" className="flex flex-col h-auto py-2">
                  <Briefcase className="h-5 w-5 mb-1" />
                  <span className="text-xs">Brand</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex flex-col h-auto py-2">
                  <Bell className="h-5 w-5 mb-1" />
                  <span className="text-xs">Notifications</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orchestrator" className="mt-0">
                <AIGrowthOrchestrator />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <UnifiedAnalyticsCommandCenter />
              </TabsContent>

              <TabsContent value="mentor" className="mt-0">
                <AIMentorDashboard />
              </TabsContent>

              <TabsContent value="brand" className="mt-0">
                <PersonalBrandCommandCenter />
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <UnifiedNotificationsCenter />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Quick Actions Sidebar */}
      <AIQuickActionsSidebar
        isOpen={isQuickActionsOpen}
        onClose={() => setIsQuickActionsOpen(false)}
      />

      {/* Smart Nudges (Global) */}
      <SmartNudges />
    </div>
  )
}

