"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Calendar,
  IndianRupee,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Plus,
  ArrowRight,
} from "lucide-react"

export default function UserSchemes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("my-schemes")

  // Mock schemes data
  const mySchemes = [
    {
      id: 1,
      name: "Monthly Savings Scheme",
      type: "Regular",
      amount: 50000,
      monthlyContribution: 5000,
      duration: 10,
      currentMonth: 3,
      status: "active",
      nextPayment: "15 Feb 2024",
      returns: 7500,
      members: 10,
      foreman: "Rajesh Kumar",
      startDate: "15 Nov 2023",
    },
    {
      id: 2,
      name: "Festival Special",
      type: "Special",
      amount: 25000,
      monthlyContribution: 2500,
      duration: 10,
      currentMonth: 8,
      status: "active",
      nextPayment: "20 Feb 2024",
      returns: 3200,
      members: 8,
      foreman: "Priya Sharma",
      startDate: "20 Jun 2023",
    },
    {
      id: 3,
      name: "Business Growth Fund",
      type: "Premium",
      amount: 100000,
      monthlyContribution: 10000,
      duration: 10,
      currentMonth: 2,
      status: "active",
      nextPayment: "25 Feb 2024",
      returns: 15000,
      members: 15,
      foreman: "Amit Singh",
      startDate: "25 Dec 2023",
    },
    {
      id: 4,
      name: "Education Fund",
      type: "Regular",
      amount: 30000,
      monthlyContribution: 3000,
      duration: 10,
      currentMonth: 10,
      status: "completed",
      nextPayment: null,
      returns: 4500,
      members: 12,
      foreman: "Sunita Patel",
      startDate: "10 Mar 2023",
    },
    {
      id: 5,
      name: "Home Renovation",
      type: "Special",
      amount: 75000,
      monthlyContribution: 7500,
      duration: 10,
      currentMonth: 1,
      status: "pending",
      nextPayment: "10 Mar 2024",
      returns: 0,
      members: 6,
      foreman: "Vikram Reddy",
      startDate: "10 Feb 2024",
    },
  ]

  const availableSchemes = [
    {
      id: 6,
      name: "Quick Cash Scheme",
      type: "Express",
      amount: 20000,
      monthlyContribution: 2000,
      duration: 10,
      members: 8,
      maxMembers: 10,
      foreman: "Meera Nair",
      startDate: "1 Mar 2024",
      expectedReturn: 3000,
      status: "open",
    },
    {
      id: 7,
      name: "Gold Investment Plan",
      type: "Premium",
      amount: 150000,
      monthlyContribution: 15000,
      duration: 10,
      members: 12,
      maxMembers: 15,
      foreman: "Suresh Gupta",
      startDate: "15 Mar 2024",
      expectedReturn: 25000,
      status: "open",
    },
    {
      id: 8,
      name: "Wedding Fund",
      type: "Special",
      amount: 80000,
      monthlyContribution: 8000,
      duration: 10,
      members: 15,
      maxMembers: 15,
      foreman: "Kavya Iyer",
      startDate: "20 Feb 2024",
      expectedReturn: 12000,
      status: "full",
    },
  ]

  const getSchemeStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "open":
        return "bg-green-100 text-green-800"
      case "full":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSchemeTypeColor = (type: string) => {
    switch (type) {
      case "Regular":
        return "bg-blue-100 text-blue-800"
      case "Special":
        return "bg-purple-100 text-purple-800"
      case "Premium":
        return "bg-orange-100 text-orange-800"
      case "Express":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredMySchemes = mySchemes.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || scheme.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredAvailableSchemes = availableSchemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Schemes</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your chit fund investments</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Join New Scheme
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-schemes" className="text-xs sm:text-sm">
            My Schemes ({mySchemes.length})
          </TabsTrigger>
          <TabsTrigger value="available" className="text-xs sm:text-sm">
            Available Schemes ({availableSchemes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-schemes" className="space-y-4">
          {filteredMySchemes.length === 0 ? (
            <Card>
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Users className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No schemes found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredMySchemes.map((scheme) => (
                <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <CardTitle className="text-base sm:text-lg">{scheme.name}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={`${getSchemeTypeColor(scheme.type)} text-xs`}>{scheme.type}</Badge>
                        <Badge className={`${getSchemeStatusColor(scheme.status)} text-xs`}>{scheme.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Scheme Amount</p>
                          <p className="font-bold">₹{scheme.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Monthly</p>
                          <p className="font-bold">₹{scheme.monthlyContribution.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Progress</p>
                          <p className="font-bold">
                            {scheme.currentMonth}/{scheme.duration} months
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Returns</p>
                          <p className="font-bold text-green-600">+₹{scheme.returns.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completion</span>
                          <span>{Math.round((scheme.currentMonth / scheme.duration) * 100)}%</span>
                        </div>
                        <Progress value={(scheme.currentMonth / scheme.duration) * 100} className="h-2" />
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{scheme.members} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Started {scheme.startDate}</span>
                        </div>
                      </div>

                      {/* Status-specific Actions */}
                      {scheme.status === "active" && scheme.nextPayment && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-yellow-50 rounded-lg gap-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium">Next Payment: {scheme.nextPayment}</span>
                          </div>
                          <Button size="sm" className="w-full sm:w-auto">
                            Pay Now
                          </Button>
                        </div>
                      )}

                      {scheme.status === "completed" && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Scheme Completed Successfully</span>
                        </div>
                      )}

                      {scheme.status === "pending" && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">Waiting for scheme to start</span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button variant="outline" size="sm" className="w-full sm:flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {scheme.status === "active" && (
                          <Button variant="outline" size="sm" className="w-full sm:flex-1 bg-transparent">
                            <IndianRupee className="h-4 w-4 mr-2" />
                            Payment History
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          {filteredAvailableSchemes.length === 0 ? (
            <Card>
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Plus className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No available schemes</h3>
                <p className="text-gray-600 mb-4">Check back later for new investment opportunities</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredAvailableSchemes.map((scheme) => (
                <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <CardTitle className="text-base sm:text-lg">{scheme.name}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={`${getSchemeTypeColor(scheme.type)} text-xs`}>{scheme.type}</Badge>
                        <Badge className={`${getSchemeStatusColor(scheme.status)} text-xs`}>{scheme.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Scheme Amount</p>
                          <p className="font-bold">₹{scheme.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Monthly</p>
                          <p className="font-bold">₹{scheme.monthlyContribution.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-bold">{scheme.duration} months</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Expected Return</p>
                          <p className="font-bold text-green-600">+₹{scheme.expectedReturn.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Member Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Members</span>
                          <span>
                            {scheme.members}/{scheme.maxMembers}
                          </span>
                        </div>
                        <Progress value={(scheme.members / scheme.maxMembers) * 100} className="h-2" />
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>Foreman: {scheme.foreman}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Starts {scheme.startDate}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button variant="outline" size="sm" className="w-full sm:flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" className="w-full sm:flex-1" disabled={scheme.status === "full"}>
                          {scheme.status === "full" ? "Scheme Full" : "Join Scheme"}
                          {scheme.status !== "full" && <ArrowRight className="h-4 w-4 ml-2" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
