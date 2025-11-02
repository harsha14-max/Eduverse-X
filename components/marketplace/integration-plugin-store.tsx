"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plug,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Settings,
  ExternalLink,
  Eye,
  Zap,
  TrendingUp,
  Users,
  Sparkles,
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
import { AICompatibleWorkflows } from "./ai-compatible-workflows"

interface Plugin {
  id: string
  name: string
  category: string
  status: "connected" | "available" | "update-available"
  logo?: string
  description: string
  workflows: number
  lastSync?: string
  permissions: string[]
  verified: boolean
  updateAvailable?: boolean
}

const plugins: Plugin[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "Social Platforms",
    status: "connected",
    description: "Post educational insights and connect with professionals",
    workflows: 5,
    lastSync: "30m ago",
    permissions: ["Read", "Write", "AI-Access"],
    verified: true,
  },
  {
    id: "notion",
    name: "Notion",
    category: "Productivity Apps",
    status: "connected",
    description: "Sync knowledge base and automate note-taking",
    workflows: 3,
    lastSync: "1h ago",
    permissions: ["Read", "Write"],
    verified: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "Social Platforms",
    status: "connected",
    description: "Share visual learning content and stories",
    workflows: 2,
    lastSync: "2h ago",
    permissions: ["Read", "Write"],
    verified: true,
  },
  {
    id: "github",
    name: "GitHub",
    category: "Developer APIs",
    status: "available",
    description: "Automate code syncing and portfolio updates",
    workflows: 6,
    permissions: ["Read", "Write"],
    verified: true,
  },
  {
    id: "telegram",
    name: "Telegram",
    category: "Social Platforms",
    status: "update-available",
    description: "Send automated updates and notifications",
    workflows: 4,
    lastSync: "3h ago",
    permissions: ["Read", "Write"],
    verified: true,
    updateAvailable: true,
  },
  {
    id: "coursera",
    name: "Coursera",
    category: "EdTech Tools",
    status: "available",
    description: "Track course progress and achievements",
    workflows: 1,
    permissions: ["Read"],
    verified: false,
  },
]

export function IntegrationPluginStore() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const router = useRouter()

  const categories = ["all", "Social Platforms", "EdTech Tools", "Productivity Apps", "Developer APIs", "Cloud Services"]

  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || plugin.category === selectedCategory

    return matchesSearch && matchesCategory
  })


  const handleConnect = (pluginId: string) => {
    // In production, this would trigger OAuth or Wallet Connect flow
    console.log(`Connecting ${pluginId}...`)
    // Simulate connection
    setTimeout(() => {
      console.log(`${pluginId} connected!`)
    }, 1000)
  }

  const handleManagePermissions = (pluginId: string) => {
    // Navigate to Section 13's permission manager
    router.push(`/dashboard/account?tab=governance&action=permissions&plugin=${pluginId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Plug className="h-5 w-5 text-primary" />
              Integration Plugin Store
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI-Powered Recommendations
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
                placeholder="Search plugins, integrations, or apps..."
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

      {/* Plugins Grid */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All Plugins</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlugins.map((plugin, index) => (
              <PluginCard
                key={plugin.id}
                plugin={plugin}
                index={index}
                onConnect={handleConnect}
                onManagePermissions={handleManagePermissions}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlugins
              .filter((p) => p.status === "connected")
              .map((plugin, index) => (
                <PluginCard
                  key={plugin.id}
                  plugin={plugin}
                  index={index}
                  onConnect={handleConnect}
                  onManagePermissions={handleManagePermissions}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlugins
              .filter((p) => p.status === "available")
              .map((plugin, index) => (
                <PluginCard
                  key={plugin.id}
                  plugin={plugin}
                  index={index}
                  onConnect={handleConnect}
                  onManagePermissions={handleManagePermissions}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PluginCard({
  plugin,
  index,
  onConnect,
  onManagePermissions,
}: {
  plugin: Plugin
  index: number
  onConnect: (id: string) => void
  onManagePermissions: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const [connected, setConnected] = useState(plugin.status === "connected")

  const handleConnectClick = () => {
    onConnect(plugin.id)
    setConnected(true)
    // Simulate connection animation
    setTimeout(() => {
      // Connection complete
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        className={`border-2 transition-all h-full ${
          hovered && connected ? "border-primary shadow-lg scale-105" : "border-border"
        } ${connected ? "bg-green-50/30 border-green-300" : ""}`}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Plug className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{plugin.name}</h3>
                    {plugin.verified && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300 shrink-0">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{plugin.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {(() => {
                  switch (plugin.status) {
                    case "connected":
                      return <CheckCircle2 className="h-4 w-4 text-green-600" />
                    case "available":
                      return <XCircle className="h-4 w-4 text-gray-400" />
                    case "update-available":
                      return <AlertCircle className="h-4 w-4 text-yellow-600" />
                    default:
                      return null
                  }
                })()}
                {plugin.updateAvailable && (
                  <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-300">
                    Update
                  </Badge>
                )}
              </div>
            </div>

            {/* Status */}
            <Badge
              variant="outline"
              className={`text-xs ${
                plugin.status === "connected"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : plugin.status === "update-available"
                  ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              {plugin.status === "connected"
                ? "Connected"
                : plugin.status === "update-available"
                ? "Update Available"
                : "Available"}
            </Badge>

            {/* AI Summary */}
            {connected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-2 rounded-lg bg-primary/5 border border-primary/20"
              >
                <div className="flex items-start gap-2">
                  <Sparkles className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <strong>AI can now post educational insights on your {plugin.name}.</strong>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stats */}
            {connected && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span>{plugin.workflows} workflows</span>
                </div>
                {plugin.lastSync && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Last sync: {plugin.lastSync}</span>
                  </div>
                )}
              </div>
            )}

            {/* Permissions */}
            {plugin.permissions.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {plugin.permissions.map((permission) => (
                  <Badge key={permission} variant="outline" className="text-xs">
                    {permission}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              {connected ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 text-xs"
                    onClick={() => onManagePermissions(plugin.id)}
                  >
                    <Settings className="h-3 w-3" />
                    Manage Permissions
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 text-xs">
                        <Eye className="h-3 w-3" />
                        Try Automation
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>AI-Compatible Workflows</DialogTitle>
                        <DialogDescription>
                          Top 3 workflows that work with {plugin.name}
                        </DialogDescription>
                      </DialogHeader>
                      <AICompatibleWorkflows pluginId={plugin.id} />
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 gap-2 text-xs"
                  onClick={handleConnectClick}
                >
                  <Plug className="h-3 w-3" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


