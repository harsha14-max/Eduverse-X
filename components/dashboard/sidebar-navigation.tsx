"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  BarChart3,
  Sparkles,
  Settings,
  Zap,
  MessageSquare,
  TrendingUp,
  FileText,
  Shield,
  Bell,
  Menu,
  X,
  User,
  Network,
  Users,
  Brain,
  Store,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    icon: LayoutDashboard, 
    href: "/dashboard",
    badge: null
  },
  { 
    id: "orchestrator", 
    label: "Orchestrator", 
    icon: Brain, 
    href: "/dashboard/orchestrator",
    badge: null
  },
  { 
    id: "courses", 
    label: "Courses", 
    icon: GraduationCap, 
    href: "/dashboard/courses",
    badge: "12"
  },
  { 
    id: "portfolio", 
    label: "Portfolio", 
    icon: Briefcase, 
    href: "/dashboard/portfolio",
    badge: null
  },
  { 
    id: "analytics", 
    label: "Analytics", 
    icon: BarChart3, 
    href: "/dashboard/analytics",
    badge: null
  },
  { 
    id: "ai-chat", 
    label: "AI Hub", 
    icon: MessageSquare, 
    href: "/dashboard/ai-chat",
    badge: "3"
  },
  { 
    id: "collaboration", 
    label: "Collaboration", 
    icon: Users, 
    href: "/dashboard/collaboration",
    badge: null
  },
  { 
    id: "automation", 
    label: "Automation", 
    icon: Zap, 
    href: "/dashboard/automation",
    badge: null
  },
  { 
    id: "social", 
    label: "Social Manager", 
    icon: TrendingUp, 
    href: "/dashboard/social",
    badge: "5"
  },
  { 
    id: "insights", 
    label: "Insights", 
    icon: FileText, 
    href: "/dashboard/insights",
    badge: null
  },
  { 
    id: "security", 
    label: "Security", 
    icon: Shield, 
    href: "/dashboard/security",
    badge: null
  },
  { 
    id: "trust", 
    label: "Trust + Growth", 
    icon: Network, 
    href: "/dashboard/trust",
    badge: null
  },
  { 
    id: "account", 
    label: "Account", 
    icon: User, 
    href: "/dashboard/account",
    badge: null
  },
  { 
    id: "marketplace", 
    label: "Marketplace", 
    icon: Store, 
    href: "/dashboard/marketplace",
    badge: null
  },
  { 
    id: "support", 
    label: "Support", 
    icon: HelpCircle, 
    href: "/dashboard/support",
    badge: null
  },
]

const bottomItems = [
  { 
    id: "notifications", 
    label: "Notifications", 
    icon: Bell, 
    href: "/dashboard/notifications",
    badge: "2"
  },
  { 
    id: "settings", 
    label: "Settings", 
    icon: Settings, 
    href: "/dashboard/settings",
    badge: null
  },
]

export default function SidebarNavigation() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border bg-background transition-all",
          isCollapsed ? "w-16" : "w-64",
          "hidden md:block"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-sm">EDUVERSE X</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="ml-auto"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link key={item.id} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-bold">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Items */}
          <div className="border-t border-border p-4 space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link key={item.id} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-bold">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-64 border-r border-border bg-background">
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-bold text-sm">EDUVERSE X</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {[...navigationItems, ...bottomItems].map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link key={item.id} href={item.href} onClick={() => setIsMobileOpen(false)}>
                      <div
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

