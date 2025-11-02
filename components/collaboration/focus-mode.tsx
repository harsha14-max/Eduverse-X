"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EyeOff, Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FocusModeProps {
  children: React.ReactNode
  cursors?: any[]
  comments?: any[]
}

export default function FocusMode({ children, cursors = [], comments = [] }: FocusModeProps) {
  const [isActive, setIsActive] = useState(false)
  const [fadedElements, setFadedElements] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isActive) {
      // Fade out cursors and comments
      const cursorIds = cursors.map((c) => c.id)
      const commentIds = comments.map((c) => c.id)
      setFadedElements(new Set([...cursorIds, ...commentIds]))
    } else {
      setFadedElements(new Set())
    }
  }, [isActive, cursors, comments])

  return (
    <div className="relative">
      {/* Focus Mode Toggle */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={isActive ? "default" : "outline"}
              onClick={() => setIsActive(!isActive)}
              className="gap-2 fixed top-4 right-4 z-50"
            >
              {isActive ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Focus Mode
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Enable Focus
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {isActive
                ? "Disable focus mode to see collaborators"
                : "Enable focus mode to hide cursors and comments"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Main Content */}
      <div className={isActive ? "relative" : ""}>
        {children}
      </div>

      {/* Faded Overlay */}
      <AnimatePresence>
        {isActive && fadedElements.size > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(0,0,0,0.1) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Focus Mode Badge */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 right-4 z-50"
          >
            <Badge variant="outline" className="bg-background border-primary text-primary">
              <EyeOff className="h-3 w-3 mr-1" />
              Focus Mode Active
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

