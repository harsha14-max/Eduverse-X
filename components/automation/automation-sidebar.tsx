"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Workflow,
  FileText,
  Plug,
  Brain,
  Users,
  Database,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIAutomationRecommendations } from "./ai-automation-recommendations"
import { RecentlyUsedApps } from "./recently-used-apps"
import { SmartFilterBar } from "./smart-filter-bar"
import { AIInsightSnippets } from "./ai-insight-snippets"
import { ReliabilityRing } from "./reliability-ring"

const navItems = [
  {
    id: "workflows",
    label: "Workflows",
    icon: Workflow,
    count: 12,
    items: [
      { id: "slack-bot", name: "Slack Summary Bot", status: "live", reliability: 95, insight: "insight" },
      { id: "github-sync", name: "GitHub Sync", status: "draft", reliability: 88, insight: "insight" },
      { id: "linkedin-poster", name: "LinkedIn Auto Poster", status: "live", reliability: 92, insight: "insight" },
      { id: "course-tracker", name: "Course Progress Tracker", status: "error", reliability: 65, insight: "insight" },
    ],
  },
  {
    id: "templates",
    label: "Templates",
    icon: FileText,
    count: 8,
    items: [
      { id: "social-post", name: "Social Media Post", status: "template" },
      { id: "data-sync", name: "Data Synchronization", status: "template" },
      { id: "ai-summary", name: "AI Content Summary", status: "template" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Plug,
    count: 15,
    items: [
      { id: "slack", name: "Slack", status: "connected" },
      { id: "github", name: "GitHub", status: "connected" },
      { id: "linkedin", name: "LinkedIn", status: "connected" },
      { id: "notion", name: "Notion", status: "disconnected" },
    ],
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    icon: Brain,
    count: 3,
    items: [
      { id: "claude", name: "Claude 3.5 Sonnet", status: "active" },
      { id: "gpt4", name: "GPT-4 Turbo", status: "active" },
      { id: "local", name: "Local Agent", status: "inactive" },
    ],
  },
  {
    id: "team-hub",
    label: "Team Hub",
    icon: Users,
    count: 5,
    items: [
      { id: "member1", name: "Alice Johnson", status: "online" },
      { id: "member2", name: "Bob Smith", status: "away" },
      { id: "member3", name: "Charlie Brown", status: "offline" },
    ],
  },
  {
    id: "data-vault",
    label: "Data Vault",
    icon: Database,
    count: 0,
    items: [],
  },
]

export function AutomationSidebar() {
  const [activeSection, setActiveSection] = useState<string | null>("workflows")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"workflows" | "recommendations">("workflows")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
      case "connected":
      case "active":
      case "online":
        return "bg-green-500"
      case "error":
      case "disconnected":
      case "inactive":
      case "offline":
        return "bg-gray-400"
      case "draft":
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full h-full flex flex-col"
    >
      {/* Search */}
      <div className="p-4 border-b border-border shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>
      </div>

      {/* Smart Filter Bar */}
      <SmartFilterBar />

      {/* Tabs for Workflows vs AI Recommendations */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full rounded-none border-b border-border shrink-0 mx-2 mt-2">
          <TabsTrigger value="workflows" className="flex-1 text-xs">Workflows</TabsTrigger>
          <TabsTrigger value="recommendations" className="flex-1 text-xs">AI Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="flex-1 m-0 overflow-hidden min-h-0">
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {navItems.map((item) => (
                <div key={item.id} className="space-y-1">
                  <Button
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className="w-full justify-between h-9"
                    onClick={() =>
                      setActiveSection(activeSection === item.id ? null : item.id)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {item.count}
                        </Badge>
                      )}
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          activeSection === item.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </Button>

                  {/* Sub-items */}
                  {activeSection === item.id && item.items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-6 space-y-1"
                    >
                      {item.items.map((subItem: any) => (
                        <div key={subItem.id} className="relative group">
                          <Button
                            variant="ghost"
                            className="w-full justify-between h-8 text-xs"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div
                                className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(subItem.status)}`}
                              />
                              <span className="truncate">{subItem.name}</span>
                            </div>
                            {subItem.reliability !== undefined && (
                              <ReliabilityRing reliability={subItem.reliability} size={20} className="shrink-0" />
                            )}
                          </Button>
                          {/* AI Insight on Hover */}
                          {subItem.insight && (
                            <div className="absolute left-full ml-2 top-0 hidden group-hover:block z-50">
                              <AIInsightSnippets workflowId={subItem.id} />
                            </div>
                          )}
                        </div>
                      ))}
                      {item.id === "workflows" && (
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-8 text-xs gap-2 text-primary"
                        >
                          <Plus className="h-3 w-3" />
                          <span>New Workflow</span>
                        </Button>
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Recently Used Apps */}
          <RecentlyUsedApps />
        </TabsContent>

        <TabsContent value="recommendations" className="flex-1 m-0 overflow-hidden min-h-0">
          <AIAutomationRecommendations />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
