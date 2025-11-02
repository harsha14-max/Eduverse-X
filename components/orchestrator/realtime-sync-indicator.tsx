"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"

interface RealtimeSyncIndicatorProps {
  isConnected: boolean
  lastSync?: Date
}

export function RealtimeSyncIndicator({
  isConnected,
  lastSync,
}: RealtimeSyncIndicatorProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isConnected) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isConnected])

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {isConnected ? (
          <Wifi className={`h-4 w-4 text-green-600 ${isAnimating ? "animate-pulse" : ""}`} />
        ) : (
          <WifiOff className="h-4 w-4 text-red-600" />
        )}
        {isAnimating && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            className="absolute inset-0 bg-green-600 rounded-full"
          />
        )}
      </div>
      <Badge
        variant={isConnected ? "default" : "destructive"}
        className="text-xs"
      >
        {isConnected ? "Live" : "Offline"}
      </Badge>
      {lastSync && isConnected && (
        <span className="text-xs text-muted-foreground">
          Synced {lastSync.toLocaleTimeString()}
        </span>
      )}
    </div>
  )
}

