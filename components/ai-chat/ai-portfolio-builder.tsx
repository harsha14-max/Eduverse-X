"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioAutoBranding } from "./portfolio-auto-branding"
import { AIBadgeGenerator } from "./ai-badge-generator"
import { SkillHeatmap } from "./skill-heatmap"
import { Lightbulb, Target, TrendingUp } from "lucide-react"

export function AIPortfolioBuilder() {
  const [activeTab, setActiveTab] = useState("suggestions")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Portfolio Builder & Auto-Branding</h2>
        <p className="text-muted-foreground">
          AI-driven suggestions for your portfolio and professional branding
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="branding">Auto-Branding</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Suggestions */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-bold">AI Suggestions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <h4 className="text-sm font-semibold mb-1">
                      You just built a LangChain bot — add it to your portfolio?
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      AI detected a new project that could enhance your portfolio
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" className="text-xs">
                        Add to Portfolio
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Dismiss
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <h4 className="text-sm font-semibold mb-1">
                      Project summary auto-generated for "Weather App"
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      AI-generated professional summary ready for review
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" className="text-xs">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Edit
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Heatmap */}
            <SkillHeatmap />
          </div>
        </TabsContent>

        <TabsContent value="branding" className="mt-0">
          <PortfolioAutoBranding />
        </TabsContent>

        <TabsContent value="badges" className="mt-0">
          <AIBadgeGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

