"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import {
  FileText,
  Users,
  IndianRupee,
  TrendingUp,
  Plus,
  RefreshCw,
  Eye,
  ArrowRight,
  Calendar,
  Target,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface DashboardData {
  totalSchemes: number
  activeSchemes: number
  totalSubscribers: number
  monthlyCollection: number
  lastUpdated: number
}

interface SchemeData {
  schemeId: string
  schemeName?: string
  schemeStatus: string
  schemeAmount?: number
  currentSubscribers?: number
  maxSubscribers?: number
  monthlyPremium?: number
  lastUpdated: string
}

export default function ForemanDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalSchemes: 0,
    activeSchemes: 0,
    totalSubscribers: 0,
    monthlyCollection: 0,
    lastUpdated: Date.now(),
  })
  const [schemes, setSchemes] = useState<SchemeData[]>([])
  const [actionRequiredSchemes, setActionRequiredSchemes] = useState<SchemeData[]>([])
  const [recentSchemes, setRecentSchemes] = useState<SchemeData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadDashboardData = () => {
    try {
      const foremanToken = localStorage.getItem("foremanToken")
      if (!foremanToken) {
        window.location.href = "/auth/login"
        return
      }

      // Load schemes with unique key to prevent duplicates
      const uniqueKey = `foreman_schemes_${foremanToken}`
      const storedSchemes = localStorage.getItem(uniqueKey) || localStorage.getItem("foremanSchemes") || "[]"
      const parsedSchemes: SchemeData[] = JSON.parse(storedSchemes)

      // Remove duplicates based on schemeId
      const uniqueSchemes = parsedSchemes.filter(
        (scheme, index, self) => index === self.findIndex((s) => s.schemeId === scheme.schemeId),
      )

      // Update storage with deduplicated data
      localStorage.setItem(uniqueKey, JSON.stringify(uniqueSchemes))
      setSchemes(uniqueSchemes)

      // Calculate dashboard metrics
      const totalSchemes = uniqueSchemes.length
      const activeSchemes = uniqueSchemes.filter((s) =>
        ["live", "pso_approved", "subscribers_added"].includes(s.schemeStatus),
      ).length
      const totalSubscribers = uniqueSchemes.reduce((sum, scheme) => sum + (scheme.currentSubscribers || 0), 0)
      const monthlyCollection = uniqueSchemes
        .filter((s) => s.schemeStatus === "live")
        .reduce((sum, scheme) => sum + (scheme.monthlyPremium || 0), 0)

      const newDashboardData: DashboardData = {
        totalSchemes,
        activeSchemes,
        totalSubscribers,
        monthlyCollection,
        lastUpdated: Date.now(),
      }

      setDashboardData(newDashboardData)

      // Save updated dashboard data
      localStorage.setItem(`foreman_dashboard_${foremanToken}`, JSON.stringify(newDashboardData))

      // Filter schemes for different sections
      const actionRequired = uniqueSchemes.filter((scheme) =>
        ["pso_approved", "rejected", "steps_1_4_approved"].includes(scheme.schemeStatus),
      )
      setActionRequiredSchemes(actionRequired)

      const recent = uniqueSchemes
        .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        .slice(0, 3)
      setRecentSchemes(recent)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    loadDashboardData()
    setRefreshing(false)
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800 border-green-200"
      case "pso_approved":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "steps_1_4_approved":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <Activity className="h-4 w-4" />
      case "pso_approved":
        return <CheckCircle className="h-4 w-4" />
      case "steps_1_4_approved":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getActionText = (status: string) => {
    switch (status) {
      case "pso_approved":
        return "Add subscribers"
      case "steps_1_4_approved":
        return "Request PSO approval"
      case "rejected":
        return "Review and resubmit"
      default:
        return "View details"
    }
  }

  if (loading) {
    return (
      <div className="flex-1">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex items-center justify-center flex-1 p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Link href="/foreman/create-scheme">
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create New Scheme</span>
              <span className="sm:hidden">Create</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Foreman Dashboard</h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Welcome back! Here's an overview of your chit fund schemes.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 lg:p-3 bg-blue-500 rounded-full">
                  <FileText className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm font-medium text-blue-600 mb-1">Total Schemes</p>
                  <p className="text-xl lg:text-3xl font-bold text-blue-900 truncate">{dashboardData.totalSchemes}</p>
                  <p className="text-xs text-blue-700 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    <span className="truncate">+2 from last month</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 lg:p-3 bg-green-500 rounded-full">
                  <Activity className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm font-medium text-green-600 mb-1">Active Schemes</p>
                  <p className="text-xl lg:text-3xl font-bold text-green-900 truncate">{dashboardData.activeSchemes}</p>
                  <p className="text-xs text-green-700 flex items-center gap-1 mt-1">
                    <Target className="h-3 w-3" />
                    <span className="truncate">
                      {dashboardData.totalSchemes > 0
                        ? Math.round((dashboardData.activeSchemes / dashboardData.totalSchemes) * 100)
                        : 0}
                      % of total
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 lg:p-3 bg-purple-500 rounded-full">
                  <Users className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm font-medium text-purple-600 mb-1">Total Subscribers</p>
                  <p className="text-xl lg:text-3xl font-bold text-purple-900 truncate">
                    {dashboardData.totalSubscribers}
                  </p>
                  <p className="text-xs text-purple-700 flex items-center gap-1 mt-1">
                    <Users className="h-3 w-3" />
                    <span className="truncate">Across all schemes</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 lg:p-3 bg-orange-500 rounded-full">
                  <IndianRupee className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm font-medium text-orange-600 mb-1">Monthly Collection</p>
                  <p className="text-lg lg:text-2xl font-bold text-orange-900 truncate">
                    ₹{dashboardData.monthlyCollection.toLocaleString()}
                  </p>
                  <p className="text-xs text-orange-700 flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span className="truncate">Current month target</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Action Required */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Action Required
                </CardTitle>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {actionRequiredSchemes.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {actionRequiredSchemes.length > 0 ? (
                actionRequiredSchemes.map((scheme) => (
                  <div
                    key={scheme.schemeId}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {scheme.schemeName || `Scheme ${scheme.schemeId}`}
                      </h4>
                      <p className="text-sm text-orange-700 font-medium">{getActionText(scheme.schemeStatus)}</p>
                    </div>
                    <Link href={`/foreman/schemes/${scheme.schemeId}`}>
                      <Button size="sm" className="gap-1 bg-orange-600 hover:bg-orange-700 shrink-0">
                        <ArrowRight className="h-3 w-3" />
                        <span className="hidden sm:inline">Action</span>
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-600">No actions required</p>
                  <p className="text-sm text-gray-500">All schemes are up to date</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Schemes */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Recent Schemes
                </CardTitle>
                <Link href="/foreman/schemes">
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <span className="hidden sm:inline">View All</span>
                    <span className="sm:hidden">All</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentSchemes.length > 0 ? (
                recentSchemes.map((scheme) => (
                  <div
                    key={scheme.schemeId}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {scheme.schemeName || `Scheme ${scheme.schemeId}`}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${getStatusColor(scheme.schemeStatus)} text-xs`}>
                          {getStatusIcon(scheme.schemeStatus)}
                          <span className="ml-1">{scheme.schemeStatus.replace(/_/g, " ")}</span>
                        </Badge>
                        <span className="text-xs text-gray-500">{scheme.currentSubscribers || 0} subscribers</span>
                      </div>
                    </div>
                    <Link href={`/foreman/schemes/${scheme.schemeId}`}>
                      <Button size="sm" variant="outline" className="gap-1 shrink-0 bg-transparent">
                        <Eye className="h-3 w-3" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No schemes yet</p>
                  <p className="text-sm text-gray-500 mb-4">Create your first scheme to get started</p>
                  <Link href="/foreman/create-scheme">
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create Scheme
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="text-center">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Total</h3>
                <p className="text-2xl lg:text-3xl font-bold text-blue-600">
                  ₹{(dashboardData.monthlyCollection * 12).toLocaleString()}
                </p>
                <p className="text-xs lg:text-sm text-gray-500 mt-1">Annual Collection Target</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="text-center">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Collection</h3>
                <p className="text-2xl lg:text-3xl font-bold text-green-600">
                  ₹{Math.round(dashboardData.monthlyCollection * 0.75).toLocaleString()}
                </p>
                <p className="text-xs lg:text-sm text-gray-500 mt-1">This Month (75%)</p>
                <Progress value={75} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="text-center">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Pending</h3>
                <p className="text-2xl lg:text-3xl font-bold text-orange-600">
                  ₹{Math.round(dashboardData.monthlyCollection * 0.25).toLocaleString()}
                </p>
                <p className="text-xs lg:text-sm text-gray-500 mt-1">Remaining (25%)</p>
                <Progress value={25} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
