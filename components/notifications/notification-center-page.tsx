"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import SidebarNavigation from "../dashboard/sidebar-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationDrawer } from "./notification-drawer"
import { NotificationTimelineView } from "./notification-timeline-view"
import { NotificationSettings } from "./notification-settings"
import { SecurityAlerts } from "./security-alerts"
import { UpgradedNotificationFeatures } from "./upgraded-notification-features"
import { EnhancedToastManager } from "./enhanced-toast-manager"
import { Bell, Clock, Settings, Shield, Sparkles } from "lucide-react"

export default function NotificationCenterPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("drawer")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <EnhancedToastManager position="top-right" maxToasts={3} />
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
                <h1 className="text-3xl font-bold mb-2">Notification & Alert Center</h1>
                <p className="text-muted-foreground">
                  Stay informed about AI activity, automations, and system updates
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="drawer" className="gap-2">
                      <Bell className="h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="timeline" className="gap-2">
                      <Clock className="h-4 w-4" />
                      Timeline
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                      <Shield className="h-4 w-4" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="upgraded" className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Upgraded
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="drawer" className="mt-0">
                    <NotificationDrawer embedded={true} />
                  </TabsContent>

                  <TabsContent value="timeline" className="mt-0">
                    <NotificationTimelineView />
                  </TabsContent>

                  <TabsContent value="security" className="mt-0">
                    <SecurityAlerts />
                  </TabsContent>

                  <TabsContent value="upgraded" className="mt-0">
                    <UpgradedNotificationFeatures />
                  </TabsContent>

                  <TabsContent value="settings" className="mt-0">
                    <NotificationSettings />
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

