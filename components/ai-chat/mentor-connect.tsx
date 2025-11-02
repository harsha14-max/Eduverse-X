"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Code2, Sparkles, UserPlus, CheckCircle2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Mentor {
  id: string
  name: string
  type: "Career AI" | "Coding AI" | "Content AI"
  description: string
  icon: typeof Brain
  verified: boolean
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Career AI Mentor",
    type: "Career AI",
    description: "Provides career advice and growth strategies",
    icon: Brain,
    verified: true,
  },
  {
    id: "2",
    name: "Coding AI Mentor",
    type: "Coding AI",
    description: "Helps with technical challenges and best practices",
    icon: Code2,
    verified: true,
  },
  {
    id: "3",
    name: "Content AI Mentor",
    type: "Content AI",
    description: "Assists with content creation and social media",
    icon: Sparkles,
    verified: true,
  },
]

export function MentorConnect() {
  const [connectedMentors, setConnectedMentors] = useState<string[]>([])

  const handleConnect = (mentorId: string) => {
    if (connectedMentors.includes(mentorId)) {
      setConnectedMentors(connectedMentors.filter((id) => id !== mentorId))
    } else {
      setConnectedMentors([...connectedMentors, mentorId])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">AI Mentors</h3>
        <Button size="sm" variant="outline" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Collaborator
        </Button>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {mentors.map((mentor) => {
            const Icon = mentor.icon
            const isConnected = connectedMentors.includes(mentor.id)

            return (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`border-border ${isConnected ? "border-primary bg-primary/5" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold">{mentor.name}</h4>
                          {mentor.verified && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified Mentor
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{mentor.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {mentor.type}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant={isConnected ? "default" : "outline"}
                        onClick={() => handleConnect(mentor.id)}
                      >
                        {isConnected ? "Connected" : "Connect"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

