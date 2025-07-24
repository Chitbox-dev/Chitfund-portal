"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, TrendingUp, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#6366f1] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Government Verified Platform
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Secure Your Future with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Smart Chitfunds
                </span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                Join India's most trusted digital chitfund platform. Get your UCFSIN card, track investments, and grow
                your wealth with complete transparency and security.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-semibold px-8 py-3 text-lg group"
                >
                  Get UCFSIN Card
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 text-lg bg-transparent"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-blue-100">
                <Users className="w-5 h-5" />
                <span className="text-sm">50,000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">₹500Cr+ Managed</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Award className="w-5 h-5" />
                <span className="text-sm">RBI Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">UCFSIN Digital Identity</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Get your unique Universal Chitfund Subscriber ID with physical and digital cards for seamless
                      transactions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Monitor your investments, auction results, and returns with our advanced dashboard and mobile app.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Trusted Network</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Join verified chitfund groups with KYC-verified members and government-registered operators.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
