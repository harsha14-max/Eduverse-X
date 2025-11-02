"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  GraduationCap,
  RefreshCw,
  Sparkles,
  Calendar,
} from "lucide-react"
import { useRef } from "react"

const experiences = [
  {
    id: "1",
    type: "work",
    title: "Senior Full Stack Developer",
    organization: "TechNova Inc.",
    duration: "2022 - Present",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    summary: "Leading frontend development initiatives and optimizing backend performance. Key contributions aligned with backend optimization and RESTful API design.",
    aiGenerated: true,
  },
  {
    id: "2",
    type: "work",
    title: "Full Stack Developer",
    organization: "StartupXYZ",
    duration: "2020 - 2022",
    skills: ["React", "Python", "PostgreSQL"],
    summary: "Built and maintained web applications using React and Python. Contributed to team codebase and improved application performance.",
    aiGenerated: true,
  },
  {
    id: "3",
    type: "education",
    title: "B.S. Computer Science",
    organization: "Stanford University",
    duration: "2016 - 2020",
    skills: ["Algorithms", "Data Structures", "Machine Learning"],
    summary: "Focused on algorithms, data structures, and machine learning. Completed multiple projects in AI and web development.",
    aiGenerated: true,
  },
  {
    id: "4",
    type: "internship",
    title: "Software Engineering Intern",
    organization: "Google",
    duration: "Summer 2019",
    skills: ["Java", "Android Development", "UI/UX"],
    summary: "Worked on Android app development and UI/UX improvements. Gained experience in large-scale software engineering.",
    aiGenerated: true,
  },
]

export function ExperienceTimeline() {
  const [isUpdating, setIsUpdating] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleAutoUpdate = () => {
    setIsUpdating(true)
    // Simulate LinkedIn sync
    setTimeout(() => {
      setIsUpdating(false)
      // In real app, update experiences from LinkedIn
    }, 2000)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="h-5 w-5" />
      case "education":
        return <GraduationCap className="h-5 w-5" />
      default:
        return <Briefcase className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "border-blue-500 bg-blue-50"
      case "education":
        return "border-green-500 bg-green-50"
      default:
        return "border-purple-500 bg-purple-50"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Experience & Education Timeline</CardTitle>
              <CardDescription className="text-xs">
                Your professional journey with AI-generated summaries
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAutoUpdate}
            disabled={isUpdating}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isUpdating ? "animate-spin" : ""}`} />
            Auto Update
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative" ref={ref}>
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex items-start gap-4"
              >
                {/* Timeline Dot */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getTypeColor(exp.type)}`}>
                  {getTypeIcon(exp.type)}
                </div>

                {/* Content Card */}
                <Card className={`flex-1 border-2 ${getTypeColor(exp.type)}`}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm">{exp.title}</h3>
                            {exp.aiGenerated && (
                              <Badge variant="outline" className="text-xs gap-1">
                                <Sparkles className="h-3 w-3" />
                                AI Summary
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">
                            {exp.organization}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {exp.duration}
                          </div>
                        </div>
                      </div>

                      {/* Skills Applied */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* AI Generated Summary */}
                      <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                        <div className="text-xs font-medium text-muted-foreground mb-1">
                          AI Reflection:
                        </div>
                        <div className="text-sm text-muted-foreground">{exp.summary}</div>
                      </div>
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

