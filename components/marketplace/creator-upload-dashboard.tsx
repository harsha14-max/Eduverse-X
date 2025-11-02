"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  Image,
  Video,
  Save,
  Eye,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  BarChart3,
  Download,
  Sparkles,
  Shield,
  Globe,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AIValidationAssistant } from "./ai-validation-assistant"
import { CreatorEarningsPanel } from "./creator-earnings-panel"
import { VersionManagementTab } from "./version-management-tab"
import { SmartPortfolioBuilderIntegration } from "./smart-portfolio-builder-integration"

interface UploadForm {
  title: string
  description: string
  tags: string
  category: string
  price: string
  version: string
  thumbnail?: File
  demoVideo?: File
  documentation?: string
  storageOption: "supabase" | "ipfs"
}

export function CreatorUploadDashboard() {
  const [activeTab, setActiveTab] = useState("upload")
  const [form, setForm] = useState<UploadForm>({
    title: "",
    description: "",
    tags: "",
    category: "",
    price: "Free",
    version: "1.0.0",
    storageOption: "supabase",
  })
  const [preview, setPreview] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  const handleSubmit = () => {
    // In production, this would upload to marketplace
    console.log("Uploading template...", form)
    // Show success animation
    setTimeout(() => {
      console.log("Template uploaded successfully!")
    }, 2000)
  }

  const handleAISuggest = () => {
    // Simulate AI validation suggestions
    const suggestions = [
      "Add keywords like 'automation', 'study planner' for better discoverability",
      "Consider adding a demo video to increase engagement",
      "Tag with relevant technologies to improve search",
    ]
    setAiSuggestions(suggestions)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Creator Upload & Management Dashboard
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI-Powered
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., AI Essay Summarizer for Notion"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your template in detail..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="growth">Growth & Presence</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="learning">Learning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Select value={form.price} onValueChange={(value) => setForm({ ...form, price: value })}>
                    <SelectTrigger id="price">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="₹99">₹99</SelectItem>
                      <SelectItem value="₹199">₹199</SelectItem>
                      <SelectItem value="₹499">₹499</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., automation, AI, Notion, productivity"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>

              {/* Version */}
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  placeholder="e.g., 1.0.0"
                  value={form.version}
                  onChange={(e) => setForm({ ...form, version: e.target.value })}
                />
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Thumbnail</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Image className="h-4 w-4" />
                      Upload Image
                    </Button>
                    <span className="text-xs text-muted-foreground">PNG, JPG (max 5MB)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Demo Video (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Video className="h-4 w-4" />
                      Upload Video
                    </Button>
                    <span className="text-xs text-muted-foreground">MP4, MOV (max 50MB)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentation">Documentation (Markdown)</Label>
                  <Textarea
                    id="documentation"
                    placeholder="Write documentation in Markdown..."
                    value={form.documentation}
                    onChange={(e) => setForm({ ...form, documentation: e.target.value })}
                    rows={6}
                  />
                </div>
              </div>

              {/* Storage Option */}
              <div className="space-y-2">
                <Label>Storage Option</Label>
                <div className="flex gap-2">
                  <Button
                    variant={form.storageOption === "supabase" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setForm({ ...form, storageOption: "supabase" })}
                    className="flex-1 gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    Supabase
                  </Button>
                  <Button
                    variant={form.storageOption === "ipfs" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setForm({ ...form, storageOption: "ipfs" })}
                    className="flex-1 gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    IPFS (Decentralized)
                    {form.storageOption === "ipfs" && (
                      <Badge variant="outline" className="ml-1 text-xs bg-green-50 text-green-700 border-green-300">
                        Verified
                      </Badge>
                    )}
                  </Button>
                </div>
              </div>

              {/* AI Validation */}
              <AIValidationAssistant
                form={form}
                suggestions={aiSuggestions}
                onSuggest={handleAISuggest}
              />

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setPreview(true)} className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button onClick={handleSubmit} className="gap-2">
                    <Upload className="h-4 w-4" />
                    Publish Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {/* Preview Mode */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Preview Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-lg bg-muted border border-border">
                <div className="text-sm font-medium mb-4">How users will see your template:</div>
                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">{form.title || "Template Title"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {form.description || "Template description will appear here"}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{form.category || "Category"}</Badge>
                        <Badge variant={form.price === "Free" ? "outline" : "default"}>
                          {form.price}
                        </Badge>
                        {form.storageOption === "ipfs" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                            <Shield className="h-3 w-3 mr-1" />
                            Decentralized Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          <CreatorEarningsPanel />
        </TabsContent>

        <TabsContent value="versions" className="space-y-6">
          <VersionManagementTab />
        </TabsContent>

        {/* Smart Portfolio Builder Integration */}
        <div className="mt-6">
          <SmartPortfolioBuilderIntegration />
        </div>
      </Tabs>

      {/* Preview Dialog */}
      {preview && (
        <Dialog open={preview} onOpenChange={setPreview}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Template Preview</DialogTitle>
              <DialogDescription>
                This is how your template will appear to users in the marketplace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Preview card here - similar to marketplace template card */}
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">{form.title || "Template Title"}</h3>
                    <p className="text-sm text-muted-foreground">
                      {form.description || "Template description"}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{form.category}</Badge>
                      <Badge variant={form.price === "Free" ? "outline" : "default"}>
                        {form.price}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

