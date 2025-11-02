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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Eye, Edit, Lock, Globe, ImagePlus } from "lucide-react"

interface PublishToGalleryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTitle?: string
  defaultDescription?: string
}

export function PublishToGallery({
  open,
  onOpenChange,
  defaultTitle = "",
  defaultDescription = "",
}: PublishToGalleryProps) {
  const [title, setTitle] = useState(defaultTitle)
  const [description, setDescription] = useState(defaultDescription)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [thumbnail, setThumbnail] = useState("/api/placeholder/400/300")
  const [visibility, setVisibility] = useState<"public" | "remix" | "readonly" | "private">("public")
  const [allowRemix, setAllowRemix] = useState(true)

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publish to Gallery</DialogTitle>
          <DialogDescription>
            Create a card for publishing automations to the community gallery
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., LinkedIn Auto Poster with AI"
              className="mt-2"
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your automation..."
              rows={4}
              className="mt-2"
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                placeholder="Add tag..."
                className="flex-1"
              />
              <Button size="sm" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag}
                  <span className="ml-1">×</span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <Label>Thumbnail</Label>
            <div className="mt-2 flex items-center gap-4">
              <div className="w-32 h-24 rounded border border-border overflow-hidden bg-muted flex-shrink-0">
                <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <ImagePlus className="h-4 w-4" />
                Upload Image
              </Button>
            </div>
          </div>

          {/* Visibility Settings */}
          <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/30">
            <Label>Visibility & Access</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="visibility-public" className="text-sm">
                    Public Gallery
                  </Label>
                </div>
                <Switch
                  id="visibility-public"
                  checked={visibility === "public"}
                  onCheckedChange={(checked) => setVisibility(checked ? "public" : "private")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="allow-remix" className="text-sm">
                    Allow Remix
                  </Label>
                </div>
                <Switch
                  id="allow-remix"
                  checked={allowRemix}
                  onCheckedChange={setAllowRemix}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="readonly" className="text-sm">
                    Read-Only View
                  </Label>
                </div>
                <Switch
                  id="readonly"
                  checked={visibility === "readonly"}
                  onCheckedChange={(checked) => setVisibility(checked ? "readonly" : "public")}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 rounded-lg border border-border bg-muted/30">
            <Label className="mb-3 block">Preview as Public Card</Label>
            <div className="rounded-lg border border-border overflow-hidden bg-background">
              <div className="h-48 bg-muted relative overflow-hidden">
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">{title || "Card Title"}</h4>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {description || "Card description"}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Publish to Gallery
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

