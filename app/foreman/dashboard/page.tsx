"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ForemanSidebar } from "@/components/foreman/foreman-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  Plus,
  Users,
  DollarSign,
  BarChart3,
  Bell,
  Target,
  Award,
  UserPlus,
  Gavel,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for foreman dashboard
const defaultForemanProfile = {
  id: "FM001",
  name: "Aakash Savant",
  email: "aakash.savant@email.com",
  phone: "+91 9876543210",
  experience: "5 years",
  joinDate: "2023-03-15",
  address: "123 Main Street, Delhi",
  successRate: "98.5%",
  totalFundValue: "₹45,00,000",
  activeSchemes: 3,
  totalSubscribers: 85,
  completedSchemes: 12,
  pendingApprovals: 1,
}

const mockSchemes = [
  {
    id: 1,
    name: "Gold Savings 50K",
    totalValue: "₹10,00,000",
    subscribers: 20,
    maxSubscribers: 20,
    monthlyContribution: "₹50,000",
    duration: "20 months",
    status: "active",
    psoNumber: "PSO-2025-001",
    startDate: "2025-01-01",
    nextAuction: "2025-02-15",
    commission: "5%",
    collectedAmount: "₹8,50,000",
    pendingAmount: "₹1,50,000",
    completedMonths: 17,
  },
  {
    id: 2,
    name: "Business Growth 100K",
    totalValue: "₹30,00,000",
    subscribers: 30,
    maxSubscribers: 30,
    monthlyContribution: "₹1,00,000",
    duration: "30 months",
    status: "pending",
    startDate: "2025-02-01",
    commission: "4.5%",
    collectedAmount: "₹0",
    pendingAmount: "₹30,00,000",
    completedMonths: 0,
  },
  {
    id: 3,
    name: "Dream Home 200K",
    totalValue: "₹80,00,000",
    subscribers: 35,
    maxSubscribers: 40,
    monthlyContribution: "₹2,00,000",
    duration: "40 months",
    status: "draft",
    commission: "5%",
    collectedAmount: "₹0",
    pendingAmount: "₹80,00,000",
    completedMonths: 0,
  },
]

const mockSubscribers = [
  {
    id: 1,
    name: "Amit Sharma",
    ucfinNumber: "UCFIN001234567890",
    email: "amit.sharma@email.com",
    phone: "+91 9876543201",
    schemeName: "Gold Savings 50K",
    joinDate: "2025-01-01",
    status: "active",
    paidMonths: 17,
    pendingMonths: 3,
    totalPaid: "₹8,50,000",
    nextPayment: "2025-02-01",
  },
  {
    id: 2,
    name: "Priya Patel",
    ucfinNumber: "UCFIN001234567891",
    email: "priya.patel@email.com",
    phone: "+91 9876543202",
    schemeName: "Gold Savings 50K",
    joinDate: "2025-01-01",
    status: "active",
    paidMonths: 17,
    pendingMonths: 3,
    totalPaid: "₹8,50,000",
    nextPayment: "2025-02-01",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    ucfinNumber: "UCFIN001234567892",
    email: "ravi.kumar@email.com",
    phone: "+91 9876543203",
    schemeName: "Gold Savings 50K",
    joinDate: "2025-01-01",
    status: "defaulter",
    paidMonths: 15,
    pendingMonths: 5,
    totalPaid: "₹7,50,000",
    nextPayment: "2024-12-01",
  },
]

