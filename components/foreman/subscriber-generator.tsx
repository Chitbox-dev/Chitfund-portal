"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  Download,
  Copy,
  Search,
  RefreshCw,
  Eye,
  DollarSign,
  Calendar,
  Clock,
  Phone,
  MapPin,
  CreditCard,
  User,
  Check,
  Save,
  Plus,
} from "lucide-react"

// Sample Indian names for generation
const FIRST_NAMES = [
  "Rajesh",
  "Priya",
  "Amit",
  "Sunita",
  "Vikram",
  "Kavya",
  "Arjun",
  "Meera",
  "Rohit",
  "Anita",
  "Suresh",
  "Lakshmi",
  "Kiran",
  "Deepa",
  "Manoj",
  "Sita",
  "Ravi",
  "Geetha",
  "Anil",
  "Radha",
  "Prakash",
  "Usha",
  "Santosh",
  "Latha",
  "Ramesh",
  "Shanti",
  "Dinesh",
  "Prema",
  "Ganesh",
  "Suma",
  "Krishna",
  "Devi",
  "Venkat",
  "Kamala",
  "Mohan",
  "Saraswati",
  "Ashok",
  "Parvathi",
  "Naresh",
  "Indira",
]

const LAST_NAMES = [
  "Kumar",
  "Sharma",
  "Reddy",
  "Patel",
  "Singh",
  "Rao",
  "Gupta",
  "Nair",
  "Iyer",
  "Joshi",
  "Agarwal",
  "Verma",
  "Menon",
  "Pillai",
  "Shetty",
  "Bhat",
  "Hegde",
  "Kulkarni",
  "Desai",
  "Shah",
  "Naidu",
  "Chandra",
  "Prasad",
  "Murthy",
  "Swamy",
  "Sastry",
  "Varma",
  "Raman",
  "Krishnan",
  "Subramanian",
]

const STREET_NAMES = [
  "MG Road",
  "Brigade Road",
  "Commercial Street",
  "Residency Road",
  "Richmond Road",
  "Cunningham Road",
  "St. Marks Road",
  "Church Street",
  "Infantry Road",
  "Museum Road",
  "Gandhi Road",
  "Nehru Street",
  "Rajaji Road",
  "Ambedkar Street",
  "Tagore Road",
  "Vivekananda Road",
  "Sardar Patel Road",
  "Lal Bahadur Road",
  "Indira Gandhi Road",
]

const AREAS = [
  "Koramangala",
  "Indiranagar",
  "Whitefield",
  "Electronic City",
  "Marathahalli",
  "BTM Layout",
  "HSR Layout",
  "Jayanagar",
  "Rajajinagar",
  "Malleshwaram",
  "Banashankari",
  "Basavanagudi",
  "Yelahanka",
  "Hebbal",
  "RT Nagar",
  "Vijayanagar",
  "Sadashivanagar",
  "Frazer Town",
  "Cox Town",
  "Shivajinagar",
]

// Generate random UCFSIN in format: KA-ABC-123-456
const generateUCFSIN = () => {
  const state = "KA"

  // Generate PAN-like first part (3 alphanumeric characters)
  const panChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const panPart = Array.from({ length: 3 }, () => panChars[Math.floor(Math.random() * panChars.length)]).join("")

  // Generate random 3-character alphanumeric
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const randomPart = Array.from({ length: 3 }, () => randomChars[Math.floor(Math.random() * randomChars.length)]).join(
    "",
  )

  // Generate Aadhaar-like last 3 digits
  const aadhaarPart = Math.floor(100 + Math.random() * 900).toString()

  return `${state}-${panPart}-${randomPart}-${aadhaarPart}`
}

// Generate random mobile number
const generateMobile = () => {
  const prefixes = ["98", "99", "97", "96", "95", "94", "93", "92", "91", "90"]
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const remaining = Math.floor(10000000 + Math.random() * 90000000)
  return `${prefix}${remaining}`
}

// Generate random address
const generateAddress = () => {
  const houseNo = Math.floor(1 + Math.random() * 999)
  const street = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)]
  const area = AREAS[Math.floor(Math.random() * AREAS.length)]
  const pincode = Math.floor(560001 + Math.random() * 99)

  return `${houseNo}, ${street}, ${area}, Bangalore - ${pincode}`
}

// Generate a single subscriber
const generateSubscriber = (ticketNumber: number) => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]

  return {
    id: Date.now() + ticketNumber + Math.random(),
    ticketNumber: ticketNumber,
    name: `${firstName} ${lastName}`,
    mobile: generateMobile(),
    ucfsin: generateUCFSIN(),
    address: generateAddress(),
    paymentStatus: "pending",
    isGenerated: true,
    joinedDate: new Date().toISOString(),
  }
}

