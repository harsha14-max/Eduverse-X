"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Settings,
  Bell,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Volume2,
  VolumeX,
  Download,
  Trash2,
} from "lucide-react"

interface NotificationSettings {
  channels: {
    email: boolean
    push: boolean
    inApp: boolean
  }
  doNotDisturb: {
    enabled: boolean
    startTime: string
    endTime: string
  }
  grouping: "type" | "time"
  silentMode: boolean
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    channels: {
      email: true,
      push: false,
      inApp: true,
    },
    doNotDisturb: {
      enabled: false,
      startTime: "22:00",
      endTime: "08:00",
    },
    grouping: "type",
    silentMode: false,
  })

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notificationSettings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load settings", e)
      }
    }
  }, [])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("notificationSettings", JSON.stringify(settings))
  }, [settings])

  const handleExport = () => {
    // Export notification logs as CSV (mock)
    const csv = "Date,Time,Title,Description,Type,Status\n" // Would include actual data
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "notifications-export.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all notifications? This cannot be undone.")) {
      localStorage.removeItem("notificationReadState")
      localStorage.removeItem("notificationContext")
      // In production, would also clear from backend
      alert("All notifications cleared")
    }
  }

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notification Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="email">Email Notifications</Label>
                <div className="text-xs text-muted-foreground">
                  Receive notifications via email
                </div>
              </div>
            </div>
            <Switch
              id="email"
              checked={settings.channels.email}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  channels: { ...settings.channels, email: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="push">Push Notifications</Label>
                <div className="text-xs text-muted-foreground">
                  Receive push notifications on your device
                </div>
              </div>
            </div>
            <Switch
              id="push"
              checked={settings.channels.push}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  channels: { ...settings.channels, push: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="inApp">In-App Notifications</Label>
                <div className="text-xs text-muted-foreground">
                  Show notifications in the application
                </div>
              </div>
            </div>
            <Switch
              id="inApp"
              checked={settings.channels.inApp}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  channels: { ...settings.channels, inApp: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Do Not Disturb */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-primary" />
            Do Not Disturb
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dnd">Enable Do Not Disturb</Label>
            <Switch
              id="dnd"
              checked={settings.doNotDisturb.enabled}
              onCheckedChange={(enabled) =>
                setSettings({
                  ...settings,
                  doNotDisturb: { ...settings.doNotDisturb, enabled },
                })
              }
            />
          </div>

          {settings.doNotDisturb.enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4 pt-4 border-t border-border"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={settings.doNotDisturb.startTime}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        doNotDisturb: {
                          ...settings.doNotDisturb,
                          startTime: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={settings.doNotDisturb.endTime}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        doNotDisturb: {
                          ...settings.doNotDisturb,
                          endTime: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Grouping & Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Grouping & Display
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="grouping">Group Notifications By</Label>
            <Select
              value={settings.grouping}
              onValueChange={(value: "type" | "time") =>
                setSettings({ ...settings, grouping: value })
              }
            >
              <SelectTrigger id="grouping">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="type">Type (System, Social, Automation, etc.)</SelectItem>
                <SelectItem value="time">Time (Today, Yesterday, This Week, etc.)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.silentMode ? (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Volume2 className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="silent">Silent Mode</Label>
                <div className="text-xs text-muted-foreground">
                  Mute UI sounds and use subdued colors
                </div>
              </div>
            </div>
            <Switch
              id="silent"
              checked={settings.silentMode}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, silentMode: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm mb-1">Export Notification Logs</div>
              <div className="text-xs text-muted-foreground">
                Download all notifications as CSV
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <div className="font-semibold text-sm mb-1">Clear All Notifications</div>
              <div className="text-xs text-muted-foreground">
                Permanently delete all notification history
              </div>
            </div>
            <Button variant="destructive" size="sm" onClick={handleClearAll} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

