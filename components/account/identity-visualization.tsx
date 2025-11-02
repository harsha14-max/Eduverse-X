"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Network,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { ReputationGraph } from "./reputation-graph"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const influenceMetrics = {
  workflowsReused: 24,
  postsReused: 18,
  mentorshipConnections: 5,
  collaborations: 12,
  growth: "+12% this month",
}

export function IdentityVisualization() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAIOverlay, setShowAIOverlay] = useState(true)

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Network className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Decentralized Identity Visualization</CardTitle>
              <CardDescription className="text-xs">
                Your reputation graph and influence network
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
        {/* AI Growth Overlay */}
        {showAIOverlay && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-primary/5 border border-primary/20"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-semibold mb-1">AI Growth Summary</div>
                <div className="text-xs text-muted-foreground mb-3">
                  Your influence in Machine Learning community grew {influenceMetrics.growth}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Workflow className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">Workflows:</span>
                    <span className="font-medium">{influenceMetrics.workflowsReused}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">Posts:</span>
                    <span className="font-medium">{influenceMetrics.postsReused}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">Mentorships:</span>
                    <span className="font-medium">{influenceMetrics.mentorshipConnections}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">Collaborations:</span>
                    <span className="font-medium">{influenceMetrics.collaborations}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowAIOverlay(false)}
              >
                ×
              </Button>
            </div>
          </motion.div>
        )}

        {/* Reputation Graph */}
        <div className="flex-1 overflow-hidden min-h-0 border border-border rounded-lg bg-muted/30">
          <ReputationGraph isExpanded={isExpanded} />
        </div>

        {/* Influence Summary */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="text-sm font-semibold mb-3">Influence Links</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-background border border-border">
                <div className="text-2xl font-bold text-primary mb-1">{influenceMetrics.workflowsReused}</div>
                <div className="text-xs text-muted-foreground">Workflows Reused</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background border border-border">
                <div className="text-2xl font-bold text-primary mb-1">{influenceMetrics.postsReused}</div>
                <div className="text-xs text-muted-foreground">Posts Reused</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background border border-border">
                <div className="text-2xl font-bold text-primary mb-1">{influenceMetrics.mentorshipConnections}</div>
                <div className="text-xs text-muted-foreground">Mentorship Links</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background border border-border">
                <div className="text-2xl font-bold text-primary mb-1">{influenceMetrics.collaborations}</div>
                <div className="text-xs text-muted-foreground">Collaborations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

