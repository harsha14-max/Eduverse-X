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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  RefreshCw,
  Award,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Info,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AddCertificateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const aiRecommendations = [
  {
    id: "1",
    certificate: "Machine Learning Specialization",
    organization: "Coursera",
    reason: "High demand skill that complements your Python expertise",
    impact: "High",
    match: "92%",
  },
  {
    id: "2",
    certificate: "AWS Solutions Architect",
    organization: "AWS",
    reason: "Aligns with your cloud infrastructure learning goals",
    impact: "Medium",
    match: "85%",
  },
  {
    id: "3",
    certificate: "React Complete Guide",
    organization: "Udemy",
    reason: "Builds on your frontend development skills",
    impact: "Medium",
    match: "88%",
  },
]

export function AddCertificateModal({ open, onOpenChange }: AddCertificateModalProps) {
  const [certificate, setCertificate] = useState({
    organization: "",
    courseName: "",
    date: "",
    category: "Technical",
    source: "Manual",
  })
  const [isSyncing, setIsSyncing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showAIRecommendations, setShowAIRecommendations] = useState(true)

  const handleSyncFromPlatform = (platform: string) => {
    setIsSyncing(true)
    // Simulate platform sync
    setTimeout(() => {
      setCertificate({
        organization: platform === "Coursera" ? "Coursera" : platform === "Udemy" ? "Udemy" : "LinkedIn Learning",
        courseName: `${platform} Course Completion`,
        date: new Date().toISOString().split("T")[0],
        category: "Technical",
        source: platform,
      })
      setIsSyncing(false)
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload
      setTimeout(() => {
        setCertificate({
          ...certificate,
          organization: "Uploaded Certificate",
          courseName: file.name,
        })
        setIsUploading(false)
      }, 1500)
    }
  }

  const handleSave = () => {
    // In real app, save to backend
    onOpenChange(false)
    setCertificate({
      organization: "",
      courseName: "",
      date: "",
      category: "Technical",
      source: "Manual",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Certificate</DialogTitle>
          <DialogDescription>
            Add a certificate manually or sync from connected platforms
          </DialogDescription>
        </DialogHeader>

        {/* AI Recommendations */}
        {showAIRecommendations && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <div className="text-sm font-semibold">AI Certificate Recommendations</div>
                <Badge variant="outline" className="text-xs">For You</Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowAIRecommendations(false)}
              >
                ×
              </Button>
            </div>
            <ScrollArea className="max-h-48">
              <div className="space-y-3">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border border-border bg-background cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => {
                      setCertificate({
                        organization: rec.organization,
                        courseName: rec.certificate,
                        date: new Date().toISOString().split("T")[0],
                        category: "Technical",
                        source: "AI Recommended",
                      })
                      setShowAIRecommendations(false)
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="h-4 w-4 text-primary" />
                          <div className="text-sm font-medium">{rec.certificate}</div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              rec.impact === "High" ? "bg-green-50 text-green-700 border-green-300" :
                              "bg-yellow-50 text-yellow-700 border-yellow-300"
                            }`}
                          >
                            {rec.impact} Impact
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{rec.organization}</div>
                        <div className="text-xs text-muted-foreground flex items-start gap-2">
                          <Info className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                          <span>{rec.reason}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        {rec.match} Match
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}

        <Tabs defaultValue="manual" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="sync">Sync Platform</TabsTrigger>
            <TabsTrigger value="upload">Upload PDF</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="organization">Issuing Organization</Label>
              <Input
                id="organization"
                value={certificate.organization}
                onChange={(e) => setCertificate({ ...certificate, organization: e.target.value })}
                className="mt-1"
                placeholder="Coursera, Udemy, Google, etc."
              />
            </div>

            <div>
              <Label htmlFor="courseName">Course/Certificate Name</Label>
              <Input
                id="courseName"
                value={certificate.courseName}
                onChange={(e) => setCertificate({ ...certificate, courseName: e.target.value })}
                className="mt-1"
                placeholder="Machine Learning Specialization"
              />
            </div>

            <div>
              <Label htmlFor="date">Completion Date</Label>
              <Input
                id="date"
                type="date"
                value={certificate.date}
                onChange={(e) => setCertificate({ ...certificate, date: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={certificate.category}
                onChange={(e) => setCertificate({ ...certificate, category: e.target.value })}
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Technical">Technical</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Creative">Creative</option>
                <option value="Leadership">Leadership</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="text-sm font-medium mb-2">Sync from Connected Platforms</div>

              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => handleSyncFromPlatform("Coursera")}
                disabled={isSyncing}
              >
                <Award className="h-4 w-4" />
                {isSyncing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Syncing from Coursera...
                  </>
                ) : (
                  "Sync from Coursera"
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => handleSyncFromPlatform("Udemy")}
                disabled={isSyncing}
              >
                <Award className="h-4 w-4" />
                Sync from Udemy
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => handleSyncFromPlatform("LinkedIn Learning")}
                disabled={isSyncing}
              >
                <Award className="h-4 w-4" />
                Sync from LinkedIn Learning
              </Button>

              {certificate.source !== "Manual" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-primary/5 border border-primary/20 mt-4"
                >
                  <div className="text-sm font-medium mb-2">Synced Certificate Data:</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div><strong>Organization:</strong> {certificate.organization}</div>
                    <div><strong>Course:</strong> {certificate.courseName}</div>
                    <div><strong>Date:</strong> {certificate.date}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="text-sm font-medium mb-2">Upload Certificate (PDF/Image)</div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm font-medium mb-1">Upload Certificate</div>
                <div className="text-xs text-muted-foreground mb-3">
                  PDF or Image files (max 10MB)
                </div>
                <label htmlFor="certificate-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>Choose File</span>
                  </Button>
                  <input
                    id="certificate-upload"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                {isUploading && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Uploading...
                  </div>
                )}
              </div>

              {certificate.courseName && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-primary/5 border border-primary/20"
                >
                  <div className="text-sm font-medium mb-2">File Uploaded:</div>
                  <div className="text-sm text-muted-foreground">{certificate.courseName}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    AI is analyzing the certificate to extract information...
                  </div>
                </motion.div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Add Certificate</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

