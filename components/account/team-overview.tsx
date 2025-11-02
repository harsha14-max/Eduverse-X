"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Sparkles,
  TrendingUp,
  UserPlus,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { AICollaborationSuggestions } from "./ai-collaboration-suggestions"
import { ReputationScoreOverlay } from "./reputation-score-overlay"
import { GrowthInsightsColumn } from "./growth-insights-column"
import { ScrollArea } from "@/components/ui/scroll-area"

const teamMembers = [
  {
    id: "1",
    name: "Sara Johnson",
    email: "sara@example.com",
    role: "Designer",
    skills: ["Figma", "UI/UX", "Design Systems"],
    reputation: 850,
    status: "online",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "Developer",
    skills: ["React", "TypeScript", "Node.js"],
    reputation: 920,
    status: "online",
  },
  {
    id: "3",
    name: "Riya Patel",
    email: "riya@example.com",
    role: "Data Scientist",
    skills: ["Python", "ML", "Pandas"],
    reputation: 880,
    status: "away",
  },
  {
    id: "4",
    name: "Alex Kim",
    email: "alex@example.com",
    role: "Full Stack",
    skills: ["Next.js", "PostgreSQL", "AWS"],
    reputation: 910,
    status: "offline",
  },
]

export function TeamOverview() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Team Overview</CardTitle>
              <CardDescription className="text-xs">
                Collaboration hub with AI suggestions
              </CardDescription>
            </div>
          </div>
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          {/* Team Members */}
          <div className="lg:col-span-2 space-y-4 flex flex-col min-h-0">
            <div className="text-sm font-semibold mb-2">Team Members ({teamMembers.length})</div>
            <ScrollArea className="flex-1 min-h-0">
              <div className="space-y-3 pr-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:border-primary ${
                        selectedMember === member.id ? "border-primary border-2" : "border-border"
                      }`}
                      onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/api/placeholder/40/40" alt={member.name} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {member.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="font-semibold text-sm">{member.name}</div>
                              <Badge variant="outline" className="text-xs">
                                {member.role}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">{member.email}</div>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {member.skills.map((skill, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            {selectedMember === member.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-3 pt-3 border-t border-border"
                              >
                                <ReputationScoreOverlay member={member} />
                              </motion.div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground mb-1">Reputation</div>
                            <div className="text-sm font-bold text-primary">{member.reputation}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Growth Insights Column */}
          <div className="lg:col-span-1 flex flex-col min-h-0">
            <GrowthInsightsColumn />
          </div>
        </div>

        {/* AI Collaboration Suggestions */}
        <div className="flex-1 overflow-hidden min-h-0 border-t border-border pt-4">
          <AICollaborationSuggestions />
        </div>
      </CardContent>
    </Card>
  )
}

