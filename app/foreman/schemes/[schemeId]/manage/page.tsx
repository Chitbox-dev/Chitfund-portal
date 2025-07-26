"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ForemanSidebar } from "@/components/foreman/foreman-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  AlertCircle,
  Eye,
  Edit,
} from "lucide-react"

const generateMonthlyReports = (schemeId, totalMonths, currentMonth) => {
  const reports = []
  const startDate = new Date("2025-01-01")

  for (let i = 1; i <= Math.min(currentMonth + 2, totalMonths); i++) {
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
      status: i < currentMonth ? "completed" : i === currentMonth ? "current" : "upcoming",
      auctionDate: new Date(reportDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      reports: {
        subscriberPayment: i < currentMonth ? "uploaded" : i === currentMonth ? "pending" : "not_due",
        monthlyAuction: i < currentMonth ? "uploaded" : i === currentMonth ? "pending" : "not_due",
        dividendDistribution: i < currentMonth ? "uploaded" : i === currentMonth ? "pending" : "not_due",
        payoutTransaction: i < currentMonth ? "uploaded" : i === currentMonth ? "pending" : "not_due",
      },
    })
  }

  return reports
}

export default function ManageSchemePage() {
  const params = useParams()
  const schemeId = params?.schemeId
  const [scheme, setScheme] = useState(null)
  const [monthlyReports, setMonthlyReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

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
        subscribersList: [
          { id: 1, name: "Anita Sharma", ucfsin: "KA-HSD-7A2-978", ticketNumber: 1, status: "active" },
          { id: 2, name: "Ravi Kumar", ucfsin: "KA-ABC-1B3-456", ticketNumber: 2, status: "active" },
          { id: 3, name: "Meera Patel", ucfsin: "KA-DEF-2C4-789", ticketNumber: 3, status: "active" },
        ],
      }

      setScheme(mockScheme)
      setMonthlyReports(generateMonthlyReports(schemeId, mockScheme.totalMonths, mockScheme.currentMonth))
      setLoading(false)
    }
  }, [schemeId])

  const handleUploadReport = (reportId, reportType) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
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
    alert(`Downloading ${reportType.replace(/([A-Z])/g, " $1").toLowerCase()} report...`)
  }

  const getReportStatusColor = (status) => {
    switch (status) {
      case "uploaded":
        return "bg-green-100 text-green-800 border-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "not_due":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  if (loading) {
    return (
      <SidebarProvider>
        <ForemanSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading scheme details...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  if (!scheme) {
    return (
      <SidebarProvider>
        <ForemanSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Scheme Not Found</h3>
              <p className="text-gray-500">The requested scheme could not be found.</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

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
                <BreadcrumbLink href="/foreman/schemes">My Schemes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Manage Scheme</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex gap-2">
            <Button onClick={() => window.history.back()} variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6 bg-gray-50">
          {/* Scheme Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                {scheme.name} - Management Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="subscribers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Subscribers
              </TabsTrigger>
              <TabsTrigger value="monthly-reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Monthly Reports
              </TabsTrigger>
              <TabsTrigger value="auction-reports" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Auction Reports
              </TabsTrigger>
              <TabsTrigger value="dividend-reports" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Dividend Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheme Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Completed Months</span>
                        <span>
                          {scheme.currentMonth - 1}/{scheme.totalMonths}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${((scheme.currentMonth - 1) / scheme.totalMonths) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Current Month: {scheme.currentMonth} of {scheme.totalMonths}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full gap-2 bg-transparent" variant="outline">
                      <Upload className="h-4 w-4" />
                      Upload Monthly Report
                    </Button>
                    <Button className="w-full gap-2 bg-transparent" variant="outline">
                      <Calendar className="h-4 w-4" />
                      Schedule Auction
                    </Button>
                    <Button className="w-full gap-2 bg-transparent" variant="outline">
                      <DollarSign className="h-4 w-4" />
                      Process Dividend
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subscribers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Subscriber List</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {scheme.subscribersList?.length || 0} Subscribers
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket #</TableHead>
                        <TableHead>Subscriber Name</TableHead>
                        <TableHead>UCFSIN</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scheme.subscribersList?.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell>
                            <div className="font-mono bg-gray-100 px-2 py-1 rounded text-center w-12">
                              {subscriber.ticketNumber.toString().padStart(2, "0")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{subscriber.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-mono text-sm bg-blue-50 px-2 py-1 rounded">{subscriber.ucfsin}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 border-green-300">{subscriber.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly-reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Subscriber Monthly Payment Reports
                    </span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {monthlyReports.length} Reports
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month Details</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Report Status</TableHead>
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
                              {report.status === "upcoming" && <AlertCircle className="h-4 w-4 text-gray-400" />}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getReportStatusColor(report.reports.subscriberPayment)}>
                              {report.reports.subscriberPayment.replace(/_/g, " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {report.reports.subscriberPayment === "uploaded" ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownloadReport(report.id, "subscriberPayment")}
                                  className="gap-1"
                                >
                                  <Download className="h-3 w-3" />
                                  Download
                                </Button>
                              ) : report.reports.subscriberPayment === "pending" ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUploadReport(report.id, "subscriberPayment")}
                                  className="gap-1"
                                >
                                  <Upload className="h-3 w-3" />
                                  Upload
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" disabled className="gap-1 bg-transparent">
                                  <Clock className="h-3 w-3" />
                                  Not Due
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="auction-reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Monthly Auction Reports
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month Details</TableHead>
                        <TableHead>Auction Date</TableHead>
                        <TableHead>Report Status</TableHead>
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
                            <p className="text-sm text-gray-900">{report.auctionDate}</p>
                          </TableCell>
                          <TableCell>
                            <Badge className={getReportStatusColor(report.reports.monthlyAuction)}>
                              {report.reports.monthlyAuction.replace(/_/g, " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {report.reports.monthlyAuction === "uploaded" ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownloadReport(report.id, "monthlyAuction")}
                                  className="gap-1"
                                >
                                  <Download className="h-3 w-3" />
                                  Download
                                </Button>
                              ) : report.reports.monthlyAuction === "pending" ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUploadReport(report.id, "monthlyAuction")}
                                  className="gap-1"
                                >
                                  <Upload className="h-3 w-3" />
                                  Upload
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" disabled className="gap-1 bg-transparent">
                                  <Clock className="h-3 w-3" />
                                  Not Due
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dividend-reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Dividend Distribution & Payout Reports
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month Details</TableHead>
                        <TableHead>Dividend Status</TableHead>
                        <TableHead>Payout Status</TableHead>
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
                            <Badge className={getReportStatusColor(report.reports.dividendDistribution)}>
                              {report.reports.dividendDistribution.replace(/_/g, " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getReportStatusColor(report.reports.payoutTransaction)}>
                              {report.reports.payoutTransaction.replace(/_/g, " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {report.reports.dividendDistribution === "pending" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUploadReport(report.id, "dividendDistribution")}
                                  className="gap-1"
                                >
                                  <Upload className="h-3 w-3" />
                                  Upload Dividend
                                </Button>
                              )}
                              {report.reports.payoutTransaction === "pending" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUploadReport(report.id, "payoutTransaction")}
                                  className="gap-1"
                                >
                                  <Upload className="h-3 w-3" />
                                  Upload Payout
                                </Button>
                              )}
                              {(report.reports.dividendDistribution === "uploaded" ||
                                report.reports.payoutTransaction === "uploaded") && (
                                <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                                  <Download className="h-3 w-3" />
                                  Download
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
