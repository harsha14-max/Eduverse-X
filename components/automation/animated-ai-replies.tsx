"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AnimatedAIRepliesProps {
  message: string
  agent?: "claude" | "gpt" | "cursor" | "local"
  className?: string
  isTyping?: boolean
}

export function AnimatedAIReplies({ 
  message, 
  agent = "claude",
  className,
  isTyping = false 
}: AnimatedAIRepliesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-start gap-2", className)}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Brain className="h-4 w-4 text-primary" />
      </motion.div>
      <div className="flex-1 min-w-0">
        {isTyping ? (
          <div className="flex items-center gap-1">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-sm text-muted-foreground"
            >
              AI is thinking
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.2,
                ease: "easeInOut",
              }}
              className="text-sm text-muted-foreground"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.4,
                ease: "easeInOut",
              }}
              className="text-sm text-muted-foreground"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.6,
                ease: "easeInOut",
              }}
              className="text-sm text-muted-foreground"
            >
              .
            </motion.span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            {message.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.03,
                  delay: index * 0.02,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
      <Badge variant="outline" className="text-xs gap-1 shrink-0">
        <Sparkles className="h-3 w-3 text-primary" />
        {agent}
      </Badge>
    </motion.div>
  )
}

