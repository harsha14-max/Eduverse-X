"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, ArrowRight, CheckCircle2, X } from "lucide-react"

interface Conflict {
  id: string
  componentId: string
  componentName: string
  user1: string
  user1Version: string
  user2: string
  user2Version: string
  timestamp: string
}

interface ConflictResolutionUXProps {
  conflict: Conflict | null
  onResolve: (resolution: "user1" | "user2" | "merged" | "cancelled") => void
  onClose: () => void
}

export function ConflictResolutionUX({
  conflict,
  onResolve,
  onClose,
}: ConflictResolutionUXProps) {
  const [aiMergedVersion, setAIMergedVersion] = useState<string | null>(null)
  const [selectedResolution, setSelectedResolution] = useState<
    "user1" | "user2" | "merged" | null
  >(null)

  if (!conflict) return null

  const handleAIMerge = () => {
    // Simulate AI merge suggestion
    setAIMergedVersion(
      `Combined version: ${conflict.user1Version.substring(0, 50)}... + ${conflict.user2Version.substring(0, 50)}...`
    )
    setSelectedResolution("merged")
  }

  const handleResolve = () => {
    if (selectedResolution) {
      onResolve(selectedResolution)
      setSelectedResolution(null)
      setAIMergedVersion(null)
    }
  }

  return (
    <Dialog open={!!conflict} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Conflict Detected</DialogTitle>
          <DialogDescription>
            Two users edited {conflict.componentName} simultaneously. Choose how to resolve:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Side-by-side Diff */}
          <div className="grid grid-cols-2 gap-4">
            {/* User 1 Version */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                  {conflict.user1}'s Version
                </Badge>
              </div>
              <ScrollArea className="h-48 border border-border rounded-lg p-3">
                <pre className="text-xs whitespace-pre-wrap">{conflict.user1Version}</pre>
              </ScrollArea>
              <Button
                variant={selectedResolution === "user1" ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={() => setSelectedResolution("user1")}
              >
                {selectedResolution === "user1" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Selected
                  </>
                ) : (
                  "Keep This Version"
                )}
              </Button>
            </div>

            {/* User 2 Version */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  {conflict.user2}'s Version
                </Badge>
              </div>
              <ScrollArea className="h-48 border border-border rounded-lg p-3">
                <pre className="text-xs whitespace-pre-wrap">{conflict.user2Version}</pre>
              </ScrollArea>
              <Button
                variant={selectedResolution === "user2" ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={() => setSelectedResolution("user2")}
              >
                {selectedResolution === "user2" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Selected
                  </>
                ) : (
                  "Keep This Version"
                )}
              </Button>
            </div>
          </div>

          {/* AI Merge Suggestion */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">AI Merge Suggestion</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAIMerge}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Generate Merged Version
              </Button>
            </div>

            <AnimatePresence>
              {aiMergedVersion && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <ScrollArea className="h-32 border border-border rounded-lg p-3 bg-primary/5">
                    <pre className="text-xs whitespace-pre-wrap">{aiMergedVersion}</pre>
                  </ScrollArea>
                  <Button
                    variant={selectedResolution === "merged" ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedResolution("merged")}
                  >
                    {selectedResolution === "merged" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Using AI Merged Version
                      </>
                    ) : (
                      "Use AI Merged Version"
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resolution Actions */}
          <div className="flex gap-2 justify-end border-t border-border pt-4">
            <Button variant="outline" onClick={() => onResolve("cancelled")}>
              Cancel
            </Button>
            <Button
              onClick={handleResolve}
              disabled={!selectedResolution}
              className="gap-2"
            >
              Resolve Conflict
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

