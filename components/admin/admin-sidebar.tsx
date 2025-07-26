"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  BarChart3,
  Shield,
  UserPlus,
  Gavel,
  AlertTriangle,
  CheckCircle,
  Clock,
  LogOut,
  User,
  ChevronDown,
  Key,
  Copy,
  Eye,
  EyeOff,
  UserCheck,
  HelpCircle,
  Database,
  Activity,
  Target,
  Zap,
  CreditCard,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const navigationItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
        badge: null,
        description: "System overview",
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: BarChart3,
        badge: null,
        description: "System analytics",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin/users",
        icon: Users,
        badge: "1,234",
        badgeVariant: "secondary",
        description: "Manage all users",
      },
      {
        title: "Foremen",
        url: "/admin/foremen",
        icon: UserCheck,
        badge: "45",
        badgeVariant: "default",
        description: "Manage foremen",
      },
      {
        title: "Add Foreman",
        url: "/admin/add-foreman",
        icon: UserPlus,
        badge: null,
        description: "Register new foreman",
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
        badge: "89",
        badgeVariant: "secondary",
        description: "All chit schemes",
      },
      {
        title: "Pending Approvals",
        url: "/admin/approvals",
        icon: Clock,
        badge: "12",
        badgeVariant: "destructive",
        description: "Schemes awaiting approval",
      },
      {
        title: "Active Schemes",
        url: "/admin/active-schemes",
        icon: CheckCircle,
        badge: "67",
        badgeVariant: "default",
        description: "Currently active schemes",
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
        badge: "156",
        badgeVariant: "secondary",
        description: "Physical card management",
      },
      {
        title: "Auctions",
        url: "/admin/auctions",
        icon: Gavel,
        badge: "23",
        badgeVariant: "secondary",
        description: "Auction management",
      },
      {
        title: "Transactions",
        url: "/admin/transactions",
        icon: Activity,
        badge: null,
        description: "Transaction monitoring",
      },
      {
        title: "Reports",
        url: "/admin/reports",
        icon: BarChart3,
        badge: null,
        description: "System reports",
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
        badge: null,
        description: "System configuration",
      },
      {
        title: "Database",
        url: "/admin/database",
        icon: Database,
        badge: null,
        description: "Database management",
      },
      {
        title: "Alerts",
        url: "/admin/alerts",
        icon: AlertTriangle,
        badge: "3",
        badgeVariant: "destructive",
        description: "System alerts",
      },
    ],
  },
]

const credentialsData = {
  admin: {
    title: "Admin Credentials",
    icon: Shield,
    color: "from-slate-600 to-slate-700",
    credentials: [
      {
        role: "Super Admin",
        email: "admin@chitfundportal.com",
        password: "Admin@123",
        description: "Full system access",
      },
    ],
  },
  foreman: {
    title: "Foreman Credentials",
    icon: UserCheck,
    color: "from-slate-600 to-slate-700",
    credentials: [
      {
        role: "Senior Foreman",
        name: "Aakash Savant",
        email: "aakash.savant@email.com",
        password: "aakash123",
        description: "5+ years experience",
      },
      {
        role: "Foreman",
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        password: "priya123",
        description: "8+ years experience",
      },
      {
        role: "Junior Foreman",
        name: "Amit Patel",
        email: "amit.patel@email.com",
        password: "amit123",
        description: "3+ years experience",
      },
    ],
  },
  user: {
    title: "User Credentials",
    icon: User,
    color: "from-slate-600 to-slate-700",
    credentials: [
      {
        role: "Premium User",
        name: "Demo User",
        email: "user@chitfundportal.com",
        password: "User@123",
        description: "Full user access",
      },
      {
        role: "Standard User",
        name: "Test User",
        email: "test@chitfundportal.com",
        password: "test123",
        description: "Standard access",
      },
    ],
  },
}

