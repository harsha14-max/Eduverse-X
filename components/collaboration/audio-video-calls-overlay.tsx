"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Video, Phone, Mic, MicOff, VideoOff, PhoneOff, X, Minimize2 } from "lucide-react"

interface CallParticipant {
  id: string
  name: string
  avatar: string
  isMuted: boolean
  isVideoOn: boolean
}

interface AudioVideoCallsOverlayProps {
  participants: CallParticipant[]
  callType: "audio" | "video"
  onEndCall: () => void
  onToggleMic: () => void
  onToggleVideo: () => void
}

export function AudioVideoCallsOverlay({
  participants,
  callType,
  onEndCall,
  onToggleMic,
  onToggleVideo,
}: AudioVideoCallsOverlayProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMicMuted, setIsMicMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  const handleToggleMic = () => {
    setIsMicMuted(!isMicMuted)
    onToggleMic()
  }

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff)
    onToggleVideo()
  }

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 w-64 h-32 bg-background border border-border rounded-lg shadow-xl z-50"
      >
        <div className="p-2 border-b border-border flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {callType === "video" ? "Video Call" : "Audio Call"}
          </Badge>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={() => setIsMinimized(false)}
          >
            <Minimize2 className="h-3 w-3 rotate-180" />
          </Button>
        </div>
        <div className="p-2 flex items-center justify-center h-full">
          <div className="flex items-center gap-2">
            {callType === "video" ? (
              <Video className="h-4 w-4 text-primary" />
            ) : (
              <Phone className="h-4 w-4 text-primary" />
            )}
            <span className="text-xs font-medium">{participants.length} participants</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-20 right-4 w-80 bg-background border border-border rounded-lg shadow-xl z-50"
    >
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          {callType === "video" ? (
            <Video className="h-4 w-4 text-primary" />
          ) : (
            <Phone className="h-4 w-4 text-primary" />
          )}
          <span className="text-sm font-semibold">
            {callType === "video" ? "Video Call" : "Audio Call"}
          </span>
          <Badge variant="outline" className="text-xs">{participants.length}</Badge>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={() => setIsMinimized(true)}
        >
          <Minimize2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Participants */}
      <div className="p-3 space-y-2 max-h-48 overflow-y-auto">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center gap-3 p-2 rounded-lg border border-border bg-muted/30"
          >
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs">{participant.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-xs font-semibold">{participant.name}</div>
              <div className="flex items-center gap-2 mt-1">
                {participant.isMuted && (
                  <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-300">
                    <MicOff className="h-2 w-2 mr-1" />
                    Muted
                  </Badge>
                )}
                {!participant.isVideoOn && callType === "video" && (
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-300">
                    <VideoOff className="h-2 w-2 mr-1" />
                    Camera Off
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="p-3 border-t border-border flex items-center justify-center gap-2">
        <Button
          size="icon"
          variant={isMicMuted ? "destructive" : "outline"}
          onClick={handleToggleMic}
          className="h-10 w-10"
        >
          {isMicMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        {callType === "video" && (
          <Button
            size="icon"
            variant={isVideoOff ? "destructive" : "outline"}
            onClick={handleToggleVideo}
            className="h-10 w-10"
          >
            {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
          </Button>
        )}
        <Button
          size="icon"
          variant="destructive"
          onClick={onEndCall}
          className="h-10 w-10"
        >
          {callType === "video" ? <VideoOff className="h-4 w-4" /> : <PhoneOff className="h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  )
}

