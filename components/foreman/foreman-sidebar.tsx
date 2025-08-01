"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  FileText,
  Settings,
  BarChart3,
  Plus,
  ChevronUp,
  LogOut,
  User,
  Bell,
  HelpCircle,
  UserPlus,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const navigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/foreman/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Scheme Management",
    items: [
      {
        title: "My Schemes",
        url: "/foreman/schemes",
        icon: FileText,
      },
      {
        title: "Create Scheme",
        url: "/foreman/create-scheme",
        icon: Plus,
      },
    ],
  },
  {
    title: "Subscriber Management",
    items: [
      {
        title: "All Subscribers",
        url: "/foreman/subscribers",
        icon: Users,
      },
      {
        title: "Add Subscriber",
        url: "/foreman/subscribers/add",
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Reports & Analytics",
    items: [
      {
        title: "Scheme Reports",
        url: "/foreman/reports",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Help & Support",
        url: "/foreman/help",
        icon: HelpCircle,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        url: "/foreman/settings",
        icon: Settings,
      },
    ],
  },
]

export function ForemanSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    try {
      // Clear foreman token from localStorage
      localStorage.removeItem("foremanToken")

      // Clear any other foreman-related data
      localStorage.removeItem("foremanUser")
      localStorage.removeItem("foremanSession")

      // Clear session storage as well
      sessionStorage.clear()

      // Show success message
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the foreman panel.",
      })

      // Redirect to login page
      router.push("/auth/login")

      // Force page reload to clear any cached data
      setTimeout(() => {
        window.location.href = "/auth/login"
      }, 100)
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout Error",
        description: "There was an issue logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAccountClick = () => {
    router.push("/foreman/account")
  }

  const handleNotificationsClick = () => {
    router.push("/foreman/notifications")
  }

  const handleSupportClick = () => {
    router.push("/foreman/help")
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-green-700 text-sidebar-primary-foreground">
            <Users className="size-4 text-white" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">UCFSIN Foreman</span>
            <span className="truncate text-xs text-muted-foreground">Scheme Management</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
                      AS
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Aakash Savant</span>
                    <span className="truncate text-xs">aakash@ucfsin.com</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
                        AS
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Aakash Savant</span>
                      <span className="truncate text-xs">aakash@ucfsin.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAccountClick} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleNotificationsClick} className="cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSupportClick} className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
