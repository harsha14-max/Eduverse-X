"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  Brain,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
  skills: string[]
  expertise: string
}

interface AIRoleAdvisorProps {
  workflowNodeType?: string
  workflowSkills?: string[]
  teamMembers?: TeamMember[]
}

// Mock team members - in production, fetch from Section 7 team overview
const defaultTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Riya Patel",
    avatar: "RP",
    role: "ML Specialist",
    skills: ["Machine Learning", "AI", "Data Analysis"],
    expertise: "ML Specialist",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "MC",
    role: "Full Stack Developer",
    skills: ["Web Development", "Node.js", "React"],
    expertise: "Full Stack",
  },
  {
    id: "3",
    name: "Sara Johnson",
    avatar: "SJ",
    role: "DevOps Engineer",
    skills: ["CI/CD", "Docker", "Kubernetes"],
    expertise: "DevOps",
  },
]

// AI recommendation logic based on node type and skills
function recommendReviewer(
  nodeType: string,
  skills: string[] = [],
  teamMembers: TeamMember[]
): TeamMember | null {
  // Match node type to required expertise
  const nodeSkillMap: Record<string, string[]> = {
    "aiPrompt": ["AI", "Machine Learning"],
    "aiReasoning": ["AI", "Machine Learning", "Data Analysis"],
    "aiDecision": ["AI", "Machine Learning"],
    "action": ["Web Development", "Full Stack"],
  }

  const requiredSkills = nodeSkillMap[nodeType] || []
  const workflowSkillsLower = skills.map(s => s.toLowerCase())

  // Find best matching team member
  const scored = teamMembers.map(member => {
    let score = 0
    const memberSkillsLower = member.skills.map(s => s.toLowerCase())
    
    // Check for exact skill matches
    requiredSkills.forEach(reqSkill => {
      if (memberSkillsLower.some(ms => ms.includes(reqSkill.toLowerCase()))) {
        score += 2
      }
    })

    // Check workflow-specific skills
    workflowSkillsLower.forEach(ws => {
      if (memberSkillsLower.some(ms => ms.includes(ws))) {
        score += 1
      }
    })

    // Bonus for expertise match
    if (nodeType.includes("ai") && member.expertise.includes("ML")) {
      score += 3
    }
    if (nodeType === "action" && member.expertise.includes("Full Stack")) {
      score += 2
    }

    return { member, score }
  })

  const bestMatch = scored.sort((a, b) => b.score - a.score)[0]
  return bestMatch && bestMatch.score > 0 ? bestMatch.member : null
}

export function AIRoleAdvisor({
  workflowNodeType = "aiReasoning",
  workflowSkills = ["AI", "Data Analysis"],
  teamMembers = defaultTeamMembers,
}: AIRoleAdvisorProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const recommendedReviewer = recommendReviewer(workflowNodeType, workflowSkills, teamMembers)

  if (!recommendedReviewer || isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed top-20 right-4 z-50 w-80"
      >
        <Card className="border-primary/20 bg-primary/5 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <div className="text-sm font-semibold">AI Role Advisor</div>
                <Badge variant="outline" className="text-xs gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  AI Suggestion
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsDismissed(true)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">
                Based on this workflow's node type and required skills:
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{recommendedReviewer.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-sm font-semibold">{recommendedReviewer.name}</div>
                    <Badge variant="outline" className="text-xs">
                      {recommendedReviewer.role}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {recommendedReviewer.expertise} • {recommendedReviewer.skills.join(", ")}
                  </div>
                  <div className="text-xs font-semibold text-primary">
                    Should review/validate this workflow
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 gap-2 text-xs"
                  onClick={() => {
                    // In production, send review request to team member
                    console.log(`Requesting review from ${recommendedReviewer.name}`)
                  }}
                >
                  <Users className="h-3 w-3" />
                  Request Review
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs"
                  onClick={() => {
                    // Navigate to team member profile
                    console.log(`Viewing ${recommendedReviewer.name}'s profile`)
                  }}
                >
                  <ArrowRight className="h-3 w-3" />
                  View Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

