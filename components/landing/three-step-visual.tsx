"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Link2, Zap, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: Link2,
    number: "1",
    title: "Connect",
    description: "Link your apps & wallet",
  },
  {
    icon: Zap,
    number: "2",
    title: "Automate",
    description: "AI builds workflows through n8n",
  },
  {
    icon: Shield,
    number: "3",
    title: "Own",
    description: "Data stored securely on IPFS with encryption",
  },
]

export function ThreeStepVisual() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="how-it-works" className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your learning journey.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isLast = index === steps.length - 1
              return (
                <div key={index} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="border-border hover:border-primary/50 hover:shadow-lg transition-all bg-card shadow-sm">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
                          <Icon className="h-8 w-8 text-primary" />
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {step.number}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  {!isLast && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full -translate-x-1/2 -translate-y-1/2 z-0">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                        className="h-0.5 bg-gradient-to-r from-primary to-transparent"
                      />
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 1.2 + index * 0.2 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
                      >
                        <div className="w-3 h-3 rounded-full bg-primary border-2 border-background" />
                      </motion.div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground">
            Ready to get started? Connect your wallet and begin your journey.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

