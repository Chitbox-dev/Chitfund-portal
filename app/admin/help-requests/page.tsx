"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import {
  MessageSquare,
  Clock,
  CheckCircle,
  Star,
  RefreshCw,
  AlertCircle,
  Search,
  Send,
  MessageCircle,
  User,
  UserCheck,
  Eye,
  Reply,
} from "lucide-react"

export default function AdminHelpRequestsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showResponseDialog, setShowResponseDialog] = useState(false)
  const [responseData, setResponseData] = useState({
    message: "",
    remarks: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Load requests on component mount
  useEffect(() => {
    loadRequests()
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadRequests, 30000)
    return () => clearInterval(interval)
  }, [])

  // Filter requests based on search, status, and source
  useEffect(() => {
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (request.userName && request.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (request.foremanName && request.foremanName.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter)
    }

    if (sourceFilter !== "all") {
      filtered = filtered.filter((request) => request.source === sourceFilter)
    }

    setFilteredRequests(filtered)
  }, [searchTerm, statusFilter, sourceFilter, requests])

  const loadRequests = () => {
    try {
      const adminRequests = JSON.parse(localStorage.getItem("adminHelpRequests") || "[]")
      setRequests(adminRequests.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)))
    } catch (error) {
      console.error("Error loading requests:", error)
      setRequests([])
    }
  }

  const handleRefreshRequests = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    loadRequests()
    setRefreshing(false)
  }

  const handleRespondToRequest = (request) => {
    setSelectedRequest(request)
    setResponseData({ message: "", remarks: "" })
    setShowResponseDialog(true)
  }

  const handleSubmitResponse = async () => {
    if (!responseData.message.trim()) {
      alert("Please provide a response message")
      return
    }

    setIsSubmitting(true)

    try {
      const response = {
        message: responseData.message,
        timestamp: new Date().toISOString(),
        adminId: "current-admin-id", // This should come from auth context
        adminName: "Admin Support", // This should come from auth context
      }

      const updatedRequest = {
        ...selectedRequest,
        status: "resolved",
        responses: [...(selectedRequest.responses || []), response],
        adminRemarks: responseData.remarks,
        resolvedAt: new Date().toISOString(),
      }

      // Update admin requests
      const adminRequests = JSON.parse(localStorage.getItem("adminHelpRequests") || "[]")
      const updatedAdminRequests = adminRequests.map((req) => (req.id === selectedRequest.id ? updatedRequest : req))
      localStorage.setItem("adminHelpRequests", JSON.stringify(updatedAdminRequests))

      // Update user/foreman tickets based on source
      if (selectedRequest.source === "user") {
        const userTickets = JSON.parse(localStorage.getItem("userHelpTickets") || "[]")
        const updatedUserTickets = userTickets.map((ticket) =>
          ticket.id === selectedRequest.id ? updatedRequest : ticket,
        )
        localStorage.setItem("userHelpTickets", JSON.stringify(updatedUserTickets))
      } else if (selectedRequest.source === "foreman") {
        const foremanTickets = JSON.parse(localStorage.getItem("foremanHelpTickets") || "[]")
        const updatedForemanTickets = foremanTickets.map((ticket) =>
          ticket.id === selectedRequest.id ? updatedRequest : ticket,
        )
        localStorage.setItem("foremanHelpTickets", JSON.stringify(updatedForemanTickets))
      }

      loadRequests()
      setShowResponseDialog(false)
      setSelectedRequest(null)
      alert("Response sent successfully!")
    } catch (error) {
      console.error("Error submitting response:", error)
      alert("Error submitting response. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSourceIcon = (source) => {
    return source === "user" ? <User className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />
  }

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const resolvedRequests = requests.filter((r) => r.status === "resolved")
  const grievances = requests.filter((r) => r.type === "complaint")
  const feedback = requests.filter((r) => r.type === "feedback")

  const getTabRequests = (tab) => {
    switch (tab) {
      case "pending":
        return filteredRequests.filter((r) => r.status === "pending")
      case "resolved":
        return filteredRequests.filter((r) => r.status === "resolved")
      case "grievances":
        return filteredRequests.filter((r) => r.type === "complaint")
      case "feedback":
        return filteredRequests.filter((r) => r.type === "feedback")
      default:
        return filteredRequests
    }
  }

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
                  <h1 className="text-2xl font-bold text-gray-900">Help & Support Management</h1>
                  <p className="text-sm text-gray-500">Manage user and foreman support requests</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Total: {requests.length}
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Pending: {pendingRequests.length}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Resolved: {resolvedRequests.length}
                  </Badge>
                  <Button onClick={handleRefreshRequests} disabled={refreshing} variant="outline">
                    {refreshing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pending ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="resolved" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Resolved ({resolvedRequests.length})
                </TabsTrigger>
                <TabsTrigger value="grievances" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Grievances ({grievances.length})
                </TabsTrigger>
                <TabsTrigger value="feedback" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Feedback ({feedback.length})
                </TabsTrigger>
              </TabsList>

              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="search">Search Requests</Label>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="Search by subject, description, or user..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-48">
                      <Label htmlFor="status">Status Filter</Label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full md:w-48">
                      <Label htmlFor="source">Source Filter</Label>
                      <Select value={sourceFilter} onValueChange={setSourceFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Sources" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sources</SelectItem>
                          <SelectItem value="user">Users</SelectItem>
                          <SelectItem value="foreman">Foremen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tab Contents */}
              {["pending", "resolved", "grievances", "feedback"].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold capitalize">
                      {tab === "grievances" ? "Grievances" : tab === "feedback" ? "Feedback" : `${tab} Requests`}
                    </h2>
                    <div className="text-sm text-gray-500">{getTabRequests(tab).length} requests</div>
                  </div>

                  {getTabRequests(tab).length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-12">
                        <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Requests Found</h3>
                        <p className="text-gray-500">No {tab} requests match your current filters.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {getTabRequests(tab).map((request) => (
                        <Card key={request.id} className="border-0 shadow-lg">
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-lg">{request.subject}</h3>
                                  <Badge className={getStatusColor(request.status)}>
                                    {request.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                    {request.status === "resolved" && <CheckCircle className="h-3 w-3 mr-1" />}
                                    {request.status.replace("_", " ").toUpperCase()}
                                  </Badge>
                                  <Badge className={getPriorityColor(request.priority)}>
                                    {request.priority.toUpperCase()}
                                  </Badge>
                                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                    {getSourceIcon(request.source)}
                                    <span className="ml-1 capitalize">{request.source}</span>
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>ID: {request.id}</span>
                                  <span>Type: {request.type.replace("_", " ")}</span>
                                  <span>
                                    From: {request.source === "user" ? request.userName : request.foremanName}
                                  </span>
                                  <span>Submitted: {new Date(request.submittedAt).toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {request.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span className="text-sm text-gray-600">{request.rating}/5</span>
                                  </div>
                                )}
                                {request.status === "pending" && (
                                  <Button
                                    onClick={() => handleRespondToRequest(request)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                    size="sm"
                                  >
                                    <Reply className="h-4 w-4 mr-1" />
                                    Respond
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Request Details:</h4>
                              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{request.description}</p>
                            </div>

                            {request.adminRemarks && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Internal Remarks:</h4>
                                <p className="text-gray-700 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                                  {request.adminRemarks}
                                </p>
                              </div>
                            )}

                            {request.responses && request.responses.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">Response History:</h4>
                                {request.responses.map((response, index) => (
                                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <span className="font-medium text-blue-900">{response.adminName}</span>
                                      <span className="text-sm text-blue-600">
                                        {new Date(response.timestamp).toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-blue-800">{response.message}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* Response Dialog */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Respond to Support Request</DialogTitle>
            <DialogDescription>
              Provide a response to {selectedRequest?.source === "user" ? "user" : "foreman"} request:{" "}
              {selectedRequest?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {selectedRequest && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Original Request:</h4>
                <p className="text-gray-700 text-sm">{selectedRequest.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>
                    From: {selectedRequest.source === "user" ? selectedRequest.userName : selectedRequest.foremanName}
                  </span>
                  <span>Type: {selectedRequest.type.replace("_", " ")}</span>
                  <span>Priority: {selectedRequest.priority}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="response-message">Response Message *</Label>
              <Textarea
                id="response-message"
                placeholder="Enter your response to the user/foreman..."
                value={responseData.message}
                onChange={(e) => setResponseData((prev) => ({ ...prev, message: e.target.value }))}
                rows={4}
                required
              />
              <p className="text-xs text-gray-500">This message will be visible to the user/foreman</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-remarks">Internal Remarks (Optional)</Label>
              <Textarea
                id="admin-remarks"
                placeholder="Add internal notes or remarks for admin reference..."
                value={responseData.remarks}
                onChange={(e) => setResponseData((prev) => ({ ...prev, remarks: e.target.value }))}
                rows={3}
              />
              <p className="text-xs text-gray-500">
                These remarks are for internal use only and won't be visible to users
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowResponseDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitResponse}
                disabled={isSubmitting || !responseData.message.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Response
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
