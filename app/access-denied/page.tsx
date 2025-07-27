"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, ArrowLeft, FileText } from "lucide-react"

export default function AccessDeniedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8" />
              <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
            </div>
            <div className="text-red-100">You don't have permission to access this resource</div>
          </CardHeader>

          <CardContent className="p-8 text-center">
            <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Access Restricted</h3>

            <div className="text-gray-600 mb-6 space-y-2">
              <p>This page requires special permissions that your current access level doesn't include.</p>
              <p>Please contact the administrator or request appropriate access.</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-left">
                  <div className="font-medium text-yellow-800">Need Access?</div>
                  <div className="text-sm text-yellow-700 mt-1">
                    If you believe you should have access to this resource, please submit a new access request with the
                    appropriate user type and complete the PSO knowledge assessment.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={() => router.push("/access-request")} className="bg-blue-600 hover:bg-blue-700">
                Request Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
