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
import { Switch } from "@/components/ui/switch"
import {
  Upload,
  Link as LinkIcon,
  Globe,
  Lock,
  Sparkles,
} from "lucide-react"

interface AddTileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTileAdded: () => void
}

export function AddTileModal({ open, onOpenChange, onTileAdded }: AddTileModalProps) {
  const [tile, setTile] = useState({
    title: "",
    description: "",
    proof: "",
    privacy: "public",
    crossPost: false,
    platforms: [] as string[],
  })

  const handleSave = () => {
    // In production, save to backend and IPFS
    onTileAdded()
    setTile({
      title: "",
      description: "",
      proof: "",
      privacy: "public",
      crossPost: false,
      platforms: [],
    })
  }

  const handleTogglePlatform = (platform: string) => {
    setTile((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Tile</DialogTitle>
          <DialogDescription>
            Add a project, post, or learning milestone to your portfolio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={tile.title}
              onChange={(e) => setTile({ ...tile, title: e.target.value })}
              placeholder="Weather App Project"
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={tile.description}
              onChange={(e) => setTile({ ...tile, description: e.target.value })}
              placeholder="Built with React and OpenWeather API..."
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Proof/Link */}
          <div>
            <Label htmlFor="proof">Proof (GitHub Repo Link, etc.)</Label>
            <div className="flex items-center gap-2 mt-1">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <Input
                id="proof"
                value={tile.proof}
                onChange={(e) => setTile({ ...tile, proof: e.target.value })}
                placeholder="https://github.com/username/project"
                className="flex-1"
              />
            </div>
          </div>

          {/* Privacy Level */}
          <div>
            <Label>Privacy Level</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { value: "public", label: "Public", icon: Globe },
                { value: "private", label: "Private", icon: Lock },
                { value: "tokenized", label: "Tokenized", icon: Sparkles },
              ].map((option) => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.value}
                    variant={tile.privacy === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTile({ ...tile, privacy: option.value })}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {option.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Cross-Posting */}
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <Label htmlFor="cross-post" className="text-sm font-medium">
                  Also post to social platforms
                </Label>
              </div>
              <Switch
                id="cross-post"
                checked={tile.crossPost}
                onCheckedChange={(checked) => setTile({ ...tile, crossPost: checked })}
              />
            </div>
            {tile.crossPost && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2 mt-3"
              >
                {["LinkedIn", "Twitter/X", "Dev.to"].map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center justify-between p-2 rounded border border-border cursor-pointer hover:border-primary/50"
                    onClick={() => handleTogglePlatform(platform)}
                  >
                    <div className="text-sm">{platform}</div>
                    <Badge
                      variant={tile.platforms.includes(platform) ? "default" : "outline"}
                      className="text-xs"
                    >
                      {tile.platforms.includes(platform) ? "Selected" : "Select"}
                    </Badge>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!tile.title || !tile.description}>
            Add Tile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

