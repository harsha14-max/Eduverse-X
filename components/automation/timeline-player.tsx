"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Zap,
} from "lucide-react"

interface TimelineStep {
  nodeId: string
  nodeName: string
  timestamp: number
  status: "success" | "error" | "pending"
  data?: any
}

interface TimelinePlayerProps {
  steps: TimelineStep[]
  onStepChange?: (stepIndex: number) => void
}

export function TimelinePlayer({ steps, onStepChange }: TimelinePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  useEffect(() => {
    if (!isPlaying || steps.length === 0) return

    const delay = 2000 / playbackSpeed // 2 seconds per step at 1x speed

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false)
          return prev
        }
        const nextStep = prev + 1
        if (onStepChange) {
          onStepChange(nextStep)
        }
        return nextStep
      })
    }, delay)

    return () => clearInterval(interval)
  }, [isPlaying, steps.length, playbackSpeed, onStepChange])

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      if (onStepChange) {
        onStepChange(nextStep)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      if (onStepChange) {
        onStepChange(prevStep)
      }
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    if (onStepChange) {
      onStepChange(0)
    }
  }

  if (steps.length === 0) return null

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <div className="text-sm font-semibold">Timeline Player</div>
              <Badge variant="outline" className="text-xs">
                Step {currentStep + 1} / {steps.length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="text-xs border border-border rounded px-2 py-1 bg-background"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{currentStepData?.nodeName || "Start"}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Current Step Info */}
          {currentStepData && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-muted/50 border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold">{currentStepData.nodeName}</div>
                <Badge
                  variant={currentStepData.status === "success" ? "default" : "destructive"}
                  className="text-xs"
                >
                  {currentStepData.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Timestamp: {new Date(currentStepData.timestamp).toLocaleTimeString()}
              </div>
            </motion.div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={currentStep === 0}
                className="gap-2 text-xs"
              >
                <Repeat className="h-3 w-3" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="gap-2 text-xs"
              >
                <SkipBack className="h-3 w-3" />
                Prev
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              {isPlaying ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handlePause}
                  className="gap-2 text-xs"
                >
                  <Pause className="h-3 w-3" />
                  Pause
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handlePlay}
                  className="gap-2 text-xs"
                >
                  <Play className="h-3 w-3" />
                  Play
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentStep >= steps.length - 1}
                className="gap-2 text-xs"
              >
                Next
                <SkipForward className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="text-xs font-semibold mb-2">Execution Timeline:</div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {steps.map((step, index) => (
                <div
                  key={step.nodeId}
                  className={`flex items-center gap-2 p-2 rounded text-xs cursor-pointer transition-colors ${
                    index === currentStep
                      ? "bg-primary/10 border border-primary/20"
                      : index < currentStep
                      ? "bg-muted/30"
                      : "bg-background border border-border"
                  }`}
                  onClick={() => {
                    setCurrentStep(index)
                    if (onStepChange) {
                      onStepChange(index)
                    }
                  }}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep
                        ? "bg-primary animate-pulse"
                        : index < currentStep
                        ? step.status === "success"
                          ? "bg-green-500"
                          : "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <span className="flex-1 min-w-0 truncate">{step.nodeName}</span>
                  <Zap className={`h-3 w-3 ${
                    index === currentStep ? "text-primary" :
                    index < currentStep ? "text-green-600" : "text-gray-400"
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

