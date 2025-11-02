"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Sparkles,
  Users,
  Star,
  Copy,
  Eye,
  Download,
  Heart,
  Zap,
  Search,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CommunityTemplate {
  id: string
  name: string
  description: string
  author: string
  category: string
  uses: number
  likes: number
  rating: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tech: string[]
  trending: boolean
  portfolioLinked?: boolean
}

const communityTemplates: CommunityTemplate[] = [
  {
    id: "1",
    name: "LinkedIn Auto Poster Pro",
    description: "Advanced LinkedIn posting with AI-generated content and optimal timing",
    author: "Sarah K.",
    category: "Social Media",
    uses: 3240,
    likes: 892,
    rating: 4.9,
    difficulty: "Intermediate",
    tech: ["LinkedIn API", "AI", "Scheduling"],
    trending: true,
    portfolioLinked: true,
  },
  {
    id: "2",
    name: "GitHub to Portfolio Sync",
    description: "Automatically sync GitHub projects to your portfolio",
    author: "Mike T.",
    category: "Development",
    uses: 2156,
    likes: 654,
    rating: 4.8,
    difficulty: "Beginner",
    tech: ["GitHub", "REST API"],
    trending: true,
  },
  {
    id: "3",
    name: "Daily Learning Tracker AI",
    description: "AI-powered learning progress tracking across platforms",
    author: "Riya P.",
    category: "Learning",
    uses: 1892,
    likes: 523,
    rating: 4.7,
    difficulty: "Advanced",
    tech: ["AI", "ML", "Analytics"],
    trending: false,
    portfolioLinked: true,
  },
  {
    id: "4",
    name: "Slack Daily Digest Bot",
    description: "Generate and post daily team summaries to Slack",
    author: "Tom L.",
    category: "Communication",
    uses: 1456,
    likes: 432,
    rating: 4.6,
    difficulty: "Intermediate",
    tech: ["Slack API", "AI"],
    trending: false,
  },
]

export function CommunityAutomationShowcase() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"trending" | "popular" | "portfolio" | "growth">("trending")

  const filteredTemplates = communityTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTab = activeTab === "trending" ? template.trending :
                      activeTab === "popular" ? template.uses > 2000 :
                      activeTab === "portfolio" ? template.portfolioLinked :
                      activeTab === "growth" ? template.category === "Social Media" || template.category === "Development" :
                      true
    
    return matchesSearch && matchesTab
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <Card className="border-border h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full min-h-0">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div className="text-sm font-semibold">Community Showcase</div>
            <Badge variant="outline" className="text-xs">Discover</Badge>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4 shrink-0">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search community templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-4 shrink-0">
            <TabsTrigger value="trending" className="text-xs">Trending</TabsTrigger>
            <TabsTrigger value="popular" className="text-xs">Popular</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">Portfolio</TabsTrigger>
            <TabsTrigger value="growth" className="text-xs">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="flex-1 mt-4 overflow-y-auto min-h-0">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-border cursor-pointer hover:border-primary transition-all group">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="text-sm font-semibold truncate">{template.name}</div>
                                {template.trending && (
                                  <Badge variant="outline" className="text-xs gap-1 bg-primary/10 border-primary/20">
                                    <TrendingUp className="h-3 w-3 text-primary" />
                                    Trending
                                  </Badge>
                                )}
                                {template.portfolioLinked && (
                                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                                    Portfolio
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground mb-2">{template.description}</div>
                            </div>
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{template.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>{template.uses.toLocaleString()} uses</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                              <span>{template.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{template.rating}</span>
                            </div>
                            <Badge variant="outline" className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
                              {template.difficulty}
                            </Badge>
                          </div>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {template.tech.map((tech, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2 border-t border-border">
                            <Button variant="default" size="sm" className="flex-1 gap-2 text-xs">
                              <Copy className="h-3 w-3" />
                              Clone Template
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 text-xs">
                              <Eye className="h-3 w-3" />
                              Preview
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2 text-xs">
                              <Heart className="h-3 w-3" />
                            </Button>
                          </div>
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

