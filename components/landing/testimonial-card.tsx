"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  location: string
  rating: number
  text: string
  avatar: string
}

export default function TestimonialCard({ name, role, location, rating, text, avatar }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white h-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Quote className="h-8 w-8 text-blue-200" />
            <div className="flex">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          <blockquote className="text-gray-700 leading-relaxed italic">"{text}"</blockquote>

          <div className="flex items-center space-x-3 pt-4 border-t">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">{avatar}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900">{name}</div>
              <div className="text-sm text-gray-600">{role}</div>
              <Badge variant="outline" className="text-xs mt-1">
                {location}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
