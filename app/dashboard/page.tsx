"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, Settings, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Check for existing authentication
    const adminToken = localStorage.getItem("adminToken")
    const foremanToken = localStorage.getItem("foremanToken")
    const userToken = localStorage.getItem("userToken")
    const userType = localStorage.getItem("userType")

    // Redirect based on stored tokens and user type
    if (adminToken && userType === "admin") {
      router.push("/admin/dashboard")
    } else if (foremanToken && userType === "foreman") {
      router.push("/foreman/dashboard")
    } else if (userToken && userType === "user") {
      router.push("/user/dashboard")
    } else {
      // No valid session found, stay on this page to let user choose
      return
    }
  }, [router])

  const handleDashboardSelect = (type: string) => {
    // Clear any existing tokens
    localStorage.removeItem("adminToken")
    localStorage.removeItem("foremanToken")
    localStorage.removeItem("userToken")
    localStorage.removeItem("userType")

    // Redirect to login with the selected type
    router.push(`/auth/login?type=${type}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="h-16 w-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chit Fund Portal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your dashboard type to continue. If you don't have an account, you can register from the login page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => handleDashboardSelect("admin")}
          >
            <CardHeader className="text-center pb-4">
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <Settings className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Manage the entire chit fund portal, users, operators, and system settings.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Access Admin Panel <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => handleDashboardSelect("foreman")}
          >
            <CardHeader className="text-center pb-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Foreman Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Manage chit fund schemes, subscribers, auctions, and payments.</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Access Foreman Panel <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => handleDashboardSelect("user")}
          >
            <CardHeader className="text-center pb-4">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">User Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                View your UCFIN profile, chit schemes, payments, and transaction history.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Access User Panel <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Don't have an account yet?</p>
          <Link href="/register">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              Register for UCFIN
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
