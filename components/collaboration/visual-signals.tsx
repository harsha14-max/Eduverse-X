"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface VisualSignalsProps {
  children: React.ReactNode
  hasUpdate?: boolean
  collaboratorTyping?: boolean
  recentChange?: boolean
}

export function VisualSignals({
  children,
  hasUpdate = false,
  collaboratorTyping = false,
  recentChange = false,
}: VisualSignalsProps) {
  const [showFlash, setShowFlash] = useState(false)

  useEffect(() => {
    if (recentChange) {
      setShowFlash(true)
      const timer = setTimeout(() => setShowFlash(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [recentChange])

  return (
    <div className="relative">
      {children}
      
      {/* Flash Outline for Recent Changes */}
      <AnimatePresence>
        {showFlash && recentChange && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2,
              repeat: 0,
            }}
            className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none"
            style={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Pulse Animation for Collaborator Activity */}
      {collaboratorTyping && (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="absolute -top-1 -right-1"
        >
          <Badge className="h-4 w-4 p-0 rounded-full bg-primary animate-pulse">
            <div className="w-full h-full rounded-full bg-primary" />
          </Badge>
        </motion.div>
      )}

      {/* Notification Indicator */}
      {hasUpdate && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1"
        >
          <div className="relative">
            <Bell className="h-4 w-4 text-primary" />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full bg-primary opacity-50"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

