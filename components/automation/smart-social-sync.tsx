"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Share2,
  Linkedin,
  Twitter,
  FileText,
  Eye,
  Send,
  CheckCircle2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface SmartSocialSyncProps {
  automationOutput?: string
  onPublish?: (platforms: string[]) => void
  showWhenPublishResult?: boolean // Show automatically when "Publish Result" node is detected
  publishResultNode?: { id: string; label: string } | null // The publish result node
}

export function SmartSocialSync({ 
  automationOutput, 
  onPublish, 
  showWhenPublishResult = false,
  publishResultNode = null 
}: SmartSocialSyncProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState("")

  const platforms = [
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, enabled: true, color: "text-blue-600" },
    { id: "twitter", name: "Twitter/X", icon: Twitter, enabled: true, color: "text-blue-400" },
    { id: "devto", name: "Dev.to", icon: FileText, enabled: true, color: "text-green-600" },
    { id: "medium", name: "Medium", icon: FileText, enabled: false, color: "text-gray-600" },
  ]

  // Auto-show when Publish Result node is detected
  const shouldShow = showWhenPublishResult && publishResultNode !== null

  const handleTogglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handlePreview = () => {
    setPreviewContent(displayContent || 
      "🎉 Just completed my Machine Learning Specialization! Excited to apply these new skills to real-world projects. #MachineLearning #AI #ContinuousLearning"
    )
    setShowPreview(true)
  }

  const handlePublish = () => {
    if (onPublish) {
      onPublish(selectedPlatforms)
    }
  }

  // Show if: automation output exists OR publish result node detected
  if (!automationOutput && !shouldShow) return null

  // Generate default content if automation output not provided
  const displayContent = automationOutput || 
    (publishResultNode ? `🎉 Just completed automation: "${publishResultNode.label}". Ready to share on social platforms! #Automation #Productivity` : "")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
    >
    <Card className="border-primary/20 bg-primary/5 shadow-lg min-w-[400px]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="h-5 w-5 text-primary" />
          <div className="text-sm font-semibold">Smart Social Sync</div>
          <Badge variant="outline" className="text-xs">Ready</Badge>
        </div>

        <div className="space-y-3">
        <div className="text-xs text-muted-foreground mb-2">
          {shouldShow ? (
            <>Your automation completed with <strong>Publish Result</strong> node. Share on social platforms:</>
          ) : (
            <>Your automation completed successfully. Share the result on social platforms:</>
          )}
        </div>

          <div className="grid grid-cols-2 gap-2">
            {platforms.map((platform) => {
              const Icon = platform.icon
              const isSelected = selectedPlatforms.includes(platform.id)
              return (
                <Button
                  key={platform.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={`gap-2 text-xs h-8 ${isSelected ? platform.color : ""}`}
                  onClick={() => handleTogglePlatform(platform.id)}
                  disabled={!platform.enabled}
                >
                  <Icon className={`h-3 w-3 ${isSelected ? "" : platform.color}`} />
                  {platform.name}
                  {isSelected && (
                    <CheckCircle2 className="h-3 w-3" />
                  )}
                </Button>
              )
            })}
          </div>
          
          {/* Platform Status Info */}
          <div className="text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Share2 className="h-3 w-3" />
              <span>
                {selectedPlatforms.length > 0 
                  ? `Will publish to ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? "s" : ""}`
                  : "Select platforms to publish"}
              </span>
            </div>
            {shouldShow && publishResultNode && (
              <div className="text-xs text-muted-foreground mt-1 italic">
                Triggered by: {publishResultNode.label}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2 text-xs"
              onClick={handlePreview}
            >
              <Eye className="h-3 w-3" />
              Preview Post
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1 gap-2 text-xs"
              onClick={handlePublish}
              disabled={selectedPlatforms.length === 0}
            >
              <Send className="h-3 w-3" />
              Publish
            </Button>
          </div>
        </div>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Post Preview</DialogTitle>
              <DialogDescription>
                Preview how your post will look on selected platforms
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <Textarea
                value={previewContent}
                onChange={(e) => setPreviewContent(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Share2 className="h-3 w-3" />
                  <span>Publishing to:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPlatforms.map((platformId) => {
                    const platform = platforms.find((p) => p.id === platformId)
                    if (!platform) return null
                    const Icon = platform.icon
                    return (
                      <Badge key={platformId} variant="outline" className="text-xs gap-1">
                        <Icon className={`h-3 w-3 ${platform.color}`} />
                        {platform.name}
                      </Badge>
                    )
                  })}
                  {selectedPlatforms.length === 0 && (
                    <span className="text-xs text-muted-foreground">No platforms selected</span>
                  )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded border border-border">
                <strong>Note:</strong> In production, posts will be published via n8n webhooks to your connected accounts.
              </div>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => {
                    handlePublish()
                    setShowPreview(false)
                  }}
                  disabled={selectedPlatforms.length === 0}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
    </motion.div>
  )
}

