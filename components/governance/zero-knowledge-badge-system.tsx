"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Shield, Lock, Star, Award } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ZKBadge {
  id: string
  name: string
  description: string
  icon: typeof Trophy
  earned: boolean
  earnedDate?: string
  points: number
  category: "Security" | "Privacy" | "Transparency" | "Trust"
}

const zkBadges: ZKBadge[] = [
  {
    id: "1",
    name: "Vault Master",
    description: "Backed up all keys to IPFS and Filecoin",
    icon: Lock,
    earned: true,
    earnedDate: "2 days ago",
    points: 50,
    category: "Security",
  },
  {
    id: "2",
    name: "Privacy Guardian",
    description: "Enabled privacy mode for all sensitive data",
    icon: Shield,
    earned: true,
    earnedDate: "1 week ago",
    points: 30,
    category: "Privacy",
  },
  {
    id: "3",
    name: "Transparency Champion",
    description: "Completed full audit trail for 30 days",
    icon: Star,
    earned: false,
    points: 40,
    category: "Transparency",
  },
  {
    id: "4",
    name: "Zero-Knowledge Hero",
    description: "Used ZK proofs for 10+ operations",
    icon: Award,
    earned: false,
    points: 60,
    category: "Trust",
  },
  {
    id: "5",
    name: "Key Rotator",
    description: "Rotated all keys within 90 days",
    icon: Lock,
    earned: true,
    earnedDate: "3 days ago",
    points: 25,
    category: "Security",
  },
]

function ZeroKnowledgeBadgeSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const earnedBadges = zkBadges.filter((b) => b.earned)
  const totalPoints = earnedBadges.reduce((sum, b) => sum + b.points, 0)

  const filteredBadges =
    selectedCategory === "all"
      ? zkBadges
      : zkBadges.filter((b) => b.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Security":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      case "Privacy":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "Transparency":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "Trust":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Zero-Knowledge Badge System (ZKBS)</CardTitle>
              <CardDescription className="text-xs">
                Rewards for good security behavior
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {totalPoints} pts
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{earnedBadges.length}</div>
            <div className="text-xs text-muted-foreground">Badges Earned</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {zkBadges.length - earnedBadges.length}
            </div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            className="text-xs"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Button>
          {["Security", "Privacy", "Transparency", "Trust"].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Badges List */}
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {filteredBadges.map((badge, index) => {
              const Icon = badge.icon
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 border rounded-lg transition-all ${
                    badge.earned
                      ? "bg-primary/5 border-primary/20"
                      : "bg-muted/50 border-border opacity-60"
                  } ${getCategoryColor(badge.category)}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                        badge.earned ? "bg-primary/20" : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${badge.earned ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-sm">{badge.name}</div>
                        <Badge variant={badge.earned ? "default" : "outline"} className="text-xs">
                          {badge.points} pts
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">{badge.description}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {badge.category}
                        </Badge>
                        {badge.earned && badge.earnedDate && (
                          <span className="text-xs text-muted-foreground">
                            Earned: {badge.earnedDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export { ZeroKnowledgeBadgeSystem }
