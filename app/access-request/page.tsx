"use client"

import type React from "react"

import { useState } from "react"
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

      // Create mock request
      const newRequest: AccessRequest = {
        id: requestId,
        email: requestFormData.email,
        userType: requestFormData.userType,
        companyName: requestFormData.companyName,
        reason: requestFormData.reason,
        status: "approved", // Auto-approve for demo
        submittedAt: new Date().toISOString(),
      }

      // Save to localStorage for admin review
      const existingRequests = JSON.parse(localStorage.getItem("accessRequests") || "[]")
      existingRequests.push(newRequest)
      localStorage.setItem("accessRequests", JSON.stringify(existingRequests))

      // Set portal access for approved request
      document.cookie = `portal_access=true; path=/; expires=${expires}; SameSite=Lax`

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

        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard"
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

  const handleAccessPortal = () => {
    // Redirect to landing page for approved users
    window.location.href = "/"
  }

  const fillDemoCredentials = () => {
    setAdminFormData({
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password,
    })
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

        {existingRequest && existingRequest.status === "approved" ? (
          /* Approved Request Status */
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Access Approved!
              </CardTitle>
              <CardDescription className="text-green-100">
                Your access request has been approved and you can now access the portal
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
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
                  <Badge className="bg-green-100 text-green-800">Approved</Badge>
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Congratulations! Your access has been approved. You can now access the chit fund portal and explore
                  all available features.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleAccessPortal} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Shield className="h-4 w-4 mr-2" />
                  Access Portal
                </Button>
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

                    <Button
                      type="button"
                      variant="outline"
                      onClick={fillDemoCredentials}
                      className="w-full bg-transparent"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Fill Demo Credentials
                    </Button>

                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="font-medium text-gray-700 mb-2">Demo Admin Credentials:</div>
                      <div className="text-gray-600 space-y-1">
                        <div>Email: admin@chitfundportal.com</div>
                        <div>Password: Admin@123</div>
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
                <CheckCircle className="h-5 w-5 text-green-600" />
                Access Request Approved!
              </DialogTitle>
              <DialogDescription>
                Great news! Your access request has been automatically approved for demo purposes.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">You now have access to:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Full chit fund portal functionality</li>
                  <li>• Dashboard and reporting features</li>
                  <li>• User management tools</li>
                  <li>• All available system features</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSuccessDialog(false)} className="bg-green-600 hover:bg-green-700">
                Access Portal Now
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
