"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Users, Trash2, Download } from "lucide-react"

// Sample data for generating realistic subscribers
const SAMPLE_NAMES = [
  "Rajesh Kumar",
  "Priya Sharma",
  "Amit Patel",
  "Sunita Singh",
  "Vikram Gupta",
  "Meera Reddy",
  "Arjun Nair",
  "Kavya Iyer",
  "Rohit Joshi",
  "Anita Desai",
  "Suresh Rao",
  "Deepika Menon",
  "Kiran Shah",
  "Pooja Agarwal",
  "Manoj Verma",
  "Sneha Kulkarni",
  "Ravi Chopra",
  "Nisha Bansal",
  "Ajay Malhotra",
  "Rekha Sinha",
]

const SAMPLE_ADDRESSES = [
  "123 MG Road, Bangalore",
  "456 Park Street, Kolkata",
  "789 Marine Drive, Mumbai",
  "321 CP, New Delhi",
  "654 Anna Salai, Chennai",
  "987 Banjara Hills, Hyderabad",
  "147 Residency Road, Bangalore",
  "258 Salt Lake, Kolkata",
  "369 Andheri West, Mumbai",
  "741 Karol Bagh, New Delhi",
  "852 T Nagar, Chennai",
  "963 Jubilee Hills, Hyderabad",
]

interface Subscriber {
  id: string
  name: string
  email: string
  phone: string
  ticketNumber: number
  status: "active" | "pending" | "inactive"
}

interface SubscriberGeneratorProps {
  schemeId: string
  maxSubscribers: number
  onSubscribersChange: (subscribers: Subscriber[]) => void
}

export function SubscriberGenerator({ schemeId, maxSubscribers, onSubscribersChange }: SubscriberGeneratorProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [newSubscriber, setNewSubscriber] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const generateTicketNumbers = () => {
    const availableNumbers = Array.from({ length: maxSubscribers }, (_, i) => i + 1)
    const usedNumbers = subscribers.map((s) => s.ticketNumber)
    return availableNumbers.filter((num) => !usedNumbers.includes(num))
  }

  const addSubscriber = () => {
    if (!newSubscriber.name || !newSubscriber.email || !newSubscriber.phone) {
      alert("Please fill all fields")
      return
    }

    const availableTickets = generateTicketNumbers()
    if (availableTickets.length === 0) {
      alert("Maximum subscribers reached")
      return
    }

    const subscriber: Subscriber = {
      id: `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      ...newSubscriber,
      ticketNumber: availableTickets[0],
      status: "pending",
    }

    const updatedSubscribers = [...subscribers, subscriber]
    setSubscribers(updatedSubscribers)
    onSubscribersChange(updatedSubscribers)

    setNewSubscriber({ name: "", email: "", phone: "" })
  }

  const removeSubscriber = (id: string) => {
    const updatedSubscribers = subscribers.filter((s) => s.id !== id)
    setSubscribers(updatedSubscribers)
    onSubscribersChange(updatedSubscribers)
  }

  const generateRandomSubscribers = () => {
    const names = [
      "Rajesh Kumar",
      "Priya Sharma",
      "Amit Patel",
      "Sunita Devi",
      "Vikash Singh",
      "Meera Gupta",
      "Ravi Verma",
      "Kavita Jain",
      "Suresh Yadav",
      "Anita Mishra",
    ]

    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
    const availableTickets = generateTicketNumbers()
    const remainingSlots = Math.min(availableTickets.length, maxSubscribers - subscribers.length)

    const newSubscribers: Subscriber[] = []

    for (let i = 0; i < remainingSlots; i++) {
      const name = names[Math.floor(Math.random() * names.length)]
      const email = `${name.toLowerCase().replace(" ", ".")}@${domains[Math.floor(Math.random() * domains.length)]}`
      const phone = `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`

      newSubscribers.push({
        id: `SUB-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 6)}`,
        name,
        email,
        phone,
        ticketNumber: availableTickets[i],
        status: "pending",
      })
    }

    const updatedSubscribers = [...subscribers, ...newSubscribers]
    setSubscribers(updatedSubscribers)
    onSubscribersChange(updatedSubscribers)
  }

  const exportSubscribers = () => {
    const csvContent = [
      "Name,Email,Phone,Ticket Number,Status",
      ...subscribers.map((s) => `${s.name},${s.email},${s.phone},${s.ticketNumber},${s.status}`),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${schemeId}-subscribers.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Subscriber Management</h2>
          <p className="text-gray-600">Add and manage subscribers for this scheme</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {subscribers.length} / {maxSubscribers} Subscribers
          </Badge>
        </div>
      </div>

      {/* Add Subscriber Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Subscriber
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newSubscriber.name}
                onChange={(e) => setNewSubscriber((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={newSubscriber.email}
                onChange={(e) => setNewSubscriber((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={newSubscriber.phone}
                onChange={(e) => setNewSubscriber((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={addSubscriber} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Subscriber
            </Button>
            <Button variant="outline" onClick={generateRandomSubscribers} className="gap-2 bg-transparent">
              <Users className="h-4 w-4" />
              Generate Sample Data
            </Button>
            <Button
              variant="outline"
              onClick={exportSubscribers}
              className="gap-2 bg-transparent"
              disabled={subscribers.length === 0}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscribers List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Current Subscribers
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No subscribers added yet</p>
              <p className="text-sm text-gray-500">Add subscribers to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {subscribers.map((subscriber, index) => (
                <div key={subscriber.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full font-semibold">
                      {subscriber.ticketNumber}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{subscriber.name}</h4>
                      <p className="text-sm text-gray-600">{subscriber.email}</p>
                      <p className="text-sm text-gray-600">{subscriber.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={subscriber.status === "active" ? "default" : "secondary"}
                      className={
                        subscriber.status === "active"
                          ? "bg-green-100 text-green-800"
                          : subscriber.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {subscriber.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSubscriber(subscriber.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
