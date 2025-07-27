"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, TrendingUp, Award, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#6366f1] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Government Verified Platform
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Secure Your Future with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-2">
                  Smart Chitfunds
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Join India's most trusted digital chitfund platform. Get your UCFSIN card, track investments, and grow
                your wealth with complete transparency and security.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-[#1e3a8a] hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg group"
                >
                  Get UCFSIN Card
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg bg-transparent"
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
              <div className="flex items-center gap-2 text-blue-100">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">50,000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">₹500Cr+ Managed</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">RBI Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-4 sm:space-y-6 mt-8 lg:mt-0">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold mb-2">UCFSIN Digital Identity</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Get your unique Universal Chitfund Subscriber ID with physical and digital cards for seamless
                      transactions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Real-time Tracking</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Monitor your investments, auction results, and returns with our advanced dashboard and mobile app.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Trusted Network</h3>
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
