"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, RefreshCw, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ConsistencyCheck {
  id: string
  field: string
  publicData: string
  decentralizedData: string
  status: "match" | "mismatch" | "missing"
}

const consistencyChecks: ConsistencyCheck[] = [
  {
    id: "1",
    field: "Name",
    publicData: "John Doe",
    decentralizedData: "John Doe",
    status: "match",
  },
  {
    id: "2",
    field: "Email",
    publicData: "john@example.com",
    decentralizedData: "john@example.com",
    status: "match",
  },
  {
    id: "3",
    field: "Skills",
    publicData: "React, TypeScript, Node.js",
    decentralizedData: "React, TypeScript, Node.js, Python",
    status: "mismatch",
  },
  {
    id: "4",
    field: "Certifications",
    publicData: "3 certifications",
    decentralizedData: "5 certifications",
    status: "mismatch",
  },
  {
    id: "5",
    field: "DID",
    publicData: "Not linked",
    decentralizedData: "did:example:123",
    status: "missing",
  },
]

function ProfileConsistencyChecker() {
  const [checks, setChecks] = useState<ConsistencyCheck[]>(consistencyChecks)
  const [isChecking, setIsChecking] = useState(false)

  const handleCheck = () => {
    setIsChecking(true)
    // Simulate consistency check
    setTimeout(() => {
      setIsChecking(false)
    }, 2000)
  }

  const matchCount = checks.filter((c) => c.status === "match").length
  const mismatchCount = checks.filter((c) => c.status === "mismatch").length
  const missingCount = checks.filter((c) => c.status === "missing").length
  const consistencyScore = Math.round((matchCount / checks.length) * 100)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "match":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "mismatch":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "missing":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "match":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "mismatch":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "missing":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <RefreshCw className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Profile Consistency Checker</CardTitle>
              <CardDescription className="text-xs">
                Ensures public data matches decentralized records
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleCheck}
            disabled={isChecking}
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
            Check Now
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Consistency Score */}
        <div className="p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Consistency Score</div>
            <div className="text-2xl font-bold text-primary">{consistencyScore}%</div>
          </div>
          <Progress value={consistencyScore} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <span>{matchCount} matches</span>
            <span>{mismatchCount} mismatches</span>
            <span>{missingCount} missing</span>
          </div>
        </div>

        {/* Consistency Checks */}
        <div className="space-y-2">
          {checks.map((check, index) => (
            <motion.div
              key={check.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-lg border ${getStatusColor(check.status)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {getStatusIcon(check.status)}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-1">{check.field}</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>
                        <span className="font-medium">Public:</span> {check.publicData}
                      </div>
                      <div>
                        <span className="font-medium">Decentralized:</span> {check.decentralizedData}
                      </div>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={check.status === "match" ? "default" : "destructive"}
                  className="text-xs shrink-0"
                >
                  {check.status}
                </Badge>
              </div>
              {check.status !== "match" && (
                <div className="mt-2 pt-2 border-t border-current/20">
                  <Button variant="outline" size="sm" className="h-7 px-3 text-xs w-full">
                    Sync Now
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export { ProfileConsistencyChecker }
