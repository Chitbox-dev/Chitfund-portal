"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, CreditCard, Hash, Sparkles } from "lucide-react"

interface UCFSINGenerationStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export default function UCFSINGenerationStep({ formData, updateFormData, onNext }: UCFSINGenerationStepProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [ucfsinNumber, setUcfsinNumber] = useState("")

  useEffect(() => {
    generateUCFSIN()
  }, [])

  const generateUCFSIN = () => {
    setIsGenerating(true)

    // Simulate UCFSIN generation logic
    setTimeout(() => {
      const stateCode = formData.stateCode || "KA"
      const panPrefix = formData.pan ? formData.pan.slice(0, 3) : "EMD"
      const randomDigits = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0")
      const aadhaarSuffix = formData.aadhaar ? formData.aadhaar.replace(/\s/g, "").slice(-4) : "9391"

      const generated = `${stateCode}-${panPrefix}${randomDigits}-${aadhaarSuffix}`
      setUcfsinNumber(generated)
      updateFormData({ ucfsinNumber: generated })
      setIsGenerating(false)
    }, 2000)
  }

  const handleContinue = () => {
    if (ucfsinNumber) {
      onNext()
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Generation Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-[#1e3a8a]" />
              UCFSIN Number Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isGenerating ? (
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1e3a8a] mx-auto"></div>
                <div>
                  <h3 className="font-medium text-lg">Generating your UCFSIN...</h3>
                  <p className="text-gray-600">Please wait while we create your unique identifier</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-green-700">UCFSIN Generated Successfully!</h3>
                  <p className="text-gray-600">Your unique identification number is ready</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Your UCFSIN Number</div>
                  <div className="text-2xl font-mono font-bold text-[#1e3a8a] tracking-wider">{ucfsinNumber}</div>
                </div>
              </div>
            )}

            {!isGenerating && (
              <Button onClick={handleContinue} className="w-full bg-[#1e3a8a] hover:bg-[#3b82f6]">
                <Sparkles className="h-4 w-4 mr-2" />
                Continue to Payment
              </Button>
            )}
          </CardContent>
        </Card>

        {/* UCFSIN Format Explanation */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-[#1e3a8a]">UCFSIN Format Explained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-white font-mono">
                  {formData.stateCode || "KA"}
                </Badge>
                <span className="text-sm">State Code (from your address)</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-white font-mono">
                  {formData.pan ? formData.pan.slice(0, 3) : "EMD"}##
                </Badge>
                <span className="text-sm">PAN prefix + Random digits</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-white font-mono">
                  {formData.aadhaar ? formData.aadhaar.replace(/\s/g, "").slice(-4) : "9391"}
                </Badge>
                <span className="text-sm">Last 4 digits of Aadhaar</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Final Card Preview */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white">
          <CardHeader>
            <CardTitle className="text-center text-white">Final UCFSIN Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  <span className="font-bold">UCFSIN</span>
                </div>
                <span className="text-xs">Government of India</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs opacity-75">Full Name</div>
                  <div className="font-medium text-lg">{formData.fullName}</div>
                </div>

                <div>
                  <div className="text-xs opacity-75">UCFSIN Number</div>
                  <div className="font-mono text-xl font-bold tracking-wider">{ucfsinNumber || "Generating..."}</div>
                </div>

                <div>
                  <div className="text-xs opacity-75">Delivery Address</div>
                  <div className="text-sm leading-tight">
                    {formData.house}, {formData.street}
                    <br />
                    {formData.city}, {formData.district}
                    <br />
                    {formData.state} - {formData.pincode}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <Badge className="bg-green-500 text-white">Ready for Payment</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-700">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>• Complete payment for card issuance</li>
              <li>• Receive digital card immediately</li>
              <li>• Physical card delivery in 12-15 days</li>
              <li>• Set up your UCFSIN account</li>
              <li>• Start using chit fund services</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
