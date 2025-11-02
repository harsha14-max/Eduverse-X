"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  BookOpen,
  Code,
  Briefcase,
  CheckCircle2,
  Loader2,
} from "lucide-react"

interface DataSourceNodeProps {
  source: {
    id: string
    name: string
    type: string
    status: string
    location: string
  }
  isSelected: boolean
  onClick: () => void
}

const typeIcons: Record<string, any> = {
  Academic: BookOpen,
  Tech: Code,
  Jobs: Briefcase,
  Research: BookOpen,
  Blogs: Code,
}

export function DataSourceNode({ source, isSelected, onClick }: DataSourceNodeProps) {
  const Icon = typeIcons[source.type] || Activity
  const StatusIcon = source.status === "active" ? CheckCircle2 : Loader2

  return (
    <Card
      className={`cursor-pointer transition-all hover:border-primary ${
        isSelected ? "border-primary border-2" : "border-border"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`h-4 w-4 ${source.status === "active" ? "text-green-600" : "text-yellow-600"}`} />
          <div className="text-xs font-medium flex-1">{source.name}</div>
          <StatusIcon
            className={`h-3 w-3 ${
              source.status === "active" ? "text-green-600 animate-pulse" : "text-yellow-600 animate-spin"
            }`}
          />
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {source.type}
          </Badge>
          <div className="text-xs text-muted-foreground">{source.location}</div>
        </div>
      </CardContent>
    </Card>
  )
}

