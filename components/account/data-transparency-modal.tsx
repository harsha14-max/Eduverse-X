"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Eye,
  Database,
  Lock,
  FileText,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const skillLogs = [
  {
    id: "1",
    action: "Skill Updated",
    skill: "React",
    source: "Course: React Complete Guide",
    timestamp: "2025-01-15 14:30:00",
    aiTracked: true,
  },
  {
    id: "2",
    action: "Project Added",
    project: "Weather App",
    source: "GitHub Auto-Sync",
    timestamp: "2025-01-15 12:15:00",
    aiTracked: true,
  },
  {
    id: "3",
    action: "Certificate Earned",
    certificate: "Machine Learning Specialization",
    source: "Coursera Integration",
    timestamp: "2025-01-15 10:00:00",
    aiTracked: true,
  },
]

export function DataTransparencyModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="h-4 w-4" />
          Data Transparency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Data Transparency & AI-Tracked Logs</DialogTitle>
          <DialogDescription>
            View how AI tracks your skills, projects, and achievements
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* AI Tracking Info */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-semibold mb-1">AI Skill Tracking</div>
                <div className="text-xs text-muted-foreground">
                  AI continuously monitors your learning activity from connected platforms (Coursera, GitHub, LinkedIn) and tracks skill progression automatically.
                </div>
              </div>
            </div>
          </div>

          {/* Skill Logs */}
          <div>
            <div className="text-sm font-semibold mb-3">AI-Tracked Activity Logs</div>
            <div className="space-y-2">
              {skillLogs.map((log, index) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-medium">{log.action}</div>
                        {log.aiTracked && (
                          <Badge variant="outline" className="text-xs gap-1">
                            <Lock className="h-3 w-3 text-primary" />
                            AI Tracked
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {log.action === "Skill Updated" && `Skill: ${log.skill}`}
                        {log.action === "Project Added" && `Project: ${log.project}`}
                        {log.action === "Certificate Earned" && `Certificate: ${log.certificate}`}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Source: {log.source}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {log.timestamp}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      View
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sources */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="text-sm font-semibold mb-2">Data Sources Tracked</div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>• Coursera API</div>
              <div>• GitHub API</div>
              <div>• LinkedIn API</div>
              <div>• Udemy Integration</div>
              <div>• Project Submissions</div>
              <div>• Manual Entry</div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-start gap-2">
              <Lock className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <div className="font-medium text-foreground mb-1">Privacy & Security</div>
                <div>All data is encrypted and stored on IPFS. Only you have access via your DID. AI tracking respects your privacy settings.</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

