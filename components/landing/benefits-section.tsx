"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Clock, Users, Award, Sparkles, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  {
    icon: Clock,
    title: "Save 10+ Hours Weekly",
    description: "Automate repetitive tasks like posting updates, syncing progress, and tracking achievements. Focus on what matters—learning.",
    stat: "10+ hours",
    statLabel: "saved per week",
  },
  {
    icon: Target,
    title: "Achieve Goals 3x Faster",
    description: "AI-powered recommendations and personalized roadmaps help you reach your learning objectives faster than traditional methods.",
    stat: "3x faster",
    statLabel: "goal achievement",
  },
  {
    icon: Users,
    title: "Grow Your Network Automatically",
    description: "Automated social posts based on your progress help you build a professional presence and connect with like-minded learners.",
    stat: "500+",
    statLabel: "connections/month",
  },
  {
    icon: Award,
    title: "Build Credible Portfolio",
    description: "Automatically compile certificates, projects, and achievements into a professional portfolio that showcases your real skills.",
    stat: "100%",
    statLabel: "verified credentials",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations on what to learn next, when to post, and how to optimize your learning journey.",
    stat: "24/7",
    statLabel: "AI assistance",
  },
  {
    icon: ShieldCheck,
    title: "True Data Ownership",
    description: "Your learning data belongs to you. Stored on IPFS with encryption—only you control access and sharing.",
    stat: "100%",
    statLabel: "data ownership",
  },
]

export function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
            Why Choose EDUVERSE X?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            More than a platform—it's your AI-powered growth companion that works tirelessly for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border hover:border-primary/50 hover:shadow-lg transition-all bg-card shadow-sm group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{benefit.stat}</div>
                        <div className="text-xs text-muted-foreground">{benefit.statLabel}</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                    <CardDescription className="text-base">{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

