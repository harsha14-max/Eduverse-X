"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Sparkles, Link2 } from "lucide-react"

interface TileVerificationBadgeProps {
  verification: "verified-by-ai" | "added-via-ai" | "synced-from-linkedin"
}

export function TileVerificationBadge({ verification }: TileVerificationBadgeProps) {
  const getBadgeConfig = () => {
    switch (verification) {
      case "verified-by-ai":
        return {
          icon: CheckCircle2,
          label: "Verified",
          className: "bg-green-50 text-green-700 border-green-300",
        }
      case "added-via-ai":
        return {
          icon: Sparkles,
          label: "AI Added",
          className: "bg-purple-50 text-purple-700 border-purple-300",
        }
      case "synced-from-linkedin":
        return {
          icon: Link2,
          label: "Synced",
          className: "bg-blue-50 text-blue-700 border-blue-300",
        }
      default:
        return {
          icon: CheckCircle2,
          label: "Verified",
          className: "bg-green-50 text-green-700 border-green-300",
        }
    }
  }

  const config = getBadgeConfig()
  const Icon = config.icon

  return (
    <Badge variant="outline" className={`text-xs gap-1 ${config.className}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}

