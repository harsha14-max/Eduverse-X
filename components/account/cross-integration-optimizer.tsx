"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react"

const optimizations = [
  {
    id: "1",
    type: "redundancy",
    title: "Redundant Integrations",
    message: "Google Drive and Dropbox serve the same purpose. Consider removing one to reduce complexity.",
    integrations: ["Google Drive", "Dropbox"],
    action: "Remove Dropbox",
    impact: "Medium",
  },
  {
    id: "2",
    type: "unused",
    title: "Unused Integration",
    message: "Behance hasn't been accessed in 30 days. Consider disconnecting to improve performance.",
    integrations: ["Behance"],
    action: "Disconnect",
    impact: "Low",
  },
  {
    id: "3",
    type: "optimization",
    title: "Optimization Opportunity",
    message: "Multiple social media integrations can be managed through a single automation workflow.",
    integrations: ["LinkedIn", "Twitter", "Instagram"],
    action: "Create Workflow",
    impact: "High",
  },
]

export function CrossIntegrationOptimizer() {
  const handleOptimize = (id: string) => {
    // In real app, apply optimization
    console.log("Optimizing:", id)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <div className="text-sm font-semibold">Cross-Integration Optimizer</div>
            <Badge variant="outline" className="text-xs">AI-Powered</Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            AI analyzes all connected apps and suggests optimizations for better performance and reduced complexity.
          </div>
        </CardContent>
      </Card>

      {/* Optimizations */}
      <div className="space-y-3">
        {optimizations.map((opt, index) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`border ${
                opt.impact === "High"
                  ? "border-primary/20 bg-primary/5"
                  : opt.impact === "Medium"
                  ? "border-yellow-300 bg-yellow-50/50"
                  : "border-border"
              }`}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {opt.type === "redundancy" ? (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      ) : opt.type === "unused" ? (
                        <X className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                      <div className="text-sm font-medium">{opt.title}</div>
                      <Badge variant="outline" className="text-xs">
                        {opt.impact} Impact
                      </Badge>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="text-xs text-muted-foreground">{opt.message}</div>

                  {/* Integrations */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-xs text-muted-foreground">Integrations:</div>
                    {opt.integrations.map((integration, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {integration}
                      </Badge>
                    ))}
                  </div>

                  {/* Action */}
                  <Button
                    variant={opt.impact === "High" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleOptimize(opt.id)}
                    className="w-full gap-2 text-xs"
                  >
                    {opt.action}
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div className="text-sm font-semibold">Optimization Summary</div>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>• {optimizations.length} optimization opportunities found</div>
            <div>• Estimated performance improvement: 15-20%</div>
            <div>• Complexity reduction: 3 redundant integrations detected</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

