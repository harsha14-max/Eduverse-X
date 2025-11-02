"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import { SidebarNavigation } from "../dashboard/sidebar-navigation"
import { AccountHub } from "./account-hub"
import { RoleDashboard } from "./role-dashboard"
import { TeamOverview } from "./team-overview"
import { PermissionPanel } from "./permission-panel"
import { SecuritySettings } from "./security-settings"
import { IntegrationsPanel } from "./integrations-panel"
import { IdentityVisualization } from "./identity-visualization"
import { AIAssistantPane } from "./ai-assistant-pane"

export function AccountPage() {
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Account Hub */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AccountHub />
            </motion.div>

            {/* Role Dashboard & Team Overview - Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <RoleDashboard />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <TeamOverview />
              </motion.div>
            </div>

            {/* Permission Panel & Security Settings - Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <PermissionPanel />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <SecuritySettings />
              </motion.div>
            </div>

            {/* Integrations Panel & Identity Visualization - Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <IntegrationsPanel />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <IdentityVisualization />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Always-On AI Assistant Pane */}
        <AIAssistantPane />
      </div>
    </div>
  )
}

