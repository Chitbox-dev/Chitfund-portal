import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  FileCheck,
  Smartphone,
  CreditCard,
  MapPin,
  ArrowRight,
  Lock,
  Users,
  AlertTriangle,
  Database,
  Banknote,
  BadgeIcon as IdCard,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/landing/navbar"
import Footer from "@/components/landing/footer"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header Section */}
      <section className="pt-24 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-slate-100 text-slate-700 mb-4">Government Initiative</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">How the Chit Fund Portal Works</h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              The Chit Fund Portal is a <strong>government-regulated digital platform</strong> that standardizes and
              governs all chit fund activities in India.
            </p>
          </div>
        </div>
      </section>

      {/* Core Purpose Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">🎯 Core Purpose</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-slate-200">
              <CardContent className="p-6 text-center">
                <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Centralized Control</h3>
                <p className="text-slate-600 text-sm">All chit fund activities must go through this portal</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6 text-center">
                <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <IdCard className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">UCFIN Requirement</h3>
                <p className="text-slate-600 text-sm">
                  Every participant needs a Unique Chit Fund Subscriber Identification Number
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6 text-center">
                <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Regulatory Compliance</h3>
                <p className="text-slate-600 text-sm">Ensures all operations follow RBI and government guidelines</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6 text-center">
                <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Fraud Prevention</h3>
                <p className="text-slate-600 text-sm">
                  Digital verification prevents fake identities and illegal operations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Flow Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">🔄 System Flow</h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Individual Registration</h3>
              <p className="text-slate-600 text-sm">Get UCFIN through government verification</p>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-400 hidden lg:block" />

            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Identity Verification</h3>
              <p className="text-slate-600 text-sm">Aadhaar + DigiLocker authentication</p>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-400 hidden lg:block" />

            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Banknote className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Payment Processing</h3>
              <p className="text-slate-600 text-sm">Government fee collection</p>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-400 hidden lg:block" />

            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Card Issuance</h3>
              <p className="text-slate-600 text-sm">Physical/digital cards for transactions</p>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-400 hidden lg:block" />

            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Dashboard Access</h3>
              <p className="text-slate-600 text-sm">Role-based portals for different users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">📋 Simple Registration Process</h2>
            <p className="text-xl text-slate-600">
              The registration follows a <strong>4-step government-verified process</strong>
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-slate-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-xl font-bold text-slate-900">Step 1: Aadhaar Verification via DigiLocker</h3>
                      <Badge className="bg-slate-100 text-slate-700">🔐</Badge>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">What happens:</h4>
                      <ul className="space-y-2 text-slate-600">
                        <li>• Enter your 12-digit Aadhaar number</li>
                        <li>• System connects to DigiLocker (government's digital document wallet)</li>
                        <li>• DigiLocker verifies your identity using government databases</li>
                        <li>• Your personal details are automatically fetched securely</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Why DigiLocker:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Government Approved:</strong> Official digital identity verification
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Secure:</strong> No manual document uploads needed
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Authentic:</strong> Direct connection to UIDAI (Aadhaar) database
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Instant:</strong> Real-time verification
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-slate-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-xl font-bold text-slate-900">Step 2: OTP Verification</h3>
                      <Badge className="bg-slate-100 text-slate-700">📱</Badge>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">What happens:</h4>
                      <ul className="space-y-2 text-slate-600">
                        <li>• OTP sent to your Aadhaar-registered mobile number</li>
                        <li>• Enter the 6-digit code to confirm your identity</li>
                        <li>• System validates you are the actual Aadhaar holder</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Security Purpose:</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">Prevents identity theft</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">Ensures only the actual person can register</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">Two-factor authentication</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-slate-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-xl font-bold text-slate-900">Step 3: Payment Processing</h3>
                      <Badge className="bg-slate-100 text-slate-700">💳</Badge>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">What happens:</h4>
                      <ul className="space-y-2 text-slate-600">
                        <li>• Pay ₹299 registration fee (including GST)</li>
                        <li>• Choose payment method: UPI, Net Banking, or Cards</li>
                        <li>• Government treasury receives the payment</li>
                        <li>• Payment receipt generated for records</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Why Payment Required:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Administrative Costs:</strong> Processing and verification expenses
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Card Production:</strong> Physical card manufacturing and delivery
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>System Maintenance:</strong> Platform operational costs
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Deterrent:</strong> Prevents fake/spam registrations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-slate-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-xl font-bold text-slate-900">Step 4: Address Verification & Card Issuance</h3>
                      <Badge className="bg-slate-100 text-slate-700">📍</Badge>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">What happens:</h4>
                      <ul className="space-y-2 text-slate-600">
                        <li>• Confirm your current address for card delivery</li>
                        <li>• Address cross-verified with Aadhaar records</li>
                        <li>• Physical UCFIN card production initiated</li>
                        <li>• Digital card immediately available</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Card Features:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Physical Card:</strong> Delivered to your address in 7-10 days
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Digital Card:</strong> Instant access through mobile app
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>QR Code:</strong> For quick verification at chit fund offices
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Security Features:</strong> Hologram, unique number, photo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">🎯 What You Get After Registration</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Your UCFIN */}
            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <IdCard className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Your UCFIN</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>
                    <strong>Unique Number:</strong> Like UCFIN12345678901
                  </li>
                  <li>
                    <strong>Lifetime Validity:</strong> One-time registration for all chit funds
                  </li>
                  <li>
                    <strong>Universal Recognition:</strong> Accepted by all registered chit fund operators
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Dashboard Access */}
            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Dashboard Access</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>
                    <strong>Transaction History:</strong> Track all chit fund participations
                  </li>
                  <li>
                    <strong>Scheme Management:</strong> View active and completed schemes
                  </li>
                  <li>
                    <strong>Payment Tracking:</strong> Monitor contributions and receipts
                  </li>
                  <li>
                    <strong>Document Storage:</strong> Digital copies of all agreements
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Legal Protection */}
            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Legal Protection</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>
                    <strong>Government Backing:</strong> Your participation is officially recorded
                  </li>
                  <li>
                    <strong>Dispute Resolution:</strong> Access to government grievance mechanisms
                  </li>
                  <li>
                    <strong>Fraud Protection:</strong> Verified operators only
                  </li>
                  <li>
                    <strong>Regulatory Compliance:</strong> All transactions follow legal frameworks
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Your UCFIN?</h2>
          <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
            Join thousands of verified users and start your secure chit fund journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-slate-700 hover:bg-slate-50 px-8 py-4">
                Start Registration <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                Login to Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
