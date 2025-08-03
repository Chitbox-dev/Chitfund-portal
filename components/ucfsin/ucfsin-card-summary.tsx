"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Copy,
  Download,
  Eye,
  Shield,
  DollarSign,
  BarChart3,
  Activity,
} from "lucide-react"

interface UserProfile {
  ucfsinId: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  registrationDate: string
  status: "active" | "suspended" | "pending"
  kycStatus: "verified" | "pending" | "rejected"
  cardStatus: "delivered" | "shipped" | "processing" | "not_requested"
  chitScore: {
    score: number
    maxScore: number
    grade: string
    factors: {
      paymentHistory: number
      creditUtilization: number
      accountAge: number
      mixOfCredit: number
      newCredit: number
    }
  }
  activeSchemes: Array<{
    schemeId: string
    schemeName: string
    ticketNumber: number
    monthlyPremium: number
    totalPaid: number
    status: "active" | "completed" | "defaulted"
    joinDate: string
  }>
  documents: Array<{
    type: string
    status: "verified" | "pending" | "rejected"
    uploadDate: string
    expiryDate?: string
  }>
  transactions: Array<{
    id: string
    type: "premium" | "payout" | "dividend" | "penalty"
    amount: number
    date: string
    schemeId: string
    status: "completed" | "pending" | "failed"
  }>
}

const sampleUserProfile: UserProfile = {
  ucfsinId: "UCFSIN2024001",
  name: "Anita Sharma",
  email: "anita.sharma@email.com",
  phone: "+91 9876543213",
  dateOfBirth: "1985-03-15",
  address: {
    street: "123 MG Road",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
  },
  registrationDate: "2024-01-15",
  status: "active",
  kycStatus: "verified",
  cardStatus: "delivered",
  chitScore: {
    score: 742,
    maxScore: 850,
    grade: "Good",
    factors: {
      paymentHistory: 85,
      creditUtilization: 65,
      accountAge: 78,
      mixOfCredit: 72,
      newCredit: 68,
    },
  },
  activeSchemes: [
    {
      schemeId: "SCH001",
      schemeName: "Monthly Savings Scheme",
      ticketNumber: 5,
      monthlyPremium: 10000,
      totalPaid: 120000,
      status: "active",
      joinDate: "2024-01-20",
    },
    {
      schemeId: "SCH003",
      schemeName: "Family Welfare Scheme",
      ticketNumber: 12,
      monthlyPremium: 5000,
      totalPaid: 60000,
      status: "active",
      joinDate: "2024-02-01",
    },
  ],
  documents: [
    {
      type: "PAN Card",
      status: "verified",
      uploadDate: "2024-01-15",
    },
    {
      type: "Aadhaar Card",
      status: "verified",
      uploadDate: "2024-01-15",
    },
    {
      type: "Address Proof",
      status: "verified",
      uploadDate: "2024-01-16",
    },
    {
      type: "Bank Statement",
      status: "verified",
      uploadDate: "2024-01-16",
    },
  ],
  transactions: [
    {
      id: "TXN001",
      type: "premium",
      amount: 10000,
      date: "2025-01-15",
      schemeId: "SCH001",
      status: "completed",
    },
    {
      id: "TXN002",
      type: "premium",
      amount: 5000,
      date: "2025-01-15",
      schemeId: "SCH003",
      status: "completed",
    },
    {
      id: "TXN003",
      type: "dividend",
      amount: 2500,
      date: "2024-12-30",
      schemeId: "SCH001",
      status: "completed",
    },
  ],
}

