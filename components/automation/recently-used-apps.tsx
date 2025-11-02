"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plug,
  CheckCircle2,
  AlertCircle,
  Circle,
} from "lucide-react"

const recentlyUsedApps = [
  { id: "linkedin", name: "LinkedIn", status: "connected", lastUsed: "2 hours ago" },
  { id: "github", name: "GitHub", status: "connected", lastUsed: "5 hours ago" },
  { id: "slack", name: "Slack", status: "connected", lastUsed: "1 day ago" },
  { id: "coursera", name: "Coursera", status: "connected", lastUsed: "2 days ago" },
  { id: "notion", name: "Notion", status: "disconnected", lastUsed: "1 week ago" },
]

export function RecentlyUsedApps() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="h-3 w-3 text-green-600" />
      case "disconnected":
        return <AlertCircle className="h-3 w-3 text-red-600" />
      default:
        return <Circle className="h-3 w-3 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "disconnected":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-2 px-2">
        <Plug className="h-4 w-4 text-primary" />
        <div className="text-sm font-semibold">Recently Used Apps</div>
      </div>

      <div className="space-y-2 px-2">
        {recentlyUsedApps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border cursor-pointer hover:border-primary transition-all">
              <CardContent className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(app.status)}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{app.name}</div>
                      <div className="text-xs text-muted-foreground">{app.lastUsed}</div>
                    </div>
                  </div>
                  {getStatusIcon(app.status)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

