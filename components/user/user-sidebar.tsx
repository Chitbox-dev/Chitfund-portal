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
  User,
  CreditCard,
  Star,
  Receipt,
  History,
  FileText,
  HelpCircle,
  Bell,
  LogOut,
  Settings,
  Shield,
  Copy,
  Eye,
  EyeOff,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
      { name: "Profile", href: "/user/profile", icon: User },
    ],
  },
  {
    title: "Chit Fund",
    items: [
      { name: "My Schemes", href: "/user/schemes", icon: CreditCard },
      { name: "UCFSIN Card", href: "/user/card", icon: CreditCard },
      { name: "Chit Score", href: "/user/score", icon: Star },
    ],
  },
  {
    title: "Transactions",
    items: [
      { name: "Payments", href: "/user/payments", icon: Receipt },
      { name: "History", href: "/user/history", icon: History },
      { name: "Reports", href: "/user/reports", icon: FileText },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Help Center", href: "/user/help", icon: HelpCircle },
      { name: "Notifications", href: "/user/notifications", icon: Bell, badge: "3" },
    ],
  },
]

// Mock user data
const userData = {
  id: "USR001",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 98765 43210",
  address: "Mumbai, Maharashtra",
  joinDate: "2024-01-15",
  ucfsin: "UCFSIN-2024-001234",
  status: "Active",
  avatar: "/placeholder.svg?height=40&width=40",
  stats: {
    activeSchemes: 2,
    chitScore: 850,
    totalPaid: "₹52,000",
  },
}

export function UserSidebar() {
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showCredentials, setShowCredentials] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userType")
    router.push("/auth/login")
    setShowLogoutDialog(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <Sidebar collapsible="offcanvas" className="border-r bg-white">
        <SidebarHeader className="border-b bg-gradient-to-r from-purple-600 to-blue-700 text-white">
          <div className="flex items-center gap-3 px-3 py-4 group-data-[collapsible=icon]:px-2">
            <div className="flex items-center gap-2 w-full">
              <Shield className="h-6 w-6 flex-shrink-0" />
              <div className="group-data-[collapsible=icon]:hidden flex-1 min-w-0">
                <h2 className="text-lg font-semibold truncate">User Portal</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    Member
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
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 mb-3">Quick Overview</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Card className="p-3 bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-1 bg-purple-100 rounded flex-shrink-0 mb-1">
                        <CreditCard className="h-3 w-3 text-purple-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{userData.stats.activeSchemes}</p>
                        <p className="text-xs text-gray-500">Schemes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-1 bg-blue-100 rounded flex-shrink-0 mb-1">
                        <Star className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{userData.stats.chitScore}</p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-1 bg-green-100 rounded flex-shrink-0 mb-1">
                        <Receipt className="h-3 w-3 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{userData.stats.totalPaid}</p>
                        <p className="text-xs text-gray-500">Paid</p>
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
                        <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-sm">
                          {userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left group-data-[collapsible=icon]:hidden min-w-0">
                        <p className="text-sm font-medium truncate">{userData.name}</p>
                        <p className="text-xs text-gray-500 truncate">ID: {userData.id}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 group-data-[collapsible=icon]:hidden flex-shrink-0" />
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="end" className="w-64 z-50">
                  <div className="p-3 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{userData.name}</p>
                        <p className="text-sm text-gray-500 truncate">User ID: {userData.id}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {userData.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-b">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{userData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{userData.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">
                          Since {new Date(userData.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuItem onClick={() => setShowCredentials(true)} className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    View Credentials
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/user/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
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

      {/* Credentials Dialog */}
      <Dialog open={showCredentials} onOpenChange={setShowCredentials}>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>User Credentials</DialogTitle>
            <DialogDescription>Your login credentials for the system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={userData.email}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(userData.email)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value="user123"
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
                <Button size="sm" variant="outline" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard("user123")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">UCFSIN</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={userData.ucfsin}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(userData.ucfsin)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You will need to login again to access your account.
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

export default UserSidebar
