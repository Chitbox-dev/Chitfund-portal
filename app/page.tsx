"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/landing/navbar"
import HeroSection from "@/components/landing/hero-section"
import DashboardSlider from "@/components/landing/dashboard-slider"
import FeatureCard from "@/components/landing/feature-card"
import HowItWorks from "@/components/landing/how-it-works"
import StatsCounter from "@/components/landing/stats-counter"
import ClientBrandsSlider from "@/components/landing/client-brands-slider"
import TestimonialSlider from "@/components/landing/testimonial-slider"
import Footer from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, AlertTriangle } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const checkAccess = () => {
      // Check for admin access
      const adminAccess = document.cookie.includes("admin_access=true")

      if (adminAccess) {
        const userTypeCookie = document.cookie.split("; ").find((row) => row.startsWith("user_type="))
        const currentUserType = userTypeCookie ? userTypeCookie.split("=")[1] : null

        setHasAccess(true)
        setUserType(currentUserType)
        setIsLoading(false)
        return
      }

      // Check for portal access (requires admin approval)
      const portalAccess = document.cookie.includes("portal_access=true")

      if (portalAccess) {
        const userTypeCookie = document.cookie.split("; ").find((row) => row.startsWith("user_type="))
        const currentUserType = userTypeCookie ? userTypeCookie.split("=")[1] : null

        setHasAccess(true)
        setUserType(currentUserType)
        setIsLoading(false)
        return
      }

      // No access found, redirect to access request
      router.push("/access-request")
    }

    checkAccess()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Portal</h3>
            <div className="text-gray-600">Please wait while we verify your access...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Required</h3>
            <div className="text-gray-600 mb-4">You need admin approval to access the chit fund portal.</div>
            <button
              onClick={() => router.push("/access-request")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Access
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getUserTypeDisplay = (type: string) => {
    switch (type) {
      case "admin":
        return "Administrator"
      case "company":
        return "Business Partner"
      case "subscriber":
        return "Subscriber"
      case "foreman":
        return "Foreman"
      default:
        return "User"
    }
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "admin":
        return "bg-red-50 text-red-800 border-red-200"
      case "company":
        return "bg-purple-50 text-purple-800 border-purple-200"
      case "subscriber":
        return "bg-green-50 text-green-800 border-green-200"
      case "foreman":
        return "bg-blue-50 text-blue-800 border-blue-200"
      default:
        return "bg-gray-50 text-gray-800 border-gray-200"
    }
  }

  return (
    <main className="min-h-screen">
      {/* User Status Banner */}
      <div className={`border-b px-4 py-2 ${getUserTypeColor(userType || "")}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4" />
            <span>
              Welcome, <strong>{getUserTypeDisplay(userType || "")}</strong> - Access Approved
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs">{userType === "admin" ? "Full Admin Access" : "Portal Access Granted"}</div>
            <button
              onClick={() => {
                // Clear all access cookies and tokens
                document.cookie.split(";").forEach((cookie) => {
                  const eqPos = cookie.indexOf("=")
                  const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
                  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
                })
                localStorage.clear()
                router.push("/access-request")
              }}
              className="text-xs px-2 py-1 rounded border hover:bg-white/50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <Navbar />
      <HeroSection />
      <DashboardSlider />
      <FeatureCard />
      <HowItWorks />
      <StatsCounter />
      <ClientBrandsSlider />
      <TestimonialSlider />
      <Footer />
    </main>
  )
}
