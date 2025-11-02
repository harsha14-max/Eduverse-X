"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, CheckCircle2, Edit } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ProjectSummary {
  id: string
  title: string
  originalDescription: string
  aiGeneratedSummary: string
  status: "pending" | "accepted" | "edited"
}

const projectSummaries: ProjectSummary[] = [
  {
    id: "1",
    title: "LangChain Bot",
    originalDescription: "A bot built with LangChain",
    aiGeneratedSummary: "Built a sophisticated LangChain-powered chatbot that processes natural language queries, integrates with multiple APIs, and provides context-aware responses. Implemented advanced conversation management, memory persistence, and seamless integration with external data sources.",
    status: "pending",
  },
  {
    id: "2",
    title: "Weather App",
    originalDescription: "Weather app with React",
    aiGeneratedSummary: "Developed a responsive weather application using React and OpenWeather API, featuring real-time forecasts, location-based search, and intuitive UI/UX. Implemented error handling, loading states, and responsive design principles for cross-device compatibility.",
    status: "accepted",
  },
]

export function PortfolioAutoBranding() {
  const [summaries, setSummaries] = useState<ProjectSummary[]>(projectSummaries)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedSummary, setEditedSummary] = useState<string>("")

  const handleAccept = (id: string) => {
    setSummaries(
      summaries.map((summary) =>
        summary.id === id ? { ...summary, status: "accepted" as const } : summary
      )
    )
  }

  const handleEdit = (id: string, currentSummary: string) => {
    setEditingId(id)
    setEditedSummary(currentSummary)
  }

  const handleSaveEdit = (id: string) => {
    setSummaries(
      summaries.map((summary) =>
        summary.id === id
          ? { ...summary, aiGeneratedSummary: editedSummary, status: "edited" as const }
          : summary
      )
    )
    setEditingId(null)
    setEditedSummary("")
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Portfolio Auto-Branding</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          AI-generated professional summaries for your projects
        </p>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {summaries.map((summary) => (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold">{summary.title}</h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      summary.status === "accepted"
                        ? "bg-green-50 text-green-700 border-green-300"
                        : summary.status === "edited"
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "bg-yellow-50 text-yellow-700 border-yellow-300"
                    }`}
                  >
                    {summary.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Original</Label>
                    <p className="text-xs text-muted-foreground">{summary.originalDescription}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">AI-Generated Summary</Label>
                    {editingId === summary.id ? (
                      <div className="space-y-2 mt-1">
                        <Textarea
                          value={editedSummary}
                          onChange={(e) => setEditedSummary(e.target.value)}
                          rows={4}
                          className="text-xs"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleSaveEdit(summary.id)}
                            className="text-xs"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                            className="text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm mt-1">{summary.aiGeneratedSummary}</p>
                    )}
                  </div>
                </div>

                {editingId !== summary.id && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleAccept(summary.id)}
                      className="text-xs gap-1"
                      disabled={summary.status === "accepted"}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(summary.id, summary.aiGeneratedSummary)}
                      className="text-xs gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

