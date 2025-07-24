"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, IndianRupee, Calendar, Bell, ChevronLeft, ChevronRight } from "lucide-react"

const dashboards = [
  {
    title: "Admin Dashboard",
    description: "Comprehensive oversight of all chit fund operations",
    features: ["Real-time Analytics", "Member Management", "Scheme Monitoring", "Financial Reports"],
    stats: [
      { label: "Active Schemes", value: "1,247", icon: BarChart3 },
      { label: "Total Members", value: "45,892", icon: Users },
      { label: "Monthly Revenue", value: "₹2.4Cr", icon: IndianRupee },
      { label: "Success Rate", value: "99.2%", icon: TrendingUp },
    ],
    color: "from-blue-600 to-purple-600",
  },
  {
    title: "Foreman Dashboard",
    description: "Manage your chit fund schemes efficiently",
    features: ["Scheme Management", "Member Tracking", "Payment Processing", "Performance Analytics"],
    stats: [
      { label: "My Schemes", value: "24", icon: Calendar },
      { label: "Active Members", value: "1,156", icon: Users },
      { label: "This Month", value: "₹18.5L", icon: IndianRupee },
      { label: "Completion Rate", value: "96.8%", icon: TrendingUp },
    ],
    color: "from-green-600 to-teal-600",
  },
  {
    title: "Member Dashboard",
    description: "Track your investments and participate in schemes",
    features: ["Portfolio Overview", "Payment History", "Scheme Participation", "Notifications"],
    stats: [
      { label: "Active Schemes", value: "8", icon: Calendar },
      { label: "Total Investment", value: "₹2.4L", icon: IndianRupee },
      { label: "Returns Earned", value: "₹45K", icon: TrendingUp },
      { label: "Notifications", value: "12", icon: Bell },
    ],
    color: "from-orange-600 to-red-600",
  },
]

export default function DashboardSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboards.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dashboards.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dashboards.length) % dashboards.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Dashboards for Every User</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience tailored interfaces designed for administrators, foremen, and members with real-time insights and
            seamless management tools.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {dashboards.map((dashboard, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="border-none shadow-2xl">
                    <div className={`h-2 bg-gradient-to-r ${dashboard.color}`}></div>
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Content */}
                        <div className="space-y-6">
                          <div>
                            <Badge className={`bg-gradient-to-r ${dashboard.color} text-white mb-4`}>
                              {dashboard.title}
                            </Badge>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{dashboard.description}</h3>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {dashboard.stats.map((stat, statIndex) => (
                              <div key={statIndex} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <stat.icon className="h-4 w-4 text-gray-600" />
                                  <span className="text-sm text-gray-600">{stat.label}</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">Key Features:</h4>
                            <ul className="space-y-1">
                              {dashboard.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="bg-gray-100 rounded-xl p-6 min-h-[400px] flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div
                              className={`w-16 h-16 bg-gradient-to-r ${dashboard.color} rounded-full flex items-center justify-center mx-auto`}
                            >
                              <BarChart3 className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Interactive Dashboard</h4>
                              <p className="text-sm text-gray-600">Real-time data visualization and management tools</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {dashboards.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
