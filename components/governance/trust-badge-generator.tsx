"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share2, Copy, CheckCircle2, Trophy, Shield, Star } from "lucide-react"

interface TrustBadge {
  id: string
  name: string
  description: string
  icon: typeof Trophy
  earned: boolean
  earnedDate?: string
  shareable: boolean
}

const trustBadges: TrustBadge[] = [
  {
    id: "1",
    name: "Gold Guardian",
    description: "Privacy Health above 90 for 30 days",
    icon: Trophy,
    earned: true,
    earnedDate: "1 week ago",
    shareable: true,
  },
  {
    id: "2",
    name: "Privacy Champion",
    description: "Completed full audit trail for 90 days",
    icon: Shield,
    earned: true,
    earnedDate: "2 weeks ago",
    shareable: true,
  },
  {
    id: "3",
    name: "Trust Builder",
    description: "Maintained high trust score for 60 days",
    icon: Star,
    earned: false,
    shareable: false,
  },
]

function TrustBadgeGenerator() {
  const [badges] = useState<TrustBadge[]>(trustBadges)
  const [copiedBadge, setCopiedBadge] = useState<string | null>(null)

  const handleCopy = (badgeId: string) => {
    const badge = badges.find((b) => b.id === badgeId)
    if (badge) {
      navigator.clipboard.writeText(
        `I earned the "${badge.name}" badge on Eduverse AI! ${badge.description}`
      )
      setCopiedBadge(badgeId)
      setTimeout(() => setCopiedBadge(null), 2000)
    }
  }

  const handleShare = (badgeId: string) => {
    const badge = badges.find((b) => b.id === badgeId)
    if (badge) {
      // Frontend-only: simulate sharing
      console.log("Sharing badge:", badge.name)
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* Earned Badges */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Earned Trust Badges</div>
          {badges
            .filter((b) => b.earned)
            .map((badge, index) => {
              const Icon = badge.icon
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border rounded-lg border-primary/50 bg-primary/5 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm mb-1">{badge.name}</div>
                        <div className="text-xs text-muted-foreground mb-1">{badge.description}</div>
                        {badge.earnedDate && (
                          <div className="text-xs text-muted-foreground">
                            Earned: {badge.earnedDate}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge variant="default" className="text-xs shrink-0">
                      Earned
                    </Badge>
                  </div>
                  {badge.shareable && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs gap-1 flex-1"
                        onClick={() => handleCopy(badge.id)}
                      >
                        {copiedBadge === badge.id ? (
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        Copy Link
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs gap-1 flex-1"
                        onClick={() => handleShare(badge.id)}
                      >
                        <Share2 className="h-3 w-3" />
                        Share
                      </Button>
                    </div>
                  )}
                </motion.div>
              )
            })}
        </div>

        {/* Available Badges */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Available Badges</div>
          {badges
            .filter((b) => !b.earned)
            .map((badge, index) => {
              const Icon = badge.icon
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border rounded-lg border-border bg-muted/50 opacity-60"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-1">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      Not Earned
                    </Badge>
                  </div>
                </motion.div>
              )
            })}
        </div>

        {/* Info */}
        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <div className="text-xs text-muted-foreground">
            Trust badges (e.g., "Gold Guardian 🏅") can be shared on your public profile. Social
            Reputation Badge API shows trust badges on public profile.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { TrustBadgeGenerator }
