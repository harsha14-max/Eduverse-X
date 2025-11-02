"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle2, Calendar, Lock, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  thumbnail?: string
}

export function ShareModal({
  open,
  onOpenChange,
  title = "Automation Workflow #12",
  description = "LinkedIn Auto Poster with AI Enhancement",
  thumbnail = "/api/placeholder/300/200",
}: ShareModalProps) {
  const [link, setLink] = useState("https://eduverse.ai/share/abc123xyz")
  const [copied, setCopied] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [hasExpiry, setHasExpiry] = useState(false)
  const [expiryTime, setExpiryTime] = useState("7")
  const [permissions, setPermissions] = useState<"view" | "edit">("view")

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Copy link, set expiry time, and add password protection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Visual Preview Card */}
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <div className="w-20 h-16 rounded border border-border overflow-hidden bg-muted flex-shrink-0">
                <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold mb-1 truncate">{title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    {permissions === "view" ? "View Only" : "Can Edit"}
                  </Badge>
                  {hasPassword && (
                    <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-300">
                      <Lock className="h-3 w-3 mr-1" />
                      Password Protected
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Link Copy */}
          <div>
            <Label>Share Link</Label>
            <div className="flex gap-2 mt-2">
              <Input value={link} readOnly className="flex-1 text-xs" />
              <Button size="icon" onClick={handleCopy} variant={copied ? "default" : "outline"}>
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <Label>Permissions</Label>
            <Select value={permissions} onValueChange={(v) => setPermissions(v as any)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view">View Only</SelectItem>
                <SelectItem value="edit">Can Edit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Password Protection */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="has-password" className="text-sm">
                  Password Protection
                </Label>
                <p className="text-xs text-muted-foreground">
                  Require password to access
                </p>
              </div>
            </div>
            <Switch
              id="has-password"
              checked={hasPassword}
              onCheckedChange={setHasPassword}
            />
          </div>

          {hasPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-2"
              />
            </motion.div>
          )}

          {/* Expiry Time */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="has-expiry" className="text-sm">
                  Set Expiry Time
                </Label>
                <p className="text-xs text-muted-foreground">
                  Link expires after selected time
                </p>
              </div>
            </div>
            <Switch
              id="has-expiry"
              checked={hasExpiry}
              onCheckedChange={setHasExpiry}
            />
          </div>

          {hasExpiry && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <Label>Expires After</Label>
              <Select value={expiryTime} onValueChange={setExpiryTime}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Hour</SelectItem>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Create Share Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

