"use client"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Clear conflicting sessions and ensure admin session
    const currentUserType = localStorage.getItem("userType")

    if (currentUserType !== "admin") {
      // Clear all conflicting data
      localStorage.clear()
      sessionStorage.clear()

      // Set admin session
      localStorage.setItem("userType", "admin")
      localStorage.setItem("adminToken", "admin-session-" + Date.now())
      localStorage.setItem("adminId", "admin-" + Math.random().toString(36).substr(2, 9))
    }

    // Check authentication
    const token = localStorage.getItem("adminToken")
    if (!token && !pathname.includes("/auth/")) {
      window.location.href = "/auth/login"
      return
    }

    setIsLoading(false)
  }, [pathname])

  // Listen for storage changes to handle cross-tab logout
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userType" && e.newValue !== "admin") {
        window.location.href = "/auth/login"
      }
      if (e.key === "adminToken" && !e.newValue) {
        window.location.href = "/auth/login"
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <div className="w-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
