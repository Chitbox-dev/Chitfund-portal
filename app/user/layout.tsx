"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import UserSidebar from "@/components/user/user-sidebar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("userToken")
      const userType = localStorage.getItem("userType")

      if (!token || userType !== "user") {
        router.push("/auth/login")
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <UserSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
