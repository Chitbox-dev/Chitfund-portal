"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, IndianRupee, TrendingUp, Shield } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Active Members",
    value: 50000,
    suffix: "+",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: IndianRupee,
    label: "Funds Managed",
    value: 500,
    suffix: "Cr+",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: 99.8,
    suffix: "%",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Shield,
    label: "Verified Operators",
    value: 1200,
    suffix: "+",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return count
}

export default function StatsCounter() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands Across India
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Our platform has facilitated secure and transparent chit fund operations, helping members achieve their
            financial goals with confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const count = useCountUp(stat.value)

  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
      <CardContent className="p-4 sm:p-6 text-center h-full flex flex-col justify-center">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${stat.bgColor} rounded-full mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform`}
        >
          <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {stat.label === "Success Rate" ? count.toFixed(1) : count.toLocaleString()}
            <span className={stat.color}>{stat.suffix}</span>
          </div>
          <div className="text-xs sm:text-sm md:text-base font-medium text-gray-600">{stat.label}</div>
        </div>
      </CardContent>
    </Card>
  )
}
