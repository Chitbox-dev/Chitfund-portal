"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  TrendingUp,
  DollarSign,
  CreditCard,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  Calendar,
  Clock,
  Award,
  Target,
} from "lucide-react"

export default function UserDashboard() {
  const [showUCFSIN, setShowUCFSIN] = useState(false)
  const [copiedUCFSIN, setCopiedUCFSIN] = useState(false)

  // Mock user data
  const userData = {
    name: "Rajesh Kumar",
    ucfsin: "KA-123-A7B-456",
    totalSchemes: 2,
    chitScore: 850,
    totalPaid: 52000,
    activeSchemes: [
      {
        id: 1,
        name: "Monthly Savings Scheme",
        chitValue: 100000,
        monthlyPremium: 5000,
        paidInstallments: 8,
        totalInstallments: 20,
        nextPaymentDate: "2025-08-15",
        status: "Active",
      },
      {
        id: 2,
        name: "Festival Fund Scheme",
        chitValue: 50000,
        monthlyPremium: 2500,
        paidInstallments: 12,
        totalInstallments: 20,
        nextPaymentDate: "2025-08-10",
        status: "Active",
      },
    ],
  }

  const handleCopyUCFSIN = async () => {
    try {
      await navigator.clipboard.writeText(userData.ucfsin)
      setCopiedUCFSIN(true)
      setTimeout(() => setCopiedUCFSIN(false), 2000)
    } catch (err) {
      console.error("Failed to copy UCFSIN:", err)
    }
  }

  const formatUCFSIN = (ucfsin: string) => {
    if (!showUCFSIN) {
      return "KA-***-***-***"
    }
    return ucfsin
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {userData.name}!</h1>
        <p className="text-blue-100">Here's your chit fund portfolio overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Schemes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Schemes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{userData.totalSchemes}</div>
            <p className="text-xs text-muted-foreground">Currently participating</p>
          </CardContent>
        </Card>

        {/* Chit Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chit Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userData.chitScore}</div>
            <p className="text-xs text-muted-foreground">Excellent rating</p>
          </CardContent>
        </Card>

        {/* Total Paid */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₹{userData.totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all schemes</p>
          </CardContent>
        </Card>

        {/* UCFSIN Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">UCFSIN</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <code className="text-lg font-mono font-bold text-gray-900">{formatUCFSIN(userData.ucfsin)}</code>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => setShowUCFSIN(!showUCFSIN)} className="h-6 w-6 p-0">
                  {showUCFSIN ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopyUCFSIN} className="h-6 w-6 p-0">
                  {copiedUCFSIN ? <CheckCircle className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Your unique identifier</p>
          </CardContent>
        </Card>
      </div>

      {/* UCFSIN Format Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            UCFSIN Format Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Your UCFSIN: {userData.ucfsin}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    KA
                  </Badge>
                  <span className="text-blue-700">Karnataka state code</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    123
                  </Badge>
                  <span className="text-blue-700">Characters 6-8 from your PAN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">
                    A7B
                  </Badge>
                  <span className="text-blue-700">Random alphanumeric sequence</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-orange-100 text-orange-800">
                    456
                  </Badge>
                  <span className="text-blue-700">Last 3 digits from your Aadhaar</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h5 className="font-semibold text-blue-900 mb-2">Security Features</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Unique identifier for chit fund participation</li>
                <li>• Links to your verified PAN and Aadhaar</li>
                <li>• Prevents duplicate registrations</li>
                <li>• Ensures regulatory compliance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Schemes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Active Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.activeSchemes.map((scheme) => (
              <div key={scheme.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{scheme.name}</h3>
                    <p className="text-sm text-gray-600">Chit Value: ₹{scheme.chitValue.toLocaleString()}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{scheme.status}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Monthly Premium</p>
                      <p className="font-semibold">₹{scheme.monthlyPremium.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Next Payment</p>
                      <p className="font-semibold">{new Date(scheme.nextPaymentDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Progress</p>
                      <p className="font-semibold">
                        {scheme.paidInstallments}/{scheme.totalInstallments}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment Progress</span>
                    <span>{Math.round((scheme.paidInstallments / scheme.totalInstallments) * 100)}%</span>
                  </div>
                  <Progress value={(scheme.paidInstallments / scheme.totalInstallments) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex flex-col gap-2">
              <DollarSign className="h-5 w-5" />
              Make Payment
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
              <Users className="h-5 w-5" />
              View Schemes
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
              <CreditCard className="h-5 w-5" />
              UCFSIN Card
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
