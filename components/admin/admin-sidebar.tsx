"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Shield,
  FileText,
  Settings,
  BarChart3,
  CreditCard,
  CheckSquare,
  Workflow,
  LogOut,
  ChevronDown,
  Building,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Access Requests",
    href: "/admin/access-requests",
    icon: Shield,
    badge: "New",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Foremen",
    href: "/admin/foremen",
    icon: UserCheck,
  },
  {
    title: "Schemes",
    href: "/admin/schemes",
    icon: FileText,
    submenu: [
      { title: "All Schemes", href: "/admin/schemes" },
      { title: "Reports", href: "/admin/schemes/reports" },
    ],
  },
  {
    title: "Card Tracking",
    href: "/admin/card-tracking",
    icon: CreditCard,
  },
  {
    title: "Approvals",
    href: "/admin/approvals",
    icon: CheckSquare,
  },
  {
    title: "Workflow Management",
    href: "/admin/workflow-management",
    icon: Workflow,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">Chit Fund Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.submenu ? (
                <div>
                  <SidebarMenuButton
                    onClick={() => toggleExpanded(item.title)}
                    className={cn("w-full justify-between", isActive(item.href) && "bg-blue-50 text-blue-700")}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", expandedItems.includes(item.title) && "rotate-180")}
                    />
                  </SidebarMenuButton>
                  {expandedItems.includes(item.title) && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.href} href={subItem.href}>
                          <SidebarMenuButton
                            className={cn("w-full text-sm", isActive(subItem.href) && "bg-blue-50 text-blue-700")}
                          >
                            {subItem.title}
                          </SidebarMenuButton>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href}>
                  <SidebarMenuButton className={cn("w-full", isActive(item.href) && "bg-blue-50 text-blue-700")}>
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </Link>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@chitfund.com</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900 bg-transparent"
            onClick={() => {
              // Handle admin logout
              window.location.href = "/access-request"
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
