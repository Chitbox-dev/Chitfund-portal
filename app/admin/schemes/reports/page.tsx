"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Users, CheckCircle, Clock, AlertTriangle, Download, Eye, Search, Filter } from "lucide-react"

// Mock data for scheme reports
const mockSchemes = [
  {
    id: "SCH001",
    schemeName: "Premium Gold Chit Fund",
    foremanName: "Rajesh Kumar",
    status: "active",
    chitValue: 2000000,
    monthlyPremium: 85000,
    currentMonth: 8,
    totalMonths: 24,
    subscribersCount: 18,
    maxSubscribers: 20,
    startDate: "2023-06-15",
    nextReportDue: "2024-02-15",
    reportStatus: "current",
    lastReportDate: "2024-01-15",
  },
  {
    id: "SCH002",
    schemeName: "Silver Business Chit",
    foremanName: "Priya Sharma",
    status: "active",
    chitValue: 1000000,
    monthlyPremium: 42500,
    currentMonth: 12,
    totalMonths: 20,
    subscribersCount: 20,
    maxSubscribers: 20,
    startDate: "2023-02-10",
    nextReportDue: "2024-02-10",
    reportStatus: "pending",
    lastReportDate: "2024-01-10",
  },
  {
    id: "SCH003",
    schemeName: "Diamond Elite Fund",
    foremanName: "Amit Patel",
    status: "completed",
    chitValue: 5000000,
    monthlyPremium: 210000,
    currentMonth: 24,
    totalMonths: 24,
    subscribersCount: 25,
    maxSubscribers: 25,
    startDate: "2022-01-01",
    nextReportDue: "N/A",
    reportStatus: "completed",
    lastReportDate: "2023-12-31",
  },
  {
    id: "SCH004",
    schemeName: "Quick Cash Chit",
    foremanName: "Sunita Reddy",
    status: "active",
    chitValue: 500000,
    monthlyPremium: 42000,
    currentMonth: 2,
    totalMonths: 12,
    subscribersCount: 10,
    maxSubscribers: 12,
    startDate: "2023-12-01",
    nextReportDue: "2024-01-25",
    reportStatus: "overdue",
    lastReportDate: "2023-12-25",
  },
]

export default function SchemeReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter schemes based on search and status
  let filteredSchemes = mockSchemes

  if (searchTerm) {
    filteredSchemes = filteredSchemes.filter(
      (scheme) =>
        scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.foremanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (statusFilter !== "all") {
    filteredSchemes = filteredSchemes.filter((scheme) => scheme.status === statusFilter)
  }

  // Calculate statistics
  const totalSchemes = mockSchemes.length
  const activeSchemes = mockSchemes.filter((s) => s.status === "active").length
  const completedSchemes = mockSchemes.filter((s) => s.status === "completed").length
  const pendingReports = mockSchemes.filter((s) => s.reportStatus === "pending").length
  const overdueReports = mockSchemes.filter((s) => s.reportStatus === "overdue").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getReportStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    if (dateString === "N/A") return "N/A"
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scheme Reports</h1>
        <p className="text-muted-foreground">Monitor and manage reports for all chit fund schemes</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Schemes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSchemes}</div>
            <p className="text-xs text-muted-foreground">All registered schemes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Schemes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeSchemes}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{completedSchemes}</div>
            <p className="text-xs text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingReports}</div>
            <p className="text-xs text-muted-foreground">Reports due soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueReports}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Scheme Reports Overview</CardTitle>
          <CardDescription>View and manage monthly reports for all chit fund schemes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes, foremen, or scheme IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>

          {/* Schemes Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scheme Details</TableHead>
                  <TableHead>Foreman</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Financial Info</TableHead>
                  <TableHead>Subscribers</TableHead>
                  <TableHead>Report Status</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchemes.map((scheme) => (
                  <TableRow key={scheme.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{scheme.schemeName}</div>
                        <div className="text-sm text-muted-foreground">ID: {scheme.id}</div>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(scheme.status)}`}>
                          {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{scheme.foremanName}</div>
                        <div className="text-sm text-muted-foreground">Started: {formatDate(scheme.startDate)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="text-sm">
                          {scheme.currentMonth}/{scheme.totalMonths} months
                        </div>
                        <Progress value={(scheme.currentMonth / scheme.totalMonths) * 100} className="w-20" />
                        <div className="text-xs text-muted-foreground">
                          {Math.round((scheme.currentMonth / scheme.totalMonths) * 100)}% complete
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{formatCurrency(scheme.chitValue)}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(scheme.monthlyPremium)}/month
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">
                          {scheme.subscribersCount}/{scheme.maxSubscribers}
                        </div>
                        <div className="text-xs text-muted-foreground">subscribers</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getReportStatusIcon(scheme.reportStatus)}
                        <span className="text-sm capitalize">{scheme.reportStatus}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Last: {formatDate(scheme.lastReportDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(scheme.nextReportDue)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No schemes found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
