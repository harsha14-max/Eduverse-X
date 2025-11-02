"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sparkles,
  Zap,
  Search,
  FileText,
  GraduationCap,
  Calendar,
  X,
  Command,
} from "lucide-react"
import { QuickActionModal } from "./quick-action-modal"

interface QuickAction {
  id: string
  label: string
  icon: typeof Sparkles
  description: string
}

const quickActions: QuickAction[] = [
  {
    id: "1",
    label: "Suggest new workflow",
    icon: Zap,
    description: "AI will suggest new automation workflows based on your activity",
  },
  {
    id: "2",
    label: "Find trending courses",
    icon: GraduationCap,
    description: "Discover trending courses in your field",
  },
  {
    id: "3",
    label: "Draft post",
    icon: FileText,
    description: "Generate social media post drafts",
  },
  {
    id: "4",
    label: "Update portfolio",
    icon: GraduationCap,
    description: "AI-powered portfolio suggestions",
  },
  {
    id: "5",
    label: "Check growth summary",
    icon: Calendar,
    description: "View your weekly growth summary",
  },
]

interface AIQuickActionsSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AIQuickActionsSidebar({ isOpen, onClose }: AIQuickActionsSidebarProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command+K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        // Toggle handled by parent
      }
      // Escape to close
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border z-50 shadow-xl"
            >
              <Card className="h-full rounded-none border-none flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-sm">AI Quick Actions</div>
                      <div className="text-xs text-muted-foreground">
                        Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘K</kbd> to open
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Actions List */}
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-2">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon
                      return (
                        <motion.div
                          key={action.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 h-auto p-3 hover:bg-accent"
                            onClick={() => handleActionClick(action.id)}
                          >
                            <Icon className="h-5 w-5 text-primary shrink-0" />
                            <div className="flex-1 text-left">
                              <div className="font-medium text-sm">{action.label}</div>
                              <div className="text-xs text-muted-foreground">{action.description}</div>
                            </div>
                          </Button>
                        </motion.div>
                      )
                    })}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="p-4 border-t border-border">
                  <div className="text-xs text-muted-foreground text-center">
                    Each action triggers AI assistant with context
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Action Modal */}
      {selectedAction && (
        <QuickActionModal
          open={!!selectedAction}
          onClose={() => setSelectedAction(null)}
          actionId={selectedAction}
          action={quickActions.find((a) => a.id === selectedAction)}
        />
      )}
    </>
  )
}

