"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import SidebarNavigation from "../dashboard/sidebar-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecurityNodesTab } from "./security-nodes-tab"
import { AIGrowthTab } from "./ai-growth-tab"
import { ReputationTab } from "./reputation-tab"

export default function TrustPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("security")

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
              <h1 className="text-3xl font-bold mb-2">Trust + Growth Intelligence</h1>
              <p className="text-muted-foreground">
                Decentralized trust visualization and AI-powered growth intelligence
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="security">Security & Nodes</TabsTrigger>
                  <TabsTrigger value="growth">AI Growth & Suggestions</TabsTrigger>
                  <TabsTrigger value="reputation">Reputation & Verification</TabsTrigger>
                </TabsList>

                <TabsContent value="security" className="mt-0">
                  <SecurityNodesTab />
                </TabsContent>

                <TabsContent value="growth" className="mt-0">
                  <AIGrowthTab />
                </TabsContent>

                <TabsContent value="reputation" className="mt-0">
                  <ReputationTab />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

