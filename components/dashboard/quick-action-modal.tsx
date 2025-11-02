"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bot, Sparkles, Loader2, Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface QuickActionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  actionType: "weekly-summary" | "create-post" | "configure-automation" | "view-analytics" | "add-integration" | "schedule-post" | null
}

export function QuickActionModal({ open, onOpenChange, actionType }: QuickActionModalProps) {
  const [step, setStep] = useState<"guide" | "processing" | "preview" | "complete">("guide")
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [preview, setPreview] = useState<any>(null)

  useEffect(() => {
    if (open && actionType) {
      setStep("guide")
      setIsProcessing(false)
      setAiResponse("")
      setPreview(null)
    }
  }, [open, actionType])

  const handleStart = () => {
    setStep("processing")
    setIsProcessing(true)
    setAiResponse("")

    // Simulate AI processing
    setTimeout(() => {
      let response = ""
      let previewData = null

      switch (actionType) {
        case "weekly-summary":
          response = "I've analyzed your learning data from Coursera, GitHub, and LinkedIn.\n\n📊 **Your Week in Numbers:**\n• 3 courses completed\n• 12 hours studied\n• 5 new projects on GitHub\n• 8 LinkedIn posts published\n• 150% engagement increase\n\nWould you like me to create a summary post for LinkedIn?"
          previewData = {
            title: "Weekly Learning Summary",
            content: "Just wrapped up an amazing week! 🚀\n\n✅ Completed 3 courses\n📚 12 hours of focused learning\n💻 Added 5 new projects to GitHub\n📱 8 engaging LinkedIn posts\n📈 150% increase in engagement\n\nTime to level up! 💪 #Learning #Growth #Tech",
            platform: "LinkedIn",
          }
          break
        case "create-post":
          response = "I've generated a post based on your recent achievements!\n\n📣 **Draft Post:**\n\n\"Just completed React Advanced Patterns course! 🎉\n\nBuilt 3 new projects this week:\n• Task Management App\n• Real-time Chat System\n• E-commerce Dashboard\n\nSharing my journey... #React #WebDev #Learning\"\n\nWant me to schedule this or publish now?"
          previewData = {
            title: "LinkedIn Post Draft",
            content: "Just completed React Advanced Patterns course! 🎉\n\nBuilt 3 new projects this week:\n• Task Management App\n• Real-time Chat System\n• E-commerce Dashboard\n\nSharing my journey... #React #WebDev #Learning",
            platform: "LinkedIn",
            suggestedTime: "Best: Tomorrow at 9 AM",
          }
          break
        case "configure-automation":
          response = "Let's set up your automation! 🚀\n\nI can help you automate:\n\n**Option 1:** Auto-post when you complete a course\n**Option 2:** Sync GitHub projects to portfolio\n**Option 3:** Daily learning reminders\n**Option 4:** Weekly progress summaries\n\nWhich automation would you like to configure?"
          break
        case "view-analytics":
          response = "Here's your analytics overview:\n\n📈 **Growth Metrics:**\n• Learning hours: +15% this month\n• GitHub commits: +32% increase\n• LinkedIn reach: +150% boost\n• Course completion: 85% success rate\n\n**Top Performing Content:**\n• React Projects (3x engagement)\n• Learning Journey Posts (2x reach)\n• Technical Tutorials (High shares)\n\nWant a detailed report?"
          break
        case "add-integration":
          response = "Let's connect a new integration! 🔗\n\nAvailable integrations:\n• GitHub - Sync repositories\n• LinkedIn - Auto-post updates\n• Coursera - Track courses\n• Notion - Import notes\n• Google Calendar - Schedule events\n\nWhich service would you like to connect?"
          break
        case "schedule-post":
          response = "I can help you schedule posts! 📅\n\n**Recommended Times:**\n• Best: Weekdays 9-10 AM\n• Good: Weekdays 12-1 PM\n• Also: Weekdays 5-6 PM\n\n**Suggested Schedule:**\n• Monday: Weekly summary\n• Wednesday: Project showcase\n• Friday: Learning insights\n\nWant me to set this up?"
          break
        default:
          response = "Ready to help! What would you like to do?"
      }

      setAiResponse(response)
      setPreview(previewData)
      setIsProcessing(false)
      setStep("preview")
    }, 2000)
  }

  const handleConfirm = () => {
    setStep("complete")
    setTimeout(() => {
      onOpenChange(false)
      setTimeout(() => {
        setStep("guide")
      }, 500)
    }, 2000)
  }

  const getActionTitle = () => {
    switch (actionType) {
      case "weekly-summary":
        return "Generate Weekly Summary"
      case "create-post":
        return "Create LinkedIn Post"
      case "configure-automation":
        return "Configure Automation"
      case "view-analytics":
        return "View Learning Analytics"
      case "add-integration":
        return "Add Integration"
      case "schedule-post":
        return "Schedule Post"
      default:
        return "Quick Action"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            {getActionTitle()}
          </DialogTitle>
          <DialogDescription>
            AI-guided assistant to help you through this process
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "guide" && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Let's Get Started!</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        I'll guide you through this process step by step. I'll fetch your data, analyze it, and prepare everything for you.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>Fetch your learning data</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>Analyze and generate insights</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>Create preview for your review</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleStart} className="w-full" size="lg">
                    Let's Begin
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Processing...</h3>
                  <p className="text-sm text-muted-foreground">
                    Fetching your data and generating insights...
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* AI Response */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {aiResponse}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              {preview && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-3">{preview.title}</h4>
                    <div className="p-4 rounded-lg bg-background border border-border mb-4">
                      <p className="text-sm whitespace-pre-wrap">{preview.content}</p>
                    </div>
                    {preview.suggestedTime && (
                      <p className="text-xs text-muted-foreground mb-4">
                        {preview.suggestedTime}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button onClick={handleConfirm} className="flex-1" size="lg">
                        Approve & Continue
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        size="lg"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!preview && (
                <div className="flex gap-2">
                  <Button onClick={handleConfirm} className="flex-1" size="lg">
                        Continue
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        size="lg"
                      >
                        Cancel
                      </Button>
                    </div>
              )}
            </motion.div>
          )}

          {step === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4"
              >
                <Check className="h-8 w-8 text-green-500" />
              </motion.div>
              <h3 className="font-semibold text-lg mb-2">Completed Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                Your action has been processed and applied.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

