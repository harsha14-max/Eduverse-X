"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Network,
  Sparkles,
  Link2,
  Info,
} from "lucide-react"

interface CrossAppIntelligenceProps {
  apps: string[]
  explanation: string
}

// Enhanced explanations for different app combinations
function generateExplanation(apps: string[]): string {
  const appSet = new Set(apps.map(a => a.toLowerCase()))
  
  // Detect common workflow patterns
  if (appSet.has("drive") && appSet.has("notion") && appSet.has("slack")) {
    return "These nodes form a cross-knowledge loop: content → notes → notification. Files from Drive sync to Notion for organization, then notify your team via Slack."
  }
  
  if (appSet.has("github") && appSet.has("linkedin")) {
    return "GitHub projects → LinkedIn posts. Automatically share your code achievements on LinkedIn to showcase your development work."
  }
  
  if (appSet.has("coursera") || appSet.has("udemy")) {
    const learningApps = apps.filter(a => ["Coursera", "Udemy", "Khan Academy"].includes(a))
    if (learningApps.length > 0 && appSet.has("slack")) {
      return `Learning progress from ${learningApps.join(" + ")} → Team updates via Slack. Share your learning journey with your team automatically.`
    }
  }
  
  if (appSet.has("gmail") && appSet.has("notion")) {
    return "Email → Notion. Important emails are automatically organized in Notion for better knowledge management."
  }
  
  // Generic explanation
  return `These nodes connect ${apps.join(", ")}. This creates an automated workflow that streamlines your process across multiple platforms.`
}

export function CrossAppIntelligence({ apps, explanation }: CrossAppIntelligenceProps) {
  if (apps.length < 2) return null

  // Use provided explanation or generate one
  const finalExplanation = explanation || generateExplanation(apps)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-20 right-4 z-40"
    >
      <Card className="border-primary/20 bg-primary/5 shadow-lg min-w-[300px] max-w-[350px]">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Network className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-semibold">Cross-App Intelligence</div>
                <Badge variant="outline" className="text-xs gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  AI Analysis
                </Badge>
              </div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {apps.map((app, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs bg-background">
                      {app}
                    </Badge>
                    {index < apps.length - 1 && (
                      <Link2 className="h-3 w-3 text-primary" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed bg-background/50 p-2 rounded-md">
                <Info className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                <span className="italic">{finalExplanation}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

