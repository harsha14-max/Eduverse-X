"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Search,
  Sparkles,
  Users,
  TrendingUp,
  Eye,
  Download,
  Star,
  Heart,
  Zap,
  Play,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableSection } from "./resizable-section"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const templates = [
  {
    id: "slack-summary",
    name: "Slack Daily Summary Bot",
    description: "Automatically generates and posts daily team summaries to Slack",
    category: "Communication",
    popularity: 95,
    aiRelevance: 92,
    uses: 1240,
    collaborative: true,
    author: "AI Curated",
    preview: {
      nodes: 4,
      triggers: ["Daily at 9 AM"],
      actions: ["Slack Post", "AI Summary"],
    },
    aiSuggestion: "Based on your recent Slack workflow, try this email automation",
  },
  {
    id: "linkedin-poster",
    name: "LinkedIn Auto Poster",
    description: "AI generates and schedules LinkedIn posts based on your learning progress",
    category: "Social Media",
    popularity: 88,
    aiRelevance: 95,
    uses: 892,
    collaborative: false,
    author: "Community",
    preview: {
      nodes: 5,
      triggers: ["Course Completed"],
      actions: ["AI Post Generation", "LinkedIn Publish"],
    },
  },
  {
    id: "github-sync",
    name: "GitHub Repository Sync",
    description: "Syncs GitHub commits and automatically updates portfolio",
    category: "Development",
    popularity: 82,
    aiRelevance: 85,
    uses: 654,
    collaborative: true,
    author: "AI Curated",
    preview: {
      nodes: 3,
      triggers: ["New Commit"],
      actions: ["Portfolio Update", "Analytics Sync"],
    },
  },
  {
    id: "course-tracker",
    name: "Course Progress Tracker",
    description: "Tracks learning progress across multiple platforms and generates reports",
    category: "Learning",
    popularity: 90,
    aiRelevance: 88,
    uses: 1105,
    collaborative: false,
    author: "AI Curated",
    preview: {
      nodes: 6,
      triggers: ["Course Update"],
      actions: ["Progress Analysis", "Report Generation"],
    },
  },
  {
    id: "notion-sync",
    name: "Notion Knowledge Base Sync",
    description: "Automatically syncs learning notes to Notion knowledge base",
    category: "Productivity",
    popularity: 75,
    aiRelevance: 80,
    uses: 432,
    collaborative: true,
    author: "Community",
    preview: {
      nodes: 4,
      triggers: ["Note Created"],
      actions: ["Notion Update", "AI Enhancement"],
    },
  },
  {
    id: "social-scheduler",
    name: "Multi-Platform Social Scheduler",
    description: "AI-powered content scheduling across LinkedIn, Twitter, and Instagram",
    category: "Social Media",
    popularity: 92,
    aiRelevance: 96,
    uses: 1456,
    collaborative: false,
    author: "AI Curated",
    preview: {
      nodes: 7,
      triggers: ["Content Ready"],
      actions: ["AI Optimization", "Multi-Platform Post"],
    },
    aiSuggestion: "Based on your recent social workflow, try this content calendar automation",
    portfolioLinked: true,
    estimatedImpact: "High",
    connectedApps: ["LinkedIn", "Twitter", "Instagram", "AI"],
    learningValue: "Advanced",
  },
]

// Add portfolioLinked, estimatedImpact, connectedApps, learningValue to all templates
templates.forEach((template: any) => {
  if (!template.portfolioLinked) {
    template.portfolioLinked = template.category === "Development" || template.id === "github-sync"
  }
  if (!template.estimatedImpact) {
    template.estimatedImpact = template.popularity > 85 ? "High" : template.popularity > 70 ? "Medium" : "Low"
  }
  if (!template.connectedApps) {
    template.connectedApps = template.category === "Social Media" ? ["LinkedIn", "Twitter"] :
                              template.category === "Communication" ? ["Slack"] :
                              template.category === "Development" ? ["GitHub"] :
                              ["AI", "API"]
  }
  if (!template.learningValue) {
    template.learningValue = template.preview.nodes > 5 ? "Advanced" : template.preview.nodes > 3 ? "Intermediate" : "Beginner"
  }
})

