"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, EyeOff, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface PrivacyWarningProps {
  warningType: "private-hash" | "sensitive-data" | "public-share"
  onAcknowledge?: () => void
}

export function PrivacyWarnings({ warningType, onAcknowledge }: PrivacyWarningProps) {
  const [acknowledged, setAcknowledged] = useState(false)

  const getWarningContent = () => {
    switch (warningType) {
      case "private-hash":
        return {
          title: "Private IPFS Hash Hidden",
          description: "This view hides private IPFS hashes to protect sensitive data.",
          icon: EyeOff,
        }
      case "sensitive-data":
        return {
          title: "Sensitive Data Detected",
          description:
            "This content contains sensitive information. Be careful when sharing.",
          icon: AlertTriangle,
        }
      case "public-share":
        return {
          title: "Public Share Warning",
          description:
            "You are about to share this publicly. Ensure no sensitive data is included.",
          icon: Info,
        }
      default:
        return {
          title: "Privacy Warning",
          description: "Please review privacy settings before continuing.",
          icon: AlertTriangle,
        }
    }
  }

  const { title, description, icon: Icon } = getWarningContent()

  if (acknowledged) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <Alert className="border-yellow-300 bg-yellow-50 text-yellow-800">
          <Icon className="h-4 w-4" />
          <AlertTitle className="text-sm font-semibold">{title}</AlertTitle>
          <AlertDescription className="text-xs mt-1">{description}</AlertDescription>
          {onAcknowledge && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAcknowledged(true)
                  onAcknowledge()
                }}
                className="h-7 text-xs"
              >
                Acknowledge
              </Button>
            </div>
          )}
        </Alert>
      </motion.div>
    </AnimatePresence>
  )
}

