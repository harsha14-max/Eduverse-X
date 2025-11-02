"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, ArrowRight, Database, Globe, Brain } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DataPath {
  id: string
  step: string
  location: string
  action: string
  timestamp: string
  icon: typeof Database
}

const dataPath: DataPath[] = [
  {
    id: "1",
    step: "Local UI",
    location: "Browser",
    action: "User uploads file",
    timestamp: "10:00:00",
    icon: Database,
  },
  {
    id: "2",
    step: "Encryption",
    location: "Client-side",
    action: "File encrypted locally",
    timestamp: "10:00:05",
    icon: Database,
  },
  {
    id: "3",
    step: "IPFS Upload",
    location: "IPFS Network",
    action: "File uploaded to IPFS",
    timestamp: "10:00:15",
    icon: Globe,
  },
  {
    id: "4",
    step: "AI Processing",
    location: "AI Service",
    action: "AI analyzes file",
    timestamp: "10:00:30",
    icon: Brain,
  },
]

function DataTracerOverlay() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      setIsAnimating(true)
      // Simulate animation
      let step = 0
      const interval = setInterval(() => {
        step++
        setCurrentStep(step)
        if (step >= dataPath.length - 1) {
          clearInterval(interval)
          setIsPlaying(false)
          setIsAnimating(false)
        }
      }, 1000)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setIsAnimating(false)
  }

  const progress = ((currentStep + 1) / dataPath.length) * 100

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <RefreshCw className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Data Tracer Overlay</CardTitle>
              <CardDescription className="text-xs">
                Path animation showing data movement (local UI → IPFS → AI)
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePlay} className="gap-2">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Data Path Visualization */}
        <div className="relative p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center justify-between">
            {dataPath.map((path, index) => {
              const Icon = path.icon
              const isActive = index <= currentStep
              const isCurrent = index === currentStep

              return (
                <div key={path.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: isActive ? 1 : 0.5 }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        isActive
                          ? isCurrent
                            ? "border-primary bg-primary/20 shadow-lg scale-110"
                            : "border-primary bg-primary/10"
                          : "border-border bg-background opacity-50"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isActive ? (isCurrent ? "text-primary" : "text-primary/70") : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>
                    <div className="mt-2 text-center">
                      <div className={`text-xs font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {path.step}
                      </div>
                      <div className="text-xs text-muted-foreground">{path.location}</div>
                    </div>
                  </div>
                  {index < dataPath.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: index < currentStep ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex-1 h-0.5 bg-primary mx-2"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Path Steps List */}
        <div className="space-y-2">
          {dataPath.map((path, index) => {
            const Icon = path.icon
            const isActive = index <= currentStep
            const isCurrent = index === currentStep

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 border rounded-lg transition-all ${
                  isActive
                    ? isCurrent
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-primary/50 bg-primary/5"
                    : "border-border opacity-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? "bg-primary/20" : "bg-muted"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className={`font-semibold text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {path.step}
                      </div>
                      <Badge variant={isActive ? "default" : "outline"} className="text-xs shrink-0">
                        {path.timestamp}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">{path.location}</div>
                    <div className="text-xs text-muted-foreground">{path.action}</div>
                  </div>
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-xs text-muted-foreground">
            Data Tracer shows how a file travels from local UI → IPFS → AI usage with path
            animation.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { DataTracerOverlay }
