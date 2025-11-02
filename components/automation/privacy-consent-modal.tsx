"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Database,
  Globe,
  Lock,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PrivacyConsentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  platforms?: string[]
  dataTypes?: string[]
  onConsent: (accepted: boolean) => void
}

export function PrivacyConsentModal({
  open,
  onOpenChange,
  platforms = ["LinkedIn", "Twitter", "Instagram"],
  dataTypes = ["Post content", "Engagement metrics", "User profile"],
  onConsent,
}: PrivacyConsentModalProps) {
  const [hasRead, setHasRead] = useState(false)

  const handleAccept = () => {
    onConsent(true)
    onOpenChange(false)
  }

  const handleDecline = () => {
    onConsent(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Privacy Consent Required
          </DialogTitle>
          <DialogDescription>
            This automation involves sharing data with external platforms. Please review the data sharing details below.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 mt-4">
            {/* Alert */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-yellow-900 mb-1">
                  Data Sharing Notice
                </div>
                <div className="text-xs text-yellow-800">
                  This automation will share data with external platforms. All data is encrypted in transit and stored securely.
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Globe className="h-4 w-4 text-primary" />
                <span>Platforms Involved:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <Badge key={platform} variant="outline" className="text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Data Types */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Database className="h-4 w-4 text-primary" />
                <span>Data Types Being Shared:</span>
              </div>
              <div className="space-y-2">
                {dataTypes.map((dataType, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium">{dataType}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Shared securely via encrypted API connection
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Info */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Lock className="h-4 w-4 text-primary" />
                <span>Security Measures:</span>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" />
                  <span>All API connections use OAuth 2.0 authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" />
                  <span>Data encrypted in transit (HTTPS/TLS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" />
                  <span>No sensitive data stored locally</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" />
                  <span>You can revoke access at any time</span>
                </div>
              </div>
            </div>

            {/* Privacy Policy Link */}
            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-2 h-8"
                onClick={() => window.open("/privacy", "_blank")}
              >
                <ExternalLink className="h-3 w-3" />
                View Full Privacy Policy
              </Button>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted border border-border">
              <input
                type="checkbox"
                id="consent-checkbox"
                checked={hasRead}
                onChange={(e) => setHasRead(e.target.checked)}
                className="mt-0.5"
              />
              <label htmlFor="consent-checkbox" className="text-xs text-muted-foreground cursor-pointer flex-1">
                I have read and understood the data sharing details above. I consent to sharing my data with the specified platforms for this automation.
              </label>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="text-xs"
          >
            Decline
          </Button>
          <Button
            variant="default"
            onClick={handleAccept}
            disabled={!hasRead}
            className="text-xs gap-2"
          >
            <CheckCircle2 className="h-3 w-3" />
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

