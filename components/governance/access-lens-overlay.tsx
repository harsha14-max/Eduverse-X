"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, Database, Lock, User, Calendar, FileText, GraduationCap } from "lucide-react"

interface DataAccess {
  id: string
  category: string
  data: string[]
  aiUsage: string
  icon: typeof Database
}

const dataAccess: DataAccess[] = [
  {
    id: "1",
    category: "Profile Data",
    data: ["Name", "Email", "Skills", "Certifications", "Work Experience"],
    aiUsage: "Used for personalized recommendations and growth tracking",
    icon: User,
  },
  {
    id: "2",
    category: "Learning Data",
    data: ["Course Progress", "Completed Courses", "Learning Goals", "Skill Graph"],
    aiUsage: "Used for course recommendations and progress insights",
    icon: GraduationCap,
  },
  {
    id: "3",
    category: "Social Data",
    data: ["LinkedIn Posts", "Twitter Activity", "Engagement Metrics"],
    aiUsage: "Used for content suggestions and engagement optimization",
    icon: FileText,
  },
  {
    id: "4",
    category: "Automation Data",
    data: ["Workflow Logs", "Execution History", "Integration Status"],
    aiUsage: "Used for workflow optimization and performance analysis",
    icon: Database,
  },
  {
    id: "5",
    category: "Portfolio Data",
    data: ["Projects", "GitHub Repos", "Achievements"],
    aiUsage: "Used for portfolio recommendations and skill verification",
    icon: FileText,
  },
]

function AccessLensOverlay() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="h-4 w-4" />
          Access Lens
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Access Lens — What Data Does AI Currently Know?
          </DialogTitle>
          <DialogDescription>
            Hover to reveal what data AI currently has access to and how it's being used
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-3 mt-4">
            {dataAccess.map((access, index) => {
              const Icon = access.icon
              return (
                <motion.div
                  key={access.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-1">{access.category}</div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {access.data.map((item, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground p-2 bg-muted rounded-md">
                        <span className="font-medium">AI Usage:</span> {access.aiUsage}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            This data is stored securely and used only for AI personalization
          </div>
          <Button onClick={() => setIsOpen(false)} variant="outline" size="sm">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { AccessLensOverlay }
