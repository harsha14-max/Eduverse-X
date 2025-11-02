"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Github,
  Globe,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { ProjectCard } from "./project-card"
import { AddProjectModal } from "./add-project-modal"

const projects = [
  {
    id: "1",
    title: "Weather Prediction App",
    description: "Real-time weather prediction app using OpenWeather API and React",
    techStack: ["React", "TypeScript", "OpenWeather API", "Tailwind CSS"],
    thumbnail: "/api/placeholder/400/250",
    category: "Technical",
    tags: ["AI Generated Summary", "Verified Skill"],
    result: "15K+ downloads, 4.8★ rating",
    source: "GitHub",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "E-Commerce Dashboard",
    description: "Admin dashboard for managing e-commerce operations with real-time analytics",
    techStack: ["Next.js", "PostgreSQL", "D3.js", "Recharts"],
    thumbnail: "/api/placeholder/400/250",
    category: "Technical",
    tags: ["Team Project"],
    result: "Used by 50+ merchants",
    source: "Behance",
    date: "2024-02-20",
  },
  {
    id: "3",
    title: "AI Content Generator",
    description: "AI-powered tool for generating marketing content using GPT-4",
    techStack: ["Python", "FastAPI", "OpenAI API", "React"],
    thumbnail: "/api/placeholder/400/250",
    category: "AI/ML",
    tags: ["AI Generated Summary"],
    result: "10K+ pieces of content generated",
    source: "Medium",
    date: "2024-03-10",
  },
]

const categories = ["All", "Technical", "Creative", "Academic", "Team", "AI/ML"]

export function ProjectShowcase() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Card className="border-border shadow-sm h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <FolderOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Project Showcase</CardTitle>
                <CardDescription className="text-xs">
                  AI-curated portfolio of your projects
                </CardDescription>
              </div>
            </div>
            <Button size="sm" onClick={() => setShowAddModal(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
          {/* Search & Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* AI Auto-Fetch Status */}
          <Card className="border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                AI is scanning your connected platforms for new projects...
              </span>
            </div>
          </Card>

          {/* Projects Grid */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <div className="text-sm">No projects found</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddProjectModal open={showAddModal} onOpenChange={setShowAddModal} />
    </>
  )
}

