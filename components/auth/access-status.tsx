"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, User, Building, UserCheck, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AccessStatus() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<{
    type: string
    email: string
    hasAccess: boolean
  } | null>(null)

  useEffect(() => {
    const getUserInfo = () => {
      const adminAccess = document.cookie.includes("admin_access=true")
      const portalAccess = document.cookie.includes("portal_access=true")

      if (!adminAccess && !portalAccess) {
        setUserInfo(null)
        return
      }

      const userTypeCookie = document.cookie.split("; ").find((row) => row.startsWith("user_type="))
      const emailCookie = document.cookie.split("; ").find((row) => row.startsWith("user_email="))

      const userType = userTypeCookie ? userTypeCookie.split("=")[1] : "unknown"
      const email = emailCookie ? decodeURIComponent(emailCookie.split("=")[1]) : "unknown"

      setUserInfo({
        type: userType,
        email: email,
        hasAccess: true,
      })
    }

    getUserInfo()
  }, [])

  const handleLogout = () => {
    // Clear all cookies
    document.cookie = "admin_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "portal_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "user_type=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "request_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    // Clear localStorage tokens
    localStorage.removeItem("adminToken")
    localStorage.removeItem("userToken")
    localStorage.removeItem("foremanToken")
    localStorage.removeItem("companyToken")

    // Redirect to access request
    router.push("/access-request")
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "company":
        return <Building className="h-4 w-4" />
      case "foreman":
        return <UserCheck className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "company":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "foreman":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "user":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!userInfo) {
    return null
  }

  return (
    <Card className="fixed top-4 right-4 z-50 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Badge className={getBadgeColor(userInfo.type)}>
            {getIcon(userInfo.type)}
            <span className="ml-1 capitalize">{userInfo.type}</span>
          </Badge>
          <div className="text-sm text-gray-600 hidden sm:block">{userInfo.email}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
