"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Sparkles, GraduationCap, TrendingUp, CheckCircle2 } from "lucide-react"

interface Persona {
  id: string
  name: string
  description: string
  icon: typeof Brain
  color: string
  active: boolean
}

const personas: Persona[] = [
  {
    id: "mentor",
    name: "Mentor",
    description: "AI acts as a career coach and learning guide",
    icon: GraduationCap,
    color: "text-blue-600",
    active: true,
  },
  {
    id: "creator",
    name: "Creator",
    description: "AI assists with content creation and portfolio building",
    icon: Sparkles,
    color: "text-purple-600",
    active: false,
  },
  {
    id: "learner",
    name: "Learner",
    description: "AI focuses on skill development and course recommendations",
    icon: TrendingUp,
    color: "text-green-600",
    active: false,
  },
]

function AIPersonaManager() {
  const [selectedPersona, setSelectedPersona] = useState<string>("mentor")
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePersonaChange = (personaId: string) => {
    setIsAnimating(true)
    setSelectedPersona(personaId)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const activePersona = personas.find((p) => p.id === selectedPersona)

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">My AI Persona</CardTitle>
              <CardDescription className="text-xs">
                Switch among modes: Mentor, Creator, Learner
              </CardDescription>
            </div>
          </div>
          {activePersona && (
            <Badge variant="outline" className={`${activePersona.color} border-current`}>
              Active
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Persona Cards Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {personas.map((persona) => {
            const Icon = persona.icon
            const isSelected = persona.id === selectedPersona

            return (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handlePersonaChange(persona.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`${persona.color} shrink-0`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      )}
                    </div>
                    <div className="font-semibold text-sm mb-1">{persona.name}</div>
                    <div className="text-xs text-muted-foreground">{persona.description}</div>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 pt-3 border-t border-border"
                      >
                        <Badge variant="default" className="text-xs w-full justify-center">
                          Currently Active
                        </Badge>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Active Persona Details */}
        {activePersona && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-muted rounded-lg border border-border"
          >
            <div className="flex items-start gap-3">
              <div className={`${activePersona.color} shrink-0 mt-0.5`}>
                <activePersona.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1">
                  {activePersona.name} Mode Active
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  {activePersona.description}. AI recommendations and suggestions are now tailored to
                  this persona.
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Lottie Animation Placeholder */}
        <div className="text-center p-4 bg-muted/50 rounded-lg border border-dashed border-border">
          <div className="text-xs text-muted-foreground mb-2">
            Lottie Animation Placeholder
          </div>
          <div className="text-xs text-muted-foreground">
            In production, this would show animated persona switching with Lottie
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { AIPersonaManager }
