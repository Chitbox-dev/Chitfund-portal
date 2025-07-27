"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
} from "lucide-react"

export function UserSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [showCredentials, setShowCredentials] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userType")
    router.push("/auth/login")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const menuItems = [
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

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">User Portal</h2>
            <p className="text-sm text-gray-600">Rajesh Kumar</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-purple-600">2</div>
            <div className="text-xs text-gray-600">Schemes</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">850</div>
            <div className="text-xs text-gray-600">Score</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">₹52K</div>
            <div className="text-xs text-gray-600">Paid</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {menuItems.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              View Credentials
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Credentials</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Username</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value="rajesh.kumar@email.com"
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard("rajesh.kumar@email.com")}>
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
                    value="UCFSIN-2024-001234"
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard("UCFSIN-2024-001234")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default UserSidebar
