"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendExplorer } from "./trend-explorer"
import { GrowthCharts } from "./growth-charts"

export function AIOutputVisualizer() {
  const [activeTab, setActiveTab] = useState("analytics")

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold">AI Output Visualizer + Trend Explorer</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Visualize engagement insights, skill progression, and growth metrics
        </p>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="learning">Learning Graph</TabsTrigger>
            <TabsTrigger value="insights">Post Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-0">
            <GrowthCharts />
          </TabsContent>

          <TabsContent value="learning" className="mt-0">
            <GrowthCharts type="learning" />
          </TabsContent>

          <TabsContent value="insights" className="mt-0">
            <TrendExplorer />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

