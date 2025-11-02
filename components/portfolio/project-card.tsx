"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  Github,
  Globe,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  thumbnail: string
  category: string
  tags: string[]
  result: string
  source: string
  date: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getSourceIcon = () => {
    switch (project.source) {
      case "GitHub":
        return <Github className="h-4 w-4" />
      case "Behance":
      case "Medium":
      case "YouTube":
        return <Globe className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  return (
    <Card
      className="border-border hover:border-primary transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm truncate">{project.title}</h3>
                {project.tags.includes("AI Generated Summary") && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <Sparkles className="h-3 w-3" />
                    AI
                  </Badge>
                )}
                {project.tags.includes("Verified Skill") && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Thumbnail Preview */}
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            className="relative h-32 rounded-lg bg-muted overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <Globe className="h-8 w-8" />
            </div>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
              >
                <Button size="sm" variant="secondary" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  View
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {getSourceIcon()}
              <span>{project.source}</span>
              <span>•</span>
              <span>{project.date}</span>
            </div>
            <div className="text-xs font-medium text-primary">{project.result}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

