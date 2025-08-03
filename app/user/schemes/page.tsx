"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Search, Download, Eye, Calendar, DollarSign, Users, TrendingUp } from "lucide-react"

// Mock data for user schemes
const mockUserSchemes = [
  {
    id: 1,
    name: "Gold Savings 50K",
    schemeId: "GS50K-001",
    totalAmount: 1000000,
    monthlyEMI: 50000,
    amountPaid: 850000,
    amountRemaining: 150000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    currentMonth: 17,
    totalMonths: 20,
    nextPaymentDate: "2024-02-01",
    status: "active",
    foremanName: "Aakash Savant",
    foremanContact: "+91 9876543210",
    progress: 85,
    subscribers: 20,
    maxSubscribers: 20,
  },
  {
    id: 2,
    name: "Business Growth 100K",
    schemeId: "BG100K-002",
    totalAmount: 3000000,
    monthlyEMI: 100000,
    amountPaid: 2400000,
    amountRemaining: 600000,
    startDate: "2023-06-01",
    endDate: "2026-05-31",
    currentMonth: 24,
    totalMonths: 30,
    nextPaymentDate: "2024-02-01",
    status: "active",
    foremanName: "Priya Sharma",
    foremanContact: "+91 9876543211",
    progress: 80,
    subscribers: 30,
    maxSubscribers: 30,
  },
  {
    id: 3,
    name: "Dream Home 200K",
    schemeId: "DH200K-003",
    totalAmount: 8000000,
    monthlyEMI: 200000,
    amountPaid: 8000000,
    amountRemaining: 0,
    startDate: "2022-01-01",
    endDate: "2024-12-31",
    currentMonth: 40,
    totalMonths: 40,
    nextPaymentDate: null,
    status: "completed",
    foremanName: "Rajesh Kumar",
    foremanContact: "+91 9876543212",
    progress: 100,
    subscribers: 40,
    maxSubscribers: 40,
  },
  {
    id: 4,
    name: "Education Fund 75K",
    schemeId: "EF75K-004",
    totalAmount: 1875000,
    monthlyEMI: 75000,
    amountPaid: 0,
    amountRemaining: 1875000,
    startDate: "2024-03-01",
    endDate: "2026-06-30",
    currentMonth: 0,
    totalMonths: 25,
    nextPaymentDate: "2024-03-01",
    status: "pending",
    foremanName: "Sunita Patel",
    foremanContact: "+91 9876543213",
    progress: 0,
    subscribers: 15,
    maxSubscribers: 25,
  },
]

export default function UserSchemes() {
  const [schemes, setSchemes] = useState(mockUserSchemes)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.schemeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || scheme.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your schemes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Schemes</h1>
              <p className="text-gray-600 mt-1">Track and manage your chit fund investments</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                {filteredSchemes.length} Active Schemes
              </Badge>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900">{scheme.name}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">ID: {scheme.schemeId}</p>
                  </div>
                  <Badge className={`${getStatusColor(scheme.status)} font-medium`}>
                    {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Progress</span>
                    <span className="text-sm font-bold text-gray-900">{scheme.progress}%</span>
                  </div>
                  <Progress value={scheme.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      Month {scheme.currentMonth} of {scheme.totalMonths}
                    </span>
                    <span>
                      {scheme.subscribers}/{scheme.maxSubscribers} subscribers
                    </span>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Total Amount</span>
                    </div>
                    <p className="text-lg font-bold text-green-900">{formatCurrency(scheme.totalAmount)}</p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Monthly EMI</span>
                    </div>
                    <p className="text-lg font-bold text-blue-900">{formatCurrency(scheme.monthlyEMI)}</p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-700">Amount Paid</span>
                    </div>
                    <p className="text-lg font-bold text-purple-900">{formatCurrency(scheme.amountPaid)}</p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      <span className="text-xs font-medium text-orange-700">Remaining</span>
                    </div>
                    <p className="text-lg font-bold text-orange-900">{formatCurrency(scheme.amountRemaining)}</p>
                  </div>
                </div>

                {/* Timeline Information */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Start Date:</span>
                      <p className="font-medium text-gray-900">{formatDate(scheme.startDate)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">End Date:</span>
                      <p className="font-medium text-gray-900">{formatDate(scheme.endDate)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Foreman:</span>
                      <p className="font-medium text-gray-900">{scheme.foremanName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Next Payment:</span>
                      <p className="font-medium text-gray-900">
                        {scheme.nextPaymentDate ? formatDate(scheme.nextPaymentDate) : "Completed"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No schemes found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
