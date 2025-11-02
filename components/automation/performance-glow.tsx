"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PerformanceGlowProps {
  successRate: number // 0-100
  className?: string
}

export function PerformanceGlow({ successRate, className }: PerformanceGlowProps) {
  const getGlowColor = () => {
    if (successRate >= 90) return "shadow-green-500/50"
    if (successRate >= 70) return "shadow-yellow-500/50"
    return "shadow-red-500/50"
  }

  return (
    <motion.div
      className={cn(
        "absolute inset-0 rounded-lg pointer-events-none",
        getGlowColor(),
        className
      )}
      animate={{
        boxShadow: [
          `0 0 0px ${successRate >= 90 ? "rgba(34, 197, 94, 0)" : successRate >= 70 ? "rgba(234, 179, 8, 0)" : "rgba(239, 68, 68, 0)"}`,
          `0 0 8px ${successRate >= 90 ? "rgba(34, 197, 94, 0.5)" : successRate >= 70 ? "rgba(234, 179, 8, 0.5)" : "rgba(239, 68, 68, 0.5)"}`,
          `0 0 0px ${successRate >= 90 ? "rgba(34, 197, 94, 0)" : successRate >= 70 ? "rgba(234, 179, 8, 0)" : "rgba(239, 68, 68, 0)"}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

