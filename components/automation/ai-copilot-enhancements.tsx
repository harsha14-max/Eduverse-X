"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  FileText,
  GraduationCap,
  Share2,
  ArrowRight,
  CheckCircle2,
  Zap,
  Linkedin,
  Twitter,
  Code2,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const promptExamples = [
  {
    id: "1",
    category: "Educational Automation",
    prompts: [
      "Create daily learning summary from Coursera",
      "Auto-post course completion certificates",
      "Sync course progress to portfolio",
    ],
  },
  {
    id: "2",
    category: "Career Boost Flows",
    prompts: [
      "Automate LinkedIn post from GitHub projects",
      "Schedule weekly portfolio updates",
      "Auto-update resume with new skills",
    ],
  },
  {
    id: "3",
    category: "Social Posting",
    prompts: [
      "Post blog to multiple platforms",
      "Schedule social media posts",
      "Auto-engage with community posts",
    ],
  },
]

const courseLinkedAutomations = [
  {
    id: "1",
    course: "Machine Learning Specialization",
    suggestion: "Automate daily dataset imports from Kaggle?",
    icon: GraduationCap,
    match: 92,
  },
  {
    id: "2",
    course: "Data Analysis with Pandas",
    suggestion: "Set up automated data cleaning workflow?",
    icon: Zap,
    match: 88,
  },
]

export function AICopilotEnhancements() {
  const [activeTab, setActiveTab] = useState<"prompts" | "courses" | "posts">("prompts")

  return (
    <Card className="border-primary/20 bg-primary/5 h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full min-h-0">
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <Sparkles className="h-5 w-5 text-primary" />
          <div className="text-sm font-semibold">AI Automation Copilot</div>
          <Badge variant="outline" className="text-xs">Enhanced</Badge>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3 shrink-0">
            <TabsTrigger value="prompts" className="text-xs">Prompts</TabsTrigger>
            <TabsTrigger value="courses" className="text-xs">Courses</TabsTrigger>
            <TabsTrigger value="posts" className="text-xs">Share</TabsTrigger>
          </TabsList>

          <TabsContent value="prompts" className="flex-1 mt-4 overflow-y-auto min-h-0">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {promptExamples.map((example) => (
                  <Card key={example.id} className="border-border">
                    <CardContent className="p-3">
                      <div className="text-xs font-semibold mb-2">{example.category}</div>
                      <div className="space-y-2">
                        {example.prompts.map((prompt, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-xs gap-2 h-8"
                          >
                            <Zap className="h-3 w-3" />
                            {prompt}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="courses" className="flex-1 mt-4 overflow-y-auto min-h-0">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {courseLinkedAutomations.map((auto) => {
                  const Icon = auto.icon
                  return (
                    <Card key={auto.id} className="border-primary/20 bg-primary/5">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Icon className="h-4 w-4 text-primary mt-0.5" />
                          <div className="flex-1">
                            <div className="text-xs font-semibold mb-1">{auto.course}</div>
                            <div className="text-xs text-muted-foreground mb-2">{auto.suggestion}</div>
                            <Badge variant="outline" className="text-xs gap-1">
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                              {auto.match}% Match
                            </Badge>
                          </div>
                        </div>
                        <Button variant="default" size="sm" className="w-full gap-2 text-xs">
                          Create Automation
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="posts" className="flex-1 mt-4 overflow-y-auto min-h-0">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Share2 className="h-5 w-5 text-green-600" />
                      <div className="text-sm font-semibold">Share This Automation</div>
                      <Badge variant="outline" className="text-xs gap-1 bg-green-100 text-green-700 border-green-300">
                        <CheckCircle2 className="h-3 w-3" />
                        Workflow Complete
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">
                      Your workflow completed successfully! Share it on social media to showcase your automation skills.
                    </div>
                    
                    {/* Prefilled Post Draft */}
                    <Card className="border-border bg-background mb-4">
                      <CardContent className="p-3">
                        <div className="text-xs font-semibold mb-2">Post Preview</div>
                        <div className="text-xs text-muted-foreground leading-relaxed bg-muted/30 p-2 rounded border border-border">
                          🚀 Just automated my LinkedIn posts using @EduVerse AI! 
                          
                          This automation saves me 15 minutes per week by:
                          • Auto-generating post content from my blog
                          • Scheduling optimal posting times
                          • Tracking engagement metrics
                          
                          #Automation #Productivity #AI
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Platform Options */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold mb-2">Share on Platform:</div>
                      <Button variant="default" size="sm" className="w-full gap-2 text-xs">
                        <Share2 className="h-3 w-3" />
                        Share on LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                        <Share2 className="h-3 w-3" />
                        Share on Twitter/X
                      </Button>
                      <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                        <Share2 className="h-3 w-3" />
                        Share on Dev.to
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full gap-2 text-xs">
                        <FileText className="h-3 w-3" />
                        Edit Post Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Portfolio Integration */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <div className="text-xs font-semibold">Add to Portfolio</div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">
                      Add this automation as a project proof in your portfolio (Section 6).
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                      <CheckCircle2 className="h-3 w-3" />
                      Add to Portfolio
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