interface SubscriberGeneratorProps {
  isOpen: boolean
  onClose: () => void
  onSelectSubscribers: (subscribers: any[]) => void
  schemeDetails: any
}

export function SubscriberGenerator({ isOpen, onClose, onSelectSubscribers, schemeDetails }: SubscriberGeneratorProps) {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [selectedSubscribers, setSelectedSubscribers] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSchemeDetails, setShowSchemeDetails] = useState(false)
  const [copiedUCFSIN, setCopiedUCFSIN] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Generate 20 random subscribers when dialog opens
  useEffect(() => {
    if (isOpen && subscribers.length === 0) {
      generateRandomSubscribers()
    }
  }, [isOpen])

  const generateRandomSubscribers = () => {
    setIsGenerating(true)
    setSelectedSubscribers(new Set())

    // Simulate generation delay for better UX
    setTimeout(() => {
      const newSubscribers = Array.from({ length: 20 }, (_, index) => generateSubscriber(index + 1))
      setSubscribers(newSubscribers)
      setIsGenerating(false)
    }, 1500)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubscribers(new Set(filteredSubscribers.map((s) => s.id)))
    } else {
      setSelectedSubscribers(new Set())
    }
  }

  const handleSelectSubscriber = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedSubscribers)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedSubscribers(newSelected)
  }

  const handleSaveSelectedSubscribers = async () => {
    if (selectedSubscribers.size === 0) {
      alert("Please select at least one subscriber to save.")
      return
    }

    setIsSaving(true)

    try {
      // Simulate save delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const selected = subscribers.filter((s) => selectedSubscribers.has(s.id))
      onSelectSubscribers(selected)

      // Reset state
      setSubscribers([])
      setSelectedSubscribers(new Set())
      setSearchTerm("")
      setShowSchemeDetails(false)

      // Close dialog
      onClose()
    } catch (error) {
      console.error("Error saving subscribers:", error)
      alert("Error saving subscribers. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopyUCFSIN = async (ucfsin: string) => {
    try {
      await navigator.clipboard.writeText(ucfsin)
      setCopiedUCFSIN(ucfsin)
      setTimeout(() => setCopiedUCFSIN(null), 2000)
    } catch (err) {
      console.error("Failed to copy UCFSIN:", err)
    }
  }

  const handleExportCSV = () => {
    const csvContent = [
      ["Ticket No", "Name", "Mobile", "UCFSIN", "Address"].join(","),
      ...subscribers.map((s) => [s.ticketNumber, `"${s.name}"`, s.mobile, s.ucfsin, `"${s.address}"`].join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `random_subscribers_${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mobile.includes(searchTerm) ||
      s.ucfsin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const allSelected = filteredSubscribers.length > 0 && filteredSubscribers.every((s) => selectedSubscribers.has(s.id))
  const someSelected = filteredSubscribers.some((s) => selectedSubscribers.has(s.id))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] flex flex-col">
        <DialogHeader className="pb-4 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="h-6 w-6 text-purple-600" />
            Generate Random Subscribers with UCFSIN
          </DialogTitle>
          <DialogDescription className="text-base">
            Generate 20 random subscribers with proper UCFSIN format for testing and demonstration purposes.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => setShowSchemeDetails(!showSchemeDetails)}
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <Eye className="h-4 w-4 mr-1" />
                {showSchemeDetails ? "Hide" : "View"} Scheme Details
              </Button>

              <Button
                onClick={generateRandomSubscribers}
                disabled={isGenerating}
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Regenerate 20 New
                  </>
                )}
              </Button>

              <Button
                onClick={handleExportCSV}
                variant="outline"
                size="sm"
                disabled={subscribers.length === 0}
                className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
              >
                <Download className="h-4 w-4 mr-1" />
                Export CSV
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                {selectedSubscribers.size} of {filteredSubscribers.length} selected
              </Badge>

              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name, mobile, UCFSIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>

          {/* UCFSIN Format Info */}
          <Card className="bg-blue-50 border-blue-200 flex-shrink-0">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                UCFSIN Format Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-800 mb-2">
                    <strong>Format:</strong> STATE-PAN3-RANDOM3-AADHAAR3
                  </p>
                  <p className="text-blue-800">
                    <strong>Example:</strong> <code className="bg-blue-100 px-1 rounded">KA-H5D-7A2-978</code>
                  </p>
                </div>
                <div className="space-y-1 text-blue-700">
                  <p>
                    • <strong>KA:</strong> Karnataka state code
                  </p>
                  <p>
                    • <strong>H5D:</strong> 3 characters from PAN
                  </p>
                  <p>
                    • <strong>7A2:</strong> 3 random alphanumeric
                  </p>
                  <p>
                    • <strong>978:</strong> Last 3 digits from Aadhaar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheme Details Panel */}
          {showSchemeDetails && (
            <Card className="bg-green-50 border-green-200 flex-shrink-0">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Current Scheme Details
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs text-green-700">Chit Value</p>
                      <p className="font-semibold text-green-900">
                        ₹{schemeDetails.chitValue ? Number(schemeDetails.chitValue).toLocaleString() : "Not set"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs text-green-700">Duration</p>
                      <p className="font-semibold text-green-900">{schemeDetails.chitDuration || "Not set"} months</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs text-green-700">Subscribers Needed</p>
                      <p className="font-semibold text-green-900">{schemeDetails.numberOfSubscribers || "Not set"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs text-green-700">Monthly Premium</p>
                      <p className="font-semibold text-green-900">
                        ₹
                        {schemeDetails.monthlyPremium
                          ? Number(schemeDetails.monthlyPremium).toLocaleString()
                          : "Not set"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selection Controls */}
          <div className="flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  className="data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                  Select All ({filteredSubscribers.length})
                </Label>
              </div>

              {selectedSubscribers.size > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubscribers(new Set())}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Clear Selection
                </Button>
              )}
            </div>

            {/* Prominent Save Button */}
            <Button
              onClick={handleSaveSelectedSubscribers}
              disabled={selectedSubscribers.size === 0 || isSaving}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              size="default"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add {selectedSubscribers.size} to Enrollment List
                </>
              )}
            </Button>
          </div>

          {/* Scrollable Subscribers List */}
          <div className="flex-1 min-h-0 border rounded-lg overflow-hidden">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16 h-full">
                <RefreshCw className="h-12 w-12 animate-spin text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Generating Random Subscribers</h3>
                <p className="text-gray-500">Creating 20 subscribers with proper UCFSIN format...</p>
              </div>
            ) : subscribers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 h-full">
                <Users className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Subscribers Generated</h3>
                <p className="text-gray-500 mb-4">Click "Regenerate 20 New" to create sample data</p>
              </div>
            ) : (
              <div className="h-full overflow-y-auto">
                <div className="space-y-2 p-4">
                  {filteredSubscribers.length === 0 ? (
                    <div className="text-center py-8">
                      <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No subscribers match your search</p>
                    </div>
                  ) : (
                    filteredSubscribers.map((subscriber) => (
                      <Card
                        key={subscriber.id}
                        className={`transition-all duration-200 ${
                          selectedSubscribers.has(subscriber.id)
                            ? "border-purple-300 bg-purple-50 shadow-md"
                            : "hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Checkbox
                              checked={selectedSubscribers.has(subscriber.id)}
                              onCheckedChange={(checked) => handleSelectSubscriber(subscriber.id, checked as boolean)}
                              className="data-[state=checked]:bg-purple-600"
                            />

                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-purple-600">
                                #{subscriber.ticketNumber.toString().padStart(2, "0")}
                              </span>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-500" />
                                <div>
                                  <Label className="text-xs text-gray-500">Name</Label>
                                  <p className="font-semibold text-gray-900">{subscriber.name}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <div>
                                  <Label className="text-xs text-gray-500">Mobile</Label>
                                  <p className="font-mono text-gray-900">{subscriber.mobile}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-gray-500" />
                                <div>
                                  <Label className="text-xs text-gray-500">UCFSIN</Label>
                                  <div className="flex items-center gap-1">
                                    <p className="font-mono text-sm text-gray-900">{subscriber.ucfsin}</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleCopyUCFSIN(subscriber.ucfsin)}
                                      className="h-6 w-6 p-0 hover:bg-blue-100"
                                      title="Copy UCFSIN"
                                    >
                                      {copiedUCFSIN === subscriber.ucfsin ? (
                                        <Check className="h-3 w-3 text-green-600" />
                                      ) : (
                                        <Copy className="h-3 w-3 text-gray-500" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <div>
                                  <Label className="text-xs text-gray-500">Address</Label>
                                  <p
                                    className="text-sm text-gray-600 truncate max-w-[200px]"
                                    title={subscriber.address}
                                  >
                                    {subscriber.address}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {selectedSubscribers.has(subscriber.id) && (
                              <Badge className="bg-purple-100 text-purple-800 border-purple-200">Selected</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-2 border-t flex-shrink-0">
            <div className="text-sm text-gray-600">
              {subscribers.length > 0 && (
                <>
                  Generated {subscribers.length} subscribers • {selectedSubscribers.size} selected
                </>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} disabled={isSaving}>
                Cancel
              </Button>

              <Button
                onClick={handleSaveSelectedSubscribers}
                disabled={selectedSubscribers.size === 0 || isSaving}
                className="bg-green-600 hover:bg-green-700 text-white px-6"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Adding to List...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Add {selectedSubscribers.size} Selected
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
