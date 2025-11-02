"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Sparkles,
  Brain,
  Settings,
  Shield,
  BarChart3,
  MessageSquare,
  Zap,
  ArrowRight,
  HelpCircle,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AIHelpAssistant } from "./ai-help-assistant"
import { QuickHelpPanel } from "./quick-help-panel"

interface AISuggestion {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  solution: string[]
}

const aiSuggestions: AISuggestion[] = [
  {
    id: "1",
    title: "Having trouble connecting Instagram?",
    description: "Try these 3 steps to resolve connection issues",
    category: "Integration",
    tags: ["#login", "#automation", "#Instagram"],
    solution: [
      "Check if your OAuth token is valid",
      "Run a test connection in the integration panel",
      "If error persists, click to send logs",
    ],
  },
  {
    id: "2",
    title: "AI post generation not working?",
    description: "Common fixes for AI post generation issues",
    category: "AI Features",
    tags: ["#AIpost", "#automation"],
    solution: [
      "Verify API key is configured correctly",
      "Check if content generation limits are reached",
      "Review AI permissions in account settings",
    ],
  },
  {
    id: "3",
    title: "Automation workflow failing?",
    description: "Troubleshoot failed automation workflows",
    category: "Automation",
    tags: ["#automation", "#workflow"],
    solution: [
      "Check workflow execution logs",
      "Verify all integrations are connected",
      "Test each node individually",
    ],
  },
]

export function UnifiedSupportDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedQuickHelp, setSelectedQuickHelp] = useState<string | null>(null)

  const quickHelpCategories = [
    {
      id: "dashboard",
      label: "AI Dashboard Help",
      icon: Brain,
      description: "Learn how to use the AI dashboard features",
    },
    {
      id: "automation",
      label: "Automation Setup",
      icon: Settings,
      description: "Set up and troubleshoot automations",
    },
    {
      id: "account",
      label: "Account & Privacy",
      icon: Shield,
      description: "Manage account settings and privacy",
    },
    {
      id: "analytics",
      label: "Analytics Issues",
      icon: BarChart3,
      description: "Understand and fix analytics problems",
    },
    {
      id: "integration",
      label: "Content Integration",
      icon: MessageSquare,
      description: "Connect and manage integrations",
    },
  ]

  const filteredSuggestions = aiSuggestions.filter((suggestion) => {
    const matchesSearch =
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === null || suggestion.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Top Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Ask AI for help...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for help... Use tags like #login, #automation, #AIpost"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchQuery && (
            <div className="mt-3 flex flex-wrap gap-2">
              {["#login", "#automation", "#AIpost", "#integration", "#dashboard"].map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSearchQuery(tag.replace("#", ""))}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Help Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Help</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickHelpCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={selectedQuickHelp === category.id ? "default" : "outline"}
                    className="w-full h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setSelectedQuickHelp(category.id)}
                  >
                    <Icon className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-semibold text-sm">{category.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {category.description}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Help Panel */}
      {selectedQuickHelp && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <QuickHelpPanel categoryId={selectedQuickHelp} onClose={() => setSelectedQuickHelp(null)} />
        </motion.div>
      )}

      {/* AI Support Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Support Feed
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Real-time Suggestions
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {filteredSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border hover:border-primary transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm">{suggestion.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {suggestion.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {suggestion.description}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-2 text-xs">
                            View Solution
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {suggestion.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Solution Steps Preview */}
                        <div className="pt-2 border-t border-border">
                          <div className="text-xs font-semibold mb-2">Quick Steps:</div>
                          <div className="space-y-1">
                            {suggestion.solution.slice(0, 2).map((step, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                <span>{step}</span>
                              </div>
                            ))}
                            {suggestion.solution.length > 2 && (
                              <div className="text-xs text-muted-foreground italic">
                                +{suggestion.solution.length - 2} more steps...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* AI Help Assistant */}
      <AIHelpAssistant />
    </div>
  )
}

