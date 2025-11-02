"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import { SidebarNavigation } from "../dashboard/sidebar-navigation"
import { ProfileOverviewCard } from "./profile-overview-card"
import { SkillGraph } from "./skill-graph"
import { ProjectShowcase } from "./project-showcase"
import { CertificationsGrid } from "./certifications-grid"
import { ExperienceTimeline } from "./experience-timeline"
import { SocialBrandingPanel } from "./social-branding-panel"
import { GrowthInsightsPanel } from "./growth-insights-panel"
import { PortfolioCustomization } from "./portfolio-customization"

export function PortfolioPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Profile Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileOverviewCard />
            </motion.div>

            {/* Skill Graph & Learning Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <SkillGraph />
            </motion.div>

            {/* Project Showcase & Certifications - Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <ProjectShowcase />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CertificationsGrid />
              </motion.div>
            </div>

            {/* Experience & Education Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ExperienceTimeline />
            </motion.div>

            {/* Social Branding Panel & Growth Insights - Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <SocialBrandingPanel />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <GrowthInsightsPanel />
              </motion.div>
            </div>

            {/* Portfolio Customization Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <PortfolioCustomization />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

