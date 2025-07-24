"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  DollarSign,
  Calendar,
  User,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for foreman dashboard
const mockSchemes = [
  {
    id: 1,
    name: "Gold Savings 50K",
    registrationNo: "DEL-CF-2023-0087",
    totalValue: "₹10,00,000",
    subscribers: 20,
    maxSubscribers: 20,
    monthlyContribution: "₹50,000",
    duration: 20,
    startDate: "2024-01-10",
    status: "active",
    nextAuction: "2025-04-15",
    collectionRate: 95,
    psoNumber: "PSO-2025-001",
  },
  {
    id: 2,
    name: "Premium Business 100K",
    registrationNo: "DEL-CF-2023-0156",
    totalValue: "₹30,00,000",
    subscribers: 28,
    maxSubscribers: 30,
    monthlyContribution: "₹1,00,000",
    duration: 30,
    startDate: "2024-02-15",
    status: "active",
    nextAuction: "2025-04-18",
    collectionRate: 98,
    psoNumber: "PSO-2025-002",
  },
  {
    id: 3,
    name: "Dream Home 200K",
    registrationNo: "DEL-CF-2024-0035",
    totalValue: "₹80,00,000",
    subscribers: 8,
    maxSubscribers: 40,
    monthlyContribution: "₹2,00,000",
    duration: 40,
    startDate: "Pending",
    status: "pending",
    nextAuction: "-",
    collectionRate: 0,
    psoNumber: "Pending Approval",
  },
]

const mockSubscribers = [
  {
    id: 1,
    ucfin: "UC2025001234",
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 9876543210",
    scheme: "Gold Savings 50K",
    joinDate: "2024-01-10",
    paymentStatus: "current",
    lastPayment: "2025-03-15",
  },
  {
    id: 2,
    ucfin: "UC2025001235",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    scheme: "Gold Savings 50K",
    joinDate: "2024-01-10",
    paymentStatus: "overdue",
    lastPayment: "2025-02-15",
  },
]

