"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, AlertCircle, CreditCard, FileText } from "lucide-react"

interface KYCVerificationStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export default function KYCVerificationStep({ formData, updateFormData, onNext }: KYCVerificationStepProps) {
  const [showKYCModal, setShowKYCModal] = useState(false)
  const [kycOTP, setKycOTP] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [kycStep, setKycStep] = useState(0) // 0: form, 1: processing, 2: otp

  const handleStartKYC = async () => {
    if (!formData.aadhaar || !formData.pan) {
      alert("Please fill all required fields")
      return
    }

    setIsLoading(true)
    setKycStep(1)
    setShowKYCModal(true)

    // Simulate API call to eMudhra/Signzy/IDfy
    setTimeout(() => {
      setKycStep(2)
      setIsLoading(false)
    }, 3000)
  }

  const handleVerifyKYC = () => {
    if (kycOTP === "654321") {
      // Demo OTP
      updateFormData({ kycOTP, isKYCVerified: true })
      setShowKYCModal(false)
      setTimeout(() => onNext(), 500)
    } else {
      alert("Invalid OTP. Please use 654321 for demo")
    }
  }

  const maskAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, 14)
  }

  const maskPAN = (value: string) => {
    return value.toUpperCase().slice(0, 10)
  }

  const isFormValid = formData.aadhaar?.replace(/\s/g, "").length === 12 && formData.pan?.length === 10

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#1e3a8a]" />
              KYC Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="aadhaar">Aadhaar Number *</Label>
              <div className="relative mt-1">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="aadhaar"
                  value={formData.aadhaar}
                  onChange={(e) => updateFormData({ aadhaar: maskAadhaar(e.target.value) })}
                  placeholder="XXXX XXXX XXXX"
                  className="pl-10"
                  maxLength={14}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pan">PAN Number *</Label>
              <div className="relative mt-1">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="pan"
                  value={formData.pan}
                  onChange={(e) => updateFormData({ pan: maskPAN(e.target.value) })}
                  placeholder="ABCDE1234F"
                  className="pl-10"
                  maxLength={10}
                />
              </div>
            </div>

            {formData.isKYCVerified ? (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-700 font-medium">KYC verified successfully!</span>
              </div>
            ) : (
              <Button
                onClick={handleStartKYC}
                disabled={!isFormValid || isLoading}
                className="w-full bg-[#1e3a8a] hover:bg-[#3b82f6]"
              >
                <Shield className="h-4 w-4 mr-2" />
                {isLoading ? "Processing..." : "Start KYC Verification"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <div className="space-y-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-[#1e3a8a]">KYC Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white">
                  eMudhra
                </Badge>
                <span className="text-sm text-gray-600">Digital Identity Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white">
                  Signzy
                </Badge>
                <span className="text-sm text-gray-600">AI-powered KYC</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white">
                  IDfy
                </Badge>
                <span className="text-sm text-gray-600">Identity Verification</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertCircle className="h-5 w-5" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>• Ensure Aadhaar and PAN details match exactly</li>
              <li>• Keep your mobile number linked to Aadhaar ready</li>
              <li>• KYC verification is mandatory for UCFSIN</li>
              <li>• Process is secure and government-approved</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* KYC Modal */}
      <Dialog open={showKYCModal} onOpenChange={setShowKYCModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>KYC Verification</DialogTitle>
          </DialogHeader>

          {kycStep === 1 && (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mx-auto"></div>
              <div>
                <h3 className="font-medium">Verifying your documents...</h3>
                <p className="text-sm text-gray-600 mt-1">Connecting with verification partner</p>
              </div>
            </div>
          )}

          {kycStep === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium">Documents Verified!</h3>
                <p className="text-sm text-gray-600">OTP sent to your Aadhaar-linked mobile</p>
              </div>

              <div>
                <Label htmlFor="kycOTP">Enter UIDAI OTP</Label>
                <Input
                  id="kycOTP"
                  value={kycOTP}
                  onChange={(e) => setKycOTP(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="mt-1 text-center text-lg tracking-widest"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">Demo OTP: 654321</p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleVerifyKYC}
                  disabled={kycOTP.length !== 6}
                  className="flex-1 bg-[#1e3a8a] hover:bg-[#3b82f6]"
                >
                  Complete KYC
                </Button>
                <Button variant="outline" onClick={() => setShowKYCModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
