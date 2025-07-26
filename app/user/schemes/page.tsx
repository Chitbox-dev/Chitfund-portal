"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Users, DollarSign, Calendar, Clock, TrendingUp, Eye, Download, AlertCircle } from "lucide-react"

export default function UserSchemes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock schemes data
  const schemes = [
    {
      id: 1,
      name: "Monthly Savings Scheme",
      schemeId: "SCH-2024-001",
      chitValue: 100000,
      monthlyPremium: 5000,
      duration: 20,
      paidInstallments: 8,
      totalInstallments: 20,
      nextPaymentDate: "2025-08-15",
      status: "Active",
      joinedDate: "2024-01-15",
      foremanName: "Suresh Kumar",
      totalSubscribers: 20,
      currentPosition: 8,
    },
    {
      id: 2,
      name: "Festival Fund Scheme",
      schemeId: "SCH-2024-002",
      chitValue: 50000,
      monthlyPremium: 2500,
      duration: 20,
      paidInstallments: 12,
      totalInstallments: 20,
      nextPaymentDate: "2025-08-10",
      status: "Active",
      joinedDate: "2024-02-01",
      foremanName: "Ramesh Patel",
      totalSubscribers: 20,
      currentPosition: 12,
    },
    {
      id: 3,
      name: "Education Fund Scheme",
      schemeId: "SCH-2023-015",
      chitValue: 200000,
      monthlyPremium: 10000,
      duration: 20,
      paidInstallments: 20,
      totalInstallments: 20,
      nextPaymentDate: null,
      status: "Completed",
      joinedDate: "2023-03-01",
      foremanName: "Vikash Sharma",
      totalSubscribers: 20,
      currentPosition: 20,
    },
    {
      id: 4,
      name: "Home Renovation Scheme",
      schemeId: "SCH-2024-008",
      chitValue: 150000,
      monthlyPremium: 7500,
      duration: 20,
      paidInstallments: 3,
      totalInstallments: 20,
      nextPaymentDate: "2025-08-20",
      status: "Pending",
      joinedDate: "2024-05-15",
      foremanName: "Amit Gupta",
      totalSubscribers: 15,
      currentPosition: 3,
    },
  ]

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.schemeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.foremanName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || scheme.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Schemes</h1>
          <p className="text-gray-600">Manage and track your chit fund schemes</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Schemes</p>
                <p className="text-2xl font-bold">{schemes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Schemes</p>
                <p className="text-2xl font-bold">{schemes.filter((s) => s.status === "Active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold">
                  ₹{schemes.reduce((sum, s) => sum + s.paidInstallments * s.monthlyPremium, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Payment</p>
                <p className="text-lg font-bold">Aug 10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search schemes by name, ID, or foreman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("active")}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No schemes found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{scheme.name}</h3>
                    <p className="text-sm text-gray-600">Scheme ID: {scheme.schemeId}</p>
                    <p className="text-sm text-gray-600">Foreman: {scheme.foremanName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(scheme.status)}>{scheme.status}</Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Chit Value</p>
                      <p className="font-semibold">₹{scheme.chitValue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Monthly Premium</p>
                      <p className="font-semibold">₹{scheme.monthlyPremium.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold">{scheme.duration} months</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Subscribers</p>
                      <p className="font-semibold">{scheme.totalSubscribers}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Payment Progress</span>
                    <span className="text-sm text-gray-600">
                      {scheme.paidInstallments}/{scheme.totalInstallments} installments
                    </span>
                  </div>
                  <Progress value={(scheme.paidInstallments / scheme.totalInstallments) * 100} className="h-2" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Paid: ₹{(scheme.paidInstallments * scheme.monthlyPremium).toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      Remaining: ₹
                      {((scheme.totalInstallments - scheme.paidInstallments) * scheme.monthlyPremium).toLocaleString()}
                    </span>
                  </div>
                  {scheme.nextPaymentDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span>Next payment due: {new Date(scheme.nextPaymentDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
