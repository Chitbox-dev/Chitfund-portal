"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Upload,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Search,
  RefreshCw,
} from "lucide-react"

interface MonthlyReport {
  id: string
  reportType: "subscriber_premium" | "monthly_auction" | "dividend_distribution" | "payout_distribution"
  schemeId: string
  schemeName: string
  foremanName: string
  reportMonth: string
  reportYear: number
  status: "pending" | "submitted" | "approved" | "rejected" | "overdue"
  submittedDate?: string
  reviewedDate?: string
  reviewedBy?: string
  comments?: string
  attachments?: string[]
  data: any
}

const sampleReports: MonthlyReport[] = [
  {
    id: "RPT001",
    reportType: "subscriber_premium",
    schemeId: "SCH001",
    schemeName: "Monthly Savings Scheme",
    foremanName: "Rajesh Kumar",
    reportMonth: "January",
    reportYear: 2025,
    status: "submitted",
    submittedDate: "2025-01-25",
    attachments: ["premium_collection_jan2025.pdf"],
    data: {
      totalSubscribers: 20,
      premiumCollected: 200000,
      pendingAmount: 15000,
      collectionRate: 92.5,
    },
  },
  {
    id: "RPT002",
    reportType: "monthly_auction",
    schemeId: "SCH002",
    schemeName: "Business Growth Scheme",
    foremanName: "Priya Sharma",
    reportMonth: "January",
    reportYear: 2025,
    status: "approved",
    submittedDate: "2025-01-20",
    reviewedDate: "2025-01-22",
    reviewedBy: "Admin",
    attachments: ["auction_report_jan2025.pdf"],
    data: {
      auctionDate: "2025-01-15",
      winnerName: "Amit Patel",
      winningBid: 85000,
      commission: 8500,
      participants: 18,
    },
  },
  {
    id: "RPT003",
    reportType: "dividend_distribution",
    schemeId: "SCH001",
    schemeName: "Monthly Savings Scheme",
    foremanName: "Rajesh Kumar",
    reportMonth: "December",
    reportYear: 2024,
    status: "pending",
    data: {
      totalDividend: 50000,
      perSubscriberAmount: 2500,
      distributionDate: "2024-12-30",
      beneficiaries: 20,
    },
  },
  {
    id: "RPT004",
    reportType: "payout_distribution",
    schemeId: "SCH003",
    schemeName: "Family Welfare Scheme",
    foremanName: "Amit Patel",
    reportMonth: "January",
    reportYear: 2025,
    status: "overdue",
    data: {
      payoutAmount: 150000,
      recipientName: "Meera Reddy",
      payoutDate: "2025-01-10",
      processingFee: 1500,
    },
  },
]

