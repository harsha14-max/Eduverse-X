"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, TrendingUp, ArrowRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const completedCourses = [
  { id: "1", title: "Machine Learning Specialization", progress: 100, completedDate: "2 days ago" },
  { id: "2", title: "React 19 Advanced", progress: 85, completedDate: "In progress" },
  { id: "3", title: "TypeScript Mastery", progress: 60, completedDate: "In progress" },
]

const skillGraphData = [
  { month: "Jan", skill: 65 },
  { month: "Feb", skill: 70 },
  { month: "Mar", skill: 75 },
  { month: "Apr", skill: 78 },
  { month: "May", skill: 82 },
]

const aiRecommendations = [
  {
    id: "1",
    title: "Advanced Data Structures",
    reason: "Complements your ML specialization",
    match: 95,
  },
  {
    id: "2",
    title: "System Design Fundamentals",
    reason: "Based on your portfolio projects",
    match: 88,
  },
  {
    id: "3",
    title: "AI Ethics & Governance",
    reason: "Expands your AI knowledge",
    match: 82,
  },
]

export function LearningInsightsTab() {
  return (
    <div className="space-y-6">
      {/* Completed Courses */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Completed Courses</CardTitle>
          <CardDescription className="text-xs">
            Recent learning achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm">{course.title}</div>
                    <div className="text-xs text-muted-foreground">{course.completedDate}</div>
                  </div>
                </div>
                <Badge variant={course.progress === 100 ? "default" : "outline"}>
                  {course.progress}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Graph Progress */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Skill Graph Progress</CardTitle>
          <CardDescription className="text-xs">
            Overall skill progression over time (Section 10)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={skillGraphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[50, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="skill"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Skill Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Next Learning Goal */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Next Learning Goal</CardTitle>
          <CardDescription className="text-xs">
            Suggested by AI Mentor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1">
                  Complete "System Design Fundamentals"
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  Based on your portfolio projects and career goals, this course will help you advance to senior level
                </div>
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs gap-1">
                  Start Course
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Course Recommendations */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">AI Course Recommendations</CardTitle>
          <CardDescription className="text-xs">
            Personalized suggestions based on your learning profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex items-start justify-between p-3 border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-semibold text-sm">{rec.title}</div>
                    <Badge variant="outline" className="text-xs">
                      {rec.match}% match
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{rec.reason}</div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

