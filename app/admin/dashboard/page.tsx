"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SchemeApprovalPanel } from "@/components/admin/scheme-approval-panel"
import { FileText, CheckCircle, Clock, XCircle } from "lucide-react"
import { CreditCard, RefreshCw, UserCheck } from "lucide-react"

export default function AdminDashboard() {
  const [schemes, setSchemes] = useState<any[]>([])
  const [selectedScheme, setSelectedScheme] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const [isLoading, setIsLoading] = useState(true)
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

  // Scheme approval states
  const [pendingSchemes, setPendingSchemes] = useState([])
  const [approvalComments, setApprovalComments] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    // Load schemes from localStorage
    const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
    const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
    const rejectedSchemes = JSON.parse(localStorage.getItem("rejectedSchemes") || "[]")

    // Add sample scheme if none exist
    if (pendingSchemes.length === 0 && approvedSchemes.length === 0) {
      const sampleScheme = {
        schemeId: "SCH-1754077338146",
        schemeName: "Monthly Chit Scheme",
        schemeStatus: "pso_approved",
        chitValue: "100000",
        numberOfSubscribers: "30",
        chitDuration: "30",
        foremanName: "Gyanesh Foreman",
        foremanCompany: "Foreman Company",
        foremanEmail: "foreman@example.com",
        foremanPhone: "+91 9876543210",
        monthlyPremium: 3333,
        commissionRate: "5",
        submittedAt: "2025-02-08T00:00:00.000Z",
        psoNumber: "PSO-2025-8146",
        psoGeneratedDate: "2025-02-08T07:43:00.000Z",
        commissionStructure: {
          name: "Commission Structure.pdf",
          size: "2.5 MB",
          uploadedAt: new Date().toISOString(),
        },
        termsOfWithdrawal: {
          name: "Terms of Withdrawal.pdf",
          size: "2.5 MB",
          uploadedAt: new Date().toISOString(),
        },
        liabilitiesDocument: {
          name: "Liabilities Document.pdf",
          size: "2.5 MB",
          uploadedAt: new Date().toISOString(),
        },
        subscriberRights: {
          name: "Subscriber Rights.pdf",
          size: "2.5 MB",
          uploadedAt: new Date().toISOString(),
        },
        fdrDocument: {
          name: "FDR Document.pdf",
          size: "2.5 MB",
          uploadedAt: new Date().toISOString(),
        },
        draftAgreement: {
          name: "Draft Agreement.pdf",
          size: "2.5 MB",
          uploadedAt: new Date().toISOString(),
        },
      }
      pendingSchemes.push(sampleScheme)
      localStorage.setItem("pendingSchemes", JSON.stringify(pendingSchemes))
    }

    const allSchemes = [...pendingSchemes, ...approvedSchemes, ...rejectedSchemes]
    setSchemes(allSchemes)

    // Set first scheme as selected by default
    if (allSchemes.length > 0) {
      setSelectedScheme(allSchemes[0])
    }

    // Clear any conflicting sessions
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      localStorage.clear()
      sessionStorage.clear()
      localStorage.setItem("userType", "admin")
      localStorage.setItem("adminToken", "admin-session-" + Date.now())
    }

    loadDashboardData()
    loadPendingSchemes()
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

  const loadPendingSchemes = () => {
    try {
      const schemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      console.log("Loading pending schemes:", schemes)
      setPendingSchemes(schemes)

      // Update pending approvals count
      setDashboardData((prev) => ({
        ...prev,
        pendingApprovals: schemes.filter((s) => s.schemeStatus === "submitted").length,
      }))
    } catch (error) {
      console.error("Error loading pending schemes:", error)
      setPendingSchemes([])
    }
  }

  const handleApproveScheme = async (schemeId: string, comments: string) => {
    try {
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")

      const schemeIndex = pendingSchemes.findIndex((s: any) => s.schemeId === schemeId)
      if (schemeIndex >= 0) {
        const scheme = pendingSchemes[schemeIndex]
        scheme.schemeStatus = "pso_approved"
        scheme.psoNumber = `PSO-${Date.now()}-${schemeId.slice(-4)}`
        scheme.psoGeneratedDate = new Date().toISOString()
        scheme.approvalComments = comments
        scheme.approvedAt = new Date().toISOString()

        // Move to approved schemes
        approvedSchemes.push(scheme)
        pendingSchemes.splice(schemeIndex, 1)

        localStorage.setItem("pendingSchemes", JSON.stringify(pendingSchemes))
        localStorage.setItem("approvedSchemes", JSON.stringify(approvedSchemes))

        // Update local state
        const allSchemes = [...pendingSchemes, ...approvedSchemes]
        setSchemes(allSchemes)
        setSelectedScheme(scheme)

        alert("Scheme approved successfully and PSO certificate generated!")
      }
    } catch (error) {
      console.error("Error approving scheme:", error)
      alert("Error approving scheme. Please try again.")
    }
  }

  const handleRejectScheme = async (schemeId: string, reason: string) => {
    try {
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const rejectedSchemes = JSON.parse(localStorage.getItem("rejectedSchemes") || "[]")

      const schemeIndex = pendingSchemes.findIndex((s: any) => s.schemeId === schemeId)
      if (schemeIndex >= 0) {
        const scheme = pendingSchemes[schemeIndex]
        scheme.schemeStatus = "rejected"
        scheme.rejectionReason = reason
        scheme.rejectedAt = new Date().toISOString()

        // Move to rejected schemes
        rejectedSchemes.push(scheme)
        pendingSchemes.splice(schemeIndex, 1)

        localStorage.setItem("pendingSchemes", JSON.stringify(pendingSchemes))
        localStorage.setItem("rejectedSchemes", JSON.stringify(rejectedSchemes))

        // Update local state
        const allSchemes = [...pendingSchemes, ...rejectedSchemes]
        setSchemes(allSchemes)
        setSelectedScheme(scheme)

        alert("Scheme rejected successfully!")
      }
    } catch (error) {
      console.error("Error rejecting scheme:", error)
      alert("Error rejecting scheme. Please try again.")
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

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "steps_1_4_approved":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSchemeStats = () => {
    const submitted = schemes.filter((s) => s.schemeStatus === "submitted").length
    const approved = schemes.filter((s) => s.schemeStatus === "pso_approved" || s.schemeStatus === "live").length
    const rejected = schemes.filter((s) => s.schemeStatus === "rejected").length
    const pending = schemes.filter((s) => s.schemeStatus === "pending").length

    return { submitted, approved, rejected, pending, total: schemes.length }
  }

  const stats = getSchemeStats()

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
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and approve chit fund schemes</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scheme-approvals">Scheme Approvals</TabsTrigger>
            <TabsTrigger value="card-tracking">Card Tracking</TabsTrigger>
            <TabsTrigger value="user-management">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Schemes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">All submitted schemes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.submitted}</div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Approved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                  <p className="text-xs text-muted-foreground">PSO generated</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                  <p className="text-xs text-muted-foreground">Need revision</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Scheme Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schemes.slice(0, 5).map((scheme) => (
                    <div key={scheme.schemeId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{scheme.schemeName || `Scheme ${scheme.schemeId}`}</p>
                          <p className="text-sm text-gray-500">
                            {scheme.foremanName} • ₹{Number.parseFloat(scheme.chitValue || "0").toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={
                          scheme.schemeStatus === "pso_approved"
                            ? "bg-green-100 text-green-800"
                            : scheme.schemeStatus === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {scheme.schemeStatus?.replace(/_/g, " ").toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheme-approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Scheme Approval Management
                </CardTitle>
                <p className="text-sm text-gray-600">Review and approve chit fund schemes</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Scheme List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Schemes</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline">Pending: {stats.submitted}</Badge>
                        <Badge variant="outline">PSO: {stats.approved}</Badge>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {schemes.map((scheme) => (
                        <div
                          key={scheme.schemeId}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedScheme?.schemeId === scheme.schemeId
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedScheme(scheme)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-sm">Scheme {scheme.schemeId.slice(-4)}</p>
                            <Badge
                              className={
                                scheme.schemeStatus === "pso_approved"
                                  ? "bg-green-100 text-green-800 text-xs"
                                  : scheme.schemeStatus === "rejected"
                                    ? "bg-red-100 text-red-800 text-xs"
                                    : "bg-yellow-100 text-yellow-800 text-xs"
                              }
                            >
                              {scheme.schemeStatus === "pso_approved"
                                ? "PSO APPROVED"
                                : scheme.schemeStatus?.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <p>₹{Number.parseFloat(scheme.chitValue || "0").toLocaleString()}</p>
                            <p>{scheme.numberOfSubscribers} subscribers</p>
                            <p>{scheme.chitDuration} months</p>
                            <p>{new Date(scheme.submittedAt || Date.now()).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scheme Details */}
                  <div className="lg:col-span-2">
                    <SchemeApprovalPanel
                      scheme={selectedScheme}
                      onApprove={handleApproveScheme}
                      onReject={handleRejectScheme}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="card-tracking">
            <Card>
              <CardHeader>
                <CardTitle>Card Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Card tracking functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-management">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">User management functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
