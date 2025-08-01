"use client"

import type * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
  Users,
  FileText,
  DollarSign,
  Calendar,
  HelpCircle,
  BarChart3,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Rajesh Kumar",
    email: "rajesh@chitfunds.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Kumar Chit Funds",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/foreman",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Scheme Management",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Create New Scheme",
          url: "/foreman/create-scheme",
        },
        {
          title: "My Schemes",
          url: "/foreman/schemes",
        },
        {
          title: "Scheme Reports",
          url: "/foreman/schemes/reports",
        },
      ],
    },
    {
      title: "Subscriber Management",
      url: "#",
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
          title: "Subscriber Reports",
          url: "/foreman/subscribers/reports",
        },
      ],
    },
    {
      title: "Financial Management",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Payment Tracking",
          url: "/foreman/payments",
        },
        {
          title: "Commission Reports",
          url: "/foreman/commission",
        },
        {
          title: "Financial Summary",
          url: "/foreman/financial-summary",
        },
      ],
    },
    {
      title: "Auction Management",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Upcoming Auctions",
          url: "/foreman/auctions",
        },
        {
          title: "Auction History",
          url: "/foreman/auctions/history",
        },
        {
          title: "Bidding Analytics",
          url: "/foreman/auctions/analytics",
        },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Performance Dashboard",
          url: "/foreman/analytics",
        },
        {
          title: "Monthly Reports",
          url: "/foreman/reports/monthly",
        },
        {
          title: "Compliance Reports",
          url: "/foreman/reports/compliance",
        },
      ],
    },
    {
      title: "Help & Support",
      url: "#",
      icon: HelpCircle,
      items: [
        {
          title: "Submit Request",
          url: "/foreman/help",
        },
        {
          title: "Documentation",
          url: "/foreman/help/docs",
        },
        {
          title: "Contact Support",
          url: "/foreman/help/contact",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Gold Savings Scheme",
      url: "/foreman/schemes/gold-savings",
      icon: Frame,
    },
    {
      name: "Business Growth Fund",
      url: "/foreman/schemes/business-growth",
      icon: PieChart,
    },
    {
      name: "Emergency Fund",
      url: "/foreman/schemes/emergency-fund",
      icon: Map,
    },
  ],
}

export function ForemanSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
