"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  TrendingUp,
  Star,
  Download,
  Heart,
  Eye,
  Search,
  MessageSquare,
  Zap,
  Users,
  Award,
  ArrowRight,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AIDiscoveryAssistant } from "./ai-discovery-assistant"
import { SocialGrowthPacks } from "./social-growth-packs"

interface MarketplaceTemplate {
  id: string
  name: string
  description: string
  category: string
  creator: string
  creatorAvatar?: string
  rating: number
  installs: number
  price: "Free" | string
  thumbnail?: string
  trending: boolean
  verified: boolean
}

const trendingTemplates: MarketplaceTemplate[] = [
  {
    id: "1",
    name: "AI Essay Summarizer for Notion",
    description: "Automatically summarizes essays and articles directly in Notion",
    category: "Productivity",
    creator: "Sara Johnson",
    rating: 4.8,
    installs: 2300,
    price: "Free",
    trending: true,
    verified: true,
  },
  {
    id: "2",
    name: "Social Media Growth Pack",
    description: "LinkedIn Post Generator + Auto Portfolio Updater + AI Brand Voice Assistant",
    category: "Growth & Presence",
    creator: "Mike Chen",
    rating: 4.9,
    installs: 1850,
    price: "₹499",
    trending: true,
    verified: true,
  },
  {
    id: "3",
    name: "Quiz Automation Pack",
    description: "Auto-generates quizzes from study notes and posts to Telegram",
    category: "Education",
    creator: "Riya Patel",
    rating: 4.7,
    installs: 1420,
    price: "Free",
    trending: false,
    verified: true,
  },
  {
    id: "4",
    name: "AI Note Summarizer",
    description: "Converts PDF notes into concise summaries with AI",
    category: "Learning",
    creator: "Alex Kim",
    rating: 4.6,
    installs: 980,
    price: "Free",
    trending: false,
    verified: true,
  },
]

const recommendedTemplates: MarketplaceTemplate[] = [
  {
    id: "5",
    name: "LinkedIn Post Generator",
    description: "AI generates LinkedIn posts based on your learning progress",
    category: "Social Media",
    creator: "AI Curated",
    rating: 4.9,
    installs: 3200,
    price: "Free",
    trending: true,
    verified: true,
  },
  {
    id: "6",
    name: "Auto Portfolio Updater",
    description: "Automatically updates portfolio when you complete projects",
    category: "Portfolio",
    creator: "Community",
    rating: 4.5,
    installs: 1250,
    price: "Free",
    trending: false,
    verified: false,
  },
]

export function MarketplaceHome() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["All", "Growth & Presence", "Education", "Productivity", "Social Media", "Learning"]

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-border shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <Badge variant="default" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Top AI Templates of the Week
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Boost Your Study Routine with 5 Smart Notion Automations
                </h2>
                <p className="text-muted-foreground mb-4">
                  Discover AI-powered workflows that transform your learning and productivity
                </p>
                <div className="flex items-center gap-4">
                  <Button className="gap-2">
                    Explore Templates
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Award className="h-4 w-4" />
                    Top Creators
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search & Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for automations, templates, or workflows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <ScrollArea className="flex-shrink-0">
                <div className="flex gap-2 whitespace-nowrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category || (selectedCategory === null && category === "All") ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category === "All" ? null : category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Discovery Assistant */}
      <AIDiscoveryAssistant />

      {/* Trending Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Templates
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingTemplates.map((template, index) => (
                <MarketplaceTemplateCard key={template.id} template={template} index={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI-Powered Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Recommended for You
              </CardTitle>
              <Badge variant="outline" className="gap-1">
                <Sparkles className="h-3 w-3" />
                AI-Powered
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedTemplates.map((template, index) => (
                <MarketplaceTemplateCard key={template.id} template={template} index={index + 4} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Media Growth Packs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <SocialGrowthPacks />
      </motion.div>
    </div>
  )
}

function MarketplaceTemplateCard({ template, index }: { template: MarketplaceTemplate; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        className={`border-2 transition-all cursor-pointer h-full ${
          hovered ? "border-primary shadow-lg scale-105" : "border-border"
        }`}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm truncate">{template.name}</h3>
                  {template.verified && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
              </div>
              {template.trending && (
                <Badge variant="default" className="gap-1 shrink-0">
                  <TrendingUp className="h-3 w-3" />
                  Hot
                </Badge>
              )}
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{template.creator}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{template.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{template.installs.toLocaleString()} installs</span>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Badge variant={template.price === "Free" ? "outline" : "default"} className="text-xs">
                {template.price === "Free" ? "Free" : template.price}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 px-3 text-xs gap-1">
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
                <Button variant="default" size="sm" className="h-7 px-3 text-xs gap-1">
                  <Download className="h-3 w-3" />
                  {template.price === "Free" ? "Install" : "Buy"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

