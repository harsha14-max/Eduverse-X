/**
 * Timing Constants for EduVerse Frontend
 * UX-aligned timing values for natural, emotionally-tuned interactions
 */

/**
 * Delay timings for single actions (anticipation/attention)
 * 1-2 seconds = anticipation or attention
 */
export const DELAYS = {
  /** AI response delay for natural conversation flow */
  AI_RESPONSE: 1500, // 1.5 seconds
  /** Post preview delay for auto-queue */
  POST_PREVIEW: 3000, // 3 seconds
  /** Toast auto-dismiss delay */
  TOAST_DISMISS: 4000, // 4 seconds
  /** Notification auto-hide delay */
  NOTIFICATION_HIDE: 8000, // 8 seconds
  /** Quick action confirmation delay */
  QUICK_ACTION: 500, // 0.5 seconds
  /** Form auto-save delay */
  AUTO_SAVE: 2000, // 2 seconds
} as const

/**
 * Interval timings for periodic tasks (reflection/consistency)
 * 4-5 seconds = reflection (showing tips)
 * 10+ seconds = consistency (background data sync)
 */
export const INTERVALS = {
  /** Notification polling fallback (WebSocket fallback) */
  NOTIFICATION_POLL: 15000, // 15 seconds
  /** Action feed refresh */
  ACTION_FEED_REFRESH: 30000, // 30 seconds
  /** Analytics dashboard auto-refresh */
  ANALYTICS_REFRESH: 300000, // 5 minutes
  /** Learning dashboard streak updates */
  LEARNING_STREAK_UPDATE: 60000, // 1 minute
  /** AI performance metrics refresh */
  AI_METRICS_REFRESH: 5000, // 5 seconds
  /** Unread count polling */
  UNREAD_COUNT_POLL: 5000, // 5 seconds
  /** Nudge display check */
  NUDGE_CHECK: 15000, // 15 seconds
  /** Privacy health check */
  PRIVACY_HEALTH_CHECK: 60000, // 1 minute
  /** Collaboration sync */
  COLLABORATION_SYNC: 30000, // 30 seconds
} as const

/**
 * Threshold timings for detection (inactivity/consistency)
 */
export const THRESHOLDS = {
  /** Portfolio inactivity detection threshold */
  PORTFOLIO_INACTIVITY: 600000, // 10 minutes
  /** User idle detection threshold */
  USER_IDLE: 300000, // 5 minutes
  /** Session timeout warning */
  SESSION_WARNING: 540000, // 9 minutes (warn before 10 min timeout)
} as const

/**
 * Animation timings for smooth transitions
 */
export const ANIMATIONS = {
  /** Fade in/out transition */
  FADE: 300, // 0.3 seconds
  /** Slide transition */
  SLIDE: 400, // 0.4 seconds
  /** Scale transition */
  SCALE: 200, // 0.2 seconds
  /** Typing indicator delay */
  TYPING_INDICATOR: 500, // 0.5 seconds
} as const

/**
 * Priority levels for timing tasks
 */
export enum TimingPriority {
  CRITICAL = 0, // Immediate execution
  HIGH = 1, // Important, execute soon
  MEDIUM = 2, // Normal priority
  LOW = 3, // Can be delayed
  BACKGROUND = 4, // Background tasks
}

/**
 * Get timing constant by category
 */
export function getTimingDelay(category: keyof typeof DELAYS): number {
  return DELAYS[category]
}

/**
 * Get timing interval by category
 */
export function getTimingInterval(category: keyof typeof INTERVALS): number {
  return INTERVALS[category]
}

/**
 * Get threshold by category
 */
export function getTimingThreshold(category: keyof typeof THRESHOLDS): number {
  return THRESHOLDS[category]
}

