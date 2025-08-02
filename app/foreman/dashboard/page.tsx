"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  Activity,
  Target,
  Wallet,
  UserCheck,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react"

export default function ForemanDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    totalSchemes: 0,
    activeSchemes: 0,
    completedSchemes: 0,
    pendingSchemes: 0,
    totalSubscribers: 0,
    totalRevenue: 0,
    monthlyCollection: 0,
    pendingPayments: 0,
  })

  const [recentSchemes, setRecentSchemes] = useState([])
  const [actionItems, setActionItems] = useState([])

  useEffect(() => {
    // Clear any conflicting sessions
    const userType = localStorage.getItem("userType")
    if (userType !== "foreman") {
      localStorage.clear()
      sessionStorage.clear()
      localStorage.setItem("userType", "foreman")
      localStorage.setItem("foremanToken", "foreman-session-" + Date.now())
    }

    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Load schemes from localStorage with foreman prefix to avoid conflicts
      const foremanId = "foreman-" + (localStorage.getItem("foremanId") || "default")
      const pendingSchemesData = JSON.parse(localStorage.getItem(`${foremanId}-pendingSchemes`) || "[]")
      const approvedSchemesData = JSON.parse(localStorage.getItem(`${foremanId}-approvedSchemes`) || "[]")
      const allSchemesData = [...pendingSchemesData, ...approvedSchemesData]

      // Mock data for demonstration - ensure unique IDs
      const mockSchemes = [
        {
          id: `${foremanId}-1`,
          schemeId: "SCH-1736859597000",
          name: "Gold Savings 50K",
          status: "live",
          subscribers: 20,
          chitValue: 1000000,
          monthlyCollection: 50000,
          createdAt: new Date().toISOString(),
        },
        {
          id: `${foremanId}-2`,
          schemeId: "SCH-1736859598000",
          name: "Business Growth 100K",
          status: "pso_approved",
          subscribers: 25,
          chitValue: 3000000,
          monthlyCollection: 100000,
          createdAt: new Date().toISOString(),
        },
        {
          id: `${foremanId}-3`,
          schemeId: "SCH-1736859599000",
          name: "Dream Home 200K",
          status: "steps_1_4_approved",
          subscribers: 0,
          chitValue: 8000000,
          monthlyCollection: 0,
          createdAt: new Date().toISOString(),
        },
      ]

      const combinedSchemesData = [...allSchemesData, ...mockSchemes]

      // Calculate dashboard metrics
      const totalSchemes = combinedSchemesData.length
      const activeSchemes = combinedSchemesData.filter((s) =>
        ["live", "pso_approved", "subscribers_added"].includes(s.status || s.schemeStatus),
      ).length
      const completedSchemes = combinedSchemesData.filter(
        (s) => s.status === "completed" || s.schemeStatus === "completed",
      ).length
      const pendingSchemesCount = combinedSchemesData.filter((s) =>
        ["draft", "submitted", "steps_1_4_approved", "pso_requested"].includes(s.status || s.schemeStatus),
      ).length

      const totalSubscribers = combinedSchemesData.reduce((sum, scheme) => sum + (scheme.subscribers || 0), 0)
      const totalRevenue = combinedSchemesData.reduce((sum, scheme) => sum + (scheme.chitValue || 0), 0)
      const monthlyCollection = combinedSchemesData.reduce((sum, scheme) => sum + (scheme.monthlyCollection || 0), 0)

      setDashboardData({
        totalSchemes,
        activeSchemes,
        completedSchemes,
        pendingSchemes: pendingSchemesCount,
        totalSubscribers,
        totalRevenue,
        monthlyCollection,
        pendingPayments: Math.floor(monthlyCollection * 0.15), // 15% pending
      })

      // Set recent schemes (last 5)
      setRecentSchemes(combinedSchemesData.slice(0, 5))

      // Set action items
      const actionRequiredSchemes = combinedSchemesData.filter((s) =>
        ["steps_1_4_approved", "pso_approved", "subscribers_added"].includes(s.status || s.schemeStatus),
      )
      setActionItems(actionRequiredSchemes.slice(0, 3))
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800 border-green-200"
      case "pso_approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "steps_1_4_approved":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getActionMessage = (scheme) => {
    switch (scheme.status || scheme.schemeStatus) {
      case "steps_1_4_approved":
        return "Request PSO approval"
      case "pso_approved":
        return "Add subscribers"
      case "subscribers_added":
        return "Upload final agreement"
      default:
        return "Continue setup"
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-3 sm:p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Foreman Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Welcome back! Here's an overview of your chit fund schemes.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
          <Button
            onClick={loadDashboardData}
            variant="outline"
            className="gap-2 bg-transparent text-sm sm:text-base"
            size="sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button
            onClick={() => (window.location.href = "/foreman/create-scheme")}
            className="gap-2 text-sm sm:text-base"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            <span className="sm:hidden">Create</span>
            <span className="hidden sm:inline">Create New Scheme</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-blue-700 truncate">Total Schemes</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-blue-900">{dashboardData.totalSchemes}</div>
            <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3" />
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-green-700 truncate">Active Schemes</CardTitle>
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-green-900">{dashboardData.activeSchemes}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-2 w-2 sm:h-3 sm:w-3" />
              {dashboardData.totalSchemes > 0
                ? Math.round((dashboardData.activeSchemes / dashboardData.totalSchemes) * 100)
                : 0}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-purple-700 truncate">Total Subscribers</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-purple-900">{dashboardData.totalSubscribers}</div>
            <p className="text-xs text-purple-600 flex items-center gap-1 mt-1">
              <UserCheck className="h-2 w-2 sm:h-3 sm:w-3" />
              Across all schemes
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-orange-700 truncate">
              Monthly Collection
            </CardTitle>
            <Wallet className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-orange-900 truncate">
              {formatCurrency(dashboardData.monthlyCollection)}
            </div>
            <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
              <Target className="h-2 w-2 sm:h-3 sm:w-3" />
              Current month target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Items & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Action Required */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                <span className="truncate">Action Required</span>
              </CardTitle>
              <Badge className="bg-orange-100 text-orange-800 text-xs">{actionItems.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            {actionItems.length > 0 ? (
              actionItems.map((scheme) => (
                <div
                  key={scheme.schemeId || scheme.id}
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200 gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {scheme.name || `Scheme ${scheme.schemeId}`}
                    </p>
                    <p className="text-xs sm:text-sm text-orange-600 truncate">{getActionMessage(scheme)}</p>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 shrink-0">
                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8">
                <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600 text-sm sm:text-base">No pending actions</p>
                <p className="text-xs sm:text-sm text-gray-500">All schemes are up to date</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Schemes */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                <span className="truncate">Recent Schemes</span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/foreman/schemes")}
                className="text-xs sm:text-sm"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            {recentSchemes.length > 0 ? (
              recentSchemes.map((scheme) => (
                <div
                  key={scheme.schemeId || scheme.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {scheme.name || `Scheme ${scheme.schemeId}`}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge className={`${getStatusColor(scheme.status || scheme.schemeStatus)} text-xs`}>
                        {(scheme.status || scheme.schemeStatus || "draft").replace(/_/g, " ")}
                      </Badge>
                      <span className="text-xs sm:text-sm text-gray-500">{scheme.subscribers || 0} subscribers</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8">
                <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm sm:text-base">No schemes yet</p>
                <Button
                  className="mt-3 gap-2 text-sm"
                  onClick={() => (window.location.href = "/foreman/create-scheme")}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                  Create First Scheme
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              <span className="truncate">Total Portfolio Value</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-green-900 mb-2 truncate">
              {formatCurrency(dashboardData.totalRevenue)}
            </div>
            <Progress value={75} className="mb-2" />
            <p className="text-xs sm:text-sm text-gray-600">75% of annual target achieved</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              <span className="truncate">Collection Efficiency</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">85%</div>
            <Progress value={85} className="mb-2" />
            <p className="text-xs sm:text-sm text-gray-600">Above industry average</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg sm:col-span-2 lg:col-span-1">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              <span className="truncate">Pending Collections</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-orange-900 mb-2 truncate">
              {formatCurrency(dashboardData.pendingPayments)}
            </div>
            <Progress value={15} className="mb-2" />
            <p className="text-xs sm:text-sm text-gray-600">15% of monthly target</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="h-16 sm:h-20 flex-col gap-2 hover:bg-blue-50 bg-transparent text-xs sm:text-sm"
              onClick={() => (window.location.href = "/foreman/create-scheme")}
            >
              <Plus className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              <span>Create Scheme</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 sm:h-20 flex-col gap-2 hover:bg-green-50 bg-transparent text-xs sm:text-sm"
              onClick={() => (window.location.href = "/foreman/subscribers")}
            >
              <Users className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              <span>Manage Subscribers</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 sm:h-20 flex-col gap-2 hover:bg-purple-50 bg-transparent text-xs sm:text-sm"
              onClick={() => (window.location.href = "/foreman/reports")}
            >
              <BarChart3 className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              <span>View Reports</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 sm:h-20 flex-col gap-2 hover:bg-orange-50 bg-transparent text-xs sm:text-sm"
              onClick={() => (window.location.href = "/foreman/help")}
            >
              <AlertCircle className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
              <span>Get Help</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
