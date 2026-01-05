"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, ArrowRight, Loader2, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function MobileVerification({ formData, updateFormData, onNext }) {
  const [mobile, setMobile] = useState(formData.mobile || "")
  const [otp, setOtp] = useState(formData.otp || "")
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [error, setError] = useState("")
  const [timer, setTimer] = useState(0)
  const [sendingOTP, setSendingOTP] = useState(false)
  const [verifyingOTP, setVerifyingOTP] = useState(false)

  useEffect(() => {
    let interval
    if (timer > 0 && otpSent) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer, otpSent])

  const handleSendOtp = async () => {
    if (!mobile || mobile.length < 10 || !/^\d+$/.test(mobile)) {
      setError("Please enter a valid mobile number (at least 10 digits)")
      return
    }

    setError("")
    setSendingOTP(true)

    console.log("[v0] Frontend: Sending OTP request for mobile:", mobile)

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: mobile,
        }),
      })

      const data = await response.json()

      console.log("[v0] Frontend: OTP send response:", {
        status: response.status,
        data: data,
      })

      if (data.success) {
        setOtpSent(true)
        setTimer(60) // 60 seconds countdown
        console.log("[v0] Frontend: OTP sent successfully via WhatsApp, messageId:", data.messageId)
      } else {
        let errorMessage = data.error || "Failed to send OTP"

        if (errorMessage.includes("WhatsApp number not opted into sandbox")) {
          errorMessage = `WhatsApp Setup Required: Please send "join" to +14155238886 on WhatsApp first, then try again.`
        } else if (errorMessage.includes("Invalid WhatsApp number")) {
          errorMessage = "Invalid phone number format. Please check your number and try again."
        }

        setError(errorMessage)
        console.error("[v0] Frontend: OTP send failed:", data.error)
      }
    } catch (error) {
      console.error("[v0] Frontend: Send OTP Error:", error)
      setError("Failed to send OTP. Please check your connection and try again.")
    } finally {
      setSendingOTP(false)
    }
  }

  const handleVerifyOtp = async () => {
    // Validate OTP
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setError("")
    setVerifyingOTP(true)

    console.log("[v0] Frontend: Verifying OTP for mobile:", mobile)

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: mobile,
          otp: otp,
        }),
      })

      const data = await response.json()

      console.log("[v0] Frontend: OTP verify response:", {
        status: response.status,
        data: data,
      })

      if (data.success) {
        setOtpVerified(true)
        updateFormData({ mobile, otp })
        console.log("[v0] Frontend: OTP verified successfully")
      } else {
        setError(data.error || "Invalid OTP")
        console.error("[v0] Frontend: OTP verify failed:", data.error)
      }
    } catch (error) {
      console.error("[v0] Frontend: Verify OTP Error:", error)
      setError("Failed to verify OTP. Please try again.")
    } finally {
      setVerifyingOTP(false)
    }
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
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium">WhatsApp Verification</h3>
            <p className="text-sm text-gray-500">We'll send a verification code to your WhatsApp number</p>
          </div>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-800">WhatsApp Setup Required</p>
              <p className="text-xs text-blue-700">
                Before receiving OTP, please send <strong>"join"</strong> to <strong>+14155238886</strong> on WhatsApp
                to activate the service.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 p-4 rounded-xl flex items-start gap-3 text-red-800"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Error</p>
            <p className="text-xs">{error}</p>
          </div>
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
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={otpSent && otpVerified}
                maxLength={15}
                className="pl-12 h-12 text-base"
              />
            </div>
            {!otpVerified && (
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={otpVerified || timer > 0 || sendingOTP}
                className="whitespace-nowrap h-12 px-5 bg-blue-600 hover:bg-blue-700"
              >
                {sendingOTP ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : otpSent ? (
                  timer > 0 ? (
                    `Resend in ${timer}s`
                  ) : (
                    "Resend OTP"
                  )
                ) : (
                  "Send OTP"
                )}
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
              Enter WhatsApp OTP
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
                disabled={verifyingOTP}
                className="whitespace-nowrap h-12 px-5 bg-blue-600 hover:bg-blue-700"
              >
                {verifyingOTP ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              OTP sent to your WhatsApp (+91 {mobile}). It will expire in 1 minute.
            </p>
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
