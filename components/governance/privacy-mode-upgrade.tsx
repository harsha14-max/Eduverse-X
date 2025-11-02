"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Shield, Lock, AlertCircle, CheckCircle2 } from "lucide-react"

interface PrivacyMode {
  id: string
  name: string
  description: string
  enabled: boolean
  autoMask: boolean
  blurLevel: "low" | "medium" | "high"
}

const privacyModes: PrivacyMode[] = [
  {
    id: "1",
    name: "Auto-Mask Mode",
    description: "AI blurs identifiable data before analysis",
    enabled: true,
    autoMask: true,
    blurLevel: "high",
  },
  {
    id: "2",
    name: "Sensitive Data Protection",
    description: "Automatically masks personal information",
    enabled: true,
    autoMask: false,
    blurLevel: "medium",
  },
  {
    id: "3",
    name: "Public Data Mode",
    description: "No masking for public data",
    enabled: false,
    autoMask: false,
    blurLevel: "low",
  },
]

function PrivacyModeUpgrade() {
  const [modes, setModes] = useState<PrivacyMode[]>(privacyModes)

  const handleToggle = (modeId: string, field: "enabled" | "autoMask") => {
    setModes((prev) =>
      prev.map((mode) => {
        if (mode.id === modeId) {
          return {
            ...mode,
            [field]: !mode[field],
          }
        }
        return mode
      })
    )
  }

  const handleBlurLevelChange = (modeId: string, level: "low" | "medium" | "high") => {
    setModes((prev) =>
      prev.map((mode) => {
        if (mode.id === modeId) {
          return {
            ...mode,
            blurLevel: level,
          }
        }
        return mode
      })
    )
  }

  const getBlurColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "high":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <EyeOff className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Privacy Mode Upgrade</CardTitle>
            <CardDescription className="text-xs">
              Auto-Mask Mode → AI blurs identifiable data before analysis
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Privacy Modes List */}
        {modes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 border rounded-lg transition-all ${getBlurColor(mode.blurLevel)}`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {mode.enabled ? (
                  <EyeOff className="h-5 w-5 text-primary shrink-0" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm mb-1">{mode.name}</div>
                  <div className="text-xs text-muted-foreground">{mode.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Label htmlFor={`enabled-${mode.id}`} className="text-xs cursor-pointer">
                  {mode.enabled ? "Enabled" : "Disabled"}
                </Label>
                <Switch
                  id={`enabled-${mode.id}`}
                  checked={mode.enabled}
                  onCheckedChange={() => handleToggle(mode.id, "enabled")}
                />
              </div>
            </div>

            {mode.enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 pt-3 border-t border-current/20 space-y-3"
              >
                {/* Auto-Mask Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <Label htmlFor={`automask-${mode.id}`} className="text-xs cursor-pointer">
                      Auto-Mask Mode
                    </Label>
                  </div>
                  <Switch
                    id={`automask-${mode.id}`}
                    checked={mode.autoMask}
                    onCheckedChange={() => handleToggle(mode.id, "autoMask")}
                  />
                </div>

                {/* Blur Level */}
                {mode.autoMask && (
                  <div className="space-y-2">
                    <Label className="text-xs">Blur Level</Label>
                    <div className="flex gap-2">
                      {(["low", "medium", "high"] as const).map((level) => (
                        <Button
                          key={level}
                          variant={mode.blurLevel === level ? "default" : "outline"}
                          size="sm"
                          className="h-7 px-3 text-xs"
                          onClick={() => handleBlurLevelChange(mode.id, level)}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Info */}
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-start gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <div className="font-medium mb-1">Privacy Mode Upgrade Benefits:</div>
              <ul className="space-y-1 list-disc list-inside">
                <li>Auto-Mask Mode: AI blurs identifiable data before analysis</li>
                <li>Adjustable blur levels: Low, Medium, High</li>
                <li>Automatic protection for sensitive information</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { PrivacyModeUpgrade }
