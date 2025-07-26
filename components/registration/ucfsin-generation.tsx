"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateUCFSIN, validateUCFSIN, type UCFSINData } from "@/lib/ucfsin-generator"
import { CheckCircle, Copy, RefreshCw, AlertCircle, CreditCard, Shield, User, MapPin } from "lucide-react"

const STATES = [
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
]

interface UCFSINGenerationProps {
  onGenerated?: (ucfsin: string) => void
  userDetails?: {
    name?: string
    state?: string
    panNumber?: string
    aadhaarNumber?: string
  }
}

export function UCFSINGeneration({ onGenerated, userDetails }: UCFSINGenerationProps) {
  const [formData, setFormData] = useState<UCFSINData>({
    state: userDetails?.state || "Karnataka",
    panNumber: userDetails?.panNumber || "",
    aadhaarNumber: userDetails?.aadhaarNumber || "",
  })
  const [generatedUCFSIN, setGeneratedUCFSIN] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.state) {
      newErrors.state = "State is required"
    }

    if (!formData.panNumber) {
      newErrors.panNumber = "PAN number is required"
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)"
    }

    if (!formData.aadhaarNumber) {
      newErrors.aadhaarNumber = "Aadhaar number is required"
    } else if (!/^[0-9]{12}$/.test(formData.aadhaarNumber.replace(/\s/g, ""))) {
      newErrors.aadhaarNumber = "Invalid Aadhaar format (12 digits)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerate = async () => {
    if (!validateForm()) return

    setIsGenerating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    try {
      const ucfsin = generateUCFSIN({
        ...formData,
        aadhaarNumber: formData.aadhaarNumber.replace(/\s/g, ""),
      })

      setGeneratedUCFSIN(ucfsin)
      onGenerated?.(ucfsin)

      // Store in localStorage for persistence
      localStorage.setItem("generatedUCFSIN", ucfsin)
      localStorage.setItem(
        "ucfsinUserData",
        JSON.stringify({
          ...formData,
          ucfsin,
          generatedAt: new Date().toISOString(),
        }),
      )
    } catch (error) {
      console.error("Error generating UCFSIN:", error)
      setErrors({ general: "Failed to generate UCFSIN. Please try again." })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    if (generatedUCFSIN) {
      await navigator.clipboard.writeText(generatedUCFSIN)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const handleRegenerateUCFSIN = () => {
    setGeneratedUCFSIN("")
    handleGenerate()
  }

  // Load existing UCFSIN if available
  useEffect(() => {
    const stored = localStorage.getItem("generatedUCFSIN")
    if (stored && validateUCFSIN(stored)) {
      setGeneratedUCFSIN(stored)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">UCFSIN Generation</h2>
        <p className="text-gray-600">Generate your Unique Chit Fund Subscriber Identification Number</p>
      </div>

      {/* UCFSIN Format Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Shield className="h-5 w-5" />
            UCFSIN Format
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="font-mono text-lg font-bold text-center bg-white p-3 rounded-lg border-2 border-blue-200">
              KA-HSD-7A2-978
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-700">KA</div>
                <div className="text-blue-600">State Code</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-700">HSD</div>
                <div className="text-blue-600">PAN (6-8 chars)</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-700">7A2</div>
                <div className="text-blue-600">Random</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-700">978</div>
                <div className="text-blue-600">Aadhaar (last 3)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-700 text-sm">{errors.general}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                State *
              </Label>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}
              >
                <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="panNumber">PAN Number *</Label>
              <Input
                id="panNumber"
                placeholder="ABCDE1234F"
                value={formData.panNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
                className={errors.panNumber ? "border-red-500" : ""}
                maxLength={10}
              />
              {errors.panNumber && <p className="text-sm text-red-500">{errors.panNumber}</p>}
              <p className="text-xs text-gray-500">Format: 5 letters + 4 digits + 1 letter</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
            <Input
              id="aadhaarNumber"
              placeholder="1234 5678 9012"
              value={formData.aadhaarNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ")
                setFormData((prev) => ({ ...prev, aadhaarNumber: value }))
              }}
              className={errors.aadhaarNumber ? "border-red-500" : ""}
              maxLength={14}
            />
            {errors.aadhaarNumber && <p className="text-sm text-red-500">{errors.aadhaarNumber}</p>}
            <p className="text-xs text-gray-500">12-digit Aadhaar number</p>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating UCFSIN...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Generate UCFSIN
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated UCFSIN */}
      {generatedUCFSIN && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <CheckCircle className="h-5 w-5" />
              UCFSIN Generated Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 mb-1">Your UCFSIN</p>
                    <p className="font-mono text-2xl font-bold text-green-900">{generatedUCFSIN}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
                      {copySuccess ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRegenerateUCFSIN}
                      className="gap-2 bg-transparent"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">Important:</p>
                    <p>
                      Please save this UCFSIN safely. You will need it for all chit fund transactions and
                      communications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
