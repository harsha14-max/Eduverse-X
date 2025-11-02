"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock, CheckCircle2, Shield, Heart } from "lucide-react"

interface EmotionAction {
  id: string
  action: string
  emotion: string
  icon: typeof Lock
  animation: string
}

const emotionActions: EmotionAction[] = [
  {
    id: "1",
    action: "Lock closing",
    emotion: "安心 (Peace of mind)",
    icon: Lock,
    animation: "lock-closing",
  },
  {
    id: "2",
    action: "Security enabled",
    emotion: "Protected",
    icon: Shield,
    animation: "shield-rising",
  },
  {
    id: "3",
    action: "Privacy mode enabled",
    emotion: "Safe",
    icon: CheckCircle2,
    animation: "check-appearing",
  },
  {
    id: "4",
    action: "Access granted",
    emotion: "Trusted",
    icon: Unlock,
    animation: "unlock-opening",
  },
]

function EmotionMappingAnimations() {
  const [triggeredAction, setTriggeredAction] = useState<string | null>(null)

  const handleTrigger = (actionId: string) => {
    setTriggeredAction(actionId)
    setTimeout(() => setTriggeredAction(null), 2000)
  }

  const activeAction = emotionActions.find((a) => a.id === triggeredAction)

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        <div className="text-sm font-semibold mb-3">Emotion Mapping Animations</div>

        {/* Emotion Actions */}
        <div className="space-y-2">
          {emotionActions.map((action, index) => {
            const Icon = action.icon
            const isActive = action.id === triggeredAction

            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 border rounded-lg border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <motion.div
                      animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-5 w-5 text-primary shrink-0" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{action.action}</div>
                      <div className="text-xs text-muted-foreground">{action.emotion}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-3 text-xs shrink-0"
                    onClick={() => handleTrigger(action.id)}
                  >
                    Trigger
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Active Animation Display */}
        {activeAction && (() => {
          const ActiveIcon = activeAction.icon
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mb-2"
              >
                <ActiveIcon className="h-12 w-12 text-primary mx-auto" />
              </motion.div>
              <div className="text-sm font-semibold mb-1">{activeAction.action}</div>
              <div className="text-xs text-muted-foreground mb-2">{activeAction.emotion}</div>
              <Badge variant="default" className="text-xs">
                {activeAction.animation}
              </Badge>
            </motion.div>
          )
        })()}

        {/* Info */}
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="text-xs text-muted-foreground">
            Emotion Mapping: Privacy actions trigger positive animations (lock closing = 安心 emoji
            fade). This makes privacy actions feel rewarding and safe.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { EmotionMappingAnimations }
