"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  FileText,
  Clock,
  Eye,
  UserPlus,
  TrendingUp,
  CheckCircle,
  Package,
  CreditCard,
  UserCheck,
  Search,
  Filter,
  Edit,
  UserX,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  RefreshCw,
} from "lucide-react"
import { AddForemanForm } from "@/components/admin/add-foreman-form"
import { SchemeApprovalPanel } from "@/components/admin/scheme-approval-panel"
import CardTrackingPanel from "@/components/admin/card-tracking-panel"

const defaultForemen = [
  {
    id: "FM001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    experience: "5 years",
    activeSchemes: 3,
    totalSubscribers: 85,
    status: "active",
    joinDate: "2023-03-15",
    password: "rajesh123",
    companyName: "Kumar Chit Funds",
    designation: "Managing Director",
    city: "Bangalore",
    totalMembers: "15K+",
    companyLogo: null,
  },
  {
    id: "FM002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    experience: "8 years",
    activeSchemes: 5,
    totalSubscribers: 150,
    status: "active",
    joinDate: "2022-11-20",
    password: "priya123",
    companyName: "Sharma Financial Services",
    designation: "CEO",
    city: "Mysore",
    totalMembers: "8K+",
    companyLogo: null,
  },
  {
    id: "FM003",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 9876543212",
    experience: "3 years",
    activeSchemes: 2,
    totalSubscribers: 60,
    status: "pending",
    joinDate: "2024-08-10",
    password: "amit123",
    companyName: "Patel Chit Fund Company",
    designation: "Director",
    city: "Hubli",
    totalMembers: "12K+",
    companyLogo: null,
  },
]

// Sample user data for User Management
const defaultUsers = [
  {
    id: "USR001",
    ucfsinId: "UCFSIN2024001",
    name: "Anita Sharma",
    email: "anita.sharma@email.com",
    phone: "+91 9876543213",
    city: "Bangalore",
    state: "Karnataka",
    registrationDate: "2024-01-15",
    status: "active",
    kycStatus: "verified",
    cardStatus: "delivered",
    activeSchemes: 2,
    totalInvestment: "₹50,000",
    lastLogin: "2025-01-25",
  },
  {
    id: "USR002",
    ucfsinId: "UCFSIN2024002",
    name: "Ravi Kumar",
    email: "ravi.kumar@email.com",
    phone: "+91 9876543214",
    city: "Mysore",
    state: "Karnataka",
    registrationDate: "2024-02-20",
    status: "active",
    kycStatus: "verified",
    cardStatus: "shipped",
    activeSchemes: 1,
    totalInvestment: "₹25,000",
    lastLogin: "2025-01-24",
  },
  {
    id: "USR003",
    ucfsinId: "UCFSIN2024003",
    name: "Meera Patel",
    email: "meera.patel@email.com",
    phone: "+91 9876543215",
    city: "Hubli",
    state: "Karnataka",
    registrationDate: "2024-03-10",
    status: "suspended",
    kycStatus: "pending",
    cardStatus: "not_requested",
    activeSchemes: 0,
    totalInvestment: "₹0",
    lastLogin: "2025-01-20",
  },
  {
    id: "USR004",
    ucfsinId: "UCFSIN2024004",
    name: "Suresh Reddy",
    email: "suresh.reddy@email.com",
    phone: "+91 9876543216",
    city: "Bangalore",
    state: "Karnataka",
    registrationDate: "2024-04-05",
    status: "active",
    kycStatus: "verified",
    cardStatus: "processing",
    activeSchemes: 3,
    totalInvestment: "₹75,000",
    lastLogin: "2025-01-26",
  },
]

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Pending Approvals",
    value: "23",
    change: "-5%",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Active Schemes",
    value: "89",
    change: "+8%",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Physical Cards",
    value: "156",
    change: "+15%",
    icon: CreditCard,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "scheme_approval",
    title: "New scheme submitted for approval",
    description: "Monthly Savings Scheme by Foreman John",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    type: "user_registration",
    title: "New user registered",
    description: "Priya Sharma completed UCFSIN registration",
    time: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "card_request",
    title: "Physical card requested",
    description: "Rajesh Kumar requested physical UCFSIN card",
    time: "6 hours ago",
    status: "processing",
  },
]

