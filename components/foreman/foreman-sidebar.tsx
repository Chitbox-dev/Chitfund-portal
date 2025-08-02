"use client"

import type * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, FileText, Plus, Users, UserPlus, BarChart3, HelpCircle, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronUp, User, CreditCard } from "lucide-react"

export function ForemanSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    // Clear all authentication tokens and user data
    localStorage.removeItem("foremanToken")
    localStorage.removeItem("userToken")
    localStorage.removeItem("adminToken")
    localStorage.removeItem("userType")
    localStorage.removeItem("foremanData")

    // Clear any session storage
    sessionStorage.clear()

    // Redirect to login page
    router.push("/auth/login")
    setShowLogoutDialog(false)
  }

  return (
    <>
      <Sidebar variant="sidebar" className="border-r border-gray-200 bg-white" {...props}>
        <SidebarHeader className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50 p-3 shrink-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-white/80 data-[state=open]:text-gray-900 hover:bg-white/60 transition-all duration-200 w-full"
              >
                <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg shrink-0">
                  <span className="font-bold text-sm">UC</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                  <span className="truncate font-bold text-gray-900">UCFSIN Foreman</span>
                  <span className="truncate text-xs text-gray-600">Scheme Management</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto bg-gray-50/30 px-2 py-3 flex-1">
          {/* Overview */}
          <SidebarGroup className="mb-4">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-1">
              Overview
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-1"
                    tooltip="Dashboard"
                  >
                    <a href="/foreman/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 text-blue-600 shrink-0">
                        <LayoutDashboard className="h-4 w-4" />
                      </div>
                      <span className="truncate">Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Scheme Management */}
          <SidebarGroup className="mb-4">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-1">
              Scheme Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-1"
                    tooltip="My Schemes"
                  >
                    <a href="/foreman/schemes" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-100 text-purple-600 shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="truncate">My Schemes</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-1"
                    tooltip="Create Scheme"
                  >
                    <a
                      href="/foreman/create-scheme"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-green-100 text-green-600 shrink-0">
                        <Plus className="h-4 w-4" />
                      </div>
                      <span className="truncate">Create Scheme</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Subscriber Management */}
          <SidebarGroup className="mb-4">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-1">
              Subscriber Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-1"
                    tooltip="All Subscribers"
                  >
                    <a href="/foreman/subscribers" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-100 text-orange-600 shrink-0">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="truncate">All Subscribers</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-1"
                    tooltip="Add Subscriber"
                  >
                    <a
                      href="/foreman/subscribers/add"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-100 text-teal-600 shrink-0">
                        <UserPlus className="h-4 w-4" />
                      </div>
                      <span className="truncate">Add Subscriber</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Reports & Analytics */}
          <SidebarGroup className="mb-4">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-1">
              Reports & Analytics
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-1"
                    tooltip="Scheme Reports"
                  >
                    <a href="/foreman/reports" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 shrink-0">
                        <BarChart3 className="h-4 w-4" />
                      </div>
                      <span className="truncate">Scheme Reports</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Support */}
          <SidebarGroup className="mb-4">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-1">
              Support
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-1"
                    tooltip="Help & Support"
                  >
                    <a href="/foreman/help" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-yellow-100 text-yellow-600 shrink-0">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <span className="truncate">Help & Support</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* System */}
          <SidebarGroup className="mb-4">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-1">
              System
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-1"
                    tooltip="Settings"
                  >
                    <a href="/foreman/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-600 shrink-0">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span className="truncate">Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-200 bg-white p-2 shrink-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-gray-50 data-[state=open]:text-gray-900 w-full hover:bg-gray-50 transition-all duration-200 rounded-xl p-2"
                  >
                    <Avatar className="h-8 w-8 rounded-xl border-2 border-green-200 shrink-0">
                      <AvatarImage src="/avatars/rajesh.jpg" alt="Rajesh Kumar" />
                      <AvatarFallback className="rounded-xl bg-gradient-to-br from-green-600 to-green-700 text-white font-bold text-xs">
                        RK
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                      <span className="truncate font-semibold text-gray-900">Rajesh Kumar</span>
                      <span className="truncate text-xs text-gray-500">rajesh@ucfsin.com</span>
                    </div>
                    <ChevronUp className="ml-auto size-4 shrink-0 text-gray-400" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border border-gray-200 bg-white shadow-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-lg m-1 p-2">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-lg m-1 p-2">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="font-medium">Billing & Plans</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-red-50 text-red-600 rounded-lg m-1 p-2"
                    onClick={() => setShowLogoutDialog(true)}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span className="font-medium">Sign out</span>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-red-600" />
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to logout from your foreman account? You will need to login again to access the
              portal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)} className="hover:bg-gray-50">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
