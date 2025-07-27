"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building, Users, UserCheck, Shield, CheckCircle, Clock, FileText, Lock } from "lucide-react"

interface AccessRequest {
  id: string
  requestType: "admin" | "company" | "user" | "foreman"
  companyName?: string
  contactPerson: string
  email: string
  phone: string
  password?: string
  purpose: string
  businessType?: string
  userType?: string
  experience?: string
  mcqAnswers?: { [key: string]: string }
  mcqScore?: number
  status: "pending" | "mcq_required" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  adminComments?: string
}

// Admin login credentials
const ADMIN_CREDENTIALS = {
  email: "admin@chitfundportal.com",
  password: "Admin@123",
}

// Enhanced MCQ Questions with PSO focus
const companyMCQs = [
  {
    id: "q1",
    question: "What type of financial services does your company primarily provide?",
    options: ["Payment Gateway Services", "SMS/Communication Services", "Banking Services", "Insurance Services"],
    correct: 0,
  },
  {
    id: "q2",
    question: "What is PSO in chit fund context?",
    options: ["Personal Security Officer", "Prior Sanction Order", "Public Safety Order", "Payment Security Option"],
    correct: 1,
  },
  {
    id: "q3",
    question: "What is your primary reason for accessing our chit fund platform?",
    options: ["Integration partnership", "Service provision", "Market research", "Investment opportunity"],
    correct: 0,
  },
]

const userMCQs = [
  {
    id: "q1",
    question: "What is a chit fund?",
    options: ["A type of bank account", "A savings and credit scheme", "An insurance policy", "A stock investment"],
    correct: 1,
  },
  {
    id: "q2",
    question: "What does PSO stand for in chit fund regulations?",
    options: ["Personal Security Officer", "Prior Sanction Order", "Public Safety Order", "Payment Security Option"],
    correct: 1,
  },
  {
    id: "q3",
    question: "What is UCFSIN?",
    options: [
      "A bank account number",
      "Unique Chit Fund Subscriber Identification Number",
      "A government scheme",
      "A credit score",
    ],
    correct: 1,
  },
  {
    id: "q4",
    question: "When is PSO required in chit fund operations?",
    options: [
      "Only for large chit funds",
      "Before starting any chit fund business",
      "After completing the first chit",
      "Only for online chit funds",
    ],
    correct: 1,
  },
]

const foremanMCQs = [
  {
    id: "q1",
    question: "What is PSO (Prior Sanction Order) in chit fund regulations?",
    options: [
      "A payment method",
      "Mandatory approval required before starting chit fund business",
      "A type of chit fund scheme",
      "A security deposit",
    ],
    correct: 1,
  },
  {
    id: "q2",
    question: "Which authority issues PSO for chit funds?",
    options: [
      "Reserve Bank of India",
      "State Government/Registrar of Chit Funds",
      "Securities and Exchange Board of India",
      "Ministry of Finance",
    ],
    correct: 1,
  },
  {
    id: "q3",
    question: "What is the primary responsibility of a chit fund foreman?",
    options: [
      "Only collecting money",
      "Managing the entire chit fund operation and compliance",
      "Just conducting auctions",
      "Only keeping records",
    ],
    correct: 1,
  },
  {
    id: "q4",
    question: "What percentage of chit amount must be deposited as security by foreman?",
    options: ["5%", "10%", "15%", "20%"],
    correct: 1,
  },
  {
    id: "q5",
    question: "What documents are typically required for PSO application?",
    options: [
      "Only business registration",
      "Business plan, financial statements, security deposit proof",
      "Just identity proof",
      "Only address proof",
    ],
    correct: 1,
  },
]

