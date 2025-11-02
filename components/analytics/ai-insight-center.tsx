"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Brain,
  Sparkles,
  Volume2,
  VolumeX,
  MessageSquare,
  Send,
  ChevronDown,
  ChevronUp,
  Maximize2,
  BarChart3,
  Shield,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Insight {
  id: string
  type: "prediction" | "recommendation" | "alert" | "achievement"
  title: string
  description: string
  evidence?: string[]
  timestamp: string
  confidence?: number
}

const insights: Insight[] = [
  {
    id: "1",
    type: "prediction",
    title: "Growth Projection",
    description: "Based on your current learning pace, you're projected to reach 22 hours/week by Week 4.",
    evidence: ["Learning hours: +15% increase", "Consistency: 88% average", "Course completion: 92%"],
    timestamp: "2 hours ago",
    confidence: 92,
  },
  {
    id: "2",
    type: "recommendation",
    title: "Post Time Optimization",
    description: "Your LinkedIn posts perform 2.3x better when posted between 12-1 PM.",
    evidence: ["Engagement data: 150 vs 65 avg", "18 posts analyzed", "Best time: Weekdays 12 PM"],
    timestamp: "5 hours ago",
    confidence: 88,
  },
  {
    id: "3",
    type: "alert",
    title: "Automation Misfire",
    description: "GitHub sync automation failed due to expired token. Refresh OAuth in settings.",
    evidence: ["Last success: 2 days ago", "Error: Authentication token expired", "Impact: Low"],
    timestamp: "1 day ago",
    confidence: 100,
  },
  {
    id: "4",
    type: "achievement",
    title: "Milestone Reached",
    description: "Congratulations! You've completed 12 courses and maintained a 7-day learning streak.",
    evidence: ["Courses completed: 12", "Streak: 7 days", "Total hours: 48h"],
    timestamp: "2 days ago",
    confidence: 100,
  },
]

