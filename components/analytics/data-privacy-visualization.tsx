"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Lock,
  Database,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Link2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const dataOriginFlow = [
  { step: "Data Source", location: "Coursera API", encrypted: false },
  { step: "Encryption", location: "Client-side (Web Crypto)", encrypted: true },
  { step: "Storage", location: "IPFS (CID: QmXyZ...)", encrypted: true },
  { step: "Access", location: "Frontend via DID", encrypted: true },
]

const accessLog = [
  { timestamp: "2025-01-15 14:30:00", service: "AI Insight", accessType: "Read", dataType: "Learning progress", encrypted: true },
  { timestamp: "2025-01-15 12:15:00", service: "Social Manager", accessType: "Read", dataType: "Post history", encrypted: true },
  { timestamp: "2025-01-15 10:00:00", service: "Analytics", accessType: "Read", dataType: "Engagement metrics", encrypted: true },
  { timestamp: "2025-01-14 18:45:00", service: "Automation", accessType: "Write", dataType: "Workflow config", encrypted: true },
]

export function DataPrivacyVisualization() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [publicVisibility, setPublicVisibility] = useState(false)
  const [showDetails, setShowDetails] = useState<string | null>(null)

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Data Privacy Visualization</CardTitle>
              <CardDescription className="text-xs">
                Data origin map, access ledger, and visibility controls
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
          {/* Data Origin Map */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-600" />
              Data Origin Map
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Interactive diagram tracing data source → encryption → IPFS CID
            </p>
            <div className="space-y-3">
              {dataOriginFlow.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className={`border-2 ${step.encrypted ? "border-green-500/50 bg-green-50/50" : "border-border"}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {step.encrypted ? (
                            <Lock className="h-4 w-4 text-green-600" />
                          ) : (
                            <Database className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div>
                            <div className="font-semibold text-sm">{step.step}</div>
                            <div className="text-xs text-muted-foreground">{step.location}</div>
                          </div>
                        </div>
                        {step.encrypted && (
                          <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                            Encrypted
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  {index < dataOriginFlow.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <div className="text-xs font-medium text-primary mb-1">Data Provenance Chain</div>
                  <div className="text-xs text-muted-foreground">
                    Your data is encrypted before storage and only accessible via your decentralized identity (DID).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Access Ledger Viewer */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              Access Ledger Viewer
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              On-chain log showing when and where data was accessed
            </p>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {accessLog.map((log, index) => (
                <Card
                  key={index}
                  className="border-border cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => setShowDetails(showDetails === index.toString() ? null : index.toString())}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{log.service}</span>
                          <Badge
                            variant={log.accessType === "Read" ? "outline" : "default"}
                            className="text-xs"
                          >
                            {log.accessType}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{log.dataType}</div>
                        <div className="text-xs text-muted-foreground mt-1">{log.timestamp}</div>
                      </div>
                      {log.encrypted && (
                        <Lock className="h-3 w-3 text-green-600" />
                      )}
                    </div>
                    {showDetails === index.toString() && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-border space-y-2"
                      >
                        <div className="text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Data Source:</span>
                            <span className="font-medium">{log.dataType}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Access Method:</span>
                            <span className="font-medium">DID Authentication</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Encryption:</span>
                            <span className="font-medium text-green-600">Active</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* User-Controlled Visibility Switch */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              Public Profile Visibility
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Toggle analytics visibility for public profile sharing
            </p>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {publicVisibility ? (
                      <Eye className="h-5 w-5 text-primary" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <div className="font-semibold text-sm">
                        {publicVisibility ? "Analytics Visible" : "Analytics Private"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {publicVisibility
                          ? "Your analytics are visible on your public profile"
                          : "Your analytics are private and not shared publicly"}
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={publicVisibility}
                    onCheckedChange={setPublicVisibility}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Transparency Log */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              AI Transparency Log
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Every insight generated includes metadata (time, data source, AI version)
            </p>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {[
                {
                  insight: "Growth Projection",
                  timestamp: "2025-01-15 14:30:00",
                  dataSource: "Learning progress, GitHub commits",
                  aiVersion: "Claude 3.5 Sonnet v1.0",
                  confidence: 92,
                },
                {
                  insight: "Post Time Optimization",
                  timestamp: "2025-01-15 12:15:00",
                  dataSource: "LinkedIn engagement data",
                  aiVersion: "GPT-4 Turbo v1.2",
                  confidence: 88,
                },
                {
                  insight: "Automation Misfire Alert",
                  timestamp: "2025-01-15 10:00:00",
                  dataSource: "GitHub API logs",
                  aiVersion: "Claude 3.5 Sonnet v1.0",
                  confidence: 100,
                },
              ].map((log, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-1">{log.insight}</div>
                        <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {log.confidence}%
                      </Badge>
                    </div>
                    <div className="space-y-1 mt-2 pt-2 border-t border-border/50">
                      <div className="text-xs text-muted-foreground">
                        <strong>Data Source:</strong> {log.dataSource}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong>AI Model:</strong> {log.aiVersion}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Visual Indicators */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-xs flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-muted-foreground">Active Decentralized Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-muted-foreground">Temporary Centralized Cache</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Encrypted Storage</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