export default function AccessRequestPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [requestType, setRequestType] = useState<"admin" | "company" | "user" | "foreman" | "">("")
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    password: "",
    purpose: "",
    businessType: "",
    userType: "",
    experience: "",
  })
  const [mcqAnswers, setMcqAnswers] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentMCQs, setCurrentMCQs] = useState<any[]>([])

  const handleRequestTypeSelect = (type: "admin" | "company" | "user" | "foreman") => {
    setRequestType(type)
    setStep(2)
  }

  const handleFormSubmit = () => {
    if (requestType === "admin") {
      // Admin login validation
      if (formData.email === ADMIN_CREDENTIALS.email && formData.password === ADMIN_CREDENTIALS.password) {
        submitRequest()
      } else {
        alert("Invalid admin credentials. Please check your email and password.")
        return
      }
    } else if (requestType === "company") {
      // Companies go directly to admin approval
      submitRequest()
    } else {
      // Users and foremen need to take MCQ first
      if (requestType === "user") {
        setCurrentMCQs(userMCQs)
      } else if (requestType === "foreman") {
        setCurrentMCQs(foremanMCQs)
      }
      setStep(3)
    }
  }

  const calculateMCQScore = () => {
    let correct = 0
    currentMCQs.forEach((mcq) => {
      if (Number.parseInt(mcqAnswers[mcq.id]) === mcq.correct) {
        correct++
      }
    })
    return Math.round((correct / currentMCQs.length) * 100)
  }

  const submitRequest = async () => {
    setIsSubmitting(true)

    const score = currentMCQs.length > 0 ? calculateMCQScore() : undefined
    const passThreshold = requestType === "foreman" ? 80 : 70

    const request: AccessRequest = {
      id: `REQ-${Date.now()}`,
      requestType: requestType as "admin" | "company" | "user" | "foreman",
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      password: requestType === "admin" ? formData.password : undefined,
      purpose: formData.purpose,
      businessType: formData.businessType,
      userType: formData.userType,
      experience: formData.experience,
      mcqAnswers: Object.keys(mcqAnswers).length > 0 ? mcqAnswers : undefined,
      mcqScore: score,
      status: "approved",
      submittedAt: new Date().toISOString(),
    }

    // Save to localStorage for admin review
    const existingRequests = JSON.parse(localStorage.getItem("accessRequests") || "[]")
    existingRequests.push(request)
    localStorage.setItem("accessRequests", JSON.stringify(existingRequests))

    // Set access cookies based on user type
    const maxAge = 60 * 60 * 24 * 30 // 30 days
    const expires = new Date(Date.now() + maxAge * 1000).toUTCString()

    if (requestType === "admin") {
      // Only admin gets landing page access
      document.cookie = `admin_access=true; path=/; expires=${expires}; SameSite=Lax`
      document.cookie = `user_type=admin; path=/; expires=${expires}; SameSite=Lax`
      document.cookie = `user_email=${encodeURIComponent(formData.email)}; path=/; expires=${expires}; SameSite=Lax`
      localStorage.setItem("adminToken", "admin-token-123")
    } else {
      // Other users get access to their respective portals only
      document.cookie = `portal_access=true; path=/; expires=${expires}; SameSite=Lax`
      document.cookie = `user_type=${requestType}; path=/; expires=${expires}; SameSite=Lax`
      document.cookie = `user_email=${encodeURIComponent(formData.email)}; path=/; expires=${expires}; SameSite=Lax`

      // Set specific tokens for different user types
      if (requestType === "foreman") {
        localStorage.setItem("foremanToken", "foreman-token-123")
      } else if (requestType === "user") {
        localStorage.setItem("userToken", "user-token-123")
      }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setStep(4)
  }

  const handleAccessPortal = () => {
    if (requestType === "admin") {
      router.push("/") // Admin goes to landing page
    } else if (requestType === "foreman") {
      router.push("/foreman/dashboard")
    } else if (requestType === "user") {
      router.push("/user/dashboard")
    } else if (requestType === "company") {
      router.push("/admin/dashboard") // Companies get admin panel access
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select Access Type"
      case 2:
        return requestType === "admin" ? "Admin Login" : "Provide Details"
      case 3:
        return "Knowledge Assessment"
      case 4:
        return "Access Granted"
      default:
        return ""
    }
  }

  const getProgressValue = () => {
    return (step / 4) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8" />
              <CardTitle className="text-2xl font-bold">Chit Fund Portal Access Request</CardTitle>
            </div>
            <div className="text-blue-100">Secure access control for chitfundportal.vercel.app</div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
                <span>Step {step} of 4</span>
                <span>{getStepTitle()}</span>
              </div>
              <Progress value={getProgressValue()} className="h-2 bg-blue-500/30" />
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Your Access Type</h3>
                  <div className="text-gray-600">Choose the category that best describes your access requirement</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500"
                    onClick={() => handleRequestTypeSelect("admin")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-red-600" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Admin</h4>
                      <div className="text-sm text-gray-600 mb-4">
                        System administrator with full access to landing page and admin panel
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Login Required
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500"
                    onClick={() => handleRequestTypeSelect("company")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Company/Business</h4>
                      <div className="text-sm text-gray-600 mb-4">
                        Payment gateways, SMS providers, financial services, etc.
                      </div>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Admin Review
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500"
                    onClick={() => handleRequestTypeSelect("user")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">User/Subscriber</h4>
                      <div className="text-sm text-gray-600 mb-4">
                        Individual users wanting to participate in chit funds
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        PSO Knowledge Test
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500"
                    onClick={() => handleRequestTypeSelect("foreman")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserCheck className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Foreman</h4>
                      <div className="text-sm text-gray-600 mb-4">Chit fund operators and scheme managers</div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Advanced PSO Assessment
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800">Access Control Information</div>
                      <div className="text-sm text-yellow-700 mt-1">
                        <strong>Admin:</strong> Full access to landing page and admin panel with login credentials.
                        <br />
                        <strong>Companies:</strong> Access to admin panel for integration and services.
                        <br />
                        <strong>Users & Foremen:</strong> Access to respective dashboards after PSO assessment.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {requestType === "admin" ? "Admin Login" : "Provide Your Details"}
                  </h3>
                  <div className="text-gray-600">
                    {requestType === "admin"
                      ? "Enter your admin credentials to access the system"
                      : "Please fill in the required information for your access request"}
                  </div>
                </div>

                {requestType === "admin" ? (
                  <div className="max-w-md mx-auto space-y-4">
                    <Card className="bg-red-50 border-red-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-red-800 mb-2">
                          <Lock className="h-4 w-4 text-red-600" />
                          <span className="font-medium">Admin Access</span>
                        </div>
                        <div className="text-sm text-red-700">
                          Only authorized administrators can access the landing page and admin panel.
                        </div>
                      </CardContent>
                    </Card>

                    <div>
                      <Label htmlFor="admin-email">Admin Email *</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter admin email"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="admin-password">Admin Password *</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter admin password"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requestType === "company" && (
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                          placeholder="Enter your company name"
                          required
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="contactPerson">
                        {requestType === "company" ? "Contact Person *" : "Full Name *"}
                      </Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData((prev) => ({ ...prev, contactPerson: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {requestType === "company" && (
                      <div>
                        <Label htmlFor="businessType">Business Type *</Label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="payment-gateway">Payment Gateway (Razorpay, Cashfree, etc.)</SelectItem>
                            <SelectItem value="sms-provider">SMS Provider (MSG91, TextLocal, etc.)</SelectItem>
                            <SelectItem value="fintech">Fintech Services</SelectItem>
                            <SelectItem value="banking">Banking Services</SelectItem>
                            <SelectItem value="insurance">Insurance Services</SelectItem>
                            <SelectItem value="other">Other Financial Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {requestType === "foreman" && (
                      <div>
                        <Label htmlFor="experience">Experience in Chit Funds *</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5+">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <Label htmlFor="purpose">Purpose of Access *</Label>
                      <Textarea
                        id="purpose"
                        value={formData.purpose}
                        onChange={(e) => setFormData((prev) => ({ ...prev, purpose: e.target.value }))}
                        placeholder="Please explain why you need access to our platform and how you plan to use it"
                        rows={4}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleFormSubmit}
                    disabled={
                      requestType === "admin"
                        ? !formData.email || !formData.password
                        : !formData.contactPerson || !formData.email || !formData.phone || !formData.purpose
                    }
                  >
                    {requestType === "admin"
                      ? "Login"
                      : requestType === "company"
                        ? "Submit Request"
                        : "Continue to PSO Assessment"}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">PSO Knowledge Assessment</h3>
                  <div className="text-gray-600">
                    Please answer the following questions about PSO and chit fund regulations
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Passing Score: {requestType === "foreman" ? "80%" : "70%"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  {currentMCQs.map((mcq, index) => (
                    <Card key={mcq.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <div className="font-medium text-gray-800 mb-3">
                            {index + 1}. {mcq.question}
                          </div>
                          <RadioGroup
                            value={mcqAnswers[mcq.id] || ""}
                            onValueChange={(value) => setMcqAnswers((prev) => ({ ...prev, [mcq.id]: value }))}
                          >
                            {mcq.options.map((option: string, optionIndex: number) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <RadioGroupItem value={optionIndex.toString()} id={`${mcq.id}-${optionIndex}`} />
                                <Label htmlFor={`${mcq.id}-${optionIndex}`} className="cursor-pointer">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    onClick={submitRequest}
                    disabled={Object.keys(mcqAnswers).length !== currentMCQs.length || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit PSO Assessment"}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-6">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Access Granted!</h3>
                  <div className="text-gray-600">
                    {requestType === "admin"
                      ? "Welcome back, Administrator. You now have full access to the system."
                      : "Your access request has been approved and processed successfully."}
                  </div>
                </div>

                {currentMCQs.length > 0 && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-800 mb-2">
                          PSO Assessment Score: {calculateMCQScore()}%
                        </div>
                        <div className="text-sm text-blue-600">✅ Passed - Access granted to your dashboard!</div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Your Access Details:</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        Access Type: <strong className="capitalize">{requestType}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span>
                        Portal Access:{" "}
                        <strong>
                          {requestType === "admin"
                            ? "Landing Page + Admin Panel"
                            : requestType === "company"
                              ? "Admin Panel"
                              : requestType === "foreman"
                                ? "Foreman Dashboard"
                                : "User Dashboard"}
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>Access valid for 30 days</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleAccessPortal} className="bg-blue-600 hover:bg-blue-700 w-full">
                  {requestType === "admin"
                    ? "Access Landing Page"
                    : requestType === "company"
                      ? "Access Admin Panel"
                      : requestType === "foreman"
                        ? "Access Foreman Dashboard"
                        : "Access User Dashboard"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
