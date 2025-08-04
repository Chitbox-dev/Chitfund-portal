"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Chit Fund Foreman",
    location: "Mumbai, Maharashtra",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    content:
      "The UCFSIN platform has revolutionized how I manage my chit fund schemes. The digital tools make everything transparent and efficient. My members love the real-time tracking features.",
    scheme: "Managing 15+ schemes",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Subscriber",
    location: "Delhi, NCR",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    content:
      "Getting my UCFSIN card was so easy! The KYC process was smooth, and now I can track all my investments in one place. The mobile app is fantastic for making payments.",
    scheme: "Active in 3 schemes",
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Suresh Patel",
    role: "Administrator",
    location: "Ahmedabad, Gujarat",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    content:
      "As an administrator, the compliance features are outstanding. The platform ensures we meet all regulatory requirements while providing excellent user experience.",
    scheme: "Overseeing 200+ schemes",
    verified: true,
  },
  {
    id: 4,
    name: "Meera Reddy",
    role: "Small Business Owner",
    location: "Hyderabad, Telangana",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    content:
      "The chit fund system helped me expand my business. The platform's transparency and security gave me confidence to invest more. Highly recommended!",
    scheme: "Invested ₹5L+ total",
    verified: true,
  },
  {
    id: 5,
    name: "Amit Singh",
    role: "IT Professional",
    location: "Bangalore, Karnataka",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    content:
      "The technology behind this platform is impressive. Real-time notifications, secure payments, and detailed analytics - everything a modern investor needs.",
    scheme: "Tech-savvy investor",
    verified: true,
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Join thousands of satisfied users who trust our platform for their chit fund management needs. Here's what
            they have to say about their experience.
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="text-center space-y-6">
                  {/* Quote Icon */}
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Quote className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-gray-100">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                      />
                      <AvatarFallback>
                        {testimonials[currentIndex].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                        {testimonials[currentIndex].verified && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{testimonials[currentIndex].role}</p>
                      <p className="text-gray-500 text-xs">{testimonials[currentIndex].location}</p>
                      <p className="text-blue-600 text-xs font-medium mt-1">{testimonials[currentIndex].scheme}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="sm" onClick={prevTestimonial}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={nextTestimonial}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-8 sm:mt-12">
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 justify-center">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => goToTestimonial(index)}
                  className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all ${
                    index === currentIndex
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="text-xs">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${
                          index === currentIndex ? "text-blue-900" : "text-gray-900"
                        }`}
                      >
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{testimonial.role}</div>
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
