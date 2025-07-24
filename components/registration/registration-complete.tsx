"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, CreditCard, User, QrCode, MapPin, Truck } from "lucide-react"

export default function RegistrationComplete({ formData }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800">Registration Complete!</h3>
        <p className="text-gray-600 max-w-md">
          Congratulations! Your UCFIN registration is complete. You can now access all the features of the Chit Fund
          Portal.
        </p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-800">Your Account Details</h4>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-blue-100">
              <p className="text-xs text-gray-500">UCFIN (Unique Chit Fund Identification Number)</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg">{formData.ucfin || "UC0123456789"}</p>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <QrCode className="h-4 w-4" />
                  <span className="text-xs">QR</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md border border-blue-100">
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-medium">{formData.name}</p>
              </div>

              <div className="bg-white p-4 rounded-md border border-blue-100">
                <p className="text-xs text-gray-500">Mobile Number</p>
                <p className="font-medium">{formData.mobile}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-green-600" />
            <h4 className="font-medium text-green-800">UCFIN Card Status</h4>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Physical UCFIN Card</p>
                  <p className="text-sm text-gray-600">Estimated delivery: 7-10 business days</p>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Truck className="h-4 w-4" />
                  <span className="text-xs">Track</span>
                </Button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-green-100">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Delivery Address</p>
                  <p className="text-sm text-gray-600">
                    {formData.cardDetails?.deliveryAddress === "permanent"
                      ? `${formData.permanentAddress?.line1}, ${formData.permanentAddress?.city}, ${formData.permanentAddress?.state} - ${formData.permanentAddress?.pincode}`
                      : `${formData.residentialAddress?.line1}, ${formData.residentialAddress?.city}, ${formData.residentialAddress?.state} - ${formData.residentialAddress?.pincode}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-4">
        <Link href="/dashboard">
          <Button className="w-full bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white">Go to Dashboard</Button>
        </Link>

        <Link href="/">
          <Button variant="outline" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
