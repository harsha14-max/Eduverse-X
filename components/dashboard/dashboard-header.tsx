"use client"

import { Button } from "@/components/ui/button"
import { Brain, Search, Bell, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { clearAuth, getAuth, type AuthUser } from "@/lib/auth"
import { NotificationDrawer } from "@/components/notifications/notification-drawer"
import { Badge } from "@/components/ui/badge"
import { useTiming } from "@/lib/hooks/useTiming"
import { INTERVALS, TimingPriority } from "@/lib/timing-constants"

export function DashboardHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [mounted, setMounted] = useState(false)
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const { interval } = useTiming()

  useEffect(() => {
    setMounted(true)
    setAuthUser(getAuth())
    
    // Load unread count from localStorage
    const updateUnreadCount = () => {
      try {
        const savedReadState = localStorage.getItem("notificationReadState")
        if (savedReadState) {
          const readState = JSON.parse(savedReadState)
          const unread = Object.values(readState).filter((read) => !read).length
          setUnreadCount(unread)
        }
      } catch (e) {
        console.error("Failed to load unread count", e)
      }
    }
    
    updateUnreadCount()
    // Update every 5 seconds using centralized timing manager
    interval(
      updateUnreadCount,
      INTERVALS.UNREAD_COUNT_POLL,
      { priority: TimingPriority.MEDIUM }
    )
  }, [interval])

  const handleLogout = () => {
    clearAuth()
    router.push("/auth/login")
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-blue-700 bg-clip-text text-transparent">
                EDUVERSE X
              </span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses, projects, or ask AI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* User Info - Only show after hydration to avoid mismatch */}
              {mounted && authUser && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-sm">
                  <span className="text-muted-foreground">{authUser.isGuest ? "Guest" : authUser.name || authUser.email}</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setNotificationDrawerOpen(true)}
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Badge>
                )}
              </Button>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
    
    {/* Notification Drawer */}
    <NotificationDrawer
      isOpen={notificationDrawerOpen}
      onClose={() => setNotificationDrawerOpen(false)}
    />
    </>
  )
}

