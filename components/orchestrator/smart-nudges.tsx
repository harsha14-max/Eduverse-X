"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTiming } from "@/lib/hooks/useTiming"
import { DELAYS, INTERVALS, TimingPriority } from "@/lib/timing-constants"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, X, TrendingUp, Clock } from "lucide-react"
import { toast } from "sonner"

interface Nudge {
  id: string
  message: string
  type: "tip" | "reminder" | "achievement"
  timestamp: Date
}

const mockNudges: Nudge[] = [
  {
    id: "1",
    message: "Your followers engaged more on Tuesday — post again tomorrow morning!",
    type: "tip",
    timestamp: new Date(),
  },
  {
    id: "2",
    message: "You're close to your weekly goal! Only 1 more post needed.",
    type: "reminder",
    timestamp: new Date(),
  },
  {
    id: "3",
    message: "Great job! Your engagement rate increased by 15% this week.",
    type: "achievement",
    timestamp: new Date(),
  },
]

export function SmartNudges() {
  const [nudges, setNudges] = useState<Nudge[]>([])
  const [visibleNudge, setVisibleNudge] = useState<Nudge | null>(null)
  const { interval, delay } = useTiming()

  useEffect(() => {
    // Simulate nudges appearing periodically using centralized timing
    const intervalId = interval(
      () => {
        if (mockNudges.length > nudges.length) {
          const nextNudge = mockNudges[nudges.length]
          if (nextNudge) {
            setNudges((prev) => [...prev, nextNudge])
            setVisibleNudge(nextNudge)
            
            // Auto-hide after 8 seconds using timing constants
            delay(() => {
              setVisibleNudge(null)
            }, DELAYS.NOTIFICATION_HIDE)
          }
        }
      },
      INTERVALS.NUDGE_CHECK,
      { priority: TimingPriority.MEDIUM }
    )

    // Show first nudge
    if (mockNudges.length > 0 && nudges.length === 0) {
      setNudges([mockNudges[0]])
      setVisibleNudge(mockNudges[0])
      delay(() => {
        setVisibleNudge(null)
      }, DELAYS.NOTIFICATION_HIDE)
    }

    return () => {
      // Cleanup handled by useTiming hook
    }
  }, [nudges, interval, delay])

  const handleDismiss = (nudgeId: string) => {
    setVisibleNudge(null)
    setNudges((prev) => prev.filter((n) => n.id !== nudgeId))
  }

  const getNudgeColor = (type: string) => {
    switch (type) {
      case "tip":
        return "bg-blue-500/10 border-blue-500/20 text-blue-700"
      case "reminder":
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-700"
      case "achievement":
        return "bg-green-500/10 border-green-500/20 text-green-700"
      default:
        return "bg-gray-500/10 border-gray-500/20 text-gray-700"
    }
  }

  const getNudgeIcon = (type: string) => {
    switch (type) {
      case "tip":
        return <Sparkles className="h-4 w-4" />
      case "reminder":
        return <Clock className="h-4 w-4" />
      case "achievement":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <AnimatePresence>
        {visibleNudge && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`border shadow-lg ${getNudgeColor(visibleNudge.type)}`}>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="shrink-0 mt-0.5">
                      {getNudgeIcon(visibleNudge.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium mb-1">
                        {visibleNudge.type === "tip" && "💡 Smart Tip"}
                        {visibleNudge.type === "reminder" && "⏰ Reminder"}
                        {visibleNudge.type === "achievement" && "🎉 Achievement"}
                      </div>
                      <div className="text-xs">{visibleNudge.message}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => handleDismiss(visibleNudge.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

