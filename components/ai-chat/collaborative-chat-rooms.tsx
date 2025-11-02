"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, User, Bot, CheckCircle2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  sender: string
  role: "user" | "ai" | "collaborator"
  content: string
  timestamp: string
  verified?: boolean
}

interface CollaborativeChatRoomsProps {
  type: "automation" | "community"
}

const automationMessages: Message[] = [
  {
    id: "1",
    sender: "AI Assistant",
    role: "ai",
    content: "I've optimized your automation workflow. The new schedule will save 30% execution time.",
    timestamp: "10:30 AM",
    verified: true,
  },
  {
    id: "2",
    sender: "You",
    role: "user",
    content: "Great! Can you also add error handling for API failures?",
    timestamp: "10:32 AM",
  },
]

const communityMessages: Message[] = [
  {
    id: "1",
    sender: "Sarah",
    role: "collaborator",
    content: "Hey! I found a great automation template for LinkedIn posting. Want to collaborate?",
    timestamp: "11:00 AM",
    verified: true,
  },
  {
    id: "2",
    sender: "You",
    role: "user",
    content: "That sounds interesting! Share the details.",
    timestamp: "11:05 AM",
  },
]

export function CollaborativeChatRooms({ type }: CollaborativeChatRoomsProps) {
  const [messages, setMessages] = useState<Message[]>(
    type === "automation" ? automationMessages : communityMessages
  )
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInput("")
  }

  return (
    <Card className="border-border h-[500px] flex flex-col">
      <CardContent className="p-0 flex flex-col h-full min-h-0">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const isUser = message.role === "user"
              const Icon = message.role === "ai" ? Bot : User

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={message.role === "ai" ? "bg-primary/10" : "bg-muted"}>
                        <Icon className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-[70%] ${isUser ? "order-1" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{message.sender}</span>
                      {message.verified && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{message.timestamp}</div>
                  </div>

                  {isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder={`Message in ${type === "automation" ? "automation" : "community"} room...`}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

