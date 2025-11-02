"use client"

import { motion } from "framer-motion"
import { UnifiedTrustDashboard } from "./unified-trust-dashboard"
import { AIWebTracker } from "./ai-web-tracker"
import { PortfolioGrowthGrid } from "./portfolio-growth-grid"
import { AISocialPostGenerator } from "./ai-social-post-generator"
import { TrendSynchronizer } from "./trend-synchronizer"
import { SmartSuggestButton } from "./smart-suggest-button"
import { CrossPostingUI } from "./cross-posting-ui"

export function AIGrowthTab() {
  return (
    <div className="space-y-6">
      {/* Unified Trust Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UnifiedTrustDashboard />
      </motion.div>

      {/* AI Web Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <AIWebTracker />
      </motion.div>

      {/* Portfolio Growth Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <PortfolioGrowthGrid />
      </motion.div>

      {/* AI Social Post Generator & Trends */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <AISocialPostGenerator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TrendSynchronizer />
        </motion.div>
      </div>

      {/* Smart Suggest Button & Cross-Posting */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SmartSuggestButton />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <CrossPostingUI />
        </motion.div>
      </div>
    </div>
  )
}

