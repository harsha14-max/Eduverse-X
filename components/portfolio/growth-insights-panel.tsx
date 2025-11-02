"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Eye,
  Users,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const engagementData = [
  { month: "Jan", views: 1200, engagement: 85 },
  { month: "Feb", views: 1500, engagement: 95 },
  { month: "Mar", views: 1800, engagement: 110 },
  { month: "Apr", views: 2200, engagement: 135 },
]

const recommendations = [
  {
    type: "engagement",
    title: "Portfolio Engagement",
    message: "Your portfolio engagement increased by 25% this week.",
    action: "View Details",
  },
  {
    type: "visibility",
    title: "Visibility Boost",
    message: "People are engaging more with your design projects. Consider showcasing more creative work.",
    action: "Update Portfolio",
  },
  {
    type: "content",
    title: "Content Suggestion",
    message: "Write a blog on your React project to boost visibility and attract more opportunities.",
    action: "Create Post",
  },
  {
    type: "skill",
    title: "Skill Highlight",
    message: "Your Machine Learning certification is getting attention. Add it to your profile summary.",
    action: "Edit Profile",
  },
]

export function GrowthInsightsPanel() {
  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Growth Insights</CardTitle>
            <CardDescription className="text-xs">
              AI Personal Branding Advisor
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 flex-1 flex flex-col min-h-0">
        {/* Engagement Metrics */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Portfolio Engagement</div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +25% This Week
              </Badge>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-border">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="h-4 w-4 text-primary" />
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div className="text-lg font-bold">2.2K</div>
              <div className="text-xs text-green-600">+18% from last month</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-primary" />
                <div className="text-xs text-muted-foreground">Unique Visitors</div>
              </div>
              <div className="text-lg font-bold">1.5K</div>
              <div className="text-xs text-green-600">+12% from last month</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-sm font-semibold">AI Recommendations</div>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">{rec.title}</div>
                      <div className="text-xs text-muted-foreground">{rec.message}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 text-xs mt-2"
                      >
                        {rec.action}
                        <ArrowRight className="h-3 w-3" />
                      </Button>
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

