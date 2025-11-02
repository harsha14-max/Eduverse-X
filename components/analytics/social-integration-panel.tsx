"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Linkedin, 
  Github, 
  Youtube,
  Twitter,
  Instagram,
  ChevronDown,
  ChevronUp,
  Maximize2
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const platforms = [
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0A66C2" },
  { id: "github", name: "GitHub", icon: Github, color: "#181717" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000" },
  { id: "twitter", name: "Twitter/X", icon: Twitter, color: "#1DA1F2" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "#E4405F" },
]

const engagementData = [
  { week: "Week 1", LinkedIn: 120, GitHub: 45, YouTube: 80, Twitter: 60 },
  { week: "Week 2", LinkedIn: 180, GitHub: 60, YouTube: 120, Twitter: 90 },
  { week: "Week 3", LinkedIn: 240, GitHub: 75, YouTube: 150, Twitter: 120 },
  { week: "Week 4", LinkedIn: 300, GitHub: 90, YouTube: 180, Twitter: 150 },
]

const platformStats = [
  { platform: "LinkedIn", engagement: 840, reach: 3200, posts: 12, growth: "+150%" },
  { platform: "GitHub", commits: 90, repos: 5, stars: 45, growth: "+32%" },
  { platform: "YouTube", views: 5600, watchTime: 120, subscribers: 45, growth: "+78%" },
  { platform: "Twitter/X", impressions: 2400, engagements: 180, followers: 120, growth: "+45%" },
  { platform: "Instagram", likes: 890, comments: 45, followers: 230, growth: "+28%" },
]

const bestPostTimes = [
  { hour: 9, engagement: 85, posts: 5 },
  { hour: 12, engagement: 120, posts: 8 },
  { hour: 15, engagement: 95, posts: 6 },
  { hour: 18, engagement: 150, posts: 10 },
  { hour: 21, engagement: 110, posts: 7 },
]

const COLORS = ["#2563eb", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

export function SocialIntegrationPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Social & Network Presence</CardTitle>
              <CardDescription className="text-xs">
                15+ platform analytics: LinkedIn, GitHub, YouTube, Twitter, Instagram, and more
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="space-y-6">
          {/* Platform Selector */}
          <div className="flex items-center gap-2">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Engagement Graph */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-pink-600" />
              Engagement Analytics
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Cross-platform engagement trends over time
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="LinkedIn" stroke="#0A66C2" strokeWidth={2} dot={{ fill: "#0A66C2", r: 4 }} />
                  <Line type="monotone" dataKey="GitHub" stroke="#181717" strokeWidth={2} dot={{ fill: "#181717", r: 4 }} />
                  <Line type="monotone" dataKey="YouTube" stroke="#FF0000" strokeWidth={2} dot={{ fill: "#FF0000", r: 4 }} />
                  <Line type="monotone" dataKey="Twitter" stroke="#1DA1F2" strokeWidth={2} dot={{ fill: "#1DA1F2", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Stats Grid */}
          <div>
            <h4 className="font-semibold mb-3">Platform Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platformStats.map((stat, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {index < platforms.length && (
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${platforms[index].color}20` }}
                          >
                            {platforms[index].name === "LinkedIn" && <Linkedin className="h-4 w-4" style={{ color: platforms[index].color }} />}
                            {platforms[index].name === "GitHub" && <Github className="h-4 w-4" style={{ color: platforms[index].color }} />}
                            {platforms[index].name === "YouTube" && <Youtube className="h-4 w-4" style={{ color: platforms[index].color }} />}
                            {platforms[index].name === "Twitter/X" && <Twitter className="h-4 w-4" style={{ color: platforms[index].color }} />}
                            {platforms[index].name === "Instagram" && <Instagram className="h-4 w-4" style={{ color: platforms[index].color }} />}
                          </div>
                        )}
                        <span className="font-semibold text-sm">{stat.platform}</span>
                      </div>
                      <Badge variant="outline" className="text-xs text-green-600">
                        {stat.growth}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {stat.engagement && <div>Engagement: {stat.engagement}</div>}
                      {stat.reach && <div>Reach: {stat.reach.toLocaleString()}</div>}
                      {stat.commits && <div>Commits: {stat.commits}</div>}
                      {stat.views && <div>Views: {stat.views.toLocaleString()}</div>}
                      {stat.posts && <div>Posts: {stat.posts}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Best Post Times */}
          <div>
            <h4 className="font-semibold mb-2">Best Post Times</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Optimal posting times based on engagement data
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={bestPostTimes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    dataKey="hour"
                    name="Hour"
                    label={{ value: "Hour of Day", position: "insideBottom", offset: -5 }}
                    domain={[0, 24]}
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis
                    type="number"
                    dataKey="engagement"
                    name="Engagement"
                    label={{ value: "Engagement", angle: -90, position: "insideLeft" }}
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <ZAxis type="number" dataKey="posts" range={[50, 300]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Scatter name="Post Performance" data={bestPostTimes} fill="#ec4899">
                    {bestPostTimes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

