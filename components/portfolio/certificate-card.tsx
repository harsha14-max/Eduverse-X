"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Award,
  CheckCircle2,
  Download,
  ExternalLink,
  MoreVertical,
  Sparkles,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Certificate {
  id: string
  organization: string
  courseName: string
  thumbnail: string
  date: string
  category: string
  badges: string[]
  verified: boolean
}

interface CertificateCardProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="border-border hover:border-primary transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-3">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  {certificate.organization}
                </span>
                {certificate.verified && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    Verified
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm line-clamp-2">{certificate.courseName}</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Certificate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Thumbnail Preview */}
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            className="relative h-24 rounded-lg bg-muted overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <Award className="h-8 w-8" />
            </div>
          </motion.div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            {certificate.badges.map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs gap-1"
              >
                {badge === "AI Validated" && <Sparkles className="h-3 w-3" />}
                {badge === "Top Skill" && <CheckCircle2 className="h-3 w-3 text-green-600" />}
                {badge}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground">{certificate.date}</div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              <ExternalLink className="h-3 w-3" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

