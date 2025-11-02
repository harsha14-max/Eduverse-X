"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  Phone,
  MessageSquare,
  Bell,
  X,
  Send,
  Mic,
  MicOff,
  VideoOff,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CollaborationDockProps {
  onPing?: (message: string, componentId?: string) => void
}

export default function CollaborationDock({ onPing }: CollaborationDockProps) {
  const [showChat, setShowChat] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [showPingModal, setShowPingModal] = useState(false)
  const [pingMessage, setPingMessage] = useState("")
  const [pingComponent, setPingComponent] = useState("")
  const [isMicOn, setIsMicOn] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)

  const handlePing = () => {
    if (pingMessage.trim() && onPing) {
      onPing(pingMessage, pingComponent || undefined)
      setPingMessage("")
      setPingComponent("")
      setShowPingModal(false)
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      {/* Dock Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 p-3 bg-background border border-border rounded-lg shadow-lg"
      >
        {/* Voice Button */}
        <Button
          size="icon"
          variant={isMicOn ? "default" : "outline"}
          onClick={() => setIsMicOn(!isMicOn)}
          className="h-10 w-10"
        >
          {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>

        {/* Video Button */}
        <Button
          size="icon"
          variant={isVideoOn ? "default" : "outline"}
          onClick={() => {
            setIsVideoOn(!isVideoOn)
            setShowVideo(!showVideo)
          }}
          className="h-10 w-10"
        >
          {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
        </Button>

        {/* Chat Button */}
        <Button
          size="icon"
          variant={showChat ? "default" : "outline"}
          onClick={() => setShowChat(!showChat)}
          className="h-10 w-10 relative"
        >
          <MessageSquare className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">3</Badge>
        </Button>

        {/* Ping Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowPingModal(true)}
          className="gap-2"
        >
          <Bell className="h-4 w-4" />
          Ping
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 left-0 w-80 bg-background border border-border rounded-lg shadow-xl"
          >
            <div className="p-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-semibold">Project Chat</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={() => setShowChat(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
              <div className="flex items-start gap-2">
                <div className="flex-1 bg-muted rounded-lg p-2 text-xs">
                  <div className="font-semibold mb-1">Alice</div>
                  <div>Hey, can you check node 5?</div>
                </div>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <div className="flex-1 bg-primary text-primary-foreground rounded-lg p-2 text-xs">
                  <div className="font-semibold mb-1">You</div>
                  <div>Sure, checking now</div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-1 text-xs"
                  onKeyPress={(e) => e.key === "Enter" && console.log("Send message")}
                />
                <Button size="icon" className="h-8 w-8">
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Call Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-20 right-4 w-64 h-48 bg-background border border-border rounded-lg shadow-xl z-50"
          >
            <div className="p-2 border-b border-border flex items-center justify-between">
              <span className="text-xs font-semibold">Video Call</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={() => {
                  setShowVideo(false)
                  setIsVideoOn(false)
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="h-full bg-muted flex items-center justify-center">
              <Video className="h-8 w-8 text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ping Modal */}
      <Dialog open={showPingModal} onOpenChange={setShowPingModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Ping Teammate</DialogTitle>
            <DialogDescription>
              Request attention on a specific component
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-medium mb-2 block">Component (optional)</label>
              <Input
                value={pingComponent}
                onChange={(e) => setPingComponent(e.target.value)}
                placeholder="e.g., node 5, chart #2"
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-2 block">Message</label>
              <Input
                value={pingMessage}
                onChange={(e) => setPingMessage(e.target.value)}
                placeholder="Hey @Riya check node 5"
                className="text-sm"
                onKeyPress={(e) => e.key === "Enter" && handlePing()}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowPingModal(false)}>
                Cancel
              </Button>
              <Button onClick={handlePing}>Send Ping</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

