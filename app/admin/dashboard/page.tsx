"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
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
  Users,
  FileText,
  AlertCircle,
  Clock,
  Eye,
  UserPlus,
  Settings,
  BarChart3,
  Bell,
  DollarSign,
  Building,
  ArrowUpRight,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import { AddForemanForm } from "@/components/admin/add-foreman-form"
import { SchemeApprovalPanel } from "@/components/admin/scheme-approval-panel"

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

export default function AdminDashboard() {
  const [foremen, setForemen] = useState(defaultForemen)
  const [pendingSchemes, setPendingSchemes] = useState([])
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [showAddForemanForm, setShowAddForemanForm] = useState(false)

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

      // Load pending schemes
      const storedPendingSchemes = localStorage.getItem("pendingSchemes")
      if (storedPendingSchemes) {
        try {
          const parsedSchemes = JSON.parse(storedPendingSchemes)
          setPendingSchemes(parsedSchemes)
          if (parsedSchemes.length > 0) {
            setSelectedScheme(parsedSchemes[0])
          }
        } catch (error) {
          console.error("Error parsing pending schemes:", error)
        }
      }
    }
  }, [])

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
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300 shadow-sm"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset className="content-area">
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 px-6">
              <SidebarTrigger className="-ml-1 hover:bg-blue-50 rounded-lg p-2 transition-colors" />
              <Separator orientation="vertical" className="mr-2 h-4 bg-slate-300" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/admin" className="text-slate-600 hover:text-blue-600 font-medium">
                      Admin Portal
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block text-slate-400" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-slate-800 font-semibold">Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center gap-4 px-6">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-white/50 backdrop-blur-sm border-slate-200 hover:bg-white hover:shadow-md transition-all"
              >
                <Bell className="h-4 w-4 text-slate-600" />
                <Badge variant="destructive" className="ml-1 bg-red-500 text-white shadow-sm">
                  {pendingSchemes.length}
                </Badge>
              </Button>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                  System Online
                </div>
              </Badge>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-6 p-6">
            <div className="gradient-header">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h1 className="text-3xl font-bold mb-3 text-white">Welcome back, Super Admin</h1>
                  <p className="text-blue-100 text-lg font-medium">
                    Here's what's happening with your chit fund portal today.
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="relative">
                    <Building className="h-20 w-20 text-white/30" />
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid auto-rows-min gap-6 md:grid-cols-4">
              <div className="stats-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">Total Schemes</p>
                    <p className="text-4xl font-bold text-slate-800 mb-2">{pendingSchemes.length}</p>
                    <div className="flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600 font-bold">+12%</span>
                      <span className="text-slate-500 ml-1 font-medium">vs last month</span>
                    </div>
                  </div>
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="stats-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">Active Foremen</p>
                    <p className="text-4xl font-bold text-slate-800 mb-2">
                      {foremen.filter((f) => f.status === "active").length}
                    </p>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-orange-500 mr-1" />
                      <span className="text-orange-600 font-bold">
                        {foremen.filter((f) => f.status === "pending").length} pending
                      </span>
                      <span className="text-slate-500 ml-1 font-medium">approval</span>
                    </div>
                  </div>
                  <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="stats-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">Total Fund Value</p>
                    <p className="text-4xl font-bold text-slate-800 mb-2">₹12.5Cr</p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600 font-bold">+8%</span>
                      <span className="text-slate-500 ml-1 font-medium">growth</span>
                    </div>
                  </div>
                  <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="stats-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">Pending Approvals</p>
                    <p className="text-4xl font-bold text-slate-800 mb-2">
                      {
                        pendingSchemes.filter(
                          (s) => s.schemeStatus === "submitted" || s.schemeStatus === "final_agreement_uploaded",
                        ).length
                      }
                    </p>
                    <div className="flex items-center text-sm">
                      <Zap className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-red-600 font-bold">Urgent</span>
                      <span className="text-slate-500 ml-1 font-medium">attention</span>
                    </div>
                  </div>
                  <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid auto-rows-min gap-6 md:grid-cols-3">
              <div className="card-enhanced cursor-pointer group" onClick={() => setShowAddForemanForm(true)}>
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <UserPlus className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">Add Foreman</h3>
                      <p className="text-sm text-slate-600 font-medium">Register new foreman account</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-enhanced cursor-pointer group">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">Quick Approval</h3>
                      <p className="text-sm text-slate-600 font-medium">Review pending schemes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-enhanced cursor-pointer group">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">View Reports</h3>
                      <p className="text-sm text-slate-600 font-medium">Analytics & insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-[100vh] flex-1 rounded-2xl bg-white shadow-lg border border-slate-200">
              <Tabs defaultValue="schemes" className="space-y-6 p-6">
                <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger
                    value="schemes"
                    className="tab-enhanced gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Scheme Management</span>
                    <span className="sm:hidden font-semibold">Schemes</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="foremen"
                    className="tab-enhanced gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Foreman Management</span>
                    <span className="sm:hidden font-semibold">Foremen</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="reports"
                    className="tab-enhanced gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Reports & Analytics</span>
                    <span className="sm:hidden font-semibold">Reports</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="system"
                    className="tab-enhanced gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">System Settings</span>
                    <span className="sm:hidden font-semibold">Settings</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="schemes" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Scheme Approval Management</h2>
                      <p className="text-slate-600 font-medium">Review and approve chit fund schemes</p>
                    </div>
                    <div className="flex items-center gap-4">
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

                <TabsContent value="foremen" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Foreman Management</h2>
                      <p className="text-slate-600 font-medium">Manage foreman accounts and permissions</p>
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
                    <div className="space-y-4">
                      {foremen.map((foreman) => (
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
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold">Add New Foreman</h2>
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
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Reports & Analytics</h2>
                      <p className="text-slate-600 font-medium">System performance and business insights</p>
                    </div>
                  </div>

                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-600 mb-2">Analytics Dashboard</h3>
                    <p className="text-slate-500 font-medium">Detailed reports and analytics will be displayed here.</p>
                  </div>
                </TabsContent>

                <TabsContent value="system" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
                      <p className="text-slate-600 font-medium">Configure system parameters and preferences</p>
                    </div>
                  </div>

                  <div className="text-center py-12">
                    <Settings className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-600 mb-2">System Configuration</h3>
                    <p className="text-slate-500 font-medium">
                      System settings and configuration options will be available here.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
