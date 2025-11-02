"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Share2,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react"
import { AIPostSuggestions } from "./ai-post-suggestions"

const platforms = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    connected: true,
    automation: true,
    color: "text-blue-600",
  },
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    connected: true,
    automation: false,
    color: "text-gray-900",
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: Twitter,
    connected: true,
    automation: true,
    color: "text-sky-500",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    connected: false,
    automation: false,
    color: "text-pink-600",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    connected: false,
    automation: false,
    color: "text-red-600",
  },
]

export function SocialBrandingPanel() {
  const [platformsState, setPlatformsState] = useState(platforms)

  const handleToggleAutomation = (platformId: string) => {
    setPlatformsState((prev) =>
      prev.map((p) =>
        p.id === platformId ? { ...p, automation: !p.automation } : p
      )
    )
  }

  const handleConnect = (platformId: string) => {
    setPlatformsState((prev) =>
      prev.map((p) =>
        p.id === platformId ? { ...p, connected: true } : p
      )
    )
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Share2 className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Social Branding Integration</CardTitle>
            <CardDescription className="text-xs">
              Connect platforms and enable automation
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
        {/* Platform Connections */}
        <div className="space-y-3">
          <div className="text-sm font-semibold">Connected Platforms</div>
          {platformsState.map((platform) => {
            const Icon = platform.icon
            return (
              <Card
                key={platform.id}
                className={`border ${
                  platform.connected ? "border-primary/20 bg-primary/5" : "border-border"
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${platform.color}`} />
                      <div>
                        <div className="text-sm font-medium">{platform.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {platform.connected ? (
                            <Badge variant="outline" className="text-xs gap-1">
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs gap-1">
                              <XCircle className="h-3 w-3 text-gray-400" />
                              Not Connected
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {platform.connected ? (
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`automation-${platform.id}`} className="text-xs cursor-pointer">
                            Automation
                          </Label>
                          <Switch
                            id={`automation-${platform.id}`}
                            checked={platform.automation}
                            onCheckedChange={() => handleToggleAutomation(platform.id)}
                          />
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleConnect(platform.id)}
                          className="text-xs"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* AI Post Suggestions */}
        <div className="flex-1 overflow-hidden min-h-0">
          <AIPostSuggestions />
        </div>
      </CardContent>
    </Card>
  )
}

