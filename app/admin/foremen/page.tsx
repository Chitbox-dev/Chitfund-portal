"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Eye,
  UserPlus,
  CheckCircle,
  UserCheck,
  Clock,
  TrendingUp,
  Building,
  Phone,
  Mail,
} from "lucide-react"
import { AddForemanForm } from "@/components/admin/add-foreman-form"

const defaultForemen = [
  {
    id: "FM001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    experience: "5 years",
    activeSchemes: 3,
    totalSubscribers: 85,
    status: "active",
    joinDate: "2023-03-15",
    password: "rajesh123",
    companyName: "Kumar Chit Funds",
    designation: "Managing Director",
    city: "Bangalore",
    totalMembers: "15K+",
    companyLogo: null,
  },
  {
    id: "FM002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    experience: "8 years",
    activeSchemes: 5,
    totalSubscribers: 150,
    status: "active",
    joinDate: "2022-11-20",
    password: "priya123",
    companyName: "Sharma Financial Services",
    designation: "CEO",
    city: "Mysore",
    totalMembers: "8K+",
    companyLogo: null,
  },
  {
    id: "FM003",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 9876543212",
    experience: "3 years",
    activeSchemes: 2,
    totalSubscribers: 60,
    status: "pending",
    joinDate: "2024-08-10",
    password: "amit123",
    companyName: "Patel Chit Fund Company",
    designation: "Director",
    city: "Hubli",
    totalMembers: "12K+",
    companyLogo: null,
  },
]

