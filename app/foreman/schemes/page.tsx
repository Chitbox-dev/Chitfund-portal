"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Plus,
  FileText,
  Users,
  DollarSign,
  Calendar,
  Eye,
  Trash2,
  Download,
  Clock,
  CheckCircle,
  Upload,
  RefreshCw,
  AlertCircle,
  ArrowRight,
} from "lucide-react"

const mockSchemes = [
  {
    id: 1,
    schemeId: "SCH-1736859597000",
    name: "Gold Savings 50K",
    chitValue: "₹10,00,000",
    duration: "20 months",
    subscribers: 20,
    maxSubscribers: 20,
    monthlyPremium: "₹50,000",
    status: "live",
    schemeStatus: "live",
    psoNumber: "PSO-2025-001",
    commencementCertificate: {
      number: "FORM7-2025-001",
      issuedDate: "2025-01-01",
      status: "issued",
    },
    startDate: "2025-01-01",
    nextAuction: "2025-02-15",
    commission: "5%",
    collectedAmount: "₹8,50,000",
    pendingAmount: "₹1,50,000",
    completedMonths: 17,
    createdDate: "2024-12-15",
    lastUpdated: "2025-01-14T10:30:00Z",
  },
  {
    id: 2,
    schemeId: "SCH-1736859598000",
    name: "Business Growth 100K",
    chitValue: "₹30,00,000",
    duration: "30 months",
    subscribers: 25,
    maxSubscribers: 30,
    monthlyPremium: "₹1,00,000",
    status: "pso_approved",
    schemeStatus: "pso_approved",
    psoNumber: "PSO-2025-002",
    startDate: "2025-02-01",
    commission: "4.5%",
    collectedAmount: "₹0",
    pendingAmount: "₹30,00,000",
    completedMonths: 0,
    createdDate: "2025-01-10",
    lastUpdated: "2025-01-14T09:15:00Z",
  },
  {
    id: 3,
    schemeId: "SCH-1736859599000",
    name: "Dream Home 200K",
    chitValue: "₹80,00,000",
    duration: "40 months",
    subscribers: 0,
    maxSubscribers: 40,
    monthlyPremium: "₹2,00,000",
    status: "steps_1_4_approved",
    schemeStatus: "steps_1_4_approved",
    commission: "5%",
    collectedAmount: "₹0",
    pendingAmount: "₹80,00,000",
    completedMonths: 0,
    createdDate: "2025-01-05",
    lastUpdated: "2025-01-14T11:45:00Z",
    adminComments: {
      steps_1_4: "Steps 1-4 approved by admin. You can now request PSO.",
    },
  },
]

