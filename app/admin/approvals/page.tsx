"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  Users,
  CreditCard,
  Building,
  Phone,
  Mail,
} from "lucide-react"

// Types for different approval categories
interface AccessRequest {
  id: string
  category: "landing_page_access"
  contactPerson: string
  email: string
  phone: string
  companyName: string
  businessType: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
  priority: "high" | "medium" | "low"
}

interface SchemeApproval {
  id: string
  category: "scheme_approval"
  schemeName: string
  foremanName: string
  foremanId: string
  schemeAmount: number
  duration: number
  participants: number
  submissionDate: string
  status: "pending" | "approved" | "rejected"
  priority: "high" | "medium" | "low"
}

interface DocumentVerification {
  id: string
  category: "document_verification"
  userName: string
  userId: string
  documentType: string
  submissionDate: string
  status: "pending" | "approved" | "rejected"
  priority: "high" | "medium" | "low"
}

interface UserRegistration {
  id: string
  category: "user_registration"
  userName: string
  email: string
  phone: string
  registrationDate: string
  kycStatus: string
  status: "pending" | "approved" | "rejected"
  priority: "high" | "medium" | "low"
}

interface CardRequest {
  id: string
  category: "card_request"
  userName: string
  userId: string
  cardType: string
  requestDate: string
  deliveryAddress: string
  status: "pending" | "approved" | "rejected"
  priority: "high" | "medium" | "low"
}

type ApprovalItem = AccessRequest | SchemeApproval | DocumentVerification | UserRegistration | CardRequest

// Mock data for different approval types
const mockApprovals: ApprovalItem[] = [
  {
    id: "AR001",
    category: "landing_page_access",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@techcorp.com",
    phone: "+91 9876543210",
    companyName: "TechCorp Solutions",
    businessType: "IT Services",
    requestDate: "2024-01-15",
    status: "pending",
    priority: "high",
  },
  {
    id: "SA001",
    category: "scheme_approval",
    schemeName: "Monthly Savings Scheme - 50K",
    foremanName: "Priya Sharma",
    foremanId: "FM001",
    schemeAmount: 50000,
    duration: 12,
    participants: 25,
    submissionDate: "2024-01-14",
    status: "pending",
    priority: "medium",
  },
  {
    id: "DV001",
    category: "document_verification",
    userName: "Amit Patel",
    userId: "USR001",
    documentType: "PAN Card",
    submissionDate: "2024-01-13",
    status: "pending",
    priority: "low",
  },
  {
    id: "UR001",
    category: "user_registration",
    userName: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 8765432109",
    registrationDate: "2024-01-12",
    kycStatus: "completed",
    status: "pending",
    priority: "medium",
  },
  {
    id: "CR001",
    category: "card_request",
    userName: "Vikram Singh",
    userId: "USR002",
    cardType: "Physical UCFSIN Card",
    requestDate: "2024-01-11",
    deliveryAddress: "123 MG Road, Bangalore",
    status: "pending",
    priority: "low",
  },
]

// Helper functions for safe data access
const getDisplayName = (approval: ApprovalItem): string => {
  switch (approval.category) {
    case "landing_page_access":
      return (approval as AccessRequest).contactPerson || "Unknown"
    case "scheme_approval":
      return (approval as SchemeApproval).schemeName || "Unknown Scheme"
    case "document_verification":
      return (approval as DocumentVerification).userName || "Unknown User"
    case "user_registration":
      return (approval as UserRegistration).userName || "Unknown User"
    case "card_request":
      return (approval as CardRequest).userName || "Unknown User"
    default:
      return "Unknown"
  }
}

const getDisplaySubtext = (approval: ApprovalItem): string => {
  switch (approval.category) {
    case "landing_page_access":
      return (approval as AccessRequest).companyName || "No company"
    case "scheme_approval":
      return `Foreman: ${(approval as SchemeApproval).foremanName || "Unknown"}`
    case "document_verification":
      return (approval as DocumentVerification).documentType || "Unknown document"
    case "user_registration":
      return (approval as UserRegistration).email || "No email"
    case "card_request":
      return (approval as CardRequest).cardType || "Unknown card type"
    default:
      return ""
  }
}

const getContactEmail = (approval: ApprovalItem): string => {
  switch (approval.category) {
    case "landing_page_access":
      return (approval as AccessRequest).email || "N/A"
    case "user_registration":
      return (approval as UserRegistration).email || "N/A"
    default:
      return "N/A"
  }
}

const getContactPhone = (approval: ApprovalItem): string => {
  switch (approval.category) {
    case "landing_page_access":
      return (approval as AccessRequest).phone || "N/A"
    case "user_registration":
      return (approval as UserRegistration).phone || "N/A"
    default:
      return "N/A"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "landing_page_access":
      return Building
    case "scheme_approval":
      return FileText
    case "document_verification":
      return FileText
    case "user_registration":
      return Users
    case "card_request":
      return CreditCard
    default:
      return FileText
  }
}

