"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Lock, CheckCircle2, Link2 } from "lucide-react"

interface AuditChainLink {
  id: string
  action: string
  timestamp: string
  hash: string
  previousHash: string
  verified: boolean
}

const auditChainLinks: AuditChainLink[] = [
  {
    id: "1",
    action: "AI requested Twitter Write Access",
    timestamp: "2025-01-15 10:00:00",
    hash: "0x1234567890abcdef",
    previousHash: "0x0000000000000000",
    verified: true,
  },
  {
    id: "2",
    action: "Course data exported to IPFS",
    timestamp: "2025-01-14 15:30:00",
    hash: "0xabcdef1234567890",
    previousHash: "0x1234567890abcdef",
    verified: true,
  },
  {
    id: "3",
    action: "AI requested Notion Write Access",
    timestamp: "2025-01-13 09:15:00",
    hash: "0x9876543210fedcba",
    previousHash: "0xabcdef1234567890",
    verified: true,
  },
  {
    id: "4",
    action: "Permission expired",
    timestamp: "2025-01-12 14:20:00",
    hash: "0xfedcba9876543210",
    previousHash: "0x9876543210fedcba",
    verified: true,
  },
]

function ImmutableAuditChainViewer() {
  const [selectedLink, setSelectedLink] = useState<string | null>(null)

  const activeLink = auditChainLinks.find((l) => l.id === selectedLink)

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* Chain Visualization */}
        <div className="p-4 bg-muted rounded-lg border border-border">
          <div className="text-sm font-semibold mb-3">Immutable Audit Chain (IACV)</div>
          <div className="space-y-3">
            {auditChainLinks.map((link, index) => (
              <div key={link.id} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                      selectedLink === link.id
                        ? "border-primary bg-primary/20 shadow-lg"
                        : link.verified
                        ? "border-green-500 bg-green-500/10"
                        : "border-red-500 bg-red-500/10"
                    }`}
                    onClick={() => setSelectedLink(link.id === selectedLink ? null : link.id)}
                  >
                    {link.verified ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Lock className="h-5 w-5 text-red-600" />
                    )}
                  </motion.div>
                  {index < auditChainLinks.length - 1 && (
                    <div className="w-0.5 h-8 bg-border" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm mb-1">{link.action}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    Hash: {link.hash.substring(0, 16)}...
                  </div>
                  <div className="text-xs text-muted-foreground">{link.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Link Details */}
        {activeLink && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-primary/5 rounded-lg border border-primary/20"
          >
            <div className="font-semibold text-sm mb-2">{activeLink.action}</div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-medium">Timestamp:</span> {activeLink.timestamp}
              </div>
              <div>
                <span className="font-medium">Hash:</span>{" "}
                <span className="font-mono text-muted-foreground">{activeLink.hash}</span>
              </div>
              <div>
                <span className="font-medium">Previous Hash:</span>{" "}
                <span className="font-mono text-muted-foreground">
                  {activeLink.previousHash}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3 text-green-600" />
                <span className="text-muted-foreground">Verified: {activeLink.verified ? "Yes" : "No"}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info */}
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-xs text-muted-foreground">
            Immutable Audit Chain Viewer (IACV) shows a blockchain-like timeline with cryptographic
            hash of each event. Each link is verified and linked to the previous hash.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { ImmutableAuditChainViewer }
