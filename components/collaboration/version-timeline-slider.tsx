"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Play, RotateCcw, CheckCircle2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface VersionCheckpoint {
  id: string
  timestamp: string
  user: string
  avatar: string
  action: string
  thumbnail: string
  version: string
}

const versions: VersionCheckpoint[] = [
  {
    id: "1",
    timestamp: "2 hours ago",
    user: "Alice",
    avatar: "AJ",
    action: "Created",
    thumbnail: "/api/placeholder/100/60",
    version: "v1.0",
  },
  {
    id: "2",
    timestamp: "1.5 hours ago",
    user: "Bob",
    avatar: "BS",
    action: "Modified",
    thumbnail: "/api/placeholder/100/60",
    version: "v1.1",
  },
  {
    id: "3",
    timestamp: "1 hour ago",
    user: "Charlie",
    avatar: "CB",
    action: "Updated",
    thumbnail: "/api/placeholder/100/60",
    version: "v1.2",
  },
  {
    id: "4",
    timestamp: "30 minutes ago",
    user: "Alice",
    avatar: "AJ",
    action: "Optimized",
    thumbnail: "/api/placeholder/100/60",
    version: "v1.3",
  },
  {
    id: "5",
    timestamp: "Just now",
    user: "You",
    avatar: "YO",
    action: "Current",
    thumbnail: "/api/placeholder/100/60",
    version: "v2.0",
  },
]

export default function VersionTimelineSlider() {
  const [currentIndex, setCurrentIndex] = useState(versions.length - 1)
  const [isRestoring, setIsRestoring] = useState(false)

  const handleSliderChange = (value: number[]) => {
    setCurrentIndex(Math.round((value[0] / 100) * (versions.length - 1)))
  }

  const handleRestore = () => {
    setIsRestoring(true)
    // Simulate restore action
    setTimeout(() => {
      setIsRestoring(false)
    }, 1500)
  }

  const currentVersion = versions[currentIndex]

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Version Timeline</h3>
          <Badge variant="outline" className="text-xs">
            {currentVersion.version}
          </Badge>
        </div>

        {/* Timeline Thumbnails */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {versions.map((version, index) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 cursor-pointer transition-all ${
                index === currentIndex ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="relative">
                <div className="w-20 h-12 rounded border border-border overflow-hidden bg-muted">
                  <img
                    src={version.thumbnail}
                    alt={version.version}
                    className="w-full h-full object-cover"
                  />
                </div>
                {index === currentIndex && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary bg-background rounded-full" />
                  </motion.div>
                )}
              </div>
              <div className="text-xs text-center mt-1 font-medium">{version.version}</div>
            </motion.div>
          ))}
        </div>

        {/* Slider */}
        <div className="space-y-2 mb-4">
          <Slider
            value={[(currentIndex / (versions.length - 1)) * 100]}
            onValueChange={handleSliderChange}
            min={0}
            max={100}
            step={100 / (versions.length - 1)}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{versions[0].version}</span>
            <span>{versions[versions.length - 1].version}</span>
          </div>
        </div>

        {/* Current Version Info */}
        <div className="p-3 rounded-lg border border-border bg-muted/50 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{currentVersion.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">{currentVersion.user}</span>
                <Badge variant="outline" className="text-xs">
                  {currentVersion.action}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">{currentVersion.timestamp}</div>
            </div>
          </div>
        </div>

        {/* Preview Canvas Placeholder */}
        <div className="h-32 rounded-lg border border-border bg-muted/30 flex items-center justify-center mb-4">
          <div className="text-xs text-muted-foreground">
            Preview of {currentVersion.version}
          </div>
        </div>

        {/* Restore Button */}
        {currentIndex !== versions.length - 1 && (
          <Button
            onClick={handleRestore}
            disabled={isRestoring}
            className="w-full gap-2"
            variant="outline"
          >
            {isRestoring ? (
              <>
                <RotateCcw className="h-4 w-4 animate-spin" />
                Restoring...
              </>
            ) : (
              <>
                <RotateCcw className="h-4 w-4" />
                Restore This Version
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

