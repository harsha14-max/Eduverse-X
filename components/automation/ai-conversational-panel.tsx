"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  MessageSquare,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  FileText,
  Link2,
  Zap,
  ChevronDown,
  ChevronUp,
  Bot,
  User,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  sender: "user" | "ai"
  agent?: "claude" | "gpt" | "cursor" | "local"
  content: string
  timestamp: string
  citations?: string[]
  trace?: {
    nodeId: string
    executionLog: string
  }
}

const agents = [
  { id: "claude", name: "Claude 3.5 Sonnet", icon: Brain, color: "text-purple-600" },
  { id: "gpt", name: "GPT-4 Turbo", icon: Zap, color: "text-blue-600" },
  { id: "cursor", name: "Cursor Agent", icon: Sparkles, color: "text-green-600" },
  { id: "local", name: "Local Agent", icon: Bot, color: "text-gray-600" },
]

export function AIConversationalPanel() {
  const [activeAgent, setActiveAgent] = useState("claude")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      agent: "claude",
      content: "I've analyzed your LinkedIn Auto Poster flow. The flow is working well, but I noticed the API rate limit is approaching 85%. Would you like me to optimize the scheduling?",
      timestamp: "2 minutes ago",
      citations: ["node-4", "analytics-api"],
      trace: {
        nodeId: "node-4",
        executionLog: "Flow executed successfully at 14:30:22",
      },
    },
  ])
  const [input, setInput] = useState("")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: "Just now",
    }

    setMessages((prev: Message[]) => [...prev, userMessage])

    // Simulate AI response with prompt-to-flow conversion
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        agent: activeAgent as "claude" | "gpt" | "cursor" | "local",
        content: `I've converted your request "${input}" into a flow. Here's what I created:

**Flow: ${input}**
- Trigger: Manual/Auto
- Actions: ${input.includes("Slack") ? "Slack Message" : "Generic Action"}
- AI Enhancement: Enabled

Would you like me to add this to your canvas?`,
        timestamp: "Just now",
        citations: ["flow-generation-api"],
        trace: {
          nodeId: "new-flow",
          executionLog: `Flow generated in 2.3s`,
        },
      }
      setMessages((prev: Message[]) => [...prev, aiMessage])
    }, 1500)

    setInput("")
  }

  const handleVoiceInput = () => {
    if (!voiceEnabled) {
      setVoiceEnabled(true)
      // Voice input would be implemented with Web Speech API
      setIsListening(true)
      setTimeout(() => {
        setIsListening(false)
        setInput("Explain why Node 7 failed")
      }, 2000)
    } else {
      setVoiceEnabled(false)
      setIsListening(false)
    }
  }

  const selectedAgent = agents.find((a) => a.id === activeAgent)

  return (
    <Card className="h-full border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">AI Conversational Panel</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs gap-1">
            {selectedAgent && <selectedAgent.icon className="h-3 w-3" />}
            {selectedAgent?.name}
          </Badge>
        </div>

        {/* Multi-AI Threading */}
        <Tabs value={activeAgent} onValueChange={setActiveAgent} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {agents.map((agent) => (
              <TabsTrigger
                key={agent.id}
                value={agent.id}
                className="text-xs gap-1"
                title={agent.name}
              >
                <agent.icon className="h-3 w-3" />
                <span className="hidden sm:inline">
                  {agent.name.split(" ")[0]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full min-h-0">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4 min-h-0">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`flex items-start gap-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "ai" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Brain className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`flex-1 max-w-[80%] min-w-0 ${
                      message.sender === "user" ? "order-1" : ""
                    }`}
                  >
                    <Card
                      className={`${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <CardContent className="p-3">
                        {/* Agent Badge */}
                        {message.sender === "ai" && message.agent && (
                          <div className="flex items-center gap-2 mb-2">
                            {selectedAgent && (
                              <selectedAgent.icon className="h-3 w-3" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {selectedAgent?.name}
                            </Badge>
                          </div>
                        )}

                        <div className="text-sm break-words whitespace-pre-wrap">{message.content}</div>

                        {/* Citations + Trace */}
                        {message.citations && message.citations.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <div className="text-xs font-medium mb-2">Citations:</div>
                            <div className="flex flex-wrap gap-2">
                              {message.citations.map((citation, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs cursor-pointer hover:bg-primary/10"
                                >
                                  <Link2 className="h-3 w-3 mr-1" />
                                  {citation}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Execution Trace */}
                        {message.trace && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <div className="text-xs font-medium mb-1">Execution Trace:</div>
                            <div className="text-xs text-muted-foreground">
                              <strong>Node:</strong> {message.trace.nodeId} |{" "}
                              <strong>Log:</strong> {message.trace.executionLog}
                            </div>
                          </div>
                        )}

                        <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Auto-Documentation Indicator */}
        <div className="px-4 pb-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>AI is generating markdown docs for this flow in real time...</span>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Ask AI: 'Explain why Node 7 failed' or 'Create Slack summary bot'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 text-sm"
            />
            <Button
              variant={voiceEnabled ? "default" : "outline"}
              size="icon"
              onClick={handleVoiceInput}
              className="h-10 w-10"
            >
              {isListening ? (
                <VolumeX className="h-4 w-4 animate-pulse" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground text-center">
            💡 Tip: Type "Create [service] bot" to instantly generate a flow in &lt;3 seconds
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