export default function SchemesPage() {
  const [schemes, setSchemes] = useState([])
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  // Load schemes from localStorage and merge with mock data
  useEffect(() => {
    loadSchemes()
  }, [])

  const loadSchemes = () => {
    try {
      // Load from localStorage
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const schemeDraft = localStorage.getItem("schemeDraft")

      const allSchemes = [...mockSchemes]

      // Add schemes from localStorage
      const localSchemes = [...pendingSchemes, ...approvedSchemes]

      // Add draft if it exists and is not already in the lists
      if (schemeDraft) {
        try {
          const draft = JSON.parse(schemeDraft)
          const existsInLocal = localSchemes.some((s) => s.schemeId === draft.schemeId)
          if (!existsInLocal) {
            localSchemes.push(draft)
          }
        } catch (error) {
          console.error("Error parsing draft:", error)
        }
      }

      // Merge with mock data, prioritizing localStorage data
      localSchemes.forEach((localScheme) => {
        const existingIndex = allSchemes.findIndex((s) => s.schemeId === localScheme.schemeId)
        if (existingIndex >= 0) {
          allSchemes[existingIndex] = {
            ...allSchemes[existingIndex],
            ...localScheme,
            name: localScheme.name || `Scheme ${localScheme.schemeId}`,
          }
        } else {
          allSchemes.push({
            ...localScheme,
            id: Date.now() + Math.random(),
            name: localScheme.name || `Scheme ${localScheme.schemeId}`,
            chitValue: `₹${localScheme.chitValue}`,
            monthlyPremium: `₹${localScheme.monthlyPremium}`,
            duration: `${localScheme.chitDuration} months`,
            subscribers: localScheme.subscribers?.length || 0,
            maxSubscribers: Number.parseInt(localScheme.numberOfSubscribers) || 0,
            status: localScheme.schemeStatus,
            schemeStatus: localScheme.schemeStatus,
          })
        }
      })

      // Sort by last updated (most recent first)
      allSchemes.sort((a, b) => {
        const dateA = new Date(a.lastUpdated || a.createdDate || 0)
        const dateB = new Date(b.lastUpdated || b.createdDate || 0)
        return dateB - dateA
      })

      setSchemes(allSchemes)
    } catch (error) {
      console.error("Error loading schemes:", error)
      setSchemes(mockSchemes)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    loadSchemes()
    setRefreshing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800 border-green-200"
      case "pso_approved":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "steps_1_4_approved":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "pso_requested":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "subscribers_added":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "final_agreement_uploaded":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "live":
        return <CheckCircle className="h-4 w-4" />
      case "pso_approved":
        return <CheckCircle className="h-4 w-4" />
      case "steps_1_4_approved":
        return <AlertCircle className="h-4 w-4" />
      case "pso_requested":
        return <Clock className="h-4 w-4" />
      case "subscribers_added":
        return <Users className="h-4 w-4" />
      case "final_agreement_uploaded":
        return <Upload className="h-4 w-4" />
      case "submitted":
        return <Clock className="h-4 w-4" />
      case "draft":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusMessage = (scheme) => {
    switch (scheme.schemeStatus || scheme.status) {
      case "steps_1_4_approved":
        return {
          message: "Steps 1-4 Approved! You can now request PSO.",
          action: "Request PSO",
          actionUrl: `/foreman/create-scheme?schemeId=${scheme.schemeId}&step=5`,
          color: "text-blue-600",
        }
      case "pso_approved":
        return {
          message: "PSO Approved! You can now add subscribers.",
          action: "Add Subscribers",
          actionUrl: `/foreman/create-scheme?schemeId=${scheme.schemeId}&step=6`,
          color: "text-green-600",
        }
      case "subscribers_added":
        return {
          message: "Subscribers added. Upload final agreement.",
          action: "Upload Agreement",
          actionUrl: `/foreman/create-scheme?schemeId=${scheme.schemeId}&step=7`,
          color: "text-purple-600",
        }
      case "live":
        return {
          message: "Scheme is LIVE! Manage your active scheme.",
          action: "Manage Scheme",
          actionUrl: `/foreman/schemes/${scheme.schemeId}/manage`,
          color: "text-green-600",
        }
      case "submitted":
        return {
          message: "Submitted for admin review. Please wait.",
          action: "View Status",
          actionUrl: `/foreman/create-scheme?schemeId=${scheme.schemeId}`,
          color: "text-orange-600",
        }
      case "pso_requested":
        return {
          message: "PSO requested. Waiting for admin approval.",
          action: "View Status",
          actionUrl: `/foreman/create-scheme?schemeId=${scheme.schemeId}&step=5`,
          color: "text-orange-600",
        }
      case "final_agreement_uploaded":
        return {
          message: "Final agreement uploaded. Waiting for Form 7.",
          action: "View Status",
          actionUrl: `/foreman/create-scheme?schemeId=${scheme.schemeId}&step=8`,
          color: "text-indigo-600",
        }
      default:
        return {
          message: "Continue working on your scheme.",
          action: "Continue",
          actionUrl: `/foreman/create-scheme?schemeId=${scheme.schemeId}`,
          color: "text-gray-600",
        }
    }
  }

  const handleCreateScheme = () => {
    window.location.href = "/foreman/create-scheme"
  }

  const handleViewScheme = (scheme) => {
    const statusInfo = getStatusMessage(scheme)
    window.location.href = statusInfo.actionUrl
  }

  const handleEditScheme = (scheme) => {
    window.location.href = `/foreman/create-scheme?schemeId=${scheme.schemeId}`
  }

  const handleDeleteScheme = (schemeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this scheme?")
    if (confirmDelete) {
      // Remove from localStorage
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")

      const updatedPending = pendingSchemes.filter((s) => s.schemeId !== schemeId)
      const updatedApproved = approvedSchemes.filter((s) => s.schemeId !== schemeId)

      localStorage.setItem("pendingSchemes", JSON.stringify(updatedPending))
      localStorage.setItem("approvedSchemes", JSON.stringify(updatedApproved))

      // Remove from current schemes
      setSchemes(schemes.filter((scheme) => scheme.schemeId !== schemeId))
    }
  }

  return (
    <SidebarProvider>
      <ForemanSidebar />
      <SidebarInset>
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
                <BreadcrumbPage>My Schemes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex gap-2">
            <Button onClick={handleRefresh} variant="outline" className="gap-2 bg-transparent" disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button onClick={handleCreateScheme} className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Scheme
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6 bg-gray-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Schemes</h1>
              <p className="text-gray-600 mt-1">Manage and monitor your chit fund schemes</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Total Schemes: {schemes.length}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Live: {schemes.filter((s) => s.status === "live" || s.schemeStatus === "live").length}
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Pending:{" "}
                {
                  schemes.filter((s) =>
                    ["submitted", "pso_requested", "steps_1_4_approved"].includes(s.status || s.schemeStatus),
                  ).length
                }
              </Badge>
            </div>
          </div>

          {/* Status-based Sections */}
          <div className="space-y-8">
            {/* Action Required Section */}
            {schemes.filter((s) =>
              ["steps_1_4_approved", "pso_approved", "subscribers_added"].includes(s.schemeStatus || s.status),
            ).length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Action Required</h2>
                  <Badge className="bg-orange-100 text-orange-800">
                    {
                      schemes.filter((s) =>
                        ["steps_1_4_approved", "pso_approved", "subscribers_added"].includes(
                          s.schemeStatus || s.status,
                        ),
                      ).length
                    }
                  </Badge>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {schemes
                    .filter((s) =>
                      ["steps_1_4_approved", "pso_approved", "subscribers_added"].includes(s.schemeStatus || s.status),
                    )
                    .map((scheme) => (
                      <SchemeCard
                        key={scheme.schemeId}
                        scheme={scheme}
                        onView={handleViewScheme}
                        onEdit={handleEditScheme}
                        onDelete={handleDeleteScheme}
                        getStatusColor={getStatusColor}
                        getStatusIcon={getStatusIcon}
                        getStatusMessage={getStatusMessage}
                        priority={true}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* All Schemes Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-gray-500" />
                <h2 className="text-xl font-semibold text-gray-900">All Schemes</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {schemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.schemeId}
                    scheme={scheme}
                    onView={handleViewScheme}
                    onEdit={handleEditScheme}
                    onDelete={handleDeleteScheme}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    getStatusMessage={getStatusMessage}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Empty State */}
          {schemes.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Schemes Found</h3>
              <p className="text-gray-500 mb-6">You haven't created any chit fund schemes yet.</p>
              <Button onClick={handleCreateScheme} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Scheme
              </Button>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Separate SchemeCard component for better organization
function SchemeCard({
  scheme,
  onView,
  onEdit,
  onDelete,
  getStatusColor,
  getStatusIcon,
  getStatusMessage,
  priority = false,
}) {
  const statusInfo = getStatusMessage(scheme)

  const handlePublishScheme = (scheme) => {
    window.location.href = `/foreman/schemes/${scheme.schemeId}/publish`
  }

  return (
    <Card
      className={`border-0 shadow-lg hover:shadow-xl transition-shadow ${priority ? "ring-2 ring-orange-200 bg-orange-50/30" : ""}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                className={`${getStatusColor(scheme.schemeStatus || scheme.status)} font-medium px-2 py-1 text-xs`}
              >
                {getStatusIcon(scheme.schemeStatus || scheme.status)}
                <span className="ml-1 capitalize">{(scheme.schemeStatus || scheme.status).replace(/_/g, " ")}</span>
              </Badge>
              {scheme.psoNumber && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {scheme.psoNumber}
                </Badge>
              )}
            </div>
            {scheme.adminComments?.steps_1_4 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-2">
                <p className="text-xs text-blue-700 font-medium">Admin Comment:</p>
                <p className="text-xs text-blue-600">{scheme.adminComments.steps_1_4}</p>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">Chit Value</span>
            </div>
            <p className="font-bold text-blue-900">{scheme.chitValue}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-600">Subscribers</span>
            </div>
            <p className="font-bold text-green-900">
              {scheme.subscribers}/{scheme.maxSubscribers}
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-600">Duration</span>
            </div>
            <p className="font-bold text-purple-900">{scheme.duration}</p>
          </div>

          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-orange-600" />
              <span className="text-xs font-medium text-orange-600">Monthly</span>
            </div>
            <p className="font-bold text-orange-900">{scheme.monthlyPremium}</p>
          </div>
        </div>

        {/* Status Message */}
        <div className={`bg-white rounded-lg p-3 border-l-4 ${priority ? "border-l-orange-500" : "border-l-blue-500"}`}>
          <p className={`text-sm font-medium ${statusInfo.color}`}>{statusInfo.message}</p>
          {scheme.lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">Updated: {new Date(scheme.lastUpdated).toLocaleString()}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <Button
            onClick={() => onView(scheme)}
            className={`flex-1 gap-2 ${priority ? "bg-orange-600 hover:bg-orange-700" : ""}`}
          >
            {statusInfo.action}
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={() => onEdit(scheme)} className="gap-2">
            <Eye className="h-4 w-4" />
            View
          </Button>

          {scheme.psoNumber && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              PSO
            </Button>
          )}

          {(scheme.schemeStatus === "draft" || scheme.status === "draft") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(scheme.schemeId)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          {(scheme.schemeStatus === "live" || scheme.status === "live") && (
            <Button
              onClick={() => handlePublishScheme(scheme)}
              className="gap-2 bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Upload className="h-4 w-4" />
              Publish
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
