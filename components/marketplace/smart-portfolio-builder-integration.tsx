"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  Plus,
  Video,
  Image,
  FileText,
  Link as LinkIcon,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Eye,
  Share2,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AIPortfolioSuggestions } from "./ai-portfolio-suggestions"

interface PortfolioItem {
  id: string
  title: string
  description: string
  type: "project" | "achievement" | "certificate" | "post"
  thumbnail?: string
  demoVideo?: string
  link?: string
  marketplaceLinked: boolean
  marketplaceTemplateId?: string
  shareableUrl?: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "AI Essay Summarizer",
    description: "Automation workflow for summarizing essays",
    type: "project",
    marketplaceLinked: true,
    marketplaceTemplateId: "1",
    shareableUrl: "https://eduverse.ai/portfolio/ai-essay-summarizer",
  },
  {
    id: "2",
    title: "Social Media Growth Pack",
    description: "Complete suite for social media automation",
    type: "project",
    marketplaceLinked: true,
    marketplaceTemplateId: "2",
    shareableUrl: "https://eduverse.ai/portfolio/social-growth-pack",
  },
]

export function SmartPortfolioBuilderIntegration() {
  const [activeTab, setActiveTab] = useState("items")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    type: "project" as const,
    link: "",
  })

  const handleAddItem = () => {
    // In production, this would add item to portfolio
    console.log("Adding portfolio item...", newItem)
    setShowAddModal(false)
    setNewItem({ title: "", description: "", type: "project", link: "" })
  }

  const handleLinkToMarketplace = (itemId: string) => {
    // In production, this would link portfolio item to marketplace template
    console.log(`Linking portfolio item ${itemId} to marketplace`)
  }

  const handleGenerateShareableUrl = (itemId: string) => {
    // In production, this would generate shareable URL
    console.log(`Generating shareable URL for ${itemId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Smart Portfolio Builder
            </CardTitle>
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Portfolio Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Portfolio Item</DialogTitle>
                  <DialogDescription>
                    Showcase your automations, projects, or achievements
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., AI Essay Summarizer"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your portfolio item..."
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      value={newItem.type}
                      onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="project">Project</option>
                      <option value="achievement">Achievement</option>
                      <option value="certificate">Certificate</option>
                      <option value="post">Post</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link">Link (Optional)</Label>
                    <Input
                      id="link"
                      placeholder="https://..."
                      value={newItem.link}
                      onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddItem} className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="items">Portfolio Items</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace Linked</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioItems.map((item, index) => (
              <PortfolioItemCard
                key={item.id}
                item={item}
                index={index}
                onLinkToMarketplace={handleLinkToMarketplace}
                onGenerateShareableUrl={handleGenerateShareableUrl}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioItems
              .filter((item) => item.marketplaceLinked)
              .map((item, index) => (
                <PortfolioItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  onLinkToMarketplace={handleLinkToMarketplace}
                  onGenerateShareableUrl={handleGenerateShareableUrl}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Suggestions */}
      <AIPortfolioSuggestions />
    </div>
  )
}

function PortfolioItemCard({
  item,
  index,
  onLinkToMarketplace,
  onGenerateShareableUrl,
}: {
  item: PortfolioItem
  index: number
  onLinkToMarketplace: (id: string) => void
  onGenerateShareableUrl: (id: string) => void
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
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                  {item.marketplaceLinked && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300 shrink-0">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Linked
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              </div>
              <Badge variant="outline" className="text-xs capitalize shrink-0">
                {item.type}
              </Badge>
            </div>

            {/* Type Icon */}
            <div className="flex items-center gap-2">
              {item.type === "project" && <Briefcase className="h-4 w-4 text-primary" />}
              {item.type === "achievement" && <FileText className="h-4 w-4 text-primary" />}
              {item.type === "certificate" && <FileText className="h-4 w-4 text-primary" />}
              {item.type === "post" && <FileText className="h-4 w-4 text-primary" />}
              <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              {!item.marketplaceLinked && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-xs"
                  onClick={() => onLinkToMarketplace(item.id)}
                >
                  <LinkIcon className="h-3 w-3" />
                  Link to Marketplace
                </Button>
              )}
              {item.shareableUrl ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-xs"
                  onClick={() => window.open(item.shareableUrl, "_blank")}
                >
                  <ExternalLink className="h-3 w-3" />
                  View
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-xs"
                  onClick={() => onGenerateShareableUrl(item.id)}
                >
                  <Share2 className="h-3 w-3" />
                  Generate URL
                </Button>
              )}
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Eye className="h-3 w-3" />
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

