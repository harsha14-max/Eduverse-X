"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Linkedin, Twitter, FileText } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const engagementData = [
  { week: "Week 1", linkedin: 45, twitter: 38, devto: 52 },
  { week: "Week 2", linkedin: 52, twitter: 42, devto: 58 },
  { week: "Week 3", linkedin: 48, twitter: 45, devto: 55 },
  { week: "Week 4", linkedin: 62, twitter: 50, devto: 65 },
]

const postingHeatmap = [
  { day: "Mon", posts: 2, engagement: 85 },
  { day: "Tue", posts: 3, engagement: 92 },
  { day: "Wed", posts: 1, engagement: 78 },
  { day: "Thu", posts: 4, engagement: 95 },
  { day: "Fri", posts: 2, engagement: 88 },
  { day: "Sat", posts: 1, engagement: 65 },
  { day: "Sun", posts: 0, engagement: 45 },
]

const topTips = [
  {
    id: "1",
    title: "Post more on Tuesday mornings",
    description: "Your engagement is 15% higher on Tuesdays at 9 AM",
    impact: "high",
  },
  {
    id: "2",
    title: "Increase Dev.to content",
    description: "Dev.to posts show 20% higher engagement than average",
    impact: "medium",
  },
  {
    id: "3",
    title: "Use more visuals",
    description: "Posts with images get 35% more engagement",
    impact: "high",
  },
]

export function SocialInsightsTab() {
  return (
    <div className="space-y-6">
      {/* Engagement Rates */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Engagement Rate Across Platforms</CardTitle>
          <CardDescription className="text-xs">
            Average engagement rate (%) over the last 4 weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="linkedin" stroke="#0077b5" strokeWidth={2} name="LinkedIn" />
              <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} name="Twitter/X" />
              <Line type="monotone" dataKey="devto" stroke="#0d1117" strokeWidth={2} name="Dev.to" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Posting Heatmap */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Posting Heatmap</CardTitle>
          <CardDescription className="text-xs">
            Days active and engagement rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {postingHeatmap.map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <div className="w-12 text-sm font-medium">{day.day}</div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                    <div
                      className={`h-full ${
                        day.engagement >= 90
                          ? "bg-green-500"
                          : day.engagement >= 75
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                      style={{ width: `${day.engagement}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground w-16 text-right">
                    {day.posts} posts
                  </div>
                  <div className="text-xs font-medium w-12 text-right">
                    {day.engagement}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Improvement Tips */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Top 3 Improvement Tips</CardTitle>
          <CardDescription className="text-xs">
            AI-generated recommendations for better engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topTips.map((tip) => (
              <div
                key={tip.id}
                className={`p-3 rounded-lg border ${
                  tip.impact === "high"
                    ? "bg-red-500/10 border-red-500/20"
                    : "bg-yellow-500/10 border-yellow-500/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-semibold text-sm">{tip.title}</div>
                  <Badge variant="outline" className="text-xs">
                    {tip.impact} impact
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{tip.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

