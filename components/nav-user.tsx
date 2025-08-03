"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface User {
  name: string
  email: string
  avatar?: string
  role?: string
}

export function NavUser({
  user: propUser,
}: {
  user?: User
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Determine user type and load appropriate data
    const userType = localStorage.getItem("userType")

    if (propUser) {
      setUser(propUser)
      return
    }

    let userData: User | null = null

    switch (userType) {
      case "admin":
        userData = {
          name: "Admin User",
          email: "admin@ucfsin.com",
          avatar: "/avatars/admin.jpg",
          role: "Administrator",
        }
        break

      case "foreman":
        // Try to get foreman data from various sources
        const foremanId = localStorage.getItem("foremanId")
        const foremanData = localStorage.getItem("foremanData")

        if (foremanData) {
          const parsed = JSON.parse(foremanData)
          userData = {
            name: parsed.name || "Foreman User",
            email: parsed.email || "foreman@ucfsin.com",
            avatar: parsed.avatar || "/avatars/foreman.jpg",
            role: "Foreman",
          }
        } else if (foremanId) {
          // Try to find in foremen lists
          const foremenList = JSON.parse(localStorage.getItem("foremenList") || "[]")
          const dynamicForemen = JSON.parse(localStorage.getItem("dynamicForemen") || "[]")

          const foundForeman = [...foremenList, ...dynamicForemen].find((f) => f.id === foremanId)

          if (foundForeman) {
            userData = {
              name: foundForeman.name || "Foreman User",
              email: foundForeman.email || "foreman@ucfsin.com",
              avatar: foundForeman.avatar || "/avatars/foreman.jpg",
              role: "Foreman",
            }
            // Store for future use
            localStorage.setItem("foremanData", JSON.stringify(userData))
          }
        }

        if (!userData) {
          userData = {
            name: "Foreman User",
            email: "foreman@ucfsin.com",
            avatar: "/avatars/foreman.jpg",
            role: "Foreman",
          }
        }
        break

      case "user":
        const userId = localStorage.getItem("userId")
        const userName = localStorage.getItem("userName") || "User"
        const userEmail = localStorage.getItem("userEmail") || "user@ucfsin.com"

        userData = {
          name: userName,
          email: userEmail,
          avatar: "/avatars/user.jpg",
          role: "User",
        }
        break

      default:
        userData = {
          name: "Guest User",
          email: "guest@ucfsin.com",
          avatar: "/avatars/guest.jpg",
          role: "Guest",
        }
    }

    setUser(userData)
  }, [propUser])

  const handleLogout = () => {
    try {
      const userType = localStorage.getItem("userType")

      // Clear user-specific data based on type
      switch (userType) {
        case "admin":
          localStorage.removeItem("adminToken")
          localStorage.removeItem("adminId")
          localStorage.removeItem("adminData")
          break

        case "foreman":
          localStorage.removeItem("foremanToken")
          localStorage.removeItem("foremanId")
          localStorage.removeItem("foremanData")
          localStorage.removeItem("schemeDraft")
          break

        case "user":
          localStorage.removeItem("userToken")
          localStorage.removeItem("userId")
          localStorage.removeItem("userName")
          localStorage.removeItem("userEmail")
          localStorage.removeItem("userData")
          break
      }

      // Clear common data
      localStorage.removeItem("userType")
      localStorage.removeItem("isLoggedIn")

      // Clear session storage as well
      sessionStorage.clear()

      // Force page reload to clear any cached state
      window.location.href = "/auth/login"
    } catch (error) {
      console.error("Error during logout:", error)
      // Fallback: clear everything and redirect
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = "/auth/login"
    }
  }

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">?</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Loading...</span>
              <span className="truncate text-xs">Please wait</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
