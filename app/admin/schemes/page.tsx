"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  TrendingUp,
  Download,
  RefreshCw,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data for schemes
const mockSchemes = [
  {
    id: "SCH001",
    name: "Premium Gold Scheme",
    foreman: "Rajesh Kumar",
    foremanId: "FOR001",
    amount: 100000,
    duration: 20,
    subscribers: 18,
    maxSubscribers: 20,
    status: "active",
    startDate: "2024-01-15",
    nextAuction: "2024-02-15",
    completedAuctions: 3,
    totalCollection: 300000,
    pendingAmount: 50000,
    location: "Mumbai",
    category: "gold",
    riskLevel: "low",
  },
  {
    id: "SCH002",
    name: "Silver Investment Plan",
    foreman: "Priya Sharma",
    foremanId: "FOR002",
    amount: 50000,
    duration: 12,
    subscribers: 12,
    maxSubscribers: 12,
    status: "completed",
    startDate: "2023-06-01",
    nextAuction: null,
    completedAuctions: 12,
    totalCollection: 600000,
    pendingAmount: 0,
    location: "Delhi",
    category: "silver",
    riskLevel: "low",
  },
  {
    id: "SCH003",
    name: "Business Growth Fund",
    foreman: "Amit Patel",
    foremanId: "FOR003",
    amount: 200000,
    duration: 24,
    subscribers: 15,
    maxSubscribers: 24,
    status: "pending_approval",
    startDate: "2024-03-01",
    nextAuction: null,
    completedAuctions: 0,
    totalCollection: 0,
    pendingAmount: 0,
    location: "Ahmedabad",
    category: "business",
    riskLevel: "medium",
  },
  {
    id: "SCH004",
    name: "Emergency Fund Scheme",
    foreman: "Sunita Reddy",
    foremanId: "FOR004",
    amount: 25000,
    duration: 10,
    subscribers: 8,
    maxSubscribers: 10,
    status: "suspended",
    startDate: "2024-01-01",
    nextAuction: null,
    completedAuctions: 2,
    totalCollection: 50000,
    pendingAmount: 15000,
    location: "Hyderabad",
    category: "emergency",
    riskLevel: "high",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  pending_approval: "bg-yellow-100 text-yellow-800",
  suspended: "bg-red-100 text-red-800",
}

const riskColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

export default function AdminSchemesPage() {
  const [schemes, setSchemes] = useState(mockSchemes)
  const [filteredSchemes, setFilteredSchemes] = useState(mockSchemes)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filter schemes based on search and status
  useEffect(() => {
    let filtered = schemes

    if (searchTerm) {
      filtered = filtered.filter(
        (scheme) =>
          scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scheme.foreman.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scheme.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((scheme) => scheme.status === statusFilter)
    }

    setFilteredSchemes(filtered)
  }, [searchTerm, statusFilter, schemes])

  const handleApproveScheme = (schemeId) => {
    setIsLoading(true)
    setTimeout(() => {
      setSchemes((prev) => prev.map((scheme) => (scheme.id === schemeId ? { ...scheme, status: "active" } : scheme)))
      setIsLoading(false)
      toast({
        title: "Scheme Approved",
        description: "The scheme has been approved and is now active.",
      })
    }, 1000)
  }

  const handleRejectScheme = (schemeId) => {
    setIsLoading(true)
    setTimeout(() => {
      setSchemes((prev) => prev.map((scheme) => (scheme.id === schemeId ? { ...scheme, status: "suspended" } : scheme)))
      setIsLoading(false)
      toast({
        title: "Scheme Rejected",
        description: "The scheme has been rejected and suspended.",
        variant: "destructive",
      })
    }, 1000)
  }

  const handleSuspendScheme = (schemeId) => {
    setIsLoading(true)
    setTimeout(() => {
      setSchemes((prev) => prev.map((scheme) => (scheme.id === schemeId ? { ...scheme, status: "suspended" } : scheme)))
      setIsLoading(false)
      toast({
        title: "Scheme Suspended",
        description: "The scheme has been suspended.",
        variant: "destructive",
      })
    }, 1000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending_approval":
        return <Clock className="h-4 w-4" />
      case "suspended":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const stats = {
    total: schemes.length,
    active: schemes.filter((s) => s.status === "active").length,
    pending: schemes.filter((s) => s.status === "pending_approval").length,
    completed: schemes.filter((s) => s.status === "completed").length,
    suspended: schemes.filter((s) => s.status === "suspended").length,
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Scheme Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Schemes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Schemes</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, foreman, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="status">Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schemes Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Schemes ({filteredSchemes.length})</CardTitle>
          <CardDescription>Manage and monitor all chit fund schemes in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scheme Details</TableHead>
                <TableHead>Foreman</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchemes.map((scheme) => (
                <TableRow key={scheme.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{scheme.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {scheme.id} • {scheme.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{scheme.foreman}</div>
                      <div className="text-sm text-muted-foreground">ID: {scheme.foremanId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">₹{scheme.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{scheme.duration} months</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {scheme.subscribers}/{scheme.maxSubscribers} subscribers
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {scheme.completedAuctions}/{scheme.duration} auctions
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[scheme.status]}>
                      {getStatusIcon(scheme.status)}
                      <span className="ml-1 capitalize">{scheme.status.replace("_", " ")}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={riskColors[scheme.riskLevel]}>{scheme.riskLevel.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedScheme(scheme)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Scheme Details - {selectedScheme?.name}</DialogTitle>
                            <DialogDescription>Complete information about the scheme</DialogDescription>
                          </DialogHeader>
                          {selectedScheme && (
                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="financial">Financial</TabsTrigger>
                                <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                                <TabsTrigger value="auctions">Auctions</TabsTrigger>
                              </TabsList>
                              <TabsContent value="overview" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Scheme Name</Label>
                                    <p className="text-sm font-medium">{selectedScheme.name}</p>
                                  </div>
                                  <div>
                                    <Label>Scheme ID</Label>
                                    <p className="text-sm font-medium">{selectedScheme.id}</p>
                                  </div>
                                  <div>
                                    <Label>Foreman</Label>
                                    <p className="text-sm font-medium">{selectedScheme.foreman}</p>
                                  </div>
                                  <div>
                                    <Label>Location</Label>
                                    <p className="text-sm font-medium">{selectedScheme.location}</p>
                                  </div>
                                  <div>
                                    <Label>Start Date</Label>
                                    <p className="text-sm font-medium">
                                      {new Date(selectedScheme.startDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Duration</Label>
                                    <p className="text-sm font-medium">{selectedScheme.duration} months</p>
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="financial" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Scheme Amount</Label>
                                    <p className="text-sm font-medium">₹{selectedScheme.amount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label>Total Collection</Label>
                                    <p className="text-sm font-medium">
                                      ₹{selectedScheme.totalCollection.toLocaleString()}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Pending Amount</Label>
                                    <p className="text-sm font-medium">
                                      ₹{selectedScheme.pendingAmount.toLocaleString()}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Risk Level</Label>
                                    <Badge className={riskColors[selectedScheme.riskLevel]}>
                                      {selectedScheme.riskLevel.toUpperCase()}
                                    </Badge>
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="subscribers" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Current Subscribers</Label>
                                    <p className="text-sm font-medium">{selectedScheme.subscribers}</p>
                                  </div>
                                  <div>
                                    <Label>Maximum Subscribers</Label>
                                    <p className="text-sm font-medium">{selectedScheme.maxSubscribers}</p>
                                  </div>
                                  <div>
                                    <Label>Subscription Rate</Label>
                                    <p className="text-sm font-medium">
                                      {((selectedScheme.subscribers / selectedScheme.maxSubscribers) * 100).toFixed(1)}%
                                    </p>
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="auctions" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Completed Auctions</Label>
                                    <p className="text-sm font-medium">{selectedScheme.completedAuctions}</p>
                                  </div>
                                  <div>
                                    <Label>Total Auctions</Label>
                                    <p className="text-sm font-medium">{selectedScheme.duration}</p>
                                  </div>
                                  <div>
                                    <Label>Next Auction</Label>
                                    <p className="text-sm font-medium">
                                      {selectedScheme.nextAuction
                                        ? new Date(selectedScheme.nextAuction).toLocaleDateString()
                                        : "N/A"}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Progress</Label>
                                    <p className="text-sm font-medium">
                                      {((selectedScheme.completedAuctions / selectedScheme.duration) * 100).toFixed(1)}%
                                    </p>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>

                      {scheme.status === "pending_approval" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveScheme(scheme.id)}
                            disabled={isLoading}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectScheme(scheme.id)}
                            disabled={isLoading}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}

                      {scheme.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspendScheme(scheme.id)}
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
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
    </div>
  )
}
