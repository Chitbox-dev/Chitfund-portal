"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, BarChart3, Users, CreditCard, FileText, TrendingUp, Shield } from "lucide-react"
import Image from "next/image"

const dashboardScreens = [
  {
    id: 1,
    title: "Admin Dashboard",
    description: "Comprehensive overview of all chit fund operations with real-time analytics and management tools.",
    image: "/placeholder.svg?height=400&width=600&text=Admin+Dashboard",
    features: ["User Management", "Scheme Oversight", "Compliance Monitoring", "Financial Reports"],
    color: "from-blue-500 to-blue-600",
    icon: BarChart3,
  },
  {
    id: 2,
    title: "Foreman Portal",
    description: "Dedicated interface for foremen to create, manage, and monitor their chit fund schemes.",
    image: "/placeholder.svg?height=400&width=600&text=Foreman+Portal",
    features: ["Scheme Creation", "Member Management", "Auction Handling", "Monthly Reports"],
    color: "from-green-500 to-green-600",
    icon: Users,
  },
  {
    id: 3,
    title: "User Dashboard",
    description: "Personal dashboard for subscribers to track investments, payments, and scheme progress.",
    image: "/placeholder.svg?height=400&width=600&text=User+Dashboard",
    features: ["Investment Tracking", "Payment History", "UCFSIN Card", "Notifications"],
    color: "from-purple-500 to-purple-600",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Registration Flow",
    description: "Streamlined UCFSIN registration process with KYC verification and digital card issuance.",
    image: "/placeholder.svg?height=400&width=600&text=Registration+Flow",
    features: ["KYC Verification", "Document Upload", "UCFSIN Generation", "Card Issuance"],
    color: "from-orange-500 to-orange-600",
    icon: FileText,
  },
  {
    id: 5,
    title: "Analytics & Reports",
    description: "Advanced analytics and reporting tools for comprehensive business intelligence.",
    image: "/placeholder.svg?height=400&width=600&text=Analytics+Reports",
    features: ["Performance Metrics", "Financial Analytics", "Compliance Reports", "Data Visualization"],
    color: "from-indigo-500 to-indigo-600",
    icon: TrendingUp,
  },
]

export default function DashboardSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardScreens.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dashboardScreens.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dashboardScreens.length) % dashboardScreens.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentScreen = dashboardScreens[currentSlide]

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Dashboards for Every Role
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Experience our intuitive interfaces designed specifically for administrators, foremen, and subscribers. Each
            dashboard is tailored to provide the tools and insights you need.
          </p>
        </div>

        <div className="relative">
          {/* Main Slider */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${currentScreen.color} text-white`}>
                  <currentScreen.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="text-sm">
                  Dashboard {currentSlide + 1} of {dashboardScreens.length}
                </Badge>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{currentScreen.title}</h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{currentScreen.description}</p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-3">
                {currentScreen.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4 pt-4">
                <Button variant="outline" size="sm" onClick={prevSlide}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  {dashboardScreens.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? "bg-blue-600 w-6" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={nextSlide}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={currentScreen.image || "/placeholder.svg"}
                      alt={currentScreen.title}
                      fill
                      className="object-cover transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="text-sm font-medium text-gray-900">{currentScreen.title}</div>
                        <div className="text-xs text-gray-600 mt-1">Live Dashboard Preview</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-8 sm:mt-12">
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4">
              {dashboardScreens.map((screen, index) => (
                <button
                  key={screen.id}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 p-3 sm:p-4 rounded-lg border-2 transition-all ${
                    index === currentSlide
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`p-2 rounded-md ${
                        index === currentSlide ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <screen.icon className="h-4 w-4" />
                    </div>
                    <div className="text-left min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${
                          index === currentSlide ? "text-blue-900" : "text-gray-900"
                        }`}
                      >
                        {screen.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-32 sm:max-w-none">{screen.features[0]}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
