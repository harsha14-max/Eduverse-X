"use client"

/**
 * AI Risk Classifier
 * Classifies permission risk levels based on access type, resource sensitivity, and usage context
 */

export type RiskLevel = "low" | "medium" | "high"

export interface RiskFactors {
  accessType: "read" | "write" | "admin"
  resourceSensitivity: "public" | "internal" | "sensitive" | "critical"
  usageContext: string
  aiEntity: string
}

export interface RiskClassification {
  level: RiskLevel
  score: number // 0-100
  factors: {
    accessType: number
    resourceSensitivity: number
    usageContext: number
  }
  explanation: string
}

/**
 * Classify risk level based on multiple factors
 */
function classifyRisk(factors: RiskFactors): RiskClassification {
  let accessTypeScore = 0
  let resourceScore = 0
  let contextScore = 0

  // Access Type Scoring
  switch (factors.accessType) {
    case "read":
      accessTypeScore = 20
      break
    case "write":
      accessTypeScore = 50
      break
    case "admin":
      accessTypeScore = 80
      break
  }

  // Resource Sensitivity Scoring
  switch (factors.resourceSensitivity) {
    case "public":
      resourceScore = 10
      break
    case "internal":
      resourceScore = 30
      break
    case "sensitive":
      resourceScore = 60
      break
    case "critical":
      resourceScore = 90
      break
  }

  // Usage Context Scoring (simplified)
  const sensitiveKeywords = ["delete", "modify", "admin", "critical", "financial", "personal"]
  const contextLower = factors.usageContext.toLowerCase()
  if (sensitiveKeywords.some((keyword) => contextLower.includes(keyword))) {
    contextScore = 40
  } else {
    contextScore = 10
  }

  // Calculate total score
  const totalScore = Math.round((accessTypeScore + resourceScore + contextScore) / 3)

  // Determine risk level
  let level: RiskLevel
  let explanation: string

  if (totalScore < 30) {
    level = "low"
    explanation = `Low risk: ${factors.accessType} access to ${factors.resourceSensitivity} resource for ${factors.usageContext}`
  } else if (totalScore < 70) {
    level = "medium"
    explanation = `Medium risk: ${factors.accessType} access may expose sensitive data. Review usage context: ${factors.usageContext}`
  } else {
    level = "high"
    explanation = `High risk: ${factors.accessType} access to ${factors.resourceSensitivity} resource requires careful monitoring. Context: ${factors.usageContext}`
  }

  return {
    level,
    score: totalScore,
    factors: {
      accessType: accessTypeScore,
      resourceSensitivity: resourceScore,
      usageContext: contextScore,
    },
    explanation,
  }
}

/**
 * Get risk level from storage (for frontend-only)
 */
function getRiskFromStorage(permissionId: string): RiskClassification | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(`risk_${permissionId}`)
    if (stored) {
      return JSON.parse(stored) as RiskClassification
    }
  } catch (error) {
    console.error("Error reading risk from storage:", error)
  }

  return null
}

/**
 * Save risk classification to storage (for frontend-only)
 */
function saveRiskToStorage(permissionId: string, risk: RiskClassification): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(`risk_${permissionId}`, JSON.stringify(risk))
  } catch (error) {
    console.error("Error saving risk to storage:", error)
  }
}

export { classifyRisk }

export { getRiskFromStorage }

export { saveRiskToStorage }
