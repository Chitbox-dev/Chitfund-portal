"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CreditCard, Loader2, QrCode, Shield } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"

export default function CardIssuance({ formData, updateFormData, onNext }) {
  const [isPhysical, setIsPhysical] = useState(true) // Always true, physical card is mandatory
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("residential")

  const handleIssueCard = () => {
    setIsProcessing(true)

    // Simulate API call to issue card
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      // Generate card details
      const cardId = `CF${Math.floor(Math.random() * 10000000000)
        .toString()
        .padStart(10, "0")}`
      const qrCode = `https://chitfund.example.com/card/${cardId}`

      updateFormData({
        cardDetails: {
          isDigital: false, // No digital card
          isPhysical: true, // Only physical card
          cardId,
          qrCode,
          deliveryAddress,
        },
      })
    }, 3000)
  }

  const handleSubmit = () => {
    if (isComplete) {
      onNext()
    } else {
      setError("Please complete the card issuance process")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">UCFIN Card Issuance</h3>
        <p className="text-sm text-gray-500">Your physical UCFIN card will be delivered to your address</p>
      </div>

      {error && (
        <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 text-red-800">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <Card className="border-blue-200">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Physical UCFIN Card</h4>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Your physical UCFIN card will be delivered to your address within 7-10 business days. The card will look
                like this:
              </p>

              {/* Card Preview */}
              <div className="relative w-full max-w-md mx-auto h-56 bg-gradient-to-r from-chitfund-blue-950 to-blue-700 rounded-xl overflow-hidden shadow-lg mb-6">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Shield className="h-8 w-8 text-white" />
                    <span className="text-white font-bold text-lg">Chit Fund Portal</span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm p-1 rounded">
                      <QrCode className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-20 left-4">
                    <p className="text-white/80 text-xs mb-1">UCFIN</p>
                    <p className="text-white font-bold text-xl tracking-wider">{formData.ucfin || "UC0123456789"}</p>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-xs mb-1">Card Holder</p>
                      <p className="text-white font-medium">{formData.name || "John Doe"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-xs mb-1">Valid Thru</p>
                      <p className="text-white font-medium">LIFETIME</p>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-blue-900/50 pointer-events-none"></div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800 mb-4">
                <p className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  <span>
                    Your physical card provides a tangible proof of your UCFIN registration and can be used for
                    in-person verification.
                  </span>
                </p>
              </div>
            </div>

            {!isComplete && (
              <div className="pt-4 border-t">
                <h5 className="text-sm font-medium mb-2">Delivery Address</h5>
                <RadioGroup defaultValue="residential" value={deliveryAddress} onValueChange={setDeliveryAddress}>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="residential" id="residential" />
                    <Label htmlFor="residential" className="text-sm">
                      Deliver to Residential Address
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="permanent" id="permanent" />
                    <Label htmlFor="permanent" className="text-sm">
                      Deliver to Permanent Address
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </CardContent>
        </Card>

        {!isComplete && (
          <Button
            onClick={handleIssueCard}
            disabled={isProcessing}
            className="w-full bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Issue Physical Card"
            )}
          </Button>
        )}

        {isComplete && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-green-800">
                  <CreditCard className="h-5 w-5" />
                  <h4 className="font-medium">Card Issued Successfully!</h4>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-700">Your UCFIN Card has been issued with the following details:</p>

                  <div className="bg-white p-4 rounded-md border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Card ID</p>
                        <p className="font-medium">{formData.cardDetails?.cardId || "CF0123456789"}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Card Type</p>
                        <p className="font-medium">Physical UCFIN Card</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-md border border-green-200">
                    <p className="text-sm font-medium mb-2">Physical Card Delivery</p>
                    <p className="text-sm text-gray-600">
                      Your physical UCFIN card will be delivered to your {deliveryAddress} address within 7-10 business
                      days.
                    </p>
                    <div className="mt-3 bg-blue-50 p-3 rounded-md">
                      <p className="text-xs text-blue-800 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 flex-shrink-0" />
                        You will receive SMS and email notifications about your card delivery status.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="w-full bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
