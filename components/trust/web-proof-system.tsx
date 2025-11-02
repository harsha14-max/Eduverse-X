"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  FileText,
  Link as LinkIcon,
} from "lucide-react"

const webProofs = [
  {
    id: "1",
    source: "GitHub Repository",
    url: "https://github.com/username/weather-app",
    hash: "0x1234567890abcdef",
    verified: true,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    source: "LinkedIn Post",
    url: "https://linkedin.com/posts/...",
    hash: "0xabcdef1234567890",
    verified: true,
    timestamp: "1 day ago",
  },
  {
    id: "3",
    source: "Coursera Certificate",
    url: "https://coursera.org/certificate/...",
    hash: "0x9876543210fedcba",
    verified: true,
    timestamp: "3 days ago",
  },
]

export function WebProofSystem() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Web Proof System</CardTitle>
            <CardDescription className="text-xs">
              Source verification and data integrity checks
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Verification Info */}
          <div className="p-4 rounded-lg border border-border bg-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <div className="text-sm font-semibold">All Sources Verified</div>
            </div>
            <div className="text-xs text-muted-foreground">
              All portfolio items have verified source links with hash verification
            </div>
          </div>

          {/* Web Proofs */}
          <div>
            <div className="text-sm font-semibold mb-3">Verified Web Proofs</div>
            <div className="space-y-3">
              {webProofs.map((proof, index) => (
                <motion.div
                  key={proof.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {proof.verified ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        )}
                        <div className="text-sm font-semibold">{proof.source}</div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            proof.verified
                              ? "bg-green-50 text-green-700 border-green-300"
                              : "bg-yellow-50 text-yellow-700 border-yellow-300"
                          }`}
                        >
                          {proof.verified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                    </div>

                    {/* URL */}
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                      <LinkIcon className="h-3 w-3 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground font-mono flex-1 truncate">
                        {proof.url}
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Hash */}
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground font-mono">
                        Hash: {proof.hash}
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Timestamp */}
                    <div className="text-xs text-muted-foreground">{proof.timestamp}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Verification Summary */}
          <div className="p-4 rounded-lg border border-green-200 bg-green-50/50">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-green-900">Verification Summary</div>
              <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-400">
                {webProofs.filter((p) => p.verified).length} / {webProofs.length} Verified
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

