"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ForemanSidebar } from "@/components/foreman/foreman-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function ForemanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Clear conflicting sessions and ensure foreman session
    const currentUserType = localStorage.getItem("userType")

    if (currentUserType !== "foreman") {
      // Clear all conflicting data
      localStorage.clear()
      sessionStorage.clear()

      // Set foreman session
      localStorage.setItem("userType", "foreman")
      localStorage.setItem("foremanToken", "foreman-session-" + Date.now())
      localStorage.setItem("foremanId", "foreman-" + Math.random().toString(36).substr(2, 9))
    }

    // Check authentication
    const token = localStorage.getItem("foremanToken")
    if (!token && !pathname.includes("/auth/")) {
      window.location.href = "/auth/login"
      return
    }

    setIsLoading(false)
  }, [pathname])

  // Listen for storage changes to handle cross-tab logout
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userType" && e.newValue !== "foreman") {
        window.location.href = "/auth/login"
      }
      if (e.key === "foremanToken" && !e.newValue) {
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
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Loading foreman dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <ForemanSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
