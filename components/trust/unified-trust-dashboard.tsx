"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SecurityInsightWidget } from "./security-insight-widget"
import { GrowthInsightWidget } from "./growth-insight-widget"
import { GrowthTrustFeed } from "./growth-trust-feed"

export function UnifiedTrustDashboard() {
  const [feedView, setFeedView] = useState<"combined" | "split">("split")

  return (
    <div className="space-y-6">
      {/* Split Panel Design */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Security & Trust Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Security & Trust</CardTitle>
              <CardDescription className="text-xs">
                Decentralized node status and verifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SecurityInsightWidget />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: Growth Intelligence Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Growth Intelligence</CardTitle>
              <CardDescription className="text-xs">
                AI-powered growth suggestions and opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <GrowthInsightWidget />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Combined Feed View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <GrowthTrustFeed />
      </motion.div>
    </div>
  )
}

