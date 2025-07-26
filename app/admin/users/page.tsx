"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Search,
  Filter,
  Edit,
  UserX,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Eye,
  Download,
  UserPlus,
} from "lucide-react"

// Sample user data
const defaultUsers = [
  {
    id: "USR001",
    ucfsinId: "UCFSIN2024001",
    name: "Anita Sharma",
    email: "anita.sharma@email.com",
    phone: "+91 9876543213",
    city: "Bangalore",
    state: "Karnataka",
    registrationDate: "2024-01-15",
    status: "active",
    kycStatus: "verified",
    cardStatus: "delivered",
    activeSchemes: 2,
    totalInvestment: "₹50,000",
    lastLogin: "2025-01-25",
  },
  {
    id: "USR002",
    ucfsinId: "UCFSIN2024002",
    name: "Ravi Kumar",
    email: "ravi.kumar@email.com",
    phone: "+91 9876543214",
    city: "Mysore",
    state: "Karnataka",
    registrationDate: "2024-02-20",
    status: "active",
    kycStatus: "verified",
    cardStatus: "shipped",
    activeSchemes: 1,
    totalInvestment: "₹25,000",
    lastLogin: "2025-01-24",
  },
  {
    id: "USR003",
    ucfsinId: "UCFSIN2024003",
    name: "Meera Patel",
    email: "meera.patel@email.com",
    phone: "+91 9876543215",
    city: "Hubli",
    state: "Karnataka",
    registrationDate: "2024-03-10",
    status: "suspended",
    kycStatus: "pending",
    cardStatus: "not_requested",
    activeSchemes: 0,
    totalInvestment: "₹0",
    lastLogin: "2025-01-20",
  },
  {
    id: "USR004",
    ucfsinId: "UCFSIN2024004",
    name: "Suresh Reddy",
    email: "suresh.reddy@email.com",
    phone: "+91 9876543216",
    city: "Bangalore",
    state: "Karnataka",
    registrationDate: "2024-04-05",
    status: "active",
    kycStatus: "verified",
    cardStatus: "processing",
    activeSchemes: 3,
    totalInvestment: "₹75,000",
    lastLogin: "2025-01-26",
  },
  {
    id: "USR005",
    ucfsinId: "UCFSIN2024005",
    name: "Lakshmi Nair",
    email: "lakshmi.nair@email.com",
    phone: "+91 9876543217",
    city: "Kochi",
    state: "Kerala",
    registrationDate: "2024-05-12",
    status: "active",
    kycStatus: "verified",
    cardStatus: "delivered",
    activeSchemes: 4,
    totalInvestment: "₹1,20,000",
    lastLogin: "2025-01-26",
  },
]

export default function AllUsersPage() {
  const [users, setUsers] = useState(defaultUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [kycFilter, setKycFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("usersList")
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers)
          setUsers(parsedUsers)
        } catch (error) {
          console.error("Error parsing stored users:", error)
          localStorage.setItem("usersList", JSON.stringify(defaultUsers))
        }
      } else {
        localStorage.setItem("usersList", JSON.stringify(defaultUsers))
      }
    }
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm"
      case "suspended":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300 shadow-sm"
      case "verified":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm"
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300 shadow-sm"
      case "delivered":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm"
      case "shipped":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300 shadow-sm"
      case "processing":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300 shadow-sm"
      case "not_requested":
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300 shadow-sm"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300 shadow-sm"
    }
  }

  const handleUserStatusChange = (userId, newStatus) => {
    const updatedUsers = users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user))
    setUsers(updatedUsers)
    localStorage.setItem("usersList", JSON.stringify(updatedUsers))
    alert(`User status updated to ${newStatus}`)
  }

  const handleManualTrackingUpdate = (userId, trackingInfo) => {
    alert(`Tracking information updated for user ${userId}`)
  }

  const handleExportUsers = () => {
    const csvContent = [
      [
        "ID",
        "UCFSIN ID",
        "Name",
        "Email",
        "Phone",
        "City",
        "State",
        "Status",
        "KYC Status",
        "Card Status",
        "Investment",
      ],
      ...filteredUsers.map((user) => [
        user.id,
        user.ucfsinId,
        user.name,
        user.email,
        user.phone,
        user.city,
        user.state,
        user.status,
        user.kycStatus,
        user.cardStatus,
        user.totalInvestment,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users_export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Filter users based on search and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ucfsinId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesKyc = kycFilter === "all" || user.kycStatus === kycFilter
    return matchesSearch && matchesStatus && matchesKyc
  })

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
                  <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
                  <p className="text-sm text-gray-500">Manage all registered users in the system</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Total: {users.length}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active: {users.filter((u) => u.status === "active").length}
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
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">{users.length}</p>
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
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {users.filter((u) => u.status === "active").length}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">KYC Verified</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {users.filter((u) => u.kycStatus === "verified").length}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <UserPlus className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Suspended</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {users.filter((u) => u.status === "suspended").length}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <UserX className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name, email, UCFSIN ID, or phone..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={kycFilter} onValueChange={setKycFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by KYC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All KYC Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExportUsers} className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>All Users ({filteredUsers.length})</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Showing {filteredUsers.length} of {users.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Details</TableHead>
                      <TableHead>UCFSIN ID</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>KYC</TableHead>
                      <TableHead>Card Status</TableHead>
                      <TableHead>Investment</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">ID: {user.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{user.ucfsinId}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </p>
                            <p className="text-sm flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {user.city}, {user.state}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.kycStatus)}>{user.kycStatus}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.cardStatus)}>
                            {user.cardStatus.replace(/_/g, " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.totalInvestment}</p>
                            <p className="text-sm text-gray-500">{user.activeSchemes} schemes</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-600">{user.lastLogin}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)} className="gap-1">
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                            {user.status === "active" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUserStatusChange(user.id, "suspended")}
                                className="gap-1 text-red-600 hover:text-red-700"
                              >
                                <UserX className="h-3 w-3" />
                                Suspend
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUserStatusChange(user.id, "active")}
                                className="gap-1 text-green-600 hover:text-green-700"
                              >
                                <ShieldCheck className="h-3 w-3" />
                                Activate
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleManualTrackingUpdate(user.id, {})}
                              className="gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Track
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Users Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