export function MonthlyReportsDashboard() {
  const [reports, setReports] = useState<MonthlyReport[]>(sampleReports)
  const [selectedReport, setSelectedReport] = useState<MonthlyReport | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("all")
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewComments, setReviewComments] = useState("")
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">("approve")

  useEffect(() => {
    const savedReports = localStorage.getItem("monthlyReports")
    if (savedReports) {
      try {
        setReports(JSON.parse(savedReports))
      } catch (error) {
        console.error("Error loading reports:", error)
      }
    }
  }, [])

  const saveReports = (updatedReports: MonthlyReport[]) => {
    setReports(updatedReports)
    localStorage.setItem("monthlyReports", JSON.stringify(updatedReports))
  }

  const handleReviewReport = (reportId: string, action: "approve" | "reject", comments: string) => {
    const updatedReports = reports.map((report) =>
      report.id === reportId
        ? {
            ...report,
            status: action === "approve" ? "approved" : "rejected",
            reviewedDate: new Date().toISOString().split("T")[0],
            reviewedBy: "Admin",
            comments: comments,
          }
        : report,
    )
    saveReports(updatedReports)
    setIsReviewDialogOpen(false)
    setReviewComments("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300"
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case "subscriber_premium":
        return "Subscriber Premium"
      case "monthly_auction":
        return "Monthly Auction"
      case "dividend_distribution":
        return "Dividend Distribution"
      case "payout_distribution":
        return "Payout Distribution"
      default:
        return type
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.foremanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesMonth = monthFilter === "all" || report.reportMonth === monthFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && ["pending", "submitted"].includes(report.status)) ||
      (activeTab === "approved" && report.status === "approved") ||
      (activeTab === "rejected" && report.status === "rejected") ||
      (activeTab === "overdue" && report.status === "overdue")

    return matchesSearch && matchesStatus && matchesMonth && matchesTab
  })

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => ["pending", "submitted"].includes(r.status)).length,
    approved: reports.filter((r) => r.status === "approved").length,
    rejected: reports.filter((r) => r.status === "rejected").length,
    overdue: reports.filter((r) => r.status === "overdue").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monthly Reports Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and review monthly scheme reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Template
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
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
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-3xl font-bold text-gray-900">{stats.overdue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
          <TabsTrigger value="all">All Reports ({stats.total})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({stats.overdue})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by scheme name, foreman, or report ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={monthFilter} onValueChange={setMonthFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Details</TableHead>
                    <TableHead>Scheme Information</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{report.id}</span>
                          </div>
                          <p className="text-sm text-gray-600">{getReportTypeLabel(report.reportType)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{report.schemeName}</p>
                          <p className="text-sm text-gray-600">by {report.foremanName}</p>
                          <p className="text-xs text-gray-500">{report.schemeId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {report.reportMonth} {report.reportYear}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            Monthly Report
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>{report.status.toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {report.submittedDate && (
                            <p className="text-sm">{new Date(report.submittedDate).toLocaleDateString()}</p>
                          )}
                          {report.reviewedDate && (
                            <p className="text-xs text-gray-500">
                              Reviewed: {new Date(report.reviewedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Report Details - {report.id}</DialogTitle>
                                <DialogDescription>
                                  {getReportTypeLabel(report.reportType)} for {report.schemeName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <Label className="text-sm font-medium">Scheme Information</Label>
                                      <div className="mt-1 space-y-1">
                                        <p className="text-sm">Name: {report.schemeName}</p>
                                        <p className="text-sm">ID: {report.schemeId}</p>
                                        <p className="text-sm">Foreman: {report.foremanName}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Report Period</Label>
                                      <div className="mt-1">
                                        <p className="text-sm">
                                          {report.reportMonth} {report.reportYear}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <Label className="text-sm font-medium">Status</Label>
                                      <div className="mt-1">
                                        <Badge className={getStatusColor(report.status)}>
                                          {report.status.toUpperCase()}
                                        </Badge>
                                      </div>
                                    </div>
                                    {report.attachments && report.attachments.length > 0 && (
                                      <div>
                                        <Label className="text-sm font-medium">Attachments</Label>
                                        <div className="mt-1 space-y-1">
                                          {report.attachments.map((attachment, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                              <FileText className="h-4 w-4 text-blue-600" />
                                              <span className="text-sm">{attachment}</span>
                                              <Button variant="outline" size="sm">
                                                <Download className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Report Data */}
                                <div>
                                  <Label className="text-sm font-medium">Report Data</Label>
                                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                    <pre className="text-sm">{JSON.stringify(report.data, null, 2)}</pre>
                                  </div>
                                </div>

                                {report.comments && (
                                  <div>
                                    <Label className="text-sm font-medium">Review Comments</Label>
                                    <div className="mt-1 p-3 bg-blue-50 rounded-lg">
                                      <p className="text-sm">{report.comments}</p>
                                      {report.reviewedBy && report.reviewedDate && (
                                        <p className="text-xs text-gray-500 mt-2">
                                          By {report.reviewedBy} on {new Date(report.reviewedDate).toLocaleDateString()}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {report.status === "submitted" && (
                                  <div className="flex gap-3">
                                    <Button
                                      onClick={() => {
                                        setSelectedReport(report)
                                        setReviewAction("approve")
                                        setIsReviewDialogOpen(true)
                                      }}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve Report
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setSelectedReport(report)
                                        setReviewAction("reject")
                                        setIsReviewDialogOpen(true)
                                      }}
                                      className="text-red-600 border-red-300 hover:bg-red-50"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject Report
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          {report.status === "submitted" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedReport(report)
                                  setReviewAction("approve")
                                  setIsReviewDialogOpen(true)
                                }}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedReport(report)
                                  setReviewAction("reject")
                                  setIsReviewDialogOpen(true)
                                }}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reports Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{reviewAction === "approve" ? "Approve Report" : "Reject Report"}</DialogTitle>
            <DialogDescription>
              {reviewAction === "approve"
                ? "Provide approval comments for this report"
                : "Provide rejection reason for this report"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="review-comments">
                {reviewAction === "approve" ? "Approval Comments" : "Rejection Reason"}
              </Label>
              <Textarea
                id="review-comments"
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                placeholder={
                  reviewAction === "approve" ? "Enter approval comments..." : "Enter reason for rejection..."
                }
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedReport) {
                    handleReviewReport(selectedReport.id, reviewAction, reviewComments)
                  }
                }}
                className={
                  reviewAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }
              >
                {reviewAction === "approve" ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Report
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Report
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