export default function ForemanDashboard() {
  const [showNewScheme, setShowNewScheme] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [newScheme, setNewScheme] = useState({
    name: "",
    totalValue: "",
    subscribers: "",
    duration: "",
    monthlyContribution: "",
    commissionRate: "5",
    startDate: "",
    auctionType: "sealed-bid",
    minimumDiscount: "3",
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "current":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSchemeSubmit = () => {
    console.log("New Scheme Submitted:", newScheme)
    // Reset form and close modal
    setNewScheme({
      name: "",
      totalValue: "",
      subscribers: "",
      duration: "",
      monthlyContribution: "",
      commissionRate: "5",
      startDate: "",
      auctionType: "sealed-bid",
      minimumDiscount: "3",
    })
    setCurrentStep(1)
    setShowNewScheme(false)
  }

  const calculateMonthlyContribution = () => {
    if (newScheme.totalValue && newScheme.subscribers) {
      const total = Number.parseInt(newScheme.totalValue.replace(/[₹,]/g, ""))
      const subscribers = Number.parseInt(newScheme.subscribers)
      if (total && subscribers) {
        return `₹${(total / subscribers).toLocaleString()}`
      }
    }
    return ""
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Foreman Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, Rajesh Kumar (FM001)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Active Foreman
              </Badge>
              <Button onClick={() => setShowNewScheme(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Scheme
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
                  <p className="text-sm font-medium text-gray-600">Active Schemes</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">1 pending approval</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                  <p className="text-3xl font-bold text-gray-900">56</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+5 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Fund Value</p>
                  <p className="text-3xl font-bold text-gray-900">₹1.2Cr</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">Across all schemes</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                  <p className="text-3xl font-bold text-gray-900">96.5%</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">Excellent performance</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Scheme Modal */}
        {showNewScheme && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Create New Chit Scheme</CardTitle>
                <Button variant="outline" onClick={() => setShowNewScheme(false)}>
                  Cancel
                </Button>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && <div className="w-12 h-0.5 bg-gray-200 mx-2" />}
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Scheme Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schemeName">Scheme Name</Label>
                      <Input
                        id="schemeName"
                        value={newScheme.name}
                        onChange={(e) => setNewScheme({ ...newScheme, name: e.target.value })}
                        placeholder="Enter scheme name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalValue">Total Chit Value</Label>
                      <Input
                        id="totalValue"
                        value={newScheme.totalValue}
                        onChange={(e) => setNewScheme({ ...newScheme, totalValue: e.target.value })}
                        placeholder="e.g., ₹10,00,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subscribers">Number of Subscribers</Label>
                      <Input
                        id="subscribers"
                        type="number"
                        value={newScheme.subscribers}
                        onChange={(e) => setNewScheme({ ...newScheme, subscribers: e.target.value })}
                        placeholder="Enter number of subscribers"
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration (Months)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newScheme.duration}
                        onChange={(e) => setNewScheme({ ...newScheme, duration: e.target.value })}
                        placeholder="Enter duration in months"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyContribution">Monthly Contribution per Subscriber</Label>
                      <Input
                        id="monthlyContribution"
                        value={calculateMonthlyContribution()}
                        disabled
                        placeholder="Auto-calculated"
                      />
                    </div>
                    <div>
                      <Label htmlFor="startDate">Expected Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newScheme.startDate}
                        onChange={(e) => setNewScheme({ ...newScheme, startDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Scheme Structure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="commissionRate">Foreman Commission (%)</Label>
                      <Input
                        id="commissionRate"
                        type="number"
                        max="5"
                        value={newScheme.commissionRate}
                        onChange={(e) => setNewScheme({ ...newScheme, commissionRate: e.target.value })}
                        placeholder="Maximum 5%"
                      />
                    </div>
                    <div>
                      <Label htmlFor="auctionType">Auction Type</Label>
                      <Select
                        value={newScheme.auctionType}
                        onValueChange={(value) => setNewScheme({ ...newScheme, auctionType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sealed-bid">Sealed Bid</SelectItem>
                          <SelectItem value="open-auction">Open Auction</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="minimumDiscount">Minimum Discount Rate (%)</Label>
                      <Input
                        id="minimumDiscount"
                        type="number"
                        value={newScheme.minimumDiscount}
                        onChange={(e) => setNewScheme({ ...newScheme, minimumDiscount: e.target.value })}
                        placeholder="Minimum discount rate"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Document Upload</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Registration Certificate</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      </div>
                    </div>
                    <div>
                      <Label>Bank Guarantee</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Review & Submit</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Scheme Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Name: {newScheme.name}</div>
                      <div>Total Value: {newScheme.totalValue}</div>
                      <div>Subscribers: {newScheme.subscribers}</div>
                      <div>Duration: {newScheme.duration} months</div>
                      <div>Commission: {newScheme.commissionRate}%</div>
                      <div>Start Date: {newScheme.startDate}</div>
                    </div>
                  </div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      By submitting this scheme, you agree to all terms and conditions. The scheme will be sent for
                      admin approval.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
                ) : (
                  <Button onClick={handleSchemeSubmit}>Submit for Approval</Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="schemes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schemes">My Schemes</TabsTrigger>
            <TabsTrigger value="subscribers">Subscriber Management</TabsTrigger>
            <TabsTrigger value="auctions">Auction Management</TabsTrigger>
          </TabsList>

          {/* Schemes Tab */}
          <TabsContent value="schemes" className="space-y-6">
            <div className="grid gap-6">
              {mockSchemes.map((scheme) => (
                <Card key={scheme.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{scheme.name}</h3>
                        <p className="text-sm text-gray-600">Registration: {scheme.registrationNo}</p>
                        {scheme.psoNumber !== "Pending Approval" && (
                          <p className="text-sm text-blue-600">PSO: {scheme.psoNumber}</p>
                        )}
                      </div>
                      <Badge className={getStatusColor(scheme.status)}>
                        {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Value</p>
                        <p className="text-lg font-semibold">{scheme.totalValue}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Subscribers</p>
                        <p className="text-lg font-semibold">
                          {scheme.subscribers}/{scheme.maxSubscribers}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Monthly Contribution</p>
                        <p className="text-lg font-semibold">{scheme.monthlyContribution}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Next Auction</p>
                        <p className="text-lg font-semibold">{scheme.nextAuction}</p>
                      </div>
                    </div>

                    {scheme.status === "active" && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Collection Rate</span>
                          <span className="text-sm font-medium">{scheme.collectionRate}%</span>
                        </div>
                        <Progress value={scheme.collectionRate} className="h-2" />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {scheme.status === "active" && (
                        <>
                          <Button size="sm">
                            <Users className="h-4 w-4 mr-2" />
                            Manage Subscribers
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Auction
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Subscriber Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscriber
              </Button>
            </div>

            <div className="grid gap-4">
              {mockSubscribers.map((subscriber) => (
                <Card key={subscriber.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-lg font-semibold">{subscriber.name}</h3>
                          <Badge className={getStatusColor(subscriber.paymentStatus)}>
                            {subscriber.paymentStatus.charAt(0).toUpperCase() + subscriber.paymentStatus.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-600">UCFIN</p>
                            <p>{subscriber.ucfin}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-600">Email</p>
                            <p>{subscriber.email}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-600">Phone</p>
                            <p>{subscriber.phone}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-600">Last Payment</p>
                            <p>{subscriber.lastPayment}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        {subscriber.paymentStatus === "overdue" && (
                          <Button size="sm" variant="destructive">
                            Send Reminder
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Auctions Tab */}
          <TabsContent value="auctions" className="space-y-6">
            <h2 className="text-xl font-semibold">Auction Management</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Upcoming Auctions</h3>
                  <p className="text-gray-500 mb-4">Schedule your next auction to continue the chit process</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Auction
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
