"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  FileText,
  Download,
  Search,
  Send,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Video,
  Shield,
  Paperclip,
} from "lucide-react"

interface SupportTicket {
  id: string
  subject: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "resolved" | "closed"
  createdAt: string
  lastUpdated: string
  description: string
  attachments?: string[]
}

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
  notHelpful: number
}

interface Resource {
  id: string
  title: string
  type: "guide" | "video" | "document" | "template"
  category: string
  description: string
  downloadUrl?: string
  viewUrl?: string
  duration?: string
  fileSize?: string
}

export default function ForemanHelpPage() {
  const [activeTab, setActiveTab] = useState("support")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showTicketDialog, setShowTicketDialog] = useState(false)
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
    attachments: [] as File[],
  })

  // Mock data
  const supportTickets: SupportTicket[] = [
    {
      id: "TKT-001",
      subject: "Unable to create new chit scheme",
      category: "technical",
      priority: "high",
      status: "in-progress",
      createdAt: "2024-01-15T10:30:00Z",
      lastUpdated: "2024-01-16T14:20:00Z",
      description:
        "I'm getting an error when trying to create a new chit scheme. The form validation seems to be failing.",
      attachments: ["error-screenshot.png"],
    },
    {
      id: "TKT-002",
      subject: "Subscriber payment not reflecting",
      category: "operational",
      priority: "medium",
      status: "resolved",
      createdAt: "2024-01-14T09:15:00Z",
      lastUpdated: "2024-01-15T16:45:00Z",
      description: "A subscriber made a payment but it's not showing in the system.",
    },
  ]

  const faqItems: FAQItem[] = [
    {
      id: "faq-1",
      question: "How do I create a new chit fund scheme?",
      answer:
        "To create a new chit fund scheme, navigate to the 'Schemes' section in your dashboard and click 'Create New Scheme'. Fill in all required details including scheme amount, duration, number of subscribers, and terms & conditions. Make sure to review all information before submitting for approval.",
      category: "schemes",
      helpful: 45,
      notHelpful: 3,
    },
    {
      id: "faq-2",
      question: "What documents are required for PSO application?",
      answer:
        "For PSO (Prior Sanction Order) application, you need: 1) Business registration certificate, 2) Financial statements for the last 3 years, 3) Security deposit proof, 4) Detailed business plan, 5) Identity and address proof of directors/partners, 6) Bank statements, 7) Audited balance sheets.",
      category: "compliance",
      helpful: 38,
      notHelpful: 2,
    },
    {
      id: "faq-3",
      question: "How do I manage subscriber payments?",
      answer:
        "Go to the 'Subscribers' section and select the specific scheme. You can view all payment statuses, mark payments as received, send payment reminders, and generate payment reports. The system automatically tracks due dates and sends notifications.",
      category: "payments",
      helpful: 52,
      notHelpful: 1,
    },
    {
      id: "faq-4",
      question: "What is the auction process in chit funds?",
      answer:
        "The auction process involves subscribers bidding for the chit amount. The subscriber with the lowest bid wins the auction. The difference between the chit amount and winning bid is distributed among all subscribers as dividend. Auctions are conducted monthly as per the scheme terms.",
      category: "operations",
      helpful: 41,
      notHelpful: 4,
    },
    {
      id: "faq-5",
      question: "How do I generate compliance reports?",
      answer:
        "Navigate to 'Reports' section and select 'Compliance Reports'. Choose the report type (monthly, quarterly, annual), select date range, and click generate. Reports include subscriber details, payment status, auction records, and regulatory compliance data.",
      category: "reports",
      helpful: 29,
      notHelpful: 2,
    },
  ]

  const resources: Resource[] = [
    {
      id: "res-1",
      title: "Chit Fund Foreman Complete Guide",
      type: "guide",
      category: "getting-started",
      description: "Comprehensive guide covering all aspects of chit fund management from setup to compliance.",
      downloadUrl: "/resources/foreman-guide.pdf",
      fileSize: "2.5 MB",
    },
    {
      id: "res-2",
      title: "PSO Application Process Video Tutorial",
      type: "video",
      category: "compliance",
      description: "Step-by-step video guide for applying for Prior Sanction Order (PSO).",
      viewUrl: "/resources/pso-tutorial",
      duration: "15 min",
    },
    {
      id: "res-3",
      title: "Scheme Creation Template",
      type: "template",
      category: "schemes",
      description: "Ready-to-use template for creating new chit fund schemes with all required fields.",
      downloadUrl: "/resources/scheme-template.xlsx",
      fileSize: "45 KB",
    },
    {
      id: "res-4",
      title: "Monthly Compliance Checklist",
      type: "document",
      category: "compliance",
      description: "Monthly checklist to ensure all compliance requirements are met.",
      downloadUrl: "/resources/compliance-checklist.pdf",
      fileSize: "180 KB",
    },
    {
      id: "res-5",
      title: "Subscriber Management Best Practices",
      type: "guide",
      category: "operations",
      description: "Best practices for managing subscribers, payments, and communications.",
      downloadUrl: "/resources/subscriber-management.pdf",
      fileSize: "1.8 MB",
    },
  ]

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate ticket creation
    const newTicket: SupportTicket = {
      id: `TKT-${String(supportTickets.length + 1).padStart(3, "0")}`,
      subject: ticketForm.subject,
      category: ticketForm.category,
      priority: ticketForm.priority as "low" | "medium" | "high" | "urgent",
      status: "open",
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      description: ticketForm.description,
      attachments: ticketForm.attachments.map((file) => file.name),
    }

    // Reset form
    setTicketForm({
      subject: "",
      category: "",
      priority: "medium",
      description: "",
      attachments: [],
    })
    setShowTicketDialog(false)

    alert(`Support ticket ${newTicket.id} created successfully!`)
  }

  const filteredFAQs = faqItems.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      case "template":
        return <Download className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <HelpCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600">Get assistance with your chit fund management</p>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">Phone Support</div>
                <div className="text-sm text-gray-600">+91-1800-123-4567</div>
                <div className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Email Support</div>
                <div className="text-sm text-gray-600">foreman@chitfundportal.com</div>
                <div className="text-xs text-gray-500">Response within 24 hours</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-medium">Live Chat</div>
                <div className="text-sm text-gray-600">Available now</div>
                <div className="text-xs text-gray-500">Average response: 2 min</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="support" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Support Tickets
          </TabsTrigger>
          <TabsTrigger value="faq" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="resources" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Phone className="h-4 w-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        {/* Support Tickets Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Support Tickets</h2>
            <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Create Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Support Ticket</DialogTitle>
                  <DialogDescription>Describe your issue and we'll help you resolve it quickly.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={ticketForm.category}
                        onValueChange={(value) => setTicketForm({ ...ticketForm, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="operational">Operational Support</SelectItem>
                          <SelectItem value="compliance">Compliance Query</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={ticketForm.priority}
                        onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      placeholder="Provide detailed information about your issue..."
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="attachments">Attachments (Optional)</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <Input
                        id="attachments"
                        type="file"
                        multiple
                        onChange={(e) =>
                          setTicketForm({ ...ticketForm, attachments: Array.from(e.target.files || []) })
                        }
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <Paperclip className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Max 5 files, 10MB each</p>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowTicketDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Ticket</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                      <p className="text-sm text-gray-600">Ticket ID: {ticket.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{ticket.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      <span>Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    {ticket.attachments && ticket.attachments.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Paperclip className="h-4 w-4" />
                        <span>{ticket.attachments.length} attachment(s)</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="schemes">Schemes</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="capitalize">
                      {faq.category}
                    </Badge>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <p className="text-gray-700 mb-4">{faq.answer}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {faq.helpful} helpful
                        </span>
                        <span className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          {faq.notHelpful} not helpful
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Helpful
                        </Button>
                        <Button variant="outline" size="sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Not Helpful
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          )}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="getting-started">Getting Started</SelectItem>
                <SelectItem value="schemes">Schemes</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                      <Badge variant="outline" className="capitalize mb-2">
                        {resource.category.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {resource.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.duration}
                        </span>
                      )}
                      {resource.fileSize && (
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {resource.fileSize}
                        </span>
                      )}
                    </div>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      {resource.type === "video" ? "Watch" : "Download"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          )}
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Get in Touch</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone Support</h3>
                        <p className="text-gray-600">Speak directly with our support team</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Toll-free:</span>
                        <span className="font-medium">+91-1800-123-4567</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Direct:</span>
                        <span className="font-medium">+91-11-4567-8901</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hours:</span>
                        <span className="font-medium">Mon-Fri, 9 AM - 6 PM IST</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email Support</h3>
                        <p className="text-gray-600">Send us detailed queries</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>General:</span>
                        <span className="font-medium">support@chitfundportal.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Foreman:</span>
                        <span className="font-medium">foreman@chitfundportal.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technical:</span>
                        <span className="font-medium">tech@chitfundportal.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response:</span>
                        <span className="font-medium">Within 24 hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Live Chat</h3>
                        <p className="text-gray-600">Instant help when you need it</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium text-green-600">● Available</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response:</span>
                        <span className="font-medium">Average 2 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hours:</span>
                        <span className="font-medium">24/7 Available</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Start Live Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Support Hours & Escalation */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Support Information</h2>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Phone Support</div>
                      <div className="text-gray-600">Mon-Fri: 9 AM - 6 PM IST</div>
                      <div className="text-gray-600">Sat: 10 AM - 4 PM IST</div>
                      <div className="text-gray-600">Sun: Closed</div>
                    </div>
                    <div>
                      <div className="font-medium">Email Support</div>
                      <div className="text-gray-600">24/7 Monitoring</div>
                      <div className="text-gray-600">Response within 24 hours</div>
                      <div className="text-gray-600">Urgent: Within 4 hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Escalation Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                        1
                      </div>
                      <div>
                        <div className="font-medium">Level 1 - Support Agent</div>
                        <div className="text-gray-600">Initial response and basic troubleshooting</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs font-medium">
                        2
                      </div>
                      <div>
                        <div className="font-medium">Level 2 - Technical Specialist</div>
                        <div className="text-gray-600">Complex technical issues and system problems</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-medium">
                        3
                      </div>
                      <div>
                        <div className="font-medium">Level 3 - Senior Management</div>
                        <div className="text-gray-600">Critical issues and service complaints</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Emergency Support:</strong> For critical system outages or security issues, call our emergency
                  hotline at +91-11-9876-5432 (Available 24/7)
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
