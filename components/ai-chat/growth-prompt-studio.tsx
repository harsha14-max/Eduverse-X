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
import { Plus, Save, Linkedin, Twitter, FileText, Calendar } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Prompt {
  id: string
  title: string
  category: "Social" | "Learning" | "Personal Brand"
  keywords: string[]
  scheduledFrequency: string
  platform: string
  content: string
}

const savedPrompts: Prompt[] = [
  {
    id: "1",
    title: "Weekly AI Career Update Post",
    category: "Social",
    keywords: ["AI", "Career", "Growth"],
    scheduledFrequency: "Every Friday",
    platform: "LinkedIn",
    content: "Create a professional LinkedIn post summarizing my weekly learning and career progress",
  },
  {
    id: "2",
    title: "Project Showcase Post",
    category: "Personal Brand",
    keywords: ["Projects", "Portfolio", "Tech"],
    scheduledFrequency: "Manual",
    platform: "Twitter/X",
    content: "Generate a tweet showcasing my latest project with relevant hashtags",
  },
]

export function GrowthPromptStudio() {
  const [prompts, setPrompts] = useState<Prompt[]>(savedPrompts)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPrompt, setNewPrompt] = useState<Partial<Prompt>>({
    title: "",
    category: "Social",
    keywords: [],
    scheduledFrequency: "Manual",
    platform: "LinkedIn",
    content: "",
  })

  const handleCreatePrompt = () => {
    if (!newPrompt.title || !newPrompt.content) return

    const prompt: Prompt = {
      id: Date.now().toString(),
      title: newPrompt.title,
      category: newPrompt.category || "Social",
      keywords: newPrompt.keywords || [],
      scheduledFrequency: newPrompt.scheduledFrequency || "Manual",
      platform: newPrompt.platform || "LinkedIn",
      content: newPrompt.content,
    }

    setPrompts([...prompts, prompt])
    setShowCreateModal(false)
    setNewPrompt({
      title: "",
      category: "Social",
      keywords: [],
      scheduledFrequency: "Manual",
      platform: "LinkedIn",
      content: "",
    })
  }

  const PlatformIcon = newPrompt.platform === "LinkedIn" ? Linkedin : newPrompt.platform === "Twitter/X" ? Twitter : FileText

  return (
    <div className="space-y-4">
      {/* Saved Prompts */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Saved Growth Prompts</h3>
        <Button size="sm" onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Prompt
        </Button>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-3">
          {prompts.map((prompt) => {
            const Icon = prompt.platform === "LinkedIn" ? Linkedin : prompt.platform === "Twitter/X" ? Twitter : FileText
            return (
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
                        <Icon className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm">{prompt.title}</h4>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {prompt.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{prompt.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {prompt.scheduledFrequency}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon className="h-3 w-3" />
                        {prompt.platform}
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
            )
          })}
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
              <h3 className="text-lg font-bold mb-4">Create New Growth Prompt</h3>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={newPrompt.title}
                    onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                    placeholder="e.g., Weekly AI Career Update Post"
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
                        <SelectItem value="Social">Social</SelectItem>
                        <SelectItem value="Learning">Learning</SelectItem>
                        <SelectItem value="Personal Brand">Personal Brand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Platform</Label>
                    <Select
                      value={newPrompt.platform}
                      onValueChange={(value) => setNewPrompt({ ...newPrompt, platform: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                        <SelectItem value="Dev.to">Dev.to</SelectItem>
                        <SelectItem value="Hashnode">Hashnode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                      <SelectItem value="Every Monday">Every Monday</SelectItem>
                      <SelectItem value="Every Friday">Every Friday</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Prompt Content</Label>
                  <Textarea
                    value={newPrompt.content}
                    onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                    placeholder="Describe what this prompt should generate..."
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

