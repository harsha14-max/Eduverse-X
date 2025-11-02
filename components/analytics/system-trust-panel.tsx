"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Database,
  Brain,
  Eye,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Info
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const trustScoreData = [
  { date: "Week 1", accuracy: 85, misfires: 5, success: 90 },
  { date: "Week 2", accuracy: 88, misfires: 3, success: 93 },
  { date: "Week 3", accuracy: 92, misfires: 2, success: 96 },
  { date: "Week 4", accuracy: 94, misfires: 1, success: 98 },
]

const dataFlowData = [
  { name: "IPFS", value: 65, color: "#10b981" },
  { name: "Supabase", value: 25, color: "#3b82f6" },
  { name: "Frontend Cache", value: 10, color: "#f59e0b" },
]

const modelVersions = [
  { version: "Claude 3.5 Sonnet", insights: 45, date: "2025-01-15" },
  { version: "GPT-4 Turbo", insights: 32, date: "2025-01-10" },
  { version: "Claude 3 Opus", insights: 28, date: "2025-01-05" },
]

const COLORS = ["#10b981", "#3b82f6", "#f59e0b"]

export function SystemTrustPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showTransparency, setShowTransparency] = useState(false)

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">System & Trust Layer</CardTitle>
              <CardDescription className="text-xs">
                AI Trust Score, data flow tracker, model versions, and transparency
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
        <CardContent className="space-y-6">
          {/* AI Trust Score Graph */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              AI Trust Score Graph
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Visualizes accuracy, misfires, and success rates of AI-driven automations
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trustScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                    name="Accuracy %"
                  />
                  <Area
                    type="monotone"
                    dataKey="success"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.2}
                    name="Success %"
                  />
                  <Line
                    type="monotone"
                    dataKey="misfires"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", r: 4 }}
                    name="Misfires"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex-1 p-3 rounded-lg bg-green-50">
                <div className="font-semibold text-green-700">94%</div>
                <div className="text-xs text-muted-foreground">Current Accuracy</div>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-blue-50">
                <div className="font-semibold text-blue-700">98%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-red-50">
                <div className="font-semibold text-red-700">1</div>
                <div className="text-xs text-muted-foreground">Misfires (Low)</div>
              </div>
            </div>
          </div>

          {/* Decentralized Data Tracker */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Database className="h-4 w-4 text-green-600" />
              Decentralized Data Tracker
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Displays data flow routes between IPFS, Supabase, and frontend cache
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataFlowData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataFlowData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground">IPFS (Decentralized)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-muted-foreground">Supabase (Cache)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-muted-foreground">Frontend Cache</span>
              </div>
            </div>
          </div>

          {/* Model Version Timeline */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-green-600" />
              Model Version Timeline
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Shows which AI model version generated which insights
            </p>
            <div className="space-y-3">
              {modelVersions.map((model, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold text-sm">{model.version}</div>
                        <div className="text-xs text-muted-foreground">{model.date}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {model.insights} insights
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Ethical Impact Summary */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-600" />
              Ethical Impact Summary
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              AI summarizes how your data was used and when
            </p>
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Last 7 Days:</div>
                    <div className="text-sm space-y-1">
                      <div>• <strong>12 AI insights</strong> generated from learning data</div>
                      <div>• <strong>5 automations</strong> executed using GitHub/LinkedIn data</div>
                      <div>• <strong>8 recommendations</strong> based on social engagement patterns</div>
                      <div>• <strong>0 data exports</strong> - All data remains encrypted on IPFS</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Data Privacy:</div>
                    <div className="text-sm space-y-1">
                      <div>• All data encrypted before storage</div>
                      <div>• Only metadata stored in Supabase (temporary cache)</div>
                      <div>• Full audit log available in Data Privacy panel</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transparency Panel */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-600" />
              Transparency Panel
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Click to see full AI decision path
            </p>
            <Dialog open={showTransparency} onOpenChange={setShowTransparency}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Info className="h-4 w-4" />
                  View AI Decision Path
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>AI Decision Transparency</DialogTitle>
                  <DialogDescription>
                    Full AI decision path for transparency
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Step 1: User Prompt</div>
                      <div className="text-sm">"Create LinkedIn post about my progress"</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-0.5 h-8 bg-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Step 2: AI Interpretation</div>
                      <div className="text-sm">Action: social_post.create</div>
                      <div className="text-xs text-muted-foreground mt-1">Model: Claude 3.5 Sonnet | Confidence: 92%</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-0.5 h-8 bg-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Step 3: n8n Workflow</div>
                      <div className="text-sm">Execute: LinkedIn API workflow</div>
                      <div className="text-xs text-muted-foreground mt-1">Workflow ID: wf_12345</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-0.5 h-8 bg-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Step 4: Result</div>
                      <div className="text-sm">✅ Post Published Successfully!</div>
                      <div className="text-xs text-muted-foreground mt-1">Post ID: 67890 | Time: 2025-01-15 14:30:00</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Metadata:</div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>• Data Source: Learning progress, GitHub commits</div>
                      <div>• AI Model: Claude 3.5 Sonnet v1.0</div>
                      <div>• Execution Time: 2.3s</div>
                      <div>• Data Access: Read-only (learning data)</div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

