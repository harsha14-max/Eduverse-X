"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Database, Eye, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DataVault {
  id: string
  type: "learning" | "social" | "automation" | "profile"
  name: string
  size: string
  created: string
  cid: string
  encrypted: boolean
}

export function DataVaultConsole() {
  const [selectedVault, setSelectedVault] = useState<string | null>(null)
  const [showCID, setShowCID] = useState<string | null>(null)

  const vaults: DataVault[] = [
    {
      id: "1",
      type: "learning",
      name: "Learning Logs",
      size: "2.4 MB",
      created: "2025-01-15",
      cid: "QmXyZ123abc...",
      encrypted: true,
    },
    {
      id: "2",
      type: "social",
      name: "Social Analytics",
      size: "1.8 MB",
      created: "2025-01-14",
      cid: "QmAbC456def...",
      encrypted: true,
    },
    {
      id: "3",
      type: "automation",
      name: "Automation Records",
      size: "3.2 MB",
      created: "2025-01-13",
      cid: "QmDeF789ghi...",
      encrypted: true,
    },
    {
      id: "4",
      type: "profile",
      name: "Profile Metadata",
      size: "0.5 MB",
      created: "2025-01-12",
      cid: "QmGhI012jkl...",
      encrypted: true,
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "learning":
        return "bg-blue-500/10 border-blue-500/20 text-blue-600"
      case "social":
        return "bg-purple-500/10 border-purple-500/20 text-purple-600"
      case "automation":
        return "bg-green-500/10 border-green-500/20 text-green-600"
      case "profile":
        return "bg-orange-500/10 border-orange-500/20 text-orange-600"
      default:
        return "bg-muted border-border text-muted-foreground"
    }
  }

  const copyCID = (cid: string) => {
    navigator.clipboard.writeText(cid)
    // You could add a toast notification here
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Data Vault Console</CardTitle>
            <CardDescription className="text-xs">
              Your decentralized data vault
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {vaults.map((vault, index) => {
          const isSelected = selectedVault === vault.id
          const showHash = showCID === vault.id
          
          return (
            <motion.div
              key={vault.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                } ${getTypeColor(vault.type)}`}
                onClick={() => setSelectedVault(isSelected ? null : vault.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Database className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">{vault.name}</h4>
                        {vault.encrypted && (
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{vault.size}</span>
                        <span>•</span>
                        <span>{vault.created}</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-border/50 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">IPFS CID:</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowCID(showHash ? null : vault.id)
                            }}
                            className="text-xs text-primary hover:underline"
                          >
                            {showHash ? <Eye className="h-3 w-3" /> : "Show"}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              copyCID(vault.cid)
                            }}
                            className="text-xs text-primary hover:underline"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <a
                            href={`https://ipfs.io/ipfs/${vault.cid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                      <div className="p-2 rounded bg-background border border-border">
                        <code className="text-xs font-mono break-all">
                          {showHash ? vault.cid : "Qm••••••••••••••••"}
                        </code>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}

        <div className="pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3 text-primary" />
            <span>All data encrypted and stored on IPFS</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

