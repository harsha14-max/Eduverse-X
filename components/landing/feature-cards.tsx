"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Link2, Shield, Briefcase, BarChart3, MessageSquare, Send, Lock } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: Sparkles,
    title: "AI Dashboard Assistant",
    description: "Your intelligent learning companion that understands your goals and adapts to your pace.",
    snippet: "Automating LinkedIn for Riya...",
  },
  {
    icon: Link2,
    title: "30+ Integrations",
    description: "Connect LinkedIn, GitHub, Notion, Google Calendar, Discord, and more in one place.",
    snippet: "Syncing GitHub repos...",
  },
  {
    icon: Shield,
    title: "Decentralized Data Vault",
    description: "Your data encrypted and stored on IPFS — only you control access with your private keys.",
    snippet: "Encrypting data on IPFS...",
  },
  {
    icon: Briefcase,
    title: "Auto-Portfolio Builder",
    description: "Automatically fetch and organize your projects, certifications, and achievements.",
    snippet: "Building portfolio from GitHub...",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics Engine",
    description: "Track learning progress, portfolio views, and social engagement in real-time.",
    snippet: "Analyzing your growth...",
  },
  {
    icon: MessageSquare,
    title: "AI Mentor Chat",
    description: "Conversational AI assistant that helps you learn, plan, and execute your goals.",
    snippet: "Generating learning path...",
  },
  {
    icon: Send,
    title: "AI Social Manager",
    description: "AI-generated post suggestions based on your learning journey and achievements.",
    snippet: "Drafting your next post...",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Full control over your data. No central storage. Everything encrypted and decentralized.",
    snippet: "Securing your data...",
  },
]

export function FeatureCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to learn smarter, work faster, and grow publicly.
          </p>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-shrink-0 w-80 snap-start"
              >
                <Card className="h-full border-border hover:border-primary/50 hover:shadow-lg transition-all group bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        height: hoveredIndex === index ? "auto" : 0,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                        <p className="text-sm font-mono text-muted-foreground">
                          {feature.snippet}
                        </p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

