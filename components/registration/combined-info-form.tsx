"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, User, ArrowRight, Upload, CheckCircle2, X, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const RELATIONS = [
  "Spouse",
  "Son",
  "Daughter",
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Grandson",
  "Granddaughter",
  "Others",
]

const OCCUPATION_TYPES = [
  "Salaried - Private",
  "Salaried - Government",
  "Self-Employed Professional",
  "Self-Employed Business",
  "Retired",
  "Homemaker",
  "Student",
  "Unemployed",
  "Others",
]

const INCOME_RANGES = [
  "Below ₹2,50,000",
  "₹2,50,000 - ₹5,00,000",
  "₹5,00,000 - ₹10,00,000",
  "₹10,00,000 - ₹20,00,000",
  "Above ₹20,00,000",
]

export default function CombinedInfoForm({ formData, updateFormData, onNext }) {
  const [activeTab, setActiveTab] = useState("basic")
  const [name, setName] = useState(formData.name || "")
  const [dob, setDob] = useState(formData.dob || "")
  const [email, setEmail] = useState(formData.email || "")
  const [kycConsent, setKycConsent] = useState(formData.kycConsent || false)
  const [pan, setPan] = useState(formData.pan || "")
  const [aadhaar, setAadhaar] = useState(formData.aadhaar || "")
  const [documents, setDocuments] = useState({
    panCard: formData.documents?.panCard || null,
    aadhaarCard: formData.documents?.aadhaarCard || null,
  })
  const [nominee, setNominee] = useState(
    formData.nominee || {
      name: "",
      relation: "",
      dob: "",
      share: 100,
    },
  )
  const [occupation, setOccupation] = useState(formData.occupation || "")
  const [annualIncome, setAnnualIncome] = useState(formData.annualIncome || "")

  const [errors, setErrors] = useState({
    basic: {},
    kyc: {},
    documents: {},
    nominee: {},
    occupation: {},
  })

  const validateBasicInfo = () => {
    let isValid = true
    const newErrors = { ...errors }
    newErrors.basic = {}

    // Validate name
    if (!name.trim()) {
      newErrors.basic.name = "Name is required"
      isValid = false
    } else if (name.trim().length < 3) {
      newErrors.basic.name = "Name must be at least 3 characters"
      isValid = false
    }

    // Validate date of birth
    if (!dob) {
      newErrors.basic.dob = "Date of birth is required"
      isValid = false
    } else {
      const dobDate = new Date(dob)
      const today = new Date()
      const minAge = new Date()
      minAge.setFullYear(today.getFullYear() - 18)

      if (dobDate > minAge) {
        newErrors.basic.dob = "You must be at least 18 years old"
        isValid = false
      }
    }

    // Validate email
    if (!email.trim()) {
      newErrors.basic.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.basic.email = "Please enter a valid email address"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateKYC = () => {
    let isValid = true
    const newErrors = { ...errors }
    newErrors.kyc = {}

    if (!kycConsent) {
      newErrors.kyc.consent = "You must provide consent to proceed"
      isValid = false
    }

    // Validate PAN
    if (!pan.trim()) {
      newErrors.kyc.pan = "PAN is required"
      isValid = false
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      newErrors.kyc.pan = "Please enter a valid PAN (e.g., ABCDE1234F)"
      isValid = false
    }

    // Validate Aadhaar
    if (!aadhaar.trim()) {
      newErrors.kyc.aadhaar = "Aadhaar number is required"
      isValid = false
    } else if (!/^\d{12}$/.test(aadhaar)) {
      newErrors.kyc.aadhaar = "Please enter a valid 12-digit Aadhaar number"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateDocuments = () => {
    let isValid = true
    const newErrors = { ...errors }
    newErrors.documents = {}

    if (!documents.panCard) {
      newErrors.documents.panCard = "PAN card document is required"
      isValid = false
    }

    if (!documents.aadhaarCard) {
      newErrors.documents.aadhaarCard = "Aadhaar card document is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateNominee = () => {
    let isValid = true
    const newErrors = { ...errors }
    newErrors.nominee = {}

    if (!nominee.name.trim()) {
      newErrors.nominee.name = "Nominee name is required"
      isValid = false
    }

    if (!nominee.relation) {
      newErrors.nominee.relation = "Please select the relation with nominee"
      isValid = false
    }

    if (!nominee.dob) {
      newErrors.nominee.dob = "Nominee's date of birth is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateOccupation = () => {
    let isValid = true
    const newErrors = { ...errors }
    newErrors.occupation = {}

    if (!occupation) {
      newErrors.occupation.occupation = "Please select your occupation"
      isValid = false
    }

    if (!annualIncome) {
      newErrors.occupation.annualIncome = "Please select your annual income range"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleFileChange = (type, e) => {
    const file = e.target.files[0]

    if (!file) return

    // Check file type
    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [type]: "Only JPEG, PNG, or PDF files are allowed",
        },
      }))
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [type]: "File size should not exceed 5MB",
        },
      }))
      return
    }

    setErrors((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: "",
      },
    }))

    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }))
  }

  const removeFile = (type) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: null,
    }))
  }

  const handleNomineeChange = (field, value) => {
    setNominee((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNextTab = () => {
    switch (activeTab) {
      case "basic":
        if (validateBasicInfo()) {
          setActiveTab("kyc")
        }
        break
      case "kyc":
        if (validateKYC()) {
          setActiveTab("documents")
        }
        break
      case "documents":
        if (validateDocuments()) {
          setActiveTab("nominee")
        }
        break
      case "nominee":
        if (validateNominee()) {
          setActiveTab("occupation")
        }
        break
      case "occupation":
        if (validateOccupation()) {
          handleSubmit()
        }
        break
      default:
        break
    }
  }

  const handleSubmit = () => {
    // Combine all validations
    const isBasicValid = validateBasicInfo()
    const isKycValid = validateKYC()
    const isDocumentsValid = validateDocuments()
    const isNomineeValid = validateNominee()
    const isOccupationValid = validateOccupation()

    if (isBasicValid && isKycValid && isDocumentsValid && isNomineeValid && isOccupationValid) {
      updateFormData({
        name,
        dob,
        email,
        kycConsent,
        pan,
        aadhaar,
        documents,
        nominee,
        occupation,
        annualIncome,
      })
      onNext()
    } else {
      // Set the active tab to the first tab with errors
      if (!isBasicValid) setActiveTab("basic")
      else if (!isKycValid) setActiveTab("kyc")
      else if (!isDocumentsValid) setActiveTab("documents")
      else if (!isNomineeValid) setActiveTab("nominee")
      else if (!isOccupationValid) setActiveTab("occupation")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-chitfund-blue-950" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-chitfund-text-dark">Personal Information</h3>
            <p className="text-sm text-chitfund-text-light">Please provide your personal details and documents</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="kyc">KYC Consent</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="nominee">Nominee</TabsTrigger>
          <TabsTrigger value="occupation">Occupation</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              Full Name (as per PAN/Aadhaar)
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-base"
            />
            {errors.basic.name && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 text-red-600 text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{errors.basic.name}</span>
              </motion.div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob" className="text-gray-700">
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="h-12 text-base"
            />
            {errors.basic.dob && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 text-red-600 text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{errors.basic.dob}</span>
              </motion.div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base"
            />
            {errors.basic.email && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 text-red-600 text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{errors.basic.email}</span>
              </motion.div>
            )}
          </div>
        </TabsContent>

        {/* KYC Consent Tab */}
        <TabsContent value="kyc" className="space-y-5 pt-4">
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertTitle>Why do we need KYC?</AlertTitle>
            <AlertDescription>
              KYC (Know Your Customer) is a mandatory process required by regulatory authorities to verify the identity
              of customers. This helps prevent fraud, money laundering, and ensures compliance with financial
              regulations.
            </AlertDescription>
          </Alert>

          <div className="border rounded-md p-4 bg-gray-50">
            <h4 className="font-medium mb-2">Consent for KYC Verification</h4>
            <p className="text-sm text-gray-600 mb-4">By checking the box below, you consent to:</p>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5 mb-4">
              <li>Verification of your identity through PAN and/or Aadhaar</li>
              <li>Sharing of your KYC information with relevant authorities</li>
              <li>Storage and processing of your personal information in accordance with our Privacy Policy</li>
              <li>Receiving communications related to your chit fund account and transactions</li>
            </ul>

            <div className="flex items-start space-x-2 mt-4">
              <Checkbox
                id="consent"
                checked={kycConsent}
                onCheckedChange={(checked) => {
                  setKycConsent(checked === true)
                  if (checked) {
                    setErrors((prev) => ({
                      ...prev,
                      kyc: { ...prev.kyc, consent: "" },
                    }))
                  }
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="consent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I consent to the KYC verification process and agree to the terms mentioned above
                </Label>
              </div>
            </div>

            {errors.kyc.consent && (
              <div className="flex items-center gap-1 text-red-600 text-sm mt-2">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.kyc.consent}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pan" className="text-gray-700">
              PAN Number
            </Label>
            <Input
              id="pan"
              placeholder="Enter your PAN number"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              maxLength={10}
              className="h-12 text-base"
            />
            {errors.kyc.pan && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 text-red-600 text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{errors.kyc.pan}</span>
              </motion.div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadhaar" className="text-gray-700">
              Aadhaar Number
            </Label>
            <Input
              id="aadhaar"
              placeholder="Enter your 12-digit Aadhaar number"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              maxLength={12}
              className="h-12 text-base"
            />
            {errors.kyc.aadhaar && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 text-red-600 text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{errors.kyc.aadhaar}</span>
              </motion.div>
            )}
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6 pt-4">
          {/* PAN Card Upload */}
          <div className="space-y-2">
            <Label htmlFor="pan-upload">PAN Card</Label>

            {documents.panCard ? (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-green-800 font-medium">{documents.panCard.name}</p>
                      <p className="text-xs text-green-600">{(documents.panCard.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile("panCard")}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mb-4">JPEG, PNG or PDF (max. 5MB)</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative"
                  onClick={() => document.getElementById("pan-upload").click()}
                >
                  Select File
                  <input
                    id="pan-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange("panCard", e)}
                  />
                </Button>
              </div>
            )}

            {errors.documents.panCard && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.documents.panCard}</span>
              </div>
            )}
          </div>

          {/* Aadhaar Card Upload */}
          <div className="space-y-2">
            <Label htmlFor="aadhaar-upload">Aadhaar Card</Label>

            {documents.aadhaarCard ? (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-green-800 font-medium">{documents.aadhaarCard.name}</p>
                      <p className="text-xs text-green-600">
                        {(documents.aadhaarCard.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile("aadhaarCard")}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mb-4">JPEG, PNG or PDF (max. 5MB)</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative"
                  onClick={() => document.getElementById("aadhaar-upload").click()}
                >
                  Select File
                  <input
                    id="aadhaar-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange("aadhaarCard", e)}
                  />
                </Button>
              </div>
            )}

            {errors.documents.aadhaarCard && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.documents.aadhaarCard}</span>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Nominee Tab */}
        <TabsContent value="nominee" className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="nominee-name">Nominee Name</Label>
            <Input
              id="nominee-name"
              placeholder="Enter nominee's full name"
              value={nominee.name}
              onChange={(e) => handleNomineeChange("name", e.target.value)}
            />
            {errors.nominee.name && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.nominee.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nominee-relation">Relation with Nominee</Label>
            <Select value={nominee.relation} onValueChange={(value) => handleNomineeChange("relation", value)}>
              <SelectTrigger id="nominee-relation">
                <SelectValue placeholder="Select relation" />
              </SelectTrigger>
              <SelectContent>
                {RELATIONS.map((relation) => (
                  <SelectItem key={relation} value={relation}>
                    {relation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.nominee.relation && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.nominee.relation}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nominee-dob">Nominee's Date of Birth</Label>
            <Input
              id="nominee-dob"
              type="date"
              value={nominee.dob}
              onChange={(e) => handleNomineeChange("dob", e.target.value)}
            />
            {errors.nominee.dob && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.nominee.dob}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nominee-share">Share Percentage</Label>
            <Input
              id="nominee-share"
              type="number"
              min="1"
              max="100"
              value={nominee.share}
              onChange={(e) => handleNomineeChange("share", Number.parseInt(e.target.value))}
              disabled
            />
            <p className="text-xs text-gray-500">Currently, only one nominee with 100% share is supported</p>
          </div>
        </TabsContent>

        {/* Occupation Tab */}
        <TabsContent value="occupation" className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Select value={occupation} onValueChange={setOccupation}>
              <SelectTrigger id="occupation">
                <SelectValue placeholder="Select your occupation" />
              </SelectTrigger>
              <SelectContent>
                {OCCUPATION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.occupation.occupation && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.occupation.occupation}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="annual-income">Annual Income Range</Label>
            <Select value={annualIncome} onValueChange={setAnnualIncome}>
              <SelectTrigger id="annual-income">
                <SelectValue placeholder="Select your annual income range" />
              </SelectTrigger>
              <SelectContent>
                {INCOME_RANGES.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.occupation.annualIncome && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.occupation.annualIncome}</span>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="pt-4 flex justify-between">
        {activeTab !== "basic" && (
          <Button
            variant="outline"
            onClick={() => {
              const tabs = ["basic", "kyc", "documents", "nominee", "occupation"]
              const currentIndex = tabs.indexOf(activeTab)
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1])
              }
            }}
            className="border-2 border-blue-200 text-blue-700"
          >
            Previous Section
          </Button>
        )}

        <Button
          onClick={handleNextTab}
          className="ml-auto bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white flex items-center justify-center gap-2"
        >
          {activeTab === "occupation" ? "Complete & Continue" : "Next Section"} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
