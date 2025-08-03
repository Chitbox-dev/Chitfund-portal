"use client"

import * as React from "react"
import {
  Shield,
  BarChart3,
  Users,
  FileText,
  CreditCard,
  Settings,
  HelpCircle,
  UserCheck,
  Building,
  TrendingUp,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// Admin navigation data
const data = {
  user: {
    name: "Admin User",
    email: "admin@ucfsin.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "UCFSIN Admin",
      logo: Shield,
      plan: "Enterprise",
    },
    {
      name: "System Control",
      logo: Settings,
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Scheme Management",
      url: "/admin/schemes",
      icon: FileText,
      items: [
        {
          title: "All Schemes",
          url: "/admin/schemes",
        },
        {
          title: "Pending Approvals",
          url: "/admin/approvals",
        },
        {
          title: "Scheme Reports",
          url: "/admin/schemes/reports",
        },
      ],
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/admin/users",
        },
        {
          title: "Foremen",
          url: "/admin/foremen",
        },
        {
          title: "Access Requests",
          url: "/admin/access-requests",
        },
      ],
    },
    {
      title: "Card Tracking",
      url: "/admin/card-tracking",
      icon: CreditCard,
      items: [
        {
          title: "Physical Cards",
          url: "/admin/card-tracking",
        },
        {
          title: "Digital Cards",
          url: "/admin/card-tracking/digital",
        },
        {
          title: "Card Requests",
          url: "/admin/card-tracking/requests",
        },
      ],
    },
    {
      title: "System Settings",
      url: "/admin/settings",
      icon: Settings,
      items: [
        {
          title: "General Settings",
          url: "/admin/settings",
        },
        {
          title: "Workflow Management",
          url: "/admin/workflow-management",
        },
        {
          title: "System Logs",
          url: "/admin/logs",
        },
      ],
    },
    {
      title: "Help & Support",
      url: "/admin/help-requests",
      icon: HelpCircle,
    },
  ],
  projects: [
    {
      name: "Pending Approvals",
      url: "/admin/approvals",
      icon: UserCheck,
    },
    {
      name: "Active Schemes",
      url: "/admin/schemes?status=live",
      icon: TrendingUp,
    },
    {
      name: "System Health",
      url: "/admin/system-health",
      icon: Building,
    },
  ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState(data.user)

  React.useEffect(() => {
    // Load admin data from localStorage
    const adminData = localStorage.getItem("adminData")
    const adminId = localStorage.getItem("adminId")

    if (adminData) {
      try {
        const parsed = JSON.parse(adminData)
        setUser({
          name: parsed.name || "Admin User",
          email: parsed.email || "admin@ucfsin.com",
          avatar: parsed.avatar || "/avatars/admin.jpg",
        })
      } catch (error) {
        console.error("Error parsing admin data:", error)
      }
    } else {
      // Set default admin data
      const defaultAdminData = {
        name: "Admin User",
        email: "admin@ucfsin.com",
        avatar: "/avatars/admin.jpg",
      }
      setUser(defaultAdminData)
      localStorage.setItem("adminData", JSON.stringify(defaultAdminData))
    }
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
