"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plug,
  Search,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Settings,
  ExternalLink,
  Eye,
  EyeOff,
  Edit,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const integrationCategories = [
  {
    category: "Communication",
    integrations: [
      { id: "slack", name: "Slack", status: "connected", workflows: 4, lastSync: "2h ago", permissions: ["Read", "Write", "AI-Access"] },
      { id: "discord", name: "Discord", status: "connected", workflows: 2, lastSync: "5h ago", permissions: ["Read", "Write"] },
      { id: "whatsapp", name: "WhatsApp Business", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
      { id: "gmail", name: "Gmail", status: "connected", workflows: 3, lastSync: "1h ago", permissions: ["Read", "Write"] },
    ],
  },
  {
    category: "Social Media",
    integrations: [
      { id: "linkedin", name: "LinkedIn", status: "connected", workflows: 5, lastSync: "30m ago", permissions: ["Read", "Write", "AI-Access"] },
      { id: "twitter", name: "Twitter/X", status: "connected", workflows: 3, lastSync: "1h ago", permissions: ["Read", "Write"] },
      { id: "instagram", name: "Instagram", status: "connected", workflows: 2, lastSync: "2h ago", permissions: ["Read", "Write"] },
      { id: "youtube", name: "YouTube", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
    ],
  },
  {
    category: "Learning",
    integrations: [
      { id: "coursera", name: "Coursera", status: "connected", workflows: 1, lastSync: "3h ago", permissions: ["Read"] },
      { id: "udemy", name: "Udemy", status: "connected", workflows: 1, lastSync: "4h ago", permissions: ["Read"] },
      { id: "khan", name: "Khan Academy", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
    ],
  },
  {
    category: "Productivity",
    integrations: [
      { id: "notion", name: "Notion", status: "connected", workflows: 3, lastSync: "1h ago", permissions: ["Read", "Write"] },
      { id: "googledrive", name: "Google Drive", status: "connected", workflows: 2, lastSync: "2h ago", permissions: ["Read", "Write"] },
      { id: "calendar", name: "Google Calendar", status: "connected", workflows: 4, lastSync: "30m ago", permissions: ["Read", "Write"] },
      { id: "todoist", name: "Todoist", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
    ],
  },
  {
    category: "Development",
    integrations: [
      { id: "github", name: "GitHub", status: "connected", workflows: 6, lastSync: "15m ago", permissions: ["Read", "Write", "AI-Access"] },
      { id: "replit", name: "Replit", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
      { id: "render", name: "Render", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
      { id: "vercel", name: "Vercel", status: "connected", workflows: 1, lastSync: "1h ago", permissions: ["Read"] },
    ],
  },
  {
    category: "AI Tools",
    integrations: [
      { id: "openai", name: "OpenAI", status: "connected", workflows: 8, lastSync: "5m ago", permissions: ["AI-Access"] },
      { id: "claude", name: "Claude", status: "connected", workflows: 6, lastSync: "10m ago", permissions: ["AI-Access"] },
      { id: "huggingface", name: "Hugging Face", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
      { id: "replicate", name: "Replicate", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
    ],
  },
  {
    category: "Cloud & Data",
    integrations: [
      { id: "supabase", name: "Supabase", status: "connected", workflows: 5, lastSync: "20m ago", permissions: ["Read", "Write", "AI-Access"] },
      { id: "ipfs", name: "IPFS", status: "connected", workflows: 3, lastSync: "1h ago", permissions: ["Write"] },
      { id: "filecoin", name: "Filecoin", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
      { id: "firebase", name: "Firebase", status: "disconnected", workflows: 0, lastSync: null, permissions: [] },
    ],
  },
]

export function IntegrationPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const router = useRouter()

  const filteredIntegrations = integrationCategories.filter((cat) =>
    cat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.integrations.some((int) => int.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "disconnected":
        return <XCircle className="h-4 w-4 text-gray-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-700 border-green-300"
      case "disconnected":
        return "bg-gray-100 text-gray-700 border-gray-300"
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
    }
  }

  const handleViewAnalytics = (integrationId: string) => {
    router.push(`/dashboard/analytics?filter=${integrationId}`)
  }

  return (
    <Card className="h-full border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Plug className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">Integrations</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {integrationCategories.reduce((sum, cat) => sum + cat.integrations.filter(i => i.status === "connected").length, 0)} Connected
          </Badge>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="p-4 space-y-6">
            {filteredIntegrations.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.integrations.map((integration) => (
                    <Card
                      key={integration.id}
                      className={`border-2 ${
                        integration.status === "connected"
                          ? "border-green-200 bg-green-50/50"
                          : "border-border"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 flex-1">
                            {getStatusIcon(integration.status)}
                            <span className="font-semibold text-sm">{integration.name}</span>
                          </div>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(integration.status)}`}>
                            {integration.status}
                          </Badge>
                        </div>

                        {/* AI-Generated Summary */}
                        {integration.status === "connected" && (
                          <div className="mb-3 p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">
                              <strong>Used in {integration.workflows} workflow{integration.workflows !== 1 ? 's' : ''}</strong>
                              {integration.lastSync && ` • Last sync: ${integration.lastSync}`}
                            </p>
                          </div>
                        )}

                        {/* Permissions */}
                        {integration.permissions.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {integration.permissions.map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {integration.status === "connected" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-2 text-xs"
                                onClick={() => handleViewAnalytics(integration.id)}
                              >
                                <BarChart3 className="h-3 w-3" />
                                View Analytics
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="icon" className="h-8 w-8">
                                    <Settings className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{integration.name} Settings</DialogTitle>
                                    <DialogDescription>
                                      Manage connection settings and permissions
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <div className="text-sm font-medium mb-2">Permissions</div>
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Read Access</span>
                                          <Badge variant="outline">Enabled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Write Access</span>
                                          <Badge variant="outline">Enabled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">AI Access</span>
                                          <Badge variant="outline">Enabled</Badge>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="pt-4 border-t border-border">
                                      <div className="text-sm font-medium mb-2">Connection Status</div>
                                      <div className="text-xs text-muted-foreground">
                                        Last sync: {integration.lastSync || "Never"}
                                      </div>
                                      <Button variant="outline" size="sm" className="mt-2 w-full">
                                        Refresh Token
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </>
                          ) : (
                            <Button variant="default" size="sm" className="flex-1 gap-2">
                              <Plug className="h-3 w-3" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