export default function ForemanDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCreateScheme, setShowCreateScheme] = useState(false)
  const [schemeStep, setSchemeStep] = useState(1)
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [showAddSubscriber, setShowAddSubscriber] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const [newScheme, setNewScheme] = useState({
    name: "",
    totalValue: "",
    maxSubscribers: "",
    monthlyContribution: "",
    duration: "",
    commission: "",
    description: "",
    operatorName: "",
    operatorAddress: "",
    operatorPhone: "",
    operatorEmail: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
  })

  const [newSubscriber, setNewSubscriber] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    panNumber: "",
    aadhaarNumber: "",
    bankAccount: "",
    ifscCode: "",
    nomineName: "",
    nomineRelation: "",
    schemeId: "",
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "defaulter":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const [foremanProfile, setForemanProfile] = useState(defaultForemanProfile)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("foremanToken")
      if (!token) {
        router.push("/auth/login")
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("foremanName") || defaultForemanProfile.name
      const email = localStorage.getItem("foremanEmail") || defaultForemanProfile.email

      setForemanProfile((prev) => ({
        ...prev,
        name,
        email,
      }))
    }
  }, [])

  const handleCreateScheme = () => {
    router.push("/foreman/create-scheme")
  }

  const handleCreateSchemeClick = () => {
    router.push("/foreman/create-scheme")
  }

  const handleAddSubscriber = () => {
    const ucfinNumber = `UCFIN${Date.now().toString().slice(-10)}`
    const subscriberData = {
      ...newSubscriber,
      ucfinNumber,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      paidMonths: 0,
      pendingMonths: 0,
      totalPaid: "₹0",
    }
    console.log("Subscriber added:", subscriberData)
    setShowAddSubscriber(false)
    setNewSubscriber({
      name: "",
      email: "",
      phone: "",
      address: "",
      panNumber: "",
      aadhaarNumber: "",
      bankAccount: "",
      ifscCode: "",
      nomineName: "",
      nomineRelation: "",
      schemeId: "",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <ForemanSidebar />
      <SidebarInset>
        {/* Enhanced Header with Breadcrumbs */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/foreman">Foreman Portal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="ml-1">
                2
              </Badge>
            </Button>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
              ID: {foremanProfile.id} - {foremanProfile.name}
            </Badge>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6 bg-gray-50">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, {foremanProfile.name}</h1>
                <p className="text-green-100">Manage your chit fund schemes and track performance.</p>
                <p className="text-green-200 text-sm mt-1">Email: {foremanProfile.email}</p>
              </div>
              <div className="hidden md:block">
                <User className="h-16 w-16 text-green-200" />
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Schemes</p>
                    <p className="text-3xl font-bold text-gray-900">{foremanProfile.activeSchemes}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-600">{foremanProfile.pendingApprovals} pending approval</span>
                    </div>
                  </div>
                  <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                    <p className="text-3xl font-bold text-gray-900">{foremanProfile.totalSubscribers}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600 font-medium">+5</span>
                      <span className="text-gray-500 ml-1">this month</span>
                    </div>
                  </div>
                  <div className="h-14 w-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Fund Value</p>
                    <p className="text-3xl font-bold text-gray-900">{foremanProfile.totalFundValue}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-600">Across all schemes</span>
                    </div>
                  </div>
                  <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <DollarSign className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{foremanProfile.successRate}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <Award className="h-4 w-4 text-orange-500 mr-1" />
                      <span className="text-orange-600 font-medium">Excellent</span>
                      <span className="text-gray-500 ml-1">rating</span>
                    </div>
                  </div>
                  <div className="h-14 w-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={handleCreateSchemeClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Plus className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Create Scheme</h3>
                    <p className="text-sm text-gray-600">Start a new chit fund scheme</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <UserPlus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Add Subscriber</h3>
                    <p className="text-sm text-gray-600">Register new subscribers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Gavel className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Schedule Auction</h3>
                    <p className="text-sm text-gray-600">Manage auction schedules</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white border shadow-sm">
              <TabsTrigger value="overview" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="schemes" className="gap-2">
                <FileText className="h-4 w-4" />
                My Schemes
              </TabsTrigger>
              <TabsTrigger value="subscribers" className="gap-2">
                <Users className="h-4 w-4" />
                Subscribers
              </TabsTrigger>
              <TabsTrigger value="auctions" className="gap-2">
                <Gavel className="h-4 w-4" />
                Auctions
              </TabsTrigger>
              <TabsTrigger value="reports" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Dashboard Overview</h2>
                  <p className="text-sm text-gray-600 mt-1">Your chit fund management summary</p>
                </div>
                <Button onClick={handleCreateSchemeClick} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Scheme
                </Button>
              </div>

              {/* Recent Activity */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment received from Amit Sharma</p>
                        <p className="text-xs text-gray-600">Gold Savings 50K - ₹50,000</p>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New scheme submitted for approval</p>
                        <p className="text-xs text-gray-600">Business Growth 100K - Pending admin review</p>
                      </div>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment reminder sent</p>
                        <p className="text-xs text-gray-600">Ravi Kumar - Overdue payment</p>
                      </div>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs content would continue here... */}
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
