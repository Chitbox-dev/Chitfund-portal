"use client"

import React from "react"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ForemanSidebar } from "@/components/foreman/foreman-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ForemanLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [foremanData, setForemanData] = useState({
    name: "Aakash Savant",
    id: "FM001",
    status: "Active",
    successRate: "98.5%",
  })

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("foremanToken")
    if (!token && !pathname.includes("/auth/")) {
      window.location.href = "/auth/login"
      return
    }
    setIsLoading(false)
  }, [pathname])

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <ForemanSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 sm:h-16 items-center gap-4 px-4 sm:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="hidden sm:flex">
              <BreadcrumbList>
                {getBreadcrumbs().map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.href}>
                    <BreadcrumbItem className={breadcrumb.isLast ? "" : "hidden md:block"}>
                      {breadcrumb.isLast ? (
                        <BreadcrumbPage className="text-sm sm:text-base">{breadcrumb.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={breadcrumb.href} className="text-sm sm:text-base">
                          {breadcrumb.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!breadcrumb.isLast && <BreadcrumbSeparator className="hidden md:block" />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex-1" />
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
