"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Lock, Brain, Key, FileText } from "lucide-react"

interface TrustBreakdown {
  category: string
  weight: number
  score: number
  icon: typeof Lock
  description: string
}

const trustBreakdown: TrustBreakdown[] = [
  {
    category: "Encryption Status",
    weight: 30,
    score: 95,
    icon: Lock,
    description: "Data encryption and protection status",
  },
  {
    category: "AI Transparency",
    weight: 25,
    score: 85,
    icon: Brain,
    description: "AI usage transparency and explainability",
  },
  {
    category: "Key Integrity",
    weight: 25,
    score: 90,
    icon: Key,
    description: "Key management and backup status",
  },
  {
    category: "Audit Trail Completion",
    weight: 20,
    score: 80,
    icon: FileText,
    description: "Audit trail completeness and verification",
  },
]

function TrustBreakdownWidgets() {
  const overallScore =
    trustBreakdown.reduce((sum, item) => sum + item.score * (item.weight / 100), 0)

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* Overall Score */}
        <div className="p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Overall Trust Score</div>
            <div className="text-2xl font-bold text-primary">{Math.round(overallScore)}/100</div>
          </div>
          <Progress value={overallScore} className="h-2" />
        </div>

        {/* Breakdown Widgets */}
        <div className="space-y-3">
          {trustBreakdown.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.category}
                className="p-3 border rounded-lg border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{item.category}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground mb-1">Weight: {item.weight}%</div>
                    <div className="text-lg font-bold text-primary">{item.score}%</div>
                  </div>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export { TrustBreakdownWidgets }
