"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NodeSoundCuesProps {
  nodeId: string
  status: "success" | "error" | "pending"
  enabled?: boolean
  onStatusChange?: (status: "success" | "error" | "pending") => void
}

// Audio context for playing sounds
let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  
  return audioContext
}

function playSound(
  frequency: number,
  duration: number,
  type: "success" | "error" = "success"
): void {
  const ctx = getAudioContext()
  if (!ctx) return

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  // Set frequency and wave type
  oscillator.frequency.value = frequency
  oscillator.type = type === "success" ? "sine" : "sawtooth"

  // Set gain envelope for soft ping
  gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + duration)
}

export function NodeSoundCues({
  nodeId,
  status,
  enabled = true,
  onStatusChange,
}: NodeSoundCuesProps) {
  const [isEnabled, setIsEnabled] = useState(enabled)

  useEffect(() => {
    if (!isEnabled) return

    // Play sound based on status
    if (status === "success") {
      playSound(800, 0.15, "success")
    } else if (status === "error") {
      playSound(400, 0.2, "error")
    }
  }, [status, isEnabled, nodeId])

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-6 w-6",
        isEnabled && "text-primary"
      )}
      onClick={() => setIsEnabled(!isEnabled)}
      title={isEnabled ? "Disable sound cues" : "Enable sound cues"}
    >
      {isEnabled ? (
        <Volume2 className="h-3 w-3" />
      ) : (
        <VolumeX className="h-3 w-3 text-muted-foreground" />
      )}
    </Button>
  )
}

// Hook to enable/disable sound cues globally
export function useNodeSoundCues() {
  const [globalEnabled, setGlobalEnabled] = useState(true)

  return {
    enabled: globalEnabled,
    toggle: () => setGlobalEnabled(!globalEnabled),
    playSuccess: () => globalEnabled && playSound(800, 0.15, "success"),
    playError: () => globalEnabled && playSound(400, 0.2, "error"),
  }
}

