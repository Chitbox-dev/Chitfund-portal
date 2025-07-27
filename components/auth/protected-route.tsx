"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, AlertTriangle } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "user" | "foreman" | "company"
  fallbackPath?: string
}

export default function ProtectedRoute({
  children,
  requiredRole,
  fallbackPath = "/access-request",
}: ProtectedRouteProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const checkAccess = () => {
      // Check if user has any access
      const adminAccess = document.cookie.includes("admin_access=true")
      const portalAccess = document.cookie.includes("portal_access=true")

      if (!adminAccess && !portalAccess) {
        router.push(fallbackPath)
        return
      }

      // If specific role is required, check user type
      if (requiredRole) {
        const userTypeCookie = document.cookie.split("; ").find((row) => row.startsWith("user_type="))

        const userType = userTypeCookie ? userTypeCookie.split("=")[1] : null

        if (userType !== requiredRole) {
          router.push("/access-denied")
          return
        }
      }

      setHasAccess(true)
      setIsLoading(false)
    }

    checkAccess()
  }, [router, requiredRole, fallbackPath])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Verifying access...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
