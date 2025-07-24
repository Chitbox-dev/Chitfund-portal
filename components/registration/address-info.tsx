"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Home } from "lucide-react"

interface AddressInfoProps {
  onNext: () => void
  onBack: () => void
}

const states = [
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

export default function AddressInfo({ onNext, onBack }: AddressInfoProps) {
  const [currentAddress, setCurrentAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  })

  const [permanentAddress, setPermanentAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  })

  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false)

  const handleCurrentAddressChange = (field: string, value: string) => {
    setCurrentAddress((prev) => ({ ...prev, [field]: value }))
    if (sameAsCurrentAddress) {
      setPermanentAddress((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSameAddressToggle = () => {
    setSameAsCurrentAddress(!sameAsCurrentAddress)
    if (!sameAsCurrentAddress) {
      setPermanentAddress(currentAddress)
    }
  }

  const isCurrentAddressValid =
    currentAddress.addressLine1 && currentAddress.city && currentAddress.state && currentAddress.pincode
  const isPermanentAddressValid =
    permanentAddress.addressLine1 && permanentAddress.city && permanentAddress.state && permanentAddress.pincode

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Current Address */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Current Address</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="currentAddressLine1" className="text-sm font-medium text-gray-700">
                Address Line 1 *
              </Label>
              <Input
                id="currentAddressLine1"
                placeholder="House/Flat No., Building Name, Street"
                value={currentAddress.addressLine1}
                onChange={(e) => handleCurrentAddressChange("addressLine1", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="currentAddressLine2" className="text-sm font-medium text-gray-700">
                Address Line 2
              </Label>
              <Input
                id="currentAddressLine2"
                placeholder="Area, Locality"
                value={currentAddress.addressLine2}
                onChange={(e) => handleCurrentAddressChange("addressLine2", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="currentCity" className="text-sm font-medium text-gray-700">
                City *
              </Label>
              <Input
                id="currentCity"
                placeholder="Enter city"
                value={currentAddress.city}
                onChange={(e) => handleCurrentAddressChange("city", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="currentState" className="text-sm font-medium text-gray-700">
                State *
              </Label>
              <Select
                value={currentAddress.state}
                onValueChange={(value) => handleCurrentAddressChange("state", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currentPincode" className="text-sm font-medium text-gray-700">
                PIN Code *
              </Label>
              <Input
                id="currentPincode"
                placeholder="6-digit PIN code"
                maxLength={6}
                value={currentAddress.pincode}
                onChange={(e) => handleCurrentAddressChange("pincode", e.target.value.replace(/\D/g, ""))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="currentLandmark" className="text-sm font-medium text-gray-700">
                Landmark
              </Label>
              <Input
                id="currentLandmark"
                placeholder="Nearby landmark"
                value={currentAddress.landmark}
                onChange={(e) => handleCurrentAddressChange("landmark", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Same Address Checkbox */}
      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
        <Checkbox
          id="sameAddress"
          checked={sameAsCurrentAddress}
          onCheckedChange={handleSameAddressToggle}
          className="border-[#1e3a8a] data-[state=checked]:bg-[#1e3a8a]"
        />
        <Label htmlFor="sameAddress" className="text-sm font-medium text-[#1e3a8a] cursor-pointer">
          Permanent address is same as current address
        </Label>
      </div>

      {/* Permanent Address */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Permanent Address</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="permanentAddressLine1" className="text-sm font-medium text-gray-700">
                Address Line 1 *
              </Label>
              <Input
                id="permanentAddressLine1"
                placeholder="House/Flat No., Building Name, Street"
                value={permanentAddress.addressLine1}
                onChange={(e) => setPermanentAddress((prev) => ({ ...prev, addressLine1: e.target.value }))}
                disabled={sameAsCurrentAddress}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="permanentAddressLine2" className="text-sm font-medium text-gray-700">
                Address Line 2
              </Label>
              <Input
                id="permanentAddressLine2"
                placeholder="Area, Locality"
                value={permanentAddress.addressLine2}
                onChange={(e) => setPermanentAddress((prev) => ({ ...prev, addressLine2: e.target.value }))}
                disabled={sameAsCurrentAddress}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="permanentCity" className="text-sm font-medium text-gray-700">
                City *
              </Label>
              <Input
                id="permanentCity"
                placeholder="Enter city"
                value={permanentAddress.city}
                onChange={(e) => setPermanentAddress((prev) => ({ ...prev, city: e.target.value }))}
                disabled={sameAsCurrentAddress}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="permanentState" className="text-sm font-medium text-gray-700">
                State *
              </Label>
              <Select
                value={permanentAddress.state}
                onValueChange={(value) => setPermanentAddress((prev) => ({ ...prev, state: value }))}
                disabled={sameAsCurrentAddress}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="permanentPincode" className="text-sm font-medium text-gray-700">
                PIN Code *
              </Label>
              <Input
                id="permanentPincode"
                placeholder="6-digit PIN code"
                maxLength={6}
                value={permanentAddress.pincode}
                onChange={(e) =>
                  setPermanentAddress((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, "") }))
                }
                disabled={sameAsCurrentAddress}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="permanentLandmark" className="text-sm font-medium text-gray-700">
                Landmark
              </Label>
              <Input
                id="permanentLandmark"
                placeholder="Nearby landmark"
                value={permanentAddress.landmark}
                onChange={(e) => setPermanentAddress((prev) => ({ ...prev, landmark: e.target.value }))}
                disabled={sameAsCurrentAddress}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 bg-transparent"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!isCurrentAddressValid || !isPermanentAddressValid}
          className="flex-1 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a] text-white py-3 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
