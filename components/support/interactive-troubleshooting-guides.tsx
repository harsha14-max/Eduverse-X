"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  CheckCircle2,
  XCircle,
  Copy,
  Play,
  Loader2,
  Settings,
  Zap,
  MessageSquare,
  Shield,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TroubleshootingGuide {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  steps: Array<{
    id: string
    title: string
    description: string
    action?: {
      type: "copy" | "test" | "check"
      label: string
      value?: string
    }
    status?: "pending" | "completed" | "failed"
  }>
}

const troubleshootingGuides: TroubleshootingGuide[] = [
  {
    id: "1",
    title: "Failed AI Automation",
    description: "Troubleshoot failed automation workflows step by step",
    category: "Automation",
    difficulty: "Medium",
    steps: [
      {
        id: "1-1",
        title: "Check if your integration token is valid",
        description: "Verify that your OAuth token hasn't expired",
        action: {
          type: "check",
          label: "Check Token Status",
        },
        status: "pending",
      },
      {
        id: "1-2",
        title: "Run a test connection",
        description: "Test the connection to ensure all integrations are working",
        action: {
          type: "test",
          label: "Test Connection",
        },
        status: "pending",
      },
      {
        id: "1-3",
        title: "If error persists, click to send logs",
        description: "Export and send execution logs for analysis",
        action: {
          type: "copy",
          label: "Copy Logs",
          value: "export-logs-command",
        },
        status: "pending",
      },
    ],
  },
  {
    id: "2",
    title: "Instagram Connection Issues",
    description: "Fix Instagram OAuth connection problems",
    category: "Integration",
    difficulty: "Easy",
    steps: [
      {
        id: "2-1",
        title: "Verify OAuth permissions",
        description: "Check if Instagram app permissions are granted",
        action: {
          type: "check",
          label: "Check Permissions",
        },
        status: "pending",
      },
      {
        id: "2-2",
        title: "Re-authorize connection",
        description: "Revoke and reconnect Instagram integration",
        action: {
          type: "test",
          label: "Re-authorize",
        },
        status: "pending",
      },
    ],
  },
  {
    id: "3",
    title: "AI Post Generation Not Working",
    description: "Troubleshoot AI content generation issues",
    category: "AI Features",
    difficulty: "Medium",
    steps: [
      {
        id: "3-1",
        title: "Check API key configuration",
        description: "Verify OpenAI/Claude API keys are set correctly",
        action: {
          type: "copy",
          label: "View API Settings",
          value: "/dashboard/account?tab=integrations",
        },
        status: "pending",
      },
      {
        id: "3-2",
        title: "Verify content generation limits",
        description: "Check if you've reached daily/monthly limits",
        action: {
          type: "check",
          label: "Check Limits",
        },
        status: "pending",
      },
      {
        id: "3-3",
        title: "Review AI permissions",
        description: "Ensure AI has necessary permissions in account settings",
        action: {
          type: "check",
          label: "Review Permissions",
        },
        status: "pending",
      },
    ],
  },
]

export function InteractiveTroubleshootingGuides() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)
  const [guideSteps, setGuideSteps] = useState<Record<string, Record<string, "pending" | "completed" | "failed">>>({})

  const filteredGuides = troubleshootingGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  const handleStepAction = (guideId: string, stepId: string, actionType: string) => {
    setGuideSteps((prev) => ({
      ...prev,
      [guideId]: {
        ...(prev[guideId] || {}),
        [stepId]: "completed",
      },
    }))

    // Simulate action execution
    if (actionType === "test") {
      setTimeout(() => {
        // Test would run here
        console.log(`Testing for step ${stepId}`)
      }, 1000)
    } else if (actionType === "copy") {
      // Copy to clipboard
      console.log(`Copying for step ${stepId}`)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 border-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Interactive Troubleshooting Guides
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Zap className="h-3 w-3" />
              Step-by-Step
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search troubleshooting guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Guides List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuides.map((guide, index) => (
          <TroubleshootingGuideCard
            key={guide.id}
            guide={guide}
            index={index}
            isSelected={selectedGuide === guide.id}
            onSelect={() => setSelectedGuide(selectedGuide === guide.id ? null : guide.id)}
            onStepAction={handleStepAction}
            guideSteps={guideSteps[guide.id] || {}}
            getDifficultyColor={getDifficultyColor}
          />
        ))}
      </div>
    </div>
  )
}

function TroubleshootingGuideCard({
  guide,
  index,
  isSelected,
  onSelect,
  onStepAction,
  guideSteps,
  getDifficultyColor,
}: {
  guide: TroubleshootingGuide
  index: number
  isSelected: boolean
  onSelect: () => void
  onStepAction: (guideId: string, stepId: string, actionType: string) => void
  guideSteps: Record<string, "pending" | "completed" | "failed">
  getDifficultyColor: (difficulty: string) => string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className={`border-2 transition-all cursor-pointer h-full ${
          isSelected ? "border-primary shadow-lg" : "border-border hover:border-primary/50"
        }`}
        onClick={onSelect}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{guide.title}</h3>
                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(guide.difficulty)}`}>
                    {guide.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{guide.description}</p>
              </div>
            </div>

            {/* Category */}
            <Badge variant="outline" className="text-xs">
              {guide.category}
            </Badge>

            {/* Progress */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>
                  {
                    guide.steps.filter(
                      (step) => guideSteps[step.id] === "completed"
                    ).length
                  }
                  /{guide.steps.length} steps
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      (guide.steps.filter((step) => guideSteps[step.id] === "completed").length /
                        guide.steps.length) *
                      100
                    }%`,
                  }}
                  transition={{ delay: index * 0.1 }}
                />
              </div>
            </div>

            {/* Steps Preview */}
            {isSelected && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 border-t border-border space-y-3"
                >
                  {guide.steps.map((step, stepIndex) => (
                    <div key={step.id} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            guideSteps[step.id] === "completed"
                              ? "bg-green-100 text-green-700 border border-green-300"
                              : guideSteps[step.id] === "failed"
                              ? "bg-red-100 text-red-700 border border-red-300"
                              : "bg-muted text-muted-foreground border border-border"
                          }`}
                        >
                          {guideSteps[step.id] === "completed" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : guideSteps[step.id] === "failed" ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            stepIndex + 1
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm mb-1">{step.title}</div>
                          <div className="text-xs text-muted-foreground mb-2">
                            {step.description}
                          </div>
                          {step.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                onStepAction(guide.id, step.id, step.action!.type)
                              }}
                              disabled={guideSteps[step.id] === "completed"}
                            >
                              {step.action.type === "copy" && <Copy className="h-3 w-3" />}
                              {step.action.type === "test" && <Play className="h-3 w-3" />}
                              {step.action.type === "check" && <CheckCircle2 className="h-3 w-3" />}
                              {step.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

