"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ForemanSidebar } from "@/components/foreman/foreman-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function ForemanLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [foremanData, setForemanData] = useState({
    name: "Aakash Savant",
    id: "FM001",
    status: "Active",
    successRate: "98.5%",
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("foremanToken")
    if (!token && !pathname.includes("/auth/")) {
      window.location.href = "/auth/login"
      return
    }
    setIsLoading(false)
  }, [pathname])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    // Always start with Foreman Portal
    breadcrumbs.push({
      title: "Foreman Portal",
      href: "/foreman",
      isLast: segments.length <= 1,
    })

    if (segments.length > 1) {
      const pathMap = {
        dashboard: "Dashboard",
        schemes: "My Schemes",
        "create-scheme": "Create Scheme",
        analytics: "Analytics",
        subscribers: "Subscribers",
        auctions: "Auctions",
        payments: "Payments",
        performance: "Performance",
        settings: "Settings",
        profile: "Profile",
        preferences: "Preferences",
        credentials: "Credentials",
        help: "Help & Support",
      }

      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i]
        const isLast = i === segments.length - 1
        const href = "/" + segments.slice(0, i + 1).join("/")

        breadcrumbs.push({
          title: pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
          href: href,
          isLast: isLast,
        })
      }
    }

    return breadcrumbs
  }

  const isFormPage = pathname.includes("/create-scheme") || pathname.includes("/edit-scheme")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <ForemanSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="flex-1" />
            </div>
          </header>
          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
