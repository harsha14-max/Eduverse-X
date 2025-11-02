"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CursorData {
  id: string
  userId: string
  userName: string
  userColor: string
  x: number
  y: number
  activity: "editing" | "viewing" | "commenting"
  selectedElementId?: string
}

interface CursorPresenceSystemProps {
  containerRef: React.RefObject<HTMLDivElement>
  cursors: CursorData[]
}

export function CursorPresenceSystem({
  containerRef,
  cursors,
}: CursorPresenceSystemProps) {
  const [mousePositions, setMousePositions] = useState<Map<string, CursorData>>(new Map())

  useEffect(() => {
    cursors.forEach((cursor) => {
      setMousePositions((prev) => {
        const newMap = new Map(prev)
        newMap.set(cursor.id, cursor)
        return newMap
      })
    })
  }, [cursors])

  return (
    <>
      {Array.from(mousePositions.values()).map((cursor) => (
        <motion.div
          key={cursor.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {/* Cursor with Name Tag and Glow */}
          <div className="relative flex flex-col items-center">
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
              className={`absolute inset-0 rounded-full blur-md`}
              style={{
                backgroundColor: cursor.userColor,
                opacity: 0.3,
              }}
            />

            {/* Cursor Icon */}
            <div
              className="w-4 h-4 rounded-full border-2 border-background shadow-lg"
              style={{ backgroundColor: cursor.userColor }}
            />

            {/* Name Tag */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 px-2 py-1 rounded-md bg-background border border-border shadow-md text-xs font-medium whitespace-nowrap"
              style={{ borderColor: cursor.userColor }}
            >
              <div className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cursor.userColor }}
                />
                <span>{cursor.userName}</span>
              </div>
              {cursor.selectedElementId && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  Editing {cursor.selectedElementId}
                </div>
              )}
            </motion.div>
          </div>

          {/* Selected Element Outline */}
          {cursor.selectedElementId && cursor.activity === "editing" && (
            <motion.div
              className="absolute -inset-2 rounded-lg border-2 pointer-events-none"
              style={{
                borderColor: cursor.userColor,
                boxShadow: `0 0 20px ${cursor.userColor}40`,
              }}
              animate={{
                boxShadow: [
                  `0 0 20px ${cursor.userColor}40`,
                  `0 0 30px ${cursor.userColor}60`,
                  `0 0 20px ${cursor.userColor}40`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>
      ))}
    </>
  )
}

