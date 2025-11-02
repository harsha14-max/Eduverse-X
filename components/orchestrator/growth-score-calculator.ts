/**
 * Growth Score Calculator
 * Calculates overall Growth Score from multiple metrics
 */

export interface GrowthMetrics {
  skillProgress: number // 0-100
  postingFrequency: number // posts per week
  networkEngagement: number // 0-100 (likes, comments, shares)
  mentorFeedback: number // 0-10 (AI mentor rating)
}

export interface GrowthScore {
  total: number // 0-100
  breakdown: {
    skillProgress: number
    postingFrequency: number
    networkEngagement: number
    mentorFeedback: number
  }
  level: "low" | "medium" | "high" | "excellent"
  color: "red" | "yellow" | "green" | "blue"
}

/**
 * Calculate Growth Score from multiple metrics
 */
export function calculateGrowthScore(metrics: GrowthMetrics): GrowthScore {
  // Normalize metrics to 0-25 scale (total = 100)
  const skillWeight = 0.3 // 30% weight
  const postingWeight = 0.25 // 25% weight (normalized from posts/week to 0-100)
  const engagementWeight = 0.25 // 25% weight
  const mentorWeight = 0.2 // 20% weight (normalized from 0-10 to 0-100)

  // Normalize posting frequency (assuming 0-10 posts/week = 0-100)
  const normalizedPosting = Math.min((metrics.postingFrequency / 10) * 100, 100)
  
  // Normalize mentor feedback (0-10 to 0-100)
  const normalizedMentor = (metrics.mentorFeedback / 10) * 100

  const breakdown = {
    skillProgress: metrics.skillProgress * skillWeight,
    postingFrequency: normalizedPosting * postingWeight,
    networkEngagement: metrics.networkEngagement * engagementWeight,
    mentorFeedback: normalizedMentor * mentorWeight,
  }

  const total = Math.round(
    breakdown.skillProgress +
    breakdown.postingFrequency +
    breakdown.networkEngagement +
    breakdown.mentorFeedback
  )

  // Determine level and color
  let level: "low" | "medium" | "high" | "excellent"
  let color: "red" | "yellow" | "green" | "blue"

  if (total < 40) {
    level = "low"
    color = "red"
  } else if (total < 65) {
    level = "medium"
    color = "yellow"
  } else if (total < 85) {
    level = "high"
    color = "green"
  } else {
    level = "excellent"
    color = "blue"
  }

  return {
    total,
    breakdown,
    level,
    color,
  }
}

/**
 * Get growth score from localStorage (for frontend-only)
 */
export function getGrowthScoreFromStorage(): GrowthScore | null {
  if (typeof window === "undefined") return null
  
  try {
    const stored = localStorage.getItem("growthScore")
    if (stored) {
      return JSON.parse(stored) as GrowthScore
    }
  } catch (error) {
    console.error("Error reading growth score from storage:", error)
  }
  
  return null
}

/**
 * Save growth score to localStorage (for frontend-only)
 */
export function saveGrowthScoreToStorage(score: GrowthScore): void {
  if (typeof window === "undefined") return
  
  try {
    localStorage.setItem("growthScore", JSON.stringify(score))
  } catch (error) {
    console.error("Error saving growth score to storage:", error)
  }
}
