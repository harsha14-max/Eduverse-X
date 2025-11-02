"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Edit,
  Globe,
  Link2,
  Wallet,
  RefreshCw,
  Sparkles,
  MapPin,
  GraduationCap,
  Briefcase,
  CheckCircle2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getAuth } from "@/lib/auth"

export function ProfileOverviewCard() {
  const [authUser, setAuthUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    headline: "AI Developer | Innovator | Tech Enthusiast",
    tagline: "Building the future, one line of code at a time",
    location: "San Francisco, CA",
    education: "B.S. Computer Science, Stanford University",
    experience: "5+ years building AI-powered applications",
    did: null as string | null,
    wallet: null as string | null,
  })
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)

  useEffect(() => {
    const user = getAuth()
    if (user) {
      setAuthUser(user)
      setProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
      }))
    }
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    // In real app, save to backend
  }

  const handleGenerateTagline = () => {
    // Simulate AI generation
    setAiSuggestion("AI-driven Product Builder | Crafting Human + Machine Experiences")
  }

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setProfile((prev) => ({
      ...prev,
      wallet: "0x1234...5678",
    }))
  }

  const handleLinkDID = () => {
    // Simulate DID linking
    setProfile((prev) => ({
      ...prev,
      did: "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
    }))
  }

  const handleSyncPlatforms = () => {
    // Simulate platform sync
    // In real app, sync from LinkedIn, GitHub, etc.
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarImage src="/api/placeholder/80/80" alt={profile.name} />
              <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold mb-1">{profile.name}</CardTitle>
              <CardDescription className="text-base mb-2">{profile.headline}</CardDescription>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>Update your profile information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="headline">Headline</Label>
                    <Input
                      id="headline"
                      value={profile.headline}
                      onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                      className="mt-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 gap-2"
                      onClick={handleGenerateTagline}
                    >
                      <Sparkles className="h-3 w-3" />
                      AI Suggest Better Headline
                    </Button>
                    {aiSuggestion && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <div className="text-sm font-medium mb-1">AI Suggestion:</div>
                        <div className="text-sm text-muted-foreground mb-2">{aiSuggestion}</div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setProfile({ ...profile, headline: aiSuggestion })
                            setAiSuggestion(null)
                          }}
                        >
                          Use This
                        </Button>
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Textarea
                      id="tagline"
                      value={profile.tagline}
                      onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      value={profile.education}
                      onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience Summary</Label>
                    <Textarea
                      id="experience"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* AI Tagline */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-semibold mb-1">Your Growth Statement</div>
                <div className="text-sm text-muted-foreground">{profile.tagline}</div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Education</div>
                <div className="text-sm">{profile.education}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Briefcase className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Experience</div>
                <div className="text-sm">{profile.experience}</div>
              </div>
            </div>
          </div>

          {/* Identity & Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
            {profile.did ? (
              <Badge variant="outline" className="gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                DID Linked
              </Badge>
            ) : (
              <Button variant="outline" size="sm" onClick={handleLinkDID} className="gap-2">
                <Link2 className="h-4 w-4" />
                Link DID
              </Button>
            )}

            {profile.wallet ? (
              <Badge variant="outline" className="gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                Wallet Connected
              </Badge>
            ) : (
              <Button variant="outline" size="sm" onClick={handleConnectWallet} className="gap-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={handleSyncPlatforms} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Sync Platforms
            </Button>

            <Button variant="outline" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              View Public Portfolio
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

