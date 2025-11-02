"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Eye, EyeOff, Lock, Database, Key, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DataUsage {
  id: string
  service: string
  dataType: string
  purpose: string
  accessLevel: "read" | "write" | "read+write"
  encrypted: boolean
  location: "ipfs" | "supabase" | "local"
}

export function SecurityTransparencyPanel() {
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const dataUsage: DataUsage[] = [
    {
      id: "1",
      service: "Learning Analytics",
      dataType: "Course progress, completion rates, hours studied",
      purpose: "Generate insights and recommendations",
      accessLevel: "read",
      encrypted: true,
      location: "ipfs",
    },
    {
      id: "2",
      service: "Social Manager",
      dataType: "Post drafts, engagement metrics",
      purpose: "Auto-generate and schedule posts",
      accessLevel: "read+write",
      encrypted: true,
      location: "ipfs",
    },
    {
      id: "3",
      service: "Automation Engine",
      dataType: "Workflow triggers, execution logs",
      purpose: "Run automated workflows",
      accessLevel: "read+write",
      encrypted: true,
      location: "ipfs",
    },
    {
      id: "4",
      service: "AI Chat",
      dataType: "Conversation history, preferences",
      purpose: "Context-aware responses",
      accessLevel: "read",
      encrypted: true,
      location: "ipfs",
    },
    {
      id: "5",
      service: "Session Cache",
      dataType: "Temporary session data",
      purpose: "Fast UI loading",
      accessLevel: "read",
      encrypted: false,
      location: "supabase",
    },
  ]

  const getAccessColor = (level: string) => {
    switch (level) {
      case "read":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "write":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "read+write":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getLocationIcon = (location: string) => {
    switch (location) {
      case "ipfs":
        return Database
      case "supabase":
        return Database
      case "local":
        return Lock
      default:
        return Database
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Security Transparency</CardTitle>
              <CardDescription className="text-xs">
                What data is used and stored
              </CardDescription>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Security & Privacy Policy</DialogTitle>
                <DialogDescription>
                  Understanding how EDUVERSE X handles your data
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Data Storage</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    • All sensitive data is encrypted and stored on IPFS (InterPlanetary File System)
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    • Only metadata and session cache stored in Supabase (temporary)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Your keys stay with you — EDUVERSE never stores private keys
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Access</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    • AI only accesses data you explicitly grant permission for
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    • All API tokens are encrypted before storage
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • You can revoke access at any time from Settings
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Privacy First</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    • No data is sold or shared with third parties
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    • All AI processing uses encrypted data references
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Full audit log available in your Data Vault
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {dataUsage.map((usage, index) => {
          const LocationIcon = getLocationIcon(usage.location)
          
          return (
            <motion.div
              key={usage.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer border-2 transition-all ${
                  showDetails === usage.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
                onClick={() => setShowDetails(showDetails === usage.id ? null : usage.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{usage.service}</h4>
                        {usage.encrypted && (
                          <Lock className="h-3 w-3 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {usage.dataType}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getAccessColor(usage.accessLevel)}`}>
                          {usage.accessLevel.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <LocationIcon className="h-3 w-3" />
                          <span>{usage.location.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {showDetails === usage.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-border"
                    >
                      <div>
                        <p className="text-xs font-medium mb-1">Purpose:</p>
                        <p className="text-xs text-muted-foreground">{usage.purpose}</p>
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

