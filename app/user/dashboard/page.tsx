"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  EyeOff,
  Copy,
  CreditCard,
  TrendingUp,
  Calendar,
  IndianRupee,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { toast } from "sonner"

export default function UserDashboard() {
  const [showUCFSIN, setShowUCFSIN] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const userData = {
    name: "Rajesh Kumar",
    ucfsin: "KA-123-A7B-456",
    memberSince: "January 2024",
    totalInvestment: 125000,
    currentValue: 132500,
    activeSchemes: 3,
    completedSchemes: 1,
    nextPayment: "15 Feb 2024",
    nextPaymentAmount: 5000,
  }

  const schemes = [
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
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      type: "payment",
      scheme: "Monthly Savings Scheme",
      amount: 5000,
      date: "15 Jan 2024",
      status: "completed",
    },
    { id: 2, type: "return", scheme: "Education Fund", amount: 34500, date: "10 Jan 2024", status: "completed" },
    { id: 3, type: "payment", scheme: "Festival Special", amount: 2500, date: "20 Dec 2023", status: "completed" },
    { id: 4, type: "payment", scheme: "Business Growth Fund", amount: 10000, date: "25 Dec 2023", status: "completed" },
  ]

  const copyUCFSIN = () => {
    navigator.clipboard.writeText(userData.ucfsin)
    toast.success("UCFSIN copied to clipboard!")
  }

  const formatUCFSIN = (ucfsin: string) => {
    if (!showUCFSIN) {
      return ucfsin.replace(/./g, "*").slice(0, -3) + ucfsin.slice(-3)
    }
    return ucfsin
  }

  const getSchemeStatusColor = (status: string) => {
    switch (status) {
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

  const getTransactionIcon = (type: string) => {
    return type === "payment" ? (
      <IndianRupee className="h-4 w-4 text-red-600" />
    ) : (
      <TrendingUp className="h-4 w-4 text-green-600" />
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {userData.name}!</h1>
          <p className="text-sm sm:text-base text-gray-600">Member since {userData.memberSince}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
            <Bell className="h-4 w-4 mr-2" />
            <span className="sm:hidden">Notifications</span>
            <span className="hidden sm:inline">View Notifications</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* UCFSIN Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base font-medium">Your UCFSIN</span>
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold tracking-wider mb-2">
                {formatUCFSIN(userData.ucfsin)}
              </div>
              <div className="text-xs sm:text-sm opacity-90">Universal Chit Fund Subscriber Identification Number</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowUCFSIN(!showUCFSIN)}
                className="w-full sm:w-auto"
              >
                {showUCFSIN ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showUCFSIN ? "Hide" : "Show"}
              </Button>
              <Button variant="secondary" size="sm" onClick={copyUCFSIN} className="w-full sm:w-auto">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          {/* UCFSIN Format Breakdown */}
          {showUCFSIN && (
            <div className="mt-4 p-3 sm:p-4 bg-white/10 rounded-lg">
              <h4 className="text-sm font-medium mb-2">UCFSIN Format Breakdown:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <span className="font-mono bg-white/20 px-2 py-1 rounded">KA</span>
                  <p className="mt-1 opacity-90">State Code (Karnataka)</p>
                </div>
                <div>
                  <span className="font-mono bg-white/20 px-2 py-1 rounded">123</span>
                  <p className="mt-1 opacity-90">PAN Last 3 Digits</p>
                </div>
                <div>
                  <span className="font-mono bg-white/20 px-2 py-1 rounded">A7B-456</span>
                  <p className="mt-1 opacity-90">Unique Identifier</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Investment</p>
                <p className="text-lg sm:text-2xl font-bold">₹{userData.totalInvestment.toLocaleString()}</p>
              </div>
              <IndianRupee className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Current Value</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">
                  ₹{userData.currentValue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Active Schemes</p>
                <p className="text-lg sm:text-2xl font-bold">{userData.activeSchemes}</p>
              </div>
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Next Payment</p>
                <p className="text-sm sm:text-base font-bold">{userData.nextPayment}</p>
                <p className="text-xs sm:text-sm text-gray-500">₹{userData.nextPaymentAmount.toLocaleString()}</p>
              </div>
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="schemes" className="text-xs sm:text-sm">
            My Schemes
          </TabsTrigger>
          <TabsTrigger value="transactions" className="text-xs sm:text-sm">
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Portfolio Performance */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Returns</span>
                    <span className="font-bold text-green-600">
                      +₹{(userData.currentValue - userData.totalInvestment).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Return Rate</span>
                    <span className="font-bold text-green-600">
                      +
                      {(((userData.currentValue - userData.totalInvestment) / userData.totalInvestment) * 100).toFixed(
                        1,
                      )}
                      %
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-500">Portfolio performing well compared to average</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Join New Scheme
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    Make Payment
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    View UCFSIN Card
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Get Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schemes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {schemes.map((scheme) => (
              <Card key={scheme.id}>
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <CardTitle className="text-base sm:text-lg">{scheme.name}</CardTitle>
                    <Badge className={`${getSchemeStatusColor(scheme.status)} text-xs`}>{scheme.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
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

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round((scheme.currentMonth / scheme.duration) * 100)}%</span>
                      </div>
                      <Progress value={(scheme.currentMonth / scheme.duration) * 100} className="h-2" />
                    </div>

                    {scheme.status === "active" && scheme.nextPayment && (
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium">Next Payment: {scheme.nextPayment}</span>
                        </div>
                        <Button size="sm" className="text-xs sm:text-sm">
                          Pay Now
                        </Button>
                      </div>
                    )}

                    {scheme.status === "completed" && (
                      <div className="flex items-center gap-2 p-2 sm:p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Scheme Completed Successfully</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(transaction.type)}
                      <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">{transaction.scheme}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold text-sm sm:text-base ${
                          transaction.type === "payment" ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {transaction.type === "payment" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
