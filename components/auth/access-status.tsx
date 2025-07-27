"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Building, Users } from "lucide-react"

interface AccessStatusProps {
  className?: string
}

export default function AccessStatus({ className = "" }: AccessStatusProps) {
  const [userType, setUserType] = useState<string | null>(null)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const checkStatus = () => {
      const cookies = document.cookie.split(";").reduce(
        (acc, cookie) => {
          const [key, value] = cookie.trim().split("=")
          acc[key] = value
          return acc
        },
        {} as Record<string, string>,
      )

      const currentUserType = cookies.user_type
      const hasValidAccess = cookies.admin_access === "true" || cookies.portal_access === "true"

      setUserType(currentUserType)
      setHasAccess(hasValidAccess)
    }

    checkStatus()
  }, [])

  if (!hasAccess || !userType) {
    return null
  }

  const getIcon = () => {
    switch (userType) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "company":
        return <Building className="h-4 w-4" />
      case "foreman":
        return <Users className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getVariant = () => {
    switch (userType) {
      case "admin":
        return "destructive"
      case "company":
        return "secondary"
      case "foreman":
        return "outline"
      case "user":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Badge variant={getVariant() as any} className="flex items-center gap-1">
            {getIcon()}
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Access
          </Badge>
          <span className="text-sm text-gray-600">Active</span>
        </div>
      </CardContent>
    </Card>
  )
}
