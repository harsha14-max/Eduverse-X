"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  TrendingUp,
  Zap,
  Brain,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Share2,
  BarChart3,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock function to get user learning profile from Section 7
// In production, this would fetch from account/profile API or Section 7 components
function getUserLearningProfile() {
  // Try to get from localStorage or account state (when Section 7 is connected)
  // For now, using mock data that represents Section 7 integration
  try {
    const profileStr = typeof window !== 'undefined' ? localStorage.getItem('learningProfile') : null
    if (profileStr) {
      return JSON.parse(profileStr)
    }
  } catch (e) {
    // Fallback to default
  }

  // Default profile data (will be replaced when Section 7 is fully connected)
  return {
    skills: ["Data Analysis", "Web Development", "Machine Learning"],
    activeCourses: ["Coursera - Data Science", "Udemy - React"],
    currentFocus: "Data Analysis",
    proficiency: {
      "Data Analysis": "Advanced",
      "Web Development": "Intermediate",
      "Machine Learning": "Beginner",
    },
    // Additional Section 7 integration points
    recentAchievements: [],
    learningGoals: [],
    portfolioSync: false,
  }
}

// Generate recommendations based on learning profile
function generateRecommendationsFromProfile(profile: ReturnType<typeof getUserLearningProfile>) {
  const baseRecommendations = [
    {
      id: "1",
      title: "Automate LinkedIn Post from New Blog",
      description: "Auto-post new blog entries to LinkedIn with AI-generated summaries",
      category: "Content Creation",
      icon: Share2,
      impact: "Saves 15 min/week",
      confidence: 92,
      match: "Based on your learning profile and LinkedIn activity",
      skillMatch: null,
    },
    {
      id: "2",
      title: "Daily Learning Summary Bot",
      description: "Generate daily summaries of your Coursera progress and post to Slack",
      category: "Learning",
      icon: GraduationCap,
      impact: "Saves 10 min/day",
      confidence: 88,
      match: "Connects Coursera API with Slack integration",
      skillMatch: profile.activeCourses.length > 0 ? profile.activeCourses[0] : null,
    },
    {
      id: "3",
      title: "GitHub Project Portfolio Sync",
      description: "Auto-update portfolio when new GitHub projects are published",
      category: "Career",
      icon: Briefcase,
      impact: "Keeps portfolio always fresh",
      confidence: 85,
      match: "Links GitHub webhooks to portfolio API",
      skillMatch: "Web Development",
    },
    {
      id: "4",
      title: "AI Social Media Scheduler",
      description: "AI suggests optimal posting times based on engagement data",
      category: "Growth / Analytics",
      icon: BarChart3,
      impact: "27% better engagement",
      confidence: 90,
      match: "Uses your LinkedIn analytics to optimize timing",
      skillMatch: null,
    },
  ]

  // Add skill-aware recommendations
  const skillBasedRecommendations = []
  
  if (profile.skills.includes("Data Analysis")) {
    skillBasedRecommendations.push({
      id: "5",
      title: "Automate Daily Dataset Imports from Kaggle",
      description: `You're studying ${profile.currentFocus} — automate daily dataset imports from Kaggle`,
      category: "Learning",
      icon: GraduationCap,
      impact: "Keeps your learning data fresh",
      confidence: 95,
      match: `Aligned with your ${profile.currentFocus} learning path`,
      skillMatch: profile.currentFocus,
    })
  }

  if (profile.skills.includes("Web Development")) {
    skillBasedRecommendations.push({
      id: "6",
      title: "Auto-Deploy GitHub Projects to Vercel",
      description: "Automatically deploy your React projects when pushed to GitHub",
      category: "Career",
      icon: Briefcase,
      impact: "Instant deployment on every push",
      confidence: 88,
      match: "Matches your Web Development skills",
      skillMatch: "Web Development",
    })
  }

  // Sort by confidence and return top recommendations
  return [...baseRecommendations, ...skillBasedRecommendations]
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 6)
}

const aiRecommendations = generateRecommendationsFromProfile(getUserLearningProfile())

export function AIAutomationRecommendations() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "Learning", "Career", "Content Creation", "Growth / Analytics"]

  const filteredRecommendations = aiRecommendations.filter(
    (rec) => selectedCategory === "all" || rec.category === selectedCategory
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <div className="text-sm font-semibold">Suggested Automations for You</div>
        </div>
        <Badge variant="outline" className="text-xs">AI-Powered</Badge>
      </div>

      {/* Category Filter */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 px-2 pb-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              className="text-xs shrink-0"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Recommendations List */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-3 px-2 pb-2">
          {filteredRecommendations.map((rec, index) => {
            const Icon = rec.icon
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-primary/20 bg-primary/5 cursor-pointer hover:border-primary transition-all">
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Icon className="h-4 w-4 text-primary shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold truncate">{rec.title}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {rec.category}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs gap-1 shrink-0">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          {rec.confidence}%
                        </Badge>
                      </div>

                      {/* Description */}
                      <div className="text-xs text-muted-foreground">{rec.description}</div>

                      {/* Match Reason */}
                      <div className="flex items-center gap-2 text-xs">
                        <Brain className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground">{rec.match}</span>
                      </div>
                      
                      {/* Skill Match Badge */}
                      {rec.skillMatch && (
                        <div className="flex items-center gap-1 text-xs">
                          <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20">
                            Matches: {rec.skillMatch}
                          </Badge>
                        </div>
                      )}

                      {/* Impact */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span className="text-muted-foreground">{rec.impact}</span>
                        </div>
                        <Button variant="default" size="sm" className="gap-2 text-xs h-7">
                          Use This
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

