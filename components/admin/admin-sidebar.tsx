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
  CreditCard,
  BarChart3,
  Shield,
  UserCheck,
  TrendingUp,
  Package,
  ChevronUp,
  LogOut,
  User,
  Bell,
  HelpCircle,
  Workflow,
  CheckSquare,
  AlertTriangle,
  MessageSquare,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const navigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "All Approvals",
        url: "/admin/approvals",
        icon: CheckSquare,
        badge: "12",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Foremen",
        url: "/admin/foremen",
        icon: UserCheck,
      },
      {
        title: "Access Requests",
        url: "/admin/access-requests",
        icon: Shield,
        badge: "5",
      },
    ],
  },
  {
    title: "Scheme Management",
    items: [
      {
        title: "All Schemes",
        url: "/admin/schemes",
        icon: FileText,
      },
      {
        title: "Scheme Reports",
        url: "/admin/schemes/reports",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Support & Help",
    items: [
      {
        title: "Help Requests",
        url: "/admin/help-requests",
        icon: HelpCircle,
        badge: "8",
      },
      {
        title: "Grievances",
        url: "/admin/grievances",
        icon: AlertTriangle,
        badge: "3",
      },
      {
        title: "Feedback",
        url: "/admin/feedback",
        icon: MessageSquare,
        badge: "5",
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Card Tracking",
        url: "/admin/card-tracking",
        icon: CreditCard,
      },
      {
        title: "Monthly Reports",
        url: "/reports/monthly",
        icon: TrendingUp,
      },
      {
        title: "Workflow Management",
        url: "/admin/workflow-management",
        icon: Workflow,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
      {
        title: "System Health",
        url: "/admin/system-health",
        icon: Package,
      },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    try {
      // Clear admin token from localStorage
      localStorage.removeItem("adminToken")

      // Clear any other admin-related data
      localStorage.removeItem("adminUser")
      localStorage.removeItem("adminSession")

      // Clear session storage as well
      sessionStorage.clear()

      // Show success message
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin panel.",
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
    router.push("/admin/account")
  }

  const handleNotificationsClick = () => {
    router.push("/admin/notifications")
  }

  const handleSupportClick = () => {
    router.push("/admin/support")
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-sidebar-primary-foreground">
            <Shield className="size-4 text-white" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">UCFSIN Admin</span>
            <span className="truncate text-xs text-muted-foreground">Control Panel</span>
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
                    <SidebarMenuButton asChild isActive={pathname === item.url} className="relative">
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                            {item.badge}
                          </span>
                        )}
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
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin User</span>
                    <span className="truncate text-xs">admin@ucfsin.com</span>
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
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                        AD
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Admin User</span>
                      <span className="truncate text-xs">admin@ucfsin.com</span>
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
                  <span>Support</span>
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
