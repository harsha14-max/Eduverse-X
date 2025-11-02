"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Key, Globe } from "lucide-react"

const securityFeatures = [
  {
    icon: Lock,
    title: "Encrypted Storage",
    description: "Your profile data is encrypted with your key and stored on IPFS. Only you can decrypt it.",
  },
  {
    icon: Key,
    title: "Your Keys, Your Control",
    description: "Your keys stay with you — EDUVERSE never stores login data. Full decentralization.",
  },
  {
    icon: Shield,
    title: "IPFS Backed",
    description: "All data stored on InterPlanetary File System — distributed, secure, and permanent.",
  },
  {
    icon: Globe,
    title: "Open Infrastructure",
    description: "Built on IPFS, n8n, Lit Protocol, and Web3Auth — transparent and verifiable.",
  },
]

export function SecuritySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="security" className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            >
              <Shield className="h-5 w-5 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-primary">Decentralized by Design</span>
          </div>
          
          {/* Data Vault Lock Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 border-2 border-primary/30"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Lock className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1.5, opacity: 0 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Data, Your Control
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Security and privacy are at the core of EDUVERSE X. Your data stays yours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.1 + index * 0.1 }}
              >
                <Card className="h-full border-border hover:border-primary/50 hover:shadow-lg transition-all bg-card shadow-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold mb-4 text-muted-foreground">Built on Open Infrastructure</p>
          <div className="flex flex-wrap items-center justify-center gap-8 max-w-2xl mx-auto">
            {["IPFS", "n8n", "Lit Protocol", "Web3Auth"].map((protocol, index) => (
              <motion.div
                key={protocol}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {protocol}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

