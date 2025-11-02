"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Minimize2, Maximize2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResizableSectionProps {
  children: React.ReactNode
  defaultHeight?: number
  minHeight?: number
  maxHeight?: number
  title?: string
  className?: string
  onResize?: (height: number) => void
  showMinimize?: boolean
  header?: React.ReactNode
}

export function ResizableSection({
  children,
  defaultHeight = 300,
  minHeight = 100,
  maxHeight = 800,
  title,
  className,
  onResize,
  showMinimize = true,
  header,
}: ResizableSectionProps) {
  const [height, setHeight] = useState(defaultHeight)
  const [isResizing, setIsResizing] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const newHeight = e.clientY - rect.top
      const clampedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight))
      setHeight(clampedHeight)
      if (onResize) {
        onResize(clampedHeight)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, minHeight, maxHeight, onResize])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  if (isMinimized) {
    return (
      <div
        ref={sectionRef}
        className={cn(
          "relative border-t border-border bg-background/95 backdrop-blur flex items-center justify-between px-4 py-2 shrink-0",
          className
        )}
      >
        <div className="flex items-center gap-2 text-sm font-semibold">
          {header || title}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsMinimized(false)}
          title="Expand section"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      ref={sectionRef}
      initial={false}
      animate={{ height }}
      className={cn("relative flex flex-col overflow-hidden border-t border-border bg-background", className)}
      style={{ height }}
    >
      {/* Header */}
      {(header || title || showMinimize) && (
        <div className="flex items-center justify-between border-b border-border shrink-0 px-4 py-2 bg-background/95 backdrop-blur">
          {header || (title && <div className="text-sm font-semibold">{title}</div>)}
          {showMinimize && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(true)}
              title="Minimize section"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden min-h-0">{children}</div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute bottom-0 left-0 right-0 h-1 cursor-row-resize bg-transparent hover:bg-primary/20 transition-colors z-10"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-muted-foreground/30 hover:bg-primary rounded-full h-1 w-16 transition-colors" />
      </div>
    </motion.div>
  )
}

