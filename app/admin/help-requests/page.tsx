"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  HelpCircle,
  MessageSquare,
  AlertTriangle,
  Clock,
  User,
  Users,
  FileText,
  Send,
  Eye,
  Filter,
  Search,
  RefreshCw,
} from "lucide-react"

export default function AdminHelpRequestsPage() {
  const [helpTickets, setHelpTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [responseText, setResponseText] = useState("")
  const [remarksText, setRemarksText] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterSource, setFilterSource] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showResponseDialog, setShowResponseDialog] = useState(false)

  // Load help tickets from localStorage
  useEffect(() => {
    const loadTickets = () => {
      const userTickets = JSON.parse(localStorage.getItem("userHelpTickets") || "[]")
      const foremanTickets = JSON.parse(localStorage.getItem("foremanHelpTickets") || "[]")

      // Combine all tickets and add source information
      const allTickets = [
        ...userTickets.map((ticket) => ({ ...ticket, source: "user" })),
        ...foremanTickets.map((ticket) => ({ ...ticket, source: "foreman" })),
      ]

      // Sort by date (newest first)
      allTickets.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate))

      setHelpTickets(allTickets)
    }

    loadTickets()

    // Refresh every 30 seconds
    const interval = setInterval(loadTickets, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleRespond = (ticket) => {
    setSelectedTicket(ticket)
    setResponseText("")
    setRemarksText("")
    setShowResponseDialog(true)
  }

  const handleSubmitResponse = () => {
    if (!responseText.trim()) {
      alert("Please provide a response")
      return
    }

    const updatedTicket = {
      ...selectedTicket,
      status: "resolved",
      adminResponse: {
        comments: responseText,
        remarks: remarksText,
        respondedBy: "Admin Support Team",
        responseDate: new Date().toISOString().split("T")[0],
        attachments: [],
      },
      resolvedDate: new Date().toISOString().split("T")[0],
    }

    // Update the appropriate localStorage based on source
    if (selectedTicket.source === "user") {
      const userTickets = JSON.parse(localStorage.getItem("userHelpTickets") || "[]")
      const updatedUserTickets = userTickets.map((ticket) => (ticket.id === selectedTicket.id ? updatedTicket : ticket))
      localStorage.setItem("userHelpTickets", JSON.stringify(updatedUserTickets))
    } else if (selectedTicket.source === "foreman") {
      const foremanTickets = JSON.parse(localStorage.getItem("foremanHelpTickets") || "[]")
      const updatedForemanTickets = foremanTickets.map((ticket) =>
        ticket.id === selectedTicket.id ? updatedTicket : ticket,
      )
      localStorage.setItem("foremanHelpTickets", JSON.stringify(updatedForemanTickets))
    }

    // Update local state
    const updatedTickets = helpTickets.map((ticket) => (ticket.id === selectedTicket.id ? updatedTicket : ticket))
    setHelpTickets(updatedTickets)

    // Close dialog and reset form
    setShowResponseDialog(false)
    setSelectedTicket(null)
    setResponseText("")
    setRemarksText("")

    // Show success message
    alert("Response sent successfully!")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSourceIcon = (source) => {
    switch (source) {
      case "foreman":
        return <Users className="h-4 w-4 text-green-600" />
      case "user":
        return <User className="h-4 w-4 text-blue-600" />
      default:
        return <User className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredTickets = helpTickets.filter((ticket) => {
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus
    const matchesType = filterType === "all" || ticket.type === filterType
    const matchesSource = filterSource === "all" || ticket.source === filterSource
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesType && matchesSource && matchesSearch
  })

  const grievances = filteredTickets.filter((t) => t.type === "grievance")
  const feedback = filteredTickets.filter((t) => t.type === "feedback")
  const pendingTickets = filteredTickets.filter((t) => t.status === "pending")

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support Management</h1>
          <p className="text-gray-600">Manage user and foreman support requests</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Pending: {pendingTickets.length}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress: {helpTickets.filter((t) => t.status === "in_progress").length}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{helpTickets.length}</p>
              </div>
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Grievances</p>
                <p className="text-2xl font-bold text-red-600">{grievances.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Feedback</p>
                <p className="text-2xl font-bold text-green-600">{feedback.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Response</p>
                <p className="text-2xl font-bold text-orange-600">{pendingTickets.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tickets by ID, subject, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="grievance">Grievances</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="foreman">Foremen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            All Requests ({filteredTickets.length})
          </TabsTrigger>
          <TabsTrigger value="grievances" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Grievances ({grievances.length})
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Feedback ({feedback.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending ({pendingTickets.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                      <div className="flex items-center gap-1">
                        {getSourceIcon(ticket.source)}
                        <span className="text-sm text-gray-600 capitalize">{ticket.source}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {ticket.id}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {ticket.submittedDate}
                      </span>
                      {ticket.source === "foreman" && ticket.foremanName && <span>From: {ticket.foremanName}</span>}
                      {ticket.source === "user" && ticket.userName && <span>From: {ticket.userName}</span>}
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{ticket.description}</p>

                    {ticket.adminResponse && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-blue-900 mb-1">Admin Response:</p>
                        <p className="text-sm text-blue-800 mb-2">{ticket.adminResponse.comments}</p>
                        {ticket.adminResponse.remarks && (
                          <div className="bg-white border border-blue-300 rounded p-2">
                            <p className="text-xs font-medium text-blue-900 mb-1">Internal Remarks:</p>
                            <p className="text-xs text-blue-700">{ticket.adminResponse.remarks}</p>
                          </div>
                        )}
                        <p className="text-xs text-blue-600 mt-2">Responded on {ticket.adminResponse.responseDate}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {ticket.type === "grievance" ? (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : (
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Ticket Details - {ticket.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Type</Label>
                              <p className="text-sm text-gray-600 capitalize">{ticket.type}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Priority</Label>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Source</Label>
                              <div className="flex items-center gap-1">
                                {getSourceIcon(ticket.source)}
                                <span className="text-sm text-gray-600 capitalize">{ticket.source}</span>
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Submitted Date</Label>
                              <p className="text-sm text-gray-600">{ticket.submittedDate}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Subject</Label>
                            <p className="text-sm text-gray-600">{ticket.subject}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Description</Label>
                            <p className="text-sm text-gray-600">{ticket.description}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {ticket.status === "pending" && (
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => handleRespond(ticket)}>
                      <Send className="h-4 w-4" />
                      Respond
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="grievances" className="space-y-4">
          {grievances.map((ticket) => (
            <Card key={ticket.id} className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                      <div className="flex items-center gap-1">
                        {getSourceIcon(ticket.source)}
                        <span className="text-sm text-gray-600 capitalize">{ticket.source}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{ticket.description}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  {ticket.status === "pending" && (
                    <Button className="gap-2 bg-red-600 hover:bg-red-700" onClick={() => handleRespond(ticket)}>
                      <Send className="h-4 w-4" />
                      Respond to Grievance
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          {feedback.map((ticket) => (
            <Card key={ticket.id} className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                      <div className="flex items-center gap-1">
                        {getSourceIcon(ticket.source)}
                        <span className="text-sm text-gray-600 capitalize">{ticket.source}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{ticket.description}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  {ticket.status === "pending" && (
                    <Button className="gap-2 bg-green-600 hover:bg-green-700" onClick={() => handleRespond(ticket)}>
                      <Send className="h-4 w-4" />
                      Respond to Feedback
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingTickets.map((ticket) => (
            <Card key={ticket.id} className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">PENDING RESPONSE</Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                      <div className="flex items-center gap-1">
                        {getSourceIcon(ticket.source)}
                        <span className="text-sm text-gray-600 capitalize">{ticket.source}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{ticket.description}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="gap-2 bg-orange-600 hover:bg-orange-700" onClick={() => handleRespond(ticket)}>
                    <Send className="h-4 w-4" />
                    Respond Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Help Requests Found</h3>
            <p className="text-gray-500">No support requests match your current filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Response Dialog */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Respond to Ticket - {selectedTicket?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Ticket Summary */}
            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-gray-900">{selectedTicket?.subject}</h4>
                <Badge className={getPriorityColor(selectedTicket?.priority)}>
                  {selectedTicket?.priority?.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1">
                  {getSourceIcon(selectedTicket?.source)}
                  <span className="text-sm text-gray-600 capitalize">{selectedTicket?.source}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{selectedTicket?.description}</p>
              <div className="text-xs text-gray-500">
                Submitted by:{" "}
                {selectedTicket?.source === "foreman" ? selectedTicket?.foremanName : selectedTicket?.userName} on{" "}
                {selectedTicket?.submittedDate}
              </div>
            </div>

            {/* Response Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="response" className="text-base font-medium">
                  Response Message *
                </Label>
                <Textarea
                  id="response"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response to the user/foreman here. This message will be visible to them."
                  rows={6}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This response will be sent to the {selectedTicket?.source} and will be visible in their ticket
                  history.
                </p>
              </div>

              <div>
                <Label htmlFor="remarks" className="text-base font-medium">
                  Internal Remarks (Optional)
                </Label>
                <Textarea
                  id="remarks"
                  value={remarksText}
                  onChange={(e) => setRemarksText(e.target.value)}
                  placeholder="Add internal remarks or annotations for admin reference. This will not be visible to the user/foreman."
                  rows={3}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Internal remarks are for admin use only and will not be shared with the requester.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowResponseDialog(false)
                    setSelectedTicket(null)
                    setResponseText("")
                    setRemarksText("")
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitResponse}
                  disabled={!responseText.trim()}
                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Response
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
