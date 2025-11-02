"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

export type ContextMode = "automation" | "growth" | "mentorship"

interface ContextModeSelectorProps {
  mode: ContextMode
  onModeChange: (mode: ContextMode) => void
}

const modes: { id: ContextMode; label: string; icon: typeof Zap; description: string }[] = [
  {
    id: "automation",
    label: "Automation",
    icon: Zap,
    description: "Build workflows and automations",
  },
  {
    id: "growth",
    label: "Growth",
    icon: TrendingUp,
    description: "Social media & upskilling",
  },
  {
    id: "mentorship",
    label: "Mentorship",
    icon: GraduationCap,
    description: "Career advice & guidance",
  },
]

export function ContextModeSelector({ mode, onModeChange }: ContextModeSelectorProps) {
  return (
    <div className="flex gap-2 p-2 bg-muted/50 rounded-lg border border-border">
      {modes.map((modeOption) => {
        const Icon = modeOption.icon
        const isActive = mode === modeOption.id
        return (
          <motion.div
            key={modeOption.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onModeChange(modeOption.id)}
              className={cn(
                "gap-2 transition-all",
                isActive && "shadow-sm"
              )}
              title={modeOption.description}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{modeOption.label}</span>
            </Button>
          </motion.div>
        )
      })}
    </div>
  )
}

