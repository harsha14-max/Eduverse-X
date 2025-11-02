"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Github,
  Globe,
  Sparkles,
  RefreshCw,
  Plus,
  X,
} from "lucide-react"

interface AddProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProjectModal({ open, onOpenChange }: AddProjectModalProps) {
  const [project, setProject] = useState({
    title: "",
    description: "",
    techStack: [] as string[],
    category: "Technical",
    source: "Manual",
    url: "",
  })
  const [techInput, setTechInput] = useState("")
  const [isSyncing, setIsSyncing] = useState(false)
  const [aiSummary, setAiSummary] = useState("")

  const handleAddTech = () => {
    if (techInput.trim() && !project.techStack.includes(techInput.trim())) {
      setProject({
        ...project,
        techStack: [...project.techStack, techInput.trim()],
      })
      setTechInput("")
    }
  }

  const handleRemoveTech = (tech: string) => {
    setProject({
      ...project,
      techStack: project.techStack.filter((t) => t !== tech),
    })
  }

  const handleSyncFromGitHub = () => {
    setIsSyncing(true)
    // Simulate GitHub sync
    setTimeout(() => {
      setProject({
        ...project,
        title: "Weather Prediction App",
        description: "Real-time weather prediction app using OpenWeather API and React",
        techStack: ["React", "TypeScript", "OpenWeather API"],
        source: "GitHub",
      })
      setIsSyncing(false)
    }, 2000)
  }

  const handleGenerateSummary = () => {
    // Simulate AI summary generation
    setAiSummary("AI-generated project summary: A modern weather application built with React and TypeScript...")
  }

  const handleSave = () => {
    // In real app, save to backend
    onOpenChange(false)
    setProject({
      title: "",
      description: "",
      techStack: [],
      category: "Technical",
      source: "Manual",
      url: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Add a project to your portfolio manually or sync from connected platforms
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="manual" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="sync">Sync from Platform</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
                className="mt-1"
                placeholder="Weather Prediction App"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                className="mt-1"
                placeholder="Real-time weather prediction app using OpenWeather API and React"
                rows={3}
              />
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 gap-2"
                onClick={handleGenerateSummary}
              >
                <Sparkles className="h-3 w-3" />
                AI Generate Summary
              </Button>
              {aiSummary && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/20"
                >
                  <div className="text-sm">{aiSummary}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setProject({ ...project, description: aiSummary })
                      setAiSummary("")
                    }}
                  >
                    Use This
                  </Button>
                </motion.div>
              )}
            </div>

            <div>
              <Label htmlFor="techStack">Tech Stack</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="techStack"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTech()}
                  placeholder="React, TypeScript, etc."
                />
                <Button onClick={handleAddTech}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="gap-1">
                    {tech}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveTech(tech)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={project.category}
                onChange={(e) => setProject({ ...project, category: e.target.value })}
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Technical">Technical</option>
                <option value="Creative">Creative</option>
                <option value="Academic">Academic</option>
                <option value="Team">Team Project</option>
                <option value="AI/ML">AI/ML</option>
              </select>
            </div>

            <div>
              <Label htmlFor="url">Project URL (Optional)</Label>
              <Input
                id="url"
                value={project.url}
                onChange={(e) => setProject({ ...project, url: e.target.value })}
                className="mt-1"
                placeholder="https://..."
              />
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="text-sm font-medium mb-2">Sync from Connected Platforms</div>

              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleSyncFromGitHub}
                disabled={isSyncing}
              >
                <Github className="h-4 w-4" />
                {isSyncing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Syncing from GitHub...
                  </>
                ) : (
                  "Sync from GitHub"
                )}
              </Button>

              <Button variant="outline" className="w-full justify-start gap-2">
                <Globe className="h-4 w-4" />
                Sync from Behance
              </Button>

              <Button variant="outline" className="w-full justify-start gap-2">
                <Globe className="h-4 w-4" />
                Sync from Medium
              </Button>

              <Button variant="outline" className="w-full justify-start gap-2">
                <Globe className="h-4 w-4" />
                Sync from YouTube
              </Button>

              {project.source !== "Manual" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-primary/5 border border-primary/20 mt-4"
                >
                  <div className="text-sm font-medium mb-2">Synced Project Data:</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div><strong>Title:</strong> {project.title}</div>
                    <div><strong>Description:</strong> {project.description}</div>
                    <div><strong>Tech Stack:</strong> {project.techStack.join(", ")}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Add Project</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

