"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  AlertTriangle,
  MapPin,
  Smartphone,
  Clock,
  CheckCircle2,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const loginPatternData = [
  { day: "Mon", logins: 5 },
  { day: "Tue", logins: 8 },
  { day: "Wed", logins: 6 },
  { day: "Thu", logins: 9 },
  { day: "Fri", logins: 7 },
  { day: "Sat", logins: 3 },
  { day: "Sun", logins: 2 },
]

const recentDevices = [
  {
    id: "1",
    device: "MacBook Pro",
    location: "San Francisco, CA",
    lastActive: "2 hours ago",
    status: "current",
  },
  {
    id: "2",
    device: "iPhone 14",
    location: "San Francisco, CA",
    lastActive: "1 day ago",
    status: "active",
  },
  {
    id: "3",
    device: "Windows PC",
    location: "New York, NY",
    lastActive: "3 days ago",
    status: "unusual",
  },
]

const accessPatterns = [
  {
    time: "09:00 - 12:00",
    frequency: "High",
    pattern: "Normal",
    count: 45,
  },
  {
    time: "12:00 - 18:00",
    frequency: "Medium",
    pattern: "Normal",
    count: 32,
  },
  {
    time: "18:00 - 24:00",
    frequency: "Low",
    pattern: "Normal",
    count: 18,
  },
  {
    time: "00:00 - 06:00",
    frequency: "Very Low",
    pattern: "Unusual",
    count: 3,
  },
]

export function BehaviorMonitor() {
  return (
    <div className="space-y-4">
      {/* Login Pattern Graph */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <div className="text-sm font-semibold">Login Pattern</div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={loginPatternData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="logins"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: "#2563eb", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Access Patterns */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="text-sm font-semibold mb-3">Access Patterns</div>
          <div className="space-y-2">
            {accessPatterns.map((pattern, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-xs font-medium">{pattern.time}</div>
                    <div className="text-xs text-muted-foreground">{pattern.frequency} Activity</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={pattern.pattern === "Normal" ? "outline" : "default"}
                    className="text-xs"
                  >
                    {pattern.pattern}
                  </Badge>
                  <div className="text-xs text-muted-foreground w-12 text-right">
                    {pattern.count} logins
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Devices */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="text-sm font-semibold mb-3">Recent Devices</div>
          <div className="space-y-2">
            {recentDevices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border ${
                  device.status === "unusual"
                    ? "border-red-300 bg-red-50/50"
                    : device.status === "current"
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <Smartphone className="h-4 w-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-xs font-medium">{device.device}</div>
                        {device.status === "unusual" && (
                          <Badge variant="outline" className="text-xs gap-1">
                            <AlertTriangle className="h-3 w-3 text-red-600" />
                            Unusual
                          </Badge>
                        )}
                        {device.status === "current" && (
                          <Badge variant="outline" className="text-xs gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {device.location}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Last active: {device.lastActive}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Detection */}
      <Card className="border-yellow-200 bg-yellow-50/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold mb-1">Unusual Access Detected</div>
              <div className="text-xs text-muted-foreground">
                Login from "Windows PC" in "New York, NY" detected. This is different from your usual location. If this wasn't you, please secure your account immediately.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

