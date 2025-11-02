"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, Palette } from "lucide-react"

function ColorSafeModeToggle() {
  const [colorSafeMode, setColorSafeMode] = useState(false)

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Palette className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm mb-1">Color-Safe Mode</div>
              <div className="text-xs text-muted-foreground">
                Accessibility toggle for color-blind users
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Label htmlFor="color-safe-mode" className="text-xs cursor-pointer">
              {colorSafeMode ? "Enabled" : "Disabled"}
            </Label>
            <Switch
              id="color-safe-mode"
              checked={colorSafeMode}
              onCheckedChange={setColorSafeMode}
            />
          </div>
        </div>

        {/* Color-Safe Mode Examples */}
        {colorSafeMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-4 bg-muted rounded-lg border border-border space-y-3"
          >
            <div className="text-xs font-semibold mb-2">Color-Safe Indicators</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-foreground" />
                <span className="text-xs">Healthy / Safe (Green + Border)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-foreground" />
                <span className="text-xs">Warning / Medium (Yellow + Border)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-foreground" />
                <span className="text-xs">Critical / High Risk (Red + Border)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-foreground" />
                <span className="text-xs">Info / Neutral (Blue + Border)</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info */}
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-xs text-muted-foreground">
            Color-Safe Mode adds borders and icons to color indicators, making them accessible for
            color-blind users. Colors are supplemented with borders and icons for better
            recognition.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { ColorSafeModeToggle }

