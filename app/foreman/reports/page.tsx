"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
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
  Search,
  Download,
  Eye,
  FileText,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// Mock data for reports
const mockReports = [
  {
    id: 1,
    schemeName: "Gold Savings 50K",
    schemeId: "GS50K-001",
    reportType: "Monthly",
    generatedDate: "2024-01-15",
    period: "January 2024",
    status: "completed",
    totalCollection: 1000000,
    subscribers: 20,
    completionRate: 95,
    pendingPayments: 1,
  },
  {
    id: 2,
    schemeName: "Business Growth 100K",
    schemeId: "BG100K-002",
    reportType: "Quarterly",
    generatedDate: "2024-01-10",
    period: "Q4 2023",
    status: "completed",
    totalCollection: 3000000,
    subscribers: 30,
    completionRate: 88,
    pendingPayments: 4,
  },
  {
    id: 3,
    schemeName: "Dream Home 200K",
    schemeId: "DH200K-003",
    reportType: "Annual",
    generatedDate: "2024-01-05",
    period: "2023",
    status: "completed",
    totalCollection: 8000000,
    subscribers: 40,
    completionRate: 100,
    pendingPayments: 0,
  },
  {
    id: 4,
    schemeName: "Education Fund 75K",
    schemeId: "EF75K-004",
    reportType: "Monthly",
    generatedDate: "2024-01-20",
    period: "January 2024",
    status: "pending",
    totalCollection: 0,
    subscribers: 15,
    completionRate: 0,
    pendingPayments: 15,
  },
  {
    id: 5,
    schemeName: "Wedding Fund 150K",
    schemeId: "WF150K-005",
    reportType: "Monthly",
    generatedDate: "2024-01-12",
    period: "January 2024",
    status: "failed",
    totalCollection: 2250000,
    subscribers: 25,
    completionRate: 75,
    pendingPayments: 8,
  },
]

export default function ForemanReports() {
  const [reports, setReports] = useState(mockReports)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.schemeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesTab = activeTab === "all" || report.reportType.toLowerCase() === activeTab
    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate analytics
  const totalReports = reports.length
  const completedReports = reports.filter((r) => r.status === "completed").length
  const pendingReports = reports.filter((r) => r.status === "pending").length
  const failedReports = reports.filter((r) => r.status === "failed").length
  const completionRate = totalReports > 0 ? Math.round((completedReports / totalReports) * 100) : 0
  const totalRevenue = reports.reduce((sum, report) => sum + report.totalCollection, 0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-4 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 sm:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/foreman" className="text-sm sm:text-base">
                Foreman Portal
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm sm:text-base">Reports</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalReports}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+12%</span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{completionRate}%</p>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+5%</span>
                    <span className="text-gray-500 ml-1">improvement</span>
                  </div>
                </div>
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+8%</span>
                    <span className="text-gray-500 ml-1">this quarter</span>
                  </div>
                </div>
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{pendingReports}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-600 font-medium">-3</span>
                    <span className="text-gray-500 ml-1">from last week</span>
                  </div>
                </div>
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by scheme name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white border shadow-sm">
            <TabsTrigger value="all" className="gap-2">
              <FileText className="h-4 w-4" />
              All Reports
            </TabsTrigger>
            <TabsTrigger value="monthly" className="gap-2">
              <Calendar className="h-4 w-4" />
              Monthly
            </TabsTrigger>
            <TabsTrigger value="quarterly" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Quarterly
            </TabsTrigger>
            <TabsTrigger value="annual" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Annual
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Reports Overview</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {filteredReports.length} Reports
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Scheme Details</TableHead>
                        <TableHead>Type & Period</TableHead>
                        <TableHead>Collection</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{report.schemeName}</p>
                              <p className="text-sm text-gray-500">{report.schemeId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{report.reportType}</p>
                              <p className="text-sm text-gray-500">{report.period}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{formatCurrency(report.totalCollection)}</p>
                              <p className="text-sm text-gray-500">{report.subscribers} subscribers</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{report.completionRate}%</span>
                                <span className="text-gray-500">{report.pendingPayments} pending</span>
                              </div>
                              <Progress value={report.completionRate} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(report.status)} font-medium`}>
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                                <Download className="h-3 w-3" />
                                Download
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Empty State */}
                {filteredReports.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
