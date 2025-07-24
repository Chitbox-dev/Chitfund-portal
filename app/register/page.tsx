"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

// Import all step components
import BasicDetailsStep from "@/components/registration/basic-details-step"
import KYCVerificationStep from "@/components/registration/kyc-verification-step"
import AddressStep from "@/components/registration/address-step"
import UCFSINGenerationStep from "@/components/registration/ucfsin-generation-step"
import PaymentStep from "@/components/registration/payment-step"
import ConfirmationStep from "@/components/registration/confirmation-step"
import AccountSetupStep from "@/components/registration/account-setup-step"

const steps = [
  { id: 1, title: "Basic Details", description: "Personal information" },
  { id: 2, title: "KYC Verification", description: "Identity verification" },
  { id: 3, title: "Address Details", description: "Delivery address" },
  { id: 4, title: "UCFSIN Generation", description: "ID number creation" },
  { id: 5, title: "Payment", description: "Card issuance fee" },
  { id: 6, title: "Confirmation", description: "Order confirmation" },
  { id: 7, title: "Account Setup", description: "Create your account" },
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Details
    fullName: "",
    mobile: "",
    otpVerified: false,

    // KYC Details
    aadhaar: "",
    pan: "",
    kycVerified: false,

    // Address Details
    houseNumber: "",
    street: "",
    city: "",
    district: "",
    state: "",
    pincode: "",

    // UCFSIN Details
    ucfsinNumber: "",

    // Payment Details
    paymentMethod: "",
    paymentCompleted: false,

    // Account Details
    email: "",
    password: "",
    confirmPassword: "",
  })

  const updateFormData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicDetailsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 2:
        return <KYCVerificationStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 3:
        return <AddressStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 4:
        return <UCFSINGenerationStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 5:
        return <PaymentStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 6:
        return <ConfirmationStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 7:
        return <AccountSetupStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      default:
        return <BasicDetailsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-[#1e3a8a]" />
                <span className="text-lg font-semibold text-[#1e3a8a]">UCFSIN Registration</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-xl">Registration Progress</CardTitle>
              <span className="text-sm font-medium text-[#1e3a8a]">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-center p-3 rounded-lg transition-colors ${
                    step.id === currentStep
                      ? "bg-[#1e3a8a] text-white"
                      : step.id < currentStep
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <div className="font-semibold text-sm">{step.title}</div>
                  <div className="text-xs mt-1 opacity-75">{step.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        {currentStep > 1 && currentStep < 7 && (
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Step
            </Button>
            <div className="text-sm text-gray-500 flex items-center">
              Need help?{" "}
              <a href="/support" className="text-[#1e3a8a] hover:underline ml-1">
                Contact Support
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
