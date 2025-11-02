"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Briefcase, Sparkles, Plus, TrendingUp, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

interface PortfolioEntry {
  id: string
  title: string
  type: "project" | "achievement" | "badge"
  description: string
  aiRecommendation?: string
}

const portfolioEntries: PortfolioEntry[] = [
  {
    id: "1",
    title: "Weather App Project",
    type: "project",
    description: "Built with React and OpenWeather API",
  },
  {
    id: "2",
    title: "LangChain Badge",
    type: "badge",
    description: "New skill badge added to portfolio",
    aiRecommendation: "Add this new GitHub repository as a project",
  },
  {
    id: "3",
    title: "Machine Learning Specialization",
    type: "achievement",
    description: "Completed ML course",
    aiRecommendation: "Summarize your latest project for your profile",
  },
]

export function AIPortfolioPanel() {
  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">AI Portfolio Panel</CardTitle>
              <CardDescription className="text-xs">
                Portfolio entries with AI recommendations
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {portfolioEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-semibold text-sm">{entry.title}</div>
                          <Badge variant="outline" className="text-xs">
                            {entry.type}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{entry.description}</div>
                      </div>
                    </div>
                    {entry.aiRecommendation && (
                      <div className="flex items-start gap-2 mt-3 p-2 bg-blue-500/10 rounded-md border border-blue-500/20">
                        <Sparkles className="h-3 w-3 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-blue-700">{entry.aiRecommendation}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

