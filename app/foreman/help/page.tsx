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
  HelpCircle,
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  Star,
  RefreshCw,
  FileText,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"

export default function ForemanHelpPage() {
  const [activeTab, setActiveTab] = useState("submit")
  const [formData, setFormData] = useState({
    type: "",
    subject: "",
    description: "",
    priority: "medium",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tickets, setTickets] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  // Load tickets on component mount
  useEffect(() => {
    loadTickets()
    // Auto-refresh every 10 seconds to check for admin responses
    const interval = setInterval(loadTickets, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadTickets = () => {
    try {
      const foremanTickets = JSON.parse(localStorage.getItem("foremanHelpTickets") || "[]")
      setTickets(foremanTickets.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)))
    } catch (error) {
      console.error("Error loading tickets:", error)
      setTickets([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.type || !formData.subject || !formData.description) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const newTicket = {
        id: `TKT-${Date.now()}`,
        ...formData,
        submittedAt: new Date().toISOString(),
        status: "pending",
        source: "foreman",
        foremanId: "current-foreman-id", // This should come from auth context
        foremanName: "Current Foreman", // This should come from auth context
        responses: [],
        rating: null,
      }

      // Save to foreman tickets
      const foremanTickets = JSON.parse(localStorage.getItem("foremanHelpTickets") || "[]")
      foremanTickets.push(newTicket)
      localStorage.setItem("foremanHelpTickets", JSON.stringify(foremanTickets))

      // Save to admin help requests
      const adminRequests = JSON.parse(localStorage.getItem("adminHelpRequests") || "[]")
      adminRequests.push(newTicket)
      localStorage.setItem("adminHelpRequests", JSON.stringify(adminRequests))

      // Reset form
      setFormData({
        type: "",
        subject: "",
        description: "",
        priority: "medium",
      })

      // Refresh tickets and switch to My Tickets tab
      loadTickets()
      setActiveTab("tickets")
      alert("Your request has been submitted successfully! You can track its status in 'My Tickets'.")
    } catch (error) {
      console.error("Error submitting request:", error)
      alert("Error submitting request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRefreshTickets = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    loadTickets()
    setRefreshing(false)
  }

  const handleRateResponse = (ticketId, rating) => {
    try {
      // Update foreman tickets
      const foremanTickets = JSON.parse(localStorage.getItem("foremanHelpTickets") || "[]")
      const updatedForemanTickets = foremanTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, rating } : ticket,
      )
      localStorage.setItem("foremanHelpTickets", JSON.stringify(updatedForemanTickets))

      // Update admin requests
      const adminRequests = JSON.parse(localStorage.getItem("adminHelpRequests") || "[]")
      const updatedAdminRequests = adminRequests.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, rating } : ticket,
      )
      localStorage.setItem("adminHelpRequests", JSON.stringify(updatedAdminRequests))

      loadTickets()
      alert("Thank you for your feedback!")
    } catch (error) {
      console.error("Error rating response:", error)
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

  const pendingCount = tickets.filter((t) => t.status === "pending").length
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length

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
                <BreadcrumbPage>Help & Support</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 space-y-6 p-6 bg-gray-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Foreman Help & Support</h1>
              <p className="text-gray-600 mt-1">Get assistance with scheme management and foreman operations</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Total Tickets: {tickets.length}
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Pending: {pendingCount}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Resolved: {resolvedCount}
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="submit" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Submit Request
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                My Tickets ({tickets.length})
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="submit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Submit Support Request
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="type">Request Type *</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select request type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheme_creation">Scheme Creation</SelectItem>
                            <SelectItem value="scheme_approval">Scheme Approval</SelectItem>
                            <SelectItem value="subscriber_management">Subscriber Management</SelectItem>
                            <SelectItem value="payment_issues">Payment Issues</SelectItem>
                            <SelectItem value="auction_management">Auction Management</SelectItem>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="regulatory">Regulatory Compliance</SelectItem>
                            <SelectItem value="documentation">Documentation</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="complaint">Complaint</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={formData.subject}
                        onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide detailed information about your issue or request"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">My Support Tickets</h2>
                <Button onClick={handleRefreshTickets} disabled={refreshing} variant="outline">
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

              {tickets.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Support Tickets</h3>
                    <p className="text-gray-500 mb-4">You haven't submitted any support requests yet.</p>
                    <Button onClick={() => setActiveTab("submit")}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Submit Your First Request
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <Card key={ticket.id} className="border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                              <Badge className={getStatusColor(ticket.status)}>
                                {ticket.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                {ticket.status === "resolved" && <CheckCircle className="h-3 w-3 mr-1" />}
                                {ticket.status.replace("_", " ").toUpperCase()}
                              </Badge>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Ticket ID: {ticket.id}</span>
                              <span>Type: {ticket.type.replace("_", " ")}</span>
                              <span>Submitted: {new Date(ticket.submittedAt).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Your Request:</h4>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{ticket.description}</p>
                        </div>

                        {ticket.responses && ticket.responses.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">Admin Response:</h4>
                            {ticket.responses.map((response, index) => (
                              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <span className="font-medium text-blue-900">Support Team</span>
                                  <span className="text-sm text-blue-600">
                                    {new Date(response.timestamp).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-blue-800">{response.message}</p>
                              </div>
                            ))}

                            {ticket.status === "resolved" && !ticket.rating && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h5 className="font-medium text-green-900 mb-2">Rate this response:</h5>
                                <div className="flex items-center gap-2">
                                  {[1, 2, 3, 4, 5].map((rating) => (
                                    <Button
                                      key={rating}
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRateResponse(ticket.id, rating)}
                                      className="p-1 hover:bg-green-100"
                                    >
                                      <Star className="h-5 w-5 text-yellow-500" />
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {ticket.rating && (
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">Your rating:</span>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                          star <= ticket.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Foreman FAQ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900">How do I create a new chit fund scheme?</h3>
                      <p className="text-gray-600 mt-1">
                        Go to "Create Scheme" in your dashboard and follow the 8-step process. You'll need to provide
                        scheme details, auction rules, bidding parameters, and upload required documents. Admin approval
                        is required before the scheme goes live.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900">What documents are required for scheme approval?</h3>
                      <p className="text-gray-600 mt-1">
                        You need to upload: Commission Structure, Terms of Withdrawal, Liabilities Document, Subscriber
                        Rights, FDR Document (10% of chit value), and Draft Agreement. All documents must be in PDF
                        format and under 5MB.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900">How long does scheme approval take?</h3>
                      <p className="text-gray-600 mt-1">
                        Admin review typically takes 2-5 business days. You'll receive PSO certificate automatically
                        after Steps 1-4 approval, then you can add subscribers and upload the final agreement for final
                        approval.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900">How do I add subscribers to my scheme?</h3>
                      <p className="text-gray-600 mt-1">
                        After PSO approval, you can add subscribers manually or use the random subscriber generator for
                        testing. Each subscriber needs a valid UCFSIN number and complete contact details.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900">What are the regulatory requirements?</h3>
                      <p className="text-gray-600 mt-1">
                        Minimum bid is 5% of chit value, maximum bid is 30%. FDR must be 10% of chit value. Number of
                        subscribers must equal scheme duration. All schemes require PSO certificate and Form 7
                        (Commencement Certificate).
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900">How do I manage scheme auctions?</h3>
                      <p className="text-gray-600 mt-1">
                        Once your scheme is live, you can manage auctions through the scheme management interface. Set
                        auction frequency, timing, and monitor bidding activity. The system handles bid validation
                        automatically.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Need more help?</h4>
                    <p className="text-blue-800 mb-3">
                      If you need assistance with scheme management or have regulatory questions, please submit a
                      support request.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={() => setActiveTab("submit")} className="bg-blue-600 hover:bg-blue-700">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Submit Request
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Foreman Helpline: 1800-456-7890
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email: foreman@ucfsin.gov.in
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
