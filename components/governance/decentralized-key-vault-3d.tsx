"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react"

interface VaultKey {
  id: string
  name: string
  type: "API Key" | "Private Key" | "Access Token" | "DID"
  encrypted: boolean
  backedUp: boolean
  lastAccess: string
}

const vaultKeys: VaultKey[] = [
  {
    id: "1",
    name: "GitHub Personal Access Token",
    type: "Access Token",
    encrypted: true,
    backedUp: true,
    lastAccess: "2 hours ago",
  },
  {
    id: "2",
    name: "LinkedIn API Key",
    type: "API Key",
    encrypted: true,
    backedUp: true,
    lastAccess: "1 day ago",
  },
  {
    id: "3",
    name: "Notion Integration Key",
    type: "API Key",
    encrypted: true,
    backedUp: false,
    lastAccess: "3 days ago",
  },
  {
    id: "4",
    name: "DID Private Key",
    type: "Private Key",
    encrypted: true,
    backedUp: true,
    lastAccess: "Never",
  },
]

function DecentralizedKeyVault3D() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [vaultOpen, setVaultOpen] = useState(false)
  const [passphrase, setPassphrase] = useState("")
  const [showKeys, setShowKeys] = useState(false)

  const handleAuthenticate = () => {
    // Frontend-only: simulate authentication
    if (passphrase.length > 0) {
      setIsAuthenticated(true)
      setTimeout(() => {
        setVaultOpen(true)
      }, 500) // Simulate vault door opening animation
      setPassphrase("")
    }
  }

  // 3D Vault Scene Placeholder (Three.js would be used in production)
  const VaultScene3D = () => (
    <div className="w-full h-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-lg relative overflow-hidden border border-border">
      {/* Vault Door Visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={vaultOpen ? { rotateY: -90 } : { rotateY: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-48 h-48 bg-gradient-to-br from-yellow-900 to-yellow-700 rounded-full border-8 border-yellow-600 shadow-2xl flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {!vaultOpen ? (
            <Lock className="h-16 w-16 text-yellow-200" />
          ) : (
            <Unlock className="h-16 w-16 text-green-400" />
          )}
        </motion.div>
      </div>

      {/* Vault Opening Animation Overlay */}
      {vaultOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-green-500/20 flex items-center justify-center"
        >
          <CheckCircle2 className="h-20 w-20 text-green-400" />
        </motion.div>
      )}

      {/* Info Text */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="text-xs text-muted-foreground">
          {vaultOpen ? "Vault Unlocked" : "3D Vault Scene (Three.js in production)"}
        </div>
      </div>
    </div>
  )

  if (!isAuthenticated) {
    return (
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Decentralized Key Vault</CardTitle>
          <CardDescription className="text-xs">
            Authenticate with passphrase to access vault
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <VaultScene3D />
          <div className="space-y-2">
            <Label htmlFor="passphrase">Passphrase</Label>
            <div className="flex gap-2">
              <Input
                id="passphrase"
                type="password"
                placeholder="Enter vault passphrase"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAuthenticate()}
              />
              <Button onClick={handleAuthenticate}>Unlock</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Unlock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Decentralized Key Vault</CardTitle>
              <CardDescription className="text-xs">
                Vault unlocked — Managing encrypted keys
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
            Lock Vault
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 3D Vault Scene */}
        <VaultScene3D />

        {/* Keys List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Stored Keys</div>
            <Button variant="ghost" size="sm" onClick={() => setShowKeys(!showKeys)}>
              {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {vaultKeys.map((key, index) => (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm mb-1">{key.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Badge variant="outline" className="text-xs">
                      {key.type}
                    </Badge>
                    <span>Last access: {key.lastAccess}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {key.encrypted && (
                      <Badge variant="default" className="text-xs bg-green-600">
                        <Lock className="h-3 w-3 mr-1" />
                        Encrypted
                      </Badge>
                    )}
                    {key.backedUp ? (
                      <Badge variant="default" className="text-xs bg-blue-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Backed Up
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Not Backed Up
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export { DecentralizedKeyVault3D }
