"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, TrendingUp, AlertCircle } from "lucide-react"

interface PrivacyHealthMetrics {
  encryption: number // 30%
  aiTransparency: number // 25%
  keyIntegrity: number // 25%
  auditTrail: number // 20%
}

const privacyHealthMetrics: PrivacyHealthMetrics = {
  encryption: 95,
  aiTransparency: 85,
  keyIntegrity: 90,
  auditTrail: 80,
}

function PrivacyHealthGauge() {
  const [healthScore, setHealthScore] = useState(0)
  const [metrics] = useState<PrivacyHealthMetrics>(privacyHealthMetrics)

  useEffect(() => {
    // Calculate overall health score
    const score =
      metrics.encryption * 0.3 +
      metrics.aiTransparency * 0.25 +
      metrics.keyIntegrity * 0.25 +
      metrics.auditTrail * 0.2

    // Animate score
    let current = 0
    const interval = setInterval(() => {
      current += 5
      if (current >= score) {
        current = score
        clearInterval(interval)
      }
      setHealthScore(Math.round(current))
    }, 50)

    return () => clearInterval(interval)
  }, [metrics])

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthIcon = (score: number) => {
    if (score >= 90) return <Shield className="h-8 w-8 text-green-600" />
    if (score >= 75) return <TrendingUp className="h-8 w-8 text-yellow-600" />
    return <AlertCircle className="h-8 w-8 text-red-600" />
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Animated Gauge */}
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            {getHealthIcon(healthScore)}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-6xl font-bold mb-2 ${getHealthColor(healthScore)}`}
          >
            {healthScore}
          </motion.div>
          <div className="text-sm text-muted-foreground mb-4">Privacy Health</div>
          <Progress value={healthScore} className="w-full h-3" />
        </div>

        {/* Breakdown Metrics */}
        <div className="space-y-3">
          <div className="text-sm font-semibold mb-3">Breakdown Widgets</div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-medium">🔒 Encryption Status (30%)</div>
                <div className="text-xs text-muted-foreground">{metrics.encryption}%</div>
              </div>
              <Progress value={metrics.encryption} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-medium">🤖 AI Transparency (25%)</div>
                <div className="text-xs text-muted-foreground">{metrics.aiTransparency}%</div>
              </div>
              <Progress value={metrics.aiTransparency} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-medium">🗝 Key Integrity (25%)</div>
                <div className="text-xs text-muted-foreground">{metrics.keyIntegrity}%</div>
              </div>
              <Progress value={metrics.keyIntegrity} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-medium">🧩 Audit Trail Completion (20%)</div>
                <div className="text-xs text-muted-foreground">{metrics.auditTrail}%</div>
              </div>
              <Progress value={metrics.auditTrail} className="h-2" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="text-xs text-muted-foreground">
            Privacy Health Gauge displays your overall privacy health (0-100) based on encryption
            status (30%), AI transparency (25%), key integrity (25%), and audit trail completion
            (20%).
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { PrivacyHealthGauge }

