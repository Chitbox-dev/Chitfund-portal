"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Users,
  FileText,
  BarChart3,
  HelpCircle,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Foreman User",
    email: "foreman@ucfsin.com",
    avatar: "/avatars/foreman.jpg",
  },
  teams: [
    {
      name: "UCFSIN Foreman",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Chit Fund Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Regional Office",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/foreman/dashboard",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Schemes",
      url: "/foreman/schemes",
      icon: FileText,
      items: [
        {
          title: "All Schemes",
          url: "/foreman/schemes",
        },
        {
          title: "Create New",
          url: "/foreman/create-scheme",
        },
        {
          title: "Drafts",
          url: "/foreman/schemes/drafts",
        },
      ],
    },
    {
      title: "Subscribers",
      url: "/foreman/subscribers",
      icon: Users,
      items: [
        {
          title: "All Subscribers",
          url: "/foreman/subscribers",
        },
        {
          title: "Add Subscriber",
          url: "/foreman/subscribers/add",
        },
        {
          title: "Bulk Import",
          url: "/foreman/subscribers/import",
        },
      ],
    },
    {
      title: "Reports",
      url: "/foreman/reports",
      icon: PieChart,
      items: [
        {
          title: "Monthly Reports",
          url: "/foreman/reports/monthly",
        },
        {
          title: "Scheme Performance",
          url: "/foreman/reports/performance",
        },
        {
          title: "Financial Summary",
          url: "/foreman/reports/financial",
        },
      ],
    },
    {
      title: "Help & Support",
      url: "/foreman/help",
      icon: HelpCircle,
    },
  ],
  projects: [
    {
      name: "Active Schemes",
      url: "/foreman/schemes?status=active",
      icon: Frame,
    },
    {
      name: "Pending Approval",
      url: "/foreman/schemes?status=pending",
      icon: PieChart,
    },
    {
      name: "Completed Schemes",
      url: "/foreman/schemes?status=completed",
      icon: Map,
    },
  ],
}

export function ForemanSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState(data.user)

  React.useEffect(() => {
    // Load foreman data from localStorage
    const foremanData = localStorage.getItem("foremanData")
    const foremanId = localStorage.getItem("foremanId")

    if (foremanData) {
      try {
        const parsed = JSON.parse(foremanData)
        setUser({
          name: parsed.name || "Foreman User",
          email: parsed.email || "foreman@ucfsin.com",
          avatar: parsed.avatar || "/avatars/foreman.jpg",
        })
      } catch (error) {
        console.error("Error parsing foreman data:", error)
      }
    } else if (foremanId) {
      // Try to find foreman in the lists
      try {
        const foremenList = JSON.parse(localStorage.getItem("foremenList") || "[]")
        const dynamicForemen = JSON.parse(localStorage.getItem("dynamicForemen") || "[]")

        const foundForeman = [...foremenList, ...dynamicForemen].find((f) => f.id === foremanId)

        if (foundForeman) {
          const userData = {
            name: foundForeman.name || "Foreman User",
            email: foundForeman.email || "foreman@ucfsin.com",
            avatar: foundForeman.avatar || "/avatars/foreman.jpg",
          }
          setUser(userData)
          // Store for future use
          localStorage.setItem("foremanData", JSON.stringify(userData))
        }
      } catch (error) {
        console.error("Error loading foreman from lists:", error)
      }
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
