"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  X,
  Lightbulb,
  ArrowRight,
  Brain,
  MessageSquare,
  ChevronDown,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Pattern observation based on user activity (mock data)
// In production, this would analyze actual workflow patterns from Section 5 data
function observePatterns(): { category: string; frequency: number; suggestion: string }[] {
  // Mock pattern observation - in production, analyze from workflow history
  return [
    { category: "Education", frequency: 8, suggestion: "You often build education workflows. Try automating PDF summaries next." },
    { category: "Social Media", frequency: 5, suggestion: "Your LinkedIn automations perform 27% better on weekdays. Consider scheduling." },
    { category: "GitHub", frequency: 3, suggestion: "You can connect GitHub webhooks to auto-update your portfolio." },
    { category: "Data Analysis", frequency: 2, suggestion: "Based on your learning profile, automate daily dataset imports from Kaggle?" },
  ]
}

interface MentorTip {
  id: string
  message: string
  action: string
  priority: "high" | "medium" | "low"
  category?: string
  frequency?: number
}

function generateTipsFromPatterns(): MentorTip[] {
  const patterns = observePatterns()
  const sorted = patterns.sort((a, b) => b.frequency - a.frequency)
  
  return sorted.slice(0, 3).map((pattern, index) => ({
    id: `${index + 1}`,
    message: pattern.suggestion,
    action: pattern.category === "Education" ? "Create PDF Summary Flow" :
            pattern.category === "Social Media" ? "Optimize Schedule" :
            pattern.category === "GitHub" ? "Connect GitHub" :
            "Create Automation",
    priority: index === 0 ? "high" as const : index === 1 ? "medium" as const : "low" as const,
    category: pattern.category,
    frequency: pattern.frequency,
  }))
}

const mentorTips = generateTipsFromPatterns()

export function AIAutomationMentor() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTip, setActiveTip] = useState(mentorTips[0])
  const [showSuggestionModal, setShowSuggestionModal] = useState(false)
  const [hasNewTip, setHasNewTip] = useState(true) // Track if there's new advice

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-20 right-4 z-50"
      >
        <Card
          className={`border-primary/50 bg-primary/10 shadow-lg cursor-pointer transition-all hover:border-primary hover:bg-primary/20 ${
            isExpanded ? "w-[320px]" : "w-[280px]"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <motion.div
                animate={hasNewTip ? {
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 12px rgba(59, 130, 246, 0.5)",
                    "0 0 0px rgba(59, 130, 246, 0)",
                  ],
                } : {
                  scale: 1,
                }}
                transition={{
                  duration: 2.5,
                  repeat: hasNewTip ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <Lightbulb className="h-5 w-5 text-primary" />
                {hasNewTip && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-sm font-semibold">AI Automation Mentor</div>
                  <Badge variant="outline" className="text-xs gap-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    {hasNewTip ? "New Tip" : "Active"}
                  </Badge>
                  {activeTip.priority === "high" && (
                    <Badge variant="destructive" className="text-xs">
                      High Priority
                    </Badge>
                  )}
                </div>
                {isExpanded && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs text-muted-foreground mb-3"
                    >
                      {activeTip.message}
                    </motion.div>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full gap-2 text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowSuggestionModal(true)
                        setHasNewTip(false) // Mark tip as viewed
                      }}
                    >
                      {activeTip.action}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                    {mentorTips.length > 1 && (
                      <div className="text-xs text-muted-foreground mt-2 text-center">
                        {mentorTips.length - 1} more tip{mentorTips.length - 1 > 1 ? 's' : ''} available
                      </div>
                    )}
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(!isExpanded)
                }}
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Suggestion Modal */}
      <Dialog open={showSuggestionModal} onOpenChange={setShowSuggestionModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Suggestion: {activeTip.action}
            </DialogTitle>
            <DialogDescription>
              Pre-drawn node map for this automation
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold">Suggested Flow:</div>
                  {activeTip.frequency && (
                    <Badge variant="outline" className="text-xs">
                      Used {activeTip.frequency}x
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div className="text-xs">Trigger: Manual/Webhook</div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border ml-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="text-xs">AI Node: Process Content</div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border ml-4">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="text-xs">Action: Publish/Save</div>
                  </div>
                </div>
                {activeTip.category && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      <strong>Pattern Observed:</strong> You've built {activeTip.category.toLowerCase()} workflows {activeTip.frequency} times recently.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="flex gap-2">
              <Button
                variant="default"
                className="flex-1 gap-2"
                onClick={() => {
                  // In real app, add nodes to canvas
                  setShowSuggestionModal(false)
                }}
              >
                Add to Canvas
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSuggestionModal(false)}
              >
                Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

