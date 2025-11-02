"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Link2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const syncEvents = [
  {
    id: "1",
    type: "skill",
    message: "New skill 'React' learned from course → Added to portfolio",
    timestamp: "2 minutes ago",
    status: "synced",
  },
  {
    id: "2",
    type: "project",
    message: "Project 'Weather App' published → Added to portfolio showcase",
    timestamp: "1 hour ago",
    status: "synced",
  },
  {
    id: "3",
    type: "certificate",
    message: "Certificate 'Machine Learning' completed → Added to certifications",
    timestamp: "3 hours ago",
    status: "synced",
  },
  {
    id: "4",
    type: "course",
    message: "Course 'Next.js Complete Guide' finished → Updated skill graph",
    timestamp: "1 day ago",
    status: "synced",
  },
]

export function PortfolioSync() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSyncNow = () => {
    setIsSyncing(true)
    // Simulate sync with Section 6 Portfolio integration
    setTimeout(() => {
      setIsSyncing(false)
      // In production, this would trigger portfolio update in Section 6
      if (typeof window !== "undefined") {
        const event = new CustomEvent("portfolioSync", { detail: { synced: true } })
        window.dispatchEvent(event)
      }
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <RefreshCw className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Sync Toggle */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link2 className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-semibold">Live Portfolio Sync</div>
                <div className="text-xs text-muted-foreground">
                  Automatically update portfolio when skills, courses, or projects change
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="portfolio-sync" className="text-sm cursor-pointer">
                {isEnabled ? "Enabled" : "Disabled"}
              </Label>
              <Switch
                id="portfolio-sync"
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
              />
            </div>
          </div>

          {isEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>AI is monitoring your activity and updating portfolio automatically...</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSyncNow}
                disabled={isSyncing}
                className="w-full gap-2"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Syncing Now...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Sync Now
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Sync Events Log */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm font-semibold mb-4">Recent Sync Events</div>
          <div className="space-y-3">
            {syncEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-border"
              >
                {getStatusIcon(event.status)}
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1">{event.message}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{event.timestamp}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sync Status */}
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div className="text-sm font-semibold">Portfolio Status</div>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>• Portfolio is up to date</div>
            <div>• Last sync: Just now</div>
            <div>• Auto-sync: {isEnabled ? "Enabled" : "Disabled"}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

