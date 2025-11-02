"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import { AutomationCommandBar } from "./automation-command-bar"
import { AutomationSidebar } from "./automation-sidebar"
import { AutomationCanvas } from "./automation-canvas"
import { AutomationRightPanel } from "./automation-right-panel"
import { IntegrationPanel } from "./integration-panel"
import { TemplateGallery } from "./template-gallery"
import { NotificationCenter } from "./notification-center"
import { AIConversationalPanel } from "./ai-conversational-panel"
import { EnhancedCollaboration } from "./enhanced-collaboration"
import { ExecutionVisualizer } from "./execution-visualizer"
import { UIMicroFeatures } from "./ui-micro-features"
import SidebarNavigation from "../dashboard/sidebar-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanel } from "@/components/ui/resizable-panel"
import { ResizableSection } from "./resizable-section"
import { AIAutomationMentor } from "./ai-automation-mentor"
import { SmartSocialSync } from "./smart-social-sync"
import { LearningAutomationLibrary } from "./learning-automation-library"
import { AIPerformanceMonitor } from "./ai-performance-monitor"

export default function AutomationPage() {
  const [mounted, setMounted] = useState(false)
  const [leftPanelView, setLeftPanelView] = useState<"sidebar" | "integrations" | "library" | "templates">("sidebar")
  const [rightPanelView, setRightPanelView] = useState<"ai" | "collaboration" | "execution" | "micro">("ai")
  const [showSocialSync, setShowSocialSync] = useState(false)
  const [leftPanelWidth, setLeftPanelWidth] = useState(256)
  const [rightPanelWidth, setRightPanelWidth] = useState(320)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex flex-col">
      {/* Sidebar */}
      <SidebarNavigation />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <DashboardHeader />
        
        {/* Top Command Bar */}
        <AutomationCommandBar />

        {/* AI Performance Monitor - Top Bar Widget */}
        <div className="px-4 py-2 border-b border-border bg-background/95 backdrop-blur shrink-0">
          <AIPerformanceMonitor />
        </div>
        
        {/* Main Workspace */}
        <div className="flex-1 flex overflow-hidden min-w-0">
          {/* Left Panel - Sidebar, Integrations, or Templates */}
          <ResizablePanel
            defaultWidth={leftPanelWidth}
            minWidth={200}
            maxWidth={600}
            direction="horizontal"
            className="border-r border-border bg-background"
            onResize={setLeftPanelWidth}
            showMinimize={true}
          >
            <Tabs value={leftPanelView} onValueChange={(v) => setLeftPanelView(v as any)} className="flex-1 flex flex-col min-h-0">
              <TabsList className="w-full rounded-none border-b border-border shrink-0">
                <TabsTrigger value="sidebar" className="flex-1 text-xs">Sidebar</TabsTrigger>
                <TabsTrigger value="integrations" className="flex-1 text-xs">Integrations</TabsTrigger>
                <TabsTrigger value="library" className="flex-1 text-xs">Library</TabsTrigger>
                <TabsTrigger value="templates" className="flex-1 text-xs">Templates</TabsTrigger>
              </TabsList>
              <TabsContent value="sidebar" className="flex-1 m-0 overflow-hidden min-h-0">
                <AutomationSidebar />
              </TabsContent>
              <TabsContent value="integrations" className="flex-1 m-0 overflow-hidden min-h-0">
                <IntegrationPanel />
              </TabsContent>
              <TabsContent value="library" className="flex-1 m-0 overflow-hidden min-h-0">
                <LearningAutomationLibrary />
              </TabsContent>
              <TabsContent value="templates" className="flex-1 m-0 overflow-hidden min-h-0">
                <TemplateGallery />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          
          {/* Main Canvas Zone */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <AutomationCanvas />
          </div>
          
          {/* Right Panel - AI, Collaboration, Execution, or Micro Features */}
          <ResizablePanel
            defaultWidth={rightPanelWidth}
            minWidth={200}
            maxWidth={600}
            direction="horizontal"
            className="border-l border-border bg-background"
            onResize={setRightPanelWidth}
            showMinimize={true}
          >
            <Tabs value={rightPanelView} onValueChange={(v) => setRightPanelView(v as any)} className="flex-1 flex flex-col min-h-0">
              <TabsList className="w-full rounded-none border-b border-border shrink-0 flex-nowrap overflow-hidden">
                <TabsTrigger value="ai" className="flex-1 text-xs min-w-0 px-1.5 truncate">AI</TabsTrigger>
                <TabsTrigger value="collaboration" className="flex-1 text-xs min-w-0 px-1.5 truncate">Team</TabsTrigger>
                <TabsTrigger value="execution" className="flex-1 text-xs min-w-0 px-1.5 truncate">Exec</TabsTrigger>
                <TabsTrigger value="micro" className="flex-1 text-xs min-w-0 px-1.5 truncate">Tools</TabsTrigger>
              </TabsList>
              <TabsContent value="ai" className="flex-1 m-0 overflow-hidden min-h-0 flex flex-col">
                <div className="flex flex-col h-full min-h-0">
                  <ResizableSection
                    defaultHeight={200}
                    minHeight={100}
                    maxHeight={400}
                    showMinimize={true}
                    title="AI Copilot"
                  >
                    <AutomationRightPanel />
                  </ResizableSection>
                  <ResizableSection
                    defaultHeight={300}
                    minHeight={150}
                    maxHeight={500}
                    showMinimize={true}
                    title="AI Conversation"
                  >
                    <AIConversationalPanel />
                  </ResizableSection>
                </div>
              </TabsContent>
              <TabsContent value="collaboration" className="flex-1 m-0 overflow-hidden min-h-0">
                <EnhancedCollaboration />
              </TabsContent>
              <TabsContent value="execution" className="flex-1 m-0 overflow-hidden flex flex-col min-h-0">
                <ResizableSection
                  defaultHeight={250}
                  minHeight={100}
                  maxHeight={400}
                  showMinimize={true}
                  title="Notifications"
                >
                  <NotificationCenter />
                </ResizableSection>
                <ResizableSection
                  defaultHeight={250}
                  minHeight={100}
                  maxHeight={400}
                  showMinimize={true}
                  title="Execution Visualizer"
                >
                  <ExecutionVisualizer execution={undefined} />
                </ResizableSection>
              </TabsContent>
              <TabsContent value="micro" className="flex-1 m-0 overflow-hidden min-h-0">
                <UIMicroFeatures />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </div>

        {/* AI Automation Mentor - Floating Bubble */}
        <AIAutomationMentor />

        {/* Smart Social Sync - Appears when automation completes */}
        {showSocialSync && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <SmartSocialSync
              automationOutput="Your automation completed successfully!"
              onPublish={(platforms) => {
                console.log("Publishing to:", platforms)
                setShowSocialSync(false)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

