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
  const [hasAdminAccess, setHasAdminAccess] = useState(false)

  useEffect(() => {
    const checkAdminAccess = () => {
      // Check for admin access cookie
      const adminAccess = document.cookie.includes("admin_access=true")
      const userType = document.cookie.includes("user_type=admin")
      const adminToken = localStorage.getItem("adminToken")

      if (adminAccess && userType && adminToken) {
        setHasAdminAccess(true)
      } else {
        // Redirect non-admin users to access request
        router.push("/access-request")
        return
      }

      setIsLoading(false)
    }

    checkAdminAccess()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verifying Admin Access</h3>
            <div className="text-gray-600">Please wait while we verify your admin credentials...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Admin Access Required</h3>
            <div className="text-gray-600 mb-4">
              Only administrators can access the landing page. Please login with admin credentials.
            </div>
            <button
              onClick={() => router.push("/access-request")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin Login
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Admin Status Banner */}
      <div className="bg-green-50 border-b border-green-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-green-800">
            <Shield className="h-4 w-4" />
            <span>Administrator Access - Welcome to Chit Fund Portal</span>
          </div>
          <div className="text-xs text-green-600">Full system access granted</div>
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
