"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Filter, Eye, CheckCircle, Clock, DollarSign, BarChart3 } from "lucide-react"

const mockSchemes = [
  {
    id: "SCH-001",
    schemeId: "SCH-1736859597000",
    name: "Gold Savings 50K",
    chitValue: "₹10,00,000",
    duration: "20 months",
    subscribers: 20,
    maxSubscribers: 20,
    monthlyPremium: "₹50,000",
    status: "live",
    foremanName: "Rajesh Kumar",
    foremanId: "FM001",
    startDate: "2025-01-01",
    endDate: "2025-08-01",
    currentMonth: 1,
    totalMonths: 20,
    psoNumber: "PSO-2025-001",
    form7Number: "FORM7-2025-001",
    createdDate: "2024-12-15",
    lastUpdated: "2025-01-14T10:30:00Z",
  },
  {
    id: "SCH-002",
    schemeId: "SCH-1736859598000",
    name: "Business Growth 100K",
    chitValue: "₹30,00,000",
    duration: "30 months",
    subscribers: 25,
    maxSubscribers: 30,
    monthlyPremium: "₹1,00,000",
    status: "submitted",
    foremanName: "Priya Sharma",
    foremanId: "FM002",
    startDate: "2025-02-01",
    endDate: "2027-07-01",
    currentMonth: 0,
    totalMonths: 30,
    createdDate: "2025-01-10",
    lastUpdated: "2025-01-14T09:15:00Z",
  },
  {
    id: "SCH-003",
    schemeId: "SCH-1736859599000",
    name: "Dream Home 200K",
    chitValue: "₹80,00,000",
    duration: "40 months",
    subscribers: 35,
    maxSubscribers: 40,
    monthlyPremium: "₹2,00,000",
    status: "live",
    foremanName: "Amit Patel",
    foremanId: "FM003",
    startDate: "2024-06-01",
    endDate: "2028-09-01",
    currentMonth: 8,
    totalMonths: 40,
    psoNumber: "PSO-2024-003",
    form7Number: "FORM7-2024-003",
    createdDate: "2024-05-15",
    lastUpdated: "2025-01-14T11:45:00Z",
  },
]

export default function AllSchemesPage() {
  const [schemes, setSchemes] = useState(mockSchemes)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Load schemes from localStorage
    const storedSchemes = localStorage.getItem("allSchemes")
    if (storedSchemes) {
      try {
        const parsedSchemes = JSON.parse(storedSchemes)
        setSchemes([...mockSchemes, ...parsedSchemes])
      } catch (error) {
        console.error("Error parsing schemes:", error)
      }
    }
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300"
      case "submitted":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300"
      case "pso_approved":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300"
      case "rejected":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300"
    }
  }

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.schemeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.foremanName.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesStatus = true
    if (activeTab === "pending") {
      matchesStatus = ["submitted", "pso_approved"].includes(scheme.status)
    } else if (activeTab === "active") {
      matchesStatus = scheme.status === "live"
    }

    const matchesFilter = statusFilter === "all" || scheme.status === statusFilter
    return matchesSearch && matchesStatus && matchesFilter
  })

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme)
  }

  const handleApproveScheme = (schemeId) => {
    const updatedSchemes = schemes.map((scheme) =>
      scheme.id === schemeId
        ? { ...scheme, status: "live", psoNumber: `PSO-2025-${Date.now().toString().slice(-6)}` }
        : scheme,
    )
    setSchemes(updatedSchemes)
    alert("Scheme approved successfully!")
  }

  const handleRejectScheme = (schemeId) => {
    const updatedSchemes = schemes.map((scheme) =>
      scheme.id === schemeId ? { ...scheme, status: "rejected" } : scheme,
    )
    setSchemes(updatedSchemes)
    alert("Scheme rejected.")
  }

  const stats = {
    total: schemes.length,
    live: schemes.filter((s) => s.status === "live").length,
    pending: schemes.filter((s) => ["submitted", "pso_approved"].includes(s.status)).length,
    rejected: schemes.filter((s) => s.status === "rejected").length,
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
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">All Schemes</h1>
                  <p className="text-sm text-gray-500">Manage and monitor all chit fund schemes</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Total: {stats.total}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Live: {stats.live}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Schemes</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Live Schemes</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.live}</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                    </div>
                    <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Value</p>
                      <p className="text-3xl font-bold text-gray-900">₹120L</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  All Schemes ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pending Approval ({stats.pending})
                </TabsTrigger>
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Active Schemes ({stats.live})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search schemes by name, ID, or foreman..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="pso_approved">PSO Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Schemes Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Schemes ({filteredSchemes.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Scheme Details</TableHead>
                          <TableHead>Foreman</TableHead>
                          <TableHead>Value & Duration</TableHead>
                          <TableHead>Subscribers</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSchemes.map((scheme) => (
                          <TableRow key={scheme.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{scheme.name}</p>
                                  <p className="text-sm text-gray-500">ID: {scheme.schemeId}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">{scheme.foremanName}</p>
                                <p className="text-sm text-gray-500">{scheme.foremanId}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">{scheme.chitValue}</p>
                                <p className="text-sm text-gray-500">{scheme.duration}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {scheme.subscribers}/{scheme.maxSubscribers}
                                </p>
                                <p className="text-sm text-gray-500">Monthly: {scheme.monthlyPremium}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {scheme.status === "live" ? (
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {scheme.currentMonth}/{scheme.totalMonths}
                                  </p>
                                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${(scheme.currentMonth / scheme.totalMonths) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Not started</p>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(scheme.status)}>
                                {scheme.status.replace(/_/g, " ").toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewDetails(scheme)}
                                  className="gap-1"
                                >
                                  <Eye className="h-3 w-3" />
                                  View
                                </Button>
                                {scheme.status === "submitted" && (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => handleApproveScheme(scheme.id)}
                                      className="gap-1 bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      <CheckCircle className="h-3 w-3" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleRejectScheme(scheme.id)}
                                      className="gap-1 text-red-600 hover:text-red-700"
                                    >
                                      Reject
                                    </Button>
                                  </>
                                )}
                                {scheme.status === "live" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => (window.location.href = `/admin/schemes/${scheme.schemeId}/reports`)}
                                    className="gap-1"
                                  >
                                    <BarChart3 className="h-3 w-3" />
                                    Reports
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

                {filteredSchemes.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Schemes Found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
