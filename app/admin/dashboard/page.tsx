"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  FileText,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Clock,
  UserCheck,
  Activity,
  Shield,
  RefreshCw,
  Eye,
} from "lucide-react"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    pendingApprovals: 0,
    activeSchemes: 0,
    physicalCards: 0,
    monthlyGrowth: {
      users: 0,
      approvals: 0,
      schemes: 0,
      cards: 0,
    },
  })

  const [recentActivities, setRecentActivities] = useState([])
  const [systemStats, setSystemStats] = useState({
    systemStatus: "online",
    uptime: "99.9%",
    activeUsers: 0,
    totalTransactions: 0,
  })

  useEffect(() => {
    // Clear any conflicting sessions
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      localStorage.clear()
      sessionStorage.clear()
      localStorage.setItem("userType", "admin")
      localStorage.setItem("adminToken", "admin-session-" + Date.now())
    }

    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Load data from localStorage with admin prefix to avoid conflicts
      const adminId = "admin-" + (localStorage.getItem("adminId") || "default")

      // Mock data for demonstration
      const mockData = {
        totalUsers: 1234,
        pendingApprovals: 23,
        activeSchemes: 89,
        physicalCards: 156,
        monthlyGrowth: {
          users: 12,
          approvals: -5,
          schemes: 8,
          cards: 15,
        },
      }

      const mockActivities = [
        {
          id: 1,
          type: "scheme_approval",
          title: "New scheme submitted for approval",
          description: "Monthly Savings Scheme by Foreman John",
          time: "2 hours ago",
          status: "pending",
          icon: FileText,
        },
        {
          id: 2,
          type: "user_registration",
          title: "New user registered",
          description: "Priya Sharma completed UCFSIN registration",
          time: "4 hours ago",
          status: "completed",
          icon: UserCheck,
        },
        {
          id: 3,
          type: "card_request",
          title: "Physical card requested",
          description: "Rajesh Kumar requested physical UCFSIN card",
          time: "6 hours ago",
          status: "processing",
          icon: CreditCard,
        },
      ]

      setDashboardData(mockData)
      setRecentActivities(mockActivities)
      setSystemStats({
        systemStatus: "online",
        uptime: "99.9%",
        activeUsers: 1234,
        totalTransactions: 45678,
      })
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num)
  }

  const getActivityIcon = (activity) => {
    const IconComponent = activity.icon
    return <IconComponent className="h-4 w-4" />
  }

  const getActivityStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-3 sm:p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading admin dashboard...</p>
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
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">Manage UCFSIN system operations</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">System Online</span>
          </div>
          <Button onClick={loadDashboardData} variant="outline" className="gap-2 bg-transparent" size="sm">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white border border-gray-200">
          <TabsTrigger value="overview" className="flex items-center gap-2 text-xs sm:text-sm">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="approvals" className="flex items-center gap-2 text-xs sm:text-sm">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Scheme Approvals</span>
            <span className="sm:hidden">Approvals</span>
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2 text-xs sm:text-sm">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Card Tracking</span>
            <span className="sm:hidden">Cards</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 text-xs sm:text-sm">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">User Management</span>
            <span className="sm:hidden">Users</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-blue-700 truncate">Total Users</CardTitle>
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold text-blue-900">
                  {formatNumber(dashboardData.totalUsers)}
                </div>
                <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3" />+{dashboardData.monthlyGrowth.users}% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-yellow-700 truncate">
                  Pending Approvals
                </CardTitle>
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 shrink-0" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold text-yellow-900">{dashboardData.pendingApprovals}</div>
                <p className="text-xs text-yellow-600 flex items-center gap-1 mt-1">
                  <TrendingDown className="h-2 w-2 sm:h-3 sm:w-3" />
                  {dashboardData.monthlyGrowth.approvals}% from last month
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
                  <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3" />+{dashboardData.monthlyGrowth.schemes}% from last
                  month
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-purple-700 truncate">
                  Physical Cards
                </CardTitle>
                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 shrink-0" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold text-purple-900">{dashboardData.physicalCards}</div>
                <p className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3" />+{dashboardData.monthlyGrowth.cards}% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">Recent Activities</CardTitle>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-200 shrink-0">
                      {getActivityIcon(activity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-gray-900 text-sm truncate">{activity.title}</p>
                        <Badge className={`${getActivityStatusColor(activity.status)} text-xs shrink-0`}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-green-900 mb-2 capitalize">
                  {systemStats.systemStatus}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">All systems operational</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">System Uptime</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">{systemStats.uptime}</div>
                <Progress value={99.9} className="mb-2" />
                <p className="text-xs sm:text-sm text-gray-600">Last 30 days</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Active Users</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-purple-900 mb-2">
                  {formatNumber(systemStats.activeUsers)}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Currently online</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-orange-900 mb-2">
                  {formatNumber(systemStats.totalTransactions)}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">This month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Scheme Approvals</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Scheme approval management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Card Tracking</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Card tracking system coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">User Management</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">User management interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
