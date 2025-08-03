"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  HelpCircle,
  MessageSquare,
  AlertTriangle,
  Send,
  Upload,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import Link from "next/link"

export default function HelpSupportPage() {
  const [requestType, setRequestType] = useState("")
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [attachments, setAttachments] = useState([])
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [submittedTicket, setSubmittedTicket] = useState(null)

  // Mock existing tickets data
  const existingTickets = [
    {
      id: "TKT-2025-001",
      type: "grievance",
      subject: "Payment not reflected in scheme",
      description: "I made a payment of ₹50,000 on 15th Jan but it's not showing in my scheme account.",
      priority: "high",
      status: "resolved",
      submittedDate: "2025-01-15",
      resolvedDate: "2025-01-18",
      adminResponse: {
        comments:
          "We have verified your payment and updated your account. The payment has been reflected in your Gold Savings 50K scheme. Please check your dashboard.",
        respondedBy: "Admin Support Team",
        responseDate: "2025-01-18",
        attachments: [
          {
            name: "Payment_Confirmation_Receipt.pdf",
            url: "/placeholder.svg?height=600&width=800&text=Payment Confirmation Receipt",
          },
        ],
      },
      rating: 5,
      feedback: "Very satisfied with the quick resolution. Thank you!",
    },
    {
      id: "TKT-2025-002",
      type: "feedback",
      subject: "Suggestion for mobile app improvement",
      description:
        "The mobile app could have better navigation. It would be great to have a quick access menu for frequently used features.",
      priority: "low",
      status: "in_progress",
      submittedDate: "2025-01-20",
      adminResponse: {
        comments:
          "Thank you for your valuable feedback. Our development team is working on improving the mobile app user experience. We will consider your suggestions in the next update.",
        respondedBy: "Product Team",
        responseDate: "2025-01-22",
        attachments: [],
      },
    },
    {
      id: "TKT-2025-003",
      type: "grievance",
      subject: "Unable to access UCFSIN card",
      description: "I'm getting an error when trying to view my UCFSIN card. The page shows 'Card not found' error.",
      priority: "medium",
      status: "pending",
      submittedDate: "2025-01-23",
    },
  ]

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setAttachments((prev) => [...prev, ...files])
  }

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!requestType || !subject || !description) {
      alert("Please fill in all required fields")
      return
    }

    const ticketId = `TKT-2025-${String(Date.now()).slice(-3)}`
    const newTicket = {
      id: ticketId,
      type: requestType,
      subject,
      description,
      priority,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
      attachments: attachments.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    }

    setSubmittedTicket(newTicket)
    setShowSubmitDialog(true)

    // Reset form
    setRequestType("")
    setSubject("")
    setDescription("")
    setPriority("medium")
    setAttachments([])
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/user/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <HelpCircle className="h-8 w-8 text-[#1e3a8a]" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Help & Support</h1>
                  <p className="text-sm text-gray-500">Submit grievances and feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-sm text-gray-600">+91 1800-123-4567</p>
                  <p className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-sm text-gray-600">support@ucfsin.com</p>
                  <p className="text-xs text-gray-500">Response within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Live Chat</h3>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                  <Button size="sm" className="mt-1 bg-purple-600 hover:bg-purple-700">
                    Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white border shadow-sm">
            <TabsTrigger value="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Submit Request
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <FileText className="h-4 w-4" />
              My Tickets ({existingTickets.length})
            </TabsTrigger>
          </TabsList>

          {/* Submit Request Tab */}
          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Submit Grievance or Feedback
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Please provide detailed information about your concern or suggestion. Our team will review and respond
                  within 24-48 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Request Type */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Request Type *</Label>
                    <RadioGroup value={requestType} onValueChange={setRequestType}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="grievance" id="grievance" />
                        <Label htmlFor="grievance" className="flex items-center gap-3 cursor-pointer flex-1">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <div>
                            <div className="font-medium">Grievance</div>
                            <div className="text-sm text-gray-600">Report issues, complaints, or problems</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="feedback" id="feedback" />
                        <Label htmlFor="feedback" className="flex items-center gap-3 cursor-pointer flex-1">
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                          <div>
                            <div className="font-medium">Feedback</div>
                            <div className="text-sm text-gray-600">
                              Share suggestions, compliments, or general feedback
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Priority */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Priority Level</Label>
                    <RadioGroup value={priority} onValueChange={setPriority}>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="high" id="high" />
                          <Label htmlFor="high" className="cursor-pointer">
                            <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium" className="cursor-pointer">
                            <Badge className="bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="low" id="low" />
                          <Label htmlFor="low" className="cursor-pointer">
                            <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-base font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief summary of your request"
                      className="w-full"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-medium">
                      Detailed Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please provide detailed information about your concern or feedback. Include relevant dates, transaction IDs, or any other helpful details."
                      rows={6}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">Minimum 20 characters required</p>
                  </div>

                  {/* File Attachments */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Attachments (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop files here, or{" "}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                          browse
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">
                        Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 5MB each)
                      </p>
                    </div>

                    {/* Uploaded Files */}
                    {attachments.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Uploaded Files:</Label>
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="bg-[#1e3a8a] hover:bg-[#3b82f6] gap-2"
                      disabled={!requestType || !subject || !description}
                    >
                      <Send className="h-4 w-4" />
                      Submit Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ticket History Tab */}
          <TabsContent value="history">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">My Support Tickets</h2>
                  <p className="text-sm text-gray-600">Track the status of your submitted requests</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Pending: {existingTickets.filter((t) => t.status === "pending").length}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    In Progress: {existingTickets.filter((t) => t.status === "in_progress").length}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Resolved: {existingTickets.filter((t) => t.status === "resolved").length}
                  </Badge>
                </div>
              </div>

              {existingTickets.map((ticket) => (
                <Card key={ticket.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Ticket Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                            <Badge className={getStatusColor(ticket.status)}>
                              {ticket.status.replace("_", " ").toUpperCase()}
                            </Badge>
                            <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {ticket.id}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Submitted: {ticket.submittedDate}
                            </span>
                            {ticket.resolvedDate && (
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                Resolved: {ticket.resolvedDate}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {ticket.type === "grievance" ? (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          ) : (
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                      </div>

                      {/* Ticket Description */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700">{ticket.description}</p>
                      </div>

                      {/* Admin Response */}
                      {ticket.adminResponse && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <MessageSquare className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-blue-900">Admin Response</p>
                              <p className="text-xs text-blue-700">
                                By {ticket.adminResponse.respondedBy} on {ticket.adminResponse.responseDate}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-blue-800 mb-3">{ticket.adminResponse.comments}</p>

                          {/* Response Attachments */}
                          {ticket.adminResponse.attachments && ticket.adminResponse.attachments.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-blue-900">Attachments:</p>
                              {ticket.adminResponse.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                                  <FileText className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm text-blue-800 flex-1">{attachment.name}</span>
                                  <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Rating and Feedback (for resolved tickets) */}
                      {ticket.status === "resolved" && ticket.rating && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">{renderStars(ticket.rating)}</div>
                            <span className="text-sm font-medium text-green-800">Your Rating: {ticket.rating}/5</span>
                          </div>
                          {ticket.feedback && <p className="text-sm text-green-700">"{ticket.feedback}"</p>}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2">
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
                                    <Label className="text-sm font-medium">Status</Label>
                                    <Badge className={getStatusColor(ticket.status)}>
                                      {ticket.status.replace("_", " ").toUpperCase()}
                                    </Badge>
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

                        {/* Rating for resolved tickets without rating */}
                        {ticket.status === "resolved" && !ticket.rating && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Rate this response:</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 text-green-600 hover:text-green-700 bg-transparent"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              Helpful
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <ThumbsDown className="h-4 w-4" />
                              Not Helpful
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {existingTickets.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Support Tickets</h3>
                    <p className="text-gray-600 mb-4">You haven't submitted any support requests yet.</p>
                    <Button className="bg-[#1e3a8a] hover:bg-[#3b82f6]">Submit Your First Request</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Request Submitted Successfully
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 mb-2">
                Your {submittedTicket?.type} has been submitted successfully!
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Ticket ID:</strong> {submittedTicket?.id}
                </p>
                <p>
                  <strong>Subject:</strong> {submittedTicket?.subject}
                </p>
                <p>
                  <strong>Priority:</strong> {submittedTicket?.priority}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p className="mb-2">What happens next:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Our support team will review your request within 24 hours</li>
                <li>You'll receive email updates on the progress</li>
                <li>You can track the status in the "My Tickets" section</li>
                <li>We aim to resolve all issues within 48-72 hours</li>
              </ul>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setShowSubmitDialog(false)}>Got it, Thanks!</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
