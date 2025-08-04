"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SchemeApprovalPanel } from "@/components/admin/scheme-approval-panel"
import { CheckCircle, XCircle, Clock, FileText, RefreshCw, Search, Filter, Eye } from "lucide-react"

export default function AdminSchemesPage() {
  const [schemes, setSchemes] = useState<any[]>([])
  const [filteredSchemes, setFilteredSchemes] = useState<any[]>([])
  const [selectedScheme, setSelectedScheme] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [approvalComments, setApprovalComments] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject">("approve")

  useEffect(() => {
    loadSchemes()
  }, [])

  useEffect(() => {
    filterSchemes()
  }, [schemes, searchTerm, statusFilter])

  const loadSchemes = async () => {
    setLoading(true)
    try {
      // Load schemes from all possible sources
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const liveSchemes = JSON.parse(localStorage.getItem("liveSchemes") || "[]")
      const rejectedSchemes = JSON.parse(localStorage.getItem("rejectedSchemes") || "[]")
      const allSchemes = JSON.parse(localStorage.getItem("allSchemes") || "[]")

      // Add sample schemes if none exist
      if (pendingSchemes.length === 0 && approvedSchemes.length === 0 && allSchemes.length === 0) {
        const sampleSchemes = [
          {
            schemeId: "SCH-2025-001",
            schemeName: "Gold Savings Scheme",
            foremanName: "Rajesh Kumar",
            foremanEmail: "rajesh@email.com",
            foremanCompany: "Kumar Chit Funds",
            foremanPhone: "+91 9876543210",
            chitValue: "1000000",
            numberOfSubscribers: "20",
            chitDuration: "20",
            monthlyPremium: 50000,
            commissionRate: "5",
            schemeStatus: "submitted",
            submittedAt: "2025-01-15T00:00:00.000Z",
            lastUpdated: "2025-01-15T00:00:00.000Z",
            commissionStructure: {
              name: "Commission Structure.pdf",
              size: "2.5 MB",
              uploadedAt: "2025-01-15T00:00:00.000Z",
            },
            termsOfWithdrawal: {
              name: "Terms of Withdrawal.pdf",
              size: "2.1 MB",
              uploadedAt: "2025-01-15T00:00:00.000Z",
            },
            liabilitiesDocument: {
              name: "Liabilities Document.pdf",
              size: "1.8 MB",
              uploadedAt: "2025-01-15T00:00:00.000Z",
            },
            subscriberRights: {
              name: "Subscriber Rights.pdf",
              size: "2.3 MB",
              uploadedAt: "2025-01-15T00:00:00.000Z",
            },
            fdrDocument: {
              name: "FDR Document.pdf",
              size: "1.5 MB",
              uploadedAt: "2025-01-15T00:00:00.000Z",
            },
            draftAgreement: {
              name: "Draft Agreement.pdf",
              size: "3.2 MB",
              uploadedAt: "2025-01-15T00:00:00.000Z",
            },
          },
          {
            schemeId: "SCH-2025-002",
            schemeName: "Business Growth Fund",
            foremanName: "Priya Sharma",
            foremanEmail: "priya@email.com",
            foremanCompany: "Sharma Enterprises",
            foremanPhone: "+91 9876543211",
            chitValue: "500000",
            numberOfSubscribers: "15",
            chitDuration: "15",
            monthlyPremium: 33333,
            commissionRate: "5",
            schemeStatus: "steps_1_4_approved",
            submittedAt: "2025-01-10T00:00:00.000Z",
            lastUpdated: "2025-01-16T00:00:00.000Z",
            psoNumber: "PSO-2025-001",
            psoGeneratedDate: "2025-01-16T00:00:00.000Z",
            adminComments: {
              steps_1_4_approval: {
                comments: "All documents verified and approved",
                approvedBy: "Admin",
                approvedAt: "2025-01-16T00:00:00.000Z",
              },
            },
            commissionStructure: {
              name: "Commission Structure.pdf",
              size: "2.5 MB",
              uploadedAt: "2025-01-10T00:00:00.000Z",
              reviewStatus: "approved",
            },
            termsOfWithdrawal: {
              name: "Terms of Withdrawal.pdf",
              size: "2.1 MB",
              uploadedAt: "2025-01-10T00:00:00.000Z",
              reviewStatus: "approved",
            },
            liabilitiesDocument: {
              name: "Liabilities Document.pdf",
              size: "1.8 MB",
              uploadedAt: "2025-01-10T00:00:00.000Z",
              reviewStatus: "approved",
            },
            subscriberRights: {
              name: "Subscriber Rights.pdf",
              size: "2.3 MB",
              uploadedAt: "2025-01-10T00:00:00.000Z",
              reviewStatus: "approved",
            },
            fdrDocument: {
              name: "FDR Document.pdf",
              size: "1.5 MB",
              uploadedAt: "2025-01-10T00:00:00.000Z",
              reviewStatus: "approved",
            },
            draftAgreement: {
              name: "Draft Agreement.pdf",
              size: "3.2 MB",
              uploadedAt: "2025-01-10T00:00:00.000Z",
              reviewStatus: "approved",
            },
          },
          {
            schemeId: "SCH-2025-003",
            schemeName: "Family Welfare Scheme",
            foremanName: "Amit Patel",
            foremanEmail: "amit@email.com",
            foremanCompany: "Patel Chit Funds",
            foremanPhone: "+91 9876543212",
            chitValue: "750000",
            numberOfSubscribers: "25",
            chitDuration: "18",
            monthlyPremium: 41667,
            commissionRate: "5",
            schemeStatus: "final_agreement_uploaded",
            submittedAt: "2025-01-05T00:00:00.000Z",
            lastUpdated: "2025-01-18T00:00:00.000Z",
            psoNumber: "PSO-2025-002",
            psoGeneratedDate: "2025-01-15T00:00:00.000Z",
            finalAgreement: {
              name: "Final_Agreement_SCH-2025-003.pdf",
              size: "4.1 MB",
              uploadedAt: "2025-01-18T00:00:00.000Z",
            },
            adminComments: {
              steps_1_4_approval: {
                comments: "All documents approved",
                approvedBy: "Admin",
                approvedAt: "2025-01-15T00:00:00.000Z",
              },
            },
            commissionStructure: {
              name: "Commission Structure.pdf",
              size: "2.5 MB",
              uploadedAt: "2025-01-05T00:00:00.000Z",
              reviewStatus: "approved",
            },
            termsOfWithdrawal: {
              name: "Terms of Withdrawal.pdf",
              size: "2.1 MB",
              uploadedAt: "2025-01-05T00:00:00.000Z",
              reviewStatus: "approved",
            },
            liabilitiesDocument: {
              name: "Liabilities Document.pdf",
              size: "1.8 MB",
              uploadedAt: "2025-01-05T00:00:00.000Z",
              reviewStatus: "approved",
            },
            subscriberRights: {
              name: "Subscriber Rights.pdf",
              size: "2.3 MB",
              uploadedAt: "2025-01-05T00:00:00.000Z",
              reviewStatus: "approved",
            },
            fdrDocument: {
              name: "FDR Document.pdf",
              size: "1.5 MB",
              uploadedAt: "2025-01-05T00:00:00.000Z",
              reviewStatus: "approved",
            },
            draftAgreement: {
              name: "Draft Agreement.pdf",
              size: "3.2 MB",
              uploadedAt: "2025-01-05T00:00:00.000Z",
              reviewStatus: "approved",
            },
          },
          {
            schemeId: "SCH-2025-004",
            schemeName: "Education Fund",
            foremanName: "Meera Reddy",
            foremanEmail: "meera@email.com",
            foremanCompany: "Reddy Financial Services",
            foremanPhone: "+91 9876543213",
            chitValue: "300000",
            numberOfSubscribers: "12",
            chitDuration: "12",
            monthlyPremium: 25000,
            commissionRate: "5",
            schemeStatus: "live",
            submittedAt: "2024-12-28T00:00:00.000Z",
            lastUpdated: "2025-01-20T00:00:00.000Z",
            liveDate: "2025-01-20T00:00:00.000Z",
            psoNumber: "PSO-2024-015",
            psoGeneratedDate: "2025-01-10T00:00:00.000Z",
            commencementCertificate: {
              name: "Form_7_Commencement_Certificate_SCH-2025-004.pdf",
              number: "FORM7-2025-001",
              issuedDate: "2025-01-20T00:00:00.000Z",
              url: "/certificates/form7/FORM7-2025-001.pdf",
              type: "application/pdf",
              size: 245760,
            },
            adminComments: {
              steps_1_4_approval: {
                comments: "All documents approved",
                approvedBy: "Admin",
                approvedAt: "2025-01-10T00:00:00.000Z",
              },
              final_approval: {
                comments: "Final agreement approved and Form 7 generated",
                approvedBy: "Admin",
                approvedAt: "2025-01-20T00:00:00.000Z",
                form7Generated: true,
                form7Number: "FORM7-2025-001",
              },
            },
            commissionStructure: {
              name: "Commission Structure.pdf",
              size: "2.5 MB",
              uploadedAt: "2024-12-28T00:00:00.000Z",
              reviewStatus: "approved",
            },
            termsOfWithdrawal: {
              name: "Terms of Withdrawal.pdf",
              size: "2.1 MB",
              uploadedAt: "2024-12-28T00:00:00.000Z",
              reviewStatus: "approved",
            },
            liabilitiesDocument: {
              name: "Liabilities Document.pdf",
              size: "1.8 MB",
              uploadedAt: "2024-12-28T00:00:00.000Z",
              reviewStatus: "approved",
            },
            subscriberRights: {
              name: "Subscriber Rights.pdf",
              size: "2.3 MB",
              uploadedAt: "2024-12-28T00:00:00.000Z",
              reviewStatus: "approved",
            },
            fdrDocument: {
              name: "FDR Document.pdf",
              size: "1.5 MB",
              uploadedAt: "2024-12-28T00:00:00.000Z",
              reviewStatus: "approved",
            },
            draftAgreement: {
              name: "Draft Agreement.pdf",
              size: "3.2 MB",
              uploadedAt: "2024-12-28T00:00:00.000Z",
              reviewStatus: "approved",
            },
          },
        ]

        // Store sample schemes
        localStorage.setItem("allSchemes", JSON.stringify(sampleSchemes))

        // Distribute schemes based on status
        const pending = sampleSchemes.filter((s) => s.schemeStatus === "submitted")
        const approved = sampleSchemes.filter(
          (s) => s.schemeStatus === "steps_1_4_approved" || s.schemeStatus === "final_agreement_uploaded",
        )
        const live = sampleSchemes.filter((s) => s.schemeStatus === "live")

        localStorage.setItem("pendingSchemes", JSON.stringify(pending))
        localStorage.setItem("approvedSchemes", JSON.stringify(approved))
        localStorage.setItem("liveSchemes", JSON.stringify(live))
      }

      // Combine all schemes and remove duplicates based on schemeId
      const combinedSchemes = [...pendingSchemes, ...approvedSchemes, ...liveSchemes, ...rejectedSchemes, ...allSchemes]
      const uniqueSchemes = combinedSchemes.filter(
        (scheme, index, self) => index === self.findIndex((s) => s.schemeId === scheme.schemeId),
      )

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

  const filterSchemes = () => {
    let filtered = schemes

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (scheme) =>
          (scheme.schemeName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (scheme.schemeId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (scheme.foremanName || "").toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((scheme) => scheme.schemeStatus === statusFilter)
    }

    setFilteredSchemes(filtered)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await loadSchemes()
    setRefreshing(false)
  }

  const handleApprove = async (schemeId: string, comments: string) => {
    try {
      const scheme = schemes.find((s) => s.schemeId === schemeId)
      if (!scheme) {
        alert("Scheme not found!")
        return
      }

      // Update scheme status to steps_1_4_approved
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
        psoNumber: `PSO-${Date.now()}-${schemeId.slice(-4)}`,
        psoGeneratedDate: new Date().toISOString(),
        // Mark all documents as approved
        commissionStructure: { ...scheme.commissionStructure, reviewStatus: "approved" },
        termsOfWithdrawal: { ...scheme.termsOfWithdrawal, reviewStatus: "approved" },
        liabilitiesDocument: { ...scheme.liabilitiesDocument, reviewStatus: "approved" },
        subscriberRights: { ...scheme.subscriberRights, reviewStatus: "approved" },
        fdrDocument: { ...scheme.fdrDocument, reviewStatus: "approved" },
        draftAgreement: { ...scheme.draftAgreement, reviewStatus: "approved" },
      }

      // Update schemes array
      const updatedSchemes = schemes.map((s) => (s.schemeId === schemeId ? updatedScheme : s))
      setSchemes(updatedSchemes)
      setSelectedScheme(updatedScheme)

      // Update localStorage
      const allSchemes = JSON.parse(localStorage.getItem("allSchemes") || "[]")
      const filteredAll = allSchemes.filter((s: any) => s.schemeId !== schemeId)
      filteredAll.push(updatedScheme)
      localStorage.setItem("allSchemes", JSON.stringify(filteredAll))

      // Move from pending to approved
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const filteredPending = pendingSchemes.filter((s: any) => s.schemeId !== schemeId)
      const filteredApproved = approvedSchemes.filter((s: any) => s.schemeId !== schemeId)
      filteredApproved.push(updatedScheme)
      localStorage.setItem("pendingSchemes", JSON.stringify(filteredPending))
      localStorage.setItem("approvedSchemes", JSON.stringify(filteredApproved))

      alert("Scheme approved successfully! Steps 1-4 have been approved and PSO certificate generated.")
    } catch (error) {
      console.error("Error approving scheme:", error)
      alert("Error approving scheme. Please try again.")
    }
  }

  const handleReject = async (schemeId: string, reason: string) => {
    try {
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
        // Mark all documents as rejected
        commissionStructure: { ...scheme.commissionStructure, reviewStatus: "rejected" },
        termsOfWithdrawal: { ...scheme.termsOfWithdrawal, reviewStatus: "rejected" },
        liabilitiesDocument: { ...scheme.liabilitiesDocument, reviewStatus: "rejected" },
        subscriberRights: { ...scheme.subscriberRights, reviewStatus: "rejected" },
        fdrDocument: { ...scheme.fdrDocument, reviewStatus: "rejected" },
        draftAgreement: { ...scheme.draftAgreement, reviewStatus: "rejected" },
      }

      // Update schemes array
      const updatedSchemes = schemes.map((s) => (s.schemeId === schemeId ? updatedScheme : s))
      setSchemes(updatedSchemes)
      setSelectedScheme(updatedScheme)

      // Update localStorage
      const allSchemes = JSON.parse(localStorage.getItem("allSchemes") || "[]")
      const filteredAll = allSchemes.filter((s: any) => s.schemeId !== schemeId)
      filteredAll.push(updatedScheme)
      localStorage.setItem("allSchemes", JSON.stringify(filteredAll))

      alert("Scheme rejected successfully! The foreman has been notified.")
    } catch (error) {
      console.error("Error rejecting scheme:", error)
      alert("Error rejecting scheme. Please try again.")
    }
  }

  const handleApproveFinalAgreement = async (schemeId: string, comments: string) => {
    try {
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
        url: `/certificates/form7/${form7Number}.pdf`,
        type: "application/pdf",
        size: 245760,
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

      // Update schemes array
      const updatedSchemes = schemes.map((s) => (s.schemeId === schemeId ? updatedScheme : s))
      setSchemes(updatedSchemes)
      setSelectedScheme(updatedScheme)

      // Update localStorage
      const allSchemes = JSON.parse(localStorage.getItem("allSchemes") || "[]")
      const liveSchemes = JSON.parse(localStorage.getItem("liveSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")

      const filteredAll = allSchemes.filter((s: any) => s.schemeId !== schemeId)
      const filteredLive = liveSchemes.filter((s: any) => s.schemeId !== schemeId)
      const filteredApproved = approvedSchemes.filter((s: any) => s.schemeId !== schemeId)

      filteredAll.push(updatedScheme)
      filteredLive.push(updatedScheme)

      localStorage.setItem("allSchemes", JSON.stringify(filteredAll))
      localStorage.setItem("liveSchemes", JSON.stringify(filteredLive))
      localStorage.setItem("approvedSchemes", JSON.stringify(filteredApproved))

      alert(`Scheme approved and is now LIVE! Form 7 certificate generated: ${form7Number}`)
    } catch (error) {
      console.error("Error approving final agreement:", error)
      alert("Error approving final agreement. Please try again.")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "steps_1_4_approved":
        return "bg-blue-100 text-blue-800 border-blue-200"
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

  const getStatusIcon = (status: string) => {
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

  const getSchemeStats = () => {
    const pending = schemes.filter(
      (s) => s.schemeStatus === "submitted" || s.schemeStatus === "final_agreement_uploaded",
    ).length
    const approved = schemes.filter(
      (s) => s.schemeStatus === "steps_1_4_approved" || s.schemeStatus === "pso_approved",
    ).length
    const live = schemes.filter((s) => s.schemeStatus === "live").length
    const rejected = schemes.filter((s) => s.schemeStatus === "rejected").length

    return { pending, approved, live, rejected, total: schemes.length }
  }

  const stats = getSchemeStats()

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
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Steps approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Schemes</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.live}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">Need revision</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by scheme name, foreman, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="steps_1_4_approved">Approved</SelectItem>
            <SelectItem value="final_agreement_uploaded">Final Agreement</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Schemes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scheme Approval Pipeline ({filteredSchemes.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scheme Details</TableHead>
                <TableHead>Foreman</TableHead>
                <TableHead>Value & Subscribers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchemes.map((scheme) => (
                <TableRow key={scheme.schemeId}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{scheme.schemeName}</div>
                      <div className="text-sm text-gray-500">{scheme.schemeId}</div>
                      {scheme.psoNumber && <div className="text-xs text-green-600">PSO: {scheme.psoNumber}</div>}
                      {scheme.commencementCertificate && (
                        <div className="text-xs text-blue-600">Form 7: {scheme.commencementCertificate.number}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{scheme.foremanName}</div>
                      <div className="text-sm text-gray-500">{scheme.foremanEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">₹{Number.parseFloat(scheme.chitValue).toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{scheme.numberOfSubscribers} subscribers</div>
                      <div className="text-xs text-gray-400">{scheme.chitDuration} months</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(scheme.schemeStatus)}>
                      {getStatusIcon(scheme.schemeStatus)}
                      <span className="ml-1">{scheme.schemeStatus.replace(/_/g, " ").toUpperCase()}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(scheme.submittedAt).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedScheme(scheme)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Review
                      </Button>

                      {scheme.schemeStatus === "submitted" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedScheme(scheme)
                            setApprovalAction("approve")
                            setShowApprovalDialog(true)
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                      )}

                      {scheme.schemeStatus === "final_agreement_uploaded" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedScheme(scheme)
                            setApprovalAction("approve")
                            setShowApprovalDialog(true)
                          }}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Final Approval
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Scheme Details Dialog */}
      {selectedScheme && !showApprovalDialog && (
        <Dialog open={!!selectedScheme} onOpenChange={() => setSelectedScheme(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Scheme Review - {selectedScheme.schemeName}</DialogTitle>
            </DialogHeader>
            <SchemeApprovalPanel
              scheme={selectedScheme}
              onApprove={handleApprove}
              onReject={handleReject}
              onApproveFinalAgreement={handleApproveFinalAgreement}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Approval Dialog */}
      {showApprovalDialog && selectedScheme && (
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{approvalAction === "approve" ? "Approve Scheme" : "Reject Scheme"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="approval-comments">
                  {approvalAction === "approve" ? "Approval Comments" : "Rejection Reason"}
                </Label>
                <Textarea
                  id="approval-comments"
                  value={approvalAction === "approve" ? approvalComments : rejectionReason}
                  onChange={(e) => {
                    if (approvalAction === "approve") {
                      setApprovalComments(e.target.value)
                    } else {
                      setRejectionReason(e.target.value)
                    }
                  }}
                  placeholder={
                    approvalAction === "approve" ? "Enter approval comments..." : "Enter reason for rejection..."
                  }
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (approvalAction === "approve") {
                      if (selectedScheme.schemeStatus === "submitted") {
                        handleApprove(selectedScheme.schemeId, approvalComments)
                      } else if (selectedScheme.schemeStatus === "final_agreement_uploaded") {
                        handleApproveFinalAgreement(selectedScheme.schemeId, approvalComments)
                      }
                    } else {
                      handleReject(selectedScheme.schemeId, rejectionReason)
                    }
                    setShowApprovalDialog(false)
                    setApprovalComments("")
                    setRejectionReason("")
                  }}
                  className={
                    approvalAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }
                >
                  {approvalAction === "approve" ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Scheme
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Scheme
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
