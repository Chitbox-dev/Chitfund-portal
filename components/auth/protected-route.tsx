"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock } from "lucide-react"
import { checkAccessApproval, type AccessUser } from "@/lib/access-control"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedUserTypes?: ("company" | "user" | "foreman")[]
  redirectTo?: string
}

export default function ProtectedRoute({
  children,
  allowedUserTypes = ["company", "user", "foreman"],
  redirectTo = "/access-request",
}: ProtectedRouteProps) {
  const router = useRouter()
  const [user, setUser] = useState<AccessUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAccess = () => {
      const accessUser = checkAccessApproval()

      if (!accessUser) {
        router.push(redirectTo)
        return
      }

      if (!allowedUserTypes.includes(accessUser.userType)) {
        router.push("/access-denied")
        return
      }

      setUser(accessUser)
      setIsLoading(false)
    }

    checkAccess()
  }, [router, allowedUserTypes, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verifying Access</h3>
            <div className="text-gray-600">Please wait while we verify your access permissions...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Required</h3>
            <div className="text-gray-600 mb-4">You need to request access to view this page.</div>
            <button
              onClick={() => router.push(redirectTo)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Access
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
