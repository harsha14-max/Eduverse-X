"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ReliabilityRingProps {
  reliability: number // 0-100
  size?: number
  className?: string
}

export function ReliabilityRing({ reliability, size = 24, className }: ReliabilityRingProps) {
  const radius = (size - 4) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (reliability / 100) * circumference

  const getColor = () => {
    if (reliability >= 90) return "text-green-600 stroke-green-600"
    if (reliability >= 70) return "text-yellow-600 stroke-yellow-600"
    return "text-red-600 stroke-red-600"
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-muted stroke-muted"
          opacity={0.2}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={getColor()}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("text-xs font-bold", getColor().split(" ")[0])}>
          {Math.round(reliability)}
        </span>
      </div>
    </div>
  )
}

