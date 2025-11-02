"use client"

import { DashboardHeader } from "./dashboard-header"
import { PersonalizedGreeting } from "./personalized-greeting"
import { AIChatConsole } from "./ai-chat-console"
import { VisualizationPanels } from "./visualization-panels"
import { QuickActionCards } from "./quick-action-cards"
import { DataVaultConsole } from "./data-vault-console"
import { NotificationPanel } from "./notification-panel"
import { ProfileBar } from "./profile-bar"
import { SidebarNavigation } from "./sidebar-navigation"
import { PersonalizedAIFeed } from "./personalized-ai-feed"
import { SkillProgressTracker } from "./skill-progress-tracker"
import { TimelineSection } from "./timeline-section"
import { SecurityTransparencyPanel } from "./security-transparency-panel"

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex">
      {/* Sidebar */}
      <SidebarNavigation />
      
      {/* Main Content - Add margin for sidebar on desktop */}
      <div className="flex-1 flex flex-col md:ml-64">
        <DashboardHeader />
        
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Personalized Greeting */}
            <PersonalizedGreeting />
            
            {/* Profile Bar */}
            <ProfileBar />
            
            <div className="grid lg:grid-cols-3 gap-6 mt-6">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* AI Chat Console */}
                <AIChatConsole />
                
                {/* Quick Action Cards */}
                <QuickActionCards />
                
                {/* Visualization Panels */}
                <VisualizationPanels />
                
                {/* Timeline Section */}
                <TimelineSection />
                
                {/* Personalized AI Feed */}
                <PersonalizedAIFeed />
              </div>
              
              {/* Sidebar Content */}
              <div className="lg:col-span-1 space-y-6">
                {/* Skill Progress Tracker */}
                <SkillProgressTracker />
                
                {/* Notifications Panel */}
                <NotificationPanel />
                
                {/* Security Transparency Panel */}
                <SecurityTransparencyPanel />
                
                {/* Data Vault Console */}
                <DataVaultConsole />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

