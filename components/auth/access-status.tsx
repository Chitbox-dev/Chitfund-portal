"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Shield, User, CheckCircle } from "lucide-react"
import { checkAccessApproval, type AccessUser } from "@/lib/access-control"

export default function AccessStatus() {
  const [user, setUser] = useState<AccessUser | null>(null)

  useEffect(() => {
    const accessUser = checkAccessApproval()
    setUser(accessUser)
  }, [])

  if (!user) return null

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "company":
        return "Business Partner"
      case "user":
        return "Subscriber"
      case "foreman":
        return "Foreman"
      default:
        return "User"
    }
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "company":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "user":
        return "bg-green-100 text-green-800 border-green-300"
      case "foreman":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-green-800">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <span>Access Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700 font-medium">{user.email}</span>
          </div>
          <Badge variant="outline" className={`${getUserTypeColor(user.userType)} font-medium`}>
            {getUserTypeLabel(user.userType)}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-600 bg-white/50 px-3 py-1 rounded-full">
            <Shield className="h-3 w-3 inline mr-1" />
            Secure Portal Access
          </div>
          <div className="text-xs text-gray-500">ID: {user.requestId}</div>
        </div>
      </div>
    </div>
  )
}
