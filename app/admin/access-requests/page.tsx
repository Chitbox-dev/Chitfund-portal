"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Users,
  Building,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Award,
  AlertTriangle,
} from "lucide-react"

interface AccessRequest {
  id: string
  requestType: "company" | "user" | "foreman"
  companyName?: string
  contactPerson: string
  email: string
  phone: string
  purpose: string
  businessType?: string
  userType?: string
  experience?: string
  mcqAnswers?: { [key: string]: string }
  mcqScore?: number
  status: "pending" | "mcq_required" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  adminComments?: string
}

export default function AccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [adminComments, setAdminComments] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Load requests from localStorage
  useEffect(() => {
    const storedRequests = localStorage.getItem("accessRequests")
    if (storedRequests) {
      try {
        const parsed = JSON.parse(storedRequests)
        setRequests(parsed)
      } catch (error) {
        console.error("Error loading access requests:", error)
      }
    }
  }, [])

  // Save requests to localStorage
  useEffect(() => {
    localStorage.setItem("accessRequests", JSON.stringify(requests))
  }, [requests])

  const handleApproveRequest = async (requestId: string, comments: string) => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "approved",
              reviewedAt: new Date().toISOString(),
              adminComments: comments,
            }
          : req,
      ),
    )

    setIsProcessing(false)
    setAdminComments("")

    // Here you would typically send approval email to the user
    alert(`Access request approved! User will receive email with access credentials.`)
  }

  const handleRejectRequest = async (requestId: string, comments: string) => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "rejected",
              reviewedAt: new Date().toISOString(),
              adminComments: comments,
            }
          : req,
      ),
    )

    setIsProcessing(false)
    setAdminComments("")

    // Here you would typically send rejection email to the user
    alert(`Access request rejected. User will receive email notification.`)
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.companyName && request.companyName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesType = typeFilter === "all" || request.requestType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "approved":
        return "bg-green-100 text-green-800 border-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "company":
        return <Building className="h-4 w-4" />
      case "user":
        return <Users className="h-4 w-4" />
      case "foreman":
        return <UserCheck className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const openRequestDetail = (request: AccessRequest) => {
    setSelectedRequest(request)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset className="content-area">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Access Requests</h1>
                <div className="text-gray-600 mt-2">Review and manage landing page access requests</div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Total Requests</div>
                      <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Pending Review</div>
                      <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                    </div>
                    <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Approved</div>
                      <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Rejected</div>
                      <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
                    </div>
                    <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or company..."
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
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="foreman">Foreman</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Requests Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Access Requests ({filteredRequests.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredRequests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Requester Details</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>MCQ Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                {getTypeIcon(request.requestType)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{request.contactPerson}</div>
                                {request.companyName && (
                                  <div className="text-sm text-gray-500">{request.companyName}</div>
                                )}
                                <div className="text-xs text-gray-400">ID: {request.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {request.requestType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {request.email}
                              </div>
                              <div className="text-sm flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {request.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {request.mcqScore !== undefined ? (
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-blue-500" />
                                <span
                                  className={`font-medium ${
                                    request.mcqScore >= (request.requestType === "foreman" ? 80 : 70)
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {request.mcqScore}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {new Date(request.submittedAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openRequestDetail(request)}
                                className="gap-1"
                              >
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                              {request.status === "pending" && (
                                <div className="flex gap-1">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                        Approve
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Approve Access Request</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to approve access for {request.contactPerson}? They will
                                          receive login credentials via email.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <div className="my-4">
                                        <Textarea
                                          placeholder="Add approval comments (optional)"
                                          value={adminComments}
                                          onChange={(e) => setAdminComments(e.target.value)}
                                        />
                                      </div>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleApproveRequest(request.id, adminComments)}
                                          disabled={isProcessing}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          {isProcessing ? "Processing..." : "Approve"}
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-red-600 hover:text-red-700 bg-transparent"
                                      >
                                        Reject
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Reject Access Request</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to reject access for {request.contactPerson}? Please
                                          provide a reason for rejection.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <div className="my-4">
                                        <Textarea
                                          placeholder="Reason for rejection (required)"
                                          value={adminComments}
                                          onChange={(e) => setAdminComments(e.target.value)}
                                          required
                                        />
                                      </div>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleRejectRequest(request.id, adminComments)}
                                          disabled={isProcessing || !adminComments.trim()}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          {isProcessing ? "Processing..." : "Reject"}
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Access Requests Found</h3>
                    <div className="text-gray-500">
                      {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                        ? "Try adjusting your search or filter criteria."
                        : "No access requests have been submitted yet."}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Request Detail Dialog */}
            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {selectedRequest && getTypeIcon(selectedRequest.requestType)}
                    </div>
                    {selectedRequest?.contactPerson}
                    <Badge className={selectedRequest ? getStatusColor(selectedRequest.status) : ""}>
                      {selectedRequest?.status}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>Complete access request details and assessment results</DialogDescription>
                </DialogHeader>

                {selectedRequest && (
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Request Details</TabsTrigger>
                      <TabsTrigger value="assessment">Assessment</TabsTrigger>
                      <TabsTrigger value="review">Admin Review</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-600">Request ID</div>
                            <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mt-1">
                              {selectedRequest.id}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-600">Request Type</div>
                            <Badge variant="outline" className="mt-1 capitalize">
                              {selectedRequest.requestType}
                            </Badge>
                          </div>
                          {selectedRequest.companyName && (
                            <div>
                              <div className="text-sm font-medium text-gray-600">Company Name</div>
                              <div className="mt-1">{selectedRequest.companyName}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-600">Contact Person</div>
                            <div className="mt-1">{selectedRequest.contactPerson}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-600">Email</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Mail className="h-4 w-4 text-gray-400" />
                              {selectedRequest.email}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-600">Phone</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {selectedRequest.phone}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {selectedRequest.businessType && (
                            <div>
                              <div className="text-sm font-medium text-gray-600">Business Type</div>
                              <div className="mt-1">{selectedRequest.businessType}</div>
                            </div>
                          )}
                          {selectedRequest.experience && (
                            <div>
                              <div className="text-sm font-medium text-gray-600">Experience</div>
                              <div className="mt-1">{selectedRequest.experience}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-600">Submitted At</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {new Date(selectedRequest.submittedAt).toLocaleString()}
                            </div>
                          </div>
                          {selectedRequest.reviewedAt && (
                            <div>
                              <div className="text-sm font-medium text-gray-600">Reviewed At</div>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                {new Date(selectedRequest.reviewedAt).toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-600 mb-2">Purpose of Access</div>
                        <div className="bg-gray-50 p-4 rounded-lg">{selectedRequest.purpose}</div>
                      </div>
                    </TabsContent>

                    <TabsContent value="assessment" className="space-y-4">
                      {selectedRequest.mcqScore !== undefined ? (
                        <div className="space-y-4">
                          <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-6">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-blue-800 mb-2">{selectedRequest.mcqScore}%</div>
                                <div className="text-sm text-blue-600 mb-4">Assessment Score</div>
                                <Badge
                                  className={
                                    selectedRequest.mcqScore >= (selectedRequest.requestType === "foreman" ? 80 : 70)
                                      ? "bg-green-100 text-green-800 border-green-300"
                                      : "bg-red-100 text-red-800 border-red-300"
                                  }
                                >
                                  {selectedRequest.mcqScore >= (selectedRequest.requestType === "foreman" ? 80 : 70)
                                    ? "✅ Passed"
                                    : "❌ Failed"}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm font-medium text-gray-600 mb-2">Assessment Details</div>
                            <div className="text-sm text-gray-700">
                              <div>Required Score: {selectedRequest.requestType === "foreman" ? "80%" : "70%"}</div>
                              <div>Achieved Score: {selectedRequest.mcqScore}%</div>
                              <div>
                                Questions Answered:{" "}
                                {selectedRequest.mcqAnswers ? Object.keys(selectedRequest.mcqAnswers).length : 0}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Assessment Required</h3>
                          <div className="text-gray-500">
                            Company requests go directly to admin review without MCQ assessment.
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="review" className="space-y-4">
                      {selectedRequest.adminComments ? (
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-2">Admin Comments</div>
                          <div className="bg-gray-50 p-4 rounded-lg">{selectedRequest.adminComments}</div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">Pending Review</h3>
                          <div className="text-gray-500">This request is awaiting admin review and approval.</div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
