"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  LayoutDashboard,
  FileText,
  Plus,
  Users,
  Gavel,
  Receipt,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  LogOut,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Shield,
} from "lucide-react"

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/foreman/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/foreman/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Scheme Management",
    items: [
      { name: "My Schemes", href: "/foreman/schemes", icon: FileText },
      { name: "Create Scheme", href: "/foreman/create-scheme", icon: Plus },
      { name: "Subscribers", href: "/foreman/subscribers", icon: Users },
    ],
  },
  {
    title: "Operations",
    items: [
      { name: "Auctions", href: "/foreman/auctions", icon: Gavel },
      { name: "Payments", href: "/foreman/payments", icon: Receipt },
      { name: "Performance", href: "/foreman/performance", icon: BarChart3 },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Settings", href: "/foreman/settings", icon: Settings },
      { name: "Help & Support", href: "/foreman/help", icon: HelpCircle },
      { name: "Notifications", href: "/foreman/notifications", icon: Bell, badge: "2" },
    ],
  },
]

// Mock foreman data
const foremanData = {
  id: "FM001",
  name: "Aakash Savant",
  email: "aakash.savant@email.com",
  phone: "+91 98765 43210",
  address: "Mumbai, Maharashtra",
  joinDate: "2023-06-15",
  role: "Senior Foreman",
  status: "Active",
  avatar: "/placeholder.svg?height=40&width=40",
  stats: {
    activeSchemes: 8,
    totalSubscribers: 156,
    successRate: "98.5%",
  },
}

export function ForemanSidebar() {
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("foremanToken")
    localStorage.removeItem("userType")
    router.push("/auth/login")
    setShowLogoutDialog(false)
  }

  return (
    <>
      <Sidebar collapsible="offcanvas" className="border-r bg-white">
        <SidebarHeader className="border-b bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="flex items-center gap-3 px-3 py-4 group-data-[collapsible=icon]:px-2">
            <div className="flex items-center gap-2 w-full">
              <Shield className="h-6 w-6 flex-shrink-0" />
              <div className="group-data-[collapsible=icon]:hidden flex-1 min-w-0">
                <h2 className="text-lg font-semibold truncate">Foreman Portal</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    <Briefcase className="h-3 w-3 mr-1" />
                    Foreman
                  </Badge>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs opacity-90">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 py-4 bg-white">
          {/* Quick Stats */}
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 mb-3">
              Performance Overview
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Card className="p-3 bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-1 bg-green-100 rounded flex-shrink-0 mb-1">
                        <FileText className="h-3 w-3 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{foremanData.stats.activeSchemes}</p>
                        <p className="text-xs text-gray-500">Schemes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-1 bg-blue-100 rounded flex-shrink-0 mb-1">
                        <Users className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{foremanData.stats.totalSubscribers}</p>
                        <p className="text-xs text-gray-500">Members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-1 bg-purple-100 rounded flex-shrink-0 mb-1">
                        <BarChart3 className="h-3 w-3 text-purple-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{foremanData.stats.successRate}</p>
                        <p className="text-xs text-gray-500">Success</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Navigation */}
          {navigation.map((section) => (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs font-medium text-gray-500 mb-2">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild tooltip={item.name} className="w-full">
                        <a
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{item.name}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="border-t p-2 bg-white">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full p-2">
                    <div className="flex items-center gap-3 w-full min-w-0">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={foremanData.avatar || "/placeholder.svg"} alt={foremanData.name} />
                        <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                          {foremanData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left group-data-[collapsible=icon]:hidden min-w-0">
                        <p className="text-sm font-medium truncate">{foremanData.name}</p>
                        <p className="text-xs text-gray-500 truncate">ID: {foremanData.id}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 group-data-[collapsible=icon]:hidden flex-shrink-0" />
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="end" className="w-64 z-50">
                  <div className="p-3 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={foremanData.avatar || "/placeholder.svg"} alt={foremanData.name} />
                        <AvatarFallback className="bg-green-100 text-green-600">
                          {foremanData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{foremanData.name}</p>
                        <p className="text-sm text-gray-500 truncate">Foreman ID: {foremanData.id}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {foremanData.role}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-b">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{foremanData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{foremanData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{foremanData.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">
                          Since {new Date(foremanData.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuItem asChild>
                    <a href="/foreman/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Profile Settings
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setShowLogoutDialog(true)}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout from the foreman portal? You will need to login again to access your
              schemes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ForemanSidebar
