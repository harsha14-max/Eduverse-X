"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIConversationalOnboarding } from "./ai-conversational-onboarding"
import { IntegrationHub } from "./integration-hub"
import { DIDProfileCreation } from "./did-profile-creation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { isAuthenticated, setOnboardingComplete } from "@/lib/auth"

type OnboardingStep = "ai-chat" | "integrations" | "profile" | "complete"

export function OnboardingFlow() {
  const router = useRouter()
  const [guestMode, setGuestMode] = useState(false)
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("ai-chat")

  // Get search params on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const isGuest = params.get("mode") === "guest"
      setGuestMode(isGuest)
      
      // Redirect to login if not authenticated (unless guest mode)
      if (!isGuest && !isAuthenticated()) {
        router.push("/auth/login")
      }
    }
  }, [router])
  const [onboardingData, setOnboardingData] = useState({
    identity: null as "student" | "educator" | null,
    goals: [] as string[],
    integrations: [] as string[],
    profile: null as any,
  })

  const steps = [
    { id: "ai-chat", label: "AI Onboarding", completed: currentStep !== "ai-chat" },
    { id: "integrations", label: "Connect Apps", completed: currentStep !== "integrations" && currentStep !== "ai-chat" },
    { id: "profile", label: "Create Profile", completed: currentStep === "complete" },
    { id: "complete", label: "Complete", completed: false },
  ]

  const handleStepComplete = (step: OnboardingStep, data: any) => {
    setOnboardingData((prev) => ({ ...prev, ...data }))
    
    const stepOrder: OnboardingStep[] = ["ai-chat", "integrations", "profile", "complete"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-blue-700 bg-clip-text text-transparent">
              EDUVERSE X
            </span>
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="border-b border-border bg-background/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      step.completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : currentStep === step.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {step.completed ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-xs mt-2 hidden sm:block ${
                    currentStep === step.id ? "text-primary font-medium" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 transition-colors ${
                    step.completed ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {currentStep === "ai-chat" && (
            <motion.div
              key="ai-chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AIConversationalOnboarding
                onComplete={(data) => handleStepComplete("ai-chat", data)}
              />
            </motion.div>
          )}

          {currentStep === "integrations" && (
            <motion.div
              key="integrations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <IntegrationHub
                onboardingData={onboardingData}
                onComplete={(data) => handleStepComplete("integrations", data)}
                onBack={() => setCurrentStep("ai-chat")}
              />
            </motion.div>
          )}

          {currentStep === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DIDProfileCreation
                onboardingData={onboardingData}
                onComplete={(data) => handleStepComplete("profile", data)}
                onBack={() => setCurrentStep("integrations")}
              />
            </motion.div>
          )}

          {currentStep === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="h-10 w-10 text-primary" />
                </motion.div>
                <h2 className="text-4xl font-bold mb-4">Welcome to EDUVERSE X!</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Your decentralized learning journey begins now. Everything is set up and ready to go.
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => {
                  // Mark onboarding as complete
                  setOnboardingComplete(true)
                  router.push("/dashboard")
                }}
                className="min-w-[200px]"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

