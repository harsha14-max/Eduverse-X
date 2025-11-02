"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Award,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Download,
} from "lucide-react"
import { CertificateCard } from "./certificate-card"
import { AddCertificateModal } from "./add-certificate-modal"

const certificates = [
  {
    id: "1",
    organization: "Coursera",
    courseName: "Machine Learning Specialization",
    thumbnail: "/api/placeholder/300/200",
    date: "2024-01-15",
    category: "Technical",
    badges: ["AI Validated", "Top Skill"],
    verified: true,
  },
  {
    id: "2",
    organization: "Udemy",
    courseName: "React & Next.js Complete Guide",
    thumbnail: "/api/placeholder/300/200",
    date: "2024-02-20",
    category: "Technical",
    badges: ["Verified"],
    verified: true,
  },
  {
    id: "3",
    organization: "Google",
    courseName: "Cloud Architecture Professional",
    thumbnail: "/api/placeholder/300/200",
    date: "2024-03-10",
    category: "Technical",
    badges: ["Verified", "Top Skill"],
    verified: true,
  },
  {
    id: "4",
    organization: "LinkedIn Learning",
    courseName: "Leadership Fundamentals",
    thumbnail: "/api/placeholder/300/200",
    date: "2024-04-05",
    category: "Soft Skills",
    badges: ["Verified"],
    verified: true,
  },
]

const categories = ["All", "Technical", "Soft Skills", "Creative", "Leadership"]

export function CertificationsGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch = cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || cert.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Card className="border-border shadow-sm h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Certifications & Achievements</CardTitle>
                <CardDescription className="text-xs">
                  Your verified credentials and achievements
                </CardDescription>
              </div>
            </div>
            <Button size="sm" onClick={() => setShowAddModal(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
          {/* Search & Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Auto-Sync Status */}
          <Card className="border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                AI is scanning your connected platforms for new certifications...
              </span>
            </div>
          </Card>

          {/* Certificates Grid */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 gap-3">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CertificateCard certificate={cert} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <div className="text-sm">No certificates found</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddCertificateModal open={showAddModal} onOpenChange={setShowAddModal} />
    </>
  )
}

