"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Clock, Copy, CheckCircle2, RefreshCw } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TemporalToken {
  id: string
  token: string
  duration: string
  expiresAt: string
  resource: string
  status: "active" | "expired"
}

function TemporalAccessTokenGenerator() {
  const [duration, setDuration] = useState("24")
  const [resource, setResource] = useState("")
  const [tokens, setTokens] = useState<TemporalToken[]>([])
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  const generateToken = () => {
    // Frontend-only: generate mock token
    const newToken: TemporalToken = {
      id: Date.now().toString(),
      token: `temp_${Math.random().toString(36).substring(2, 15)}`,
      duration: `${duration} hours`,
      expiresAt: new Date(Date.now() + parseInt(duration) * 60 * 60 * 1000).toLocaleString(),
      resource: resource || "All Resources",
      status: "active",
    }
    setTokens([newToken, ...tokens])
    setResource("")
  }

  const handleCopy = (token: string) => {
    navigator.clipboard.writeText(token)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Temporal Access Token Generator</CardTitle>
            <CardDescription className="text-xs">
              Generate temporary access tokens with expiration
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Token Generator Form */}
        <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-2">
            <Label htmlFor="resource" className="text-sm">
              Resource/Service
            </Label>
            <Input
              id="resource"
              placeholder="e.g., Notion Workspace, GitHub Repos"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm">
              Duration
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="6">6 hours</SelectItem>
                <SelectItem value="12">12 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
                <SelectItem value="72">3 days</SelectItem>
                <SelectItem value="168">1 week</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateToken} className="w-full gap-2">
            <RefreshCw className="h-4 w-4" />
            Generate Token
          </Button>
        </div>

        {/* Generated Tokens List */}
        {tokens.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-semibold">Generated Tokens</div>
            {tokens.map((token) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 border rounded-lg bg-background"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs break-all mb-1">{token.token}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Expires: {token.expiresAt}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Resource: {token.resource}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopy(token.token)}
                    >
                      {copiedToken === token.token ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Badge
                      variant={token.status === "active" ? "default" : "outline"}
                      className="text-xs"
                    >
                      {token.status}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-xs text-muted-foreground">
            Temporal tokens automatically expire after the specified duration. They provide
            time-limited access for AI services and integrations.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { TemporalAccessTokenGenerator }
