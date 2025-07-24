"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Building, Shield } from "lucide-react"

interface BankDetailsProps {
  onNext: () => void
  onBack: () => void
}

const accountTypes = ["Savings Account", "Current Account", "Salary Account", "NRI Account"]

const bankNames = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Indian Bank",
  "Central Bank of India",
  "Other",
]

export default function BankDetails({ onNext, onBack }: BankDetailsProps) {
  const [bankData, setBankData] = useState({
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    accountType: "",
    branchAddress: "",
    isJointAccount: false,
    jointHolderName: "",
    relationWithJointHolder: "",
  })

  const [verificationConsent, setVerificationConsent] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setBankData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid =
    bankData.accountHolderName &&
    bankData.accountNumber &&
    bankData.confirmAccountNumber &&
    bankData.ifscCode &&
    bankData.bankName &&
    bankData.accountType &&
    bankData.accountNumber === bankData.confirmAccountNumber &&
    verificationConsent

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Bank Account Details */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Bank Account Details</CardTitle>
          </div>
          <p className="text-sm text-gray-600 mt-2">This account will be used for all chit fund transactions</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accountHolderName" className="text-sm font-medium text-gray-700">
                Account Holder Name *
              </Label>
              <Input
                id="accountHolderName"
                placeholder="As per bank records"
                value={bankData.accountHolderName}
                onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="accountType" className="text-sm font-medium text-gray-700">
                Account Type *
              </Label>
              <Select value={bankData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
                Account Number *
              </Label>
              <Input
                id="accountNumber"
                placeholder="Enter account number"
                value={bankData.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value.replace(/\D/g, ""))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirmAccountNumber" className="text-sm font-medium text-gray-700">
                Confirm Account Number *
              </Label>
              <Input
                id="confirmAccountNumber"
                placeholder="Re-enter account number"
                value={bankData.confirmAccountNumber}
                onChange={(e) => handleInputChange("confirmAccountNumber", e.target.value.replace(/\D/g, ""))}
                className={`mt-1 ${
                  bankData.accountNumber &&
                  bankData.confirmAccountNumber &&
                  bankData.accountNumber !== bankData.confirmAccountNumber
                    ? "border-red-500"
                    : ""
                }`}
              />
              {bankData.accountNumber &&
                bankData.confirmAccountNumber &&
                bankData.accountNumber !== bankData.confirmAccountNumber && (
                  <p className="text-xs text-red-500 mt-1">Account numbers do not match</p>
                )}
            </div>
            <div>
              <Label htmlFor="ifscCode" className="text-sm font-medium text-gray-700">
                IFSC Code *
              </Label>
              <Input
                id="ifscCode"
                placeholder="Enter IFSC code"
                value={bankData.ifscCode}
                onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                className="mt-1"
                maxLength={11}
              />
            </div>
            <div>
              <Label htmlFor="bankName" className="text-sm font-medium text-gray-700">
                Bank Name *
              </Label>
              <Select value={bankData.bankName} onValueChange={(value) => handleInputChange("bankName", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {bankNames.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="branchName" className="text-sm font-medium text-gray-700">
                Branch Name
              </Label>
              <Input
                id="branchName"
                placeholder="Enter branch name"
                value={bankData.branchName}
                onChange={(e) => handleInputChange("branchName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="branchAddress" className="text-sm font-medium text-gray-700">
                Branch Address
              </Label>
              <Input
                id="branchAddress"
                placeholder="Enter branch address"
                value={bankData.branchAddress}
                onChange={(e) => handleInputChange("branchAddress", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Joint Account Details */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Joint Account Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="isJointAccount"
              checked={bankData.isJointAccount}
              onCheckedChange={(checked) => handleInputChange("isJointAccount", checked)}
              className="border-[#1e3a8a] data-[state=checked]:bg-[#1e3a8a]"
            />
            <Label htmlFor="isJointAccount" className="text-sm font-medium text-gray-700 cursor-pointer">
              This is a joint account
            </Label>
          </div>

          {bankData.isJointAccount && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="jointHolderName" className="text-sm font-medium text-gray-700">
                  Joint Account Holder Name
                </Label>
                <Input
                  id="jointHolderName"
                  placeholder="Enter joint holder's name"
                  value={bankData.jointHolderName}
                  onChange={(e) => handleInputChange("jointHolderName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="relationWithJointHolder" className="text-sm font-medium text-gray-700">
                  Relationship
                </Label>
                <Input
                  id="relationWithJointHolder"
                  placeholder="e.g., Spouse, Father, Mother"
                  value={bankData.relationWithJointHolder}
                  onChange={(e) => handleInputChange("relationWithJointHolder", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Consent */}
      <Card className="border-purple-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl text-[#1e3a8a]">Bank Verification Consent</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="verificationConsent"
                checked={verificationConsent}
                onCheckedChange={setVerificationConsent}
                className="border-[#1e3a8a] data-[state=checked]:bg-[#1e3a8a] mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="verificationConsent" className="text-sm font-medium text-[#1e3a8a] cursor-pointer">
                  Bank Account Verification Consent
                </Label>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  I authorize UCFSIN to verify my bank account details through secure banking channels and third-party
                  verification services. This verification is essential for:
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1 ml-4">
                  <li>• Ensuring account authenticity and preventing fraud</li>
                  <li>• Enabling secure fund transfers and transactions</li>
                  <li>• Compliance with RBI and banking regulations</li>
                  <li>• Account holder name verification</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Bank account must be active and in good standing</li>
          <li>• Account holder name should match with your registered name</li>
          <li>• Joint account holders may need additional verification</li>
          <li>• Bank details can be updated later with proper documentation</li>
          <li>• All transactions will be processed through this account only</li>
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
