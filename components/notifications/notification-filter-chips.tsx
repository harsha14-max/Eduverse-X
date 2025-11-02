"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

interface NotificationFilterChipsProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

const categories = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "learning", label: "Learning" },
  { id: "social", label: "Social" },
  { id: "security", label: "Security" },
  { id: "system", label: "System" },
  { id: "discoveries", label: "Discoveries" },
]

const filters = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "read", label: "Read" },
]

export function NotificationFilterChips({
  selectedCategory,
  onCategoryChange,
  selectedFilter,
  onFilterChange,
}: NotificationFilterChipsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Filter className="h-3 w-3 text-muted-foreground" />
        <span className="text-xs font-semibold">Filter by Category:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id || (selectedCategory === null && category.id === "all") ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id === "all" ? null : category.id)}
            className="text-xs h-7"
          >
            {category.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs font-semibold">Filter by Status:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className="text-xs h-7"
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {(selectedCategory !== null || selectedFilter !== "all") && (
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange(null)
              onFilterChange("all")
            }}
            className="text-xs h-6 gap-1"
          >
            <X className="h-3 w-3" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

