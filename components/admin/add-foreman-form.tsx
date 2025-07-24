"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Building, User, Mail, CheckCircle, ArrowRight, ArrowLeft, FileText, MapPin, ImageIcon } from "lucide-react"

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Puducherry",
]

interface FormData {
  // Step 1: Company Information + Address
  companyName: string
  companyLogo: string | null
  chitFundLicenseNumber: string
  licenseValidityDate: string
  stateOfRegistration: string
  panNumber: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pincode: string
  totalMembers: string

  // Step 2: Authorized Representative
  firstName: string
  lastName: string
  email: string
  phone: string
  designation: string
  termsAccepted: boolean

  // Step 3: Email Verification
  emailOtp: string
  emailVerified: boolean
}

interface AddForemanFormProps {
  onSuccess?: (data: FormData) => void
  onCancel?: () => void
}

export default function AddForemanForm({ onSuccess, onCancel }: AddForemanFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyLogo: null,
    chitFundLicenseNumber: "",
    licenseValidityDate: "",
    stateOfRegistration: "",
    panNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    totalMembers: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    termsAccepted: false,
    emailOtp: "",
    emailVerified: false,
  })

  const steps = [
    { number: 1, title: "Company Information", icon: Building },
    { number: 2, title: "Authorized Representative", icon: User },
    { number: 3, title: "Email Verification", icon: Mail },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, companyLogo: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const sendOtp = async () => {
    // Simulate OTP sending
    setOtpSent(true)
    // In real implementation, call API to send OTP
    console.log("Sending OTP to:", formData.email)
  }

  const verifyOtp = async () => {
    // Simulate OTP verification
    if (formData.emailOtp === "123456") {
      setFormData((prev) => ({ ...prev, emailVerified: true }))
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.companyName &&
          formData.chitFundLicenseNumber &&
          formData.licenseValidityDate &&
          formData.stateOfRegistration &&
          formData.panNumber &&
          formData.addressLine1 &&
          formData.city &&
          formData.state &&
          formData.pincode &&
          formData.totalMembers
        )
      case 2:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.designation &&
          formData.termsAccepted
        )
      case 3:
        return formData.emailVerified
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    // Call success callback with form data
    if (onSuccess) {
      onSuccess(formData)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900">Company Information</h3>
              <p className="text-gray-600">Enter your chit fund company details and official address</p>
            </div>

            {/* Company Details Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name / Chit Fund Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalMembers">Total Members *</Label>
                    <Input
                      id="totalMembers"
                      value={formData.totalMembers}
                      onChange={(e) => handleInputChange("totalMembers", e.target.value)}
                      placeholder="e.g., 15K+, 8K+, 12K+"
                    />
                  </div>

                  {/* Company Logo Upload */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="companyLogo">Company Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input
                          id="companyLogo"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload your company logo (PNG, JPG, SVG - Max 2MB)</p>
                      </div>
                      {formData.companyLogo && (
                        <div className="w-16 h-16 border-2 border-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={formData.companyLogo || "/placeholder.svg"}
                            alt="Company Logo Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {!formData.companyLogo && (
                        <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chitFundLicenseNumber">Chit Fund License Number *</Label>
                    <Input
                      id="chitFundLicenseNumber"
                      value={formData.chitFundLicenseNumber}
                      onChange={(e) => handleInputChange("chitFundLicenseNumber", e.target.value)}
                      placeholder="Enter license number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseValidityDate">License Validity Date *</Label>
                    <Input
                      id="licenseValidityDate"
                      type="date"
                      value={formData.licenseValidityDate}
                      onChange={(e) => handleInputChange("licenseValidityDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stateOfRegistration">State of Registration *</Label>
                    <Select onValueChange={(value) => handleInputChange("stateOfRegistration", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number *</Label>
                    <Input
                      id="panNumber"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange("panNumber", e.target.value.toUpperCase())}
                      placeholder="Enter PAN number"
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>

              {/* Official Address Section */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Official Address
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input
                      id="addressLine1"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                      placeholder="Enter address line 1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                      placeholder="Enter address line 2 (optional)"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder="Enter pincode"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900">Authorized Representative</h3>
              <p className="text-gray-600">Enter details of the authorized representative</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email ID *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter mobile number"
                  maxLength={10}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange("designation", e.target.value)}
                  placeholder="Enter designation (e.g., Managing Director, CEO)"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Terms and Conditions
              </h4>

              <div className="bg-white p-4 rounded border max-h-40 overflow-y-auto mb-4">
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>1. Registration Agreement:</strong> By registering as a foreman, you agree to comply with
                    all applicable chit fund regulations and UCFSIN policies.
                  </p>

                  <p>
                    <strong>2. License Validity:</strong> You confirm that your chit fund license is valid and
                    up-to-date. Any changes in license status must be immediately reported.
                  </p>

                  <p>
                    <strong>3. Compliance:</strong> You agree to maintain compliance with all state and central
                    government regulations regarding chit fund operations.
                  </p>

                  <p>
                    <strong>4. Data Accuracy:</strong> All information provided is accurate and complete. Any false
                    information may result in account suspension.
                  </p>

                  <p>
                    <strong>5. Scheme Management:</strong> You are responsible for proper management of chit fund
                    schemes and timely reporting to authorities.
                  </p>

                  <p>
                    <strong>6. Commission Structure:</strong> Commission rates and payment terms are subject to UCFSIN
                    policies and may be updated from time to time.
                  </p>

                  <p>
                    <strong>7. Termination:</strong> UCFSIN reserves the right to terminate foreman accounts for
                    non-compliance or violation of terms.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="termsAccepted" className="text-sm text-gray-700 leading-relaxed">
                  I have read and agree to the terms and conditions mentioned above. I confirm that all information
                  provided is accurate and I will comply with all applicable regulations. *
                </Label>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900">Email Verification</h3>
              <p className="text-gray-600">Verify your email address to complete registration</p>
            </div>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Email Verification</span>
                  </div>
                  {formData.emailVerified ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{formData.email}</p>

                {!formData.emailVerified && (
                  <div className="space-y-3">
                    {!otpSent ? (
                      <Button onClick={sendOtp} className="w-full">
                        Send OTP to Email
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter 6-digit OTP"
                            value={formData.emailOtp}
                            onChange={(e) => handleInputChange("emailOtp", e.target.value)}
                            maxLength={6}
                          />
                          <Button onClick={verifyOtp}>Verify</Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          For demo purposes, use OTP: <strong>123456</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {formData.emailVerified && (
                  <div className="text-center py-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-green-800">Email Verified Successfully!</h4>
                    <p className="text-green-600">You can now complete the registration process.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900">Register New Foreman</CardTitle>
          <p className="text-gray-600">Complete the 3-step registration process to add a new chit fund foreman</p>
        </CardHeader>

        <CardContent>
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      currentStep >= step.number
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 ${currentStep > step.number ? "bg-blue-600" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </span>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {onCancel && (
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                >
                  Cancel
                </Button>
              )}
            </div>

            {currentStep < 3 ? (
              <Button onClick={nextStep} disabled={!validateStep(currentStep)} className="flex items-center gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !validateStep(currentStep)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Submitting..." : "Complete Registration"}
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Named export for compatibility
export { AddForemanForm }
