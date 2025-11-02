"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Lock,
  Smartphone,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Key,
  LogOut,
} from "lucide-react"
import { AISecurityCoach } from "./ai-security-coach"
import { BehaviorMonitor } from "./behavior-monitor"
import { AITipBubbles } from "./ai-tip-bubbles"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [securityScore, setSecurityScore] = useState(85)

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Security & Authentication</CardTitle>
            <CardDescription className="text-xs">
              Manage security settings and authentication methods
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="settings" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
            <TabsTrigger value="coach" className="text-xs">AI Coach</TabsTrigger>
            <TabsTrigger value="monitor" className="text-xs">Behavior</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="flex-1 mt-4 overflow-y-auto min-h-0 space-y-4">
            {/* AI Tip Bubbles */}
            <AITipBubbles />

            {/* Two-Factor Authentication */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">Two-Factor Authentication</div>
                      <div className="text-xs text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="2fa" className="text-sm cursor-pointer">
                      {twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Label>
                    <Switch
                      id="2fa"
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                </div>
                {twoFactorEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <div className="text-xs font-medium text-green-900">2FA Active</div>
                    </div>
                    <div className="text-xs text-green-700">
                      Your account is protected with two-factor authentication. You'll need to enter a code from your authenticator app when signing in.
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Password Management */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="text-sm font-semibold mb-3">Password Management</div>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Key className="h-4 w-4" />
                    Change Password
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    Last changed: 30 days ago
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Management */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="text-sm font-semibold mb-3">Session Management</div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="session-timeout" className="text-xs">Session Timeout (minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out of All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="text-sm font-semibold mb-3">API Keys</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg border border-border">
                    <div className="text-xs">Production API Key</div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Regenerate
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg border border-border">
                    <div className="text-xs">Development API Key</div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Score */}
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div className="text-sm font-semibold">Security Score</div>
                  </div>
                  <Badge variant="outline" className="text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    {securityScore}/100
                  </Badge>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${securityScore}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-green-500"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Your security score is {securityScore >= 80 ? "excellent" : securityScore >= 60 ? "good" : "needs improvement"}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coach" className="flex-1 mt-4 overflow-y-auto min-h-0">
            <AISecurityCoach />
          </TabsContent>

          <TabsContent value="monitor" className="flex-1 mt-4 overflow-y-auto min-h-0">
            <BehaviorMonitor />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

