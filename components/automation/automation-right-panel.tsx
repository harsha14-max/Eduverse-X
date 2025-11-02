"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AICopilotEnhancements } from "./ai-copilot-enhancements"

export function AutomationRightPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("mind")

  if (isCollapsed) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 border-l border-border"
        onClick={() => setIsCollapsed(false)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full h-full border-l border-border bg-background/95 backdrop-blur flex flex-col min-h-0 overflow-hidden"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border shrink-0 min-w-0">
        <h3 className="text-sm font-semibold truncate">AI Panel</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsCollapsed(true)}
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <TabsList className="w-full rounded-none border-b border-border shrink-0 flex-nowrap overflow-hidden">
          <TabsTrigger value="mind" className="flex-1 text-xs min-w-0 px-1.5 truncate">
            <Brain className="h-3 w-3 mr-1 shrink-0" />
            <span className="truncate">Mind</span>
          </TabsTrigger>
          <TabsTrigger value="copilot" className="flex-1 text-xs min-w-0 px-1.5 truncate">
            <Sparkles className="h-3 w-3 mr-1 shrink-0" />
            <span className="truncate">Copilot</span>
          </TabsTrigger>
          <TabsTrigger value="debug" className="flex-1 text-xs min-w-0 px-1.5 truncate">
            <FileText className="h-3 w-3 mr-1 shrink-0" />
            <span className="truncate">Debug</span>
          </TabsTrigger>
          <TabsTrigger value="collaborators" className="flex-1 text-xs min-w-0 px-1.5 truncate">
            <Users className="h-3 w-3 mr-1 shrink-0" />
            <span className="truncate">Team</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Mind View */}
        <TabsContent value="mind" className="flex-1 m-0 p-4 overflow-auto min-h-0">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Visual Reasoning Tree</h4>
                <Card className="border-border">
                  <CardContent className="p-4 space-y-3">
                    {/* Reasoning Tree */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium break-words">Step 1: User Prompt</div>
                            <div className="text-xs text-muted-foreground mt-1 break-words">
                              "Create LinkedIn post about my progress"
                            </div>
                          </div>
                      </div>
                      <div className="ml-2 border-l-2 border-primary pl-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium break-words">Step 2: AI Interpretation</div>
                            <div className="text-xs text-muted-foreground mt-1 break-words">
                              Action: social_post.create
                            </div>
                            <Badge variant="outline" className="text-xs mt-1">
                              Confidence: 92%
                            </Badge>
                          </div>
                        </div>
                        <div className="ml-2 border-l-2 border-blue-500 pl-3 space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium break-words">Step 3: Content Generation</div>
                              <div className="text-xs text-muted-foreground mt-1 break-words">
                                Generated post draft using learning data
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium break-words">Step 4: Approval Check</div>
                              <div className="text-xs text-muted-foreground mt-1 break-words">
                                Decision: Approved (AI confidence high)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights */}
              <div>
                <h4 className="text-sm font-semibold mb-2">AI Insights</h4>
                <Card className="border-primary/50 bg-primary/5">
                  <CardContent className="p-3">
                    <div className="text-xs text-muted-foreground break-words">
                      <strong>Why this path?</strong> Based on historical patterns, LinkedIn posts
                      about learning progress perform 2.3x better when posted at 12 PM on weekdays.
                      The AI selected this optimal timing.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* AI Copilot */}
        <TabsContent value="copilot" className="flex-1 m-0 overflow-hidden min-h-0">
          <AICopilotEnhancements />
        </TabsContent>

        {/* Debug & Logs */}
        <TabsContent value="debug" className="flex-1 m-0 p-4 overflow-auto min-h-0">
          <ScrollArea className="h-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">Execution Logs</h4>
                <Button variant="outline" size="sm" className="gap-2">
                  <Play className="h-3 w-3" />
                  Replay
                </Button>
              </div>

              {/* Execution Log Items with Sentiment Indicators */}
              {[
                {
                  id: "1",
                  step: "AI Prompt Node",
                  status: "success",
                  time: "14:30:15",
                  message: "Prompt received: 'Create LinkedIn post'",
                  sentiment: "stable" as const,
                },
                {
                  id: "2",
                  step: "AI Reasoning Node",
                  status: "success",
                  time: "14:30:18",
                  message: "Content analyzed and generated",
                  sentiment: "stable" as const,
                },
                {
                  id: "3",
                  step: "AI Decision Node",
                  status: "success",
                  time: "14:30:20",
                  message: "Decision: Approved for posting",
                  sentiment: "flaky" as const,
                },
                {
                  id: "4",
                  step: "LinkedIn Post Action",
                  status: "success",
                  time: "14:30:22",
                  message: "Post published successfully",
                  sentiment: "stable" as const,
                },
              ].map((log) => {
                const getSentimentColor = () => {
                  switch (log.sentiment) {
                    case "stable":
                      return "border-green-300 bg-green-50/50"
                    case "flaky":
                      return "border-orange-300 bg-orange-50/50"
                    default:
                      return "border-red-300 bg-red-50/50"
                  }
                }

                const getSentimentBadge = () => {
                  switch (log.sentiment) {
                    case "stable":
                      return <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">Stable</Badge>
                    case "flaky":
                      return <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-300">Flaky</Badge>
                    default:
                      return <Badge variant="outline" className="text-xs bg-red-100 text-red-700 border-red-300">Failed</Badge>
                  }
                }

                return (
                  <Card key={log.id} className={`border ${getSentimentColor()}`}>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {log.status === "success" ? (
                            <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-red-600 shrink-0" />
                          )}
                          <span className="text-xs font-medium truncate">{log.step}</span>
                          {getSentimentBadge()}
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">{log.time}</span>
                      </div>
                      <div className="text-xs text-muted-foreground ml-5 break-words">{log.message}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Collaborators */}
        <TabsContent value="collaborators" className="flex-1 m-0 p-4 overflow-auto min-h-0">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {/* Active Collaborators */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Active Collaborators</h4>
                <div className="space-y-2">
                  {[
                    { name: "Alice Johnson", role: "Editor", status: "online", avatar: "AJ" },
                    { name: "Bob Smith", role: "Viewer", status: "online", avatar: "BS" },
                    { name: "Charlie Brown", role: "Editor", status: "away", avatar: "CB" },
                  ].map((collab, index) => (
                    <Card key={index} className="border-border">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{collab.avatar}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                                collab.status === "online"
                                  ? "bg-green-500"
                                  : collab.status === "away"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium break-words">{collab.name}</div>
                            <div className="text-xs text-muted-foreground break-words">{collab.role}</div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {collab.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Comments</h4>
                <div className="space-y-2">
                  <Card className="border-border">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium break-words">Alice Johnson</div>
                          <div className="text-xs text-muted-foreground mt-1 break-words">
                            "Should we add error handling for API failures?"
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Add Comment */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 text-xs"
                />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

