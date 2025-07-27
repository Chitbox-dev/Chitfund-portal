"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Search,
  Filter,
  Eye,
  Download,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  User,
} from "lucide-react"

interface Subscriber {
  id: string
  ucfsinId: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  joinDate: string
  status: "active" | "inactive"
  chitScore: number
  totalInvestment: number
  pendingAmount: number
  activeSchemes: number
  lastPaymentDate: string
  schemes: {
    schemeId: string
    schemeName: string
    totalInstallments: number
    paidInstallments: number
    monthlyAmount: number
    status: string
  }[]
}

const defaultSubscribers: Subscriber[] = [
  {
    id: "SUB001",
    ucfsinId: "UCFSIN2024001",
    name: "Anita Sharma",
    email: "anita.sharma@email.com",
    phone: "+91 9876543213",
    address: "123 MG Road, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    joinDate: "2024-01-15",
    status: "active",
    chitScore: 785,
    totalInvestment: 50000,
    pendingAmount: 5000,
    activeSchemes: 2,
    lastPaymentDate: "2025-01-20",
    schemes: [
      {
        schemeId: "SCH001",
        schemeName: "Monthly Savings Scheme",
        totalInstallments: 24,
        paidInstallments: 18,
        monthlyAmount: 2000,
        status: "active",
      },
      {
        schemeId: "SCH002",
        schemeName: "Festival Scheme",
        totalInstallments: 12,
        paidInstallments: 8,
        monthlyAmount: 1500,
        status: "active",
      },
    ],
  },
  {
    id: "SUB002",
    ucfsinId: "UCFSIN2024002",
    name: "Ravi Kumar",
    email: "ravi.kumar@email.com",
    phone: "+91 9876543214",
    address: "456 Brigade Road, Mysore",
    city: "Mysore",
    state: "Karnataka",
    joinDate: "2024-02-20",
    status: "active",
    chitScore: 720,
    totalInvestment: 25000,
    pendingAmount: 2500,
    activeSchemes: 1,
    lastPaymentDate: "2025-01-18",
    schemes: [
      {
        schemeId: "SCH003",
        schemeName: "Education Scheme",
        totalInstallments: 36,
        paidInstallments: 24,
        monthlyAmount: 1000,
        status: "active",
      },
    ],
  },
  {
    id: "SUB003",
    ucfsinId: "UCFSIN2024003",
    name: "Meera Patel",
    email: "meera.patel@email.com",
    phone: "+91 9876543215",
    address: "789 Commercial Street, Hubli",
    city: "Hubli",
    state: "Karnataka",
    joinDate: "2024-03-10",
    status: "inactive",
    chitScore: 650,
    totalInvestment: 15000,
    pendingAmount: 8000,
    activeSchemes: 0,
    lastPaymentDate: "2024-12-15",
    schemes: [
      {
        schemeId: "SCH004",
        schemeName: "Home Loan Scheme",
        totalInstallments: 48,
        paidInstallments: 12,
        monthlyAmount: 3000,
        status: "suspended",
      },
    ],
  },
  {
    id: "SUB004",
    ucfsinId: "UCFSIN2024004",
    name: "Suresh Reddy",
    email: "suresh.reddy@email.com",
    phone: "+91 9876543216",
    address: "321 Residency Road, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    joinDate: "2024-04-05",
    status: "active",
    chitScore: 820,
    totalInvestment: 75000,
    pendingAmount: 0,
    activeSchemes: 3,
    lastPaymentDate: "2025-01-25",
    schemes: [
      {
        schemeId: "SCH005",
        schemeName: "Business Expansion Scheme",
        totalInstallments: 60,
        paidInstallments: 45,
        monthlyAmount: 2500,
        status: "active",
      },
      {
        schemeId: "SCH006",
        schemeName: "Investment Scheme",
        totalInstallments: 24,
        paidInstallments: 20,
        monthlyAmount: 5000,
        status: "active",
      },
      {
        schemeId: "SCH007",
        schemeName: "Emergency Fund Scheme",
        totalInstallments: 12,
        paidInstallments: 10,
        monthlyAmount: 1000,
        status: "active",
      },
    ],
  },
  {
    id: "SUB005",
    ucfsinId: "UCFSIN2024005",
    name: "Priya Nair",
    email: "priya.nair@email.com",
    phone: "+91 9876543217",
    address: "654 Koramangala, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    joinDate: "2024-05-12",
    status: "active",
    chitScore: 760,
    totalInvestment: 40000,
    pendingAmount: 3000,
    activeSchemes: 2,
    lastPaymentDate: "2025-01-22",
    schemes: [
      {
        schemeId: "SCH008",
        schemeName: "Wedding Scheme",
        totalInstallments: 30,
        paidInstallments: 22,
        monthlyAmount: 2000,
        status: "active",
      },
      {
        schemeId: "SCH009",
        schemeName: "Travel Scheme",
        totalInstallments: 18,
        paidInstallments: 15,
        monthlyAmount: 1500,
        status: "active",
      },
    ],
  },
  {
    id: "SUB006",
    ucfsinId: "UCFSIN2024006",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 9876543218",
    address: "987 Jayanagar, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    joinDate: "2024-06-08",
    status: "inactive",
    chitScore: 580,
    totalInvestment: 20000,
    pendingAmount: 12000,
    activeSchemes: 0,
    lastPaymentDate: "2024-11-30",
    schemes: [
      {
        schemeId: "SCH010",
        schemeName: "Vehicle Loan Scheme",
        totalInstallments: 36,
        paidInstallments: 8,
        monthlyAmount: 4000,
        status: "defaulted",
      },
    ],
  },
]

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(defaultSubscribers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isStatusChanging, setIsStatusChanging] = useState<string | null>(null)

  // Load subscribers from localStorage on mount
  useEffect(() => {
    const storedSubscribers = localStorage.getItem("foremanSubscribers")
    if (storedSubscribers) {
      try {
        const parsed = JSON.parse(storedSubscribers)
        setSubscribers(parsed)
      } catch (error) {
        console.error("Error loading subscribers:", error)
      }
    } else {
      localStorage.setItem("foremanSubscribers", JSON.stringify(defaultSubscribers))
    }
  }, [])

  // Save subscribers to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("foremanSubscribers", JSON.stringify(subscribers))
  }, [subscribers])

  const handleStatusToggle = async (subscriberId: string, newStatus: "active" | "inactive") => {
    setIsStatusChanging(subscriberId)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubscribers((prev) => prev.map((sub) => (sub.id === subscriberId ? { ...sub, status: newStatus } : sub)))

    setIsStatusChanging(null)
  }

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch =
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.ucfsinId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || subscriber.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: subscribers.length,
    active: subscribers.filter((s) => s.status === "active").length,
    inactive: subscribers.filter((s) => s.status === "inactive").length,
    totalInvestment: subscribers.reduce((sum, s) => sum + s.totalInvestment, 0),
    pendingAmount: subscribers.reduce((sum, s) => sum + s.pendingAmount, 0),
  }

  const getChitScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600"
    if (score >= 650) return "text-yellow-600"
    return "text-red-600"
  }

  const getChitScoreLabel = (score: number) => {
    if (score >= 750) return "Excellent"
    if (score >= 650) return "Good"
    return "Poor"
  }

  const openSubscriberDetail = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscriber Management</h1>
            <div className="text-gray-600 mt-2">Manage all your scheme subscribers and their status</div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">Total Subscribers</div>
                  <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">Active</div>
                  <div className="text-3xl font-bold text-green-600">{stats.active}</div>
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
                  <div className="text-sm font-medium text-gray-600">Inactive</div>
                  <div className="text-3xl font-bold text-red-600">{stats.inactive}</div>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">Total Investment</div>
                  <div className="text-2xl font-bold text-gray-900">₹{stats.totalInvestment.toLocaleString()}</div>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">Pending Amount</div>
                  <div className="text-2xl font-bold text-orange-600">₹{stats.pendingAmount.toLocaleString()}</div>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, UCFSIN ID, or phone..."
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
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subscribers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Subscribers ({filteredSubscribers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSubscribers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subscriber Details</TableHead>
                    <TableHead>UCFSIN ID</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Chit Score</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Active Schemes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{subscriber.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {subscriber.city}, {subscriber.state}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subscriber.ucfsinId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {subscriber.email}
                          </div>
                          <div className="text-sm flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {subscriber.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className={`text-lg font-bold ${getChitScoreColor(subscriber.chitScore)}`}>
                            {subscriber.chitScore}
                          </div>
                          <div className="text-xs text-gray-500">{getChitScoreLabel(subscriber.chitScore)}</div>
                          <Progress value={(subscriber.chitScore / 850) * 100} className="h-2 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">₹{subscriber.totalInvestment.toLocaleString()}</div>
                          {subscriber.pendingAmount > 0 && (
                            <div className="text-sm text-red-600">
                              Pending: ₹{subscriber.pendingAmount.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{subscriber.activeSchemes}</div>
                          <div className="text-xs text-gray-500">schemes</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={
                              subscriber.status === "active"
                                ? "bg-green-100 text-green-800 border-green-300"
                                : "bg-red-100 text-red-800 border-red-300"
                            }
                          >
                            {subscriber.status}
                          </Badge>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Switch
                                checked={subscriber.status === "active"}
                                disabled={isStatusChanging === subscriber.id}
                              />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {subscriber.status === "active" ? "Deactivate" : "Activate"} Subscriber
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  <div className="space-y-3">
                                    <div>
                                      Are you sure you want to{" "}
                                      {subscriber.status === "active" ? "deactivate" : "activate"} {subscriber.name}?
                                    </div>
                                    {subscriber.status === "active" && (
                                      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <div className="text-sm text-yellow-800">
                                          <strong>Warning:</strong> Deactivating this subscriber will:
                                        </div>
                                        <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
                                          <li>Prevent them from participating in auctions</li>
                                          <li>Suspend their active schemes</li>
                                          <li>Stop automatic payment processing</li>
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleStatusToggle(
                                      subscriber.id,
                                      subscriber.status === "active" ? "inactive" : "active",
                                    )
                                  }
                                  className={
                                    subscriber.status === "active"
                                      ? "bg-red-600 hover:bg-red-700"
                                      : "bg-green-600 hover:bg-green-700"
                                  }
                                >
                                  {subscriber.status === "active" ? "Deactivate" : "Activate"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openSubscriberDetail(subscriber)}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Subscribers Found</h3>
                <div className="text-gray-500">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No subscribers have been added to your schemes yet."}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subscriber Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                {selectedSubscriber?.name}
                <Badge
                  className={
                    selectedSubscriber?.status === "active"
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-red-100 text-red-800 border-red-300"
                  }
                >
                  {selectedSubscriber?.status}
                </Badge>
              </DialogTitle>
              <DialogDescription>Complete subscriber profile and scheme details</DialogDescription>
            </DialogHeader>

            {selectedSubscriber && (
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="schemes">Schemes</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-600">UCFSIN ID</div>
                        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mt-1">
                          {selectedSubscriber.ucfsinId}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Email</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {selectedSubscriber.email}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Phone</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {selectedSubscriber.phone}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Address</div>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {selectedSubscriber.address}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-600">Chit Score</div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className={`text-2xl font-bold ${getChitScoreColor(selectedSubscriber.chitScore)}`}>
                            {selectedSubscriber.chitScore}
                          </div>
                          <div className="flex-1">
                            <Progress value={(selectedSubscriber.chitScore / 850) * 100} className="h-3" />
                            <div className="text-xs text-gray-500 mt-1">
                              {getChitScoreLabel(selectedSubscriber.chitScore)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Total Investment</div>
                        <div className="text-xl font-bold text-green-600 mt-1">
                          ₹{selectedSubscriber.totalInvestment.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Pending Amount</div>
                        <div className="text-xl font-bold text-red-600 mt-1">
                          ₹{selectedSubscriber.pendingAmount.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Join Date</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(selectedSubscriber.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="schemes" className="space-y-4">
                  <div className="space-y-4">
                    {selectedSubscriber.schemes.map((scheme) => (
                      <Card key={scheme.schemeId}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-semibold">{scheme.schemeName}</div>
                              <div className="text-sm text-gray-500">ID: {scheme.schemeId}</div>
                            </div>
                            <Badge
                              className={
                                scheme.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : scheme.status === "suspended"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {scheme.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-gray-600">Monthly Amount</div>
                              <div className="font-medium">₹{scheme.monthlyAmount.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-gray-600">Progress</div>
                              <div className="font-medium">
                                {scheme.paidInstallments}/{scheme.totalInstallments}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-600">Completion</div>
                              <div className="font-medium">
                                {Math.round((scheme.paidInstallments / scheme.totalInstallments) * 100)}%
                              </div>
                            </div>
                          </div>
                          <Progress
                            value={(scheme.paidInstallments / scheme.totalInstallments) * 100}
                            className="mt-3"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="payments" className="space-y-4">
                  <div className="text-center py-8">
                    <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Payment History</h3>
                    <div>Payment history will be displayed here</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Last payment: {new Date(selectedSubscriber.lastPaymentDate).toLocaleDateString()}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
