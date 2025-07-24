"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Loader2, ArrowRight, CheckCircle2, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample list of Indian states
const INDIAN_STATES = [
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
]

export default function UCFINGeneration({ formData, updateFormData, onNext }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [wantPhysicalCard, setWantPhysicalCard] = useState(false)
  const [generatedIds, setGeneratedIds] = useState({
    cfin: formData.cfin || "",
    ucfin: formData.ucfin || "",
    sin: formData.sin || "",
  })

  const [permanentAddress, setPermanentAddress] = useState(
    formData.permanentAddress || {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
    },
  )

  const [residentialAddress, setResidentialAddress] = useState(
    formData.residentialAddress || {
      sameAsPermanent: false,
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
    },
  )

  const [sameAsPermanent, setSameAsPermanent] = useState(formData.residentialAddress?.sameAsPermanent || false)

  const [errors, setErrors] = useState({
    permanent: {},
    residential: {},
  })

  const handleGenerateUCFIN = () => {
    setIsGenerating(true)

    // Simulate API call to generate UCFIN
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)

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
    }, 2000)
  }

  const handlePermanentAddressChange = (field, value) => {
    setPermanentAddress((prev) => ({
      ...prev,
      [field]: value,
    }))

    // If residential address is same as permanent, update it too
    if (sameAsPermanent) {
      setResidentialAddress((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleResidentialAddressChange = (field, value) => {
    setResidentialAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSameAddressChange = (checked) => {
    setSameAsPermanent(checked)
    setResidentialAddress((prev) => ({
      ...prev,
      sameAsPermanent: checked,
      ...(checked ? permanentAddress : prev),
    }))
  }

  const validateAddressForm = () => {
    let isValid = true
    const newErrors = {
      permanent: {},
      residential: {},
    }

    // Validate permanent address
    if (!permanentAddress.line1) {
      newErrors.permanent.line1 = "Address line 1 is required"
      isValid = false
    }

    if (!permanentAddress.city) {
      newErrors.permanent.city = "City is required"
      isValid = false
    }

    if (!permanentAddress.state) {
      newErrors.permanent.state = "State is required"
      isValid = false
    }

    if (!permanentAddress.pincode) {
      newErrors.permanent.pincode = "PIN code is required"
      isValid = false
    } else if (!/^\d{6}$/.test(permanentAddress.pincode)) {
      newErrors.permanent.pincode = "Please enter a valid 6-digit PIN code"
      isValid = false
    }

    // Validate residential address if not same as permanent
    if (!sameAsPermanent) {
      if (!residentialAddress.line1) {
        newErrors.residential.line1 = "Address line 1 is required"
        isValid = false
      }

      if (!residentialAddress.city) {
        newErrors.residential.city = "City is required"
        isValid = false
      }

      if (!residentialAddress.state) {
        newErrors.residential.state = "State is required"
        isValid = false
      }

      if (!residentialAddress.pincode) {
        newErrors.residential.pincode = "PIN code is required"
        isValid = false
      } else if (!/^\d{6}$/.test(residentialAddress.pincode)) {
        newErrors.residential.pincode = "Please enter a valid 6-digit PIN code"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (isGenerated) {
      if (wantPhysicalCard) {
        if (!showAddressForm) {
          setShowAddressForm(true)
          return
        }

        if (!validateAddressForm()) {
          return
        }
      }

      updateFormData({
        ...generatedIds,
        permanentAddress,
        residentialAddress: {
          ...residentialAddress,
          sameAsPermanent,
        },
      })
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="h-6 w-6 text-chitfund-blue-950" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-chitfund-text-dark">UCFIN Generation</h3>
            <p className="text-sm text-chitfund-text-light">Generate your Unique Chit Fund Identification Number</p>
          </div>
        </div>
      </div>

      {!isGenerated ? (
        <div className="space-y-6">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-chitfund-blue-950" />
                </div>
                <h4 className="font-medium text-lg">Generate Your UCFIN</h4>
              </div>

              <p className="text-chitfund-text-light mb-6">
                Your UCFIN (Unique Chit Fund Identification Number) is a universal identifier that works across all
                registered chit fund companies. Once generated, you can use it for all your chit fund activities.
              </p>

              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  By generating a UCFIN, you agree to the terms and conditions of the Chit Fund Portal. Your UCFIN will
                  be linked to your KYC details and will be used to track your chit fund activities.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleGenerateUCFIN}
                disabled={isGenerating}
                className="w-full bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating UCFIN...
                  </>
                ) : (
                  "Generate UCFIN"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <h4 className="font-medium text-lg text-green-800">UCFIN Generated Successfully!</h4>
              </div>

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

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <h4 className="font-medium text-lg mb-4">Would you like to receive a physical UCFIN card?</h4>

              <div className="flex items-start space-x-2 mb-6">
                <Checkbox
                  id="want-physical-card"
                  checked={wantPhysicalCard}
                  onCheckedChange={(checked) => setWantPhysicalCard(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="want-physical-card"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Yes, I want a physical UCFIN card delivered to my address
                  </Label>
                  <p className="text-xs text-gray-500">The physical card will be delivered within 7-10 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {showAddressForm && wantPhysicalCard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium text-lg mb-6">Delivery Address</h4>

                  {/* Permanent Address */}
                  <div className="space-y-4 mb-6">
                    <h5 className="font-medium">Permanent Address</h5>

                    <div className="space-y-2">
                      <Label htmlFor="permanent-line1">Address Line 1</Label>
                      <Input
                        id="permanent-line1"
                        placeholder="House/Flat No., Building Name, Street"
                        value={permanentAddress.line1}
                        onChange={(e) => handlePermanentAddressChange("line1", e.target.value)}
                      />
                      {errors.permanent.line1 && (
                        <div className="flex items-center gap-1 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.permanent.line1}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="permanent-line2">Address Line 2 (Optional)</Label>
                      <Input
                        id="permanent-line2"
                        placeholder="Area, Landmark, etc."
                        value={permanentAddress.line2}
                        onChange={(e) => handlePermanentAddressChange("line2", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="permanent-city">City</Label>
                        <Input
                          id="permanent-city"
                          placeholder="City"
                          value={permanentAddress.city}
                          onChange={(e) => handlePermanentAddressChange("city", e.target.value)}
                        />
                        {errors.permanent.city && (
                          <div className="flex items-center gap-1 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.permanent.city}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="permanent-state">State</Label>
                        <Select
                          value={permanentAddress.state}
                          onValueChange={(value) => handlePermanentAddressChange("state", value)}
                        >
                          <SelectTrigger id="permanent-state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDIAN_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.permanent.state && (
                          <div className="flex items-center gap-1 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.permanent.state}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="permanent-pincode">PIN Code</Label>
                      <Input
                        id="permanent-pincode"
                        placeholder="6-digit PIN code"
                        value={permanentAddress.pincode}
                        onChange={(e) => handlePermanentAddressChange("pincode", e.target.value)}
                        maxLength={6}
                      />
                      {errors.permanent.pincode && (
                        <div className="flex items-center gap-1 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.permanent.pincode}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Same as Permanent Address Checkbox */}
                  <div className="flex items-start space-x-2 mb-6">
                    <Checkbox id="same-address" checked={sameAsPermanent} onCheckedChange={handleSameAddressChange} />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="same-address"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Residential address is same as permanent address
                      </Label>
                    </div>
                  </div>

                  {/* Residential Address */}
                  {!sameAsPermanent && (
                    <div className="space-y-4">
                      <h5 className="font-medium">Residential Address</h5>

                      <div className="space-y-2">
                        <Label htmlFor="residential-line1">Address Line 1</Label>
                        <Input
                          id="residential-line1"
                          placeholder="House/Flat No., Building Name, Street"
                          value={residentialAddress.line1}
                          onChange={(e) => handleResidentialAddressChange("line1", e.target.value)}
                        />
                        {errors.residential.line1 && (
                          <div className="flex items-center gap-1 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.residential.line1}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="residential-line2">Address Line 2 (Optional)</Label>
                        <Input
                          id="residential-line2"
                          placeholder="Area, Landmark, etc."
                          value={residentialAddress.line2}
                          onChange={(e) => handleResidentialAddressChange("line2", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="residential-city">City</Label>
                          <Input
                            id="residential-city"
                            placeholder="City"
                            value={residentialAddress.city}
                            onChange={(e) => handleResidentialAddressChange("city", e.target.value)}
                          />
                          {errors.residential.city && (
                            <div className="flex items-center gap-1 text-red-600 text-sm">
                              <AlertCircle className="h-4 w-4" />
                              <span>{errors.residential.city}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="residential-state">State</Label>
                          <Select
                            value={residentialAddress.state}
                            onValueChange={(value) => handleResidentialAddressChange("state", value)}
                          >
                            <SelectTrigger id="residential-state">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {INDIAN_STATES.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.residential.state && (
                            <div className="flex items-center gap-1 text-red-600 text-sm">
                              <AlertCircle className="h-4 w-4" />
                              <span>{errors.residential.state}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="residential-pincode">PIN Code</Label>
                        <Input
                          id="residential-pincode"
                          placeholder="6-digit PIN code"
                          value={residentialAddress.pincode}
                          onChange={(e) => handleResidentialAddressChange("pincode", e.target.value)}
                          maxLength={6}
                        />
                        {errors.residential.pincode && (
                          <div className="flex items-center gap-1 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.residential.pincode}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!isGenerated}
          className="w-full h-12 bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white flex items-center justify-center gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
