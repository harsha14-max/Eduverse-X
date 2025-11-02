"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIPortfolioPanel } from "./ai-portfolio-panel"
import { PostCommandPanel } from "./post-command-panel"
import { AIWeeklySummaryPanel } from "./ai-weekly-summary-panel"
import { Briefcase, FileText, Sparkles } from "lucide-react"

export function PersonalBrandCommandCenter() {
  const [activeTab, setActiveTab] = useState("portfolio")

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Personal Brand Command Center</h2>
            <p className="text-muted-foreground">
              Manage your entire online identity from one screen
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="portfolio">
            <Briefcase className="h-4 w-4 mr-2" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="posts">
            <FileText className="h-4 w-4 mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="summary">
            <Sparkles className="h-4 w-4 mr-2" />
            Summary
          </TabsTrigger>
        </TabsList>

        <div className="grid lg:grid-cols-2 gap-6">
          <TabsContent value="portfolio" className="mt-0">
            <AIPortfolioPanel />
          </TabsContent>

          <TabsContent value="posts" className="mt-0">
            <PostCommandPanel />
          </TabsContent>

          <TabsContent value="summary" className="mt-0 lg:col-span-2">
            <AIWeeklySummaryPanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

