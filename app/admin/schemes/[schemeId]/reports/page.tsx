"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  FileText,
  Download,
  Upload,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  BarChart3,
  ArrowLeft,
  CheckCircle,
  Clock,
} from "lucide-react"

const generateMonthlyReports = (schemeId, totalMonths, currentMonth) => {
  const reports = []
  const startDate = new Date("2025-01-01")

  for (let i = 1; i <= Math.min(currentMonth, totalMonths); i++) {
    const reportDate = new Date(startDate)
    reportDate.setMonth(reportDate.getMonth() + (i - 1))

    reports.push({
      id: `${schemeId}-${i}`,
      chitId: schemeId,
      month: i,
      totalMonths: totalMonths,
      date: reportDate.toLocaleDateString(),
      monthYear: reportDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      progress: `${i}/${totalMonths}`,
      status: i <= currentMonth - 1 ? "completed" : "current",
      auctionDate: new Date(reportDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      reports: {
        subscriberPayment: i <= currentMonth - 1 ? "uploaded" : "pending",
        monthlyAuction: i <= currentMonth - 1 ? "uploaded" : "pending",
        dividendDistribution: i <= currentMonth - 1 ? "uploaded" : "pending",
        payoutTransaction: i <= currentMonth - 1 ? "uploaded" : "pending",
      },
    })
  }

  return reports
}

export default function SchemeReportsPage() {
  const params = useParams()
  const schemeId = params?.schemeId
  const [scheme, setScheme] = useState(null)
  const [monthlyReports, setMonthlyReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (schemeId) {
      // Mock scheme data - in real app, fetch from API
      const mockScheme = {
        id: schemeId,
        name: "Gold Savings 50K",
        chitValue: "₹10,00,000",
        duration: "20 months",
        subscribers: 20,
        maxSubscribers: 20,
        monthlyPremium: "₹50,000",
        status: "live",
        foremanName: "Rajesh Kumar",
        startDate: "2025-01-01",
        currentMonth: 3,
        totalMonths: 20,
        psoNumber: "PSO-2025-001",
      }

      setScheme(mockScheme)
      setMonthlyReports(generateMonthlyReports(schemeId, mockScheme.totalMonths, mockScheme.currentMonth))
      setLoading(false)
    }
  }, [schemeId])

  const handleUploadReport = (reportId, reportType) => {
    // Simulate file upload
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        // Update report status
        setMonthlyReports((prev) =>
          prev.map((report) =>
            report.id === reportId
              ? {
                  ...report,
                  reports: {
                    ...report.reports,
                    [reportType]: "uploaded",
                  },
                }
              : report,
          ),
        )
        alert(`${reportType.replace(/([A-Z])/g, " $1").toLowerCase()} report uploaded successfully!`)
      }
    }
    input.click()
  }

  const handleDownloadReport = (reportId, reportType) => {
    // Simulate download
    alert(`Downloading ${reportType.replace(/([A-Z])/g, " $1").toLowerCase()} report...`)
  }

  const getReportStatusColor = (status) => {
    switch (status) {
      case "uploaded":
        return "bg-green-100 text-green-800 border-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scheme reports...</p>
        </div>
      </div>
    )
  }

  if (!scheme) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Scheme Not Found</h3>
          <p className="text-gray-500">The requested scheme could not be found.</p>
        </div>
      </div>
    )
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
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/schemes">All Schemes</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Monthly Reports</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Live Scheme
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Scheme Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  {scheme.name} - Monthly Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Chit Value</span>
                    </div>
                    <p className="text-xl font-bold text-blue-900">{scheme.chitValue}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Subscribers</span>
                    </div>
                    <p className="text-xl font-bold text-green-900">
                      {scheme.subscribers}/{scheme.maxSubscribers}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">Progress</span>
                    </div>
                    <p className="text-xl font-bold text-purple-900">
                      {scheme.currentMonth}/{scheme.totalMonths}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-600">Monthly Premium</span>
                    </div>
                    <p className="text-xl font-bold text-orange-900">{scheme.monthlyPremium}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Reports Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Report Cards
                  </span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {monthlyReports.length} Reports Generated
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month Details</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Auction Date</TableHead>
                      <TableHead>Subscriber Payment</TableHead>
                      <TableHead>Monthly Auction</TableHead>
                      <TableHead>Dividend Distribution</TableHead>
                      <TableHead>Payout Transaction</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {scheme.id}: {report.date}
                            </p>
                            <p className="text-sm text-gray-500">{report.monthYear}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{report.progress}</span>
                            {report.status === "completed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                            {report.status === "current" && <Clock className="h-4 w-4 text-blue-600" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{report.auctionDate}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={getReportStatusColor(report.reports.subscriberPayment)}>
                              {report.reports.subscriberPayment}
                            </Badge>
                            {report.reports.subscriberPayment === "uploaded" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadReport(report.id, "subscriberPayment")}
                                className="gap-1"
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUploadReport(report.id, "subscriberPayment")}
                                className="gap-1"
                              >
                                <Upload className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={getReportStatusColor(report.reports.monthlyAuction)}>
                              {report.reports.monthlyAuction}
                            </Badge>
                            {report.reports.monthlyAuction === "uploaded" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadReport(report.id, "monthlyAuction")}
                                className="gap-1"
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUploadReport(report.id, "monthlyAuction")}
                                className="gap-1"
                              >
                                <Upload className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={getReportStatusColor(report.reports.dividendDistribution)}>
                              {report.reports.dividendDistribution}
                            </Badge>
                            {report.reports.dividendDistribution === "uploaded" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadReport(report.id, "dividendDistribution")}
                                className="gap-1"
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUploadReport(report.id, "dividendDistribution")}
                                className="gap-1"
                              >
                                <Upload className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={getReportStatusColor(report.reports.payoutTransaction)}>
                              {report.reports.payoutTransaction}
                            </Badge>
                            {report.reports.payoutTransaction === "uploaded" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadReport(report.id, "payoutTransaction")}
                                className="gap-1"
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUploadReport(report.id, "payoutTransaction")}
                                className="gap-1"
                              >
                                <Upload className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                              Update
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