export function AIInsightCenter() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [query, setQuery] = useState("")
  const [contextualResponse, setContextualResponse] = useState<string | null>(null)

  const handleQuery = () => {
    if (!query.trim()) return

    // Simulate contextual AI response
    const lowerQuery = query.toLowerCase()
    let response = ""

    if (lowerQuery.includes("fail") || lowerQuery.includes("error")) {
      response = "I found 1 automation failure in the last 7 days:\n\n**GitHub Sync Automation**\n• Error: Authentication token expired\n• Date: 1 day ago\n• Solution: Refresh OAuth token in Settings → Integrations → GitHub\n\nWould you like me to fix this automatically?"
    } else if (lowerQuery.includes("growth") || lowerQuery.includes("predict")) {
      response = "Here's your growth projection:\n\n**Current Status:**\n• Learning hours: 12h/week\n• Courses: 12 completed\n• Streak: 7 days\n\n**AI Prediction:**\n• Week 4: 22h/week (projected)\n• Confidence: 92%\n• Based on: Consistent learning pattern, 88% completion rate"
    } else if (lowerQuery.includes("best time") || lowerQuery.includes("post time")) {
      response = "**Best Post Times (Based on Engagement Data):**\n\n1. **12-1 PM (Weekdays)** - 2.3x better engagement\n2. **6-7 PM (Weekdays)** - 1.8x better engagement\n3. **9-10 AM (Weekdays)** - 1.5x better engagement\n\n**Evidence:**\n• 18 posts analyzed\n• 150 avg engagement at 12 PM vs 65 avg\n• 10 posts at optimal time"
    } else {
      response = "I understand you're asking about: \"" + query + "\"\n\nI can help you analyze:\n• Automation failures\n• Growth predictions\n• Best posting times\n• Platform performance\n• Learning insights\n\nWhat would you like to explore?"
    }

    setContextualResponse(response)
    setQuery("")
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prediction":
        return <BarChart3 className="h-4 w-4 text-blue-600" />
      case "recommendation":
        return <Sparkles className="h-4 w-4 text-purple-600" />
      case "alert":
        return <Brain className="h-4 w-4 text-red-600" />
      case "achievement":
        return <Sparkles className="h-4 w-4 text-green-600" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "prediction":
        return "bg-blue-50 border-blue-200"
      case "recommendation":
        return "bg-purple-50 border-purple-200"
      case "alert":
        return "bg-red-50 border-red-200"
      case "achievement":
        return "bg-green-50 border-green-200"
      default:
        return "bg-muted border-border"
    }
  }

  return (
    <Card className="border-border shadow-sm sticky top-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">AI Insight Center 2.0</CardTitle>
              <CardDescription className="text-xs">
                Contextual AI mind for data insights and evidence
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? "Disable voice narration" : "Enable voice narration"}
            >
              {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="space-y-4">
          {/* Query-in-Context Mode */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Query-in-Context Mode</span>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask directly: 'What caused my automation to fail on Wednesday?'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleQuery()}
                className="flex-1 text-sm"
              />
              <Button size="icon" onClick={handleQuery}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contextual Response */}
          <AnimatePresence>
            {contextualResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-lg bg-primary/5 border border-primary/20"
              >
                <div className="flex items-start gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                  <div className="text-xs font-medium text-primary">AI Response</div>
                </div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {contextualResponse}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-xs"
                  onClick={() => setContextualResponse(null)}
                >
                  Clear
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Integration Confidence Score */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Integration Confidence Score</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { platform: "LinkedIn", confidence: 92, reliability: "High" },
                { platform: "GitHub", confidence: 88, reliability: "High" },
                { platform: "Coursera", confidence: 85, reliability: "Medium" },
                { platform: "Notion", confidence: 90, reliability: "High" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{item.platform}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.reliability}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-green-500"
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-primary w-12 text-right">
                      {item.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavior Insights */}
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold">Behavior Insights</span>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>You learn <strong className="text-foreground">1.3x faster</strong> in morning sessions (9-11 AM).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Your LinkedIn posts perform <strong className="text-foreground">2.3x better</strong> at 12 PM.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>GitHub commits are most frequent on <strong className="text-foreground">Wednesday afternoons</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Course completion rate is <strong className="text-foreground">15% higher</strong> for video courses.</span>
              </div>
            </div>
          </div>

          {/* Why AI Made This Prediction */}
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold">Why AI Made This Prediction</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Growth Projection (92% confidence)</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Analyzed: 12 weeks of learning data</div>
                  <div>• Pattern: Consistent 15% weekly growth</div>
                  <div>• Factor: 88% completion rate maintained</div>
                  <div>• Confidence: High (based on historical patterns)</div>
                </div>
              </div>
              <div className="pt-3 border-t border-border/50">
                <div className="text-xs font-medium text-muted-foreground mb-1">Evidence Breakdown:</div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center p-2 rounded bg-background">
                    <div className="font-semibold text-sm text-primary">12h</div>
                    <div className="text-xs text-muted-foreground">Current/week</div>
                  </div>
                  <div className="text-center p-2 rounded bg-background">
                    <div className="font-semibold text-sm text-primary">+15%</div>
                    <div className="text-xs text-muted-foreground">Growth rate</div>
                  </div>
                  <div className="text-center p-2 rounded bg-background">
                    <div className="font-semibold text-sm text-primary">88%</div>
                    <div className="text-xs text-muted-foreground">Completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Insights */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold">Real-Time Insights</span>
              {voiceEnabled && (
                <Badge variant="outline" className="text-xs gap-1">
                  <Volume2 className="h-3 w-3" />
                  Voice Enabled
                </Badge>
              )}
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-2 ${getTypeColor(insight.type)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(insight.type)}
                          <span className="text-sm font-semibold">{insight.title}</span>
                        </div>
                        {insight.confidence && (
                          <Badge variant="outline" className="text-xs">
                            {insight.confidence}% confidence
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{insight.description}</p>
                      {insight.evidence && (
                        <div className="pt-3 border-t border-border/50">
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            Evidence:
                          </div>
                          <ul className="space-y-1">
                            {insight.evidence.map((item, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-2">{insight.timestamp}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

