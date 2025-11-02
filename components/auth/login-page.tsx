"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IdentitySelector, IdentityType } from "./identity-selector"
import { AuthOptions } from "./auth-options"
import { Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"

type AuthStep = "identity" | "login"

export function LoginPage() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("identity")
  const [selectedIdentity, setSelectedIdentity] = useState<IdentityType>(null)

  const handleIdentitySelect = (identity: "student" | "educator") => {
    setSelectedIdentity(identity)
    setCurrentStep("login")
  }

  const handleBack = () => {
    setCurrentStep("identity")
    setSelectedIdentity(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-600 to-blue-700 bg-clip-text text-transparent">
              EDUVERSE X
            </span>
          </Link>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
            currentStep === "identity" 
              ? "border-primary bg-primary text-primary-foreground" 
              : "border-primary/30 bg-primary/10 text-primary"
          }`}>
            <span className="font-bold">1</span>
          </div>
          <div className={`w-16 h-0.5 ${
            currentStep === "login" ? "bg-primary" : "bg-border"
          } transition-colors`} />
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
            currentStep === "login" 
              ? "border-primary bg-primary text-primary-foreground" 
              : "border-border text-muted-foreground"
          }`}>
            <span className="font-bold">2</span>
          </div>
        </div>

        {/* Content */}
        {currentStep === "identity" ? (
          <motion.div
            key="identity"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <IdentitySelector
              onSelect={handleIdentitySelect}
              selectedIdentity={selectedIdentity}
            />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-border shadow-lg">
              <CardHeader className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="absolute left-4 top-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <CardTitle className="text-3xl font-bold mb-2">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-lg">
                  Sign in to your {selectedIdentity === "student" ? "Student" : "Educator"} account
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <AuthOptions mode="login" identityType={selectedIdentity} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Footer Links */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            Or continue as{" "}
            <Link href="/onboarding?mode=guest" className="text-primary hover:underline font-medium">
              Guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

