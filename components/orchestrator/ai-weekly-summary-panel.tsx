"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, FileText, GraduationCap, Users, Download } from "lucide-react"
import { motion } from "framer-motion"

interface WeeklySummary {
  posts: number
  courses: number
  followers: number
  engagement: number
  highlights: string[]
}

const weeklySummary: WeeklySummary = {
  posts: 2,
  courses: 1,
  followers: 54,
  engagement: 21,
  highlights: [
    "Published 2 engaging posts on LinkedIn and Twitter",
    "Completed Machine Learning Specialization course",
    "Gained 54 new followers across platforms",
    "Engagement rate increased by 21%",
  ],
}

export function AIWeeklySummaryPanel() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">AI Weekly Summary</CardTitle>
              <CardDescription className="text-xs">
                Auto-generated summary of your weekly activity
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            This Week
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
        >
          <div className="text-sm font-semibold mb-2">
            You published {weeklySummary.posts} posts, finished {weeklySummary.courses} course, and
            gained {weeklySummary.followers} followers this week. Engagement up by{" "}
            {weeklySummary.engagement}%.
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <div className="text-xs text-muted-foreground">Posts Published</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{weeklySummary.posts}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-4 w-4 text-green-600" />
                <div className="text-xs text-muted-foreground">Courses Completed</div>
              </div>
              <div className="text-2xl font-bold text-green-600">{weeklySummary.courses}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-purple-600" />
                <div className="text-xs text-muted-foreground">New Followers</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">+{weeklySummary.followers}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <div className="text-xs text-muted-foreground">Engagement</div>
              </div>
              <div className="text-2xl font-bold text-orange-600">+{weeklySummary.engagement}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <div className="text-sm font-semibold mb-2">Key Highlights</div>
          {weeklySummary.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-xs p-2 bg-muted rounded-lg"
            >
              <span className="text-green-600 shrink-0">✓</span>
              <span className="text-muted-foreground">{highlight}</span>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            Export Summary
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Sparkles className="h-4 w-4" />
            Share on Social
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

