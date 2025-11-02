"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface QuickActionModalProps {
  open: boolean
  onClose: () => void
  actionId: string | null
  action?: {
    id: string
    label: string
    icon: typeof Sparkles
    description: string
  } | null
}

export function QuickActionModal({ open, onClose, actionId, action }: QuickActionModalProps) {
  if (!action) return null

  const Icon = action.icon

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {action.label}
          </DialogTitle>
          <DialogDescription>{action.description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI Processing...</span>
            </div>
            <div className="text-xs text-muted-foreground">
              This would trigger the AI assistant modal with context for "{action.label}".
              In the real app, this would open the AI chat console with a pre-filled prompt.
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClose}>
            <Sparkles className="h-4 w-4 mr-2" />
            Execute Action
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

