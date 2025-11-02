"use client"

import { Badge } from "@/components/ui/badge"

interface RiskColorBarProps {
  riskLevel: "low" | "medium" | "high"
  size?: "sm" | "md" | "lg"
}

function RiskColorBar({ riskLevel, size = "md" }: RiskColorBarProps) {
  const getRiskColor = () => {
    switch (riskLevel) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskLabel = () => {
    switch (riskLevel) {
      case "low":
        return "Low Risk"
      case "medium":
        return "Medium Risk"
      case "high":
        return "High Risk"
      default:
        return "Unknown"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-16 h-2"
      case "md":
        return "w-24 h-3"
      case "lg":
        return "w-32 h-4"
      default:
        return "w-24 h-3"
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${getSizeClasses()} rounded-full ${getRiskColor()} transition-colors`}
        style={{
          background: `linear-gradient(90deg, ${getRiskColor()}, ${getRiskColor()}80)`,
        }}
      />
      <Badge
        variant={riskLevel === "low" ? "default" : riskLevel === "medium" ? "secondary" : "destructive"}
        className="text-xs"
      >
        {getRiskLabel()}
      </Badge>
    </div>
  )
}

export { RiskColorBar }
