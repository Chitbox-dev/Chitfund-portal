"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Truck, Phone, Mail } from "lucide-react"

interface ConfirmationStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export default function ConfirmationStep({ formData, updateFormData, onNext }: ConfirmationStepProps) {
  const expectedDeliveryDate = new Date()
  expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 15)

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Confirmation Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-6 w-6" />
              UCFSIN Card Processing Confirmed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-700 mb-2">Your UCFSIN Card is being processed</h2>
                <p className="text-gray-600">
                  Congratulations! Your registration is complete and your card is in production.
                </p>
              </div>
            </div>

            {/* Key Details */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">UCFSIN Number:</span>
                <span className="font-mono text-[#1e3a8a]">{formData.ucfsinNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cardholder:</span>
                <span>{formData.fullName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Transaction ID:</span>
                <span className="font-mono text-sm">{formData.transactionId}</span>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="space-y-4">
              <h3 className="font-medium">Delivery Timeline</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium text-green-700">Digital Card Available</div>
                    <div className="text-sm text-green-600">Immediately after account setup</div>
                  </div>
                  <Badge className="bg-green-500">Ready</Badge>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium text-blue-700">Physical Card Production</div>
                    <div className="text-sm text-blue-600">3-5 working days</div>
                  </div>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">
                    In Progress
                  </Badge>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <Truck className="h-5 w-5 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-700">Delivery Expected</div>
                    <div className="text-sm text-gray-600">
                      By{" "}
                      {expectedDeliveryDate.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <Badge variant="outline">12-15 Days</Badge>
                </div>
              </div>
            </div>

            <Button onClick={onNext} className="w-full bg-[#1e3a8a] hover:bg-[#3b82f6]">
              Create UCFSIN Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support & Info Section */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white">
          <CardHeader>
            <CardTitle className="text-white">Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="font-medium">{formData.fullName}</div>
              <div>{formData.house}</div>
              <div>{formData.street}</div>
              <div>
                {formData.city}, {formData.district}
              </div>
              <div>
                {formData.state} - {formData.pincode}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-xs opacity-75">Delivery Partner</div>
              <div className="font-medium">India Post / Blue Dart</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#1e3a8a]" />
              Support & Helpline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium text-[#1e3a8a]">24/7 Helpline</div>
              <div className="text-lg font-bold">1800-103-4786</div>
              <div className="text-sm text-gray-600">Toll-free across India</div>
            </div>

            <div>
              <div className="font-medium text-[#1e3a8a]">Email Support</div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@ucfsin.gov.in</span>
              </div>
            </div>

            <div>
              <div className="font-medium text-[#1e3a8a]">Grievance Redressal</div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>grievance@ucfsin.gov.in</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600">
                You will receive SMS and email updates about your card delivery status.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-700">Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>• Keep your mobile number active for delivery updates</li>
              <li>• Physical card requires OTP verification on delivery</li>
              <li>• Digital card will be available after account setup</li>
              <li>• Report any delivery issues within 30 days</li>
              <li>• Card replacement fee: ₹50 (if lost/damaged)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
