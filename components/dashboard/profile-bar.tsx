"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Check, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProfileBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-border shadow-sm bg-gradient-to-r from-primary/5 via-background to-blue-500/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Profile Avatar */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                <span className="text-lg font-bold text-primary">SU</span>
              </div>

              {/* Profile Info */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">Suraj Kumar</h3>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                    <Check className="h-3 w-3" />
                    Verified Learner
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-primary" />
                    <span className="font-mono">did:eduverse:abc123...</span>
                  </div>
                  <span>•</span>
                  <span>Level 5</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                  <Award className="h-4 w-4" />
                  <span>12</span>
                </div>
                <p className="text-xs text-muted-foreground">Badges</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                  <TrendingUp className="h-4 w-4" />
                  <span>1,245</span>
                </div>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

