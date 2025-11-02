"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Shield,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Activity,
} from "lucide-react"

const feedItems = [
  {
    id: "1",
    type: "security",
    title: "IPFS Node #45 verified new data block",
    message: "New data block for your automation workflow has been verified and stored on IPFS cluster #45",
    timestamp: "2 minutes ago",
    icon: Shield,
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "2",
    type: "growth",
    title: "AI found 3 trending LinkedIn topics",
    message: "3 trending topics in Cloud AI detected. Would you like to auto-generate a post?",
    timestamp: "5 minutes ago",
    icon: TrendingUp,
    color: "bg-green-50 border-green-200",
  },
  {
    id: "3",
    type: "security",
    title: "DID identity verified for portfolio update",
    message: "Your decentralized identity has been verified for the recent portfolio update",
    timestamp: "15 minutes ago",
    icon: CheckCircle2,
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: "4",
    type: "growth",
    title: "New course recommendation: Next.js Advanced",
    message: "Based on your React expertise, AI recommends Next.js Advanced course with 92% match",
    timestamp: "1 hour ago",
    icon: Sparkles,
    color: "bg-green-50 border-green-200",
  },
  {
    id: "5",
    type: "security",
    title: "Unusual activity detected",
    message: "Unusual activity detected in verification node. Review recommended.",
    timestamp: "2 hours ago",
    icon: AlertCircle,
    color: "bg-yellow-50 border-yellow-200",
  },
]

export function GrowthTrustFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Unified Feed</CardTitle>
        <p className="text-xs text-muted-foreground">
          Combined security insights and AI growth suggestions
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3 pr-4">
            {feedItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${item.color} cursor-pointer hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${item.type === "security" ? "bg-blue-100" : "bg-green-100"} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${item.type === "security" ? "text-blue-600" : "text-green-600"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-semibold">{item.title}</div>
                        <Badge variant="outline" className="text-xs">
                          {item.type === "security" ? "Security" : "Growth"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {item.message}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground">{item.timestamp}</div>
                        {item.type === "growth" && (
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                            Generate Post
                          </Badge>
                        )}
                        {item.type === "growth" && (
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                            Add to Portfolio
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

