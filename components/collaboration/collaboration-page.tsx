"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import SidebarNavigation from "../dashboard/sidebar-navigation"
import TeamSidebar from "./team-sidebar"
import SharedCanvasArea from "./shared-canvas-area"
import CollaborationDock from "./collaboration-dock"
import ActivityFeedPanel from "./activity-feed-panel"
import VersionTimelineSlider from "./version-timeline-slider"
import FocusMode from "./focus-mode"
import PresenceStateManager from "./presence-state-manager"
import EditStateManager from "./edit-state-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AutomationCanvas } from "../automation/automation-canvas"
import { EnhancedCollaboration } from "../automation/enhanced-collaboration"

function CollaborationPage() {
  const [activeTab, setActiveTab] = useState("canvas")

  // Mock collaborators data
  const collaborators = [
    {
      id: "1",
      name: "Alice",
      userName: "Alice",
      avatar: "AJ",
      color: "#3b82f6",
      userColor: "#3b82f6",
      x: 200,
      y: 150,
      activity: "editing" as const,
      selectedElementId: "node-1",
    },
    {
      id: "2",
      name: "Bob",
      userName: "Bob",
      avatar: "BS",
      color: "#10b981",
      userColor: "#10b981",
      x: 400,
      y: 250,
      activity: "viewing" as const,
    },
  ]

  return (
    <PresenceStateManager>
      <EditStateManager>
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex">
          {/* Sidebar */}
          <SidebarNavigation />

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:ml-64">
            <DashboardHeader />

            <div className="flex-1 overflow-hidden flex">
              {/* Left: Team Sidebar */}
              <div className="w-80 border-r border-border hidden lg:block">
                <TeamSidebar />
              </div>

              {/* Center: Shared Canvas Area */}
              <div className="flex-1 flex flex-col min-w-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                  <div className="px-4 pt-4 border-b border-border">
                    <TabsList>
                      <TabsTrigger value="canvas">Canvas</TabsTrigger>
                      <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="canvas" className="flex-1 mt-0 overflow-hidden">
                    <FocusMode cursors={collaborators} comments={[]}>
                      <SharedCanvasArea collaborators={collaborators}>
                        <div className="h-full p-4">
                          <AutomationCanvas />
                        </div>
                      </SharedCanvasArea>
                    </FocusMode>
                  </TabsContent>

                  <TabsContent value="collaboration" className="flex-1 mt-0 overflow-hidden">
                    <div className="h-full p-4 overflow-y-auto">
                      <EnhancedCollaboration />
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="flex-1 mt-0 overflow-hidden">
                    <div className="h-full p-4 overflow-y-auto">
                      <VersionTimelineSlider />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Collaboration Dock (Bottom Bar) */}
                <CollaborationDock
                  onPing={(message, componentId) => {
                    console.log("Ping:", message, componentId)
                  }}
                />
              </div>

              {/* Right: Activity Feed Panel */}
              <ActivityFeedPanel />
            </div>
          </div>
        </div>
      </EditStateManager>
    </PresenceStateManager>
  )
}

export default CollaborationPage

