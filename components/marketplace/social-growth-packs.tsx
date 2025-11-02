"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Search,
  Star,
  Download,
  Sparkles,
  Linkedin,
  Twitter,
  Instagram,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrustSecurityBadges } from "./trust-security-ui"

interface GrowthPack {
  id: string
  name: string
  description: string
  category: "growth" | "presence" | "engagement"
  platforms: string[]
  rating: number
  installs: number
  price: "Free" | string
  features: string[]
  estimatedImpact: string
  verified: boolean
  decentralized: boolean
}

const growthPacks: GrowthPack[] = [
  {
    id: "1",
    name: "LinkedIn Post Generator",
    description: "AI generates LinkedIn posts based on your learning progress and achievements",
    category: "growth",
    platforms: ["LinkedIn"],
    rating: 4.9,
    installs: 3200,
    price: "Free",
    features: ["Auto-post on course completion", "AI-optimized content", "Schedule posts"],
    estimatedImpact: "High",
    verified: true,
    decentralized: true,
  },
  {
    id: "2",
    name: "Auto Portfolio Updater",
    description: "Automatically updates your portfolio when you complete projects or learn new skills",
    category: "presence",
    platforms: ["Portfolio", "LinkedIn"],
    rating: 4.8,
    installs: 2850,
    price: "Free",
    features: ["Auto-sync projects", "Skill tracking", "Achievement highlights"],
    estimatedImpact: "High",
    verified: true,
    decentralized: true,
  },
  {
    id: "3",
    name: "AI Brand Voice Assistant",
    description: "Maintains consistent brand voice across all your social media posts",
    category: "engagement",
    platforms: ["LinkedIn", "Twitter", "Instagram"],
    rating: 4.7,
    installs: 2100,
    price: "Free",
    features: ["Voice consistency", "Multi-platform sync", "AI optimization"],
    estimatedImpact: "Medium",
    verified: true,
    decentralized: false,
  },
  {
    id: "4",
    name: "Social Media Growth Pack",
    description: "Complete suite for social media automation and growth",
    category: "growth",
    platforms: ["LinkedIn", "Twitter", "Instagram"],
    rating: 4.9,
    installs: 4500,
    price: "₹499",
    features: [
      "LinkedIn Post Generator",
      "Auto Portfolio Updater",
      "AI Brand Voice Assistant",
      "Multi-platform scheduling",
    ],
    estimatedImpact: "Very High",
    verified: true,
    decentralized: true,
  },
]

export function SocialGrowthPacks() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "growth", "presence", "engagement"]

  const filteredPacks = growthPacks.filter((pack) => {
    const matchesSearch =
      pack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.platforms.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || pack.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getPlatformIcon = (platform: string): React.ReactNode => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Social Media Growth Packs
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI-Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search growth packs..."
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
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Growth Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPacks.map((pack, index) => (
          <GrowthPackCard key={pack.id} pack={pack} index={index} getPlatformIcon={getPlatformIcon} />
        ))}
      </div>
    </div>
  )
}

function GrowthPackCard({
  pack,
  index,
  getPlatformIcon,
}: {
  pack: GrowthPack
  index: number
  getPlatformIcon: (platform: string) => React.ReactNode
}) {
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
                  <h3 className="font-semibold text-sm truncate">{pack.name}</h3>
                  <Badge
                    variant="outline"
                    className={`text-xs shrink-0 ${
                      pack.estimatedImpact === "Very High"
                        ? "bg-purple-50 text-purple-700 border-purple-300"
                        : pack.estimatedImpact === "High"
                        ? "bg-green-50 text-green-700 border-green-300"
                        : "bg-yellow-50 text-yellow-700 border-yellow-300"
                    }`}
                  >
                    {pack.estimatedImpact} Impact
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{pack.description}</p>
              </div>
            </div>

            {/* Platforms */}
            <div className="flex items-center gap-2 flex-wrap">
              {pack.platforms.map((platform) => (
                <Badge key={platform} variant="outline" className="text-xs gap-1">
                  {getPlatformIcon(platform)}
                  {platform}
                </Badge>
              ))}
            </div>

            {/* Trust Badges */}
            <TrustSecurityBadges verified={pack.verified} decentralized={pack.decentralized} />

            {/* Features */}
            <div className="space-y-1">
              <div className="text-xs font-semibold">Features:</div>
              <div className="space-y-1">
                {pack.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
                {pack.features.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{pack.features.length - 3} more features
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{pack.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{pack.installs.toLocaleString()} installs</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Badge variant={pack.price === "Free" ? "outline" : "default"} className="text-xs">
                {pack.price === "Free" ? "Free" : pack.price}
              </Badge>
              <Button variant="default" size="sm" className="h-7 px-3 text-xs gap-1">
                <Download className="h-3 w-3" />
                {pack.price === "Free" ? "Install" : "Buy"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

