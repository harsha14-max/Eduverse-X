"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  ChevronUp,
  ChevronDown,
  Bell,
  TrendingUp,
  Users,
  Target,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const suggestions = [
  {
    id: "1",
    type: "post",
    message: "Post your new project 'Weather App' to LinkedIn?",
    action: "Post Now",
    icon: TrendingUp,
  },
  {
    id: "2",
    type: "workspace",
    message: "You and Sara have similar learning interests — start a workspace?",
    action: "Start Workspace",
    icon: Users,
  },
  {
    id: "3",
    type: "skill",
    message: "Skill gap detected: Python but not Pandas — add course?",
    action: "Find Course",
    icon: Target,
  },
]

const messages = [
  {
    id: "1",
    role: "ai",
    content: "Hey! I'm your AI assistant. I'm here to help you manage your account, suggest actions, and provide insights. What would you like to know?",
    timestamp: "Just now",
  },
]

export function AIAssistantPane() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [input, setInput] = useState("")
  const [messageList, setMessageList] = useState(messages)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      timestamp: "Just now",
    }

    setMessageList((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai" as const,
        content: `I understand you're asking about: "${input}". Let me help you with that!`,
        timestamp: "Just now",
      }
      setMessageList((prev) => [...prev, aiMessage])
    }, 1000)

    setInput("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50 w-[320px]"
    >
      <Card className="border-border shadow-lg">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">AI Assistant</div>
                <div className="text-xs text-muted-foreground">Always here to help</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {/* Suggestions */}
                <div className="p-3 border-b border-border">
                  <div className="text-xs font-semibold mb-2">Suggestions</div>
                  <ScrollArea className="h-[120px]">
                    <div className="space-y-2">
                      {suggestions.map((suggestion, index) => {
                        const Icon = suggestion.icon
                        return (
                          <motion.div
                            key={suggestion.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-2 rounded-lg bg-primary/5 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
                          >
                            <div className="flex items-start gap-2 mb-1">
                              <Icon className="h-3 w-3 text-primary mt-0.5" />
                              <div className="text-xs text-muted-foreground flex-1">
                                {suggestion.message}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2 text-xs mt-1"
                            >
                              {suggestion.action}
                              <Send className="h-3 w-3" />
                            </Button>
                          </motion.div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </div>

                {/* Chat */}
                <div className="p-3 border-b border-border">
                  <div className="text-xs font-semibold mb-2">Chat</div>
                  <ScrollArea className="h-[150px] mb-3">
                    <div className="space-y-3">
                      {messageList.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-2 text-xs ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Ask me anything..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      className="flex-1 h-8 text-xs"
                    />
                    <Button size="icon" className="h-8 w-8" onClick={handleSend}>
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions (Always Visible) */}
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <TrendingUp className="h-3 w-3" />
                Insights
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Bell className="h-3 w-3" />
                Notifications
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

