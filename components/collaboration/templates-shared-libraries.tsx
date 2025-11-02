"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Zap, Database, FileText } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SharedAsset {
  id: string
  name: string
  type: "template" | "node" | "dataset"
  description: string
  author: string
  category: string
}

const sharedAssets: SharedAsset[] = [
  {
    id: "1",
    name: "LinkedIn Auto Poster Template",
    type: "template",
    description: "Automated LinkedIn post generation with AI",
    author: "Alice",
    category: "Social Media",
  },
  {
    id: "2",
    name: "Data Cleanup Node",
    type: "node",
    description: "Approved automation node for data processing",
    author: "Bob",
    category: "Data Processing",
  },
  {
    id: "3",
    name: "User Growth Dataset",
    type: "dataset",
    description: "Shared dataset for analytics workflows",
    author: "Charlie",
    category: "Analytics",
  },
]

export function TemplatesSharedLibraries() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAssets = sharedAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || asset.type === activeTab
    return matchesSearch && matchesTab
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "template":
        return Zap
      case "node":
        return FileText
      case "dataset":
        return Database
      default:
        return FileText
    }
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">Shared Assets</CardTitle>
          </div>
          <Button size="sm" variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Reusable prompt templates, approved nodes, and shared datasets
        </p>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 flex flex-col">
        {/* Search */}
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search shared assets..."
          className="mb-4"
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="template">Templates</TabsTrigger>
            <TabsTrigger value="node">Nodes</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="flex-1 mt-0 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-3 pr-4">
                {filteredAssets.map((asset) => {
                  const Icon = getTypeIcon(asset.type)
                  return (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-semibold truncate">{asset.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {asset.type}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {asset.description}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  By {asset.author}
                                </span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">
                                  {asset.category}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="gap-1">
                              <Plus className="h-3 w-3" />
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

