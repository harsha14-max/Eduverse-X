"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Network,
  CheckCircle2,
  Award,
  TrendingUp,
  ExternalLink,
  Shield,
} from "lucide-react"

const reputationMetrics = {
  did: "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
  score: 892,
  verifiedActions: 45,
  reputationGrowth: "+12% this month",
}

const verifiedActions = [
  {
    id: "1",
    action: "Portfolio Update",
    type: "verified",
    timestamp: "2 hours ago",
    hash: "0x1234...5678",
  },
  {
    id: "2",
    action: "Social Post Published",
    type: "verified",
    timestamp: "1 day ago",
    hash: "0xabcd...efgh",
  },
  {
    id: "3",
    action: "Certificate Added",
    type: "verified",
    timestamp: "3 days ago",
    hash: "0x9876...5432",
  },
]

export function DIDReputationLayer() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Network className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">DID-Based Reputation Layer</CardTitle>
            <CardDescription className="text-xs">
              Reputation score connected to your decentralized identity
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* DID Identity */}
        <div className="p-4 rounded-lg border border-border bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <div className="text-xs font-semibold">Decentralized Identity (DID)</div>
          </div>
          <div className="text-xs text-muted-foreground font-mono break-all mb-3">
            {reputationMetrics.did}
          </div>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <ExternalLink className="h-3 w-3" />
            View on Explorer
          </Button>
        </div>

        {/* Reputation Score */}
        <div className="p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <div className="text-sm font-semibold">Reputation Score</div>
            </div>
            <div className="text-2xl font-bold text-primary">{reputationMetrics.score}</div>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(reputationMetrics.score / 1000) * 100}%` }}
              transition={{ delay: 0.2, duration: 1 }}
              className="h-full bg-primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {reputationMetrics.verifiedActions} verified actions
            </div>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
              <TrendingUp className="h-3 w-3 mr-1" />
              {reputationMetrics.reputationGrowth}
            </Badge>
          </div>
        </div>

        {/* Verified Actions */}
        <div>
          <div className="text-sm font-semibold mb-3">Recent Verified Actions</div>
          <div className="space-y-2">
            {verifiedActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <div className="text-xs font-medium">{action.action}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground font-mono">{action.hash}</div>
                  <div className="text-xs text-muted-foreground">{action.timestamp}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

