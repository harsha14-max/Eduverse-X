"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Filter,
  GraduationCap,
  Briefcase,
  Share2,
  TrendingUp,
  Users,
  X,
} from "lucide-react"

const intentFilters = [
  { id: "all", label: "All", icon: Filter },
  { id: "learning", label: "Learning", icon: GraduationCap },
  { id: "career", label: "Career", icon: Briefcase },
  { id: "content", label: "Content Creation", icon: Share2 },
  { id: "growth", label: "Growth / Analytics", icon: TrendingUp },
  { id: "community", label: "Community-Shared", icon: Users },
]

export function SmartFilterBar() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"])

  const handleFilterToggle = (filterId: string) => {
    if (filterId === "all") {
      setSelectedFilters(["all"])
    } else {
      setSelectedFilters((prev) => {
        const withoutAll = prev.filter((f) => f !== "all")
        if (prev.includes(filterId)) {
          const newFilters = withoutAll.filter((f) => f !== filterId)
          return newFilters.length === 0 ? ["all"] : newFilters
        } else {
          return [...withoutAll, filterId]
        }
      })
    }
  }

  const clearFilters = () => {
    setSelectedFilters(["all"])
  }

  return (
    <div className="space-y-2 px-2 py-2 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <div className="text-sm font-semibold">Filter by Intent</div>
        </div>
        {selectedFilters.length > 1 || (selectedFilters.length === 1 && !selectedFilters.includes("all")) ? (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 text-xs gap-1">
            <X className="h-3 w-3" />
            Clear
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {intentFilters.map((filter) => {
          const Icon = filter.icon
          const isSelected = selectedFilters.includes(filter.id)
          return (
            <Button
              key={filter.id}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              className="gap-2 text-xs h-7"
              onClick={() => handleFilterToggle(filter.id)}
            >
              <Icon className="h-3 w-3" />
              {filter.label}
            </Button>
          )
        })}
      </div>

      {selectedFilters.length > 1 && (
        <div className="text-xs text-muted-foreground">
          Showing workflows matching {selectedFilters.length} intent{selectedFilters.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  )
}

