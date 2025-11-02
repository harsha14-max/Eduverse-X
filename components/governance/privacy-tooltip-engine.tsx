"use client"

/**
 * Privacy Tooltip Engine
 * Local AI tooltip engine for privacy education
 */

export interface PrivacyTooltip {
  id: string
  trigger: string
  content: string
  category: "security" | "privacy" | "transparency" | "compliance"
}

export const privacyTooltips: PrivacyTooltip[] = [
  {
    id: "1",
    trigger: "encryption",
    content: "Encryption protects your data from unauthorized access. Enabled encryption means your data is secure.",
    category: "security",
  },
  {
    id: "2",
    trigger: "auto-mask",
    content: "Auto-Mask Mode blurs identifiable data before AI analysis. This improves privacy but may reduce accuracy.",
    category: "privacy",
  },
  {
    id: "3",
    trigger: "audit-trail",
    content: "Audit Trail records all consent events with cryptographic hashes. This provides transparency and accountability.",
    category: "transparency",
  },
  {
    id: "4",
    trigger: "compliance",
    content: "Regional Compliance Checker ensures your data is stored in compliant zones. Non-compliant data should be moved.",
    category: "compliance",
  },
]

/**
 * Get tooltip content by trigger
 */
function getPrivacyTooltip(trigger: string): PrivacyTooltip | undefined {
  return privacyTooltips.find((tooltip) => tooltip.trigger === trigger)
}

/**
 * Get tooltips by category
 */
function getPrivacyTooltipsByCategory(
  category: "security" | "privacy" | "transparency" | "compliance"
): PrivacyTooltip[] {
  return privacyTooltips.filter((tooltip) => tooltip.category === category)
}

export { getPrivacyTooltip }

export { getPrivacyTooltipsByCategory }
