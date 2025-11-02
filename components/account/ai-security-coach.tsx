"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react"

const alerts = [
  {
    id: "1",
    type: "warning",
    title: "Permission Anomaly Detected",
    message: "You've given write access to 5 external users today. Review permissions?",
    action: "Review Now",
  },
  {
    id: "2",
    type: "info",
    title: "Best Practice Tip",
    message: "Limit admin access to trusted team members only. Consider using role-based permissions.",
    action: "Learn More",
  },
]

export function AISecurityCoach() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <div className="text-sm font-semibold">AI Security Coach</div>
          <Badge variant="outline" className="text-xs">Active</Badge>
        </div>

        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`border ${
                  alert.type === "warning"
                    ? "border-yellow-300 bg-yellow-50/50"
                    : "border-blue-300 bg-blue-50/50"
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-1">{alert.title}</div>
                      <div className="text-xs text-muted-foreground mb-2">{alert.message}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-xs"
                      >
                        {alert.action}
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security Score */}
        <div className="mt-4 p-3 rounded-lg bg-background border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium">Security Score</div>
            <Badge variant="outline" className="text-xs gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-600" />
              85/100
            </Badge>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1 }}
              className="h-full bg-green-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

