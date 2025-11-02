"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Shield,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Settings,
  Trash2,
} from "lucide-react"
import { ExplainabilityPanel } from "./explainability-panel"
import { RiskColorBar } from "./risk-color-bar"

interface Permission {
  id: string
  aiEntity: string
  resource: string
  read: boolean
  write: boolean
  admin: boolean
  riskLevel: "low" | "medium" | "high"
}

const permissions: Permission[] = [
  {
    id: "1",
    aiEntity: "AI Mentor",
    resource: "Learning Progress",
    read: true,
    write: false,
    admin: false,
    riskLevel: "low",
  },
  {
    id: "2",
    aiEntity: "AI Content Generator",
    resource: "Notion Workspace",
    read: true,
    write: true,
    admin: false,
    riskLevel: "medium",
  },
  {
    id: "3",
    aiEntity: "AI Portfolio Assistant",
    resource: "GitHub Repositories",
    read: true,
    write: false,
    admin: false,
    riskLevel: "low",
  },
  {
    id: "4",
    aiEntity: "AI Social Manager",
    resource: "LinkedIn Account",
    read: true,
    write: true,
    admin: false,
    riskLevel: "high",
  },
  {
    id: "5",
    aiEntity: "AI Automation Engine",
    resource: "Workflow Executions",
    read: true,
    write: true,
    admin: true,
    riskLevel: "high",
  },
]

function AIPermissionsMatrixV2() {
  const [permissionList, setPermissionList] = useState<Permission[]>(permissions)
  const [selectedPermissionId, setSelectedPermissionId] = useState<string | null>(null)
  const [splitView, setSplitView] = useState(true)

  const handleToggle = (permissionId: string, accessType: "read" | "write" | "admin") => {
    setPermissionList((prev) =>
      prev.map((perm) => {
        if (perm.id === permissionId) {
          return {
            ...perm,
            [accessType]: !perm[accessType],
          }
        }
        return perm
      })
    )
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "high":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Shield className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">AI Permissions Matrix v2</CardTitle>
              <CardDescription className="text-xs">
                Explainability Split View: Left = Matrix, Right = AI explains why
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSplitView(!splitView)}
              className="gap-2"
            >
              {splitView ? "Single View" : "Split View"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Split View */}
      {splitView ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Permissions Matrix */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold">Permissions Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {permissionList.map((permission, index) => (
                  <motion.div
                    key={permission.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border rounded-lg transition-all hover:border-primary/50 ${
                      selectedPermissionId === permission.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedPermissionId(permission.id)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {getRiskIcon(permission.riskLevel)}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{permission.aiEntity}</div>
                          <div className="text-xs text-muted-foreground">{permission.resource}</div>
                        </div>
                      </div>
                      <RiskColorBar riskLevel={permission.riskLevel} />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-blue-600" />
                          <Label className="text-xs">Read</Label>
                        </div>
                        <Switch
                          checked={permission.read}
                          onCheckedChange={() => handleToggle(permission.id, "read")}
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Edit className="h-4 w-4 text-yellow-600" />
                          <Label className="text-xs">Write</Label>
                        </div>
                        <Switch
                          checked={permission.write}
                          onCheckedChange={() => handleToggle(permission.id, "write")}
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-red-600" />
                          <Label className="text-xs">Admin</Label>
                        </div>
                        <Switch
                          checked={permission.admin}
                          onCheckedChange={() => handleToggle(permission.id, "admin")}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right: Explainability Panel */}
          <ExplainabilityPanel selectedPermissionId={selectedPermissionId || undefined} />
        </div>
      ) : (
        /* Single View */
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {permissionList.map((permission) => (
                <div key={permission.id} className="p-4 border rounded-lg">
                  <div className="font-semibold text-sm mb-2">{permission.aiEntity}</div>
                  <div className="text-xs text-muted-foreground mb-3">{permission.resource}</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Read</Label>
                      <Switch
                        checked={permission.read}
                        onCheckedChange={() => handleToggle(permission.id, "read")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Write</Label>
                      <Switch
                        checked={permission.write}
                        onCheckedChange={() => handleToggle(permission.id, "write")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Admin</Label>
                      <Switch
                        checked={permission.admin}
                        onCheckedChange={() => handleToggle(permission.id, "admin")}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { AIPermissionsMatrixV2 }
