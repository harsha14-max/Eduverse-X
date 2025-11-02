"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Brain, Settings, Shield, BarChart3, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface QuickHelpContent {
  title: string
  description: string
  steps: Array<{ title: string; description: string; action?: string }>
  relatedTopics: string[]
}

const quickHelpContent: Record<string, QuickHelpContent> = {
  dashboard: {
    title: "AI Dashboard Help",
    description: "Learn how to navigate and use the AI dashboard features",
    steps: [
      {
        title: "Navigate Sections",
        description: "Use the sidebar to switch between Dashboard, Automation, Portfolio, and other sections",
      },
      {
        title: "AI Chat Console",
        description: "Click the chat icon to open AI assistance for quick help",
      },
      {
        title: "Search Functionality",
        description: "Use Cmd+K (Mac) or Ctrl+K (Windows) for global search",
      },
    ],
    relatedTopics: ["AI Features", "Navigation", "Search"],
  },
  automation: {
    title: "Automation Setup",
    description: "Set up and troubleshoot automation workflows",
    steps: [
      {
        title: "Create Workflow",
        description: "Go to Automation → Create New Workflow → Add nodes",
      },
      {
        title: "Connect Integrations",
        description: "Ensure all required integrations are connected in the Integration Panel",
      },
      {
        title: "Test Workflow",
        description: "Use the Test button to run a test execution before enabling",
      },
    ],
    relatedTopics: ["Workflows", "Integrations", "Testing"],
  },
  account: {
    title: "Account & Privacy",
    description: "Manage account settings and privacy controls",
    steps: [
      {
        title: "Update Profile",
        description: "Go to Account → Profile to update your information",
      },
      {
        title: "Privacy Settings",
        description: "Configure privacy settings in Account → Privacy",
      },
      {
        title: "Data Management",
        description: "View and manage your data in Account → Data",
      },
    ],
    relatedTopics: ["Profile", "Privacy", "Data"],
  },
  analytics: {
    title: "Analytics Issues",
    description: "Understand and fix analytics problems",
    steps: [
      {
        title: "View Analytics",
        description: "Go to Analytics → Dashboard to see your metrics",
      },
      {
        title: "Filter Data",
        description: "Use the filter options to view specific time ranges or categories",
      },
      {
        title: "Export Reports",
        description: "Click Export to download analytics reports",
      },
    ],
    relatedTopics: ["Metrics", "Reports", "Filtering"],
  },
  integration: {
    title: "Content Integration",
    description: "Connect and manage integrations",
    steps: [
      {
        title: "Add Integration",
        description: "Go to Automation → Integrations → Click Connect",
      },
      {
        title: "Authorize Access",
        description: "Complete OAuth flow to authorize the integration",
      },
      {
        title: "Test Connection",
        description: "Verify connection by running a test action",
      },
    ],
    relatedTopics: ["OAuth", "Connections", "Testing"],
  },
}

export function QuickHelpPanel({ categoryId, onClose }: { categoryId: string; onClose: () => void }) {
  const content = quickHelpContent[categoryId]

  if (!content) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{content.title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{content.description}</p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-4">
              {content.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-border">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                    {step.action && (
                      <Button variant="outline" size="sm" className="mt-2 gap-2 text-xs">
                        {step.action}
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Related Topics */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs font-semibold mb-2">Related Topics:</div>
            <div className="flex flex-wrap gap-2">
              {content.relatedTopics.map((topic) => (
                <Badge key={topic} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

