"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Save, Zap, Calendar } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AutomationPrompt {
  id: string
  title: string
  category: "Workflow" | "Integration" | "Notification"
  keywords: string[]
  scheduledFrequency: string
  description: string
}

const savedPrompts: AutomationPrompt[] = [
  {
    id: "1",
    title: "Slack Summary Bot",
    category: "Workflow",
    keywords: ["Slack", "Summary", "Daily"],
    scheduledFrequency: "Daily",
    description: "Create a workflow that summarizes daily activities and posts to Slack",
  },
  {
    id: "2",
    title: "GitHub Auto-Portfolio Sync",
    category: "Integration",
    keywords: ["GitHub", "Portfolio", "Auto-sync"],
    scheduledFrequency: "On Push",
    description: "Automatically update portfolio when new commits are pushed to GitHub",
  },
]

export function AutomationPromptStudio() {
  const [prompts, setPrompts] = useState<AutomationPrompt[]>(savedPrompts)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPrompt, setNewPrompt] = useState<Partial<AutomationPrompt>>({
    title: "",
    category: "Workflow",
    keywords: [],
    scheduledFrequency: "Manual",
    description: "",
  })

  const handleCreatePrompt = () => {
    if (!newPrompt.title || !newPrompt.description) return

    const prompt: AutomationPrompt = {
      id: Date.now().toString(),
      title: newPrompt.title,
      category: newPrompt.category || "Workflow",
      keywords: newPrompt.keywords || [],
      scheduledFrequency: newPrompt.scheduledFrequency || "Manual",
      description: newPrompt.description,
    }

    setPrompts([...prompts, prompt])
    setShowCreateModal(false)
    setNewPrompt({
      title: "",
      category: "Workflow",
      keywords: [],
      scheduledFrequency: "Manual",
      description: "",
    })
  }

  return (
    <div className="space-y-4">
      {/* Saved Prompts */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Saved Automation Prompts</h3>
        <Button size="sm" onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Prompt
        </Button>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-3">
          {prompts.map((prompt) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-sm">{prompt.title}</h4>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {prompt.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{prompt.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {prompt.scheduledFrequency}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {prompt.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-lg font-bold mb-4">Create New Automation Prompt</h3>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={newPrompt.title}
                    onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                    placeholder="e.g., Slack Summary Bot"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={newPrompt.category}
                      onValueChange={(value) => setNewPrompt({ ...newPrompt, category: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Workflow">Workflow</SelectItem>
                        <SelectItem value="Integration">Integration</SelectItem>
                        <SelectItem value="Notification">Notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Scheduled Frequency</Label>
                    <Select
                      value={newPrompt.scheduledFrequency}
                      onValueChange={(value) => setNewPrompt({ ...newPrompt, scheduledFrequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="On Push">On Push</SelectItem>
                        <SelectItem value="On Schedule">On Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Prompt Description</Label>
                  <Textarea
                    value={newPrompt.description}
                    onChange={(e) => setNewPrompt({ ...newPrompt, description: e.target.value })}
                    placeholder="Describe what this automation should do..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePrompt} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Prompt
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

