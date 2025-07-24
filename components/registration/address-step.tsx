"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, CreditCard, MapIcon } from "lucide-react"

interface AddressStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

const indianStates = [
  { code: "KA", name: "Karnataka" },
  { code: "MH", name: "Maharashtra" },
  { code: "TN", name: "Tamil Nadu" },
  { code: "AP", name: "Andhra Pradesh" },
  { code: "TG", name: "Telangana" },
  { code: "KL", name: "Kerala" },
  { code: "GJ", name: "Gujarat" },
  { code: "RJ", name: "Rajasthan" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "WB", name: "West Bengal" },
  { code: "DL", name: "Delhi" },
  { code: "HR", name: "Haryana" },
  { code: "PB", name: "Punjab" },
  { code: "MP", name: "Madhya Pradesh" },
  { code: "OR", name: "Odisha" },
  { code: "JH", name: "Jharkhand" },
  { code: "CG", name: "Chhattisgarh" },
  { code: "AS", name: "Assam" },
  { code: "BR", name: "Bihar" },
  { code: "UK", name: "Uttarakhand" },
  { code: "HP", name: "Himachal Pradesh" },
  { code: "JK", name: "Jammu and Kashmir" },
  { code: "GA", name: "Goa" },
  { code: "MN", name: "Manipur" },
  { code: "MZ", name: "Mizoram" },
  { code: "NL", name: "Nagaland" },
  { code: "SK", name: "Sikkim" },
  { code: "TR", name: "Tripura" },
  { code: "AR", name: "Arunachal Pradesh" },
  { code: "ML", name: "Meghalaya" },
]

export default function AddressStep({ formData, updateFormData, onNext }: AddressStepProps) {
  const [selectedState, setSelectedState] = useState("")

  useEffect(() => {
    if (formData.state) {
      const state = indianStates.find((s) => s.name === formData.state)
      if (state) {
        setSelectedState(state.code)
        updateFormData({ stateCode: state.code })
      }
    }
  }, [formData.state])

  const handleStateChange = (stateName: string) => {
    const state = indianStates.find((s) => s.name === stateName)
    if (state) {
      setSelectedState(state.code)
      updateFormData({ state: stateName, stateCode: state.code })
    }
  }

  const handleNext = () => {
    if (isFormValid) {
      onNext()
    } else {
      alert("Please fill all required fields")
    }
  }

  const isFormValid =
    formData.house &&
    formData.street &&
    formData.city &&
    formData.district &&
    formData.state &&
    formData.pincode?.length === 6

  const formatAddress = () => {
    if (!isFormValid) return "Complete address will appear here"

    return `${formData.house}, ${formData.street}, ${formData.city}, ${formData.district}, ${formData.state} - ${formData.pincode}`
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#1e3a8a]" />
              Address for Physical Card Delivery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="house">House/Flat/Building *</Label>
              <Input
                id="house"
                value={formData.house}
                onChange={(e) => updateFormData({ house: e.target.value })}
                placeholder="Enter house/flat/building details"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="street">Street/Locality *</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => updateFormData({ street: e.target.value })}
                placeholder="Enter street/locality"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData({ city: e.target.value })}
                  placeholder="Enter city"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="district">District *</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => updateFormData({ district: e.target.value })}
                  placeholder="Enter district"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={handleStateChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state.code} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => updateFormData({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                  placeholder="Enter 6-digit pincode"
                  className="mt-1"
                  maxLength={6}
                />
              </div>
            </div>

            <Button onClick={handleNext} disabled={!isFormValid} className="w-full bg-[#1e3a8a] hover:bg-[#3b82f6]">
              <MapIcon className="h-4 w-4 mr-2" />
              Confirm Address & Continue
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Card Preview Section */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white">
          <CardHeader>
            <CardTitle className="text-center text-white">UCFSIN Card Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Card Design */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  <span className="font-bold">UCFSIN</span>
                </div>
                <span className="text-xs">Government of India</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs opacity-75">Name</div>
                  <div className="font-medium">{formData.fullName || "Your Name"}</div>
                </div>

                <div>
                  <div className="text-xs opacity-75">UCFSIN Number</div>
                  <div className="font-mono text-lg">
                    {selectedState ? `${selectedState}-XXX##-####` : "XX-XXX##-####"}
                  </div>
                </div>

                <div>
                  <div className="text-xs opacity-75">Delivery Address</div>
                  <div className="text-sm leading-tight">{formatAddress()}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-600">
              <li>• Physical card delivery: 12-15 working days</li>
              <li>• Digital card: Available immediately after payment</li>
              <li>• Free delivery across India</li>
              <li>• SMS and email tracking updates</li>
              <li>• Secure packaging with OTP verification</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
