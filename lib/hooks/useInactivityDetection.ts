"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { THRESHOLDS, getTimingThreshold } from "@/lib/timing-constants"
import { timingManager } from "@/lib/timing-manager"

interface UseInactivityDetectionOptions {
  threshold?: number | keyof typeof THRESHOLDS
  onInactive?: () => void
  onActive?: () => void
  enabled?: boolean
  pauseOnInactive?: boolean // Pause timing manager when inactive
}

/**
 * Hook for detecting user inactivity
 * Returns inactivity state and manual activity update function
 */
export function useInactivityDetection(options: UseInactivityDetectionOptions = {}) {
  const {
    threshold: thresholdMs = THRESHOLDS.PORTFOLIO_INACTIVITY,
    onInactive,
    onActive,
    enabled = true,
    pauseOnInactive = true,
  } = options

  const [isInactive, setIsInactive] = useState(false)
  const lastActivityRef = useRef<number>(Date.now())
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  /**
   * Reset inactivity timer
   */
  const resetTimer = useCallback(() => {
    if (!isMountedRef.current || !enabled) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    lastActivityRef.current = Date.now()
    
    if (isInactive) {
      setIsInactive(false)
      if (onActive) {
        onActive()
      }
      if (pauseOnInactive) {
        timingManager.resumeAll()
      }
    }

    const actualThreshold = typeof thresholdMs === "string"
      ? getTimingThreshold(thresholdMs)
      : thresholdMs

    timeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        const timeSinceLastActivity = Date.now() - lastActivityRef.current
        if (timeSinceLastActivity >= actualThreshold) {
          setIsInactive(true)
          if (onInactive) {
            onInactive()
          }
          if (pauseOnInactive) {
            timingManager.pauseAll()
          }
        }
      }
    }, actualThreshold)
  }, [enabled, thresholdMs, isInactive, onInactive, onActive, pauseOnInactive])

  /**
   * Update activity manually
   */
  const updateActivity = useCallback(() => {
    timingManager.updateActivity()
    resetTimer()
  }, [resetTimer])

  // Setup activity listeners
  useEffect(() => {
    if (!enabled) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
    
    activityEvents.forEach((event) => {
      window.addEventListener(event, updateActivity, { passive: true })
    })

    // Initial timer
    resetTimer()

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, updateActivity)
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [enabled, updateActivity, resetTimer])

  return {
    isInactive,
    updateActivity,
    timeSinceLastActivity: Date.now() - lastActivityRef.current,
  }
}

