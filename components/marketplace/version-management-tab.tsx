"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, CheckCircle2, AlertCircle, Clock, XCircle, FileText } from "lucide-react"

interface Version {
  id: string
  version: string
  changelog: string
  status: "pending" | "live" | "rejected"
  uploadedAt: string
  reviewedAt?: string
}

const versions: Version[] = [
  {
    id: "1",
    version: "1.3.0",
    changelog: "Added new AI features and improved performance",
    status: "live",
    uploadedAt: "2024-12-15",
    reviewedAt: "2024-12-15",
  },
  {
    id: "2",
    version: "1.2.0",
    changelog: "Fixed bugs and added compatibility with Notion v3",
    status: "live",
    uploadedAt: "2024-12-10",
    reviewedAt: "2024-12-10",
  },
  {
    id: "3",
    version: "1.4.0",
    changelog: "Major update with new automation features",
    status: "pending",
    uploadedAt: "2024-12-20",
  },
]

export function VersionManagementTab() {
  const [newVersion, setNewVersion] = useState({ version: "", changelog: "" })
  const [uploading, setUploading] = useState(false)

  const handleUploadVersion = () => {
    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      setNewVersion({ version: "", changelog: "" })
      // In production, this would add the version to the list
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-700 border-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload New Version */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload New Version
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="version">Version Number</Label>
            <Input
              id="version"
              placeholder="e.g., 1.4.0"
              value={newVersion.version}
              onChange={(e) => setNewVersion({ ...newVersion, version: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="changelog">Changelog</Label>
            <Textarea
              id="changelog"
              placeholder="Describe what's new in this version..."
              value={newVersion.changelog}
              onChange={(e) => setNewVersion({ ...newVersion, changelog: e.target.value })}
              rows={6}
            />
          </div>

          <Button
            onClick={handleUploadVersion}
            disabled={uploading || !newVersion.version || !newVersion.changelog}
            className="w-full gap-2"
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload Version"}
          </Button>
        </CardContent>
      </Card>

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Version History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {versions.map((version, index) => (
                <motion.div
                  key={version.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-sm">v{version.version}</h4>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                version.status === "live"
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : version.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                  : "bg-red-100 text-red-700 border-red-300"
                              }`}
                            >
                              {(() => {
                                switch (version.status) {
                                  case "live":
                                    return <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  case "pending":
                                    return <Clock className="h-4 w-4 text-yellow-600" />
                                  case "rejected":
                                    return <XCircle className="h-4 w-4 text-red-600" />
                                  default:
                                    return null
                                }
                              })()}
                              <span className="ml-1 capitalize">{version.status}</span>
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{version.changelog}</p>
                          <div className="text-xs text-muted-foreground">
                            Uploaded: {version.uploadedAt}
                            {version.reviewedAt && ` • Reviewed: ${version.reviewedAt}`}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}


