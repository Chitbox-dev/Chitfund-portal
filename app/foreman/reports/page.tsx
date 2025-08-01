"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Download,
  Search,
  Filter,
  TrendingUp,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for reports
const reportsData = [
  {
    id: "RPT001",
    schemeName: "Monthly Savings Scheme",
    schemeId: "SCH001",
    type: "Monthly",
    status: "Completed",
    generatedDate: "2024-01-15",
    subscribers: 25,
    totalAmount: "₹2,50,000",
    completionRate: "96%",
  },
  {
    id: "RPT002",
    schemeName: "Festival Special Chit",
    schemeId: "SCH002",
    type: "Quarterly",
    status: "Pending",
    generatedDate: "2024-01-10",
    subscribers: 18,
    totalAmount: "₹1,80,000",
    completionRate: "78%",
  },
  {
    id: "RPT003",
    schemeName: "Business Growth Fund",
    schemeId: "SCH003",
    type: "Annual",
    status: "Completed",
    generatedDate: "2024-01-08",
    subscribers: 40,
    totalAmount: "₹5,00,000",
    completionRate: "100%",
  },
  {
    id: "RPT004",
    schemeName: "Education Support Chit",
    schemeId: "SCH004",
    type: "Monthly",
    status: "Failed",
    generatedDate: "2024-01-05",
    subscribers: 12,
    totalAmount: "₹1,20,000",
    completionRate: "45%",
  },
]

const analyticsData = {
  totalReports: 156,
  completedReports: 142,
  pendingReports: 8,
  failedReports: 6,
  totalRevenue: "₹12,45,000",
  avgCompletionRate: "91.2%",
  monthlyGrowth: "+12.5%",
  subscriberGrowth: "+8.3%",
}

export default function ForemanReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredReports, setFilteredReports] = useState(reportsData)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    filterReports(value, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterReports(searchTerm, status)
  }

  const filterReports = (search: string, status: string) => {
    let filtered = reportsData

    if (search) {
      filtered = filtered.filter(
        (report) =>
          report.schemeName.toLowerCase().includes(search.toLowerCase()) ||
          report.schemeId.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((report) => report.status.toLowerCase() === status.toLowerCase())
    }

    setFilteredReports(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const downloadReport = (reportId: string) => {
    console.log(`Downloading report: ${reportId}`)
    // Implement download logic here
  }

  const downloadAllReports = () => {
    console.log("Downloading all reports")
    // Implement bulk download logic here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Scheme Reports</h1>
          <p className="text-gray-600 mt-1">Monitor and analyze your chit fund scheme performance</p>
        </div>
        <Button onClick={downloadAllReports} className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalReports}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              {analyticsData.monthlyGrowth} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.avgCompletionRate}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +15.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              {analyticsData.subscriberGrowth} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Reports Overview</CardTitle>
              <CardDescription>Detailed view of all scheme reports and their status</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by scheme name or ID..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Scheme Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subscribers</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{report.schemeName}</div>
                            <div className="text-sm text-gray-500">{report.schemeId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>{report.subscribers}</TableCell>
                        <TableCell className="font-medium">{report.totalAmount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: report.completionRate }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{report.completionRate}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(report.generatedDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => downloadReport(report.id)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="mt-6">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Monthly Reports</h3>
                <p className="text-gray-500">Monthly scheme reports will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="quarterly" className="mt-6">
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quarterly Reports</h3>
                <p className="text-gray-500">Quarterly scheme reports will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="annual" className="mt-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Annual Reports</h3>
                <p className="text-gray-500">Annual scheme reports will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
