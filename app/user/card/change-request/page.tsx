"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Phone,
  MapPin,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Send,
  XCircle,
  Clock,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function ChangeRequestPage() {
  const [requestType, setRequestType] = useState("")
  const [currentMobile, setCurrentMobile] = useState("+91 9876543210")
  const [newMobile, setNewMobile] = useState("")
  const [currentAddress, setCurrentAddress] = useState("123 Main Street, Bangalore, Karnataka - 560001")
  const [newAddress, setNewAddress] = useState("")
  const [reason, setReason] = useState("")
  const [otp, setOtp] = useState("")
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [submittedRequest, setSubmittedRequest] = useState(null)

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setAttachments((prev) => [...prev, ...files])
  }

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSendOtp = () => {
    if (!newMobile || newMobile.length < 10) {
      alert("Please enter a valid mobile number")
      return
    }
    setShowOtpDialog(true)
    // Simulate OTP sending
    console.log("OTP sent to:", newMobile)
  }

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      // Demo OTP
      setOtpVerified(true)
      setShowOtpDialog(false)
      alert("Mobile number verified successfully!")
    } else {
      alert("Invalid OTP. Please try again. (Demo OTP: 123456)")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!requestType || !reason) {
      alert("Please fill in all required fields")
      return
    }

    if (requestType === "mobile" || requestType === "both") {
      if (!newMobile || !otpVerified) {
        alert("Please verify your new mobile number")
        return
      }
    }

    if (requestType === "address" || requestType === "both") {
      if (!newAddress) {
        alert("Please enter your new address")
        return
      }
    }

    const requestId = `CHG-2025-${String(Date.now()).slice(-6)}`
    const newRequest = {
      id: requestId,
      type: requestType,
      currentMobile: requestType === "mobile" || requestType === "both" ? currentMobile : null,
      newMobile: requestType === "mobile" || requestType === "both" ? newMobile : null,
      currentAddress: requestType === "address" || requestType === "both" ? currentAddress : null,
      newAddress: requestType === "address" || requestType === "both" ? newAddress : null,
      reason,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
      attachments: attachments.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    }

    // Store in localStorage for demo
    const existingRequests = JSON.parse(localStorage.getItem("changeRequests") || "[]")
    existingRequests.push(newRequest)
    localStorage.setItem("changeRequests", JSON.stringify(existingRequests))

    setSubmittedRequest(newRequest)
    setShowSuccessDialog(true)

    // Reset form
    setRequestType("")
    setNewMobile("")
    setNewAddress("")
    setReason("")
    setOtp("")
    setOtpVerified(false)
    setAttachments([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/user/card">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to E-UCFSIN Card
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Change Request</h1>
                <p className="text-sm text-gray-500">Update your mobile number or address</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Information Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">Important Information</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Change requests require admin approval and may take 2-3 business days</li>
                <li>• A new E-UCFSIN card will be generated after approval</li>
                <li>• You can request a physical card only after the new E-card is issued</li>
                <li>• Mobile number changes require OTP verification</li>
              </ul>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Submit Change Request
            </CardTitle>
            <p className="text-sm text-gray-600">
              Please provide accurate information and a valid reason for the change request.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Request Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">What would you like to change? *</Label>
                <RadioGroup value={requestType} onValueChange={setRequestType}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Mobile Number</div>
                        <div className="text-sm text-gray-600">Update your registered mobile number</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="address" id="address" />
                    <Label htmlFor="address" className="flex items-center gap-3 cursor-pointer flex-1">
                      <MapPin className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-sm text-gray-600">Update your registered address</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="flex items-center gap-3 cursor-pointer flex-1">
                      <div className="flex gap-1">
                        <Phone className="h-5 w-5 text-blue-500" />
                        <MapPin className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Both Mobile & Address</div>
                        <div className="text-sm text-gray-600">Update both mobile number and address</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Mobile Number Change */}
              {(requestType === "mobile" || requestType === "both") && (
                <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-900 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Mobile Number Change
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Current Mobile Number</Label>
                      <Input value={currentMobile} disabled className="bg-gray-100" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">New Mobile Number *</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newMobile}
                          onChange={(e) => setNewMobile(e.target.value)}
                          placeholder="+91 XXXXXXXXXX"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={!newMobile || otpVerified}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {otpVerified ? "Verified" : "Send OTP"}
                        </Button>
                      </div>
                      {otpVerified && (
                        <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          Mobile number verified
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Address Change */}
              {(requestType === "address" || requestType === "both") && (
                <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-900 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address Change
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Current Address</Label>
                      <Textarea value={currentAddress} disabled className="bg-gray-100" rows={2} />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">New Address *</Label>
                      <Textarea
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        placeholder="Enter your complete new address with pincode"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-base font-medium">
                  Reason for Change *
                </Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide a detailed reason for this change request. This helps us process your request faster."
                  rows={4}
                />
                <p className="text-xs text-gray-500">Minimum 20 characters required</p>
              </div>

              {/* Supporting Documents */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Supporting Documents (Optional)</Label>
                <p className="text-sm text-gray-600">
                  Upload relevant documents to support your change request (e.g., address proof, mobile bill)
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop files here, or{" "}
                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                      browse
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 5MB each)</p>
                </div>

                {/* Uploaded Files */}
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Uploaded Files:</Label>
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-[#1e3a8a] hover:bg-[#3b82f6] gap-2"
                  disabled={
                    !requestType ||
                    !reason ||
                    ((requestType === "mobile" || requestType === "both") && !otpVerified) ||
                    ((requestType === "address" || requestType === "both") && !newAddress)
                  }
                >
                  <Send className="h-4 w-4" />
                  Submit Change Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* OTP Verification Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Mobile Number</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                We've sent a 6-digit OTP to <strong>{newMobile}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-gray-500 text-center">
                Demo OTP: <strong>123456</strong>
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowOtpDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Verify OTP
              </Button>
            </div>

            <div className="text-center">
              <Button variant="link" size="sm" className="text-blue-600">
                Resend OTP
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Change Request Submitted
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 mb-3">
                Your change request has been submitted successfully and is now under review.
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Request ID:</strong> {submittedRequest?.id}
                </p>
                <p>
                  <strong>Type:</strong> {submittedRequest?.type?.replace("_", " & ").toUpperCase()}
                </p>
                <p>
                  <strong>Status:</strong> <Badge className="bg-yellow-100 text-yellow-800">PENDING APPROVAL</Badge>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">What happens next?</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>Admin will review your request within 24-48 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>New E-UCFSIN card will be generated after approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  <span>You can then request a physical card</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Link href="/user/card">
                <Button variant="outline">Back to E-Card</Button>
              </Link>
              <Button onClick={() => setShowSuccessDialog(false)}>Got it, Thanks!</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
