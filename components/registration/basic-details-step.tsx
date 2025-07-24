"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, User, CheckCircle } from "lucide-react"

interface BasicDetailsStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export default function BasicDetailsStep({ formData, updateFormData, onNext }: BasicDetailsStepProps) {
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!formData.fullName || !formData.mobile) {
      alert("Please fill all required fields")
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setShowOTPModal(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleVerifyOTP = () => {
    if (otp === "123456") {
      // Demo OTP
      updateFormData({ otp, isOTPVerified: true })
      setShowOTPModal(false)
      setTimeout(() => onNext(), 500)
    } else {
      alert("Invalid OTP. Please use 123456 for demo")
    }
  }

  const isFormValid = formData.fullName && formData.mobile && formData.mobile.length === 10

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#1e3a8a]" />
              Basic Details Collection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name (As per Aadhaar) *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData({ fullName: e.target.value })}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="mobile">Mobile Number *</Label>
              <div className="flex mt-1">
                <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-md">
                  <span className="text-sm">🇮🇳 +91</span>
                </div>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => updateFormData({ mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                  placeholder="Enter 10-digit mobile number"
                  className="rounded-l-none"
                  maxLength={10}
                />
              </div>
            </div>

            {formData.isOTPVerified ? (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-700 font-medium">Mobile number verified successfully!</span>
              </div>
            ) : (
              <Button
                onClick={handleSendOTP}
                disabled={!isFormValid || isLoading}
                className="w-full bg-[#1e3a8a] hover:bg-[#3b82f6]"
              >
                <Phone className="h-4 w-4 mr-2" />
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <div className="space-y-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-[#1e3a8a]">What is UCFSIN?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Universal Chitfund Subscriber Identification Number (UCFSIN) is a unique identity for all chit fund
              participants in India.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Single identity across all chit fund operators</li>
              <li>• Government-verified and regulated</li>
              <li>• Digital + Physical card issuance</li>
              <li>• Enhanced security and transparency</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Registration Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-600">
              <li>• Quick KYC verification</li>
              <li>• Instant scheme enrollment</li>
              <li>• Real-time transaction tracking</li>
              <li>• Secure digital payments</li>
              <li>• 24/7 customer support</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* OTP Modal */}
      <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Mobile Number</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">We've sent a 6-digit OTP to +91 {formData.mobile}</p>
            <div>
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                className="mt-1 text-center text-lg tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">Demo OTP: 123456</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="flex-1 bg-[#1e3a8a] hover:bg-[#3b82f6]"
              >
                Verify OTP
              </Button>
              <Button variant="outline" onClick={() => setShowOTPModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
