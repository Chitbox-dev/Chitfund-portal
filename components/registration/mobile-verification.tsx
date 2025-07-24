"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Smartphone, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function MobileVerification({ formData, updateFormData, onNext }) {
  const [mobile, setMobile] = useState(formData.mobile || "")
  const [otp, setOtp] = useState(formData.otp || "")
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [error, setError] = useState("")
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let interval
    if (timer > 0 && otpSent) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer, otpSent])

  const handleSendOtp = () => {
    // Validate mobile number
    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    setError("")
    // In a real app, this would send an OTP to the mobile number
    // For demo purposes, we'll just set a dummy OTP
    setOtpSent(true)
    setTimer(30) // 30 seconds countdown
  }

  const handleVerifyOtp = () => {
    // Validate OTP
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setError("")
    // In a real app, this would verify the OTP with the server
    // For demo purposes, we'll just set it as verified
    setOtpVerified(true)

    // Update form data
    updateFormData({ mobile, otp })
  }

  const handleContinue = () => {
    if (otpVerified) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Mobile Number Verification</h3>
            <p className="text-sm text-gray-500">We'll send a one-time password (OTP) to verify your mobile number</p>
          </div>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 p-4 rounded-xl flex items-start gap-3 text-red-800"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="mobile" className="text-gray-700">
            Mobile Number
          </Label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                +91
              </div>
              <Input
                id="mobile"
                placeholder="Enter your 10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={otpSent && otpVerified}
                maxLength={10}
                className="pl-12 h-12 text-base"
              />
            </div>
            {!otpVerified && (
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={otpVerified || timer > 0}
                className="whitespace-nowrap h-12 px-5 bg-blue-600 hover:bg-blue-700"
              >
                {otpSent ? (timer > 0 ? `Resend in ${timer}s` : "Resend OTP") : "Send OTP"}
              </Button>
            )}
          </div>
        </div>

        {otpSent && !otpVerified && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3"
          >
            <Label htmlFor="otp" className="text-gray-700">
              Enter OTP
            </Label>
            <div className="flex gap-3">
              <Input
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="h-12 text-base text-center tracking-widest font-medium"
              />
              <Button
                type="button"
                onClick={handleVerifyOtp}
                className="whitespace-nowrap h-12 px-5 bg-blue-600 hover:bg-blue-700"
              >
                Verify OTP
              </Button>
            </div>
            <p className="text-xs text-gray-500">OTP sent to +91 {mobile}. It will expire in 10 minutes.</p>
          </motion.div>
        )}

        {otpVerified && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-green-800 font-medium">Mobile number verified successfully!</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <div className="pt-4">
        <Button
          onClick={handleContinue}
          disabled={!otpVerified}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
