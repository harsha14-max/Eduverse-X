"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Eye,
  RefreshCw,
  ExternalLink,
  Zap,
} from "lucide-react"

interface ToastNotification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

interface EnhancedToastManagerProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  maxToasts?: number
}

export function EnhancedToastManager({
  position = "top-right",
  maxToasts = 3,
}: EnhancedToastManagerProps) {
  const [toasts, setToasts] = useState<ToastNotification[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    // Listen for custom toast events
    const handleCustomToast = (event: CustomEvent<ToastNotification>) => {
      const toast = event.detail
      setToasts((prev) => {
        const newToasts = [toast, ...prev].slice(0, maxToasts)
        return newToasts
      })

      // Auto-dismiss after duration (unless hovered)
      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id))
        }, toast.duration)
      }
    }

    window.addEventListener("enhanced-toast", handleCustomToast as EventListener)
    return () => {
      window.removeEventListener("enhanced-toast", handleCustomToast as EventListener)
    }
  }, [maxToasts])

  const getToastIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle2
      case "error":
        return XCircle
      case "warning":
        return AlertCircle
      case "info":
        return Info
      default:
        return Info
    }
  }

  const getToastColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-300 bg-green-50 text-green-900"
      case "error":
        return "border-red-300 bg-red-50 text-red-900"
      case "warning":
        return "border-yellow-300 bg-yellow-50 text-yellow-900"
      case "info":
        return "border-blue-300 bg-blue-50 text-blue-900"
      default:
        return "border-border bg-background"
    }
  }

  const handleDismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 pointer-events-none`}>
      <div className="space-y-2">
        <AnimatePresence>
          {toasts.map((toast, index) => {
            const Icon = getToastIcon(toast.type)
            const isHovered = hoveredId === toast.id

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: position.includes("right") ? 100 : -100, y: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: index * 8,
                }}
                exit={{ opacity: 0, x: position.includes("right") ? 100 : -100 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                onMouseEnter={() => setHoveredId(toast.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="pointer-events-auto"
              >
                <Card
                  className={`border-2 shadow-lg ${getToastColor(toast.type)} min-w-[300px] max-w-[400px]`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        toast.type === "success" ? "bg-green-200" :
                        toast.type === "error" ? "bg-red-200" :
                        toast.type === "warning" ? "bg-yellow-200" :
                        "bg-blue-200"
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          toast.type === "success" ? "text-green-700" :
                          toast.type === "error" ? "text-red-700" :
                          toast.type === "warning" ? "text-yellow-700" :
                          "text-blue-700"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm mb-1">{toast.title}</div>
                        {toast.description && (
                          <div className="text-xs opacity-80 line-clamp-2">
                            {toast.description}
                          </div>
                        )}
                        {toast.action && (
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-xs gap-1"
                              onClick={toast.action.onClick}
                            >
                              {toast.action.label === "View" && <Eye className="h-3 w-3" />}
                              {toast.action.label === "Retry" && <RefreshCw className="h-3 w-3" />}
                              {toast.action.label === "View Details" && (
                                <ExternalLink className="h-3 w-3" />
                              )}
                              {toast.action.label}
                            </Button>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() => handleDismiss(toast.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Helper function to show enhanced toast
export function showEnhancedToast(toast: Omit<ToastNotification, "id">) {
  const event = new CustomEvent("enhanced-toast", {
    detail: {
      ...toast,
      id: `toast-${Date.now()}-${Math.random()}`,
    },
  })
  window.dispatchEvent(event)
}

