"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

const healthMetrics = [
  { label: "Overall Health", value: 88, status: "good" },
  { label: "API Response Time", value: 92, status: "good" },
  { label: "Sync Success Rate", value: 85, status: "good" },
  { label: "Token Expiry Alerts", value: 3, status: "warning" },
]

export function IntegrationHealthMeter() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <div className="text-sm font-semibold">Integration Health Meter</div>
          <Badge variant="outline" className="text-xs">Live</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border">
                <CardContent className="p-3">
                  <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                  <div className="flex items-center gap-2">
                    {metric.status === "good" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    )}
                    <div className="text-lg font-bold">{metric.value}{metric.label.includes("Health") || metric.label.includes("Rate") ? "%" : ""}</div>
                  </div>
                  {metric.status === "warning" && (
                    <div className="text-xs text-yellow-600 mt-1">
                      {metric.value} tokens expiring soon
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

