"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users, Heart, Calendar } from "lucide-react"

interface NomineeDetailsProps {
  onNext: () => void
  onBack: () => void
}

const relationships = [
  "Spouse",
  "Son",
  "Daughter",
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Father-in-law",
  "Mother-in-law",
  "Son-in-law",
  "Daughter-in-law",
  "Grandson",
  "Granddaughter",
  "Other",
]

export default function NomineeDetails({ onNext, onBack }: NomineeDetailsProps) {
  const [nomineeData, setNomineeData] = useState({
    nomineeName: "",
    relationship: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    address: "",
    aadhaarNumber: "",
    panNumber: "",
    guardianName: "",
    guardianRelation: "",
    remarks: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setNomineeData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateAge = (dob: string) => {
    if (!dob) return 0
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const age = calculateAge(nomineeData.dateOfBirth)
  const isMinor = age < 18 && age > 0

  const isFormValid =
    nomineeData.nomineeName &&
    nomineeData.relationship &&
    nomineeData.dateOfBirth &&
    nomineeData.contactNumber &&
    (!isMinor || (nomineeData.guardianName && nomineeData.guardianRelation))

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Nominee Information */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Nominee Information</CardTitle>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Nominee will be entitled to receive benefits in case of unforeseen circumstances
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nomineeName" className="text-sm font-medium text-gray-700">
                Nominee Full Name *
              </Label>
              <Input
                id="nomineeName"
                placeholder="Enter nominee's full name"
                value={nomineeData.nomineeName}
                onChange={(e) => handleInputChange("nomineeName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="relationship" className="text-sm font-medium text-gray-700">
                Relationship *
              </Label>
              <Select
                value={nomineeData.relationship}
                onValueChange={(value) => handleInputChange("relationship", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationships.map((relation) => (
                    <SelectItem key={relation} value={relation}>
                      {relation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                Date of Birth *
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={nomineeData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                className="mt-1"
                max={new Date().toISOString().split("T")[0]}
              />
              {age > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Age: {age} years {isMinor && "(Minor - Guardian details required)"}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
                Contact Number *
              </Label>
              <Input
                id="contactNumber"
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                value={nomineeData.contactNumber}
                onChange={(e) => handleInputChange("contactNumber", e.target.value.replace(/\D/g, ""))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={nomineeData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="aadhaarNumber" className="text-sm font-medium text-gray-700">
                Aadhaar Number
              </Label>
              <Input
                id="aadhaarNumber"
                placeholder="Enter 12-digit Aadhaar number"
                maxLength={12}
                value={nomineeData.aadhaarNumber}
                onChange={(e) => handleInputChange("aadhaarNumber", e.target.value.replace(/\D/g, ""))}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter nominee's complete address"
                value={nomineeData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guardian Details (for minors) */}
      {isMinor && (
        <Card className="border-orange-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl text-[#1e3a8a]">Guardian Details</CardTitle>
            </div>
            <p className="text-sm text-gray-600 mt-2">Required as nominee is a minor (below 18 years)</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guardianName" className="text-sm font-medium text-gray-700">
                  Guardian Full Name *
                </Label>
                <Input
                  id="guardianName"
                  placeholder="Enter guardian's full name"
                  value={nomineeData.guardianName}
                  onChange={(e) => handleInputChange("guardianName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="guardianRelation" className="text-sm font-medium text-gray-700">
                  Relation to Nominee *
                </Label>
                <Select
                  value={nomineeData.guardianRelation}
                  onValueChange={(value) => handleInputChange("guardianRelation", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationships.map((relation) => (
                      <SelectItem key={relation} value={relation}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Information */}
      <Card className="border-purple-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Additional Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="remarks" className="text-sm font-medium text-gray-700">
              Remarks/Special Instructions
            </Label>
            <Textarea
              id="remarks"
              placeholder="Any special instructions or additional information"
              value={nomineeData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-[#1e3a8a] mb-2">Important Points</h4>
        <ul className="text-sm text-[#3b82f6] space-y-1">
          <li>• Nominee details can be changed later through proper documentation</li>
          <li>• For minors, guardian signature will be required for any claims</li>
          <li>• Nominee will receive benefits only in case of member's demise</li>
          <li>• Multiple nominees can be added with percentage allocation</li>
          <li>• Ensure all details are accurate as per official documents</li>
        </ul>
      </div>

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
          disabled={!isFormValid}
          className="flex-1 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a] text-white py-3 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
