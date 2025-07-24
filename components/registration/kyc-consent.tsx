"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, FileCheck, Lock, AlertCircle } from "lucide-react"

interface KYCConsentProps {
  onNext: () => void
}

export default function KYCConsent({ onNext }: KYCConsentProps) {
  const [consents, setConsents] = useState({
    dataProcessing: false,
    documentVerification: false,
    backgroundCheck: false,
    termsConditions: false,
  })

  const handleConsentChange = (key: keyof typeof consents) => {
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const allConsentsGiven = Object.values(consents).every(Boolean)

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <Card className="border-blue-200">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl md:text-3xl text-[#1e3a8a] mb-2">KYC Consent & Authorization</CardTitle>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your privacy and security are our top priorities. Please review and provide consent for the following data
            processing activities required for UCFSIN registration.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Data Processing Consent */}
          <div className="bg-blue-50 rounded-lg p-4 md:p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  id="dataProcessing"
                  checked={consents.dataProcessing}
                  onCheckedChange={() => handleConsentChange("dataProcessing")}
                  className="border-[#1e3a8a] data-[state=checked]:bg-[#1e3a8a]"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <FileCheck className="h-5 w-5 text-[#1e3a8a] mr-2" />
                  <h3 className="text-lg font-semibold text-[#1e3a8a]">Data Processing Consent</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I consent to the collection, processing, and storage of my personal information including name,
                  address, contact details, and financial information for the purpose of UCFSIN registration and chit
                  fund operations as per the Data Protection Act, 2023.
                </p>
              </div>
            </div>
          </div>

          {/* Document Verification Consent */}
          <div className="bg-green-50 rounded-lg p-4 md:p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  id="documentVerification"
                  checked={consents.documentVerification}
                  onCheckedChange={() => handleConsentChange("documentVerification")}
                  className="border-[#1e3a8a] data-[state=checked]:bg-[#1e3a8a]"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 text-[#1e3a8a] mr-2" />
                  <h3 className="text-lg font-semibold text-[#1e3a8a]">Document Verification Authorization</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I authorize the verification of my identity documents (Aadhaar, PAN, Bank statements) with respective
                  government databases and financial institutions for KYC compliance and fraud prevention.
                </p>
              </div>
            </div>
          </div>

          {/* Background Check Consent */}
          <div className="bg-purple-50 rounded-lg p-4 md:p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  id="backgroundCheck"
                  checked={consents.backgroundCheck}
                  onCheckedChange={() => handleConsentChange("backgroundCheck")}
                  className="border-[#1e3a8a] data-[state=checked]:bg-[#1e3a8a]"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-[#1e3a8a] mr-2" />
                  <h3 className="text-lg font-semibold text-[#1e3a8a]">Background Verification Consent</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I consent to background verification checks including credit history, legal records, and previous chit
                  fund participation to ensure platform security and regulatory compliance.
                </p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-orange-50 rounded-lg p-4 md:p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  id="termsConditions"
                  checked={consents.termsConditions}
                  onCheckedChange={() => handleConsentChange("termsConditions")}
                  className="border-[#1e3a8a] data-[state=checked]:bg-[#1e3a8a]"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-[#1e3a8a] mr-2" />
                  <h3 className="text-lg font-semibold text-[#1e3a8a]">Terms & Conditions Agreement</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I have read, understood, and agree to the{" "}
                  <a href="/terms" className="text-[#1e3a8a] underline hover:text-[#3b82f6]">
                    Terms of Service
                  </a>
                  ,{" "}
                  <a href="/privacy" className="text-[#1e3a8a] underline hover:text-[#3b82f6]">
                    Privacy Policy
                  </a>
                  , and{" "}
                  <a href="/legal/acts-and-rules" className="text-[#1e3a8a] underline hover:text-[#3b82f6]">
                    Chit Fund Regulations
                  </a>{" "}
                  governing the UCFSIN platform.
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 md:p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Your data will be processed in accordance with applicable data protection laws</li>
                  <li>• You can withdraw consent at any time by contacting our support team</li>
                  <li>• All information is encrypted and stored securely on government-approved servers</li>
                  <li>• Data sharing is limited to authorized government agencies and RBI-approved entities only</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              onClick={onNext}
              disabled={!allConsentsGiven}
              className="flex-1 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a] text-white py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              I Agree & Continue
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 text-lg bg-transparent"
            >
              Cancel Registration
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By clicking "I Agree & Continue", you acknowledge that you have read and understood all consent requirements
            and agree to proceed with UCFSIN registration.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
