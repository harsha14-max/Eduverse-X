"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  CheckCircle2,
  Network,
  Activity,
  ArrowRight,
} from "lucide-react"

const securityInsights = [
  {
    id: "1",
    message: "IPFS Node #45 verified new data block for your automation",
    timestamp: "2 minutes ago",
    status: "verified",
  },
  {
    id: "2",
    message: "All decentralized nodes are operational",
    timestamp: "5 minutes ago",
    status: "operational",
  },
  {
    id: "3",
    message: "DID identity verification completed",
    timestamp: "15 minutes ago",
    status: "verified",
  },
]

export function SecurityInsightWidget() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-5 w-5 text-primary" />
        <div className="text-sm font-semibold">Security Insights</div>
        <Badge variant="outline" className="text-xs">Live</Badge>
      </div>
      {securityInsights.map((insight, index) => (
        <motion.div
          key={insight.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                {insight.status === "verified" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                ) : (
                  <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1">{insight.message}</div>
                  <div className="text-xs text-muted-foreground">{insight.timestamp}</div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-primary" />
            <div className="text-xs font-medium">4 nodes active</div>
            <Badge variant="outline" className="text-xs ml-auto">View All</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

