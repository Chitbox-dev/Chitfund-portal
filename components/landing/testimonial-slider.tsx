"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Small Business Owner",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "UCFSIN has transformed how I manage my chit fund investments. The transparency and real-time tracking give me complete confidence in my financial decisions.",
    avatar: "RK",
  },
  {
    name: "Priya Sharma",
    role: "Government Employee",
    location: "Delhi, NCR",
    rating: 5,
    text: "The KYC verification process was seamless, and I love how I can track all my schemes in one place. The mobile app is incredibly user-friendly.",
    avatar: "PS",
  },
  {
    name: "Suresh Patel",
    role: "Chit Fund Foreman",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "As a foreman, UCFSIN has made managing multiple schemes effortless. The analytics and member management tools are exactly what I needed.",
    avatar: "SP",
  },
  {
    name: "Lakshmi Nair",
    role: "Homemaker",
    location: "Kochi, Kerala",
    rating: 5,
    text: "I was hesitant about chit funds initially, but UCFSIN's government verification and transparent processes gave me the confidence to invest.",
    avatar: "LN",
  },
  {
    name: "Amit Singh",
    role: "IT Professional",
    location: "Bangalore, Karnataka",
    rating: 5,
    text: "The digital-first approach and real-time notifications keep me updated about all my investments. Highly recommend UCFSIN to everyone.",
    avatar: "AS",
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Members Say</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Hear from thousands of satisfied members who have transformed their financial journey with UCFSIN.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="pointer-events-auto bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg -ml-6"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="pointer-events-auto bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg -mr-6"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <Card className="border-none shadow-xl bg-white">
                    <CardContent className="p-6 sm:p-8">
                      <div className="text-center space-y-4 sm:space-y-6">
                        <Quote className="h-8 w-8 sm:h-12 sm:w-12 text-blue-200 mx-auto" />

                        <div className="space-y-4">
                          <div className="flex justify-center">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>

                          <blockquote className="text-base sm:text-lg text-gray-700 leading-relaxed italic">
                            "{testimonial.text}"
                          </blockquote>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-sm sm:text-base">
                              {testimonial.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-center sm:text-left">
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                            <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {testimonial.location}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex sm:hidden justify-center mt-6 space-x-4">
            <Button variant="outline" size="sm" onClick={goToPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
