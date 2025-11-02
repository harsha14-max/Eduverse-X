"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Award, TrendingUp, Code } from "lucide-react"

const useCases = [
  {
    name: "Aayushi",
    role: "CS Student",
    icon: "👩‍💻",
    story: "As a CS student juggling coursework and side projects, EDUVERSE X transformed my workflow. I connected my LinkedIn and GitHub, and now my portfolio updates automatically every week.",
    metrics: "3 projects synced, 12 posts automated",
    result: "Landed 3 internship interviews in 2 months",
    iconComponent: Github,
  },
  {
    name: "Riya",
    role: "Product Designer",
    icon: "🎨",
    story: "I was spending hours manually updating my portfolio across Behance, Medium, and LinkedIn. Now EDUVERSE X syncs everything automatically and suggests the best times to post.",
    metrics: "8 designs shared, 200% engagement increase",
    result: "Became a top contributor on design platforms",
    iconComponent: Award,
  },
  {
    name: "Suraj",
    role: "DevOps Engineer",
    icon: "⚙️",
    story: "Completed multiple Coursera certifications but struggled to showcase them. EDUVERSE X automatically pulled my certificates, updated my resume, and created professional portfolio entries.",
    metrics: "5 certifications, portfolio views +150%",
    result: "Promoted to Senior DevOps Engineer",
    iconComponent: TrendingUp,
  },
  {
    name: "Priya",
    role: "Data Scientist",
    icon: "📊",
    story: "The AI-powered post suggestions based on my learning journey were game-changing. My LinkedIn posts started getting real engagement, and I connected with industry leaders.",
    metrics: "25 posts scheduled, 500+ new connections",
    result: "Invited to speak at 2 data science conferences",
    iconComponent: Linkedin,
  },
  {
    name: "Rahul",
    role: "Frontend Developer",
    icon: "💻",
    story: "I was learning from 5 different platforms—Coursera, Udemy, YouTube, freeCodeCamp, and Medium. EDUVERSE X unified everything into one dashboard with AI recommendations.",
    metrics: "5 platforms unified, 40+ courses tracked",
    result: "Switched careers from marketing to frontend dev",
    iconComponent: Code,
  },
  {
    name: "Ananya",
    role: "UI/UX Designer",
    icon: "🎨",
    story: "The automation workflows saved me 15+ hours per week. Now I can focus on design while EDUVERSE X handles social posts, portfolio updates, and progress tracking.",
    metrics: "15 hours saved weekly, 50+ posts automated",
    result: "Started freelance design agency",
    iconComponent: Award,
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real Stories, Real Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how learners and professionals are automating their growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.iconComponent
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border hover:border-primary/50 hover:shadow-lg transition-all group bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl flex-shrink-0">{useCase.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{useCase.name}</h3>
                          <span className="text-sm text-muted-foreground">— {useCase.role}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{useCase.story}</p>
                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <IconComponent className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{useCase.metrics}</span>
                      </div>
                      {useCase.result && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="font-medium">{useCase.result}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

