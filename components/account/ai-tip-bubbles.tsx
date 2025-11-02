"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  X,
  Lightbulb,
  CheckCircle2,
  Shield,
  Key,
  Lock,
} from "lucide-react"

const tips = [
  {
    id: "1",
    title: "Enable 2FA for Better Reputation Score",
    message: "Two-factor authentication increases your security score by 15 points and boosts your reputation.",
    action: "Enable 2FA",
    icon: Shield,
    priority: "high",
  },
  {
    id: "2",
    title: "Strong Password = Strong Reputation",
    message: "Using a unique, complex password with 16+ characters improves your security score by 10 points.",
    action: "Update Password",
    icon: Key,
    priority: "medium",
  },
  {
    id: "3",
    title: "Review Your Session Timeout",
    message: "Setting session timeout to 30 minutes or less improves security. Currently set to 60 minutes.",
    action: "Update Settings",
    icon: Lock,
    priority: "medium",
  },
  {
    id: "4",
    title: "Regenerate API Keys Regularly",
    message: "Rotate your API keys every 90 days for better security. Last rotation: 120 days ago.",
    action: "Rotate Keys",
    icon: Key,
    priority: "low",
  },
]

export function AITipBubbles() {
  const [dismissedTips, setDismissedTips] = useState<string[]>([])

  const visibleTips = tips.filter((tip) => !dismissedTips.includes(tip.id))

  const handleDismiss = (tipId: string) => {
    setDismissedTips((prev) => [...prev, tipId])
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-primary bg-primary/5"
      case "medium":
        return "border-yellow-300 bg-yellow-50/50"
      default:
        return "border-border bg-muted/50"
    }
  }

  if (visibleTips.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div className="text-sm font-semibold">All Security Tips Applied</div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Your security settings are optimized!
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="h-4 w-4 text-primary" />
        <div className="text-xs font-semibold">AI Security Tips</div>
        <Badge variant="outline" className="text-xs">{visibleTips.length}</Badge>
      </div>

      <AnimatePresence>
        {visibleTips.map((tip, index) => {
          const Icon = tip.icon
          return (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border ${getPriorityColor(tip.priority)}`}>
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="text-sm font-semibold">{tip.title}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0"
                          onClick={() => handleDismiss(tip.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {tip.message}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-xs w-full"
                      >
                        {tip.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

