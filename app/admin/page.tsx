"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  UserPlus,
  Settings,
  BarChart3,
  Shield,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AddForemanForm } from "@/components/admin/add-foreman-form"

// Mock data for demonstration
const mockSchemes = [
  {
    id: 1,
    schemeName: "Gold Savings 50K",
    foremanName: "Rajesh Kumar",
    foremanId: "FM001",
    totalValue: "₹10,00,000",
    subscribers: 20,
    status: "pending",
    submittedDate: "2025-01-10",
    documents: ["PAN Card", "Aadhaar", "Bank Statement", "Registration Certificate"],
  },
  {
    id: 2,
    schemeName: "Premium Business 100K",
    foremanName: "Priya Sharma",
    foremanId: "FM002",
    totalValue: "₹30,00,000",
    subscribers: 30,
    status: "approved",
    submittedDate: "2025-01-08",
    psoNumber: "PSO-2025-001",
    documents: ["PAN Card", "Aadhaar", "Bank Statement", "Registration Certificate"],
  },
  {
    id: 3,
    schemeName: "Dream Home 200K",
    foremanName: "Amit Patel",
    foremanId: "FM003",
    totalValue: "₹80,00,000",
    subscribers: 40,
    status: "rejected",
    submittedDate: "2025-01-05",
    rejectionReason: "Incomplete documentation - Missing bank guarantee",
    documents: ["PAN Card", "Aadhaar", "Bank Statement"],
  },
]

