"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Download,
  Share2,
  CreditCard,
  Copy,
  QrCode,
  Shield,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  FileText,
  Clock,
  Edit,
} from "lucide-react"
import Link from "next/link"

export default function UCFSINCardPage() {
  const [copied, setCopied] = useState(false)
  const [pendingRequest, setPendingRequest] = useState(null)

  // Check for pending change requests
  useEffect(() => {
    const changeRequests = JSON.parse(localStorage.getItem("changeRequests") || "[]")
    const pending = changeRequests.find((req) => req.status === "pending")
    setPendingRequest(pending)
  }, [])

  const cardData = {
    ucfsinNumber: "UCFSIN-2024-001234",
    holderName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Bangalore, Karnataka - 560001",
    registrationDate: "15 Jan 2024",
    expiryDate: "15 Jan 2029",
    status: "Active",
    cardType: "Digital",
    verificationStatus: {
      kyc: true,
      address: true,
      bank: true,
    },
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/user/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">E-UCFSIN Card</h1>
                <p className="text-sm text-gray-500">Your digital identity card</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">{cardData.status}</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pending Change Request Alert */}
        {pendingRequest && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-900 mb-1">Change Request Under Review</h3>
                <p className="text-sm text-yellow-800 mb-2">
                  Your request to change {pendingRequest.type.replace("_", " & ")} is being reviewed by our admin team.
                </p>
                <div className="flex items-center gap-4 text-xs text-yellow-700">
                  <span>Request ID: {pendingRequest.id}</span>
                  <span>Submitted: {pendingRequest.submittedDate}</span>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    {pendingRequest.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Digital Card Display */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#6366f1] p-8 text-white relative">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full"></div>
                </div>

                {/* Card Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">UCFSIN</h2>
                        <p className="text-sm opacity-90">Digital Identity Card</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-75">Valid Until</p>
                      <p className="font-semibold">{cardData.expiryDate}</p>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="mb-6">
                    <p className="text-sm opacity-75 mb-1">UCFSIN Number</p>
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-mono font-bold tracking-wider">{cardData.ucfsinNumber}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(cardData.ucfsinNumber)}
                        className="text-white hover:bg-white/20 p-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    {copied && <p className="text-xs text-green-200 mt-1">Copied to clipboard!</p>}
                  </div>

                  {/* Cardholder Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm opacity-75 mb-1">Cardholder Name</p>
                      <p className="font-semibold text-lg">{cardData.holderName}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75 mb-1">Registration Date</p>
                      <p className="font-semibold">{cardData.registrationDate}</p>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm">Verified & Secure</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Object.entries(cardData.verificationStatus).map(([key, verified]) => (
                          <div
                            key={key}
                            className={`h-2 w-2 rounded-full ${verified ? "bg-green-400" : "bg-red-400"}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card Details */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email</p>
                        <p className="text-sm text-gray-900">{cardData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Mobile</p>
                        <p className="text-sm text-gray-900">{cardData.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Address</p>
                        <p className="text-sm text-gray-900">{cardData.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Card Type</p>
                        <p className="text-sm text-gray-900">{cardData.cardType}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Verification Status</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs font-medium text-green-800">KYC</p>
                        <p className="text-xs text-green-600">Verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs font-medium text-green-800">Address</p>
                        <p className="text-xs text-green-600">Verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs font-medium text-green-800">Bank</p>
                        <p className="text-xs text-green-600">Verified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Card Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Card Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2 bg-[#1e3a8a] hover:bg-[#3b82f6]">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Share2 className="h-4 w-4" />
                  Share Card
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <QrCode className="h-4 w-4" />
                  Generate QR Code
                </Button>
                <Link href="/user/card/change-request">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 bg-transparent"
                    disabled={pendingRequest}
                  >
                    <Edit className="h-4 w-4" />
                    Request Change
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  disabled={pendingRequest}
                >
                  <CreditCard className="h-4 w-4" />
                  Request Physical Card
                </Button>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/user/help">
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <FileText className="h-4 w-4" />
                    Submit Grievance
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Phone className="h-4 w-4" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-orange-900 mb-1">Security Notice</h4>
                    <p className="text-xs text-orange-800">
                      Never share your UCFSIN number with unauthorized persons. Always verify the identity of anyone
                      requesting your card details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