const getCategoryLabel = (category: string): string => {
  switch (category) {
    case "landing_page_access":
      return "Access Request"
    case "scheme_approval":
      return "Scheme Approval"
    case "document_verification":
      return "Document Verification"
    case "user_registration":
      return "User Registration"
    case "card_request":
      return "Card Request"
    default:
      return "Unknown"
  }
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function ApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedApproval, setSelectedApproval] = useState<ApprovalItem | null>(null)

  // Filter approvals based on search and filters
  const filteredApprovals = mockApprovals.filter((approval) => {
    const matchesSearch = (() => {
      const searchLower = searchTerm.toLowerCase()

      switch (approval.category) {
        case "landing_page_access":
          const accessReq = approval as AccessRequest
          return (
            (accessReq.contactPerson || "").toLowerCase().includes(searchLower) ||
            (accessReq.email || "").toLowerCase().includes(searchLower) ||
            (accessReq.companyName || "").toLowerCase().includes(searchLower)
          )
        case "scheme_approval":
          const schemeReq = approval as SchemeApproval
          return (
            (schemeReq.schemeName || "").toLowerCase().includes(searchLower) ||
            (schemeReq.foremanName || "").toLowerCase().includes(searchLower)
          )
        case "document_verification":
          const docReq = approval as DocumentVerification
          return (
            (docReq.userName || "").toLowerCase().includes(searchLower) ||
            (docReq.documentType || "").toLowerCase().includes(searchLower)
          )
        case "user_registration":
          const userReq = approval as UserRegistration
          return (
            (userReq.userName || "").toLowerCase().includes(searchLower) ||
            (userReq.email || "").toLowerCase().includes(searchLower)
          )
        case "card_request":
          const cardReq = approval as CardRequest
          return (
            (cardReq.userName || "").toLowerCase().includes(searchLower) ||
            (cardReq.cardType || "").toLowerCase().includes(searchLower)
          )
        default:
          return false
      }
    })()

    const matchesStatus = statusFilter === "all" || approval.status === statusFilter
    const matchesCategory = categoryFilter === "all" || approval.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleApprove = (id: string) => {
    console.log(`Approving request ${id}`)
    // Here you would typically make an API call to approve the request
  }

  const handleReject = (id: string) => {
    console.log(`Rejecting request ${id}`)
    // Here you would typically make an API call to reject the request
  }

  const pendingCount = mockApprovals.filter((a) => a.status === "pending").length
  const approvedCount = mockApprovals.filter((a) => a.status === "approved").length
  const rejectedCount = mockApprovals.filter((a) => a.status === "rejected").length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">All Approvals</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">-2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Approvals</CardTitle>
          <CardDescription>Search and filter approval requests by category and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search approvals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="landing_page_access">Access Requests</SelectItem>
                <SelectItem value="scheme_approval">Scheme Approvals</SelectItem>
                <SelectItem value="document_verification">Document Verification</SelectItem>
                <SelectItem value="user_registration">User Registration</SelectItem>
                <SelectItem value="card_request">Card Requests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Approvals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Requests ({filteredApprovals.length})</CardTitle>
          <CardDescription>Manage all pending approval requests across the system</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredApprovals.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No approvals found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No approval requests at this time."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request Details</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApprovals.map((approval) => {
                  const IconComponent = getCategoryIcon(approval.category)
                  return (
                    <TableRow key={approval.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <IconComponent className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{getDisplayName(approval)}</div>
                            <div className="text-sm text-gray-500">{getDisplaySubtext(approval)}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(approval.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span>{getContactEmail(approval)}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{getContactPhone(approval)}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900">
                          {(() => {
                            let dateField = ""
                            switch (approval.category) {
                              case "landing_page_access":
                                dateField = (approval as AccessRequest).requestDate || ""
                                break
                              case "scheme_approval":
                                dateField = (approval as SchemeApproval).submissionDate || ""
                                break
                              case "document_verification":
                                dateField = (approval as DocumentVerification).submissionDate || ""
                                break
                              case "user_registration":
                                dateField = (approval as UserRegistration).registrationDate || ""
                                break
                              case "card_request":
                                dateField = (approval as CardRequest).requestDate || ""
                                break
                            }
                            return dateField ? new Date(dateField).toLocaleDateString() : "N/A"
                          })()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getPriorityColor(approval.priority || "low")}`}>
                          {(approval.priority || "low").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getStatusColor(approval.status || "pending")}`}>
                          {(approval.status || "pending").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedApproval(approval)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {approval.status === "pending" && (
                            <>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700 bg-transparent"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Approve Request</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to approve this request? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleApprove(approval.id)}>
                                      Approve
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 bg-transparent"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Reject Request</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to reject this request? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleReject(approval.id)}>
                                      Reject
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
