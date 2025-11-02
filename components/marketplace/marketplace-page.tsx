"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import SidebarNavigation from "../dashboard/sidebar-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceHome } from "./marketplace-home"
import { WorkflowTemplatesLibrary } from "./workflow-templates-library"
import { IntegrationPluginStore } from "./integration-plugin-store"
import { CreatorUploadDashboard } from "./creator-upload-dashboard"
import { Store, Package, Plug, Upload } from "lucide-react"

export default function MarketplacePage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("home")

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
              <h1 className="text-3xl font-bold mb-2">Marketplace & Plugin Store</h1>
              <p className="text-muted-foreground">
                Discover, share, and monetize AI workflows, integrations, and templates
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="home" className="gap-2">
                    <Store className="h-4 w-4" />
                    Home
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="gap-2">
                    <Package className="h-4 w-4" />
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="plugins" className="gap-2">
                    <Plug className="h-4 w-4" />
                    Plugins
                  </TabsTrigger>
                  <TabsTrigger value="creator" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Creator
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="home" className="mt-0">
                  <MarketplaceHome />
                </TabsContent>

                <TabsContent value="templates" className="mt-0">
                  <WorkflowTemplatesLibrary />
                </TabsContent>

                <TabsContent value="plugins" className="mt-0">
                  <IntegrationPluginStore />
                </TabsContent>

                <TabsContent value="creator" className="mt-0">
                  <CreatorUploadDashboard />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

