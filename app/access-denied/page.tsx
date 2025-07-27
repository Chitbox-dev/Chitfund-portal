"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="h-8 w-8" />
              <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-8 text-center space-y-6">
            <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-10 w-10 text-red-600" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Unauthorized Access</h3>
              <p className="text-gray-600">
                You don't have permission to access this page. Please ensure you have the correct access level or
                contact an administrator.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-sm text-red-700">
                <strong>Possible reasons:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Your access request is still pending approval</li>
                  <li>You don't have the required user role for this page</li>
                  <li>Your session has expired</li>
                  <li>You need to complete the access request process</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/access-request">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Request Access</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
