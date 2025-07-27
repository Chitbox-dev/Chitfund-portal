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

const newsUpdates = [
  {
    id: 1,
    title: "New UCFSIN Registration Process Launched",
    date: "Jan 15, 2025",
    category: "REGISTRATION",
    excerpt:
      "Enhanced digital registration process with improved KYC verification and faster UCFSIN generation for all users across India.",
    type: "update",
  },
  {
    id: 2,
    title: "Enhanced Security Measures Implemented",
    date: "Jan 10, 2025",
    category: "SECURITY",
    excerpt:
      "Advanced encryption and multi-factor authentication now protect all user accounts and transactions on the platform.",
    type: "security",
  },
  {
    id: 3,
    title: "Monthly Performance Report - December 2024",
    date: "Jan 5, 2025",
    category: "REPORTS",
    excerpt:
      "Comprehensive review of chit fund performance, member benefits, and platform statistics for December 2024.",
    type: "report",
  },
]

const helpTopics = [
  "How do I register for UCFSIN?",
  "What documents are required for KYC?",
  "How to track my chit fund status?",
  "Payment and transaction queries",
  "Account security and login issues",
  "Mobile app download and setup",
]

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const checkAccess = () => {
      // Check for any valid access (admin, company, user, or foreman)
      const cookies = document.cookie.split(";").reduce(
        (acc, cookie) => {
          const [key, value] = cookie.trim().split("=")
          acc[key] = value
          return acc
        },
        {} as Record<string, string>,
      )

      const adminAccess = cookies.admin_access === "true"
      const portalAccess = cookies.portal_access === "true"
      const currentUserType = cookies.user_type

      // All approved users can access landing page
      if ((adminAccess || portalAccess) && currentUserType) {
        setHasAccess(true)
        setUserType(currentUserType)
      } else {
        // Redirect to access request if no valid access
        router.push("/access-request")
        return
      }

      setIsLoading(false)
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
            <div className="text-gray-600">Please wait while we load your personalized experience...</div>
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
            <div className="text-gray-600 mb-4">
              Please complete the access request process to view the chit fund portal.
            </div>
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
      case "admin":
        return "bg-red-50 text-red-800 border-red-200"
      case "company":
        return "bg-purple-50 text-purple-800 border-purple-200"
      case "user":
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
              Welcome, <strong>{getUserTypeDisplay(userType || "")}</strong> - Chit Fund Portal Access Granted
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs">Access Level: Full Portal</div>
            <button
              onClick={() => {
                // Clear access and redirect to access request
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
