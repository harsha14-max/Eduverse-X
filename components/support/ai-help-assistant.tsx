"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, MessageSquare, X } from "lucide-react"

export function AIHelpAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
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
            <span className="hidden sm:inline">AI Help Assistant</span>
          </Button>
        </motion.div>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
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
                    <div className="font-semibold text-sm">AI Help Assistant</div>
                    <div className="text-xs text-muted-foreground">Real-time support</div>
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

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Need help? I can assist you with troubleshooting, answer questions, or connect you
                  with human support.
                </p>
                <Button variant="default" className="w-full gap-2" onClick={() => setIsOpen(false)}>
                  <MessageSquare className="h-4 w-4" />
                  Start Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  )
}

