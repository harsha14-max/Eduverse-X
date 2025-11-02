"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Globe,
  Sparkles,
  TrendingUp,
  BookOpen,
  Code,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { DataSourceNode } from "./data-source-node"
import { AISummaryCard } from "./ai-summary-card"

const dataSources = [
  { id: "1", name: "MIT OpenCourseWare", type: "Academic", status: "fetching", location: "US" },
  { id: "2", name: "GitHub Trends", type: "Tech", status: "active", location: "Global" },
  { id: "3", name: "LinkedIn Job Board", type: "Jobs", status: "active", location: "Global" },
  { id: "4", name: "arXiv Papers", type: "Research", status: "fetching", location: "Global" },
  { id: "5", name: "Tech Blogs", type: "Blogs", status: "active", location: "Global" },
]

const discoveries = [
  {
    id: "1",
    title: "New 2025 AI Agents Research Paper Released",
    source: "arXiv Papers",
    relevance: "Matches your Machine Learning course interest",
    match: "92%",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Next.js 15 Course Now Available",
    source: "MIT OpenCourseWare",
    relevance: "Builds on your React expertise",
    match: "88%",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    title: "Cloud AI Tools Trending",
    source: "GitHub Trends",
    relevance: "High demand skill in your learning path",
    match: "85%",
    timestamp: "1 day ago",
  },
]

export function AIWebTracker() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">AI Web Tracker</CardTitle>
              <CardDescription className="text-xs">
                Continuously monitors trusted sources for new opportunities
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs gap-1">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Animated Globe View */}
        <div className="h-64 rounded-lg border border-border bg-muted/30 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="h-32 w-32 text-primary/20" />
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4 w-full p-4">
            {dataSources.map((source, index) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <DataSourceNode
                  source={source}
                  isSelected={selectedSource === source.id}
                  onClick={() => setSelectedSource(selectedSource === source.id ? null : source.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Sources List */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-sm font-semibold">Active Data Sources</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {dataSources.map((source) => (
              <Badge
                key={source.id}
                variant="outline"
                className={`text-xs cursor-pointer hover:bg-primary/10 ${
                  selectedSource === source.id ? "bg-primary/10 border-primary" : ""
                }`}
                onClick={() => setSelectedSource(selectedSource === source.id ? null : source.id)}
              >
                {source.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Summary Cards */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div className="text-sm font-semibold">Recent Discoveries</div>
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3 pr-4">
              {discoveries.map((discovery, index) => (
                <motion.div
                  key={discovery.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AISummaryCard discovery={discovery} />
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

