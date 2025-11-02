"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Search,
  Sparkles,
  Star,
  Download,
  Eye,
  Play,
  Zap,
  TrendingUp,
  Filter,
  Users,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TemplatePreviewModal } from "./template-preview-modal"

interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: string
  author: string
  rating: number
  installs: number
  price: "Free" | string
  nodes: number
  triggers: string[]
  actions: string[]
  preview: {
    nodes: number
    connections: number
  }
  demoAvailable: boolean
  tags: string[]
}

const workflowTemplates: WorkflowTemplate[] = [
  {
    id: "1",
    name: "PDF Summary Automation",
    description: "This workflow summarizes your uploaded notes and sends daily recap to Telegram",
    category: "Education",
    author: "Sara Johnson",
    rating: 4.8,
    installs: 2340,
    price: "Free",
    nodes: 4,
    triggers: ["Daily at 9 AM", "PDF Upload"],
    actions: ["AI Summary", "Telegram Post"],
    preview: { nodes: 4, connections: 3 },
    demoAvailable: true,
    tags: ["PDF", "AI", "Telegram", "Education"],
  },
  {
    id: "2",
    name: "Notion Knowledge Base Sync",
    description: "Automatically syncs learning notes to Notion knowledge base",
    category: "Productivity",
    author: "Mike Chen",
    rating: 4.9,
    installs: 1890,
    price: "Free",
    nodes: 5,
    triggers: ["Note Created"],
    actions: ["Notion Update", "AI Enhancement"],
    preview: { nodes: 5, connections: 4 },
    demoAvailable: true,
    tags: ["Notion", "Sync", "Productivity"],
  },
  {
    id: "3",
    name: "Social Media Growth Pack",
    description: "LinkedIn Post Generator + Auto Portfolio Updater + AI Brand Voice Assistant",
    category: "Growth & Presence",
    author: "AI Curated",
    rating: 4.9,
    installs: 3200,
    price: "Free",
    nodes: 7,
    triggers: ["Course Completed", "Project Done"],
    actions: ["AI Post Generation", "Multi-Platform Post"],
    preview: { nodes: 7, connections: 6 },
    demoAvailable: true,
    tags: ["Social Media", "Growth", "LinkedIn", "Portfolio"],
  },
  {
    id: "4",
    name: "AI Quiz Generator",
    description: "Auto-generates quizzes from study notes and posts to Telegram",
    category: "Education",
    author: "Riya Patel",
    rating: 4.7,
    installs: 1420,
    price: "Free",
    nodes: 6,
    triggers: ["Note Updated"],
    actions: ["Quiz Generation", "Telegram Post"],
    preview: { nodes: 6, connections: 5 },
    demoAvailable: true,
    tags: ["Quiz", "AI", "Telegram", "Education"],
  },
]

export function WorkflowTemplatesLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const categories = ["all", "Education", "Productivity", "Growth & Presence", "Social Media", "Automation"]

  const filteredTemplates = workflowTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Workflow Templates & Automations Library
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI-Curated
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search workflows, templates, or automations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <ScrollArea className="flex-shrink-0">
              <div className="flex gap-2 whitespace-nowrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, index) => (
          <WorkflowTemplateCard key={template.id} template={template} index={index} onSelect={setSelectedTemplate} />
        ))}
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <TemplatePreviewModal
          template={workflowTemplates.find((t) => t.id === selectedTemplate)!}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  )
}

function WorkflowTemplateCard({
  template,
  index,
  onSelect,
}: {
  template: WorkflowTemplate
  index: number
  onSelect: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        className={`border-2 transition-all cursor-pointer h-full ${
          hovered ? "border-primary shadow-lg scale-105" : "border-border"
        }`}
        onClick={() => onSelect(template.id)}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
              </div>
              {template.demoAvailable && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300 shrink-0">
                  <Play className="h-3 w-3 mr-1" />
                  Demo
                </Badge>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{template.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{template.installs.toLocaleString()} installs</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>{template.nodes} nodes</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {template.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {template.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{template.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Badge variant={template.price === "Free" ? "outline" : "default"} className="text-xs">
                {template.price === "Free" ? "Free" : template.price}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 px-3 text-xs gap-1">
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
                <Button variant="default" size="sm" className="h-7 px-3 text-xs gap-1">
                  <Download className="h-3 w-3" />
                  Import
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

