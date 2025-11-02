"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Star, Download, ArrowRight } from "lucide-react"

interface CompatibleWorkflow {
  id: string
  name: string
  description: string
  rating: number
  installs: number
  compatibility: number // percentage
}

export function AICompatibleWorkflows({ pluginId }: { pluginId: string }) {
  // Mock compatible workflows based on plugin
  const compatibleWorkflows: CompatibleWorkflow[] = [
    {
      id: "1",
      name: `Top 3 ${pluginId === "linkedin" ? "LinkedIn" : pluginId === "notion" ? "Notion" : pluginId} Automations`,
      description: `AI-powered workflows specifically designed for ${pluginId}`,
      rating: 4.8,
      installs: 2300,
      compatibility: 100,
    },
    {
      id: "2",
      name: "Social Media Growth Pack",
      description: "Multi-platform automation suite",
      rating: 4.9,
      installs: 1850,
      compatibility: 95,
    },
    {
      id: "3",
      name: "Content Scheduler",
      description: "Automated content planning and posting",
      rating: 4.7,
      installs: 1420,
      compatibility: 90,
    },
  ]

  return (
    <div className="space-y-3">
      {compatibleWorkflows.map((workflow, index) => (
        <motion.div
          key={workflow.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-border hover:border-primary transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{workflow.name}</h4>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                      {workflow.compatibility}% Compatible
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{workflow.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{workflow.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{workflow.installs.toLocaleString()} installs</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 text-xs shrink-0">
                  <ArrowRight className="h-3 w-3" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

