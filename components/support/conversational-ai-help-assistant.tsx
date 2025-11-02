"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  Send,
  Sparkles,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  User,
  Image as ImageIcon,
  FileText,
  X,
} from "lucide-react"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: Date
  attachments?: Array<{ name: string; type: string; url?: string }>
}

export function ConversationalAIHelpAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null)
  const [attachments, setAttachments] = useState<File[]>([])
  const [showAttachmentArea, setShowAttachmentArea] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load chat context from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("supportChatContext")
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        setMessages(parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })))
      } catch (e) {
        console.error("Failed to load chat context", e)
      }
    } else {
      // Initial welcome message
      setMessages([
        {
          id: "1",
          role: "assistant",
          content:
            "Hi! I'm your AI Help Assistant. I can help you troubleshoot issues, answer questions, or connect you with human support. How can I help you today?",
          timestamp: new Date(),
        },
      ])
    }
  }, [])

  // Save chat context to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("supportChatContext", JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      attachments: attachments.map((file) => ({
        name: file.name,
        type: file.type,
      })),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setAttachments([])
    setShowAttachmentArea(false)
    setIsTyping(true)
    setFeedbackGiven(null)

    // Simulate AI response with standardized timing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500) // Using DELAYS.AI_RESPONSE (1500ms) for natural conversation flow
  }

  const generateAIResponse = (userQuery: string): string => {
    const lowerQuery = userQuery.toLowerCase()

    if (lowerQuery.includes("login") || lowerQuery.includes("authenticate")) {
      return "For login issues, try these steps:\n1. Clear your browser cache and cookies\n2. Try logging in from an incognito window\n3. Reset your password if needed\n\nIf the problem persists, I can connect you with human support."
    } else if (lowerQuery.includes("automation") || lowerQuery.includes("workflow")) {
      return "For automation issues:\n1. Check if all integrations are connected\n2. Verify workflow execution logs\n3. Test each node individually\n\nWould you like me to guide you through checking your workflow?"
    } else if (lowerQuery.includes("instagram") || lowerQuery.includes("social")) {
      return "For Instagram connection issues:\n1. Verify OAuth token is valid in Account → Integrations\n2. Run a test connection\n3. Check if API permissions are granted\n\nI can help you check your integration status."
    } else {
      return "I understand you need help. Let me assist you:\n\n• I can help troubleshoot specific issues\n• I can guide you through setup processes\n• I can connect you with human support if needed\n\nCan you provide more details about what you're trying to do?"
    }
  }

  const handleFeedback = (messageId: string, type: "solved" | "unsolved" | "human") => {
    setFeedbackGiven(messageId)
    const feedbackMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: type === "solved" ? "Yes, this solved my problem 👍" : type === "unsolved" ? "No, still stuck 👎" : "Request human help 🧑‍💻",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, feedbackMessage])

    if (type === "human") {
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I've escalated your request to human support. A support agent will contact you shortly. In the meantime, please provide any additional details that might help.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, response])
      }, 1000)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments((prev) => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="h-full border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            AI Help Assistant (Live Chat)
          </CardTitle>
          <Badge variant="outline" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI-Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[600px]">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
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
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      {message.role === "assistant" && (
                        <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      )}
                      {message.role === "user" && (
                        <User className="h-4 w-4 text-primary-foreground mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((att, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs bg-background/50 rounded p-1"
                              >
                                <FileText className="h-3 w-3" />
                                <span>{att.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {message.role === "assistant" && feedbackGiven !== message.id && (
                      <div className="flex gap-2 mt-2 pt-2 border-t border-border/20">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs gap-1"
                          onClick={() => handleFeedback(message.id, "solved")}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          Solved
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs gap-1"
                          onClick={() => handleFeedback(message.id, "unsolved")}
                        >
                          <ThumbsDown className="h-3 w-3" />
                          Still Stuck
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs gap-1"
                          onClick={() => handleFeedback(message.id, "human")}
                        >
                          <User className="h-3 w-3" />
                          Human Help
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Sparkles className="h-4 w-4" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-150" />
                </div>
                <span className="text-xs">AI is thinking...</span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Attachment Area */}
        {showAttachmentArea && attachments.length > 0 && (
          <div className="px-4 pb-2 border-t border-border">
            <div className="flex flex-wrap gap-2 mt-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-2 py-1 rounded bg-muted text-xs"
                >
                  <FileText className="h-3 w-3" />
                  <span className="max-w-[150px] truncate">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          {/* File Upload Area (Drag & Drop) */}
          <div
            className={`mb-2 p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
              showAttachmentArea ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setShowAttachmentArea(true)
            }}
            onDragLeave={() => setShowAttachmentArea(false)}
            onDrop={(e) => {
              e.preventDefault()
              setShowAttachmentArea(false)
              const files = Array.from(e.dataTransfer.files)
              setAttachments((prev) => [...prev, ...files])
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              Drag & drop screenshots or logs here, or click to upload
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,.txt,.log"
          />

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isTyping || !input.trim()}>
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

