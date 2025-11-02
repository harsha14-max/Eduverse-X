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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Key, UserPlus, CheckCircle2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Teammate {
  id: string
  name: string
  avatar: string
  email: string
  currentRole?: "owner" | "editor" | "viewer"
}

interface DelegationModalsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teammates: Teammate[]
  onDelegate: (teammateId: string, permissions: string[]) => void
}

export function DelegationModals({
  open,
  onOpenChange,
  teammates,
  onDelegate,
}: DelegationModalsProps) {
  const [selectedTeammate, setSelectedTeammate] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<"editor" | "viewer">("editor")
  const [permissions, setPermissions] = useState<{
    canEdit: boolean
    canComment: boolean
    canShare: boolean
  }>({
    canEdit: true,
    canComment: true,
    canShare: false,
  })
  const [isAnimating, setIsAnimating] = useState(false)

  const handleDelegate = () => {
    if (!selectedTeammate) return

    setIsAnimating(true)
    // Simulate animation
    setTimeout(() => {
      const permArray = []
      if (permissions.canEdit) permArray.push("edit")
      if (permissions.canComment) permArray.push("comment")
      if (permissions.canShare) permArray.push("share")

      onDelegate(selectedTeammate, permArray)
      setIsAnimating(false)
      onOpenChange(false)
    }, 1000)
  }

  const selectedTeammateData = teammates.find((t) => t.id === selectedTeammate)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            Share Access
          </DialogTitle>
          <DialogDescription>
            Give edit access to a teammate with selected permissions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Teammate Selection */}
          <div>
            <Label>Select Teammate</Label>
            <Select value={selectedTeammate} onValueChange={setSelectedTeammate}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose a teammate..." />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-48">
                  {teammates.map((teammate) => (
                    <SelectItem key={teammate.id} value={teammate.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{teammate.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{teammate.name}</div>
                          <div className="text-xs text-muted-foreground">{teammate.email}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>

          {/* Role Selection */}
          {selectedTeammate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <Label>Role</Label>
              <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as any)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Permissions */}
          {selectedTeammate && selectedRole === "editor" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3 pt-3 border-t border-border"
            >
              <Label>Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="can-edit" className="text-sm">
                      Can Edit
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Allow editing workflows and content
                    </p>
                  </div>
                  <Switch
                    id="can-edit"
                    checked={permissions.canEdit}
                    onCheckedChange={(checked) =>
                      setPermissions({ ...permissions, canEdit: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="can-comment" className="text-sm">
                      Can Comment
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Allow adding comments and feedback
                    </p>
                  </div>
                  <Switch
                    id="can-comment"
                    checked={permissions.canComment}
                    onCheckedChange={(checked) =>
                      setPermissions({ ...permissions, canComment: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="can-share" className="text-sm">
                      Can Share
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Allow sharing with external users
                    </p>
                  </div>
                  <Switch
                    id="can-share"
                    checked={permissions.canShare}
                    onCheckedChange={(checked) =>
                      setPermissions({ ...permissions, canShare: checked })
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Animation Preview */}
          <AnimatePresence>
            {isAnimating && selectedTeammateData && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="flex flex-col items-center justify-center p-4 border border-primary rounded-lg bg-primary/5"
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="mb-2"
                >
                  <Key className="h-8 w-8 text-primary" />
                </motion.div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {selectedTeammateData.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span>Granting access to {selectedTeammateData.name}...</span>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelegate} disabled={!selectedTeammate || isAnimating}>
              <UserPlus className="h-4 w-4 mr-2" />
              Share Access
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