export function AdminSidebar({ ...props }) {
  const [activeItem, setActiveItem] = useState("/admin/dashboard")
  const [showCredentials, setShowCredentials] = useState(false)
  const [showPasswords, setShowPasswords] = useState({})
  const [adminProfile, setAdminProfile] = useState({
    id: "ADM001",
    name: "System Admin",
    email: "admin@chitfundportal.com",
    role: "Super Administrator",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("adminName") || "System Admin"
      const email = localStorage.getItem("adminEmail") || "admin@chitfundportal.com"

      setAdminProfile((prev) => ({
        ...prev,
        name,
        email,
      }))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("foremanToken")
    localStorage.removeItem("userToken")
    localStorage.removeItem("adminName")
    localStorage.removeItem("adminEmail")
    sessionStorage.clear()

    const confirmLogout = window.confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      window.location.href = "/auth/login"
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    console.log("Copied to clipboard:", text)
  }

  const togglePasswordVisibility = (key) => {
    setShowPasswords((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <Sidebar {...props} className="border-r border-slate-200 bg-white" collapsible="icon">
      <SidebarHeader className="border-b border-slate-200 p-4 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-bold text-slate-900">Admin Portal</h2>
            <p className="text-xs text-slate-600">System Management</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 group-data-[collapsible=icon]:hidden">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 text-center border border-white/20">
            <div className="text-lg font-bold text-slate-600">1,234</div>
            <div className="text-xs text-slate-600">Users</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 text-center border border-white/20">
            <div className="text-lg font-bold text-slate-600">89</div>
            <div className="text-xs text-slate-600">Schemes</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 text-center border border-white/20">
            <div className="text-lg font-bold text-slate-600">99.9%</div>
            <div className="text-xs text-slate-600">Uptime</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title} className="mb-4">
            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              {group.title === "Overview" && <Target className="h-3 w-3" />}
              {group.title === "User Management" && <Users className="h-3 w-3" />}
              {group.title === "Scheme Management" && <FileText className="h-3 w-3" />}
              {group.title === "Operations" && <Zap className="h-3 w-3" />}
              {group.title === "System" && <Settings className="h-3 w-3" />}
              <span className="group-data-[collapsible=icon]:hidden">{group.title}</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeItem === item.url}
                      tooltip={item.title}
                      className={`w-full justify-start gap-3 px-3 py-3 rounded-xl hover:bg-slate-100 transition-all duration-200 group ${
                        activeItem === item.url
                          ? "bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 shadow-sm"
                          : ""
                      }`}
                    >
                      <a
                        href={item.url}
                        onClick={() => setActiveItem(item.url)}
                        className="flex items-center gap-3 w-full"
                      >
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                            activeItem === item.url
                              ? "bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-md"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 group-data-[collapsible=icon]:hidden">
                          <div className="font-medium text-sm truncate">{item.title}</div>
                          <div className="text-xs text-slate-500 truncate">{item.description}</div>
                        </div>
                        {item.badge && (
                          <Badge
                            variant={item.badgeVariant || "default"}
                            className="h-5 px-2 text-xs font-medium group-data-[collapsible=icon]:hidden"
                          >
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

        {/* Credentials Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
            <Key className="h-3 w-3" />
            <span className="group-data-[collapsible=icon]:hidden">Quick Access</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Dialog open={showCredentials} onOpenChange={setShowCredentials}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-200 border-dashed border-2 border-slate-300 hover:border-slate-400 bg-transparent"
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white">
                    <Key className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                    <div className="font-medium text-sm">View Credentials</div>
                    <div className="text-xs text-slate-500">Demo login details</div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    System Login Credentials
                  </DialogTitle>
                  <DialogDescription>Demo credentials for testing different user roles in the system</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {Object.entries(credentialsData).map(([key, data]) => (
                    <Card key={key} className="border-0 shadow-lg">
                      <CardHeader className={`bg-gradient-to-r ${data.color} text-white rounded-t-lg`}>
                        <CardTitle className="flex items-center gap-3">
                          <data.icon className="h-6 w-6" />
                          {data.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {data.credentials.map((cred, index) => (
                            <div
                              key={index}
                              className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-slate-900">{cred.role}</h4>
                                  {cred.name && <p className="text-sm text-slate-600">{cred.name}</p>}
                                  <p className="text-xs text-slate-500">{cred.description}</p>
                                </div>
                                <Badge variant="outline" className="bg-white">
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Badge>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <label className="text-sm font-medium text-slate-600 w-20">Email:</label>
                                  <div className="flex-1 flex items-center gap-2">
                                    <code className="bg-white px-3 py-1 rounded border text-sm font-mono">
                                      {cred.email}
                                    </code>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => copyToClipboard(cred.email)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <label className="text-sm font-medium text-slate-600 w-20">Password:</label>
                                  <div className="flex-1 flex items-center gap-2">
                                    <code className="bg-white px-3 py-1 rounded border text-sm font-mono">
                                      {showPasswords[`${key}-${index}`] ? cred.password : "••••••••"}
                                    </code>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => togglePasswordVisibility(`${key}-${index}`)}
                                      className="h-8 w-8 p-0"
                                    >
                                      {showPasswords[`${key}-${index}`] ? (
                                        <EyeOff className="h-3 w-3" />
                                      ) : (
                                        <Eye className="h-3 w-3" />
                                      )}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => copyToClipboard(cred.password)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Alert className="border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <strong>Important:</strong> These are demo credentials for testing purposes only.
                    </AlertDescription>
                  </Alert>
                </div>
              </DialogContent>
            </Dialog>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 p-4 bg-gradient-to-r from-slate-50 to-slate-100">
        {/* System Status */}
        <div className="mb-4 p-3 bg-white rounded-xl border border-slate-200 shadow-sm group-data-[collapsible=icon]:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">System Status</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
          </div>
          <div className="text-xs text-slate-500">ID: {adminProfile.id} • Uptime: 99.9%</div>
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 border border-slate-200"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-md">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                <div className="text-sm font-semibold text-slate-900 truncate">{adminProfile.name}</div>
                <div className="text-xs text-slate-500 truncate">{adminProfile.email}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 shadow-xl border-0">
            <DropdownMenuLabel className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
              <div className="flex items-center gap-3 py-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold">{adminProfile.name}</div>
                  <div className="text-xs text-slate-500">{adminProfile.role}</div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-3 py-3">
              <User className="h-4 w-4 text-slate-600" />
              <div>
                <div className="font-medium">Profile Settings</div>
                <div className="text-xs text-slate-500">Manage your account</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3">
              <Settings className="h-4 w-4 text-slate-600" />
              <div>
                <div className="font-medium">System Settings</div>
                <div className="text-xs text-slate-500">Configure system</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3" onClick={() => setShowCredentials(true)}>
              <Key className="h-4 w-4 text-slate-600" />
              <div>
                <div className="font-medium">View Credentials</div>
                <div className="text-xs text-slate-500">Demo login details</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3">
              <HelpCircle className="h-4 w-4 text-slate-600" />
              <div>
                <div className="font-medium">Help & Support</div>
                <div className="text-xs text-slate-500">Get assistance</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="gap-3 py-3 text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <div>
                <div className="font-medium">Logout</div>
                <div className="text-xs text-slate-500">Sign out of your account</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
