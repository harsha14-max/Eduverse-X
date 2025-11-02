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
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Star, Download, Play, Zap, Users, Clock, CheckCircle2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface Template {
  id: string
  name: string
  description: string
  category: string
  author: string
  rating: number
  installs: number
  price: "Free" | string
  nodes: number
  triggers: string[]
  actions: string[]
  preview: {
    nodes: number
    connections: number
  }
  demoAvailable: boolean
  tags: string[]
}

export function TemplatePreviewModal({ template, onClose }: { template: Template; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [demoRunning, setDemoRunning] = useState(false)

  const handleRunDemo = () => {
    setDemoRunning(true)
    setTimeout(() => {
      setDemoRunning(false)
    }, 3000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {template.name}
            {template.demoAvailable && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                <Play className="h-3 w-3 mr-1" />
                Demo Available
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-xs text-muted-foreground mb-1">Rating</div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{template.rating}</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-xs text-muted-foreground mb-1">Installs</div>
                <div className="font-semibold">{template.installs.toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-xs text-muted-foreground mb-1">Nodes</div>
                <div className="font-semibold flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {template.nodes}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-xs text-muted-foreground mb-1">Price</div>
                <div className="font-semibold">{template.price === "Free" ? "Free" : template.price}</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-2">Workflow Structure</div>
              <div className="p-4 rounded-lg bg-muted border border-border">
                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-medium mb-1">Triggers:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {template.triggers.map((trigger) => (
                        <Badge key={trigger} variant="outline" className="text-xs">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-1">Actions:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {template.actions.map((action) => (
                        <Badge key={action} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {template.demoAvailable && (
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold mb-1">Try Demo Sandbox</div>
                    <div className="text-xs text-muted-foreground">
                      Test this automation on sample data without backend commitment
                    </div>
                  </div>
                  <Button
                    onClick={handleRunDemo}
                    disabled={demoRunning}
                    variant={demoRunning ? "outline" : "default"}
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {demoRunning ? "Running..." : "Run Demo"}
                  </Button>
                </div>
                {demoRunning && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded bg-background border border-border"
                  >
                    <div className="text-xs font-medium mb-2">Demo Progress</div>
                    <Progress value={66} className="h-2 mb-2" />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Processing sample data...
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <div className="p-4 rounded-lg bg-muted border border-border">
              <div className="text-sm font-semibold mb-3">Visual Flow Preview</div>
              <div className="space-y-4">
                {template.triggers.map((trigger, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="p-2 rounded bg-primary/10 border border-primary/20 text-xs font-medium">
                      {trigger}
                    </div>
                    <div className="flex-1 h-0.5 bg-border" />
                    {index === 0 && (
                      <div className="p-2 rounded bg-muted border border-border text-xs">
                        {template.nodes} nodes
                      </div>
                    )}
                  </div>
                ))}
                {template.actions.map((action, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="p-2 rounded bg-green-500/10 border border-green-500/20 text-xs font-medium">
                      {action}
                    </div>
                    {index < template.actions.length - 1 && (
                      <div className="flex-1 h-0.5 bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <ScrollArea className="h-64">
              <div className="space-y-4">
                {[
                  {
                    user: "Sara J.",
                    rating: 5,
                    comment: "This automation saved me hours every week! Highly recommend.",
                    date: "2 days ago",
                  },
                  {
                    user: "Mike C.",
                    rating: 4,
                    comment: "Great workflow, easy to set up and works perfectly.",
                    date: "1 week ago",
                  },
                ].map((review, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{review.user}</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="setup" className="mt-4">
            <div className="space-y-3">
              <div className="text-sm font-semibold mb-2">Estimated Setup Time: 5-10 minutes</div>
              <div className="space-y-2">
                {[
                  "Connect required integrations (Notion, Telegram)",
                  "Configure trigger settings (daily time, conditions)",
                  "Set up AI summary parameters",
                  "Test workflow with sample data",
                  "Enable automation",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              By {template.author}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {template.category}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              {template.price === "Free" ? "Add to Workspace" : `Buy for ${template.price}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

