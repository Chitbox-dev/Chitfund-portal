"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const brands = [
  {
    name: "Government of India",
    logo: "/placeholder-logo.svg",
    description: "Ministry of Corporate Affairs",
  },
  {
    name: "Reserve Bank of India",
    logo: "/placeholder-logo.svg",
    description: "Central Banking Authority",
  },
  {
    name: "SEBI",
    logo: "/placeholder-logo.svg",
    description: "Securities and Exchange Board",
  },
  {
    name: "NABARD",
    logo: "/placeholder-logo.svg",
    description: "National Bank for Agriculture",
  },
  {
    name: "SIDBI",
    logo: "/placeholder-logo.svg",
    description: "Small Industries Development Bank",
  },
  {
    name: "MUDRA",
    logo: "/placeholder-logo.svg",
    description: "Micro Units Development",
  },
  {
    name: "Digital India",
    logo: "/placeholder-logo.svg",
    description: "Government Digital Initiative",
  },
  {
    name: "Make in India",
    logo: "/placeholder-logo.svg",
    description: "Manufacturing Initiative",
  },
]

export default function ClientBrandsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Government Bodies
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Our platform is recognized and supported by leading financial institutions and government organizations
            across India.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-4 gap-8">
          {brands.slice(0, 8).map((brand, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={40}
                    height={40}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{brand.name}</h3>
                  <p className="text-xs text-gray-500">{brand.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {brands.map((brand, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src={brand.logo || "/placeholder.svg"}
                          alt={brand.name}
                          width={40}
                          height={40}
                          className="opacity-70"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{brand.name}</h3>
                        <p className="text-xs text-gray-500">{brand.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {brands.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Regulatory Compliant</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Government Support</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Security Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">ISO</div>
              <div className="text-sm text-gray-600">Certified Platform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