export function UCFSINCardSummary() {
  const [userProfile] = useState<UserProfile>(sampleUserProfile)
  const [activeTab, setActiveTab] = useState("overview")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "pending":
      case "processing":
      case "shipped":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "suspended":
      case "rejected":
      case "failed":
      case "defaulted":
        return "bg-red-100 text-red-800 border-red-300"
      case "not_requested":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600"
    if (score >= 650) return "text-yellow-600"
    return "text-red-600"
  }

  const getGradeColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-300"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "poor":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">UCFSIN Profile Summary</h1>
          <p className="text-gray-600 mt-2">Complete user profile and chit fund participation details</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Profile
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Certificate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* UCFSIN Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Card Design */}
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl p-6 text-white shadow-2xl">
                <div className="absolute top-4 right-4">
                  <Shield className="h-8 w-8 text-blue-200" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">UCFSIN ID</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold font-mono">{userProfile.ucfsinId}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(userProfile.ucfsinId)}
                        className="text-white hover:bg-blue-700 h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Cardholder Name</p>
                    <p className="text-lg font-semibold">{userProfile.name}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-blue-200 text-xs">Member Since</p>
                      <p className="text-sm font-medium">
                        {new Date(userProfile.registrationDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-200 text-xs">Status</p>
                      <Badge className="bg-green-500 text-white border-green-400">
                        {userProfile.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 opacity-10">
                  <CreditCard className="h-24 w-24" />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{userProfile.activeSchemes.length}</p>
                  <p className="text-sm text-gray-600">Active Schemes</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{userProfile.activeSchemes.reduce((sum, scheme) => sum + scheme.totalPaid, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Invested</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chit-score">Chit Score</TabsTrigger>
              <TabsTrigger value="schemes">Schemes</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Full Name</p>
                          <p className="font-medium">{userProfile.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{userProfile.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{userProfile.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Date of Birth</p>
                          <p className="font-medium">{new Date(userProfile.dateOfBirth).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">
                            {userProfile.address.street}, {userProfile.address.city}
                          </p>
                          <p className="text-sm text-gray-500">
                            {userProfile.address.state} - {userProfile.address.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="font-medium">Account Status</p>
                      <Badge className={getStatusColor(userProfile.status)}>{userProfile.status.toUpperCase()}</Badge>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="font-medium">KYC Status</p>
                      <Badge className={getStatusColor(userProfile.kycStatus)}>
                        {userProfile.kycStatus.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <CreditCard className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="font-medium">Card Status</p>
                      <Badge className={getStatusColor(userProfile.cardStatus)}>
                        {userProfile.cardStatus.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chit-score" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Chit Score Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Score Display */}
                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <p className={`text-3xl font-bold ${getScoreColor(userProfile.chitScore.score)}`}>
                              {userProfile.chitScore.score}
                            </p>
                            <p className="text-sm text-gray-600">/{userProfile.chitScore.maxScore}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge className={getGradeColor(userProfile.chitScore.grade)} variant="outline">
                          {userProfile.chitScore.grade} Credit
                        </Badge>
                        <p className="text-sm text-gray-600 mt-2">Your chit score is better than 68% of users</p>
                      </div>
                    </div>

                    {/* Score Factors */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Score Factors</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Payment History</span>
                            <span className="text-sm text-gray-600">
                              {userProfile.chitScore.factors.paymentHistory}%
                            </span>
                          </div>
                          <Progress value={userProfile.chitScore.factors.paymentHistory} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Credit Utilization</span>
                            <span className="text-sm text-gray-600">
                              {userProfile.chitScore.factors.creditUtilization}%
                            </span>
                          </div>
                          <Progress value={userProfile.chitScore.factors.creditUtilization} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Account Age</span>
                            <span className="text-sm text-gray-600">{userProfile.chitScore.factors.accountAge}%</span>
                          </div>
                          <Progress value={userProfile.chitScore.factors.accountAge} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Mix of Credit</span>
                            <span className="text-sm text-gray-600">{userProfile.chitScore.factors.mixOfCredit}%</span>
                          </div>
                          <Progress value={userProfile.chitScore.factors.mixOfCredit} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">New Credit</span>
                            <span className="text-sm text-gray-600">{userProfile.chitScore.factors.newCredit}%</span>
                          </div>
                          <Progress value={userProfile.chitScore.factors.newCredit} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Improvement Tips */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Tips to Improve Your Score</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Make all premium payments on time</li>
                        <li>• Maintain a good payment history across all schemes</li>
                        <li>• Avoid defaulting on any chit fund commitments</li>
                        <li>• Participate in multiple schemes to diversify your portfolio</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schemes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Active Schemes ({userProfile.activeSchemes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.activeSchemes.map((scheme) => (
                      <div key={scheme.schemeId} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{scheme.schemeName}</h4>
                            <p className="text-sm text-gray-600">Scheme ID: {scheme.schemeId}</p>
                          </div>
                          <Badge className={getStatusColor(scheme.status)}>{scheme.status.toUpperCase()}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Ticket Number</p>
                            <p className="font-medium">#{scheme.ticketNumber}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Monthly Premium</p>
                            <p className="font-medium">₹{scheme.monthlyPremium.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Paid</p>
                            <p className="font-medium">₹{scheme.totalPaid.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Join Date</p>
                            <p className="font-medium">{new Date(scheme.joinDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userProfile.documents.map((doc, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <h4 className="font-medium">{doc.type}</h4>
                          </div>
                          <Badge className={getStatusColor(doc.status)}>{doc.status.toUpperCase()}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                          {doc.expiryDate && <p>Expires: {new Date(doc.expiryDate).toLocaleDateString()}</p>}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userProfile.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "premium"
                                ? "bg-red-100"
                                : transaction.type === "payout"
                                  ? "bg-green-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            {transaction.type === "premium" ? (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium capitalize">{transaction.type}</p>
                            <p className="text-sm text-gray-600">
                              {transaction.schemeId} • {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              transaction.type === "premium" ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {transaction.type === "premium" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                          </p>
                          <Badge className={getStatusColor(transaction.status)} variant="outline">
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
      </div>
    </div>
  )
}
