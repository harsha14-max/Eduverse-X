"use client"

import { motion } from "framer-motion"
import { GraduationCap, Brain, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export type IdentityType = "student" | "educator" | null

interface IdentitySelectorProps {
  onSelect: (identity: "student" | "educator") => void
  selectedIdentity?: IdentityType
}

export function IdentitySelector({ onSelect, selectedIdentity }: IdentitySelectorProps) {
  const identities = [
    {
      id: "student" as const,
      title: "Student / Learner",
      icon: GraduationCap,
      description: "Track your learning journey, build your portfolio, and automate your growth.",
      features: ["AI learning recommendations", "Portfolio automation", "Skill tracking", "Social post suggestions"],
      gradient: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/20",
      hoverColor: "hover:border-blue-500/50",
    },
    {
      id: "educator" as const,
      title: "Educator / Mentor",
      icon: Brain,
      description: "Manage classes, create content, and engage with your learning community.",
      features: ["Classroom analytics", "Content creation", "Community outreach", "Student engagement"],
      gradient: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/20",
      hoverColor: "hover:border-purple-500/50",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to EDUVERSE X
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose your identity to begin your journey into the decentralized learning universe.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {identities.map((identity, index) => {
          const Icon = identity.icon
          const isSelected = selectedIdentity === identity.id
          return (
            <motion.div
              key={identity.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`h-full cursor-pointer transition-all border-2 ${
                  isSelected
                    ? `${identity.borderColor} ${identity.hoverColor} shadow-lg scale-105`
                    : "border-border hover:border-primary/30"
                } bg-gradient-to-br ${identity.gradient}`}
                onClick={() => onSelect(identity.id)}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? "bg-primary/20 scale-110" : ""
                    } transition-transform`}>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{identity.title}</h3>
                      <p className="text-muted-foreground mb-4">{identity.description}</p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                      >
                        <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                      </motion.div>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {identity.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {selectedIdentity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => {
              // Identity selected, proceed to auth options
            }}
            className="min-w-[200px]"
          >
            Continue with {selectedIdentity === "student" ? "Student" : "Educator"} Account
          </Button>
        </motion.div>
      )}
    </div>
  )
}

