"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface PermissionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onCancel: () => void
  action: {
    type: string
    title: string
    description: string
    dataAccess: string[]
    consequences: string[]
  } | null
  isLoading?: boolean
}

export function PermissionModal({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  action,
  isLoading = false,
}: PermissionModalProps) {
  if (!action) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <DialogTitle>Permission Required</DialogTitle>
          </div>
          <DialogDescription>
            Confirm AI action before execution
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Action Details */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">{action.title}</h4>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </CardContent>
          </Card>

          {/* Data Access */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <h4 className="text-sm font-semibold">Data Access Required</h4>
            </div>
            <ul className="space-y-2 mb-4">
              {action.dataAccess.map((access, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{access}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consequences */}
          {action.consequences.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <h4 className="text-sm font-semibold">What Will Happen</h4>
              </div>
              <ul className="space-y-2">
                {action.consequences.map((consequence, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <span>{consequence}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Security Note */}
          <Card className="border-border bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium mb-1">Security & Privacy</p>
                  <p className="text-xs text-muted-foreground">
                    Your data is encrypted and stored on IPFS. This action will be logged for transparency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onCancel()
              onOpenChange(false)
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm()
            }}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm & Execute"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

