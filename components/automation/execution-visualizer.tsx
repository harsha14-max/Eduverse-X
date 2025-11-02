"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipForward, SkipBack, AlertCircle, CheckCircle2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExecutionTrace {
  nodeId: string
  nodeName: string
  status: "success" | "error" | "pending" | "running"
  startTime: number
  endTime?: number
  data: any
}

interface FlowExecution {
  id: string
  flowName: string
  startTime: number
  endTime: number
  status: "success" | "error"
  traces: ExecutionTrace[]
}

export function ExecutionVisualizer({ execution, onReplay }: { execution?: FlowExecution; onReplay?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showLiveTrace, setShowLiveTrace] = useState(true)
  const [errorHeatmap, setErrorHeatmap] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!execution) return

    // Calculate error heatmap
    const errors: Record<string, number> = {}
    execution.traces.forEach((trace) => {
      if (trace.status === "error") {
        errors[trace.nodeId] = (errors[trace.nodeId] || 0) + 1
      }
    })
    setErrorHeatmap(errors)
  }, [execution])

  useEffect(() => {
    if (!isPlaying || !execution) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= execution.traces.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, execution])

  if (!execution) {
    return (
      <Card className="border-border shadow-sm">
        <CardContent className="p-6 text-center text-muted-foreground">
          No execution data available. Run a flow to see visualization.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">AI Execution Visualizer 2.0</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLiveTrace(!showLiveTrace)}
              className="gap-2"
            >
              {showLiveTrace ? "Hide" : "Show"} Live Trace
            </Button>
            {onReplay && (
              <Button variant="default" size="sm" onClick={onReplay} className="gap-2">
                <Play className="h-3 w-3" />
                Replay
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="trace" className="flex-1 flex flex-col">
          <TabsList className="w-full rounded-none border-b border-border">
            <TabsTrigger value="trace" className="flex-1">
              Live Trace
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex-1">
              Reasoning Timeline
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="flex-1">
              Error Heatmap
            </TabsTrigger>
          </TabsList>

          {/* Live Trace */}
          <TabsContent value="trace" className="flex-1 m-0 p-4 overflow-hidden">
            <div className="space-y-4">
              {/* Playback Controls */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={isPlaying ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentStep(Math.min(execution.traces.length - 1, currentStep + 1))}
                    disabled={currentStep >= execution.traces.length - 1}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Step {currentStep + 1} of {execution.traces.length}
                </div>
              </div>

              {/* Execution Traces */}
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {execution.traces.map((trace, index) => {
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    const hasError = trace.status === "error"

                    return (
                      <motion.div
                        key={trace.nodeId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card
                          className={`border-2 ${
                            isActive && showLiveTrace
                              ? "border-primary shadow-lg bg-primary/5 animate-pulse"
                              : isCompleted
                              ? "border-green-200 bg-green-50/50"
                              : hasError
                              ? "border-red-200 bg-red-50/50"
                              : "border-border"
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                {isActive && showLiveTrace ? (
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                  >
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                  </motion.div>
                                ) : hasError ? (
                                  <AlertCircle className="h-4 w-4 text-red-600" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                )}
                                <div>
                                  <div className="font-semibold text-sm">{trace.nodeName}</div>
                                  <div className="text-xs text-muted-foreground">{trace.nodeId}</div>
                                </div>
                              </div>
                              <Badge
                                variant={hasError ? "destructive" : "default"}
                                className="text-xs"
                              >
                                {trace.status}
                              </Badge>
                            </div>

                            {/* Live Trace Glow Effect */}
                            {isActive && showLiveTrace && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-primary/10 blur-xl pointer-events-none"
                              />
                            )}

                            {/* Data Flow */}
                            <div className="mt-3 pt-3 border-t border-border">
                              <div className="text-xs text-muted-foreground">
                                <strong>Data:</strong> {JSON.stringify(trace.data).slice(0, 50)}...
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                <strong>Time:</strong>{" "}
                                {trace.endTime
                                  ? `${((trace.endTime - trace.startTime) / 1000).toFixed(2)}s`
                                  : "Running..."}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* Reasoning Timeline */}
          <TabsContent value="timeline" className="flex-1 m-0 p-4 overflow-hidden">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {execution.traces.map((trace, index) => (
                  <div key={trace.nodeId} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            trace.status === "success"
                              ? "bg-green-500"
                              : trace.status === "error"
                              ? "bg-red-500 animate-pulse"
                              : "bg-blue-500"
                          }`}
                        />
                        {index < execution.traces.length - 1 && (
                          <div className="w-0.5 h-16 bg-border" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="font-semibold text-sm mb-1">{trace.nodeName}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          Step {index + 1} • AI Decision Point
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {trace.status === "success"
                            ? "✓ AI reasoned this path is optimal"
                            : trace.status === "error"
                            ? "✗ AI detected an error in reasoning"
                            : "AI is processing this decision..."}
                        </div>
                        {trace.data && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            <strong>Context:</strong> {JSON.stringify(trace.data).slice(0, 100)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Error Heatmap */}
          <TabsContent value="heatmap" className="flex-1 m-0 p-4 overflow-hidden">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Nodes with errors show red pulses. Intensity indicates error frequency.
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(errorHeatmap).map(([nodeId, count]) => (
                  <Card
                    key={nodeId}
                    className="border-red-200 bg-red-50/50 border-2"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-sm">{nodeId}</div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <Badge variant="destructive" className="text-xs">
                            {count} error{count !== 1 ? "s" : ""}
                          </Badge>
                        </motion.div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-red-200 overflow-hidden">
                        <motion.div
                          className="h-full bg-red-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(count * 20, 100)}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {Object.keys(errorHeatmap).length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No errors detected. Flow executed successfully!
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

