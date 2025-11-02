"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Download, Users, BarChart3 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const earningsData = [
  { month: "Jan", earnings: 1200, installs: 150 },
  { month: "Feb", earnings: 1850, installs: 220 },
  { month: "Mar", earnings: 2400, installs: 280 },
  { month: "Apr", earnings: 3200, installs: 350 },
  { month: "May", earnings: 4100, installs: 420 },
  { month: "Jun", earnings: 5200, installs: 510 },
]

const templateStats = [
  {
    id: "1",
    name: "AI Essay Summarizer",
    installs: 2300,
    earnings: 4500,
    rating: 4.8,
    status: "Live",
  },
  {
    id: "2",
    name: "Social Media Growth Pack",
    installs: 1850,
    earnings: 3200,
    rating: 4.9,
    status: "Live",
  },
  {
    id: "3",
    name: "Quiz Automation Pack",
    installs: 1420,
    earnings: 2100,
    rating: 4.7,
    status: "Live",
  },
]

export function CreatorEarningsPanel() {
  const totalEarnings = earningsData.reduce((sum, item) => sum + item.earnings, 0)
  const totalInstalls = templateStats.reduce((sum, item) => sum + item.installs, 0)
  const averageRating =
    templateStats.reduce((sum, item) => sum + item.rating, 0) / templateStats.length

  return (
    <div className="space-y-6">
      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Total Earnings</div>
                <div className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Total Installs</div>
                <div className="text-2xl font-bold">{totalInstalls.toLocaleString()}</div>
              </div>
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Avg Rating</div>
                <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Active Templates</div>
                <div className="text-2xl font-bold">{templateStats.length}</div>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Earnings & Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="installs" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Template Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Template Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {templateStats.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-sm">{template.name}</h4>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                              {template.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                            <div>
                              <div className="font-medium">Installs</div>
                              <div className="text-foreground">{template.installs.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="font-medium">Earnings</div>
                              <div className="text-foreground">₹{template.earnings.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="font-medium">Rating</div>
                              <div className="text-foreground">{template.rating}★</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

