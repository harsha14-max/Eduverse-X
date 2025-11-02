"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Minimize2, Maximize2, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResizablePanelProps {
  children: React.ReactNode
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  direction?: "horizontal" | "vertical"
  className?: string
  onResize?: (width: number) => void
  showMinimize?: boolean
  header?: React.ReactNode
}

export function ResizablePanel({
  children,
  defaultWidth = 256,
  minWidth = 200,
  maxWidth = 800,
  direction = "horizontal",
  className,
  onResize,
  showMinimize = true,
  header,
}: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth)
  const [isResizing, setIsResizing] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return

      if (direction === "horizontal") {
        const newWidth = e.clientX - panelRef.current.getBoundingClientRect().left
        const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
        setWidth(clampedWidth)
        if (onResize) {
          onResize(clampedWidth)
        }
      } else {
        const newHeight = e.clientY - panelRef.current.getBoundingClientRect().top
        const clampedHeight = Math.max(minWidth, Math.min(maxWidth, newHeight))
        setWidth(clampedHeight)
        if (onResize) {
          onResize(clampedHeight)
        }
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
  }, [isResizing, minWidth, maxWidth, direction, onResize])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  if (isMinimized) {
    return (
      <div className={cn("relative flex items-center border-r border-border bg-background", className)}>
        <div className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 transition-colors" />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 m-2"
          onClick={() => setIsMinimized(false)}
          title="Expand panel"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      ref={panelRef}
      initial={false}
      animate={{
        width: direction === "horizontal" ? width : "100%",
        height: direction === "vertical" ? width : "100%",
      }}
      className={cn("relative flex flex-col overflow-hidden", className)}
      style={{
        [direction === "horizontal" ? "width" : "height"]: width,
        [direction === "vertical" ? "width" : "height"]: "100%",
      }}
    >
      {/* Header with Minimize Button */}
      {(header || showMinimize) && (
        <div className="flex items-center justify-between border-b border-border shrink-0 px-2 py-1 bg-background/95">
          {header || <div className="flex-1" />}
          {showMinimize && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(true)}
              title="Minimize panel"
            >
              <Minimize2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden min-h-0">{children}</div>

      {/* Resize Handle */}
      <div
        ref={resizeRef}
        onMouseDown={handleMouseDown}
        className={cn(
          "absolute cursor-col-resize z-10 bg-transparent hover:bg-primary/20 transition-colors",
          direction === "horizontal"
            ? "right-0 top-0 bottom-0 w-1"
            : "bottom-0 left-0 right-0 h-1"
        )}
      >
        <div
          className={cn(
            "absolute bg-muted-foreground/30 hover:bg-primary rounded-full transition-colors",
            direction === "horizontal"
              ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8"
              : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-8"
          )}
        />
      </div>
    </motion.div>
  )
}

