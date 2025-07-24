"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building, CheckCircle, IndianRupee } from "lucide-react"

interface PaymentStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export default function PaymentStep({ formData, updateFormData, onNext }: PaymentStepProps) {
  const [selectedPayment, setSelectedPayment] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const ucfsinFee = 99
  const processingFee = 18
  const totalAmount = ucfsinFee + processingFee

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Pay using any UPI app",
      popular: true,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: <Building className="h-5 w-5" />,
      description: "All major banks supported",
    },
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Visa, Mastercard, RuPay",
    },
  ]

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Please select a payment method")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const transactionId = `TXN${Date.now()}`
      updateFormData({
        paymentMethod: selectedPayment,
        paymentStatus: "success",
        transactionId: transactionId,
      })
      setPaymentSuccess(true)
      setIsProcessing(false)

      // Auto proceed after success
      setTimeout(() => {
        onNext()
      }, 2000)
    }, 3000)
  }

  if (paymentSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your UCFSIN card payment has been processed successfully</p>
        </div>

        <Card className="bg-green-50 border-green-200 max-w-md mx-auto">
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono">{formData.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="capitalize">{formData.paymentMethod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-sm text-gray-500">Redirecting to confirmation...</p>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Payment Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#1e3a8a]" />
              Payment for UCFSIN Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium mb-3">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>UCFSIN Card Fee</span>
                  <span>₹{ucfsinFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>₹{processingFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-medium mb-3">Select Payment Method</h3>
              <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex items-center gap-3 flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        {method.icon}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.name}</span>
                            {method.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {isProcessing ? (
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a8a] mx-auto"></div>
                <p className="text-gray-600">Processing your payment...</p>
              </div>
            ) : (
              <Button
                onClick={handlePayment}
                disabled={!selectedPayment}
                className="w-full bg-[#1e3a8a] hover:bg-[#3b82f6]"
              >
                <IndianRupee className="h-4 w-4 mr-2" />
                Pay ₹{totalAmount}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white">
          <CardHeader>
            <CardTitle className="text-white">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm opacity-75">UCFSIN Number</div>
                <div className="font-mono text-lg">{formData.ucfsinNumber}</div>
              </div>

              <div>
                <div className="text-sm opacity-75">Cardholder Name</div>
                <div className="font-medium">{formData.fullName}</div>
              </div>

              <div>
                <div className="text-sm opacity-75">Delivery Address</div>
                <div className="text-sm">
                  {formData.house}, {formData.street}
                  <br />
                  {formData.city}, {formData.state} - {formData.pincode}
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="text-sm opacity-75">What you'll receive</div>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• Digital UCFSIN card (immediate)</li>
                  <li>• Physical UCFSIN card (12-15 days)</li>
                  <li>• UCFSIN account access</li>
                  <li>• Chit fund services eligibility</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Secure Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-600">
              <li>• 256-bit SSL encryption</li>
              <li>• PCI DSS compliant</li>
              <li>• No card details stored</li>
              <li>• Instant payment confirmation</li>
              <li>• 24/7 payment support</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
