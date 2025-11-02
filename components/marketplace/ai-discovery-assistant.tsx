"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, X, Sparkles, Send, Zap } from "lucide-react"

export function AIDiscoveryAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ type: "user" | "ai"; content: string }>>([
    {
      type: "ai",
      content: "Looking for something to automate? I can help you discover the perfect templates!",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { type: "user", content: input }])

    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        pdf: "I found 3 PDF summarizer templates! Try 'AI Essay Summarizer for Notion' - it automatically converts PDFs into concise summaries.",
        linkedin: "For LinkedIn automation, I recommend 'Social Media Growth Pack' - it includes LinkedIn Post Generator, Auto Portfolio Updater, and AI Brand Voice Assistant.",
        notion: "Perfect! I found 5 Notion automation templates. The 'AI Essay Summarizer for Notion' has 4.8★ rating and 2.3k installs.",
        social: "Great choice! Check out the 'Social Media Growth Pack' - it's trending with 4.9★ and includes multiple social media tools.",
      }

      const lowerInput = input.toLowerCase()
      let aiResponse = "I found several matching templates for you! Check out the trending templates above, or tell me more about what you need."

      for (const [keyword, response] of Object.entries(responses)) {
        if (lowerInput.includes(keyword)) {
          aiResponse = response
          break
        }
      }

      setMessages((prev) => [...prev, { type: "ai", content: aiResponse }])
    }, 500)

    setInput("")
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full shadow-lg gap-2"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="border-border shadow-xl">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">AI Discovery Assistant</div>
                      <div className="text-xs text-muted-foreground">Con conversational search</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Suggestions */}
                <div className="p-4 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2">Quick suggestions:</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {["PDF summarizer", "LinkedIn automation", "Notion workflows", "Social media"].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setInput(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="I want an AI that..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      className="text-sm"
                    />
                    <Button size="icon" onClick={handleSend} className="h-9 w-9">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

