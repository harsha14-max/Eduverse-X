"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ExternalLink, TrendingUp } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Result {
  id: string
  type: "project" | "course" | "job"
  title: string
  description: string
  source: string
  relevance: number
}

interface LiveResultCardsProps {
  results: Result[]
}

export function LiveResultCards({ results }: LiveResultCardsProps) {
  const [addedItems, setAddedItems] = useState<string[]>([])

  const handleAddToPortfolio = (id: string) => {
    setAddedItems([...addedItems, id])
    // In real app, would add to portfolio
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "project":
        return "bg-blue-50 text-blue-700 border-blue-300"
      case "course":
        return "bg-green-50 text-green-700 border-green-300"
      case "job":
        return "bg-purple-50 text-purple-700 border-purple-300"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">Live Results</h3>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold">{result.title}</h4>
                        <Badge variant="outline" className={`text-xs ${getTypeColor(result.type)}`}>
                          {result.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{result.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Source: {result.source}</span>
                        <span>•</span>
                        <span>{result.relevance}% match</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleAddToPortfolio(result.id)}
                      disabled={addedItems.includes(result.id)}
                      className="gap-2 text-xs"
                    >
                      {addedItems.includes(result.id) ? (
                        <>
                          <Plus className="h-3 w-3" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          Add to Portfolio
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2 text-xs">
                      <ExternalLink className="h-3 w-3" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

