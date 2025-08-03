"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, CheckCircle, XCircle, Clock, Eye, AlertCircle, RefreshCw, Search, Filter } from "lucide-react"

interface SchemeApprovalFlow {
  id: string
  schemeId: string
  schemeName: string
  foremanName: string
  foremanEmail: string
  submittedDate: string
  currentStage:
    | "document_review"
    | "steps_1_4_review"
    | "pso_generation"
    | "final_agreement_review"
    | "form_7_generation"
    | "completed"
  status: "pending" | "approved" | "rejected" | "live"
  documents: {
    step1: { status: "pending" | "approved" | "rejected"; comments?: string }
    step2: { status: "pending" | "approved" | "rejected"; comments?: string }
    step3: { status: "pending" | "approved" | "rejected"; comments?: string }
    step4: { status: "pending" | "approved" | "rejected"; comments?: string }
    finalAgreement?: { status: "pending" | "approved" | "rejected"; comments?: string }
  }
  psoNumber?: string
  form7Number?: string
  totalValue: number
  subscribers: number
  duration: number
}

export function EnhancedSchemeApprovalFlow() {
  const [schemes, setSchemes] = useState<SchemeApprovalFlow[]>([])
  const [selectedScheme, setSelectedScheme] = useState<SchemeApprovalFlow | null>(null)
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [approvalComments, setApprovalComments] = useState("")
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject">("approve")

  useEffect(() => {
    loadSchemes()
  }, [])

  const loadSchemes = () => {
    // Sample data representing different stages of approval
    const sampleSchemes: SchemeApprovalFlow[] = [
      {
        id: "1",
        schemeId: "SCH-2025-001",
        schemeName: "Gold Savings Scheme",
        foremanName: "Rajesh Kumar",
        foremanEmail: "rajesh@email.com",
        submittedDate: "2025-01-15",
        currentStage: "document_review",
        status: "pending",
        documents: {
          step1: { status: "pending" },
          step2: { status: "pending" },
          step3: { status: "pending" },
          step4: { status: "pending" },
        },
        totalValue: 1000000,
        subscribers: 20,
        duration: 20,
      },
      {
        id: "2",
        schemeId: "SCH-2025-002",
        schemeName: "Business Growth Fund",
        foremanName: "Priya Sharma",
        foremanEmail: "priya@email.com",
        submittedDate: "2025-01-10",
        currentStage: "pso_generation",
        status: "approved",
        documents: {
          step1: { status: "approved", comments: "All documents verified" },
          step2: { status: "approved", comments: "Financial details approved" },
          step3: { status: "approved", comments: "Legal compliance confirmed" },
          step4: { status: "approved", comments: "Foreman credentials verified" },
        },
        psoNumber: "PSO-2025-001",
        totalValue: 500000,
        subscribers: 15,
        duration: 15,
      },
      {
        id: "3",
        schemeId: "SCH-2025-003",
        schemeName: "Family Welfare Scheme",
        foremanName: "Amit Patel",
        foremanEmail: "amit@email.com",
        submittedDate: "2025-01-05",
        currentStage: "final_agreement_review",
        status: "approved",
        documents: {
          step1: { status: "approved", comments: "Approved" },
          step2: { status: "approved", comments: "Approved" },
          step3: { status: "approved", comments: "Approved" },
          step4: { status: "approved", comments: "Approved" },
          finalAgreement: { status: "pending" },
        },
        psoNumber: "PSO-2025-002",
        totalValue: 750000,
        subscribers: 25,
        duration: 18,
      },
      {
        id: "4",
        schemeId: "SCH-2025-004",
        schemeName: "Education Fund",
        foremanName: "Meera Reddy",
        foremanEmail: "meera@email.com",
        submittedDate: "2024-12-28",
        currentStage: "completed",
        status: "live",
        documents: {
          step1: { status: "approved", comments: "Approved" },
          step2: { status: "approved", comments: "Approved" },
          step3: { status: "approved", comments: "Approved" },
          step4: { status: "approved", comments: "Approved" },
          finalAgreement: { status: "approved", comments: "Final agreement approved" },
        },
        psoNumber: "PSO-2024-015",
        form7Number: "FORM7-2025-001",
        totalValue: 300000,
        subscribers: 12,
        duration: 12,
      },
    ]

    setSchemes(sampleSchemes)
  }

  const handleStageApproval = (schemeId: string, stage: string, action: "approve" | "reject", comments: string) => {
    setSchemes((prev) =>
      prev.map((scheme) => {
        if (scheme.id === schemeId) {
          const updatedScheme = { ...scheme }

          if (stage === "steps_1_4") {
            // Approve all steps 1-4
            updatedScheme.documents.step1.status = action === "approve" ? "approved" : "rejected"
            updatedScheme.documents.step2.status = action === "approve" ? "approved" : "rejected"
            updatedScheme.documents.step3.status = action === "approve" ? "approved" : "rejected"
            updatedScheme.documents.step4.status = action === "approve" ? "approved" : "rejected"

            if (action === "approve") {
              updatedScheme.currentStage = "pso_generation"
              updatedScheme.psoNumber = `PSO-${Date.now()}`
              updatedScheme.status = "approved"
            } else {
              updatedScheme.status = "rejected"
            }
          } else if (stage === "final_agreement") {
            if (updatedScheme.documents.finalAgreement) {
              updatedScheme.documents.finalAgreement.status = action === "approve" ? "approved" : "rejected"
              updatedScheme.documents.finalAgreement.comments = comments
            }

            if (action === "approve") {
              updatedScheme.currentStage = "completed"
              updatedScheme.status = "live"
              updatedScheme.form7Number = `FORM7-${Date.now()}`
            } else {
              updatedScheme.status = "rejected"
            }
          }

          return updatedScheme
        }
        return scheme
      }),
    )

    setIsApprovalDialogOpen(false)
    setApprovalComments("")
    alert(`Scheme ${action === "approve" ? "approved" : "rejected"} successfully!`)
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "document_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "steps_1_4_review":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "pso_generation":
        return "bg-green-100 text-green-800 border-green-300"
      case "final_agreement_review":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "form_7_generation":
        return "bg-indigo-100 text-indigo-800 border-indigo-300"
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "live":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.foremanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.schemeId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || scheme.status === statusFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && scheme.status === "pending") ||
      (activeTab === "approved" && scheme.status === "approved") ||
      (activeTab === "live" && scheme.status === "live") ||
      (activeTab === "rejected" && scheme.status === "rejected")

    return matchesSearch && matchesStatus && matchesTab
  })

  const stats = {
    total: schemes.length,
    pending: schemes.filter((s) => s.status === "pending").length,
    approved: schemes.filter((s) => s.status === "approved").length,
    live: schemes.filter((s) => s.status === "live").length,
    rejected: schemes.filter((s) => s.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Enhanced Scheme Approval Flow</h2>
          <p className="text-gray-600">Comprehensive multi-stage approval process for chit fund schemes</p>
        </div>
        <Button variant="outline" onClick={loadSchemes}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Schemes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Live Schemes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.live}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
          <TabsTrigger value="live">Live ({stats.live})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
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
                    <TableHead>Current Stage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSchemes.map((scheme) => (
                    <TableRow key={scheme.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{scheme.schemeName}</div>
                          <div className="text-sm text-gray-500">{scheme.schemeId}</div>
                          {scheme.psoNumber && <div className="text-xs text-green-600">PSO: {scheme.psoNumber}</div>}
                          {scheme.form7Number && (
                            <div className="text-xs text-blue-600">Form 7: {scheme.form7Number}</div>
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
                          <div className="font-medium">₹{scheme.totalValue.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{scheme.subscribers} subscribers</div>
                          <div className="text-xs text-gray-400">{scheme.duration} months</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStageColor(scheme.currentStage)}>
                          {scheme.currentStage.replace(/_/g, " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStageColor(scheme.status)}>
                          {getStatusIcon(scheme.status)}
                          <span className="ml-1">{scheme.status.toUpperCase()}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{new Date(scheme.submittedDate).toLocaleDateString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedScheme(scheme)}>
                            <Eye className="h-3 w-3 mr-1" />
                            Review
                          </Button>

                          {scheme.currentStage === "document_review" && scheme.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedScheme(scheme)
                                setApprovalAction("approve")
                                setIsApprovalDialogOpen(true)
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve Steps 1-4
                            </Button>
                          )}

                          {scheme.currentStage === "final_agreement_review" &&
                            scheme.documents.finalAgreement?.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedScheme(scheme)
                                  setApprovalAction("approve")
                                  setIsApprovalDialogOpen(true)
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
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{approvalAction === "approve" ? "Approve Scheme" : "Reject Scheme"}</DialogTitle>
            <DialogDescription>
              {selectedScheme && `${selectedScheme.schemeName} (${selectedScheme.schemeId})`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="approval-comments">
                {approvalAction === "approve" ? "Approval Comments" : "Rejection Reason"}
              </Label>
              <Textarea
                id="approval-comments"
                value={approvalComments}
                onChange={(e) => setApprovalComments(e.target.value)}
                placeholder={
                  approvalAction === "approve" ? "Enter approval comments..." : "Enter reason for rejection..."
                }
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedScheme) {
                    const stage = selectedScheme.currentStage === "document_review" ? "steps_1_4" : "final_agreement"
                    handleStageApproval(selectedScheme.id, stage, approvalAction, approvalComments)
                  }
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

      {/* Scheme Details Dialog */}
      {selectedScheme && !isApprovalDialogOpen && (
        <Dialog open={!!selectedScheme} onOpenChange={() => setSelectedScheme(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Scheme Review - {selectedScheme.schemeName}</DialogTitle>
              <DialogDescription>
                {selectedScheme.schemeId} | Current Stage: {selectedScheme.currentStage.replace(/_/g, " ")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Scheme Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedScheme.schemeName}
                    </p>
                    <p>
                      <strong>ID:</strong> {selectedScheme.schemeId}
                    </p>
                    <p>
                      <strong>Total Value:</strong> ₹{selectedScheme.totalValue.toLocaleString()}
                    </p>
                    <p>
                      <strong>Subscribers:</strong> {selectedScheme.subscribers}
                    </p>
                    <p>
                      <strong>Duration:</strong> {selectedScheme.duration} months
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Foreman Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedScheme.foremanName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedScheme.foremanEmail}
                    </p>
                    <p>
                      <strong>Submitted:</strong> {new Date(selectedScheme.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Document Review Status</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Step 1 Documents:</span>
                      <Badge className={getStageColor(selectedScheme.documents.step1.status)}>
                        {selectedScheme.documents.step1.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Step 2 Documents:</span>
                      <Badge className={getStageColor(selectedScheme.documents.step2.status)}>
                        {selectedScheme.documents.step2.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Step 3 Documents:</span>
                      <Badge className={getStageColor(selectedScheme.documents.step3.status)}>
                        {selectedScheme.documents.step3.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Step 4 Documents:</span>
                      <Badge className={getStageColor(selectedScheme.documents.step4.status)}>
                        {selectedScheme.documents.step4.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {selectedScheme.documents.finalAgreement && (
                <div>
                  <h4 className="font-semibold mb-2">Final Agreement Status</h4>
                  <div className="flex justify-between items-center">
                    <span>Final Agreement:</span>
                    <Badge className={getStageColor(selectedScheme.documents.finalAgreement.status)}>
                      {selectedScheme.documents.finalAgreement.status}
                    </Badge>
                  </div>
                </div>
              )}

              {selectedScheme.psoNumber && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">PSO Certificate Generated</h4>
                  <p className="text-green-700">PSO Number: {selectedScheme.psoNumber}</p>
                </div>
              )}

              {selectedScheme.form7Number && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Form 7 Certificate Generated</h4>
                  <p className="text-blue-700">Form 7 Number: {selectedScheme.form7Number}</p>
                  <p className="text-blue-600 text-sm">Scheme is now LIVE and operational</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
