"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  FileText,
  Users,
  Calendar,
  IndianRupee,
  Eye,
  Edit,
  Trash2,
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  Activity,
} from "lucide-react"
import Link from "next/link"

const mockSchemes = [
  {
    id: 1,
    schemeId: "SCH-1736859597000",
    schemeName: "Gold Savings 50K",
    schemeAmount: 1000000,
    schemeDuration: 20,
    currentSubscribers: 20,
    maxSubscribers: 20,
    monthlyEMI: 50000,
    schemeStatus: "live",
    psoNumber: "PSO-2025-001",
    startDate: "2025-01-01",
    nextAuction: "2025-02-15",
    commissionRate: 5,
    collectedAmount: 850000,
    pendingAmount: 150000,
    completedMonths: 17,
    createdDate: "2024-12-15",
    lastUpdated: "2025-01-14T10:30:00Z",
  },
  {
    id: 2,
    schemeId: "SCH-1736859598000",
    schemeName: "Business Growth 100K",
    schemeAmount: 3000000,
    schemeDuration: 30,
    currentSubscribers: 25,
    maxSubscribers: 30,
    monthlyEMI: 100000,
    schemeStatus: "pso_approved",
    psoNumber: "PSO-2025-002",
    startDate: "2025-02-01",
    commissionRate: 4.5,
    collectedAmount: 0,
    pendingAmount: 3000000,
    completedMonths: 0,
    createdDate: "2025-01-10",
    lastUpdated: "2025-01-14T09:15:00Z",
  },
  {
    id: 3,
    schemeId: "SCH-1736859599000",
    schemeName: "Dream Home 200K",
    schemeAmount: 8000000,
    schemeDuration: 40,
    currentSubscribers: 0,
    maxSubscribers: 40,
    monthlyEMI: 200000,
    schemeStatus: "steps_1_4_approved",
    commissionRate: 5,
    collectedAmount: 0,
    pendingAmount: 8000000,
    completedMonths: 0,
    createdDate: "2025-01-05",
    lastUpdated: "2025-01-14T11:45:00Z",
    adminComments: {
      steps_1_4: "Steps 1-4 approved by admin. You can now request PSO.",
    },
  },
  // Adding some closed schemes for demonstration
  {
    id: 4,
    schemeId: "SCH-1736859600000",
    schemeName: "Completed Savings Scheme",
    schemeAmount: 500000,
    schemeDuration: 12,
    currentSubscribers: 10,
    maxSubscribers: 10,
    monthlyEMI: 50000,
    schemeStatus: "completed",
    psoNumber: "PSO-2024-015",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    commissionRate: 4,
    collectedAmount: 500000,
    pendingAmount: 0,
    completedMonths: 12,
    createdDate: "2023-12-15",
    lastUpdated: "2024-12-31T23:59:59Z",
  },
  {
    id: 5,
    schemeId: "SCH-1736859601000",
    schemeName: "Terminated Emergency Fund",
    schemeAmount: 200000,
    schemeDuration: 8,
    currentSubscribers: 5,
    maxSubscribers: 8,
    monthlyEMI: 25000,
    schemeStatus: "terminated",
    psoNumber: "PSO-2024-020",
    startDate: "2024-06-01",
    endDate: "2024-10-15",
    commissionRate: 3,
    collectedAmount: 125000,
    pendingAmount: 75000,
    completedMonths: 4,
    terminationReason: "Insufficient participation",
    createdDate: "2024-05-20",
    lastUpdated: "2024-10-15T15:30:00Z",
  },
]

