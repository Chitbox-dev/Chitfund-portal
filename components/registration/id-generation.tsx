"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Loader2, ArrowRight, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import UCFINEducation from "./ucfin-education"
import { motion, AnimatePresence } from "framer-motion"

export default function IdGeneration({ formData, updateFormData, onNext }) {
  const [pan, setPan] = useState(formData.pan || "")
  const [aadhaar, setAadhaar] = useState(formData.aadhaar || "")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showEducation, setShowEducation] = useState(false)
  const [generatedIds, setGeneratedIds] = useState({
    cfin: formData.cfin || "",
    ucfin: formData.ucfin || "",
    sin: formData.sin || "",
  })
  const [error, setError] = useState("")

  const validateForm = () => {
    const isValid = true

    // Validate PAN
    if (!pan.trim()) {
      setError("PAN is required")
      return false
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      setError("Please enter a valid PAN (e.g., ABCDE1234F)")
      return false
    }

    // Validate Aadhaar
    if (!aadhaar.trim()) {
      setError("Aadhaar number is required")
      return false
    } else if (!/^\d{12}$/.test(aadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number")
      return false
    }

    return isValid
  }

  const handleVerify = () => {
    if (!validateForm()) return

    setError("")
    setIsVerifying(true)

    // Simulate API call to verify PAN and Aadhaar
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)

      // Show UCFIN education before generating IDs
      setShowEducation(true)
    }, 2000)
  }

  const handleEducationComplete = () => {
    setShowEducation(false)

    // Generate random IDs for demo purposes
    const cfin = `CF${Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, "0")}`

    const ucfin = `UC${Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, "0")}`
    const sin = `SI${Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, "0")}`

    setGeneratedIds({
      cfin,
      ucfin,
      sin,
    })
  }

  const handleSubmit = () => {
    if (isVerified && generatedIds.ucfin) {
      updateFormData({
        pan,
        aadhaar,
        ...generatedIds,
      })
      onNext()
    } else {
      setError("Please verify your PAN and Aadhaar first")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <FileText className="h-6 w-6 text-chitfund-blue-950" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-chitfund-text-dark">ID Generation</h3>
            <p className="text-sm text-chitfund-text-light">We'll verify your identity and generate your unique IDs</p>
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

      <AnimatePresence mode="wait">
        {!showEducation ? (
          <motion.div key="verification" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pan" className="text-chitfund-text-dark">
                  PAN Number
                </Label>
                <Input
                  id="pan"
                  placeholder="Enter your PAN number"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  disabled={isVerified}
                  maxLength={10}
                  className="h-12 text-base border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaar" className="text-chitfund-text-dark">
                  Aadhaar Number
                </Label>
                <Input
                  id="aadhaar"
                  placeholder="Enter your 12-digit Aadhaar number"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value)}
                  disabled={isVerified}
                  maxLength={12}
                  className="h-12 text-base border-gray-300"
                />
              </div>

              {!isVerified && (
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="w-full h-12 bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Generate IDs
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}

              {isVerified && generatedIds.ucfin && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6 space-y-6">
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertTitle className="text-chitfund-blue-950">Your Unique IDs have been generated</AlertTitle>
                      <AlertDescription className="text-chitfund-blue-800">
                        Please save these IDs for future reference. You will need them to access your account.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cfin" className="text-chitfund-text-dark">
                          CFIN (Chit Fund Identification Number)
                        </Label>
                        <Input id="cfin" value={generatedIds.cfin} readOnly className="bg-white h-12 border-gray-300" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ucfin" className="text-chitfund-text-dark flex items-center gap-2">
                          UCFIN (Unique Chit Fund Identification Number)
                          <span className="bg-blue-100 text-chitfund-blue-950 text-xs px-2 py-0.5 rounded-full">
                            Primary ID
                          </span>
                        </Label>
                        <Input
                          id="ucfin"
                          value={generatedIds.ucfin}
                          readOnly
                          className="bg-white h-12 font-medium text-chitfund-blue-950 border-gray-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sin" className="text-chitfund-text-dark">
                          SIN (Subscriber Identification Number)
                        </Label>
                        <Input id="sin" value={generatedIds.sin} readOnly className="bg-white h-12 border-gray-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div key="education" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <UCFINEducation onComplete={handleEducationComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-4">
        {!showEducation && (
          <Button
            onClick={handleSubmit}
            disabled={!isVerified || !generatedIds.ucfin}
            className="w-full h-12 bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white flex items-center justify-center gap-2"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
