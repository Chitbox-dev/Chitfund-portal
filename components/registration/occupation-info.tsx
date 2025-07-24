"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Building, DollarSign } from "lucide-react"

interface OccupationInfoProps {
  onNext: () => void
  onBack: () => void
}

const occupationTypes = [
  "Salaried Employee",
  "Self Employed",
  "Business Owner",
  "Professional",
  "Government Employee",
  "Retired",
  "Student",
  "Homemaker",
  "Farmer",
  "Other",
]

const incomeRanges = ["Below ₹2 Lakh", "₹2-5 Lakh", "₹5-10 Lakh", "₹10-25 Lakh", "₹25-50 Lakh", "Above ₹50 Lakh"]

export default function OccupationInfo({ onNext, onBack }: OccupationInfoProps) {
  const [occupationData, setOccupationData] = useState({
    occupationType: "",
    companyName: "",
    designation: "",
    workExperience: "",
    annualIncome: "",
    incomeSource: "",
    workAddress: "",
    additionalIncome: "",
    remarks: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setOccupationData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = occupationData.occupationType && occupationData.annualIncome && occupationData.incomeSource

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Occupation Details */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Occupation Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupationType" className="text-sm font-medium text-gray-700">
                Occupation Type *
              </Label>
              <Select
                value={occupationData.occupationType}
                onValueChange={(value) => handleInputChange("occupationType", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select occupation type" />
                </SelectTrigger>
                <SelectContent>
                  {occupationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                Company/Organization Name
              </Label>
              <Input
                id="companyName"
                placeholder="Enter company name"
                value={occupationData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="designation" className="text-sm font-medium text-gray-700">
                Designation/Position
              </Label>
              <Input
                id="designation"
                placeholder="Enter your designation"
                value={occupationData.designation}
                onChange={(e) => handleInputChange("designation", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="workExperience" className="text-sm font-medium text-gray-700">
                Work Experience (Years)
              </Label>
              <Input
                id="workExperience"
                placeholder="Enter years of experience"
                type="number"
                min="0"
                max="50"
                value={occupationData.workExperience}
                onChange={(e) => handleInputChange("workExperience", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="workAddress" className="text-sm font-medium text-gray-700">
                Work Address
              </Label>
              <Textarea
                id="workAddress"
                placeholder="Enter complete work address"
                value={occupationData.workAddress}
                onChange={(e) => handleInputChange("workAddress", e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Income Details */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Income Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="annualIncome" className="text-sm font-medium text-gray-700">
                Annual Income Range *
              </Label>
              <Select
                value={occupationData.annualIncome}
                onValueChange={(value) => handleInputChange("annualIncome", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  {incomeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="incomeSource" className="text-sm font-medium text-gray-700">
                Primary Income Source *
              </Label>
              <Input
                id="incomeSource"
                placeholder="e.g., Salary, Business, Pension"
                value={occupationData.incomeSource}
                onChange={(e) => handleInputChange("incomeSource", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="additionalIncome" className="text-sm font-medium text-gray-700">
                Additional Income Sources
              </Label>
              <Input
                id="additionalIncome"
                placeholder="e.g., Rental income, Investments, Part-time work"
                value={occupationData.additionalIncome}
                onChange={(e) => handleInputChange("additionalIncome", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="border-purple-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Additional Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="remarks" className="text-sm font-medium text-gray-700">
              Remarks/Additional Details
            </Label>
            <Textarea
              id="remarks"
              placeholder="Any additional information about your occupation or income"
              value={occupationData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• All income information will be verified during the KYC process</li>
          <li>• Providing false information may result in rejection of your application</li>
          <li>• Income details are used for risk assessment and chit fund eligibility</li>
          <li>• Your financial information is kept confidential and secure</li>
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
