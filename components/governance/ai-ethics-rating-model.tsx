"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Shield, TrendingUp, AlertCircle } from "lucide-react"

interface AIPersonaRating {
  id: string
  name: string
  rating: number // 0-100
  factors: {
    dataUsage: number
    transparency: number
    consent: number
    privacy: number
  }
}

const personaRatings: AIPersonaRating[] = [
  {
    id: "1",
    name: "AI Mentor",
    rating: 92,
    factors: {
      dataUsage: 95,
      transparency: 90,
      consent: 95,
      privacy: 88,
    },
  },
  {
    id: "2",
    name: "AI Content Generator",
    rating: 85,
    factors: {
      dataUsage: 80,
      transparency: 90,
      consent: 85,
      privacy: 85,
    },
  },
  {
    id: "3",
    name: "AI Social Manager",
    rating: 78,
    factors: {
      dataUsage: 75,
      transparency: 80,
      consent: 80,
      privacy: 75,
    },
  },
]

function AIEthicsRatingModel() {
  const [ratings] = useState<AIPersonaRating[]>(personaRatings)

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "bg-green-500/10 text-green-700 border-green-500/20"
    if (rating >= 75) return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
    return "bg-red-500/10 text-red-700 border-red-500/20"
  }

  const getRatingIcon = (rating: number) => {
    if (rating >= 90) return <Shield className="h-4 w-4 text-green-600" />
    if (rating >= 75) return <TrendingUp className="h-4 w-4 text-yellow-600" />
    return <AlertCircle className="h-4 w-4 text-red-600" />
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* Overall Rating */}
        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Average Ethics Rating</div>
            <div className="text-2xl font-bold text-primary">
              {Math.round(ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length)}/100
            </div>
          </div>
          <Progress
            value={ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length}
            className="h-2"
          />
          <div className="text-xs text-muted-foreground mt-2">
            Graded on {ratings.length} AI personas
          </div>
        </div>

        {/* Persona Ratings */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">AI Persona Ethics Ratings</div>
          {ratings.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 border rounded-lg transition-all ${getRatingColor(persona.rating)}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getRatingIcon(persona.rating)}
                  <div className="font-semibold text-sm">{persona.name}</div>
                </div>
                <Badge
                  variant={persona.rating >= 90 ? "default" : persona.rating >= 75 ? "secondary" : "destructive"}
                  className="text-xs shrink-0"
                >
                  {persona.rating}/100
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium mb-2">Rating Factors:</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Data Usage</div>
                    <Progress value={persona.factors.dataUsage} className="h-1" />
                    <div className="text-xs text-muted-foreground mt-1">{persona.factors.dataUsage}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Transparency</div>
                    <Progress value={persona.factors.transparency} className="h-1" />
                    <div className="text-xs text-muted-foreground mt-1">{persona.factors.transparency}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Consent</div>
                    <Progress value={persona.factors.consent} className="h-1" />
                    <div className="text-xs text-muted-foreground mt-1">{persona.factors.consent}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Privacy</div>
                    <Progress value={persona.factors.privacy} className="h-1" />
                    <div className="text-xs text-muted-foreground mt-1">{persona.factors.privacy}%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <div className="text-xs text-muted-foreground">
            AI Ethics Rating Model (AERM) grades AI personas on ethical usage based on data usage,
            transparency, consent, and privacy factors.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { AIEthicsRatingModel }

