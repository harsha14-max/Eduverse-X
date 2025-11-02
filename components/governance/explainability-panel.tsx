"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Info, AlertTriangle, Shield } from "lucide-react"

interface PermissionExplanation {
  id: string
  aiEntity: string
  permission: string
  resource: string
  reason: string
  context: string
  riskLevel: "low" | "medium" | "high"
}

const explanations: PermissionExplanation[] = [
  {
    id: "1",
    aiEntity: "AI Mentor",
    permission: "Read",
    resource: "Learning Progress",
    reason: "Auto-summaries enabled",
    context: "You enabled auto-summaries in Settings. AI needs Read access to generate weekly learning summaries.",
    riskLevel: "low",
  },
  {
    id: "2",
    aiEntity: "AI Content Generator",
    permission: "Write",
    resource: "Notion Workspace",
    reason: "Content posting automation",
    context: "You created an automation workflow that posts content to Notion. AI needs Write access to create and update pages.",
    riskLevel: "medium",
  },
  {
    id: "3",
    aiEntity: "AI Portfolio Assistant",
    permission: "Read",
    resource: "GitHub Repositories",
    reason: "Portfolio sync enabled",
    context: "Portfolio sync is enabled. AI needs Read access to fetch repository data for portfolio updates.",
    riskLevel: "low",
  },
  {
    id: "4",
    aiEntity: "AI Social Manager",
    permission: "Write",
    resource: "LinkedIn Account",
    reason: "Scheduled post automation",
    context: "You have scheduled posts enabled. AI needs Write access to publish posts on your behalf.",
    riskLevel: "high",
  },
]

function ExplainabilityPanel({ selectedPermissionId }: { selectedPermissionId?: string }) {
  const [selectedExplanation, setSelectedExplanation] = useState<string | null>(
    selectedPermissionId || explanations[0].id
  )

  const activeExplanation = explanations.find((e) => e.id === selectedExplanation)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "high":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <Shield className="h-4 w-4 text-green-600" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">AI Explainability Panel</CardTitle>
            <div className="text-xs text-muted-foreground">
              AI explains why it needs each permission
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {explanations.map((explanation, index) => {
              const isSelected = explanation.id === selectedExplanation
              return (
                <motion.div
                  key={explanation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedExplanation(explanation.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : `border-border hover:border-primary/50 ${getRiskColor(explanation.riskLevel)}`
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {getRiskIcon(explanation.riskLevel)}
                      <div className="font-semibold text-sm truncate">{explanation.aiEntity}</div>
                    </div>
                    <Badge
                      variant={explanation.riskLevel === "low" ? "default" : "destructive"}
                      className="text-xs shrink-0"
                    >
                      {explanation.riskLevel} risk
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    <span className="font-medium">{explanation.permission}</span> access to{" "}
                    <span className="font-medium">{explanation.resource}</span>
                  </div>
                  <div className="text-xs font-medium mb-1">{explanation.reason}</div>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-border"
                    >
                      <div className="text-xs text-muted-foreground">{explanation.context}</div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Selected Explanation Details */}
        {activeExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-4 border-t p-4 bg-muted rounded-lg"
          >
            <div className="text-sm font-semibold mb-2">Full Explanation</div>
            <div className="text-xs text-muted-foreground mb-3">{activeExplanation.context}</div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Risk: {activeExplanation.riskLevel}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Resource: {activeExplanation.resource}
              </Badge>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export { ExplainabilityPanel }
