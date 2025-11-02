"use client"

import { motion } from "framer-motion"
import { Layers, Grid, Zap, Shield } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"

const problems = [
  {
    icon: Layers,
    text: "Your skills live on five different platforms.",
    details: "Scattered across LinkedIn, GitHub, Coursera, Notion, and more. No unified view of your progress.",
  },
  {
    icon: Grid,
    text: "Your data lives on none of them.",
    details: "Learning data, certifications, and achievements are locked in silos. You can't prove your growth.",
  },
  {
    icon: Zap,
    text: "Manual work never ends.",
    details: "Posting updates, tracking progress, switching tools — constant manual effort drains your focus.",
  },
  {
    icon: Shield,
    text: "Privacy is an afterthought.",
    details: "Platforms own your data. You have no control over how your learning journey is stored or shared.",
  },
]

const solutions = [
  {
    icon: Layers,
    title: "Unified Learning Hub",
    description: "All your courses, progress, and achievements in one intelligent dashboard.",
    benefits: ["Track progress across all platforms", "AI-powered recommendations", "Real-time insights"],
  },
  {
    icon: Shield,
    title: "Decentralized Data Vault",
    description: "Your data encrypted and stored on IPFS — only you control access.",
    benefits: ["End-to-end encryption", "IPFS distributed storage", "Zero central ownership"],
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Automate portfolio updates, social posts, and progress tracking.",
    benefits: ["One-click workflows", "Smart post scheduling", "Background sync"],
  },
]

export function ProblemSolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="features" className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Problem
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Today's learners face fragmented platforms, lost data, and endless manual work.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {problems.map((problem, index) => {
              const Icon = problem.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.15 }}
                  className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center group-hover:bg-destructive/30 transition-colors">
                      <Icon className="h-6 w-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold mb-2">{problem.text}</p>
                      <p className="text-sm text-muted-foreground">{problem.details}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Solution
          </h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            EDUVERSE X brings everything together under one intelligent system.
          </p>
          <p className="text-base text-muted-foreground mb-12 max-w-3xl mx-auto">
            Connect your favorite apps, automate your workflow, and own your data—all powered by AI and decentralized storage. 
            See your learning journey transform in real-time with automated portfolio updates, smart post suggestions, and unified analytics.
          </p>

          {/* Enhanced Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.5 }}
            className="relative max-w-6xl mx-auto mb-16"
          >
            <div className="p-8 rounded-2xl border border-border bg-card shadow-xl backdrop-blur-sm overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div>
                  <h3 className="text-lg font-semibold mb-1">EDUVERSE X Dashboard</h3>
                  <p className="text-sm text-muted-foreground">All your learning data in one place</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>All systems operational</span>
                </div>
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    label: "Learning Hub",
                    icon: "📚",
                    stats: ["12 courses active", "85% avg progress", "3 certificates earned"],
                    color: "from-blue-500/20 to-blue-600/10",
                  },
                  {
                    label: "Automations",
                    icon: "⚙️",
                    stats: ["8 active workflows", "24 posts scheduled", "Last sync: 2m ago"],
                    color: "from-purple-500/20 to-purple-600/10",
                  },
                  {
                    label: "Portfolio",
                    icon: "💼",
                    stats: ["15 projects live", "2.5K views this month", "12 new connections"],
                    color: "from-green-500/20 to-green-600/10",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-6 rounded-xl border border-border bg-gradient-to-br from-muted/50 to-background hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl">{item.icon}</div>
                      <h4 className="font-semibold text-base">{item.label}</h4>
                    </div>
                    <div className={`h-24 bg-gradient-to-br ${item.color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                      <div className="relative z-10 text-xs text-muted-foreground font-mono opacity-60">
                        Live Preview
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {item.stats.map((stat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {stat}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Stats Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>Real-time sync active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono">30+</span>
                  <span>integrations connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono">100%</span>
                  <span>data encrypted</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Solution Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="p-8 rounded-xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/50 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{solution.description}</p>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground mb-3">Key Benefits:</p>
                    <ul className="space-y-2.5">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* How It Helps Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
              <h3 className="text-2xl font-bold mb-4 text-center">How EDUVERSE X Transforms Your Learning</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Automated Workflows</h4>
                    <p className="text-sm text-muted-foreground">Set up once, run forever. Your portfolio updates, social posts, and progress tracking happen automatically in the background.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">True Data Ownership</h4>
                    <p className="text-sm text-muted-foreground">Your learning data is encrypted and stored on IPFS. Only you have the keys. No platform can access or sell your information.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Layers className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Unified Intelligence</h4>
                    <p className="text-sm text-muted-foreground">AI analyzes all your platforms—Coursera, GitHub, LinkedIn—and provides personalized insights you can't get anywhere else.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Grid className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">One Platform, Infinite Possibilities</h4>
                    <p className="text-sm text-muted-foreground">Connect 30+ tools, create custom automations, and watch your learning journey become a professional brand—all from one dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

