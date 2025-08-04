"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Building, Shield } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Active Users",
    value: 12500,
    suffix: "+",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Building,
    label: "Schemes Managed",
    value: 850,
    suffix: "+",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: TrendingUp,
    label: "Total Value Managed",
    value: 250,
    suffix: "Cr+",
    prefix: "₹",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Shield,
    label: "Security Uptime",
    value: 99.9,
    suffix: "%",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

function CounterAnimation({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white hover:bg-white/20">
            Platform Statistics
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted by Thousands Across India</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our platform has been helping individuals and organizations manage their chit fund operations efficiently
            and securely.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>

                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-white">
                    <CounterAnimation target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-blue-100">Customer Support</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-blue-100">Regulatory Compliant</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">5★</div>
            <div className="text-blue-100">Average User Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
