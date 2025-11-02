"use client"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GripVertical, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DraggableWidgetProps {
  id: string
  children: React.ReactNode
  title: string
  onRemove?: () => void
  onResize?: () => void
}

export function DraggableWidget({ id, children, title, onRemove, onResize }: DraggableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          {/* Widget Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 flex-1">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded transition-colors"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-sm">{title}</h3>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onResize && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={onResize}
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
              )}
              {onRemove && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={onRemove}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Widget Content */}
          <div className="p-4">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

