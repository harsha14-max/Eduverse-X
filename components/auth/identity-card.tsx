"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, Link2, Sparkles, GraduationCap, Brain } from "lucide-react"

interface IdentityCardProps {
  profile: {
    displayName: string
    bio: string
    skills: string[]
    interests: string[]
    didHash: string
    ipfsHash: string
  }
  onboardingData: {
    identity?: "student" | "educator" | null
    goals?: string[]
    integrations?: string[]
  }
}

export function IdentityCard({ profile, onboardingData }: IdentityCardProps) {
  const IdentityIcon = onboardingData.identity === "educator" ? Brain : GraduationCap

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-blue-500/5 shadow-lg">
      <CardHeader className="text-center border-b border-border pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
            <IdentityIcon className="h-10 w-10 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold mb-2">
          {profile.displayName || "Your Name"}
        </CardTitle>
        <CardDescription className="text-base">
          {onboardingData.identity === "educator" ? "Educator / Mentor" : "Student / Learner"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Bio */}
        {profile.bio && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">About</h4>
            <p className="text-sm text-muted-foreground">{profile.bio}</p>
          </div>
        )}

        {/* Goals */}
        {onboardingData.goals && onboardingData.goals.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Goals</h4>
            <ul className="space-y-1">
              {onboardingData.goals.map((goal, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-3 w-3 text-primary" />
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {profile.skills.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {profile.interests.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Integrations */}
        {onboardingData.integrations && onboardingData.integrations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Connected Apps
            </h4>
            <p className="text-xs text-muted-foreground">
              {onboardingData.integrations.length} integration{onboardingData.integrations.length !== 1 ? "s" : ""} connected
            </p>
          </div>
        )}

        {/* DID Status */}
        {profile.didHash && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold">Decentralized Identity</h4>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Verified & Encrypted</span>
            </div>
          </div>
        )}

        {/* Preview Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-4 border-t border-border"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>EduVerse Identity Card</span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

