"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  GraduationCap, 
  Code, 
  Briefcase, 
  Palette, 
  Linkedin, 
  MessageSquare, 
  Sparkles,
  Calendar,
  Check,
  ArrowLeft,
  Lock,
  Link2
} from "lucide-react"

interface IntegrationHubProps {
  onboardingData: any
  onComplete: (data: { integrations: string[] }) => void
  onBack: () => void
}

interface Integration {
  id: string
  name: string
  category: "learning" | "developer" | "productivity" | "social" | "content" | "communication" | "ai"
  icon: any
  description: string
  color: string
}

export function IntegrationHub({ onboardingData, onComplete, onBack }: IntegrationHubProps) {
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([])

  const integrations: Integration[] = [
    // Learning
    { id: "coursera", name: "Coursera", category: "learning", icon: GraduationCap, description: "Sync your courses and certificates", color: "hover:bg-blue-50 hover:border-blue-300" },
    { id: "udemy", name: "Udemy", category: "learning", icon: GraduationCap, description: "Track your learning progress", color: "hover:bg-purple-50 hover:border-purple-300" },
    { id: "khan", name: "Khan Academy", category: "learning", icon: GraduationCap, description: "Import learning data", color: "hover:bg-green-50 hover:border-green-300" },
    { id: "edx", name: "edX", category: "learning", icon: GraduationCap, description: "Sync course completions", color: "hover:bg-blue-50 hover:border-blue-300" },
    { id: "youtube", name: "YouTube Edu", category: "learning", icon: GraduationCap, description: "Track educational videos", color: "hover:bg-red-50 hover:border-red-300" },
    
    // Developer
    { id: "github", name: "GitHub", category: "developer", icon: Code, description: "Sync repositories and contributions", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "gitlab", name: "GitLab", category: "developer", icon: Code, description: "Import projects and code", color: "hover:bg-orange-50 hover:border-orange-300" },
    { id: "replit", name: "Replit", category: "developer", icon: Code, description: "Sync coding projects", color: "hover:bg-blue-50 hover:border-blue-300" },
    { id: "stackoverflow", name: "Stack Overflow", category: "developer", icon: Code, description: "Track contributions", color: "hover:bg-orange-50 hover:border-orange-300" },
    { id: "codesandbox", name: "CodeSandbox", category: "developer", icon: Code, description: "Sync sandbox projects", color: "hover:bg-pink-50 hover:border-pink-300" },
    
    // Productivity
    { id: "notion", name: "Notion", category: "productivity", icon: Briefcase, description: "Import notes and databases", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "google-drive", name: "Google Drive", category: "productivity", icon: Briefcase, description: "Sync documents and files", color: "hover:bg-blue-50 hover:border-blue-300" },
    { id: "trello", name: "Trello", category: "productivity", icon: Briefcase, description: "Track projects and tasks", color: "hover:bg-blue-50 hover:border-blue-300" },
    { id: "clickup", name: "ClickUp", category: "productivity", icon: Briefcase, description: "Sync task management", color: "hover:bg-purple-50 hover:border-purple-300" },
    { id: "todoist", name: "Todoist", category: "productivity", icon: Briefcase, description: "Import tasks and goals", color: "hover:bg-red-50 hover:border-red-300" },
    { id: "asana", name: "Asana", category: "productivity", icon: Briefcase, description: "Sync projects and tasks", color: "hover:bg-fuchsia-50 hover:border-fuchsia-300" },
    
    // Social
    { id: "linkedin", name: "LinkedIn", category: "social", icon: Linkedin, description: "Sync professional profile", color: "hover:bg-blue-50 hover:border-blue-300" },
    { id: "twitter", name: "Twitter/X", category: "social", icon: MessageSquare, description: "Connect social presence", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "instagram", name: "Instagram", category: "social", icon: MessageSquare, description: "Sync content", color: "hover:bg-pink-50 hover:border-pink-300" },
    
    // Content
    { id: "canva", name: "Canva", category: "content", icon: Palette, description: "Sync design projects", color: "hover:bg-blue-50 hover:border-blue-300" },
    { id: "figma", name: "Figma", category: "content", icon: Palette, description: "Import design files", color: "hover:bg-purple-50 hover:border-purple-300" },
    { id: "miro", name: "Miro", category: "content", icon: Palette, description: "Sync visual workspaces", color: "hover:bg-orange-50 hover:border-orange-300" },
    
    // Communication
    { id: "slack", name: "Slack", category: "communication", icon: MessageSquare, description: "Connect workspace", color: "hover:bg-purple-50 hover:border-purple-300" },
    { id: "discord", name: "Discord", category: "communication", icon: MessageSquare, description: "Sync community", color: "hover:bg-indigo-50 hover:border-indigo-300" },
    { id: "zoom", name: "Zoom", category: "communication", icon: MessageSquare, description: "Connect meetings", color: "hover:bg-blue-50 hover:border-blue-300" },
    
    // AI
    { id: "chatgpt", name: "ChatGPT", category: "ai", icon: Sparkles, description: "Sync AI conversations", color: "hover:bg-green-50 hover:border-green-300" },
    { id: "claude", name: "Claude", category: "ai", icon: Sparkles, description: "Import AI interactions", color: "hover:bg-orange-50 hover:border-orange-300" },
    { id: "perplexity", name: "Perplexity", category: "ai", icon: Sparkles, description: "Track AI research", color: "hover:bg-blue-50 hover:border-blue-300" },
    
    // Analytics
    { id: "google-calendar", name: "Google Calendar", category: "productivity", icon: Calendar, description: "Sync events and schedules", color: "hover:bg-blue-50 hover:border-blue-300" },
  ]

  const categories = [
    { id: "learning", name: "Learning", icon: GraduationCap },
    { id: "developer", name: "Developer", icon: Code },
    { id: "productivity", name: "Productivity", icon: Briefcase },
    { id: "social", name: "Social", icon: Linkedin },
    { id: "content", name: "Content", icon: Palette },
    { id: "communication", name: "Communication", icon: MessageSquare },
    { id: "ai", name: "AI Tools", icon: Sparkles },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredIntegrations = selectedCategory
    ? integrations.filter((i) => i.category === selectedCategory)
    : integrations

  const toggleIntegration = (id: string) => {
    setConnectedIntegrations((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleConnect = (integration: Integration) => {
    console.log(`Connecting ${integration.name}...`)
    // Simulate OAuth flow
    setTimeout(() => {
      toggleIntegration(integration.id)
    }, 1000)
  }

  const handleContinue = () => {
    onComplete({ integrations: connectedIntegrations })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="border-border shadow-lg">
        <CardHeader className="border-b border-border pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold">Integration Hub</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <CardDescription className="text-base mt-2">
            Connect your favorite apps and services. Your data stays encrypted and secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All ({integrations.length})
            </Button>
            {categories.map((category) => {
              const Icon = category.icon
              const count = integrations.filter((i) => i.category === category.id).length
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name} ({count})
                </Button>
              )
            })}
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 max-h-[500px] overflow-y-auto pr-2">
            {filteredIntegrations.map((integration) => {
              const Icon = integration.icon
              const isConnected = connectedIntegrations.includes(integration.id)
              
              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`h-full border-2 transition-all cursor-pointer ${
                      isConnected
                        ? "border-primary bg-primary/5"
                        : `border-border ${integration.color}`
                    }`}
                    onClick={() => handleConnect(integration)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {isConnected && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold mb-1">{integration.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{integration.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        <span>Encrypted</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Connected Count */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 mb-6">
            <div>
              <p className="text-sm font-medium">
                {connectedIntegrations.length} integration{connectedIntegrations.length !== 1 ? "s" : ""} connected
              </p>
              <p className="text-xs text-muted-foreground">
                You can always add more later from your dashboard
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex items-center justify-end gap-4">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={connectedIntegrations.length === 0}
              className="min-w-[150px]"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

