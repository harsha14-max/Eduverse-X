"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plug,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  TrendingUp,
} from "lucide-react"
import { CrossIntegrationOptimizer } from "./cross-integration-optimizer"
import { IntegrationHealthMeter } from "./integration-health-meter"
import { AIPostPublisher } from "./ai-post-publisher"

const integrations = [
  { id: "linkedin", name: "LinkedIn", status: "connected", health: 92, category: "Social" },
  { id: "github", name: "GitHub", status: "connected", health: 88, category: "Development" },
  { id: "coursera", name: "Coursera", status: "connected", health: 85, category: "Learning" },
  { id: "notion", name: "Notion", status: "disconnected", health: 0, category: "Productivity" },
  { id: "slack", name: "Slack", status: "connected", health: 90, category: "Communication" },
  { id: "google-drive", name: "Google Drive", status: "connected", health: 82, category: "Storage" },
]

export function IntegrationsPanel() {
  const [activeTab, setActiveTab] = useState("integrations")

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Plug className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Linked Integrations & API Tokens</CardTitle>
            <CardDescription className="text-xs">
              Manage your 30+ platform integrations
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="integrations" className="text-xs">Integrations</TabsTrigger>
            <TabsTrigger value="optimizer" className="text-xs">Optimizer</TabsTrigger>
            <TabsTrigger value="publisher" className="text-xs">Post Publisher</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="flex-1 mt-4 overflow-y-auto min-h-0">
            <div className="space-y-3">
              {/* Integration Health Meter */}
              <IntegrationHealthMeter />

              {/* Integrations List */}
              <div className="text-sm font-semibold mb-3">Connected Integrations ({integrations.filter((i) => i.status === "connected").length})</div>
              <div className="space-y-2">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`border ${
                        integration.status === "connected"
                          ? "border-green-300 bg-green-50/50"
                          : "border-border"
                      }`}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            {integration.status === "connected" ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-gray-400" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="text-sm font-medium">{integration.name}</div>
                                <Badge variant="outline" className="text-xs">
                                  {integration.category}
                                </Badge>
                              </div>
                              {integration.status === "connected" && (
                                <div className="flex items-center gap-2">
                                  <div className="text-xs text-muted-foreground">Health:</div>
                                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${integration.health}%` }}
                                      transition={{ delay: index * 0.1, duration: 0.5 }}
                                      className={`h-full ${
                                        integration.health >= 85
                                          ? "bg-green-500"
                                          : integration.health >= 70
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                      }`}
                                    />
                                  </div>
                                  <div className="text-xs font-medium text-primary w-10 text-right">
                                    {integration.health}%
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {integration.status === "connected" ? (
                              <Button variant="outline" size="sm" className="gap-2 text-xs">
                                <RefreshCw className="h-3 w-3" />
                                Refresh
                              </Button>
                            ) : (
                              <Button variant="default" size="sm" className="text-xs">
                                Connect
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="optimizer" className="flex-1 mt-4 overflow-y-auto min-h-0">
            <CrossIntegrationOptimizer />
          </TabsContent>

          <TabsContent value="publisher" className="flex-1 mt-4 overflow-y-auto min-h-0">
            <AIPostPublisher />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

