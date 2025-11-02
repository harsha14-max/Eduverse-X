"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Info,
} from "lucide-react"
import { AISecurityCoach } from "./ai-security-coach"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const permissions = [
  {
    id: "1",
    user: "Sara Johnson",
    resource: "Portfolio",
    level: "Write",
    status: "safe",
    date: "2025-01-15",
  },
  {
    id: "2",
    user: "Mike Chen",
    resource: "Automation Workflows",
    level: "Admin",
    status: "warning",
    date: "2025-01-14",
  },
  {
    id: "3",
    user: "Riya Patel",
    resource: "Analytics Data",
    level: "Read",
    status: "safe",
    date: "2025-01-13",
  },
  {
    id: "4",
    user: "External User",
    resource: "All Resources",
    level: "Write",
    status: "danger",
    date: "2025-01-12",
  },
]

export function PermissionPanel() {
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "danger":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "danger":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const filteredPermissions = permissions.filter(
    (perm) => filterStatus === "all" || perm.status === filterStatus
  )

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Permission & Access Control</CardTitle>
              <CardDescription className="text-xs">
                Manage user permissions and access levels
              </CardDescription>
            </div>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="safe">Safe</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="danger">Danger</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
        {/* AI Security Coach */}
        <div className="shrink-0">
          <AISecurityCoach />
        </div>

        {/* Permission Matrix */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="text-sm font-semibold mb-3">Permission Matrix</div>
          <div className="space-y-2">
            {filteredPermissions.map((perm, index) => (
              <motion.div
                key={perm.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`border-2 ${
                    perm.status === "safe"
                      ? "border-green-300 bg-green-50/50"
                      : perm.status === "warning"
                      ? "border-yellow-300 bg-yellow-50/50"
                      : "border-red-300 bg-red-50/50"
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon(perm.status)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-sm font-medium">{perm.user}</div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="outline" className="text-xs cursor-help">
                                    {perm.level}
                                    <Info className="h-3 w-3 ml-1 inline" />
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="text-xs space-y-1">
                                    <div className="font-semibold mb-1">{perm.level} Access</div>
                                    {perm.level === "Read" && (
                                      <div>• View-only access<br/>• Cannot modify data<br/>• Safe for external users</div>
                                    )}
                                    {perm.level === "Write" && (
                                      <div>• Can create and edit<br/>• Cannot delete<br/>• Best for collaborators</div>
                                    )}
                                    {perm.level === "Admin" && (
                                      <div>• Full access including delete<br/>• Can manage permissions<br/>• Use only for trusted team members</div>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">{perm.resource}</div>
                          <div className="text-xs text-muted-foreground">{perm.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={`w-3 h-3 rounded-full ${getStatusColor(perm.status)} cursor-help`}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                {perm.status === "safe" && "Permission is safe and follows best practices"}
                                {perm.status === "warning" && "Review recommended: Admin access granted to non-core member"}
                                {perm.status === "danger" && "Security risk: External user has Write/Admin access"}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