export default function AdminDashboard() {
  const [foremen, setForemen] = useState(defaultForemen)
  const [users, setUsers] = useState(defaultUsers)
  const [pendingSchemes, setPendingSchemes] = useState([])
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [showAddForemanForm, setShowAddForemanForm] = useState(false)
  const [cardOrders, setCardOrders] = useState([])
  const [activeTab, setActiveTab] = useState("overview")
  const [userSearchTerm, setUserSearchTerm] = useState("")
  const [userStatusFilter, setUserStatusFilter] = useState("all")
  const [foremanSearchTerm, setForemanSearchTerm] = useState("")
  const [foremanStatusFilter, setForemanStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)
  const [userManagementView, setUserManagementView] = useState("users") // "users" or "foremen"

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load foremen
      const storedForemen = localStorage.getItem("foremenList")
      if (storedForemen) {
        try {
          const parsedForemen = JSON.parse(storedForemen)
          setForemen(parsedForemen)
        } catch (error) {
          console.error("Error parsing stored foremen:", error)
          localStorage.setItem("foremenList", JSON.stringify(defaultForemen))
        }
      } else {
        localStorage.setItem("foremenList", JSON.stringify(defaultForemen))
      }

      // Load users
      const storedUsers = localStorage.getItem("usersList")
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers)
          setUsers(parsedUsers)
        } catch (error) {
          console.error("Error parsing stored users:", error)
          localStorage.setItem("usersList", JSON.stringify(defaultUsers))
        }
      } else {
        localStorage.setItem("usersList", JSON.stringify(defaultUsers))
      }

      // Load pending schemes - FIXED
      const storedPendingSchemes = localStorage.getItem("pendingSchemes")
      console.log("Loading pending schemes from localStorage:", storedPendingSchemes)

      if (storedPendingSchemes) {
        try {
          const parsedSchemes = JSON.parse(storedPendingSchemes)
          console.log("Parsed pending schemes:", parsedSchemes)
          setPendingSchemes(parsedSchemes)
          if (parsedSchemes.length > 0) {
            setSelectedScheme(parsedSchemes[0])
          }
        } catch (error) {
          console.error("Error parsing pending schemes:", error)
          setPendingSchemes([])
        }
      } else {
        console.log("No pending schemes found in localStorage")
        setPendingSchemes([])
      }

      // Load card orders
      const storedCardOrders = localStorage.getItem("physicalCardOrders")
      if (storedCardOrders) {
        try {
          const parsedOrders = JSON.parse(storedCardOrders)
          setCardOrders(parsedOrders)
        } catch (error) {
          console.error("Error parsing card orders:", error)
        }
      }
    }
  }, [])

  // Add a refresh function to reload pending schemes
  const refreshPendingSchemes = () => {
    const storedPendingSchemes = localStorage.getItem("pendingSchemes")
    if (storedPendingSchemes) {
      try {
        const parsedSchemes = JSON.parse(storedPendingSchemes)
        setPendingSchemes(parsedSchemes)
        console.log("Refreshed pending schemes:", parsedSchemes)
      } catch (error) {
        console.error("Error refreshing pending schemes:", error)
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300 shadow-sm"
      case "pso_approved":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm"
      case "final_agreement_uploaded":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300 shadow-sm"
      case "live":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm"
      case "rejected":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300 shadow-sm"
      case "active":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm"
      case "suspended":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300 shadow-sm"
      case "verified":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm"
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300 shadow-sm"
      case "delivered":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm"
      case "shipped":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300 shadow-sm"
      case "processing":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300 shadow-sm"
      case "not_requested":
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300 shadow-sm"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300 shadow-sm"
    }
  }

  const handleApproveScheme = async (schemeId, comments) => {
    try {
      const scheme = pendingSchemes.find((s) => s.schemeId === schemeId)
      if (!scheme) return

      // Generate PSO certificate automatically
      const psoNumber = `PSO-2025-${String(Date.now()).slice(-6)}`
      const psoDocument = {
        name: `PSO_Certificate_${psoNumber}.pdf`,
        url: `/placeholder.svg?height=600&width=800&text=PSO Certificate ${psoNumber}`,
        generatedAt: new Date().toISOString(),
      }

      const updatedScheme = {
        ...scheme,
        schemeStatus: "pso_approved",
        psoNumber: psoNumber,
        psoDocument: psoDocument,
        psoGeneratedDate: new Date().toISOString(),
        adminComments: {
          ...scheme.adminComments,
          pso_approval: comments,
        },
        lastUpdated: new Date().toISOString(),
      }

      // Update pending schemes
      const updatedPendingSchemes = pendingSchemes.map((s) => (s.schemeId === schemeId ? updatedScheme : s))
      setPendingSchemes(updatedPendingSchemes)
      localStorage.setItem("pendingSchemes", JSON.stringify(updatedPendingSchemes))

      // Also update the draft for foreman
      localStorage.setItem("schemeDraft", JSON.stringify(updatedScheme))

      console.log(`Scheme ${schemeId} approved with PSO: ${psoNumber}`)
      alert(`Scheme approved successfully! PSO Certificate ${psoNumber} has been generated.`)

      setSelectedScheme(updatedScheme)
    } catch (error) {
      console.error("Error approving scheme:", error)
      alert("Error approving scheme. Please try again.")
    }
  }

  const handleRejectScheme = async (schemeId, reason) => {
    try {
      const scheme = pendingSchemes.find((s) => s.schemeId === schemeId)
      if (!scheme) return

      const updatedScheme = {
        ...scheme,
        schemeStatus: "rejected",
        rejectionReason: reason,
        adminComments: {
          ...scheme.adminComments,
          rejection: reason,
        },
        lastUpdated: new Date().toISOString(),
      }

      // Update pending schemes
      const updatedPendingSchemes = pendingSchemes.map((s) => (s.schemeId === schemeId ? updatedScheme : s))
      setPendingSchemes(updatedPendingSchemes)
      localStorage.setItem("pendingSchemes", JSON.stringify(updatedPendingSchemes))

      // Also update the draft for foreman
      localStorage.setItem("schemeDraft", JSON.stringify(updatedScheme))

      console.log(`Scheme ${schemeId} rejected. Reason: ${reason}`)
      alert("Scheme rejected successfully.")

      setSelectedScheme(updatedScheme)
    } catch (error) {
      console.error("Error rejecting scheme:", error)
      alert("Error rejecting scheme. Please try again.")
    }
  }

  const handleApproveFinalAgreement = async (schemeId, comments) => {
    try {
      const scheme = pendingSchemes.find((s) => s.schemeId === schemeId)
      if (!scheme) return

      // Generate Form 7 (Commencement Certificate)
      const form7Number = `FORM7-2025-${String(Date.now()).slice(-6)}`
      const commencementCertificate = {
        name: `Form7_Commencement_Certificate_${form7Number}.pdf`,
        url: `/placeholder.svg?height=600&width=800&text=Form 7 Commencement Certificate ${form7Number}`,
        number: form7Number,
        issuedDate: new Date().toISOString(),
        status: "issued",
      }

      const updatedScheme = {
        ...scheme,
        schemeStatus: "live",
        commencementCertificate: commencementCertificate,
        adminComments: {
          ...scheme.adminComments,
          final_approval: comments,
        },
        liveDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      }

      // Update pending schemes
      const updatedPendingSchemes = pendingSchemes.map((s) => (s.schemeId === schemeId ? updatedScheme : s))
      setPendingSchemes(updatedPendingSchemes)
      localStorage.setItem("pendingSchemes", JSON.stringify(updatedPendingSchemes))

      // Move to live schemes
      const liveSchemes = JSON.parse(localStorage.getItem("liveSchemes") || "[]")
      liveSchemes.push(updatedScheme)
      localStorage.setItem("liveSchemes", JSON.stringify(liveSchemes))

      // Also update the draft for foreman
      localStorage.setItem("schemeDraft", JSON.stringify(updatedScheme))

      console.log(`Scheme ${schemeId} approved for commencement with Form 7: ${form7Number}`)
      alert(`Final approval granted! Form 7 Certificate ${form7Number} has been issued. Scheme is now LIVE!`)

      setSelectedScheme(updatedScheme)
    } catch (error) {
      console.error("Error approving final agreement:", error)
      alert("Error approving final agreement. Please try again.")
    }
  }

  const handleAddForemanSuccess = (newForemanData) => {
    const newId = `FM${String(foremen.length + 1).padStart(3, "0")}`
    const defaultPassword = newForemanData.firstName.toLowerCase() + "123"

    const newForeman = {
      id: newId,
      name: `${newForemanData.firstName} ${newForemanData.lastName}`,
      email: newForemanData.email,
      phone: newForemanData.phone,
      experience: "New",
      activeSchemes: 0,
      totalSubscribers: 0,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      password: defaultPassword,
      companyName: newForemanData.companyName,
      designation: newForemanData.designation,
      city: newForemanData.city,
      totalMembers: newForemanData.totalMembers,
      companyLogo: newForemanData.companyLogo,
    }

    const updatedForemen = [...foremen, newForeman]
    setForemen(updatedForemen)

    if (typeof window !== "undefined") {
      localStorage.setItem("foremenList", JSON.stringify(updatedForemen))
    }

    setShowAddForemanForm(false)
    alert(
      `Foreman ${newForeman.name} has been added successfully!\n\nLogin Credentials:\nEmail: ${newForeman.email}\nPassword: ${defaultPassword}\n\nPlease share these credentials with the foreman.\n\nTheir company will now appear in the Client Partners section on the homepage.`,
    )
  }

  // User Management Functions
  const handleUserStatusChange = (userId, newStatus) => {
    const updatedUsers = users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user))
    setUsers(updatedUsers)
    localStorage.setItem("usersList", JSON.stringify(updatedUsers))
    alert(`User status updated to ${newStatus}`)
  }

  const handleManualTrackingUpdate = (userId, trackingInfo) => {
    // This would typically update tracking information
    alert(`Tracking information updated for user ${userId}`)
  }

  // Filter users based on search and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.ucfsinId.toLowerCase().includes(userSearchTerm.toLowerCase())
    const matchesStatus = userStatusFilter === "all" || user.status === userStatusFilter
    return matchesSearch && matchesStatus
  })

  // Filter foremen based on search and status
  const filteredForemen = foremen.filter((foreman) => {
    const matchesSearch =
      foreman.name.toLowerCase().includes(foremanSearchTerm.toLowerCase()) ||
      foreman.email.toLowerCase().includes(foremanSearchTerm.toLowerCase()) ||
      foreman.companyName.toLowerCase().includes(foremanSearchTerm.toLowerCase())
    const matchesStatus = foremanStatusFilter === "all" || foreman.status === foremanStatusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset className="content-area">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">Manage UCFSIN system operations</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    System Online
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="schemes" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Scheme Approvals
                </TabsTrigger>
                <TabsTrigger value="tracking" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Card Tracking
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  User Management
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <Card key={stat.title}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`h-12 w-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                              <Icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                          </div>
                          <div className="mt-4">
                            <span
                              className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                            >
                              {stat.change}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">from last month</span>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">
                            {activity.type === "scheme_approval" && (
                              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                <FileText className="h-4 w-4 text-yellow-600" />
                              </div>
                            )}
                            {activity.type === "user_registration" && (
                              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                <UserCheck className="h-4 w-4 text-green-600" />
                              </div>
                            )}
                            {activity.type === "card_request" && (
                              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <CreditCard className="h-4 w-4 text-purple-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <Badge
                              variant={
                                activity.status === "completed"
                                  ? "default"
                                  : activity.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                activity.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : activity.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schemes" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Scheme Approval Management</h2>
                    <p className="text-slate-600 font-medium">Review and approve chit fund schemes</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button onClick={refreshPendingSchemes} variant="outline" className="gap-2 bg-transparent">
                      <RefreshCw className="h-4 w-4" />
                      Refresh
                    </Button>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Pending PSO: {pendingSchemes.filter((s) => s.schemeStatus === "submitted").length}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Pending Final:{" "}
                      {pendingSchemes.filter((s) => s.schemeStatus === "final_agreement_uploaded").length}
                    </Badge>
                  </div>
                </div>

                {pendingSchemes.length > 0 ? (
                  <div className="space-y-6">
                    {/* Scheme Selection */}
                    <div className="flex flex-wrap gap-2">
                      {pendingSchemes.map((scheme) => (
                        <Button
                          key={scheme.schemeId}
                          variant={selectedScheme?.schemeId === scheme.schemeId ? "default" : "outline"}
                          onClick={() => setSelectedScheme(scheme)}
                          className="gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          {scheme.schemeName || `Scheme ${scheme.schemeId}`}
                          <Badge className={getStatusColor(scheme.schemeStatus)} variant="secondary">
                            {scheme.schemeStatus?.replace(/_/g, " ").toUpperCase()}
                          </Badge>
                        </Button>
                      ))}
                    </div>

                    {/* Selected Scheme Approval Panel */}
                    {selectedScheme && (
                      <SchemeApprovalPanel
                        scheme={selectedScheme}
                        onApprove={handleApproveScheme}
                        onReject={handleRejectScheme}
                        onApproveFinalAgreement={handleApproveFinalAgreement}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Pending Schemes</h3>
                    <p className="text-gray-500">All schemes have been reviewed and processed.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tracking">
                <CardTrackingPanel />
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
                    <p className="text-slate-600 font-medium">Manage users and foremen accounts</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Total Users: {users.length}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Total Foremen: {foremen.length}
                    </Badge>
                  </div>
                </div>

                {/* User Management Navigation */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <Button
                    variant={userManagementView === "users" ? "default" : "ghost"}
                    onClick={() => setUserManagementView("users")}
                    className="flex-1 gap-2"
                  >
                    <Users className="h-4 w-4" />
                    All Users ({users.length})
                  </Button>
                  <Button
                    variant={userManagementView === "foremen" ? "default" : "ghost"}
                    onClick={() => setUserManagementView("foremen")}
                    className="flex-1 gap-2"
                  >
                    <UserCheck className="h-4 w-4" />
                    Foremen ({foremen.length})
                  </Button>
                </div>

                {/* All Users View */}
                {userManagementView === "users" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">All Users</h3>
                        <p className="text-slate-600">Manage user accounts, status updates, and tracking</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active: {users.filter((u) => u.status === "active").length}
                        </Badge>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Suspended: {users.filter((u) => u.status === "suspended").length}
                        </Badge>
                      </div>
                    </div>

                    {/* Search and Filter Controls */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search users by name, email, or UCFSIN ID..."
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={userStatusFilter} onValueChange={setUserStatusFilter}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Users Table */}
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>User Details</TableHead>
                              <TableHead>UCFSIN ID</TableHead>
                              <TableHead>Contact</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>KYC</TableHead>
                              <TableHead>Card Status</TableHead>
                              <TableHead>Investment</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>
                                  <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                      <Users className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900">{user.name}</p>
                                      <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {user.city}, {user.state}
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{user.ucfsinId}</div>
                                </TableCell>
                                <TableCell>
                                  <div className="space-y-1">
                                    <p className="text-sm flex items-center gap-1">
                                      <Mail className="h-3 w-3" />
                                      {user.email}
                                    </p>
                                    <p className="text-sm flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {user.phone}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(user.kycStatus)}>{user.kycStatus}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(user.cardStatus)}>
                                    {user.cardStatus.replace(/_/g, " ")}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{user.totalInvestment}</p>
                                    <p className="text-sm text-gray-500">{user.activeSchemes} schemes</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setSelectedUser(user)}
                                      className="gap-1"
                                    >
                                      <Eye className="h-3 w-3" />
                                      View
                                    </Button>
                                    {user.status === "active" ? (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleUserStatusChange(user.id, "suspended")}
                                        className="gap-1 text-red-600 hover:text-red-700"
                                      >
                                        <UserX className="h-3 w-3" />
                                        Suspend
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleUserStatusChange(user.id, "active")}
                                        className="gap-1 text-green-600 hover:text-green-700"
                                      >
                                        <ShieldCheck className="h-3 w-3" />
                                        Activate
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleManualTrackingUpdate(user.id, {})}
                                      className="gap-1"
                                    >
                                      <Edit className="h-3 w-3" />
                                      Track
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    {filteredUsers.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Users Found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Foremen Management View */}
                {userManagementView === "foremen" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Foreman Management</h3>
                        <p className="text-slate-600">Manage foreman accounts and permissions</p>
                      </div>
                      <Button
                        className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                        onClick={() => setShowAddForemanForm(true)}
                      >
                        <UserPlus className="h-4 w-4" />
                        Add Foreman
                      </Button>
                    </div>

                    {!showAddForemanForm ? (
                      <div className="space-y-6">
                        {/* Search and Filter Controls for Foremen */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search foremen by name, email, or company..."
                              value={foremanSearchTerm}
                              onChange={(e) => setForemanSearchTerm(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          <Select value={foremanStatusFilter} onValueChange={setForemanStatusFilter}>
                            <SelectTrigger className="w-48">
                              <Filter className="h-4 w-4 mr-2" />
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4">
                          {filteredForemen.map((foreman) => (
                            <div key={foreman.id} className="card-enhanced p-6 border-l-4 border-l-green-500">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-4 mb-4">
                                    <h3 className="text-xl font-bold text-slate-800">{foreman.name}</h3>
                                    <Badge
                                      className={`${getStatusColor(foreman.status)} font-bold px-3 py-1 text-xs uppercase tracking-wide`}
                                    >
                                      {foreman.status}
                                    </Badge>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                      {foreman.id}
                                    </Badge>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                                    <div className="bg-slate-50 rounded-lg p-4">
                                      <p className="text-sm font-semibold text-slate-600 mb-1">Company</p>
                                      <p className="font-bold text-slate-800">{foreman.companyName}</p>
                                      <p className="text-xs text-slate-500 font-medium">{foreman.designation}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4">
                                      <p className="text-sm font-semibold text-slate-600 mb-1">Contact</p>
                                      <p className="font-bold text-slate-800 text-sm">{foreman.email}</p>
                                      <p className="text-xs text-slate-500 font-medium">{foreman.phone}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4">
                                      <p className="text-sm font-semibold text-slate-600 mb-1">Active Schemes</p>
                                      <p className="font-bold text-slate-800 text-lg">{foreman.activeSchemes}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4">
                                      <p className="text-sm font-semibold text-slate-600 mb-1">Subscribers</p>
                                      <p className="font-bold text-slate-800 text-lg">{foreman.totalSubscribers}</p>
                                    </div>
                                  </div>

                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                    <p className="text-sm font-semibold text-blue-800 mb-1">Login Credentials:</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="font-medium text-blue-700">Email:</span> {foreman.email}
                                      </div>
                                      <div>
                                        <span className="font-medium text-blue-700">Password:</span> {foreman.password}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2 ml-6">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 bg-white hover:bg-slate-50 border-slate-300"
                                  >
                                    <Eye className="h-4 w-4" />
                                    View Profile
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 bg-white hover:bg-slate-50 border-slate-300"
                                  >
                                    Reset Password
                                  </Button>
                                  {foreman.status === "pending" && (
                                    <Button
                                      size="sm"
                                      className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                      Approve
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {filteredForemen.length === 0 && (
                          <div className="text-center py-12">
                            <UserCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Foremen Found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold">Add New Foreman</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Complete the registration process for a new foreman
                            </p>
                          </div>
                        </div>
                        <AddForemanForm
                          onSuccess={handleAddForemanSuccess}
                          onCancel={() => setShowAddForemanForm(false)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