export default function ForemenPage() {
  const [foremen, setForemen] = useState(defaultForemen)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddForemanForm, setShowAddForemanForm] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedForemen = localStorage.getItem("foremenList")
      if (storedForemen) {
        try {
          const parsedForemen = JSON.parse(storedForemen)
          setForemen(parsedForemen)
        } catch (error) {
          console.error("Error parsing stored foremen:", error)
          localStorage.setItem("foremenList", JSON.stringify(defaultForemen))
        }
      } else {
        localStorage.setItem("foremenList", JSON.stringify(defaultForemen))
      }
    }
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm"
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300 shadow-sm"
      case "suspended":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300 shadow-sm"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300 shadow-sm"
    }
  }

  const handleAddForemanSuccess = (newForemanData) => {
    const newId = `FM${String(foremen.length + 1).padStart(3, "0")}`
    const defaultPassword = newForemanData.firstName.toLowerCase() + "123"

    const newForeman = {
      id: newId,
      name: `${newForemanData.firstName} ${newForemanData.lastName}`,
      email: newForemanData.email,
      phone: newForemanData.phone,
      experience: "New",
      activeSchemes: 0,
      totalSubscribers: 0,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      password: defaultPassword,
      companyName: newForemanData.companyName,
      designation: newForemanData.designation,
      city: newForemanData.city,
      totalMembers: newForemanData.totalMembers,
      companyLogo: newForemanData.companyLogo,
    }

    const updatedForemen = [...foremen, newForeman]
    setForemen(updatedForemen)

    if (typeof window !== "undefined") {
      localStorage.setItem("foremenList", JSON.stringify(updatedForemen))
    }

    setShowAddForemanForm(false)
    alert(
      `Foreman ${newForeman.name} has been added successfully!\n\nLogin Credentials:\nEmail: ${newForeman.email}\nPassword: ${defaultPassword}\n\nPlease share these credentials with the foreman.\n\nTheir company will now appear in the Client Partners section on the homepage.`,
    )
  }

  // Filter foremen based on search and status
  const filteredForemen = foremen.filter((foreman) => {
    const matchesSearch =
      foreman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      foreman.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      foreman.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      foreman.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || foreman.status === statusFilter
    return matchesSearch && matchesStatus
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
                  <h1 className="text-2xl font-bold text-gray-900">Foreman Management</h1>
                  <p className="text-sm text-gray-500">Manage foreman accounts and permissions</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Total: {foremen.length}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active: {foremen.filter((f) => f.status === "active").length}
                  </Badge>
                  <Button
                    className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                    onClick={() => setShowAddForemanForm(true)}
                  >
                    <UserPlus className="h-4 w-4" />
                    Add Foreman
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!showAddForemanForm ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Foremen</p>
                          <p className="text-3xl font-bold text-gray-900">{foremen.length}</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <UserCheck className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Active Foremen</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {foremen.filter((f) => f.status === "active").length}
                          </p>
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
                          <p className="text-3xl font-bold text-gray-900">
                            {foremen.filter((f) => f.status === "pending").length}
                          </p>
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
                          <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {foremen.reduce((sum, f) => sum + f.totalSubscribers, 0)}
                          </p>
                        </div>
                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search foremen by name, email, company, or phone..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Foremen Cards */}
                <div className="space-y-6">
                  {filteredForemen.map((foreman) => (
                    <Card key={foreman.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <UserCheck className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-slate-800">{foreman.name}</h3>
                                <p className="text-sm text-slate-600">{foreman.designation}</p>
                              </div>
                              <Badge
                                className={`${getStatusColor(foreman.status)} font-bold px-3 py-1 text-xs uppercase tracking-wide ml-auto`}
                              >
                                {foreman.status}
                              </Badge>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {foreman.id}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                              <div className="bg-slate-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Building className="h-4 w-4 text-slate-600" />
                                  <p className="text-sm font-semibold text-slate-600">Company</p>
                                </div>
                                <p className="font-bold text-slate-800">{foreman.companyName}</p>
                                <p className="text-xs text-slate-500 font-medium">{foreman.city}</p>
                              </div>
                              <div className="bg-slate-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Mail className="h-4 w-4 text-slate-600" />
                                  <p className="text-sm font-semibold text-slate-600">Contact</p>
                                </div>
                                <p className="font-bold text-slate-800 text-sm">{foreman.email}</p>
                                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {foreman.phone}
                                </p>
                              </div>
                              <div className="bg-slate-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <TrendingUp className="h-4 w-4 text-slate-600" />
                                  <p className="text-sm font-semibold text-slate-600">Performance</p>
                                </div>
                                <p className="font-bold text-slate-800">{foreman.activeSchemes} Active Schemes</p>
                                <p className="text-xs text-slate-500 font-medium">
                                  {foreman.totalSubscribers} Subscribers
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-blue-800 mb-2">Login Credentials:</p>
                                <div className="space-y-1 text-sm">
                                  <div>
                                    <span className="font-medium text-blue-700">Email:</span> {foreman.email}
                                  </div>
                                  <div>
                                    <span className="font-medium text-blue-700">Password:</span> {foreman.password}
                                  </div>
                                </div>
                              </div>
                              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-green-800 mb-2">Account Details:</p>
                                <div className="space-y-1 text-sm">
                                  <div>
                                    <span className="font-medium text-green-700">Experience:</span> {foreman.experience}
                                  </div>
                                  <div>
                                    <span className="font-medium text-green-700">Join Date:</span> {foreman.joinDate}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-6">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 bg-white hover:bg-slate-50 border-slate-300"
                            >
                              <Eye className="h-4 w-4" />
                              View Profile
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 bg-white hover:bg-slate-50 border-slate-300"
                            >
                              Reset Password
                            </Button>
                            {foreman.status === "pending" && (
                              <Button
                                size="sm"
                                className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Approve
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredForemen.length === 0 && (
                  <div className="text-center py-12">
                    <UserCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Foremen Found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Add New Foreman</h2>
                    <p className="text-sm text-gray-600 mt-1">Complete the registration process for a new foreman</p>
                  </div>
                </div>
                <AddForemanForm onSuccess={handleAddForemanSuccess} onCancel={() => setShowAddForemanForm(false)} />
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
