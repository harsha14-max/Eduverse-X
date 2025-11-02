"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Globe, MapPin, Shield } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ComplianceCheck {
  id: string
  region: string
  dataType: string
  compliance: "compliant" | "warning" | "non-compliant"
  regulations: string[]
  lastChecked: string
}

const complianceChecks: ComplianceCheck[] = [
  {
    id: "1",
    region: "EU (GDPR)",
    dataType: "Personal Data",
    compliance: "compliant",
    regulations: ["GDPR", "Data Protection"],
    lastChecked: "2 hours ago",
  },
  {
    id: "2",
    region: "California (CCPA)",
    dataType: "Personal Information",
    compliance: "compliant",
    regulations: ["CCPA", "Privacy Rights"],
    lastChecked: "1 day ago",
  },
  {
    id: "3",
    region: "Asia-Pacific",
    dataType: "Sensitive Data",
    compliance: "warning",
    regulations: ["APAC Data Laws"],
    lastChecked: "3 days ago",
  },
  {
    id: "4",
    region: "Restricted Zone",
    dataType: "All Data",
    compliance: "non-compliant",
    regulations: ["Restricted"],
    lastChecked: "Never",
  },
]

function RegionalComplianceChecker() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all")

  const filteredChecks =
    selectedRegion === "all"
      ? complianceChecks
      : complianceChecks.filter((c) => c.region === selectedRegion)

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case "compliant":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "non-compliant":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  const getComplianceIcon = (compliance: string) => {
    switch (compliance) {
      case "compliant":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "non-compliant":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Regional Compliance Checker</CardTitle>
              <CardDescription className="text-xs">
                Flags if data stored in non-compliant zones
              </CardDescription>
            </div>
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {complianceChecks.map((check) => (
                <SelectItem key={check.id} value={check.region}>
                  {check.region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Compliance Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-600">
              {complianceChecks.filter((c) => c.compliance === "compliant").length}
            </div>
            <div className="text-xs text-muted-foreground">Compliant</div>
          </div>
          <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-600">
              {complianceChecks.filter((c) => c.compliance === "warning").length}
            </div>
            <div className="text-xs text-muted-foreground">Warning</div>
          </div>
          <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="text-2xl font-bold text-red-600">
              {complianceChecks.filter((c) => c.compliance === "non-compliant").length}
            </div>
            <div className="text-xs text-muted-foreground">Non-Compliant</div>
          </div>
        </div>

        {/* Compliance Checks List */}
        <div className="space-y-2">
          {filteredChecks.map((check, index) => (
            <motion.div
              key={check.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 border rounded-lg transition-all ${getComplianceColor(check.compliance)}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getComplianceIcon(check.compliance)}
                  <div>
                    <div className="font-semibold text-sm">{check.region}</div>
                    <div className="text-xs text-muted-foreground">{check.dataType}</div>
                  </div>
                </div>
                <Badge
                  variant={
                    check.compliance === "compliant"
                      ? "default"
                      : check.compliance === "warning"
                      ? "secondary"
                      : "destructive"
                  }
                  className="text-xs shrink-0"
                >
                  {check.compliance}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {check.regulations.map((regulation, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {regulation}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                Last checked: {check.lastChecked}
              </div>
              {check.compliance === "non-compliant" && (
                <Button variant="destructive" size="sm" className="mt-2 h-7 px-3 text-xs">
                  Move Data
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
          <div className="text-xs text-muted-foreground">
            Regional Compliance Checker flags if data is stored in non-compliant zones. Non-compliant
            data should be moved to compliant regions.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { RegionalComplianceChecker }
