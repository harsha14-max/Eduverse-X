/**
 * Centralized Timing Manager for EduVerse
 * Manages all timing operations with priority queue, lifecycle management, and pause/resume
 */

import { TimingPriority } from "./timing-constants"

export interface TimingTask {
  id: string
  callback: () => void
  delay: number
  priority: TimingPriority
  interval?: boolean // If true, repeats at interval
  paused?: boolean
  createdAt: number
}

interface TimingManagerState {
  tasks: Map<string, TimingTask>
  paused: boolean
  lastActivity: number
}

class TimingManager {
  private state: TimingManagerState = {
    tasks: new Map(),
    paused: false,
    lastActivity: Date.now(),
  }

  private timeouts: Map<string, NodeJS.Timeout> = new Map()
  private intervals: Map<string, NodeJS.Timeout> = new Map()

  /**
   * Schedule a one-time delayed task
   */
  schedule(
    id: string,
    callback: () => void,
    delay: number,
    priority: TimingPriority = TimingPriority.MEDIUM
  ): string {
    // Cancel existing task if any
    this.cancel(id)

    const task: TimingTask = {
      id,
      callback,
      delay,
      priority,
      interval: false,
      paused: false,
      createdAt: Date.now(),
    }

    this.state.tasks.set(id, task)

    if (!this.state.paused && !task.paused) {
      this.executeTask(id)
    }

    return id
  }

  /**
   * Schedule a recurring interval task
   */
  scheduleInterval(
    id: string,
    callback: () => void,
    interval: number,
    priority: TimingPriority = TimingPriority.MEDIUM,
    immediate: boolean = false
  ): string {
    // Cancel existing task if any
    this.cancel(id)

    const task: TimingTask = {
      id,
      callback,
      delay: interval,
      priority,
      interval: true,
      paused: false,
      createdAt: Date.now(),
    }

    this.state.tasks.set(id, task)

    if (!this.state.paused && !task.paused) {
      if (immediate) {
        callback()
      }
      this.executeIntervalTask(id)
    }

    return id
  }

  /**
   * Execute a one-time task
   */
  private executeTask(id: string): void {
    const task = this.state.tasks.get(id)
    if (!task || task.interval || this.state.paused || task.paused) return

    const timeout = setTimeout(() => {
      try {
        task.callback()
      } catch (error) {
        console.error(`Error executing timing task ${id}:`, error)
      } finally {
        this.state.tasks.delete(id)
        this.timeouts.delete(id)
      }
    }, task.delay)

    this.timeouts.set(id, timeout)
  }

  /**
   * Execute an interval task
   */
  private executeIntervalTask(id: string): void {
    const task = this.state.tasks.get(id)
    if (!task || !task.interval || this.state.paused || task.paused) return

    const interval = setInterval(() => {
      const currentTask = this.state.tasks.get(id)
      if (!currentTask || this.state.paused || currentTask.paused) {
        this.cancel(id)
        return
      }

      try {
        currentTask.callback()
      } catch (error) {
        console.error(`Error executing interval task ${id}:`, error)
      }
    }, task.delay)

    this.intervals.set(id, interval)
  }

  /**
   * Cancel a scheduled task
   */
  cancel(id: string): boolean {
    const task = this.state.tasks.get(id)
    if (!task) return false

    if (task.interval) {
      const interval = this.intervals.get(id)
      if (interval) {
        clearInterval(interval)
        this.intervals.delete(id)
      }
    } else {
      const timeout = this.timeouts.get(id)
      if (timeout) {
        clearTimeout(timeout)
        this.timeouts.delete(id)
      }
    }

    this.state.tasks.delete(id)
    return true
  }

  /**
   * Pause a specific task
   */
  pauseTask(id: string): boolean {
    const task = this.state.tasks.get(id)
    if (!task || task.paused) return false

    task.paused = true

    if (task.interval) {
      const interval = this.intervals.get(id)
      if (interval) {
        clearInterval(interval)
        this.intervals.delete(id)
      }
    } else {
      const timeout = this.timeouts.get(id)
      if (timeout) {
        clearTimeout(timeout)
        this.timeouts.delete(id)
      }
    }

    return true
  }

  /**
   * Resume a paused task
   */
  resumeTask(id: string): boolean {
    const task = this.state.tasks.get(id)
    if (!task || !task.paused) return false

    task.paused = false

    if (this.state.paused) return false

    if (task.interval) {
      // For intervals, restart with remaining time estimation
      this.executeIntervalTask(id)
    } else {
      // For one-time tasks, restart with original delay
      this.executeTask(id)
    }

    return true
  }

  /**
   * Pause all tasks (e.g., when user is inactive)
   */
  pauseAll(): void {
    if (this.state.paused) return

    this.state.paused = true

    // Clear all active timers
    this.timeouts.forEach((timeout) => clearTimeout(timeout))
    this.timeouts.clear()
    this.intervals.forEach((interval) => clearInterval(interval))
    this.intervals.clear()
  }

  /**
   * Resume all paused tasks
   */
  resumeAll(): void {
    if (!this.state.paused) return

    this.state.paused = false

    // Restart all tasks
    this.state.tasks.forEach((task) => {
      if (!task.paused) {
        if (task.interval) {
          this.executeIntervalTask(task.id)
        } else {
          this.executeTask(task.id)
        }
      }
    })
  }

  /**
   * Update last activity timestamp
   */
  updateActivity(): void {
    this.state.lastActivity = Date.now()
    if (this.state.paused) {
      this.resumeAll()
    }
  }

  /**
   * Get time since last activity
   */
  getTimeSinceLastActivity(): number {
    return Date.now() - this.state.lastActivity
  }

  /**
   * Get all active tasks
   */
  getActiveTasks(): TimingTask[] {
    return Array.from(this.state.tasks.values())
  }

  /**
   * Get task by ID
   */
  getTask(id: string): TimingTask | undefined {
    return this.state.tasks.get(id)
  }

  /**
   * Clear all tasks
   */
  clearAll(): void {
    this.timeouts.forEach((timeout) => clearTimeout(timeout))
    this.timeouts.clear()
    this.intervals.forEach((interval) => clearInterval(interval))
    this.intervals.clear()
    this.state.tasks.clear()
  }

  /**
   * Check if manager is paused
   */
  isPaused(): boolean {
    return this.state.paused
  }

  /**
   * Get task count
   */
  getTaskCount(): number {
    return this.state.tasks.size
  }
}

// Singleton instance
export const timingManager = new TimingManager()

// Auto-resume on user activity (if paused due to inactivity)
if (typeof window !== "undefined") {
  const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
  activityEvents.forEach((event) => {
    window.addEventListener(event, () => {
      timingManager.updateActivity()
    }, { passive: true })
  })
}

