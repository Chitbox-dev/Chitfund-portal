"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Shield,
  User,
  Building,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Send,
  FileText,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react"

interface AccessRequest {
  id: string
  email: string
  userType: string
  companyName?: string
  reason: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  comments?: string
}

// Admin credentials for demo
const ADMIN_CREDENTIALS = {
  email: "admin@chitfundportal.com",
  password: "Admin@123",
}

export default function AccessRequestPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("request")
  const [showPassword, setShowPassword] = useState(false)

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    email: "",
    userType: "",
    companyName: "",
    reason: "",
  })

  // Admin login state
  const [adminFormData, setAdminFormData] = useState({
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [existingRequest, setExistingRequest] = useState<AccessRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user already has access
    const checkExistingAccess = () => {
      const adminAccess = document.cookie.includes("admin_access=true")
      const portalAccess = document.cookie.includes("portal_access=true")

      if (adminAccess) {
        // Admin has access, redirect to admin dashboard
        router.push("/admin/dashboard")
        return
      }

      if (portalAccess) {
        // User has portal access, redirect to landing page
        router.push("/")
        return
      }

      // Check for existing request
      const requestId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("request_id="))
        ?.split("=")[1]

      if (requestId) {
        // Check request status from localStorage
        const existingRequests = JSON.parse(localStorage.getItem("accessRequests") || "[]")
        const request = existingRequests.find((req: AccessRequest) => req.id === requestId)

        if (request) {
          setExistingRequest(request)
        }
      }

      setIsLoading(false)
    }

    checkExistingAccess()
  }, [router])

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate request ID
      const requestId = `REQ-${Date.now()}`

      // Set cookies for tracking
      const maxAge = 60 * 60 * 24 * 7 // 7 days
      const expires = new Date(Date.now() + maxAge * 1000).toUTCString()

      document.cookie = `request_id=${requestId}; path=/; expires=${expires}; SameSite=Lax`
      document.cookie = `user_email=${encodeURIComponent(requestFormData.email)}; path=/; expires=${expires}; SameSite=Lax`
      document.cookie = `user_type=${requestFormData.userType}; path=/; expires=${expires}; SameSite=Lax`

      // Create request with PENDING status (not auto-approved)
      const newRequest: AccessRequest = {
        id: requestId,
        email: requestFormData.email,
        userType: requestFormData.userType,
        companyName: requestFormData.companyName,
        reason: requestFormData.reason,
        status: "pending", // Requires admin approval
        submittedAt: new Date().toISOString(),
      }

      // Save to localStorage for admin review
      const existingRequests = JSON.parse(localStorage.getItem("accessRequests") || "[]")
      existingRequests.push(newRequest)
      localStorage.setItem("accessRequests", JSON.stringify(existingRequests))

      setExistingRequest(newRequest)
      setShowSuccessDialog(true)
    } catch (error) {
      console.error("Error submitting request:", error)
      alert("Error submitting request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validate admin credentials
      if (adminFormData.email === ADMIN_CREDENTIALS.email && adminFormData.password === ADMIN_CREDENTIALS.password) {
        // Set admin access cookies
        const maxAge = 60 * 60 * 24 * 30 // 30 days
        const expires = new Date(Date.now() + maxAge * 1000).toUTCString()

        document.cookie = `admin_access=true; path=/; expires=${expires}; SameSite=Lax`
        document.cookie = `user_type=admin; path=/; expires=${expires}; SameSite=Lax`
        document.cookie = `user_email=${encodeURIComponent(adminFormData.email)}; path=/; expires=${expires}; SameSite=Lax`

        // Set localStorage token
        localStorage.setItem("adminToken", "admin-token-123")

        // Redirect to landing page for admin
        window.location.href = "/"
      } else {
        alert("Invalid admin credentials. Please check your email and password.")
      }
    } catch (error) {
      console.error("Error logging in:", error)
      alert("Error logging in. Please try again.")
    } finally {
      setIsLoggingIn(false)
    }
  }

  const checkRequestStatus = () => {
    if (existingRequest) {
      // Check if request has been approved by admin
      const existingRequests = JSON.parse(localStorage.getItem("accessRequests") || "[]")
      const updatedRequest = existingRequests.find((req: AccessRequest) => req.id === existingRequest.id)

      if (updatedRequest && updatedRequest.status === "approved") {
        // Set portal access for approved request
        const maxAge = 60 * 60 * 24 * 30 // 30 days
        const expires = new Date(Date.now() + maxAge * 1000).toUTCString()
        document.cookie = `portal_access=true; path=/; expires=${expires}; SameSite=Lax`

        setExistingRequest(updatedRequest)
      }
    }
  }

  const handleAccessPortal = () => {
    // Only allow access if request is approved
    if (existingRequest?.status === "approved") {
      window.location.href = "/"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case "admin":
        return <Shield className="h-5 w-5" />
      case "foreman":
        return <User className="h-5 w-5" />
      case "company":
        return <Building className="h-5 w-5" />
      case "subscriber":
        return <Users className="h-5 w-5" />
      default:
        return <User className="h-5 w-5" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chit Fund Portal Access</h1>
          <p className="text-gray-600">Request access or login to the Chit Fund Management System</p>
        </div>

        {existingRequest ? (
          /* Existing Request Status */
          <Card className="shadow-xl border-0">
            <CardHeader
              className={`text-white rounded-t-lg ${
                existingRequest.status === "approved"
                  ? "bg-gradient-to-r from-green-500 to-green-600"
                  : existingRequest.status === "rejected"
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-600"
              }`}
            >
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(existingRequest.status)}
                {existingRequest.status === "approved" && "Access Approved!"}
                {existingRequest.status === "rejected" && "Access Denied"}
                {existingRequest.status === "pending" && "Request Under Review"}
              </CardTitle>
              <CardDescription
                className={
                  existingRequest.status === "approved"
                    ? "text-green-100"
                    : existingRequest.status === "rejected"
                      ? "text-red-100"
                      : "text-yellow-100"
                }
              >
                {existingRequest.status === "approved" && "Your access request has been approved"}
                {existingRequest.status === "rejected" && "Your access request has been rejected"}
                {existingRequest.status === "pending" && "Your request is being reviewed by our admin team"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div
                className={`border rounded-lg p-4 space-y-3 ${
                  existingRequest.status === "approved"
                    ? "bg-green-50 border-green-200"
                    : existingRequest.status === "rejected"
                      ? "bg-red-50 border-red-200"
                      : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Request ID:</span>
                  <span className="text-sm text-gray-900 font-mono">{existingRequest.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Email:</span>
                  <span className="text-sm text-gray-900">{existingRequest.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">User Type:</span>
                  <div className="flex items-center gap-2">
                    {getUserTypeIcon(existingRequest.userType)}
                    <span className="text-sm text-gray-900 capitalize">{existingRequest.userType}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <Badge className={getStatusColor(existingRequest.status)}>
                    {existingRequest.status.charAt(0).toUpperCase() + existingRequest.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Submitted:</span>
                  <span className="text-sm text-gray-900">
                    {new Date(existingRequest.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {existingRequest.status === "pending" && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    Your request is being reviewed by our admin team. You will receive an email notification once it's
                    processed. Typical review time is 1-2 business days.
                  </AlertDescription>
                </Alert>
              )}

              {existingRequest.status === "approved" && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Congratulations! Your access request has been approved. You can now access the portal.
                  </AlertDescription>
                </Alert>
              )}

              {existingRequest.status === "rejected" && (
                <Alert className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Your access request has been rejected. Please contact support for more information.
                    {existingRequest.comments && (
                      <div className="mt-2 text-sm">
                        <strong>Reason:</strong> {existingRequest.comments}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3">
                {existingRequest.status === "pending" && (
                  <Button onClick={checkRequestStatus} variant="outline" className="flex-1 bg-transparent">
                    <Clock className="h-4 w-4 mr-2" />
                    Check Status
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    // Clear request cookies to allow new request
                    document.cookie = "request_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                    window.location.reload()
                  }}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  New Request
                </Button>
                {existingRequest.status === "approved" && (
                  <Button onClick={handleAccessPortal} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Shield className="h-4 w-4 mr-2" />
                    Access Portal
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Main Access Form */
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>Portal Access</CardTitle>
              <CardDescription className="text-blue-100">Choose your access method below</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="request" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Request Access
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Admin Login
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="request" className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Request Portal Access</h3>
                    <p className="text-gray-600 text-sm">
                      Fill out the form below to request access to the chit fund management system
                    </p>
                  </div>

                  <form onSubmit={handleRequestSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="request-email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="request-email"
                          type="email"
                          value={requestFormData.email}
                          onChange={(e) => setRequestFormData({ ...requestFormData, email: e.target.value })}
                          placeholder="your.email@company.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="userType">User Type *</Label>
                      <Select
                        value={requestFormData.userType}
                        onValueChange={(value) => setRequestFormData({ ...requestFormData, userType: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="foreman">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Foreman
                            </div>
                          </SelectItem>
                          <SelectItem value="company">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              Company Representative
                            </div>
                          </SelectItem>
                          <SelectItem value="subscriber">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Subscriber
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(requestFormData.userType === "company" || requestFormData.userType === "foreman") && (
                      <div>
                        <Label htmlFor="companyName">Company/Organization Name</Label>
                        <Input
                          id="companyName"
                          value={requestFormData.companyName}
                          onChange={(e) => setRequestFormData({ ...requestFormData, companyName: e.target.value })}
                          placeholder="Enter your company name"
                          required={requestFormData.userType === "company"}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="reason">Reason for Access *</Label>
                      <Textarea
                        id="reason"
                        value={requestFormData.reason}
                        onChange={(e) => setRequestFormData({ ...requestFormData, reason: e.target.value })}
                        placeholder="Please explain why you need access to the system..."
                        rows={4}
                        required
                      />
                    </div>

                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertDescription>
                        Your request will be reviewed by our admin team. You will receive an email notification once
                        your request is processed. Please ensure all information is accurate.
                      </AlertDescription>
                    </Alert>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Access Request
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="admin" className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Admin Login</h3>
                    <p className="text-gray-600 text-sm">
                      Sign in with your administrator credentials for instant access
                    </p>
                  </div>

                  <Alert className="border-red-200 bg-red-50">
                    <Shield className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <strong>Admin Access Only</strong>
                      <br />
                      This login is restricted to authorized system administrators only.
                    </AlertDescription>
                  </Alert>

                  <form onSubmit={handleAdminLogin} className="space-y-6">
                    <div>
                      <Label htmlFor="admin-email">Admin Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="admin-email"
                          type="email"
                          value={adminFormData.email}
                          onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                          placeholder="Enter admin email"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="admin-password">Admin Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="admin-password"
                          type={showPassword ? "text" : "password"}
                          value={adminFormData.password}
                          onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })}
                          placeholder="Enter admin password"
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" disabled={isLoggingIn} className="w-full bg-red-600 hover:bg-red-700">
                      {isLoggingIn ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing In...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Sign In as Admin
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                Request Submitted Successfully
              </DialogTitle>
              <DialogDescription>
                Your access request has been submitted and is now pending admin approval.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">What happens next?</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Your request will be reviewed by our admin team</li>
                  <li>• You'll receive an email notification with the decision</li>
                  <li>• If approved, you'll get access to the portal</li>
                  <li>• You can check your request status anytime on this page</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSuccessDialog(false)} className="bg-yellow-600 hover:bg-yellow-700">
                Got it, thanks!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Need help? Contact{" "}
            <a href="mailto:support@chitfundportal.com" className="text-blue-600 hover:underline">
              support@chitfundportal.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
