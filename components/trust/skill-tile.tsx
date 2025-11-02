"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Sparkles,
  Link2,
  FileText,
  Award,
  Briefcase,
} from "lucide-react"
import { TileVerificationBadge } from "./tile-verification-badge"

interface SkillTileProps {
  tile: {
    id: string
    title: string
    type: string
    thumbnail: string
    description: string
    verification: "verified-by-ai" | "added-via-ai" | "synced-from-linkedin"
    source: string
    timestamp: string
  }
}

const typeIcons: Record<string, any> = {
  project: Briefcase,
  certificate: Award,
  post: FileText,
}

export function SkillTile({ tile }: SkillTileProps) {
  const Icon = typeIcons[tile.type] || FileText

  return (
    <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md group">
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="h-12 w-12 text-primary/30" />
          </div>
          <div className="absolute top-2 right-2">
            <TileVerificationBadge verification={tile.verification} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="text-sm font-semibold mb-1">{tile.title}</div>
              <div className="text-xs text-muted-foreground mb-2">{tile.description}</div>
            </div>
            <Badge variant="outline" className="text-xs">
              {tile.type}
            </Badge>
          </div>

          {/* Source & Timestamp */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              {tile.verification === "verified-by-ai" && (
                <CheckCircle2 className="h-3 w-3 text-green-600" />
              )}
              {tile.verification === "added-via-ai" && (
                <Sparkles className="h-3 w-3 text-purple-600" />
              )}
              {tile.verification === "synced-from-linkedin" && (
                <Link2 className="h-3 w-3 text-blue-600" />
              )}
              <span>{tile.source}</span>
            </div>
            <div className="text-muted-foreground">{tile.timestamp}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

