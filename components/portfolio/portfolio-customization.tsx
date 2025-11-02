"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Palette,
  Eye,
  EyeOff,
  Sparkles,
  Layout,
  Monitor,
  Smartphone,
  Globe,
} from "lucide-react"
import { AIDesignMode } from "./ai-design-mode"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const themes = [
  { id: "modern", name: "Modern", description: "Clean and contemporary" },
  { id: "minimal", name: "Minimal", description: "Simple and elegant" },
  { id: "techy", name: "Techy", description: "Developer-focused" },
  { id: "creative", name: "Creative", description: "Artistic and vibrant" },
]

const sections = [
  { id: "skills", label: "Skill Graph", visible: true },
  { id: "projects", label: "Project Showcase", visible: true },
  { id: "certificates", label: "Certifications", visible: true },
  { id: "experience", label: "Experience Timeline", visible: true },
  { id: "social", label: "Social Branding", visible: true },
  { id: "growth", label: "Growth Insights", visible: true },
]

export function PortfolioCustomization() {
  const [selectedTheme, setSelectedTheme] = useState("modern")
  const [sectionsState, setSectionsState] = useState(sections)
  const [showAIMode, setShowAIMode] = useState(false)

  const handleToggleSection = (sectionId: string) => {
    setSectionsState((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, visible: !s.visible } : s))
    )
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Palette className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Portfolio Customization</CardTitle>
              <CardDescription className="text-xs">
                Customize your portfolio appearance and visibility
              </CardDescription>
            </div>
          </div>
          <Dialog open={showAIMode} onOpenChange={setShowAIMode}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Sparkles className="h-4 w-4" />
                AI Design Mode
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>AI Design Mode</DialogTitle>
                <DialogDescription>
                  Get AI-powered design recommendations for your portfolio
                </DialogDescription>
              </DialogHeader>
              <AIDesignMode onApply={(theme) => setSelectedTheme(theme)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div>
          <div className="text-sm font-semibold mb-3">Select Theme</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {themes.map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all ${
                  selectedTheme === theme.id
                    ? "border-primary border-2 bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <CardContent className="p-4">
                  <div className="text-sm font-medium mb-1">{theme.name}</div>
                  <div className="text-xs text-muted-foreground">{theme.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section Visibility */}
        <div>
          <div className="text-sm font-semibold mb-3">Section Visibility</div>
          <div className="space-y-3">
            {sectionsState.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border"
              >
                <div className="flex items-center gap-2">
                  {section.visible ? (
                    <Eye className="h-4 w-4 text-primary" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Label htmlFor={`section-${section.id}`} className="text-sm cursor-pointer">
                    {section.label}
                  </Label>
                </div>
                <Switch
                  id={`section-${section.id}`}
                  checked={section.visible}
                  onCheckedChange={() => handleToggleSection(section.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-medium">Preview</div>
          </div>
          <div className="text-xs text-muted-foreground">
            Your portfolio is using the <strong>{themes.find((t) => t.id === selectedTheme)?.name}</strong> theme.
            {sectionsState.filter((s) => s.visible).length} sections are visible.
          </div>
        </div>

        {/* Personal Domain (Placeholder) */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">Personal Domain</div>
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            Connect your custom domain to showcase your portfolio professionally
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe className="h-3 w-3" />
            Connect Domain
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

