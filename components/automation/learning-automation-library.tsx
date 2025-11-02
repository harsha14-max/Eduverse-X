"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Search,
  Users,
  Star,
  Copy,
  Eye,
  TrendingUp,
  Filter,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const automationFlows = [
  {
    id: "1",
    name: "PDF Summary Automation",
    author: "Sara J.",
    difficulty: "Beginner",
    tech: ["Python", "AI"],
    uses: 342,
    rating: 4.8,
    description: "Automatically summarize PDF documents and post to Slack",
  },
  {
    id: "2",
    name: "GitHub Portfolio Sync",
    author: "Mike C.",
    difficulty: "Intermediate",
    tech: ["Node.js", "GitHub API"],
    uses: 521,
    rating: 4.9,
    description: "Sync GitHub projects to portfolio automatically",
  },
  {
    id: "3",
    name: "Daily Learning Tracker",
    author: "Riya P.",
    difficulty: "Advanced",
    tech: ["Python", "ML", "API"],
    uses: 287,
    rating: 4.7,
    description: "Track daily learning progress and generate insights",
  },
]

export function LearningAutomationLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedTech, setSelectedTech] = useState<string>("all")
  const [hoveredFlow, setHoveredFlow] = useState<string | null>(null)

  // Get all unique tech tags
  const allTech = Array.from(new Set(automationFlows.flatMap(flow => flow.tech)))
  
  const filteredFlows = automationFlows.filter((flow) => {
    const matchesSearch = flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flow.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDifficulty = selectedDifficulty === "all" || flow.difficulty === selectedDifficulty
    const matchesTech = selectedTech === "all" || flow.tech.includes(selectedTech)
    return matchesSearch && matchesDifficulty && matchesTech
  })

  const handleCloneTemplate = (flowId: string) => {
    // In production, this would clone the template to user's workflows
    const flow = automationFlows.find(f => f.id === flowId)
    if (flow) {
      // Simulate cloning
      console.log(`Cloning template: ${flow.name}`)
      // In real app: dispatch action to add to user's workflows
    }
  }

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
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <BookOpen className="h-5 w-5 text-primary" />
          <div className="text-sm font-semibold">Learning Automation Library</div>
          <Badge variant="outline" className="text-xs">{automationFlows.length}+ flows</Badge>
        </div>

        {/* Search & Filter */}
        <div className="space-y-2 mb-4 shrink-0">
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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Filter className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-semibold">Filters:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "Beginner", "Intermediate", "Advanced"].map((diff) => (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff}
                </Button>
              ))}
            </div>
            {selectedTech !== "all" && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs gap-1">
                  Tech: {selectedTech}
                  <button 
                    onClick={() => setSelectedTech("all")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Flows List */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-3">
            {filteredFlows.map((flow, index) => (
              <motion.div
                key={flow.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="relative group"
                  onMouseEnter={() => setHoveredFlow(flow.id)}
                  onMouseLeave={() => setHoveredFlow(null)}
                >
                  <Card className="border-border cursor-pointer hover:border-primary transition-all">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="text-sm font-semibold truncate">{flow.name}</div>
                              <Badge variant="outline" className={`text-xs ${getDifficultyColor(flow.difficulty)}`}>
                                {flow.difficulty}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">{flow.description}</div>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{flow.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{flow.uses} uses</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{flow.rating}</span>
                          </div>
                        </div>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {flow.tech.map((tech, i) => (
                            <Badge 
                              key={i} 
                              variant="outline" 
                              className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedTech(tech)
                              }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2 border-t border-border">
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="flex-1 gap-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCloneTemplate(flow.id)
                            }}
                          >
                            <Copy className="h-3 w-3" />
                            Clone Template
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 text-xs">
                            <Eye className="h-3 w-3" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Hover Preview */}
                  {hoveredFlow === flow.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute left-full ml-4 top-0 z-50 w-80"
                    >
                      <Card className="border-primary/20 bg-primary/5 shadow-xl">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-semibold">{flow.name}</div>
                              <Badge variant="outline" className={`text-xs ${getDifficultyColor(flow.difficulty)}`}>
                                {flow.difficulty}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">{flow.description}</div>
                            <div className="space-y-2 pt-2 border-t border-border">
                              <div className="text-xs font-semibold">Tech Stack:</div>
                              <div className="flex flex-wrap gap-1.5">
                                {flow.tech.map((tech, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-border">
                              <div className="text-xs text-muted-foreground">
                                <div>Author: {flow.author}</div>
                                <div>{flow.uses} uses • ⭐ {flow.rating}</div>
                              </div>
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="gap-2 text-xs"
                                onClick={() => handleCloneTemplate(flow.id)}
                              >
                                <Copy className="h-3 w-3" />
                                Clone
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