export function TemplateGallery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showLivePreview, setShowLivePreview] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"ai-suggested" | "popular" | "portfolio" | "growth">("ai-suggested")

  const filteredTemplates = templates.filter(
    (template) => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesTab = activeTab === "ai-suggested" ? template.aiSuggestion !== undefined :
                         activeTab === "popular" ? template.uses > 800 :
                         activeTab === "portfolio" ? template.portfolioLinked :
                         activeTab === "growth" ? template.estimatedImpact === "High" :
                         true
      
      return matchesSearch && matchesTab
    }
  )

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    // Sort by tab-specific criteria
    if (activeTab === "popular") {
      return b.uses - a.uses
    } else if (activeTab === "ai-suggested") {
      return (b.aiRelevance + b.popularity) - (a.aiRelevance + a.popularity)
    } else if (activeTab === "growth") {
      return b.popularity - a.popularity
    }
    // Default: AI relevance and popularity
    return (b.aiRelevance + b.popularity) - (a.aiRelevance + a.popularity)
  })

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId)
    // In production, this would open the template in the canvas with highlighted learning value
    console.log(`Opening template ${templateId} in canvas`)
  }

  return (
    <Card className="h-full border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">Template Gallery</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs gap-1">
            <Sparkles className="h-3 w-3" />
            AI-Curated
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>

      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 shrink-0 mx-4 mt-2">
            <TabsTrigger value="ai-suggested" className="text-xs">AI Suggested</TabsTrigger>
            <TabsTrigger value="popular" className="text-xs">Most Used</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">Portfolio</TabsTrigger>
            <TabsTrigger value="growth" className="text-xs">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="flex-1 mt-4 overflow-y-auto min-h-0">
            <ScrollArea className="h-[600px]">
              <div className="p-4 space-y-4">
            {sortedTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setShowLivePreview(template.id)}
                onMouseLeave={() => setShowLivePreview(null)}
              >
                <Card
                  className={`border-2 transition-all cursor-pointer ${
                    selectedTemplate === template.id
                      ? "border-primary shadow-lg"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleTemplateClick(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{template.name}</h3>
                          {template.collaborative && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <Users className="h-3 w-3" />
                              Collaborative
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            AI Curated
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {template.description}
                        </p>
                      </div>
                      {template.aiSuggestion && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-300">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    {/* Preview Stats */}
                    <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>{template.preview.nodes} nodes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        <span>{template.preview.triggers.length} trigger{template.preview.triggers.length !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{template.uses} uses</span>
                      </div>
                    </div>

                    {/* Rankings */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">Popularity</div>
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${template.popularity}%` }}
                            transition={{ delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">AI Relevance</div>
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className="h-full bg-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${template.aiRelevance}%` }}
                            transition={{ delay: index * 0.1 + 0.1 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Connected Apps & Impact */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {(template as any).connectedApps?.map((app: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs gap-1">
                          <Zap className="h-3 w-3 text-primary" />
                          {app}
                        </Badge>
                      ))}
                      {(template as any).estimatedImpact && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            (template as any).estimatedImpact === "High" ? "bg-green-50 text-green-700 border-green-300" :
                            (template as any).estimatedImpact === "Medium" ? "bg-yellow-50 text-yellow-700 border-yellow-300" :
                            "bg-gray-50 text-gray-700 border-gray-300"
                          }`}
                        >
                          {(template as any).estimatedImpact} Impact
                        </Badge>
                      )}
                      {(template as any).learningValue && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                          {(template as any).learningValue} Learning
                        </Badge>
                      )}
                    </div>

                    {/* Live Preview on Hover */}
                    <AnimatePresence>
                      {showLivePreview === template.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-border"
                        >
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            Live Preview:
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="flex-1 p-2 rounded bg-muted/50">
                              <div className="font-medium mb-1">Triggers:</div>
                              <div className="text-muted-foreground">
                                {template.preview.triggers.join(", ")}
                              </div>
                            </div>
                            <div className="flex-1 p-2 rounded bg-muted/50">
                              <div className="font-medium mb-1">Actions:</div>
                              <div className="text-muted-foreground">
                                {template.preview.actions.join(", ")}
                              </div>
                            </div>
                          </div>
                          {(template as any).estimatedImpact && (
                            <div className="mt-2 p-2 rounded bg-primary/5 border border-primary/20 text-xs">
                              <div className="font-medium text-primary mb-1">Estimated Impact:</div>
                              <div className="text-muted-foreground">
                                This automation can save approximately {(template as any).estimatedImpact === "High" ? "15-20" : (template as any).estimatedImpact === "Medium" ? "5-10" : "1-5"} hours per week
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="default" size="sm" className="flex-1 gap-2">
                        <Download className="h-3 w-3" />
                        Use Template
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px]">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                            <DialogDescription>{template.description}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm font-medium mb-2">Preview Flow</div>
                              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>Trigger:</span>
                                  <Badge variant="outline">{template.preview.triggers[0]}</Badge>
                                  <span className="mx-2">→</span>
                                  {template.preview.actions.map((action, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <Badge variant="outline">{action}</Badge>
                                      {i < template.preview.actions.length - 1 && (
                                        <span>→</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="pt-4 border-t border-border">
                              <div className="text-sm font-medium mb-2">Author</div>
                              <div className="text-xs text-muted-foreground">{template.author}</div>
                            </div>
                            <Button className="w-full gap-2">
                              <Download className="h-4 w-4" />
                              Use This Template
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

