"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, X, CheckCircle2 } from "lucide-react"

interface PrivacyPopup {
  id: string
  title: string
  message: string
  action: string
  type: "info" | "warning" | "success"
  show: boolean
}

const privacyPopups: PrivacyPopup[] = [
  {
    id: "1",
    title: "Revoking Write Access",
    message: "Revoking Write Access means AI can't auto-update your projects anymore. Continue?",
    action: "Revoke",
    type: "warning",
    show: true,
  },
  {
    id: "2",
    title: "Enabling Privacy Mode",
    message: "Privacy Mode will blur identifiable data before AI analysis. This improves privacy but may reduce accuracy.",
    action: "Enable",
    type: "info",
    show: false,
  },
  {
    id: "3",
    title: "Backup Complete",
    message: "Your keys have been successfully backed up to IPFS and Filecoin.",
    action: "OK",
    type: "success",
    show: false,
  },
]

function PrivacyLearningPopups() {
  const [popups, setPopups] = useState<PrivacyPopup[]>(privacyPopups)
  const [currentPopup, setCurrentPopup] = useState<PrivacyPopup | null>(
    popups.find((p) => p.show) || null
  )

  const handleClose = (popupId: string) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === popupId ? { ...p, show: false } : p))
    )
    setCurrentPopup(null)
  }

  const handleAction = (popupId: string) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === popupId ? { ...p, show: false } : p))
    )
    setCurrentPopup(null)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "success":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "info":
        return <AlertCircle className="h-5 w-5 text-blue-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      default:
        return null
    }
  }

  return (
    <>
      <AnimatePresence>
        {currentPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-4 right-4 z-50 max-w-md"
          >
            <Card className={`border-2 shadow-lg ${getTypeColor(currentPopup.type)}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {getTypeIcon(currentPopup.type)}
                    <div className="font-semibold text-sm">{currentPopup.title}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 shrink-0"
                    onClick={() => handleClose(currentPopup.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mb-4">{currentPopup.message}</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-3 text-xs flex-1"
                    onClick={() => handleClose(currentPopup.id)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={currentPopup.type === "success" ? "default" : "destructive"}
                    size="sm"
                    className="h-7 px-3 text-xs flex-1"
                    onClick={() => handleAction(currentPopup.id)}
                  >
                    {currentPopup.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Section */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-4 space-y-4">
          <div className="text-sm font-semibold mb-3">Privacy Learning Popups (Demo)</div>
          <div className="space-y-2">
            {popups.map((popup) => (
              <Button
                key={popup.id}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => setCurrentPopup(popup)}
              >
                {getTypeIcon(popup.type)}
                <span className="text-xs">{popup.title}</span>
              </Button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground p-3 bg-muted rounded-lg border border-border">
            Privacy Learning Popups appear when users toggle settings or revoke access, providing
            educational context about the implications of their actions.
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export { PrivacyLearningPopups }
