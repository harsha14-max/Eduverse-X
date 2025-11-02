"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface CollaboratorCursor {
  id: string
  name: string
  avatar: string
  x: number
  y: number
  color: string
  activity: "editing" | "viewing" | "commenting"
  selectedNodeId?: string
}

interface SharedCanvasAreaProps {
  children: React.ReactNode
  collaborators?: CollaboratorCursor[]
}

export default function SharedCanvasArea({ children, collaborators = [] }: SharedCanvasAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursors, setCursors] = useState<CollaboratorCursor[]>(collaborators)

  // Mock cursor movement for demo
  useEffect(() => {
    if (cursors.length === 0) return

    const interval = setInterval(() => {
      setCursors((prev) =>
        prev.map((cursor) => ({
          ...cursor,
          x: cursor.x + (Math.random() - 0.5) * 20,
          y: cursor.y + (Math.random() - 0.5) * 20,
        }))
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [cursors.length])

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case "editing":
        return "✏️"
      case "viewing":
        return "👁️"
      case "commenting":
        return "💬"
      default:
        return ""
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Main Canvas Content */}
      <div className="relative z-0">{children}</div>

      {/* Real-time Cursors */}
      <AnimatePresence>
        {cursors.map((cursor) => (
          <motion.div
            key={cursor.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: `${cursor.x}px`,
              top: `${cursor.y}px`,
            }}
          >
            {/* Cursor with Glow */}
            <div className="relative">
              {/* Glow Trail */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className={`absolute inset-0 rounded-full ${cursor.color} blur-sm`}
                style={{ backgroundColor: cursor.color }}
              />
              
              {/* Cursor */}
              <div className="relative flex flex-col items-center">
                <Avatar className="h-6 w-6 border-2 border-background shadow-md">
                  <AvatarFallback className="text-xs" style={{ backgroundColor: cursor.color }}>
                    {cursor.avatar}
                  </AvatarFallback>
                </Avatar>
                
                {/* Name Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 px-2 py-1 rounded-md bg-background border border-border shadow-sm text-xs font-medium whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>{getActivityIcon(cursor.activity)}</span>
                    <span>{cursor.name}</span>
                  </div>
                  {cursor.selectedNodeId && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {cursor.selectedNodeId}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Selected Node Outline */}
            {cursor.selectedNodeId && cursor.activity === "editing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute -inset-2 rounded-lg border-2 ${cursor.color} shadow-lg`}
                style={{
                  borderColor: cursor.color,
                  boxShadow: `0 0 20px ${cursor.color}40`,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

