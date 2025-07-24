"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus, FileCheck, CreditCard, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Register & Get UCFSIN",
    description:
      "Complete your registration with KYC verification to receive your unique UCFSIN number and digital card.",
    features: ["Mobile verification", "KYC compliance", "Digital card issuance", "Account setup"],
    color: "from-blue-500 to-blue-600",
  },
  {
    step: "02",
    icon: FileCheck,
    title: "Browse & Join Schemes",
    description:
      "Explore verified chit fund schemes, compare returns, and join the ones that match your investment goals.",
    features: ["Scheme comparison", "Risk assessment", "Terms review", "Easy enrollment"],
    color: "from-green-500 to-green-600",
  },
  {
    step: "03",
    icon: CreditCard,
    title: "Make Payments",
    description:
      "Contribute to your chosen schemes with secure digital payments and track all transactions in real-time.",
    features: ["Multiple payment options", "Auto-debit facility", "Payment reminders", "Transaction history"],
    color: "from-purple-500 to-purple-600",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Track & Earn Returns",
    description: "Monitor your investments, participate in auctions, and receive returns as per your scheme terms.",
    features: ["Real-time tracking", "Auction participation", "Return calculation", "Performance analytics"],
    color: "from-orange-500 to-orange-600",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How UCFSIN Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get started with UCFSIN in four simple steps. From registration to earning returns, we've made the entire
            process seamless and transparent.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`bg-gradient-to-r ${step.color} text-white px-3 py-1 text-sm font-bold`}>
                      Step {step.step}
                    </Badge>
                    <div
                      className={`p-3 rounded-full bg-gradient-to-r ${step.color} text-white group-hover:scale-110 transition-transform`}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden xl:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="bg-white rounded-full p-2 shadow-lg border">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied members who trust UCFSIN for their chit fund investments. Start your journey
              today!
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                Start Registration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
