"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Filter, 
  GitCompare, 
  FileText, 
  BarChart3,
  Settings,
  Download
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const integrations = [
  "All Integrations",
  "LinkedIn",
  "GitHub",
  "Coursera",
  "Udemy",
  "Notion",
  "Google Calendar",
  "YouTube",
  "Twitter/X",
  "Instagram",
  "Discord",
  "Reddit",
  "Medium",
  "Google Drive",
  "Slack",
  "Dribbble",
  "Behance",
  "Spotify",
  "WhatsApp",
  "Gmail",
  "n8n",
  "Zapier",
  "GitHub Actions",
]

export function AnalyticsHeader() {
  const [selectedFilter, setSelectedFilter] = useState("All Integrations")
  const [compareMode, setCompareMode] = useState(false)
  const [narrativeMode, setNarrativeMode] = useState(false)
  const [firstCompare, setFirstCompare] = useState<string | null>(null)
  const [secondCompare, setSecondCompare] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left Section - Title & Filter */}
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h1 className="text-2xl font-bold">Analytics & Insights</h1>
              </div>

              {/* Integration Scope Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by integration" />
                  </SelectTrigger>
                  <SelectContent>
                    {integrations.map((integration) => (
                      <SelectItem key={integration} value={integration}>
                        {integration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-4">
              {/* Smart Compare Button */}
              <div className="flex items-center gap-2">
                <Button
                  variant={compareMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCompareMode(!compareMode)}
                  className="gap-2"
                >
                  <GitCompare className="h-4 w-4" />
                  {compareMode ? "Exit Compare" : "Compare"}
                </Button>

                {compareMode && (
                  <div className="flex items-center gap-2">
                    <Select value={firstCompare || ""} onValueChange={setFirstCompare}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="First" />
                      </SelectTrigger>
                      <SelectContent>
                        {integrations.slice(1).map((integration) => (
                          <SelectItem key={integration} value={integration}>
                            {integration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-muted-foreground">vs</span>
                    <Select value={secondCompare || ""} onValueChange={setSecondCompare}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Second" />
                      </SelectTrigger>
                      <SelectContent>
                        {integrations.slice(1).map((integration) => (
                          <SelectItem key={integration} value={integration}>
                            {integration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* AI Narrative Toggle */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded border">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <Label htmlFor="narrative-mode" className="text-sm cursor-pointer">
                    Story View
                  </Label>
                  <Switch
                    id="narrative-mode"
                    checked={narrativeMode}
                    onCheckedChange={setNarrativeMode}
                  />
                </div>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

