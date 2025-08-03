"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

interface AccountSetupStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export default function AccountSetupStep({ formData, updateFormData, onNext }: AccountSetupStepProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)

  const handleCreateAccount = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }

    if (!acceptTerms) {
      alert("Please accept the terms and conditions")
      return
    }

    setIsCreating(true)

    // Simulate account creation
    setTimeout(() => {
      setAccountCreated(true)
      setIsCreating(false)

      // Auto redirect to user dashboard after success
      setTimeout(() => {
        router.push("/user/dashboard")
      }, 3000)
    }, 2000)
  }

  const isFormValid =
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.password.length >= 8 &&
    acceptTerms

  if (accountCreated) {
    return (
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Welcome to UCFSIN!</h2>
          <p className="text-gray-600 mb-4">Your account has been created successfully</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <div className="text-sm space-y-1">
              <div>
                <strong>Name:</strong> {formData.fullName}
              </div>
              <div>
                <strong>UCFSIN:</strong> {formData.ucfsinNumber}
              </div>
              <div>
                <strong>Email:</strong> {formData.email}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium text-[#1e3a8a]">Your UCFSIN journey begins now!</p>
          <p className="text-sm text-gray-500">Redirecting to your dashboard in 3 seconds...</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1e3a8a]"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* UCFSIN Summary */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white">
          <CardHeader>
            <CardTitle className="text-white">Your UCFSIN Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <div className="opacity-75">Full Name</div>
                <div className="font-medium">{formData.fullName}</div>
              </div>
              <div>
                <div className="opacity-75">UCFSIN Number</div>
                <div className="font-mono text-lg">{formData.ucfsinNumber}</div>
              </div>
              <div>
                <div className="opacity-75">Mobile Number</div>
                <div>+91 {formData.mobile}</div>
              </div>
              <div>
                <div className="opacity-75">Registration Status</div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Benefits */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-[#1e3a8a]">Your UCFSIN Account Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Access to all government-verified chit fund schemes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Real-time transaction tracking and notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Digital wallet for seamless payments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Comprehensive scheme performance analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>24/7 customer support and grievance redressal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Mobile app access for on-the-go management</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Security Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-600">
              <li>• Two-factor authentication (2FA)</li>
              <li>• End-to-end encryption for all transactions</li>
              <li>• Biometric login support</li>
              <li>• Real-time fraud detection</li>
              <li>• Secure document storage</li>
              <li>• Regular security audits</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Account Setup Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#1e3a8a]" />
              UCFSIN Account Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="Enter your email address"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData({ password: e.target.value })}
                  placeholder="Create a strong password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">Minimum 8 characters with letters and numbers</div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="text-xs text-red-500 mt-1">Passwords do not match</div>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                I accept the{" "}
                <a href="/terms" className="text-[#1e3a8a] hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#1e3a8a] hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            {isCreating ? (
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a8a] mx-auto"></div>
                <p className="text-gray-600">Creating your UCFSIN account...</p>
              </div>
            ) : (
              <Button
                onClick={handleCreateAccount}
                disabled={!isFormValid}
                className="w-full bg-[#1e3a8a] hover:bg-[#3b82f6]"
              >
                <Shield className="h-4 w-4 mr-2" />
                Create UCFSIN Account
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
