"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  CheckCircle2,
  Link2,
  ArrowRight,
  Award,
} from "lucide-react"

const portfolioConnections = [
  {
    id: "1",
    from: "Weather App",
    to: "React Skill",
    type: "verified",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    from: "React Skill",
    to: "ML Certificate",
    type: "verified",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    from: "ML Certificate",
    to: "LinkedIn Post",
    type: "verified",
    timestamp: "2 days ago",
  },
]

const skillPaths = [
  {
    id: "1",
    path: "React → Next.js → Full Stack",
    progression: "85%",
    verified: true,
  },
  {
    id: "2",
    path: "Python → ML → AI Specialization",
    progression: "72%",
    verified: true,
  },
]

export function VerifiedPortfolioGraph() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Verified Portfolio Graph</CardTitle>
            <CardDescription className="text-xs">
              Connections between portfolio items and verification links
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Connections */}
        <div>
          <div className="text-sm font-semibold mb-3">Portfolio Connections</div>
          <div className="space-y-3">
            {portfolioConnections.map((connection, index) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-sm font-medium">{connection.from}</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm font-medium">{connection.to}</div>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300 ml-auto">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{connection.timestamp}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Progression Paths */}
        <div>
          <div className="text-sm font-semibold mb-3">Skill Progression Paths</div>
          <div className="space-y-3">
            {skillPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-border bg-primary/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">{path.path}</div>
                  <Badge variant="outline" className="text-xs">
                    {path.progression}
                  </Badge>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: path.progression }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="h-full bg-primary"
                  />
                </div>
                {path.verified && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    Verified progression
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

