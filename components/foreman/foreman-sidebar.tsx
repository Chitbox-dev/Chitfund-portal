"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Bell,
  Plus,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  User,
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/foreman/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Schemes",
    href: "/foreman/schemes",
    icon: CreditCard,
    badge: "3",
    children: [
      {
        title: "All Schemes",
        href: "/foreman/schemes",
        icon: FileText,
      },
      {
        title: "Create Scheme",
        href: "/foreman/create-scheme",
        icon: Plus,
      },
    ],
  },
  {
    title: "Subscribers",
    href: "/foreman/subscribers",
    icon: Users,
    badge: "24",
  },
  {
    title: "Reports",
    href: "/foreman/reports",
    icon: BarChart3,
    children: [
      {
        title: "Monthly Reports",
        href: "/foreman/reports/monthly",
        icon: Calendar,
      },
      {
        title: "Financial Reports",
        href: "/foreman/reports/financial",
        icon: DollarSign,
      },
      {
        title: "Performance",
        href: "/foreman/reports/performance",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "Help & Support",
    href: "/foreman/help",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/foreman/settings",
    icon: Settings,
  },
]

export function ForemanSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("foremanToken")
    localStorage.removeItem("userType")
    localStorage.removeItem("foremanName")
    localStorage.removeItem("foremanEmail")

    // Clear cookies
    document.cookie = "admin_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "portal_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "user_type=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    // Redirect to login
    window.location.href = "/auth/login"
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Foreman Portal</h2>
              <p className="text-xs text-gray-500">Chit Fund Management</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">
                      {typeof window !== "undefined"
                        ? localStorage.getItem("foremanName") || "Foreman User"
                        : "Foreman User"}
                    </div>
                    <div className="text-xs text-gray-500">Foreman</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <div>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start p-3 h-auto ${
                      item.children.some((child) => isActive(child.href))
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleExpanded(item.title)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronDown
                      className={`h-4 w-4 ml-2 transition-transform ${
                        expandedItems.includes(item.title) ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  {expandedItems.includes(item.title) && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start p-2 h-auto text-sm ${
                              isActive(child.href)
                                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <child.icon className="h-4 w-4 mr-3" />
                            {child.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start p-3 h-auto ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-900">Need Help?</div>
                  <div className="text-xs text-blue-700">Contact support</div>
                </div>
              </div>
              <Link href="/foreman/help">
                <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                  Get Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Named export for the component
