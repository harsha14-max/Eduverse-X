"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react"

interface EmojiFeedbackProps {
  status: "success" | "error" | "warning" | "info"
  message?: string
  show?: boolean
  onDismiss?: () => void
}

export function EmojiFeedback({ 
  status, 
  message,
  show = true,
  onDismiss 
}: EmojiFeedbackProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    setIsVisible(show)
    
    if (show && status === "success") {
      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onDismiss) {
          onDismiss()
        }
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [show, status, onDismiss])

  const getEmoji = () => {
    switch (status) {
      case "success":
        return "🎉"
      case "error":
        return "❌"
      case "warning":
        return "⚠️"
      case "info":
        return "ℹ️"
    }
  }

  const getMessage = () => {
    if (message) return message
    
    switch (status) {
      case "success":
        return "Workflow executed perfectly!"
      case "error":
        return "Workflow execution failed"
      case "warning":
        return "Workflow completed with warnings"
      case "info":
        return "Workflow status update"
    }
  }

  const getIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "info":
        return <Sparkles className="h-4 w-4 text-blue-600" />
    }
  }

  const getColor = () => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50/50"
      case "error":
        return "border-red-200 bg-red-50/50"
      case "warning":
        return "border-yellow-200 bg-yellow-50/50"
      case "info":
        return "border-blue-200 bg-blue-50/50"
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <Card className={`border ${getColor()} shadow-lg min-w-[300px]`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="text-3xl"
              >
                {getEmoji()}
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getIcon()}
                  <div className="text-sm font-semibold">{getMessage()}</div>
                </div>
                {message && (
                  <div className="text-xs text-muted-foreground">
                    {message}
                  </div>
                )}
              </div>
              {onDismiss && (
                <button
                  onClick={() => {
                    setIsVisible(false)
                    onDismiss()
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

