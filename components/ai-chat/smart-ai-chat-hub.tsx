"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContextModeSelector, ContextMode } from "./context-mode-selector"
import { GrowthModePanel } from "./growth-mode-panel"
import { AutomationModePanel } from "./automation-mode-panel"
import { MentorshipModePanel } from "./mentorship-mode-panel"
import { AIChatConsole } from "../dashboard/ai-chat-console"

export function SmartAIChatHub() {
  const [mode, setMode] = useState<ContextMode>("automation")

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-lg font-bold">Smart AI Chat Hub</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Context-aware AI assistant with specialized modes
            </p>
          </div>
        </div>
        <ContextModeSelector mode={mode} onModeChange={setMode} />
      </CardHeader>

      <CardContent className="p-0">
        <AnimatePresence mode="wait">
          {mode === "automation" && (
            <motion.div
              key="automation"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <AutomationModePanel />
            </motion.div>
          )}
          {mode === "growth" && (
            <motion.div
              key="growth"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <GrowthModePanel />
            </motion.div>
          )}
          {mode === "mentorship" && (
            <motion.div
              key="mentorship"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <MentorshipModePanel />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

