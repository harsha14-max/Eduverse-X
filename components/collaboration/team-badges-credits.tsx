"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Award, TrendingUp, Zap, MessageSquare, Star } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TeamMember {
  id: string
  name: string
  avatar: string
  badges: string[]
  credits: number
  contributions: {
    prompts: number
    workflows: number
    reviews: number
  }
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alice",
    avatar: "AJ",
    badges: ["Prompt Architect", "Workflow Reviewer"],
    credits: 1250,
    contributions: { prompts: 45, workflows: 12, reviews: 28 },
  },
  {
    id: "2",
    name: "Bob",
    avatar: "BS",
    badges: ["AI Strategist", "Prompt Architect"],
    credits: 980,
    contributions: { prompts: 32, workflows: 18, reviews: 15 },
  },
  {
    id: "3",
    name: "Charlie",
    avatar: "CB",
    badges: ["Workflow Reviewer"],
    credits: 750,
    contributions: { prompts: 18, workflows: 25, reviews: 32 },
  },
]

export function TeamBadgesCredits() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Team Badges & Credits</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Gamified visual layer showing team contributions
        </p>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarFallback className="text-sm">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{member.name}</h4>
                      <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-300">
                        <Star className="h-3 w-3 mr-1" />
                        {member.credits} Credits
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {member.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs gap-1">
                          <Award className="h-3 w-3" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-blue-500" />
                    <span className="text-muted-foreground">Prompts:</span>
                    <span className="font-semibold">{member.contributions.prompts}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-muted-foreground">Workflows:</span>
                    <span className="font-semibold">{member.contributions.workflows}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 text-purple-500" />
                    <span className="text-muted-foreground">Reviews:</span>
                    <span className="font-semibold">{member.contributions.reviews}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

