```typescriptreact file="components/admin/admin-sidebar.tsx"
[v0-no-op-code-block-prefix]"use client"

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
import { LayoutDashboard, Users, UserCheck, FileCheck, CreditCard, BarChart3, Settings, FileText, Gavel, Receipt, AlertTriangle, Database, Shield, LogOut, ChevronDown, Mail, Phone, MapPin, Calendar, Crown } from 'lucide-react'

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "User Management",
    items: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Foremen", href: "/admin/foremen", icon: UserCheck },
      { name: "Card Tracking", href: "/admin/card-tracking", icon: CreditCard },
    ],
  },
  {
    title: "Scheme Management",
    items: [
      { name: "Schemes", href: "/admin/schemes", icon: FileCheck },
      { name: "Approvals", href: "/admin/approvals", icon: Gavel, badge: "5" },
      { name: "Auctions", href: "/admin/auctions", icon: Receipt },
    ],
  },
  {
    title: "System",
    items: [
    { name: "Workflow Management", href: "/admin/workflow-management", icon: Settings },
      { name: "Reports", href: "/admin/reports", icon: FileText },
      { name: "Transactions", href: "/admin/transactions", icon: Receipt },
      { name: "Alerts", href: "/admin/alerts", icon: AlertTriangle, badge: "3" },
      { name: "Database", href: "/admin/database", icon: Database },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
]

// Mock admin data
const adminData = {
  id: "ADM001",
  name: "System Administrator",
  email: "admin@chitfundportal.com",
  phone: "+91 98765 43210",
  address: "Mumbai, Maharashtra",
  joinDate: "2023-01-01",
  role: "Super Admin",
  status: "Active",
  avatar: "/placeholder.svg?height=40&width=40",
  stats: {
    totalUsers: 1247,
    activeSchemes: 89,
    pendingApprovals: 12,
  },
}

export function AdminSidebar() {
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("userType")
    router.push("/auth/login")
    setShowLogoutDialog(false)
  }

  return (
    <>
      <Sidebar collapsible="offcanvas" className="border-r bg-white">
        <SidebarHeader className="border-b bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <div className="flex items-center gap-3 px-3 py-4 group-data-[collapsible=icon]:px-2">
            <div className="flex items-center gap-2 w-full">
              <Shield className="h-6 w-6 flex-shrink-0" />
              <div className="group-data-[collapsible=icon]:hidden flex-1 min-w-0">
                <h2 className="text-lg font-semibold truncate">Admin Portal</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    <Crown className="h-3 w-3 mr-1" />
                    Super Admin
                  </Badge>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs opacity-90">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 py-4 bg-white">
          {/* Quick Stats */}
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 mb-3">System Overview</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Card className="p-3 bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-1 bg-blue-100 rounded flex-shrink-0 mb-1">
                        <Users className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{adminData.stats.totalUsers}</p>
                        <p className="text-xs text-gray-500">Users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-1 bg-green-100 rounded flex-shrink-0 mb-1">
                        <FileCheck className="h-3 w-3 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{adminData.stats.activeSchemes}</p>
                        <p className="text-xs text-gray-500">Schemes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-1 bg-orange-100 rounded flex-shrink-0 mb-1">
                        <Gavel className="h-3 w-3 text-orange-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{adminData.stats.pendingApprovals}</p>
                        <p className="text-xs text-gray-500">Pending</p>
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
                        <AvatarImage src={adminData.avatar || "/placeholder.svg"} alt={adminData.name} />
                        <AvatarFallback className="bg-slate-100 text-slate-600 text-sm">
                          {adminData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left group-data-[collapsible=icon]:hidden min-w-0">
                        <p className="text-sm font-medium truncate">{adminData.name}</p>
                        <p className="text-xs text-gray-500 truncate">ID: {adminData.id}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 group-data-[collapsible=icon]:hidden flex-shrink-0" />
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="end" className="w-64 z-50">
                  <div className="p-3 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={adminData.avatar || "/placeholder.svg"} alt={adminData.name} />
                        <AvatarFallback className="bg-slate-100 text-slate-600">
                          {adminData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{adminData.name}</p>
                        <p className="text-sm text-gray-500 truncate">Admin ID: {adminData.id}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          <Crown className="h-3 w-3 mr-1" />
                          {adminData.role}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-b">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{adminData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{adminData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{adminData.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">
                          Since {new Date(adminData.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuItem asChild>
                    <a href="/admin/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      System Settings
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
              Are you sure you want to logout from the admin portal? You will need to login again to access the system.
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

export default AdminSidebar
