"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Linkedin, GraduationCap, MessageSquare, Sparkles } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TimelineEvent {
  id: string
  type: "post" | "course" | "mentor" | "automation"
  title: string
  description: string
  timestamp: string
  status: "success" | "pending" | "failed"
  icon: typeof Calendar
}

const events: TimelineEvent[] = [
  {
    id: "1",
    type: "post",
    title: "Posted update on LinkedIn",
    description: "Weekly learning progress shared",
    timestamp: "10:30 AM",
    status: "success",
    icon: Linkedin,
  },
  {
    id: "2",
    type: "course",
    title: "New ML course added to portfolio",
    description: "Machine Learning Specialization completed",
    timestamp: "11:15 AM",
    status: "success",
    icon: GraduationCap,
  },
  {
    id: "3",
    type: "mentor",
    title: "Mentor reply received from AI Coach",
    description: "Feedback on portfolio improvement",
    timestamp: "12:00 PM",
    status: "success",
    icon: MessageSquare,
  },
  {
    id: "4",
    type: "automation",
    title: "GitHub auto-sync triggered",
    description: "Portfolio updated with latest commits",
    timestamp: "12:45 PM",
    status: "pending",
    icon: Sparkles,
  },
]

export function TimelineCards() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "post":
        return "text-blue-600"
      case "course":
        return "text-green-600"
      case "mentor":
        return "text-purple-600"
      case "automation":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">Timeline Cards</h3>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {events.map((event) => {
              const Icon = event.icon
              const isSelected = selectedEvent === event.id

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedEvent(isSelected ? null : event.id)}
                  className="relative"
                >
                  <Card
                    className={`border-border cursor-pointer transition-all ${
                      isSelected ? "border-primary shadow-md" : "hover:border-primary/50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Status Indicator */}
                        <div className="relative">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`} />
                          <motion.div
                            animate={
                              event.status === "success"
                                ? {
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0, 0.5],
                                  }
                                : {}
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`absolute inset-0 rounded-full ${getStatusColor(event.status)}`}
                          />
                        </div>

                        {/* Icon */}
                        <Icon className={`h-5 w-5 ${getTypeColor(event.type)} mt-0.5`} />

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-semibold">{event.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {event.timestamp}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                          <Badge
                            variant="outline"
                            className={`text-xs mt-2 ${
                              event.status === "success"
                                ? "bg-green-50 text-green-700 border-green-300"
                                : event.status === "pending"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                                : "bg-red-50 text-red-700 border-red-300"
                            }`}
                          >
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

