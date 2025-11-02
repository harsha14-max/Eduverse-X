"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Globe, Sparkles, Plus } from "lucide-react"
import { LiveResultCards } from "./live-result-cards"
import { ScrollArea } from "@/components/ui/scroll-area"

export function WebIntelligenceTab() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const handleSearch = () => {
    if (!query.trim()) return

    setIsSearching(true)
    // Simulate search
    setTimeout(() => {
      setResults([
        {
          id: "1",
          type: "project",
          title: "LangChain Open Source Project",
          description: "A popular Python library for building LLM applications",
          source: "GitHub",
          relevance: 92,
        },
        {
          id: "2",
          type: "course",
          title: "Advanced Machine Learning Course",
          description: "Comprehensive ML course covering deep learning and neural networks",
          source: "Coursera",
          relevance: 88,
        },
        {
          id: "3",
          type: "job",
          title: "Senior AI Engineer Position",
          description: "Remote position at top AI company matching your profile",
          source: "LinkedIn",
          relevance: 85,
        },
      ])
      setIsSearching(false)
    }, 1500)
  }

  const quickQueries = [
    "Find trending Python open-source projects",
    "What's new in Cloud automation this week?",
    "Any new job openings matching my profile?",
  ]

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Smart Web Scanner</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          AI-powered web intelligence layer for discovering opportunities
        </p>
      </CardHeader>

      <CardContent>
        {/* Search */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Find trending Python open-source projects..."
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Queries */}
          <div className="flex flex-wrap gap-2">
            {quickQueries.map((quickQuery) => (
              <Button
                key={quickQuery}
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery(quickQuery)
                  setTimeout(() => handleSearch(), 100)
                }}
                className="text-xs"
              >
                {quickQuery}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && <LiveResultCards results={results} />}
        {results.length === 0 && !isSearching && (
          <div className="text-center py-12 text-muted-foreground">
            <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Enter a query to discover web opportunities</p>
          </div>
        )}
        {isSearching && (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
            <p className="text-sm text-muted-foreground mt-4">Searching the web...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

