"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus, FileCheck, CreditCard, BarChart3, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Register & Get UCFSIN",
    description:
      "Complete your registration with KYC verification to receive your Unique Chit Fund Subscriber Identification Number.",
    details: [
      "Fill basic personal details",
      "Upload required documents",
      "Complete KYC verification",
      "Receive UCFSIN instantly",
    ],
    color: "bg-blue-500",
  },
  {
    step: "02",
    icon: FileCheck,
    title: "Choose Your Role",
    description:
      "Select whether you want to be a subscriber, foreman, or request administrative access based on your needs.",
    details: [
      "Subscriber: Join existing schemes",
      "Foreman: Create and manage schemes",
      "Admin: Oversee platform operations",
      "Role-based dashboard access",
    ],
    color: "bg-green-500",
  },
  {
    step: "03",
    icon: CreditCard,
    title: "Start Managing",
    description:
      "Access your personalized dashboard to manage schemes, track investments, and handle all chit fund operations.",
    details: ["View active schemes", "Make payments securely", "Track investment progress", "Generate reports"],
    color: "bg-purple-500",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Monitor & Grow",
    description:
      "Use our analytics tools to monitor performance, generate reports, and make informed decisions about your investments.",
    details: ["Real-time analytics", "Monthly performance reports", "Investment insights", "Compliance tracking"],
    color: "bg-orange-500",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get Started in 4 Simple Steps</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes it easy to join the digital chit fund ecosystem and start managing your
            investments efficiently.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-24 bg-gray-200 hidden lg:block" />
              )}

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""} space-y-6`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-sm font-mono">
                      Step {step.step}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Details List */}
                  <div className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Card */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white">
                    <CardContent className="p-8">
                      <div className="text-center space-y-6">
                        <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto`}>
                          <step.icon className="h-10 w-10 text-white" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-gray-900">Step {step.step}</div>
                          <div className="text-lg font-semibold text-gray-700">{step.title}</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${step.color} h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join our platform today and experience the future of chit fund management.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
