"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  Download,
  Upload,
  FileText,
  Plus,
  Trash2,
  AlertCircle,
  UserPlus,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { generateUCFSIN } from "@/lib/ucfsin-generator"

interface Subscriber {
  id: string
  name: string
  email: string
  phone: string
  address: string
  ucfsin: string
  status: "pending" | "verified" | "rejected"
}

export function SubscriberGenerator() {
  const [activeTab, setActiveTab] = useState("manual")
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [bulkCount, setBulkCount] = useState(10)
  const [isGenerating, setIsGenerating] = useState(false)

  // Manual entry form state
  const [manualForm, setManualForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const generateRandomSubscriber = (index: number): Subscriber => {
    const firstNames = ["Rajesh", "Priya", "Amit", "Sunita", "Vikram", "Kavya", "Ravi", "Meera", "Suresh", "Anita"]
    const lastNames = ["Kumar", "Sharma", "Patel", "Singh", "Nair", "Reddy", "Gupta", "Joshi", "Rao", "Iyer"]
    const cities = [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Jaipur",
      "Lucknow",
    ]

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]

    return {
      id: `SUB${Date.now()}${index}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      address: `${Math.floor(Math.random() * 999) + 1}, ${city}, India`,
      ucfsin: generateUCFSIN(),
      status: Math.random() > 0.8 ? "pending" : "verified",
    }
  }

  const handleManualAdd = () => {
    if (!manualForm.name || !manualForm.email || !manualForm.phone) {
      return
    }

    const newSubscriber: Subscriber = {
      id: `SUB${Date.now()}`,
      name: manualForm.name,
      email: manualForm.email,
      phone: manualForm.phone,
      address: manualForm.address,
      ucfsin: generateUCFSIN(),
      status: "pending",
    }

    setSubscribers((prev) => [...prev, newSubscriber])
    setManualForm({ name: "", email: "", phone: "", address: "" })
  }

  const handleBulkGenerate = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const newSubscribers = Array.from({ length: bulkCount }, (_, index) => generateRandomSubscriber(index))
      setSubscribers((prev) => [...prev, ...newSubscribers])
      setIsGenerating(false)
    }, 1500)
  }

  const handleRemoveSubscriber = (id: string) => {
    setSubscribers((prev) => prev.filter((sub) => sub.id !== id))
  }

  const handleExportCSV = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Address", "UCFSIN", "Status"],
      ...subscribers.map((sub) => [sub.name, sub.email, sub.phone, sub.address, sub.ucfsin, sub.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "subscribers.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">Subscriber Management</h3>
          <p className="text-sm text-gray-600">Add and manage scheme subscribers</p>
        </div>
        {subscribers.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button onClick={handleExportCSV} variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={() => setSubscribers([])}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manual" className="text-xs sm:text-sm">
            Manual Entry
          </TabsTrigger>
          <TabsTrigger value="bulk" className="text-xs sm:text-sm">
            Bulk Generate
          </TabsTrigger>
          <TabsTrigger value="import" className="text-xs sm:text-sm">
            Import CSV
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                Add Subscriber Manually
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={manualForm.name}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={manualForm.email}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter address"
                    value={manualForm.address}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, address: e.target.value }))}
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
              <Button
                onClick={handleManualAdd}
                className="w-full sm:w-auto"
                disabled={!manualForm.name || !manualForm.email || !manualForm.phone}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Subscriber
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Bulk Generate Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="space-y-2 w-full sm:w-auto">
                  <Label htmlFor="bulk-count">Number of Subscribers</Label>
                  <Select value={bulkCount.toString()} onValueChange={(value) => setBulkCount(Number.parseInt(value))}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Subscribers</SelectItem>
                      <SelectItem value="10">10 Subscribers</SelectItem>
                      <SelectItem value="25">25 Subscribers</SelectItem>
                      <SelectItem value="50">50 Subscribers</SelectItem>
                      <SelectItem value="100">100 Subscribers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleBulkGenerate} disabled={isGenerating} className="w-full sm:w-auto">
                  {isGenerating ? "Generating..." : "Generate Subscribers"}
                </Button>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  This will generate random subscriber data for testing purposes. All generated data is fictional.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                Import from CSV
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                  CSV should contain: Name, Email, Phone, Address columns
                </p>
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Subscribers List */}
      {subscribers.length > 0 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Subscribers ({subscribers.length})
              </span>
              <Badge variant="outline" className="text-xs sm:text-sm">
                {subscribers.filter((s) => s.status === "verified").length} Verified
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {subscribers.map((subscriber) => (
                <div key={subscriber.id} className="border rounded-lg p-3 sm:p-4 bg-gray-50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h4 className="font-medium text-sm sm:text-base truncate">{subscriber.name}</h4>
                        <Badge className={`${getStatusColor(subscriber.status)} text-xs w-fit`}>
                          {subscriber.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{subscriber.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{subscriber.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{subscriber.address}</span>
                        </div>
                        <div className="font-mono text-xs bg-white px-2 py-1 rounded border">{subscriber.ucfsin}</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveSubscriber(subscriber.id)}
                      className="text-red-600 hover:text-red-700 w-full sm:w-auto"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