export default function AdminDashboard() {
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [showAddForeman, setShowAddForeman] = useState(false)
  const [foremen, setForemen] = useState([
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
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleApproveScheme = (schemeId) => {
    const psoNumber = `PSO-2025-${String(schemeId).padStart(3, "0")}`
    console.log(`Scheme ${schemeId} approved with PSO: ${psoNumber}`)
  }

  const handleRejectScheme = (schemeId, reason) => {
    console.log(`Scheme ${schemeId} rejected. Reason: ${reason}`)
  }

  const handleAddForemanClick = () => {
    console.log("Add Foreman button clicked!")
    setShowAddForeman(true)
  }

  const handleAddForemanSuccess = (newForemanData) => {
    console.log("New Foreman Added Successfully:", newForemanData)

    // Generate credentials for the new foreman
    const foremanCredentials = {
      id: `FM${String(Date.now()).slice(-3)}`,
      name: `${newForemanData.firstName} ${newForemanData.lastName}`,
      firstName: newForemanData.firstName,
      lastName: newForemanData.lastName,
      email: newForemanData.email,
      phone: newForemanData.phone,
      experience: "New",
      activeSchemes: 0,
      totalSubscribers: 0,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      // Generate password based on first name + "123"
      password: newForemanData.firstName.toLowerCase() + "123",
      companyName: newForemanData.companyName,
      designation: newForemanData.designation,
    }

    // Add to local foremen state
    setForemen((prev) => [...prev, foremanCredentials])

    // Store in localStorage for login system - ensure we're updating the array properly
    try {
      const existingDynamicForemen = JSON.parse(localStorage.getItem("dynamicForemen") || "[]")
      const updatedDynamicForemen = [...existingDynamicForemen, foremanCredentials]
      localStorage.setItem("dynamicForemen", JSON.stringify(updatedDynamicForemen))

      console.log("Stored dynamic foremen:", updatedDynamicForemen) // Debug log

      // Trigger a storage event for other tabs/windows
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "dynamicForemen",
          newValue: JSON.stringify(updatedDynamicForemen),
        }),
      )
    } catch (error) {
      console.error("Error storing foreman data:", error)
    }

    setShowAddForeman(false)

    // Show success notification with credentials
    alert(
      `Foreman ${foremanCredentials.name} has been added successfully!\n\nLogin Credentials:\nEmail: ${foremanCredentials.email}\nPassword: ${foremanCredentials.password}\n\nPlease share these credentials with the foreman.`,
    )
  }

  const handleAddForemanCancel = () => {
    console.log("Add Foreman cancelled")
    setShowAddForeman(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Chit Fund Portal Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Admin: Super User
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Schemes</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% from last month</span>
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
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">
                  {foremen.filter((f) => f.status === "pending").length} pending approval
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                  <p className="text-3xl font-bold text-gray-900">1,247</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-orange-600">Requires attention</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="schemes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schemes">Scheme Management</TabsTrigger>
            <TabsTrigger value="foremen">Foreman Management</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
          </TabsList>

          {/* Scheme Management Tab */}
          <TabsContent value="schemes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Scheme Approval Queue</h2>
              <Badge variant="secondary">{mockSchemes.filter((s) => s.status === "pending").length} Pending</Badge>
            </div>

            <div className="grid gap-6">
              {mockSchemes.map((scheme) => (
                <Card key={scheme.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{scheme.schemeName}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Foreman: {scheme.foremanName} (ID: {scheme.foremanId})
                        </p>
                      </div>
                      <Badge className={getStatusColor(scheme.status)}>
                        {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Value</p>
                        <p className="text-lg font-semibold">{scheme.totalValue}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Subscribers</p>
                        <p className="text-lg font-semibold">{scheme.subscribers}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Submitted</p>
                        <p className="text-lg font-semibold">{scheme.submittedDate}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Documents Submitted:</p>
                      <div className="flex flex-wrap gap-2">
                        {scheme.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {scheme.status === "approved" && scheme.psoNumber && (
                      <Alert className="mb-4">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>PSO Number Generated:</strong> {scheme.psoNumber}
                        </AlertDescription>
                      </Alert>
                    )}

                    {scheme.status === "rejected" && scheme.rejectionReason && (
                      <Alert className="mb-4" variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Rejection Reason:</strong> {scheme.rejectionReason}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {scheme.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveScheme(scheme.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRejectScheme(scheme.id, "Please provide reason")}
                          >
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Foreman Management Tab */}
          <TabsContent value="foremen" className="space-y-6">
            {!showAddForeman ? (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Foreman Management</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage foreman accounts and applications</p>
                  </div>
                  <Button onClick={handleAddForemanClick} className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New Foreman
                  </Button>
                </div>

                <div className="grid gap-6">
                  {foremen.map((foreman) => (
                    <Card key={foreman.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{foreman.name}</h3>
                            <p className="text-sm text-gray-600">ID: {foreman.id}</p>
                          </div>
                          <Badge className={getStatusColor(foreman.status)}>
                            {foreman.status.charAt(0).toUpperCase() + foreman.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Email</p>
                            <p className="text-sm">{foreman.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Phone</p>
                            <p className="text-sm">{foreman.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Experience</p>
                            <p className="text-sm">{foreman.experience}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Join Date</p>
                            <p className="text-sm">{foreman.joinDate}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-600">Active Schemes</p>
                            <p className="text-2xl font-bold text-blue-700">{foreman.activeSchemes}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-green-600">Total Subscribers</p>
                            <p className="text-2xl font-bold text-green-700">{foreman.totalSubscribers}</p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-purple-600">Success Rate</p>
                            <p className="text-2xl font-bold text-purple-700">98.5%</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            Reset Password
                          </Button>
                          {foreman.status === "pending" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Add New Foreman</h2>
                    <p className="text-sm text-gray-600 mt-1">Complete the registration process for a new foreman</p>
                  </div>
                </div>
                <AddForemanForm onSuccess={handleAddForemanSuccess} onCancel={handleAddForemanCancel} />
              </div>
            )}
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-xl font-semibold">Reports & Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Scheme Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Foreman Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Performance metrics chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system" className="space-y-6">
            <h2 className="text-xl font-semibold">System Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Default Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Admin Default Credentials:</strong>
                      <br />
                      Username: admin@chitfundportal.com
                      <br />
                      Password: Admin@123
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Foreman Default Credentials:</strong>
                      <br />
                      Username: [foreman-email]
                      <br />
                      Password: [firstname]123 (e.g., rajesh123)
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
