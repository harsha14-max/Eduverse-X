"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useTiming } from "./useTiming"
import { INTERVALS, getTimingInterval, TimingPriority } from "@/lib/timing-constants"

interface UseAutoRefreshOptions {
  interval?: number | keyof typeof INTERVALS
  enabled?: boolean
  priority?: TimingPriority
  onRefresh?: () => void | Promise<void>
}

/**
 * Hook for auto-refreshing data at intervals
 * Returns refresh state, manual refresh function, and auto-refresh controls
 */
export function useAutoRefresh(options: UseAutoRefreshOptions = {}) {
  const {
    interval: intervalMs = INTERVALS.ANALYTICS_REFRESH,
    enabled = true,
    priority = TimingPriority.MEDIUM,
    onRefresh,
  } = options

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const { interval, cancel } = useTiming()
  const intervalIdRef = useRef<string>("")
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (intervalIdRef.current) {
        cancel(intervalIdRef.current)
      }
    }
  }, [cancel])

  /**
   * Execute refresh
   */
  const executeRefresh = useCallback(async () => {
    if (!isMountedRef.current || isRefreshing) return

    setIsRefreshing(true)
    
    try {
      if (onRefresh) {
        await onRefresh()
      }
      setLastRefresh(new Date())
    } catch (error) {
      console.error("Auto-refresh error:", error)
    } finally {
      if (isMountedRef.current) {
        setIsRefreshing(false)
      }
    }
  }, [isRefreshing, onRefresh])

  /**
   * Manual refresh trigger
   */
  const refresh = useCallback(async () => {
    await executeRefresh()
  }, [executeRefresh])

  // Setup auto-refresh interval
  useEffect(() => {
    if (!enabled) {
      if (intervalIdRef.current) {
        cancel(intervalIdRef.current)
        intervalIdRef.current = ""
      }
      return
    }

    const actualInterval = typeof intervalMs === "string"
      ? getTimingInterval(intervalMs)
      : intervalMs

    // Initial refresh
    executeRefresh()

    // Schedule interval
    intervalIdRef.current = interval(
      executeRefresh,
      actualInterval,
      { priority, enabled: true }
    )

    return () => {
      if (intervalIdRef.current) {
        cancel(intervalIdRef.current)
        intervalIdRef.current = ""
      }
    }
  }, [enabled, intervalMs, priority, interval, cancel, executeRefresh])

  return {
    isRefreshing,
    lastRefresh,
    refresh,
  }
}

