"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  History,
  Gauge,
  GraduationCap,
  Clock,
  GitCompare,
  Trash2,
  Play,
  Sparkles,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface PromptHistory {
  id: string
  prompt: string
  timestamp: string
  flowGenerated: string
  version: number
}

export function UIMicroFeatures() {
  const [promptHistory, setPromptHistory] = useState<PromptHistory[]>([
    {
      id: "1",
      prompt: "Create Slack summary bot",
      timestamp: "2 hours ago",
      flowGenerated: "Slack Daily Summary Bot",
      version: 1,
    },
    {
      id: "2",
      prompt: "Create LinkedIn auto poster",
      timestamp: "1 day ago",
      flowGenerated: "LinkedIn Auto Poster",
      version: 1,
    },
    {
      id: "3",
      prompt: "Create GitHub sync workflow",
      timestamp: "2 days ago",
      flowGenerated: "GitHub Sync Workflow",
      version: 2,
    },
  ])

  const [performance, setPerformance] = useState({
    fps: 60,
    memory: 45.2,
    renderTime: 16.7,
    activeNodes: 4,
  })

  const [walkthroughStep, setWalkthroughStep] = useState(0)

  const walkthroughSteps = [
    {
      title: "Welcome to Automation Builder",
      description: "This is your visual workspace for building AI-powered automations.",
      target: "canvas",
    },
    {
      title: "Add Your First Node",
      description: "Drag nodes from the left sidebar or use AI Action field to generate automatically.",
      target: "ai-action",
    },
    {
      title: "Connect Nodes",
      description: "Click and drag from one node's output to another node's input to connect them.",
      target: "connections",
    },
    {
      title: "Use AI Suggestions",
      description: "AI will suggest optimal next nodes based on your current selection.",
      target: "smart-linking",
    },
    {
      title: "Test Your Flow",
      description: "Click 'Simulate Flow' to test your automation before deploying.",
      target: "simulate",
    },
  ]

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">UI Micro-Features</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="history" className="flex-1 flex flex-col">
          <TabsList className="w-full rounded-none border-b border-border">
            <TabsTrigger value="history" className="flex-1">
              <History className="h-3 w-3 mr-1" />
              Prompt History
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex-1">
              <Gauge className="h-3 w-3 mr-1" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="walkthrough" className="flex-1">
              <GraduationCap className="h-3 w-3 mr-1" />
              Walkthrough
            </TabsTrigger>
          </TabsList>

          {/* Prompt History */}
          <TabsContent value="history" className="flex-1 m-0 p-4 overflow-hidden">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {promptHistory.map((item, index) => (
                  <Card key={item.id} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-semibold text-sm mb-1">{item.prompt}</div>
                          <div className="text-xs text-muted-foreground mb-2">
                            Generated: {item.flowGenerated}
                          </div>
                          <div className="text-xs text-muted-foreground">{item.timestamp}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          v{item.version}
                        </Badge>
                      </div>

                      {/* Version Compare */}
                      {item.version > 1 && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                              <GitCompare className="h-3 w-3" />
                              Compare Versions
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Version Comparison</DialogTitle>
                              <DialogDescription>
                                Compare changes between versions
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-sm font-medium mb-2">Version {item.version - 1}</div>
                                  <div className="p-3 rounded bg-muted/50 text-xs text-muted-foreground">
                                    Previous version configuration...
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium mb-2">Version {item.version}</div>
                                  <div className="p-3 rounded bg-primary/5 border border-primary/20 text-xs">
                                    Current version with improvements...
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-2 text-xs">
                          <Play className="h-3 w-3" />
                          Use Again
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Performance Profiler */}
          <TabsContent value="performance" className="flex-1 m-0 p-4 overflow-hidden">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Frontend performance metrics for debugging
              </div>

              {/* FPS Meter */}
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">FPS (Frames Per Second)</div>
                    <Badge
                      variant={performance.fps >= 60 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {performance.fps} FPS
                    </Badge>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(performance.fps / 60) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Memory Usage */}
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">Memory Usage</div>
                    <Badge
                      variant={performance.memory < 50 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {performance.memory.toFixed(1)} MB
                    </Badge>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${performance.memory / 100 * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Render Time */}
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">Render Time</div>
                    <Badge variant="outline" className="text-xs">
                      {performance.renderTime.toFixed(1)} ms
                    </Badge>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(performance.renderTime / 33) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Active Nodes */}
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Active Nodes</div>
                    <Badge variant="outline" className="text-xs">
                      {performance.activeNodes} nodes
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="text-xs text-muted-foreground">
                These metrics update in real-time. Use them to identify performance bottlenecks.
              </div>
            </div>
          </TabsContent>

          {/* Interactive Walkthrough */}
          <TabsContent value="walkthrough" className="flex-1 m-0 p-4 overflow-hidden">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Guided tutorial for first-time users
              </div>

              {walkthroughSteps.map((step, index) => (
                <Card
                  key={index}
                  className={`border-2 ${
                    walkthroughStep === index
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">
                          Step {index + 1}: {step.title}
                        </div>
                        <div className="text-xs text-muted-foreground">{step.description}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {index + 1}/{walkthroughSteps.length}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant={walkthroughStep === index ? "default" : "outline"}
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => setWalkthroughStep(index)}
                      >
                        <Play className="h-3 w-3" />
                        {walkthroughStep === index ? "Current" : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="default"
                className="w-full gap-2"
                onClick={() => setWalkthroughStep(0)}
              >
                <GraduationCap className="h-4 w-4" />
                Restart Walkthrough
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

