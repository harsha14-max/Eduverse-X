"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { WidgetContainer } from "./widget-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  GraduationCap, 
  TrendingUp, 
  Zap, 
  Target,
  MoreVertical,
  BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const learningData = [
  { name: "Mon", hours: 2 },
  { name: "Tue", hours: 3 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 4 },
  { name: "Fri", hours: 2.5 },
  { name: "Sat", hours: 3.5 },
  { name: "Sun", hours: 2 },
]

const socialData = [
  { name: "Week 1", engagement: 120, reach: 1500 },
  { name: "Week 2", engagement: 180, reach: 2100 },
  { name: "Week 3", engagement: 240, reach: 2800 },
  { name: "Week 4", engagement: 300, reach: 3200 },
]

const automationData = [
  { name: "Portfolio", success: 24, failed: 2 },
  { name: "Social", success: 18, failed: 1 },
  { name: "Learning", success: 12, failed: 0 },
]

const skillData = [
  { name: "React", value: 35 },
  { name: "Python", value: 28 },
  { name: "TypeScript", value: 22 },
  { name: "Node.js", value: 15 },
]

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"]

export function VisualizationPanels() {
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null)
  const [widgetOrder, setWidgetOrder] = useState<string[]>([])
  const [visibleWidgets, setVisibleWidgets] = useState<string[]>(["learning", "social", "automation", "skills"])

  const panels = [
    {
      id: "learning",
      title: "Learning Stats",
      icon: GraduationCap,
      description: "Track course completion, hours studied, consistency streaks",
      component: (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={learningData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="hours" 
                stroke="#2563eb" 
                fill="#2563eb" 
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ),
      stats: [
        { label: "Courses", value: "12" },
        { label: "Hours", value: "24h" },
        { label: "Streak", value: "7d" },
      ],
    },
    {
      id: "social",
      title: "Social Growth",
      icon: TrendingUp,
      description: "Engagement analytics from LinkedIn or Twitter",
      component: (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={socialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: "#2563eb", r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ),
      stats: [
        { label: "Engagement", value: "+150%" },
        { label: "Reach", value: "3.2K" },
        { label: "Posts", value: "8" },
      ],
    },
    {
      id: "automation",
      title: "Automation Summary",
      icon: Zap,
      description: "All automations triggered, success rate, time saved",
      component: (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={automationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="success" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ),
      stats: [
        { label: "Active", value: "8" },
        { label: "Success", value: "98%" },
        { label: "Time Saved", value: "10h" },
      ],
    },
    {
      id: "skills",
      title: "Skill Graph",
      icon: Target,
      description: "Visual mind map showing skill evolution",
      component: (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={skillData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => {
                  const percent = typeof entry.percent === 'number' ? entry.percent : 0
                  return `${entry.name}: ${(percent * 100).toFixed(0)}%`
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ),
      stats: [
        { label: "Skills", value: "15+" },
        { label: "Growing", value: "4" },
        { label: "Level", value: "Advanced" },
      ],
    },
  ]

  // Convert panels to widgets format
  const widgets = panels
    .filter((panel) => visibleWidgets.includes(panel.id))
    .map((panel) => ({
      id: panel.id,
      title: panel.title,
      component: (
        <div className="space-y-4">
          {panel.component}
          <div className="flex gap-4 pt-4 border-t border-border">
            {panel.stats.map((stat, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="text-lg font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    }))

  const handleWidgetReorder = (newOrder: string[]) => {
    setWidgetOrder(newOrder)
    // Save to localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard-widget-order", JSON.stringify(newOrder))
    }
  }

  const handleWidgetRemove = (id: string) => {
    setVisibleWidgets((prev) => prev.filter((widgetId) => widgetId !== id))
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard-visible-widgets", JSON.stringify(visibleWidgets.filter((widgetId) => widgetId !== id)))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Data Visualization
        </h2>
        <div className="text-xs text-muted-foreground">
          Drag to rearrange • Click × to remove
        </div>
      </div>
      <WidgetContainer
        widgets={widgets}
        onWidgetReorder={handleWidgetReorder}
        onWidgetRemove={handleWidgetRemove}
      />
    </div>
  )
}

