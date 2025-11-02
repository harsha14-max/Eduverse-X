"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Sparkles,
  Users,
  Settings,
  Zap,
  Circle,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { AIPerformanceMonitor } from "./ai-performance-monitor"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"

export function AutomationCommandBar() {
  const [open, setOpen] = useState(false)
  const [aiAction, setAiAction] = useState("")
  const [workspace, setWorkspace] = useState("Personal")
  const [status, setStatus] = useState<"live" | "draft" | "error">("draft")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleAiAction = () => {
    if (!aiAction.trim()) return
    // Simulate AI flow generation
    console.log("Generating flow for:", aiAction)
    setAiAction("")
  }

  const getStatusIcon = () => {
    switch (status) {
      case "live":
        return <CheckCircle2 className="h-3 w-3 text-green-600" />
      case "error":
        return <AlertCircle className="h-3 w-3 text-red-600" />
      default:
        return <Clock className="h-3 w-3 text-blue-600" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "live":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex items-center justify-between px-4 py-2 gap-4">
          {/* Left Section - Global Search */}
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="outline"
              className="w-full max-w-md justify-start text-sm text-muted-foreground gap-2"
              onClick={() => setOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span>Search flows, templates, commands...</span>
              <CommandShortcut>⌘K</CommandShortcut>
            </Button>

            {/* AI Action Field */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Sparkles className="h-4 w-4 text-primary" />
              <Input
                type="text"
                placeholder='Type "Create Slack summary bot" to instantly spawn a flow'
                value={aiAction}
                onChange={(e) => setAiAction(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAiAction()}
                className="flex-1 text-sm"
              />
              <Button
                size="sm"
                onClick={handleAiAction}
                disabled={!aiAction.trim()}
              >
                Generate
              </Button>
            </div>
          </div>

          {/* Center Section - AI Performance Monitor */}
          <div className="flex items-center">
            <AIPerformanceMonitor />
          </div>

          {/* Right Section - Workspace & Status */}
          <div className="flex items-center gap-4">
            {/* Workspace Switcher */}
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <select
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                className="text-sm bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="Personal">Personal</option>
                <option value="Team">Team</option>
                <option value="Shared">Shared</option>
              </select>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="gap-1.5 px-2 py-1 text-xs"
              >
                {getStatusIcon()}
                <span className="capitalize">{status}</span>
              </Badge>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`} />
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Zap className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Flows">
            <CommandItem>
              <Search className="mr-2 h-4 w-4" />
              <span>My Flows</span>
            </CommandItem>
            <CommandItem>
              <Zap className="mr-2 h-4 w-4" />
              <span>Automation Templates</span>
            </CommandItem>
            <CommandItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Team Workflows</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem>
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Create New Flow</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Circle className="mr-2 h-4 w-4" />
              <span>Import Template</span>
              <CommandShortcut>⌘I</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Settings">
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Workspace Settings</span>
            </CommandItem>
            <CommandItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Team Members</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

