"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, FileText, RefreshCw } from "lucide-react"
import { EnhancedSchemeApprovalFlow } from "@/components/admin/enhanced-scheme-approval-flow"

export default function AdminSchemesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const stats = {
    total: schemes.length,
    pending: schemes.filter((s) => s.schemeStatus === "submitted" || s.schemeStatus === "final_agreement_uploaded")
      .length,
    live: schemes.filter((s) => s.schemeStatus === "live").length,
  }

  const loadSchemes = () => {
    try {
      // Load schemes from all possible sources
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const liveSchemes = JSON.parse(localStorage.getItem("liveSchemes") || "[]")
      const allSchemes = JSON.parse(localStorage.getItem("allSchemes") || "[]")

      console.log("Loading schemes:", { pendingSchemes, approvedSchemes, liveSchemes, allSchemes })

      // Combine all schemes and remove duplicates based on schemeId
      const combinedSchemes = [...pendingSchemes, ...approvedSchemes, ...liveSchemes, ...allSchemes]
      const uniqueSchemes = combinedSchemes.filter(
        (scheme, index, self) => index === self.findIndex((s) => s.schemeId === scheme.schemeId),
      )

      console.log("Unique schemes:", uniqueSchemes)

      // Sort by submission date (newest first)
      const sortedSchemes = uniqueSchemes.sort((a, b) => {
        const dateA = new Date(a.submittedAt || a.lastUpdated || a.createdDate || 0)
        const dateB = new Date(b.submittedAt || b.lastUpdated || b.createdDate || 0)
        return dateB.getTime() - dateA.getTime()
      })

      setSchemes(sortedSchemes)
    } catch (error) {
      console.error("Error loading schemes:", error)
      setSchemes([])
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    loadSchemes()
    setRefreshing(false)
  }

  const handleApprove = async (schemeId, comments) => {
    try {
      console.log("Approving scheme:", schemeId, "with comments:", comments)

      // Find the scheme
      const scheme = schemes.find((s) => s.schemeId === schemeId)
      if (!scheme) {
        alert("Scheme not found!")
        return
      }

      // Update scheme status to steps_1_4_approved (not directly to pso_approved)
      const updatedScheme = {
        ...scheme,
        schemeStatus: "steps_1_4_approved",
        adminComments: {
          ...scheme.adminComments,
          steps_1_4_approval: {
            comments: comments,
            approvedBy: "Admin",
            approvedAt: new Date().toISOString(),
          },
        },
        lastUpdated: new Date().toISOString(),
      }

      // Remove from pending schemes
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const filteredPending = pendingSchemes.filter((s) => s.schemeId !== schemeId)
      localStorage.setItem("pendingSchemes", JSON.stringify(filteredPending))

      // Add to approved schemes
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const filteredApproved = approvedSchemes.filter((s) => s.schemeId !== schemeId)
      filteredApproved.push(updatedScheme)
      localStorage.setItem("approvedSchemes", JSON.stringify(filteredApproved))

      // Update allSchemes
      const allSchemes = JSON.parse(localStorage.getItem("allSchemes") || "[]")
      const filteredAll = allSchemes.filter((s) => s.schemeId !== schemeId)
      filteredAll.push(updatedScheme)
      localStorage.setItem("allSchemes", JSON.stringify(filteredAll))

      // Update the scheme draft for the foreman
      localStorage.setItem("schemeDraft", JSON.stringify(updatedScheme))

      alert("Scheme approved successfully! Steps 1-4 have been approved.")
      loadSchemes()
      setSelectedScheme(null)
    } catch (error) {
      console.error("Error approving scheme:", error)
      alert("Error approving scheme. Please try again.")
    }
  }

  const handleReject = async (schemeId, reason) => {
    try {
      console.log("Rejecting scheme:", schemeId, "with reason:", reason)

      // Find the scheme
      const scheme = schemes.find((s) => s.schemeId === schemeId)
      if (!scheme) {
        alert("Scheme not found!")
        return
      }

      // Update scheme status
      const updatedScheme = {
        ...scheme,
        schemeStatus: "rejected",
        rejectionReason: reason,
        adminComments: {
          ...scheme.adminComments,
          rejection: {
            reason: reason,
            rejectedBy: "Admin",
            rejectedAt: new Date().toISOString(),
          },
        },
        lastUpdated: new Date().toISOString(),
      }

      // Update all storage locations
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const filteredPending = pendingSchemes.filter((s) => s.schemeId !== schemeId)
      filteredPending.push(updatedScheme) // Keep in pending for foreman to see rejection
      localStorage.setItem("pendingSchemes", JSON.stringify(filteredPending))

      // Update allSchemes
      const allSchemes = JSON.parse(localStorage.getItem("allSchemes") || "[]")
      const filteredAll = allSchemes.filter((s) => s.schemeId !== schemeId)
      filteredAll.push(updatedScheme)
      localStorage.setItem("allSchemes", JSON.stringify(filteredAll))

      // Update the scheme draft for the foreman
      localStorage.setItem("schemeDraft", JSON.stringify(updatedScheme))

      alert("Scheme rejected successfully! The foreman has been notified.")
      loadSchemes()
      setSelectedScheme(null)
    } catch (error) {
      console.error("Error rejecting scheme:", error)
      alert("Error rejecting scheme. Please try again.")
    }
  }

  const handleApproveFinalAgreement = async (schemeId, comments) => {
    try {
      console.log("Approving final agreement for scheme:", schemeId)

      // Find the scheme
      const scheme = schemes.find((s) => s.schemeId === schemeId)
      if (!scheme) {
        alert("Scheme not found!")
        return
      }

      // Generate Form 7 (Commencement Certificate)
      const form7Number = `FORM7-${Date.now()}-${schemeId.slice(-4)}`
      const commencementCertificate = {
        name: `Form_7_Commencement_Certificate_${schemeId}.pdf`,
        number: form7Number,
        issuedDate: new Date().toISOString(),
        url: `/certificates/form7/${form7Number}.pdf`, // Mock URL
        type: "application/pdf",
        size: 245760, // Mock size
      }

      // Update scheme status to live
      const updatedScheme = {
        ...scheme,
        schemeStatus: "live",
        commencementCertificate: commencementCertificate,
        adminComments: {
          ...scheme.adminComments,
          final_approval: {
            comments: comments,
            approvedBy: "Admin",
            approvedAt: new Date().toISOString(),
            form7Generated: true,
            form7Number: form7Number,
          },
        },
        liveDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      }

      // Remove from pending and approved schemes
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const filteredPending = pendingSchemes.filter((s) => s.schemeId !== schemeId)
      const filteredApproved = approvedSchemes.filter((s) => s.schemeId !== schemeId)
      localStorage.setItem("pendingSchemes", JSON.stringify(filteredPending))
      localStorage.setItem("approvedSchemes", JSON.stringify(filteredApproved))

      // Add to live schemes
      const liveSchemes = JSON.parse(localStorage.getItem("liveSchemes") || "[]")
      const filteredLive = liveSchemes.filter((s) => s.schemeId !== schemeId)
      filteredLive.push(updatedScheme)
      localStorage.setItem("liveSchemes", JSON.stringify(filteredLive))

      // Update allSchemes
      const allSchemes = JSON.parse(localStorage.getItem("allSchemes") || "[]")
      const filteredAll = allSchemes.filter((s) => s.schemeId !== schemeId)
      filteredAll.push(updatedScheme)
      localStorage.setItem("allSchemes", JSON.stringify(filteredAll))

      // Update the scheme draft for the foreman
      localStorage.setItem("schemeDraft", JSON.stringify(updatedScheme))

      alert(`Scheme approved and is now LIVE! Form 7 certificate generated: ${form7Number}`)
      loadSchemes()
      setSelectedScheme(null)
    } catch (error) {
      console.error("Error approving final agreement:", error)
      alert("Error approving final agreement. Please try again.")
    }
  }

  useEffect(() => {
    loadSchemes()
  }, [])

  // Filter schemes based on search and status
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      (scheme.schemeName || scheme.schemeId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (scheme.foremanName || "").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || scheme.schemeStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "steps_1_4_approved":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pso_requested":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "pso_approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "subscribers_added":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "final_agreement_uploaded":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "live":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4" />
      case "steps_1_4_approved":
      case "pso_approved":
      case "live":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const pendingCount = schemes.filter(
    (s) => s.schemeStatus === "submitted" || s.schemeStatus === "final_agreement_uploaded",
  ).length
  const approvedCount = schemes.filter(
    (s) => s.schemeStatus === "steps_1_4_approved" || s.schemeStatus === "pso_approved",
  ).length
  const liveCount = schemes.filter((s) => s.schemeStatus === "live").length
  const rejectedCount = schemes.filter((s) => s.schemeStatus === "rejected").length

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading schemes...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Scheme Management</h2>
          <p className="text-muted-foreground">Review and approve chit fund schemes</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline" className="gap-2 bg-transparent">
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Steps approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Schemes</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveCount}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Need revision</p>
          </CardContent>
        </Card>
      </div>

      <EnhancedSchemeApprovalFlow
        schemes={schemes}
        setSchemes={setSchemes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        selectedScheme={selectedScheme}
        setSelectedScheme={setSelectedScheme}
        loadSchemes={loadSchemes}
      />
    </div>
  )
}
