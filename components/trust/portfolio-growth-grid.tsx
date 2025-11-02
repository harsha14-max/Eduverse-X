"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Grid3x3,
  Plus,
  Search,
  CheckCircle2,
  Sparkles,
  Link2,
} from "lucide-react"
import { SkillTile } from "./skill-tile"
import { AddTileModal } from "./add-tile-modal"

const skillTiles = [
  {
    id: "1",
    title: "Weather App Project",
    type: "project",
    thumbnail: "/api/placeholder/200/150",
    description: "Built with React and OpenWeather API",
    verification: "verified-by-ai" as const,
    source: "AI Growth Feed",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Machine Learning Certificate",
    type: "certificate",
    thumbnail: "/api/placeholder/200/150",
    description: "Coursera ML Specialization",
    verification: "synced-from-linkedin" as const,
    source: "Synced from LinkedIn",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    title: "Next.js Blog Post",
    type: "post",
    thumbnail: "/api/placeholder/200/150",
    description: "Getting Started with Next.js 15",
    verification: "added-via-ai" as const,
    source: "Added via AI Growth Feed",
    timestamp: "3 days ago",
  },
]

export function PortfolioGrowthGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleAddTile = () => {
    setIsAddModalOpen(true)
  }

  const handleTileAdded = () => {
    setIsAddModalOpen(false)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const filteredTiles = skillTiles.filter((tile) =>
    tile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tile.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Grid3x3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Portfolio Growth Grid</CardTitle>
              <CardDescription className="text-xs">
                Visual grid showing verified skills, projects, and achievements
              </CardDescription>
            </div>
          </div>
          <Button size="sm" onClick={handleAddTile} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Tile
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillTile tile={tile} />
            </motion.div>
          ))}
        </div>

        {filteredTiles.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No tiles found matching your search.
          </div>
        )}
      </CardContent>

      {/* Add Tile Modal */}
      <AddTileModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onTileAdded={handleTileAdded}
      />

      {/* Confetti Animation */}
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
        >
          <div className="text-6xl">🎉</div>
        </motion.div>
      )}
    </Card>
  )
}

