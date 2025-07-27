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
import { AlertCircle, Building, Users, UserCheck, Shield, CheckCircle, Clock, Send } from "lucide-react"

interface AccessRequest {
  id: string
  requestType: "company" | "user" | "foreman"
  companyName?: string
  contactPerson: string
  email: string
  phone: string
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

// MCQ Questions for different user types
const companyMCQs = [
  {
    id: "q1",
    question: "What type of financial services does your company primarily provide?",
    options: ["Payment Gateway Services", "SMS/Communication Services", "Banking Services", "Insurance Services"],
    correct: 0,
  },
  {
    id: "q2",
    question: "How long has your company been in operation?",
    options: ["Less than 1 year", "1-3 years", "3-5 years", "More than 5 years"],
    correct: 3,
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
    question: "In a chit fund, who receives the money in each auction?",
    options: ["The foreman always", "The highest bidder", "The lowest bidder", "Random selection"],
    correct: 2,
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
    question: "What happens if you miss a chit fund installment?",
    options: [
      "Nothing happens",
      "You get extra benefits",
      "You may face penalties and affect your chit score",
      "You automatically win the auction",
    ],
    correct: 2,
  },
]

const foremanMCQs = [
  {
    id: "q1",
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
    id: "q2",
    question: "What is PSO in chit fund regulations?",
    options: [
      "Personal Security Officer",
      "Promoter's Security Obligation",
      "Public Safety Order",
      "Payment Security Option",
    ],
    correct: 1,
  },
  {
    id: "q3",
    question: "Which act primarily governs chit funds in India?",
    options: ["Banking Regulation Act", "Companies Act", "Chit Funds Act, 1982", "SEBI Act"],
    correct: 2,
  },
  {
    id: "q4",
    question: "What is Form 7 in chit fund operations?",
    options: ["Registration form", "Commencement certificate", "Audit report", "Member application"],
    correct: 1,
  },
  {
    id: "q5",
    question: "What percentage of chit amount must be deposited as security by foreman?",
    options: ["5%", "10%", "15%", "20%"],
    correct: 1,
  },
]

export default function AccessRequestPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [requestType, setRequestType] = useState<"company" | "user" | "foreman" | "">("")
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    purpose: "",
    businessType: "",
    userType: "",
    experience: "",
  })
  const [mcqAnswers, setMcqAnswers] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentMCQs, setCurrentMCQs] = useState<any[]>([])

  const handleRequestTypeSelect = (type: "company" | "user" | "foreman") => {
    setRequestType(type)
    setStep(2)
  }

  const handleFormSubmit = () => {
    if (requestType === "company") {
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
      requestType: requestType as "company" | "user" | "foreman",
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      purpose: formData.purpose,
      businessType: formData.businessType,
      userType: formData.userType,
      experience: formData.experience,
      mcqAnswers: Object.keys(mcqAnswers).length > 0 ? mcqAnswers : undefined,
      mcqScore: score,
      status: requestType === "company" ? "pending" : score && score >= passThreshold ? "pending" : "rejected",
      submittedAt: new Date().toISOString(),
    }

    // Save to localStorage for admin review
    const existingRequests = JSON.parse(localStorage.getItem("accessRequests") || "[]")
    existingRequests.push(request)
    localStorage.setItem("accessRequests", JSON.stringify(existingRequests))

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setStep(4)
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select Access Type"
      case 2:
        return "Provide Details"
      case 3:
        return "Knowledge Assessment"
      case 4:
        return "Request Submitted"
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Who are you requesting access for?</h3>
                  <div className="text-gray-600">Select the category that best describes your access requirement</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        Direct Admin Review
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
                        MCQ Assessment Required
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
                        Advanced MCQ Required
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800">Access Control Notice</div>
                      <div className="text-sm text-yellow-700 mt-1">
                        All access requests are reviewed by our admin team. Companies undergo direct review, while users
                        and foremen must pass knowledge assessments before admin approval.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Provide Your Details</h3>
                  <div className="text-gray-600">Please fill in the required information for your access request</div>
                </div>

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
                </div>

                <div>
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

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleFormSubmit}
                    disabled={!formData.contactPerson || !formData.email || !formData.phone || !formData.purpose}
                  >
                    {requestType === "company" ? "Submit Request" : "Continue to Assessment"}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Knowledge Assessment</h3>
                  <div className="text-gray-600">
                    Please answer the following questions to demonstrate your understanding
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
                    {isSubmitting ? "Submitting..." : "Submit Assessment"}
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
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Request Submitted Successfully!</h3>
                  <div className="text-gray-600">Your access request has been submitted and is now under review</div>
                </div>

                {currentMCQs.length > 0 && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-800 mb-2">
                          Assessment Score: {calculateMCQScore()}%
                        </div>
                        <div className="text-sm text-blue-600">
                          {calculateMCQScore() >= (requestType === "foreman" ? 80 : 70)
                            ? "✅ Passed - Your request will be reviewed by admin"
                            : "❌ Did not meet minimum score - Request rejected"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">What happens next?</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>Admin will review your request within 24-48 hours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Send className="h-4 w-4 text-blue-500" />
                      <span>You'll receive an email notification about the decision</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span>If approved, you'll get access credentials and instructions</span>
                    </div>
                  </div>
                </div>

                <Button onClick={() => router.push("/")} className="w-full">
                  Return to Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
