"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Eye, Search, Filter, User, Building, Users, Shield } from "lucide-react"

interface AccessRequest {
  id: string
  email: string
  userType: string
  companyName?: string
  reason: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  comments?: string
}

export default function AccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<AccessRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">("approve")
  const [reviewComments, setReviewComments] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    // Load requests from localStorage
    const loadRequests = () => {
      const existingRequests = JSON.parse(localStorage.getItem("accessRequests") || "[]")
      setRequests(existingRequests)
      setFilteredRequests(existingRequests)
    }

    loadRequests()

    // Set up interval to refresh requests
    const interval = setInterval(loadRequests, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Filter requests based on search and status
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.userType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (request.companyName && request.companyName.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter)
    }

    setFilteredRequests(filtered)
  }, [requests, searchTerm, statusFilter])

  const handleReviewRequest = (request: AccessRequest, action: "approve" | "reject") => {
    setSelectedRequest(request)
    setReviewAction(action)
    setReviewComments("")
    setShowReviewDialog(true)
  }

  const submitReview = () => {
    if (!selectedRequest) return

    const updatedRequest: AccessRequest = {
      ...selectedRequest,
      status: reviewAction,
      reviewedAt: new Date().toISOString(),
      reviewedBy: "admin@chitfundportal.com",
      comments: reviewComments || undefined,
    }

    // Update requests in localStorage
    const existingRequests = JSON.parse(localStorage.getItem("accessRequests") || "[]")
    const updatedRequests = existingRequests.map((req: AccessRequest) =>
      req.id === selectedRequest.id ? updatedRequest : req,
    )
    localStorage.setItem("accessRequests", JSON.stringify(updatedRequests))

    // If approved, set portal access for the user
    if (reviewAction === "approved") {
      // This would typically be handled by the backend
      // For demo purposes, we'll just update the request status
      console.log(`Access approved for ${selectedRequest.email}`)
    }

    setRequests(updatedRequests)
    setShowReviewDialog(false)
    setSelectedRequest(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case "foreman":
        return <User className="h-4 w-4" />
      case "company":
        return <Building className="h-4 w-4" />
      case "subscriber":
        return <Users className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const pendingCount = requests.filter((req) => req.status === "pending").length
  const approvedCount = requests.filter((req) => req.status === "approved").length
  const rejectedCount = requests.filter((req) => req.status === "rejected").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Access Requests</h1>
        <p className="text-gray-600">Review and manage user access requests to the portal</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
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
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by email, user type, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Access Requests</CardTitle>
          <CardDescription>Review and approve or reject user access requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No access requests found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{request.email}</div>
                          <div className="text-sm text-gray-500">{request.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getUserTypeIcon(request.userType)}
                        <span className="capitalize">{request.userType}</span>
                      </div>
                    </TableCell>
                    <TableCell>{request.companyName || "-"}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(request.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request)
                            // Show request details (you can implement a view dialog)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {request.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReviewRequest(request, "approve")}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReviewRequest(request, "reject")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {reviewAction === "approve" ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              {reviewAction === "approve" ? "Approve" : "Reject"} Access Request
            </DialogTitle>
            <DialogDescription>
              {reviewAction === "approve"
                ? "Grant access to the portal for this user"
                : "Deny access to the portal for this user"}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div>
                  <strong>Email:</strong> {selectedRequest.email}
                </div>
                <div>
                  <strong>User Type:</strong> {selectedRequest.userType}
                </div>
                {selectedRequest.companyName && (
                  <div>
                    <strong>Company:</strong> {selectedRequest.companyName}
                  </div>
                )}
                <div>
                  <strong>Reason:</strong> {selectedRequest.reason}
                </div>
              </div>

              <div>
                <Label htmlFor="comments">
                  {reviewAction === "approve" ? "Approval Notes (Optional)" : "Rejection Reason"}
                </Label>
                <Textarea
                  id="comments"
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  placeholder={
                    reviewAction === "approve"
                      ? "Add any notes for the approval..."
                      : "Please provide a reason for rejection..."
                  }
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={submitReview}
              className={reviewAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {reviewAction === "approve" ? "Approve Request" : "Reject Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
