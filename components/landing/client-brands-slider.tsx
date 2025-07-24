"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Default brands for fallback
const defaultBrands = [
  { name: "Karnataka State Chit Fund", location: "Bangalore", members: "15K+", logo: null },
  { name: "Mysore Chit Fund Ltd", location: "Mysore", members: "8K+", logo: null },
  { name: "Hubli Chit Fund Corp", location: "Hubli", members: "12K+", logo: null },
  { name: "Mangalore Chit Fund", location: "Mangalore", members: "6K+", logo: null },
  { name: "Belgaum Chit Fund", location: "Belgaum", members: "9K+", logo: null },
  { name: "Gulbarga Chit Fund", location: "Gulbarga", members: "7K+", logo: null },
  { name: "Shimoga Chit Fund", location: "Shimoga", members: "5K+", logo: null },
  { name: "Davangere Chit Fund", location: "Davangere", members: "4K+", logo: null },
]

export default function ClientBrandsSlider() {
  const [brands, setBrands] = useState(defaultBrands)

  useEffect(() => {
    // Load foremen data from localStorage and convert to brands format
    if (typeof window !== "undefined") {
      const storedForemen = localStorage.getItem("foremenList")
      if (storedForemen) {
        try {
          const foremenList = JSON.parse(storedForemen)

          // Convert foremen data to brands format
          const dynamicBrands = foremenList
            .filter((foreman) => foreman.status === "active") // Only show active foremen
            .map((foreman) => ({
              name: foreman.companyName || foreman.name + " Chit Fund",
              location: foreman.city || "Karnataka",
              members: foreman.totalMembers || `${foreman.totalSubscribers || 0}+`,
              logo: foreman.companyLogo || null,
            }))

          // Combine dynamic brands with default ones, prioritizing dynamic
          const combinedBrands = [...dynamicBrands, ...defaultBrands]

          // Remove duplicates and take first 8
          const uniqueBrands = combinedBrands
            .filter((brand, index, self) => index === self.findIndex((b) => b.name === brand.name))
            .slice(0, 8)

          setBrands(uniqueBrands)
        } catch (error) {
          console.error("Error parsing foremen data:", error)
          setBrands(defaultBrands)
        }
      }
    }
  }, [])

  const generateInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
            Client Partners Across Karnataka
          </h2>
          <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto px-4">
            Join thousands of members across Karnataka's most trusted chit fund operators
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="flex animate-scroll space-x-4 md:space-x-6">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <Card
                key={`first-${index}`}
                className="flex-shrink-0 w-64 md:w-80 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                      {brand.logo ? (
                        <img
                          src={brand.logo || "/placeholder.svg"}
                          alt={`${brand.name} logo`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-lg md:text-xl font-bold text-white">{generateInitials(brand.name)}</span>
                      )}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-2 leading-tight">{brand.name}</h3>
                    <p className="text-xs md:text-sm text-blue-200 mb-2">{brand.location}</p>
                    <div className="inline-flex items-center px-2 md:px-3 py-1 bg-white/20 rounded-full">
                      <span className="text-xs md:text-sm text-white font-medium">{brand.members} Members</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <Card
                key={`second-${index}`}
                className="flex-shrink-0 w-64 md:w-80 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                      {brand.logo ? (
                        <img
                          src={brand.logo || "/placeholder.svg"}
                          alt={`${brand.name} logo`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-lg md:text-xl font-bold text-white">{generateInitials(brand.name)}</span>
                      )}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-2 leading-tight">{brand.name}</h3>
                    <p className="text-xs md:text-sm text-blue-200 mb-2">{brand.location}</p>
                    <div className="inline-flex items-center px-2 md:px-3 py-1 bg-white/20 rounded-full">
                      <span className="text-xs md:text-sm text-white font-medium">{brand.members} Members</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
