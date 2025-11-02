"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft,
  Shield,
  Key,
  Database,
  Sparkles,
  Check,
  Eye,
  EyeOff,
  Copy,
  ExternalLink
} from "lucide-react"
import { IdentityCard } from "./identity-card"

interface DIDProfileCreationProps {
  onboardingData: any
  onComplete: (data: { profile: any }) => void
  onBack: () => void
}

export function DIDProfileCreation({ onboardingData, onComplete, onBack }: DIDProfileCreationProps) {
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    skills: [] as string[],
    interests: [] as string[],
    didHash: "",
    ipfsHash: "",
  })
  const [skillInput, setSkillInput] = useState("")
  const [interestInput, setInterestInput] = useState("")
  const [showDID, setShowDID] = useState(false)

  const generateDID = () => {
    // Simulate DID generation
    const mockDID = `did:eduverse:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    const mockIPFS = `Qm${Math.random().toString(36).substring(2, 44)}`
    setProfileData((prev) => ({
      ...prev,
      didHash: mockDID,
      ipfsHash: mockIPFS,
    }))
  }

  const addSkill = () => {
    if (skillInput.trim() && !profileData.skills.includes(skillInput.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addInterest = () => {
    if (interestInput.trim() && !profileData.interests.includes(interestInput.trim())) {
      setProfileData((prev) => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()],
      }))
      setInterestInput("")
    }
  }

  const removeInterest = (interest: string) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleContinue = () => {
    if (!profileData.didHash) {
      generateDID()
    }
    setTimeout(() => {
      onComplete({ profile: profileData })
    }, 500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile Form */}
        <Card className="border-border shadow-lg">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-bold">Create Your Profile</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            <CardDescription className="text-base mt-2">
              Set up your decentralized identity (DID) profile
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                placeholder="Your name"
                value={profileData.displayName}
                onChange={(e) => setProfileData((prev) => ({ ...prev, displayName: e.target.value }))}
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={profileData.bio}
                onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-primary-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <Label>Interests</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an interest"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                />
                <Button type="button" onClick={addInterest}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.interests.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    <span>{interest}</span>
                    <button
                      onClick={() => removeInterest(interest)}
                      className="hover:text-secondary-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* DID Generation */}
            {!profileData.didHash && (
              <div className="p-4 rounded-lg border border-border bg-muted/50">
                <div className="flex items-start gap-3 mb-3">
                  <Key className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Decentralized Identity (DID)</h4>
                    <p className="text-sm text-muted-foreground">
                      Your profile will be encrypted and stored on IPFS. Click below to generate your DID.
                    </p>
                  </div>
                </div>
                <Button onClick={generateDID} variant="outline" className="w-full">
                  Generate DID
                </Button>
              </div>
            )}

            {/* DID Display */}
            {profileData.didHash && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <Label className="text-sm font-semibold">Your DID</Label>
                    </div>
                    <button
                      onClick={() => setShowDID(!showDID)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {showDID ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded bg-background border border-border">
                    <code className="text-xs font-mono flex-1 break-all">
                      {showDID ? profileData.didHash : "did:eduverse:••••••••••••••••"}
                    </code>
                    <button
                      onClick={() => copyToClipboard(profileData.didHash)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      <Label className="text-sm font-semibold">IPFS Hash</Label>
                    </div>
                    <a
                      href={`https://ipfs.io/ipfs/${profileData.ipfsHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center gap-1"
                    >
                      View <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="p-3 rounded bg-background border border-border">
                    <code className="text-xs font-mono break-all">{profileData.ipfsHash}</code>
                  </div>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button
                size="lg"
                onClick={handleContinue}
                disabled={!profileData.displayName || !profileData.didHash}
                className="min-w-[150px]"
              >
                Complete Setup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Identity Preview Card */}
        <div className="lg:sticky lg:top-6 h-fit">
          <IdentityCard profile={profileData} onboardingData={onboardingData} />
        </div>
      </div>
    </div>
  )
}

