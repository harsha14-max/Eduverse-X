"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, RefreshCw, Database, HardDrive } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface BackupStatus {
  id: string
  keyName: string
  backedUpToIPFS: boolean
  backedUpToFilecoin: boolean
  backupHash?: string
  lastBackup: string
}

const backupStatuses: BackupStatus[] = [
  {
    id: "1",
    keyName: "GitHub Personal Access Token",
    backedUpToIPFS: true,
    backedUpToFilecoin: true,
    backupHash: "QmXxxx...",
    lastBackup: "2 hours ago",
  },
  {
    id: "2",
    keyName: "LinkedIn API Key",
    backedUpToIPFS: true,
    backedUpToFilecoin: false,
    backupHash: "QmYyyy...",
    lastBackup: "1 day ago",
  },
  {
    id: "3",
    keyName: "Notion Integration Key",
    backedUpToIPFS: false,
    backedUpToFilecoin: false,
    lastBackup: "Never",
  },
  {
    id: "4",
    keyName: "DID Private Key",
    backedUpToIPFS: true,
    backedUpToFilecoin: true,
    backupHash: "QmZzzz...",
    lastBackup: "5 hours ago",
  },
]

function AutoBackupVerifier() {
  const [statuses, setStatuses] = useState<BackupStatus[]>(backupStatuses)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = () => {
    setIsVerifying(true)
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
    }, 2000)
  }

  const totalKeys = statuses.length
  const fullyBackedUp = statuses.filter(
    (s) => s.backedUpToIPFS && s.backedUpToFilecoin
  ).length
  const partiallyBackedUp = statuses.filter(
    (s) => s.backedUpToIPFS && !s.backedUpToFilecoin
  ).length
  const notBackedUp = statuses.filter((s) => !s.backedUpToIPFS && !s.backedUpToFilecoin).length

  const backupPercentage = Math.round((fullyBackedUp / totalKeys) * 100)

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Database className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Auto Backup Verifier</CardTitle>
              <CardDescription className="text-xs">
                Frontend checks if each key is replicated to IPFS/Filecoin
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleVerify}
            disabled={isVerifying}
          >
            <RefreshCw className={`h-4 w-4 ${isVerifying ? "animate-spin" : ""}`} />
            Verify
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Backup Summary */}
        <div className="p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Backup Status</div>
            <div className="text-2xl font-bold text-primary">{backupPercentage}%</div>
          </div>
          <Progress value={backupPercentage} className="h-2 mb-3" />
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium text-green-600">{fullyBackedUp}</div>
              <div className="text-muted-foreground">Fully Backed Up</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-yellow-600">{partiallyBackedUp}</div>
              <div className="text-muted-foreground">Partial</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-red-600">{notBackedUp}</div>
              <div className="text-muted-foreground">Not Backed Up</div>
            </div>
          </div>
        </div>

        {/* Backup Status List */}
        <div className="space-y-2">
          {statuses.map((status, index) => (
            <motion.div
              key={status.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 border rounded-lg transition-all ${
                status.backedUpToIPFS && status.backedUpToFilecoin
                  ? "bg-green-500/10 border-green-500/20"
                  : status.backedUpToIPFS
                  ? "bg-yellow-500/10 border-yellow-500/20"
                  : "bg-red-500/10 border-red-500/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm mb-1">{status.keyName}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>Last backup: {status.lastBackup}</span>
                  </div>
                  {status.backupHash && (
                    <div className="text-xs font-mono text-muted-foreground">
                      Hash: {status.backupHash}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {status.backedUpToIPFS ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-xs">IPFS</span>
                </div>
                <div className="flex items-center gap-1">
                  {status.backedUpToFilecoin ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-xs">Filecoin</span>
                </div>
                {(!status.backedUpToIPFS || !status.backedUpToFilecoin) && (
                  <Button variant="outline" size="sm" className="h-7 px-3 text-xs ml-auto">
                    Backup Now
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-xs text-muted-foreground">
            Keys are automatically backed up to IPFS and Filecoin for redundancy. Backup
            verification happens periodically.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { AutoBackupVerifier }
