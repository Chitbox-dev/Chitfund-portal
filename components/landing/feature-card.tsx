"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, FileText, Users, BarChart3, Shield, Smartphone, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: CreditCard,
    title: "UCFSIN Registration",
    description: "Get your Unique Chit Fund Subscriber Identification Number with our streamlined digital process.",
    benefits: ["Digital KYC", "Instant Verification", "Secure Storage"],
    color: "bg-blue-500",
    href: "/register",
  },
  {
    icon: FileText,
    title: "Scheme Management",
    description: "Create, manage, and monitor chit fund schemes with comprehensive administrative tools.",
    benefits: ["Easy Setup", "Real-time Tracking", "Automated Reports"],
    color: "bg-green-500",
    href: "/foreman/create-scheme",
  },
  {
    icon: Users,
    title: "Member Portal",
    description: "Dedicated dashboard for subscribers to track their investments and scheme progress.",
    benefits: ["Portfolio View", "Payment History", "Notifications"],
    color: "bg-purple-500",
    href: "/user/dashboard",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Comprehensive reporting tools for administrators and foremen to track performance.",
    benefits: ["Monthly Reports", "Performance Metrics", "Compliance Tracking"],
    color: "bg-orange-500",
    href: "/reports/monthly",
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description: "Built-in compliance with Chit Funds Act 1982 and state-specific regulations.",
    benefits: ["Legal Framework", "Audit Trail", "Document Management"],
    color: "bg-red-500",
    href: "/legal/acts-and-rules",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access your chit fund operations from anywhere with our responsive design.",
    benefits: ["Cross-platform", "Offline Support", "Push Notifications"],
    color: "bg-indigo-500",
    href: "/how-it-works",
  },
]

export default function FeatureCard() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Platform Features
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Chit Fund Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and features needed to manage chit funds efficiently and
            compliantly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div
                  className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                {/* Benefits List */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant="ghost"
                  className="w-full justify-between group-hover:bg-gray-100 transition-colors"
                  asChild
                >
                  <Link href={feature.href}>
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust our platform for their chit fund management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">
                  Start Registration <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/access-request">Request Access</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
