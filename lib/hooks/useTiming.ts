"use client"

import { useEffect, useRef, useCallback } from "react"
import { timingManager } from "@/lib/timing-manager"
import { DELAYS, INTERVALS, TimingPriority, getTimingDelay, getTimingInterval } from "@/lib/timing-constants"

interface UseTimingOptions {
  priority?: TimingPriority
  enabled?: boolean
  immediate?: boolean
}

/**
 * Hook for managing timing operations
 * Provides convenient methods for setTimeout and setInterval with lifecycle management
 */
export function useTiming() {
  const taskIdsRef = useRef<Set<string>>(new Set())

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      taskIdsRef.current.forEach((id) => {
        timingManager.cancel(id)
      })
      taskIdsRef.current.clear()
    }
  }, [])

  /**
   * Schedule a delayed callback
   */
  const delay = useCallback(
    (
      callback: () => void,
      delayMs: number | keyof typeof DELAYS,
      options?: UseTimingOptions
    ): string => {
      const {
        priority = TimingPriority.MEDIUM,
        enabled = true,
      } = options || {}

      if (!enabled) return ""

      const actualDelay = typeof delayMs === "string" ? getTimingDelay(delayMs) : delayMs
      const taskId = `delay-${Date.now()}-${Math.random()}`
      
      taskIdsRef.current.add(taskId)
      
      timingManager.schedule(taskId, callback, actualDelay, priority)
      
      return taskId
    },
    []
  )

  /**
   * Schedule a recurring interval callback
   */
  const interval = useCallback(
    (
      callback: () => void,
      intervalMs: number | keyof typeof INTERVALS,
      options?: UseTimingOptions
    ): string => {
      const {
        priority = TimingPriority.MEDIUM,
        enabled = true,
        immediate = false,
      } = options || {}

      if (!enabled) return ""

      const actualInterval = typeof intervalMs === "string" 
        ? getTimingInterval(intervalMs) 
        : intervalMs
      const taskId = `interval-${Date.now()}-${Math.random()}`
      
      taskIdsRef.current.add(taskId)
      
      timingManager.scheduleInterval(taskId, callback, actualInterval, priority, immediate)
      
      return taskId
    },
    []
  )

  /**
   * Cancel a scheduled task
   */
  const cancel = useCallback((taskId: string) => {
    if (taskIdsRef.current.has(taskId)) {
      timingManager.cancel(taskId)
      taskIdsRef.current.delete(taskId)
    }
  }, [])

  /**
   * Pause a task
   */
  const pause = useCallback((taskId: string) => {
    timingManager.pauseTask(taskId)
  }, [])

  /**
   * Resume a paused task
   */
  const resume = useCallback((taskId: string) => {
    timingManager.resumeTask(taskId)
  }, [])

  return {
    delay,
    interval,
    cancel,
    pause,
    resume,
  }
}