export default function ForemanSchemes() {
  const [schemes, setSchemes] = useState([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Load schemes from localStorage
    const storedSchemes = localStorage.getItem("foremanSchemes")
    if (storedSchemes) {
      try {
        const parsedSchemes = JSON.parse(storedSchemes)
        setSchemes(parsedSchemes)
      } catch (error) {
        console.error("Error parsing schemes:", error)
      }
    }

    // Also check for draft scheme
    const draftScheme = localStorage.getItem("schemeDraft")
    if (draftScheme) {
      try {
        const parsedDraft = JSON.parse(draftScheme)
        // Add draft to schemes if not already present
        setSchemes((prevSchemes) => {
          const existingIndex = prevSchemes.findIndex((s) => s.schemeId === parsedDraft.schemeId)
          if (existingIndex >= 0) {
            // Update existing scheme
            const updatedSchemes = [...prevSchemes]
            updatedSchemes[existingIndex] = parsedDraft
            return updatedSchemes
          } else {
            // Add new scheme
            return [...prevSchemes, parsedDraft]
          }
        })
      } catch (error) {
        console.error("Error parsing draft scheme:", error)
      }
    }
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "submitted":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "pso_approved":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "final_agreement_uploaded":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "live":
        return "bg-green-100 text-green-800 border-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300"
      case "closed":
        return "bg-slate-100 text-slate-800 border-slate-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "draft":
        return <Edit className="h-4 w-4" />
      case "submitted":
        return <Clock className="h-4 w-4" />
      case "pso_approved":
        return <CheckCircle className="h-4 w-4" />
      case "final_agreement_uploaded":
        return <Upload className="h-4 w-4" />
      case "live":
        return <Activity className="h-4 w-4" />
      case "rejected":
        return <AlertTriangle className="h-4 w-4" />
      case "closed":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filterSchemes = (status) => {
    if (status === "all") return schemes
    if (status === "active")
      return schemes.filter((s) => ["live", "pso_approved", "final_agreement_uploaded"].includes(s.schemeStatus))
    if (status === "pending") return schemes.filter((s) => ["draft", "submitted"].includes(s.schemeStatus))
    if (status === "closed") return schemes.filter((s) => s.schemeStatus === "closed")
    return schemes.filter((s) => s.schemeStatus === status)
  }

  const filteredSchemes = filterSchemes(activeTab)

  const getActionRequiredSchemes = () => {
    return schemes.filter((scheme) => {
      return (
        scheme.schemeStatus === "pso_approved" ||
        scheme.schemeStatus === "rejected" ||
        (scheme.schemeStatus === "draft" && scheme.lastUpdated)
      )
    })
  }

  const actionRequiredSchemes = getActionRequiredSchemes()

  const handleDeleteScheme = (schemeId) => {
    if (confirm("Are you sure you want to delete this scheme?")) {
      const updatedSchemes = schemes.filter((s) => s.schemeId !== schemeId)
      setSchemes(updatedSchemes)
      localStorage.setItem("foremanSchemes", JSON.stringify(updatedSchemes))

      // Also remove from draft if it's the same scheme
      const draftScheme = localStorage.getItem("schemeDraft")
      if (draftScheme) {
        const parsedDraft = JSON.parse(draftScheme)
        if (parsedDraft.schemeId === schemeId) {
          localStorage.removeItem("schemeDraft")
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Schemes</h1>
              <p className="text-sm text-gray-500">Manage your chit fund schemes</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Total: {schemes.length}
              </Badge>
              <Link href="/foreman/create-scheme">
                <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                  <Plus className="h-4 w-4" />
                  Create New Scheme
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Required Section */}
        {actionRequiredSchemes.length > 0 && (
          <div className="mb-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="h-5 w-5" />
                  Action Required ({actionRequiredSchemes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {actionRequiredSchemes.map((scheme) => (
                    <div
                      key={scheme.schemeId}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(scheme.schemeStatus)}
                          <span className="font-medium">{scheme.schemeName || `Scheme ${scheme.schemeId}`}</span>
                        </div>
                        <Badge className={getStatusColor(scheme.schemeStatus)}>
                          {scheme.schemeStatus?.replace(/_/g, " ").toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {scheme.schemeStatus === "pso_approved" && (
                          <span className="text-sm text-green-700 font-medium">Upload Final Agreement</span>
                        )}
                        {scheme.schemeStatus === "rejected" && (
                          <span className="text-sm text-red-700 font-medium">Review & Resubmit</span>
                        )}
                        {scheme.schemeStatus === "draft" && (
                          <span className="text-sm text-blue-700 font-medium">Complete & Submit</span>
                        )}
                        <Link href={`/foreman/schemes/${scheme.schemeId}`}>
                          <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Schemes Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All ({schemes.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Active ({filterSchemes("active").length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({filterSchemes("pending").length})
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Live ({filterSchemes("live").length})
            </TabsTrigger>
            <TabsTrigger value="closed" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Closed ({filterSchemes("closed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {filteredSchemes.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredSchemes.map((scheme) => (
                  <Card key={scheme.schemeId} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-slate-800 mb-2">
                            {scheme.schemeName || `Scheme ${scheme.schemeId}`}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={getStatusColor(scheme.schemeStatus)} variant="secondary">
                              {getStatusIcon(scheme.schemeStatus)}
                              <span className="ml-1">{scheme.schemeStatus?.replace(/_/g, " ").toUpperCase()}</span>
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {scheme.schemeId}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-gray-500">Amount</p>
                            <p className="font-semibold">₹{scheme.schemeAmount?.toLocaleString() || "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-gray-500">Duration</p>
                            <p className="font-semibold">{scheme.schemeDuration || "N/A"} months</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <div>
                            <p className="text-gray-500">Subscribers</p>
                            <p className="font-semibold">
                              {scheme.currentSubscribers || 0}/{scheme.maxSubscribers || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-orange-600" />
                          <div>
                            <p className="text-gray-500">Progress</p>
                            <p className="font-semibold">
                              {Math.round(((scheme.currentSubscribers || 0) / (scheme.maxSubscribers || 1)) * 100)}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Subscription Progress</span>
                          <span className="font-medium">
                            {scheme.currentSubscribers || 0}/{scheme.maxSubscribers || "N/A"}
                          </span>
                        </div>
                        <Progress
                          value={((scheme.currentSubscribers || 0) / (scheme.maxSubscribers || 1)) * 100}
                          className="h-2"
                        />
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">EMI</p>
                          <p className="font-semibold text-sm">₹{scheme.monthlyEMI?.toLocaleString() || "N/A"}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Commission</p>
                          <p className="font-semibold text-sm">{scheme.commissionRate || "N/A"}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Created</p>
                          <p className="font-semibold text-sm">
                            {scheme.createdDate ? new Date(scheme.createdDate).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Link href={`/foreman/schemes/${scheme.schemeId}`}>
                            <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                          </Link>
                          {scheme.schemeStatus === "draft" && (
                            <Link href={`/foreman/schemes/${scheme.schemeId}/edit`}>
                              <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                            </Link>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {scheme.schemeStatus === "live" && (
                            <Link href={`/foreman/schemes/${scheme.schemeId}/manage`}>
                              <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                                <Activity className="h-3 w-3" />
                                Manage
                              </Button>
                            </Link>
                          )}
                          {scheme.schemeStatus === "pso_approved" && (
                            <Link href={`/foreman/schemes/${scheme.schemeId}/publish`}>
                              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                                <Upload className="h-3 w-3" />
                                Publish
                              </Button>
                            </Link>
                          )}
                          {(scheme.schemeStatus === "draft" || scheme.schemeStatus === "rejected") && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteScheme(scheme.schemeId)}
                              className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {activeTab === "all"
                    ? "No Schemes Found"
                    : `No ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Schemes`}
                </h3>
                <p className="text-gray-500 mb-6">
                  {activeTab === "all"
                    ? "Create your first chit fund scheme to get started."
                    : `You don't have any ${activeTab} schemes at the moment.`}
                </p>
                {activeTab === "all" && (
                  <Link href="/foreman/create-scheme">
                    <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                      <Plus className="h-4 w-4" />
                      Create Your First Scheme
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
