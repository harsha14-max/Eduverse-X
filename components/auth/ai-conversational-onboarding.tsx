"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bot, Send, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: Date
}

interface AIConversationalOnboardingProps {
  onComplete: (data: { goals: string[]; identity: "student" | "educator" }) => void
}

export function AIConversationalOnboarding({ onComplete }: AIConversationalOnboardingProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey 👋 I'm Nova, your EDUVERSE X guide!\n\nWelcome! I'm here to help you set up your learning journey. Let's start with a quick conversation.\n\nWhat are your main learning goals?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [goals, setGoals] = useState<string[]>([])
  const [conversationStage, setConversationStage] = useState<"greeting" | "goals" | "platforms" | "complete">("goals")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (role: "assistant" | "user", content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let response = ""
      
      if (conversationStage === "goals") {
        const lowerMessage = userMessage.toLowerCase()
        
        if (lowerMessage.includes("complete") || lowerMessage.includes("done") || lowerMessage.includes("ready")) {
          if (goals.length === 0) {
            response = "I'd love to know more about your goals! What would you like to achieve? For example:\n\n• Build a portfolio\n• Learn new skills\n• Automate my learning\n• Track my progress"
          } else {
            response = "Great! I've noted your goals. Would you like me to sync your learning data from platforms like Coursera, GitHub, or LinkedIn?"
            setConversationStage("platforms")
          }
        } else {
          // Extract goals from user message
          const extractedGoals = userMessage
            .split(/[,\n•]/)
            .map((g) => g.trim())
            .filter((g) => g.length > 0 && !g.toLowerCase().includes("want") && !g.toLowerCase().includes("would"))
          
          if (extractedGoals.length > 0) {
            setGoals((prev) => [...prev, ...extractedGoals])
            response = `Perfect! I've saved: ${extractedGoals.join(", ")}\n\nIs there anything else you'd like to add? Or type "continue" when you're ready!`
          } else {
            response = "I'd love to know more! What would you like to achieve on EDUVERSE X?\n\nYou can mention multiple goals, like:\n• Build my portfolio\n• Learn Python\n• Automate social posts"
          }
        }
      } else if (conversationStage === "platforms") {
        const lowerMessage = userMessage.toLowerCase()
        
        if (lowerMessage.includes("yes") || lowerMessage.includes("sure") || lowerMessage.includes("okay") || lowerMessage.includes("sync")) {
          response = "Excellent! In the next step, you'll be able to connect your accounts securely.\n\nI'll help you sync:\n• Learning progress from Coursera, Udemy, etc.\n• Projects from GitHub, GitLab\n• Professional updates from LinkedIn\n• Notes from Notion, Obsidian\n\nReady to continue?"
          setConversationStage("complete")
        } else if (lowerMessage.includes("no") || lowerMessage.includes("skip") || lowerMessage.includes("later")) {
          response = "No problem! You can always connect them later from your dashboard.\n\nReady to continue with setting up your profile?"
          setConversationStage("complete")
        } else {
          response = "Would you like me to sync your learning data from platforms like Coursera, GitHub, or LinkedIn? (Yes/No/Skip)"
        }
      } else if (conversationStage === "complete") {
        const lowerMessage = userMessage.toLowerCase()
        
        if (lowerMessage.includes("yes") || lowerMessage.includes("ready") || lowerMessage.includes("continue") || lowerMessage.includes("let's go")) {
          response = "Perfect! Let's move on to connecting your integrations. I'll be here if you need me! 🚀"
          setIsTyping(false)
          
          setTimeout(() => {
            onComplete({
              goals,
              identity: "student", // This would come from previous step
            })
          }, 1000)
          return
        } else {
          response = "Great! When you're ready, just say 'continue' and we'll move on to connecting your accounts."
        }
      }
      
      addMessage("assistant", response)
      setIsTyping(false)
    }, 1500)
  }

  const handleSend = () => {
    if (!input.trim() || isTyping) return
    
    addMessage("user", input)
    const userInput = input
    setInput("")
    simulateAIResponse(userInput)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickResponses = [
    "Build my portfolio",
    "Learn new skills",
    "Automate my workflow",
    "Track my progress",
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-border shadow-lg">
        <CardHeader className="text-center border-b border-border pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">AI-Guided Onboarding</CardTitle>
          </div>
          <CardDescription className="text-base">
            Have a quick conversation with Nova to set up your EDUVERSE X profile
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-muted/30">
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
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium text-primary">Nova</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
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

          {/* Quick Responses */}
          {conversationStage === "goals" && goals.length === 0 && (
            <div className="p-4 border-t border-border bg-background">
              <p className="text-xs text-muted-foreground mb-2">Quick responses:</p>
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((response) => (
                  <Button
                    key={response}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(response)
                      setTimeout(() => handleSend(), 100)
                    }}
                    className="text-xs"
                  >
                    {response}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

