"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, Sparkles, Loader2 } from "lucide-react"
import { PermissionModal } from "./permission-modal"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: Date
  action?: {
    type: string
    status?: "pending" | "success" | "failed"
  }
}

export function AIChatConsole() {
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<any>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey! I'm Nova, your EDUVERSE AI assistant. I can help you:\n\n• Summarize your learning progress\n• Create posts about your achievements\n• Recommend trending courses\n• Automate workflows\n• Analyze your growth\n\nWhat would you like to do?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      let action: { type: string; status?: "pending" | "success" | "failed" } | undefined = undefined

      const lowerInput = userInput.toLowerCase()

      if (lowerInput.includes("summarize") || lowerInput.includes("summary")) {
        response = "📊 **Your Learning Summary:**\n\n• Completed 3 courses this week\n• Spent 12 hours learning\n• 7-day streak active\n• 5 new projects on GitHub\n• 150% increase in LinkedIn engagement\n\nWould you like me to create a post about this?"
        action = { type: "weekly_summary", status: "success" }
      } else if (lowerInput.includes("post") || lowerInput.includes("linkedin")) {
        response = "📣 I'll create a LinkedIn post about your progress!\n\n**Draft:**\n\"Just completed 3 courses and added 5 new projects this week! 🚀 My learning journey continues... #Learning #Growth #Tech\"\n\n✅ Should I publish this?"
        action = { type: "create_post", status: "pending" }
        
        // Show permission modal for post creation
        setPendingAction({
          type: "create_post",
          title: "Create LinkedIn Post",
          description: "Publish a post about your learning progress to LinkedIn",
          dataAccess: [
            "Access your learning progress from Coursera",
            "Access your GitHub projects",
            "Read your LinkedIn profile",
            "Write to your LinkedIn feed",
          ],
          consequences: [
            "Post will be published on your LinkedIn profile",
            "Post will be visible to your LinkedIn network",
            "Action will be logged in your automation history",
          ],
        })
        setShowPermissionModal(true)
      } else if (lowerInput.includes("recommend") || lowerInput.includes("course")) {
        response = "🎓 **Recommended Courses:**\n\n1. **AI for Beginners** - Matches your GitHub projects\n2. **React Advanced Patterns** - Trending this week\n3. **Web3 Development** - Aligns with your goals\n\nWould you like more details on any of these?"
      } else if (lowerInput.includes("automate") || lowerInput.includes("automation")) {
        response = "⚙️ I can help you automate:\n\n• Portfolio updates from GitHub\n• Social posts based on progress\n• Learning reminders\n• Certificate uploads\n\nWhat would you like to automate?"
      } else if (lowerInput.includes("analyze") || lowerInput.includes("growth")) {
        response = "📈 **Growth Analysis:**\n\n**Strengths:**\n• Consistent learning streak\n• Active on GitHub\n• Growing social presence\n\n**Opportunities:**\n• Consider advanced AI courses\n• Share more project updates\n• Connect with similar learners\n\nWould you like a detailed report?"
      } else {
        response = "I understand you're asking about: \"" + userInput + "\"\n\nI can help you with:\n• Learning summaries\n• Creating posts\n• Course recommendations\n• Automations\n• Growth analysis\n\nWhat would you like to explore?"
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
        action,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const quickCommands = [
    "Summarize my learning week",
    "Create LinkedIn post",
    "Recommend courses",
    "View my analytics",
  ]

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">AI Chat Console</CardTitle>
            <CardDescription className="text-sm">
              Your conversational command center
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-muted/30">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium text-primary">Nova</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  {message.action && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      {message.action.status === "pending" && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Processing...
                        </div>
                      )}
                      {message.action.status === "success" && (
                        <div className="flex items-center gap-2 text-xs text-green-500">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          Action completed successfully
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Commands */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickCommands.map((cmd) => (
              <Button
                key={cmd}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput(cmd)
                  setTimeout(() => handleSend(), 100)
                }}
                className="text-xs"
              >
                {cmd}
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Ask Nova anything... (e.g., 'Summarize my week', 'Create a post')"
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              size="icon"
            >
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Permission Modal */}
      <PermissionModal
        open={showPermissionModal}
        onOpenChange={setShowPermissionModal}
        onConfirm={() => {
          setIsExecuting(true)
          // Simulate action execution
          setTimeout(() => {
            setIsExecuting(false)
            setShowPermissionModal(false)
            const confirmMessage: Message = {
              id: (Date.now() + 2).toString(),
              role: "assistant",
              content: "✅ Post Published Successfully!\n\nYour LinkedIn post has been published and is now live.",
              timestamp: new Date(),
              action: { type: pendingAction?.type, status: "success" },
            }
            setMessages((prev) => [...prev, confirmMessage])
            setPendingAction(null)
          }, 2000)
        }}
        onCancel={() => {
          setPendingAction(null)
        }}
        action={pendingAction}
        isLoading={isExecuting}
      />
    </Card>
  )
}

