"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Smartphone, BarChart3, Users, CreditCard, FileCheck, Bell, Lock, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Government Verified",
    description: "All chit fund operators are verified and regulated by government authorities",
    badge: "Secure",
    color: "text-blue-600",
  },
  {
    icon: Smartphone,
    title: "Mobile First Design",
    description: "Access your chit fund portfolio anytime, anywhere with our mobile-optimized platform",
    badge: "Convenient",
    color: "text-green-600",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track your investments with comprehensive analytics and performance insights",
    badge: "Insights",
    color: "text-purple-600",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join thousands of verified members in transparent and trustworthy chit fund schemes",
    badge: "Trusted",
    color: "text-orange-600",
  },
  {
    icon: CreditCard,
    title: "Digital Payments",
    description: "Seamless payment processing with multiple payment options and instant confirmations",
    badge: "Fast",
    color: "text-indigo-600",
  },
  {
    icon: FileCheck,
    title: "KYC Compliance",
    description: "Complete KYC verification ensures security and compliance with regulatory standards",
    badge: "Compliant",
    color: "text-red-600",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay updated with timely notifications about payments, auctions, and important updates",
    badge: "Alerts",
    color: "text-yellow-600",
  },
  {
    icon: Lock,
    title: "Bank-level Security",
    description: "Advanced encryption and security measures protect your financial information",
    badge: "Protected",
    color: "text-teal-600",
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    description: "Monitor your returns and track the performance of all your chit fund investments",
    badge: "Growth",
    color: "text-pink-600",
  },
]

export default function FeatureCard() {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose UCFSIN?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the future of chit fund management with our comprehensive platform designed for transparency,
            security, and ease of use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-none bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
