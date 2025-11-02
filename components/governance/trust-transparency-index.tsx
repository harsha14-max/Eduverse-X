"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, TrendingUp, Award } from "lucide-react"
import { BehavioralTrustEngine } from "./behavioral-trust-engine"
import { AIEthicsRatingModel } from "./ai-ethics-rating-model"
import { PrivacyHealthGauge } from "./privacy-health-gauge"
import { TrustBreakdownWidgets } from "./trust-breakdown-widgets"
import { TrustBadgeGenerator } from "./trust-badge-generator"

function TrustTransparencyIndex() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Trust & Transparency Index</CardTitle>
              <CardDescription className="text-xs">
                Gamified Privacy Meter (0-100)
              </CardDescription>
            </div>
          </div>
          <Badge variant="default" className="text-xs">
            Privacy Health: 85/100
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trust">Trust Engine</TabsTrigger>
            <TabsTrigger value="ethics">Ethics Rating</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 mt-0 overflow-y-auto space-y-4">
            <PrivacyHealthGauge />
            <TrustBreakdownWidgets />
          </TabsContent>

          <TabsContent value="trust" className="flex-1 mt-0 overflow-y-auto">
            <BehavioralTrustEngine />
          </TabsContent>

          <TabsContent value="ethics" className="flex-1 mt-0 overflow-y-auto">
            <AIEthicsRatingModel />
          </TabsContent>

          <TabsContent value="badges" className="flex-1 mt-0 overflow-y-auto">
            <TrustBadgeGenerator />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export { TrustTransparencyIndex }
