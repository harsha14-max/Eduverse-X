"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Users,
  ArrowRight,
  Brain,
  TrendingUp,
  CheckCircle2,
} from "lucide-react"

const suggestions = [
  {
    id: "1",
    type: "team",
    title: "Data Visualization Team",
    message: "You and Sara have complementary skills (Python + Design). Form a team?",
    members: ["You", "Sara Johnson"],
    match: "92%",
  },
  {
    id: "2",
    type: "workspace",
    title: "Start a Workspace",
    message: "Riya has similar learning interests (ML & Data Science). Start a workspace?",
    members: ["You", "Riya Patel"],
    match: "88%",
  },
  {
    id: "3",
    type: "project",
    title: "Collaborate on Project",
    message: "Mike's React expertise + Your TypeScript skills = Perfect match for full-stack project",
    members: ["You", "Mike Chen"],
    match: "85%",
  },
]

export function AICollaborationSuggestions() {
  return (
    <Card className="border-primary/20 bg-primary/5 h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <div className="text-sm font-semibold">AI Collaboration Suggestions</div>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto min-h-0">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border">
                <CardContent className="p-3">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {suggestion.type === "team" ? (
                          <Users className="h-4 w-4 text-primary" />
                        ) : suggestion.type === "workspace" ? (
                          <Brain className="h-4 w-4 text-primary" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-primary" />
                        )}
                        <div className="text-sm font-medium">{suggestion.title}</div>
                      </div>
                      <Badge variant="outline" className="text-xs gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        {suggestion.match} Match
                      </Badge>
                    </div>

                    {/* Message */}
                    <div className="text-xs text-muted-foreground">{suggestion.message}</div>

                    {/* Members */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className="text-muted-foreground">Members:</div>
                      {suggestion.members.map((member, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full gap-2 text-xs"
                    >
                      {suggestion.type === "team" ? "Form Team" : suggestion.type === "workspace" ? "Start Workspace" : "Collaborate"}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

