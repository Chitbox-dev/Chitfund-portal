"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format } from "date-fns"
import {
  CalendarIcon,
  Check,
  DollarSign,
  Users,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  Gavel,
  Send,
  Eye,
  X,
  Lightbulb,
  Lock,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { SubscriberGenerator } from "@/components/foreman/subscriber-generator"

interface SchemeData {
  schemeId: string
  schemeName?: string
  chitValue: number
  chitDuration: number
  numberOfSubscribers: number
  monthlyPremium: number
  chitStartDate: Date | null
  chitEndDate: Date | null
  schemeStatus: string
  lastUpdated: string
  createdBy: string

  // Step 2 - Auction Rules
  auctionFrequency: string
  auctionStartDate: string
  auctionEndDate: string
  auctionStartTime: string
  auctionDuration: string
  auctionEndTime: string

  // Step 3 - Bidding Rules
  minimumBid: string
  maximumBid: string
  bidIncrement: string
  manualIncrement: string

  // Step 4 - Documents
  commissionStructure: any
  termsOfWithdrawal: any
  liabilitiesDocument: any
  subscriberRights: any
  fdrDocument: any
  draftAgreement: any

  // Step 5 - PSO
  psoNumber: string
  psoDocument: any
  psoGeneratedDate: string

  // Step 6 - Subscribers
  subscribers: any[]

  // Step 7 - Final Agreement
  finalAgreement: any

  // Step 8 - Commencement
  commencementCertificate: any
}

const schemeSteps = [
  {
    id: 1,
    title: "Chit Details",
    description: "Basic scheme information",
    icon: DollarSign,
    status: "current",
  },
  {
    id: 2,
    title: "Auction Rules",
    description: "Auction timing and frequency",
    icon: Clock,
    status: "pending",
  },
  {
    id: 3,
    title: "Bidding Rules",
    description: "Bidding parameters",
    icon: Gavel,
    status: "pending",
  },
  {
    id: 4,
    title: "Terms & FDR Upload",
    description: "Legal documents and FDR",
    icon: Upload,
    status: "pending",
  },
  {
    id: 5,
    title: "PSO Generation",
    description: "Auto generate PSO certificate",
    icon: CheckCircle,
    status: "pending",
  },
  {
    id: 6,
    title: "Subscriber Enrollment",
    description: "Add subscribers and assign tickets",
    icon: Users,
    status: "pending",
  },
  {
    id: 7,
    title: "Final Agreement Upload",
    description: "Upload signed agreement",
    icon: Upload,
    status: "pending",
  },
  {
    id: 8,
    title: "Commencement Certificate",
    description: "Final approval and Form 7",
    icon: CheckCircle,
    status: "pending",
  },
]

enum SchemeStatus {
  Draft = "draft",
  Submitted = "submitted",
  Steps1_4_Approved = "steps_1_4_approved",
  PSO_Requested = "pso_requested",
  PSO_Approved = "pso_approved",
  Subscribers_Added = "subscribers_added",
  Final_Agreement_Uploaded = "final_agreement_uploaded",
  Commencement_Approved = "commencement_approved",
  Live = "live",
  Rejected = "rejected",
}

export default function CreateSchemePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const schemeIdFromUrl = searchParams?.get("schemeId")
  const stepFromUrl = searchParams?.get("step")

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<SchemeData>({
    schemeId: "",
    chitValue: 0,
    chitDuration: 0,
    numberOfSubscribers: 0,
    monthlyPremium: 0,
    chitStartDate: null,
    chitEndDate: null,
    schemeStatus: "draft",
    lastUpdated: new Date().toISOString(),
    createdBy: "foreman",

    // Initialize all other fields
    auctionFrequency: "",
    auctionStartDate: "",
    auctionEndDate: "",
    auctionStartTime: "",
    auctionDuration: "",
    auctionEndTime: "",
    minimumBid: "",
    maximumBid: "",
    bidIncrement: "250",
    manualIncrement: "",
    commissionStructure: null,
    termsOfWithdrawal: null,
    liabilitiesDocument: null,
    subscriberRights: null,
    fdrDocument: null,
    draftAgreement: null,
    psoNumber: "",
    psoDocument: null,
    psoGeneratedDate: "",
    subscribers: [],
    finalAgreement: null,
    commencementCertificate: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [showPreview, setShowPreview] = useState<any>(null)
  const [showSubscriberGenerator, setShowSubscriberGenerator] = useState(false)
  const [editingSubscriber, setEditingSubscriber] = useState<any>(null)

  // Generate unique scheme ID on component mount
  useEffect(() => {
    const generateSchemeId = () => {
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
      return `SCH-${timestamp}-${randomStr}`
    }

    if (schemeIdFromUrl) {
      // Load existing scheme
      loadExistingScheme(schemeIdFromUrl)
    } else if (!formData.schemeId) {
      setFormData((prev) => ({
        ...prev,
        schemeId: generateSchemeId(),
      }))
    }
  }, [schemeIdFromUrl])

  // Set current step from URL parameter
  useEffect(() => {
    if (stepFromUrl) {
      const targetStep = Number.parseInt(stepFromUrl)
      if (targetStep >= 1 && targetStep <= 8) {
        setCurrentStep(targetStep)
      }
    }
  }, [stepFromUrl])

  const loadExistingScheme = (schemeId: string) => {
    try {
      // Check all possible locations for the scheme
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const liveSchemes = JSON.parse(localStorage.getItem("liveSchemes") || "[]")

      let existingScheme = null

      // Find scheme in any of the lists
      existingScheme =
        pendingSchemes.find((s: any) => s.schemeId === schemeId) ||
        approvedSchemes.find((s: any) => s.schemeId === schemeId) ||
        liveSchemes.find((s: any) => s.schemeId === schemeId)

      // Also check draft
      if (!existingScheme) {
        const schemeDraft = localStorage.getItem("schemeDraft")
        if (schemeDraft) {
          const draft = JSON.parse(schemeDraft)
          if (draft.schemeId === schemeId) {
            existingScheme = draft
          }
        }
      }

      if (existingScheme) {
        setFormData(existingScheme)
      }
    } catch (error) {
      console.error("Error loading existing scheme:", error)
    }
  }

  // Auto-calculate fields
  useEffect(() => {
    if (formData.chitValue && formData.chitDuration) {
      const calculatedPremium = Math.round(formData.chitValue / formData.chitDuration)
      setFormData((prev) => ({
        ...prev,
        monthlyPremium: calculatedPremium,
        numberOfSubscribers: formData.chitDuration, // Must equal duration
      }))
    }
  }, [formData.chitValue, formData.chitDuration])

  // Auto-calculate end date
  useEffect(() => {
    if (formData.chitStartDate && formData.chitDuration) {
      const endDate = new Date(formData.chitStartDate)
      endDate.setMonth(endDate.getMonth() + formData.chitDuration)
      setFormData((prev) => ({
        ...prev,
        chitEndDate: endDate,
      }))
    }
  }, [formData.chitStartDate, formData.chitDuration])

  // Auto-calculate auction end time
  useEffect(() => {
    if (formData.auctionStartTime && formData.auctionDuration) {
      const [hours, minutes] = formData.auctionStartTime.split(":")
      const startTime = new Date()
      startTime.setHours(Number.parseInt(hours), Number.parseInt(minutes))

      const endTime = new Date(startTime)
      endTime.setHours(endTime.getHours() + Number.parseInt(formData.auctionDuration))

      const endTimeString = endTime.toTimeString().slice(0, 5)
      setFormData((prev) => ({ ...prev, auctionEndTime: endTimeString }))
    }
  }, [formData.auctionStartTime, formData.auctionDuration])

  // Auto-calculate bidding amounts
  useEffect(() => {
    if (formData.chitValue) {
      const chitValue = Number.parseFloat(formData.chitValue.toString())
      const minimumBid = Math.round(chitValue * 0.05)
      const maximumBid = Math.round(chitValue * 0.3)
      setFormData((prev) => ({
        ...prev,
        minimumBid: minimumBid.toString(),
        maximumBid: maximumBid.toString(),
      }))
    }
  }, [formData.chitValue])

  const handleInputChange = (field: keyof SchemeData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date().toISOString(),
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {}

    switch (currentStep) {
      case 1:
        if (!formData.chitValue || formData.chitValue <= 0) {
          newErrors.chitValue = "Chit value is required and must be greater than 0"
        }
        if (!formData.chitDuration || formData.chitDuration <= 0) {
          newErrors.chitDuration = "Chit duration is required and must be greater than 0"
        }
        if (!formData.chitStartDate) {
          newErrors.chitStartDate = "Chit start date is required"
        }
        break

      case 2:
        if (!formData.auctionFrequency) {
          newErrors.auctionFrequency = "Auction frequency is required"
        }
        if (!formData.auctionStartDate) {
          newErrors.auctionStartDate = "Auction start date is required"
        }
        if (!formData.auctionStartTime) {
          newErrors.auctionStartTime = "Auction start time is required"
        }
        if (
          !formData.auctionDuration ||
          Number.parseInt(formData.auctionDuration) < 1 ||
          Number.parseInt(formData.auctionDuration) > 8
        ) {
          newErrors.auctionDuration = "Auction duration must be between 1-8 hours"
        }
        break

      case 3:
        if (
          formData.bidIncrement === "manual" &&
          (!formData.manualIncrement || Number.parseFloat(formData.manualIncrement) <= 0)
        ) {
          newErrors.manualIncrement = "Valid manual increment value is required"
        }
        break

      case 4:
        const requiredDocuments = [
          { field: "commissionStructure", name: "Commission structure document" },
          { field: "termsOfWithdrawal", name: "Terms of withdrawal document" },
          { field: "liabilitiesDocument", name: "Liabilities document" },
          { field: "subscriberRights", name: "Subscriber rights document" },
          { field: "fdrDocument", name: "FDR document" },
          { field: "draftAgreement", name: "Draft agreement" },
        ]

        requiredDocuments.forEach((doc) => {
          if (!formData[doc.field as keyof SchemeData]) {
            newErrors[doc.field] = `${doc.name} is required`
          }
        })
        break

      case 6:
        if (!formData.subscribers || formData.subscribers.length === 0) {
          newErrors.subscribers = "At least one subscriber is required"
        }
        break

      case 7:
        if (!formData.finalAgreement) {
          newErrors.finalAgreement = "Final signed agreement is required"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileUpload = (fieldName: string, file: File) => {
    if (!file) return

    if (file.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, [fieldName]: "Only PDF files are allowed" }))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [fieldName]: "File size must be less than 5MB" }))
      return
    }

    setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }))

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const currentProgress = prev[fieldName] || 0
        if (currentProgress >= 100) {
          clearInterval(interval)

          const documentObject = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            url: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString(),
            file: file,
          }

          setFormData((prevData) => ({ ...prevData, [fieldName]: documentObject }))
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }
            delete newErrors[fieldName]
            return newErrors
          })
          return prev
        }
        return { ...prev, [fieldName]: currentProgress + 10 }
      })
    }, 100)
  }

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      return
    }

    await handleSaveDraft()

    if (currentStep < 8) {
      setCurrentStep(currentStep + 1)
      // Update URL to reflect current step
      const url = new URL(window.location.href)
      url.searchParams.set("step", (currentStep + 1).toString())
      window.history.pushState({}, "", url.toString())
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // Update URL to reflect current step
      const url = new URL(window.location.href)
      url.searchParams.set("step", (currentStep - 1).toString())
      window.history.pushState({}, "", url.toString())
    }
  }

  const handleSaveDraft = async () => {
    setIsLoading(true)

    try {
      const foremanToken = localStorage.getItem("foremanToken")
      if (!foremanToken) {
        router.push("/auth/login")
        return
      }

      // Save to draft
      localStorage.setItem("schemeDraft", JSON.stringify(formData))

      // Also save to foreman schemes list
      const uniqueKey = `foreman_schemes_${foremanToken}`
      const existingSchemes = JSON.parse(localStorage.getItem(uniqueKey) || "[]")

      // Remove any existing scheme with same ID to prevent duplicates
      const filteredSchemes = existingSchemes.filter((s: SchemeData) => s.schemeId !== formData.schemeId)

      // Add current scheme
      const updatedSchemes = [...filteredSchemes, formData]

      localStorage.setItem(uniqueKey, JSON.stringify(updatedSchemes))

      console.log("Draft saved successfully!")
    } catch (error) {
      console.error("Error saving draft:", error)
      alert("Error saving draft. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitSteps1to4 = async () => {
    if (!validateCurrentStep()) {
      return
    }

    setIsLoading(true)

    try {
      const updatedFormData = {
        ...formData,
        schemeStatus: SchemeStatus.Submitted,
        lastUpdated: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
      }

      setFormData(updatedFormData)
      localStorage.setItem("schemeDraft", JSON.stringify(updatedFormData))

      // Save to pending schemes for admin review
      const existingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const filteredSchemes = existingSchemes.filter((s: any) => s.schemeId !== formData.schemeId)
      filteredSchemes.push(updatedFormData)
      localStorage.setItem("pendingSchemes", JSON.stringify(filteredSchemes))

      alert("Steps 1-4 submitted for admin approval successfully!")
    } catch (error) {
      console.error("Error submitting steps:", error)
      alert("Error submitting steps. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const canAccessStep = (stepId: number) => {
    const status = formData.schemeStatus || SchemeStatus.Draft

    switch (status) {
      case SchemeStatus.Draft:
        return stepId <= 4
      case SchemeStatus.Submitted:
        return stepId <= 4
      case SchemeStatus.Steps1_4_Approved:
        return stepId <= 5
      case SchemeStatus.PSO_Requested:
        return stepId <= 5
      case SchemeStatus.PSO_Approved:
        return stepId <= 6
      case SchemeStatus.Subscribers_Added:
        return stepId <= 7
      case SchemeStatus.Final_Agreement_Uploaded:
      case SchemeStatus.Commencement_Approved:
      case SchemeStatus.Live:
        return stepId <= 8
      case SchemeStatus.Rejected:
        return stepId <= 4
      default:
        return stepId === 1
    }
  }

  const getStatusBadge = () => {
    switch (formData.schemeStatus) {
      case SchemeStatus.Draft:
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case SchemeStatus.Submitted:
        return <Badge className="bg-yellow-100 text-yellow-800">Submitted for Review</Badge>
      case SchemeStatus.Steps1_4_Approved:
        return <Badge className="bg-blue-100 text-blue-800">Steps 1-4 Approved</Badge>
      case SchemeStatus.PSO_Requested:
        return <Badge className="bg-orange-100 text-orange-800">PSO Requested</Badge>
      case SchemeStatus.PSO_Approved:
        return <Badge className="bg-green-100 text-green-800">PSO Approved</Badge>
      case SchemeStatus.Subscribers_Added:
        return <Badge className="bg-purple-100 text-purple-800">Subscribers Added</Badge>
      case SchemeStatus.Final_Agreement_Uploaded:
        return <Badge className="bg-indigo-100 text-indigo-800">Final Agreement Uploaded</Badge>
      case SchemeStatus.Live:
        return <Badge className="bg-green-100 text-green-800">Live</Badge>
      case SchemeStatus.Rejected:
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="chitValue" className="text-sm font-medium">
                  Chit Value (₹) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="chitValue"
                  type="number"
                  placeholder="e.g., 1000000"
                  value={formData.chitValue || ""}
                  onChange={(e) => handleInputChange("chitValue", Number.parseInt(e.target.value) || 0)}
                  className={cn("h-11", errors.chitValue ? "border-red-300 focus:border-red-500" : "")}
                />
                <p className="text-xs text-gray-500">Total amount to be distributed among subscribers</p>
                {errors.chitValue && <p className="text-xs text-red-600">{errors.chitValue}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="chitDuration" className="text-sm font-medium">
                  Chit Duration (months) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="chitDuration"
                  type="number"
                  placeholder="e.g., 20"
                  value={formData.chitDuration || ""}
                  onChange={(e) => handleInputChange("chitDuration", Number.parseInt(e.target.value) || 0)}
                  className={cn("h-11", errors.chitDuration ? "border-red-300 focus:border-red-500" : "")}
                />
                <p className="text-xs text-gray-500">Number of months the scheme will run</p>
                {errors.chitDuration && <p className="text-xs text-red-600">{errors.chitDuration}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfSubscribers" className="text-sm font-medium">
                  Number of Subscribers <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="numberOfSubscribers"
                  type="text"
                  value="Must equal duration"
                  disabled
                  className="h-11 bg-gray-50 text-gray-600"
                />
                <p className="text-xs text-gray-500">Must equal duration (1 subscriber per month)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyPremium" className="text-sm font-medium">
                  Monthly Premium (₹)
                </Label>
                <Input
                  id="monthlyPremium"
                  type="text"
                  value={
                    formData.monthlyPremium
                      ? `₹${formData.monthlyPremium.toLocaleString()}`
                      : "Auto-calculated: Chit Value ÷ Duration"
                  }
                  disabled
                  className="h-11 bg-gray-50 text-gray-600"
                />
                <p className="text-xs text-gray-500">Auto-calculated: Chit Value ÷ Duration</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chitStartDate" className="text-sm font-medium">
                  Chit Start Date <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-11 justify-start text-left font-normal",
                        !formData.chitStartDate && "text-muted-foreground",
                        errors.chitStartDate ? "border-red-300 focus:border-red-500" : "",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.chitStartDate ? format(formData.chitStartDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.chitStartDate || undefined}
                      onSelect={(date) => handleInputChange("chitStartDate", date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-gray-500">When the scheme will commence</p>
                {errors.chitStartDate && <p className="text-xs text-red-600">{errors.chitStartDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="chitEndDate" className="text-sm font-medium">
                  Chit End Date
                </Label>
                <Input
                  id="chitEndDate"
                  type="text"
                  value={
                    formData.chitEndDate
                      ? format(formData.chitEndDate, "dd/MM/yyyy")
                      : "Auto-calculated: Start Date + Duration"
                  }
                  disabled
                  className="h-11 bg-gray-50 text-gray-600"
                />
                <p className="text-xs text-gray-500">Auto-calculated: Start Date + Duration</p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="auctionFrequency" className="flex items-center gap-2">
                  Auction Frequency <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.auctionFrequency}
                  onValueChange={(value) => handleInputChange("auctionFrequency", value)}
                >
                  <SelectTrigger className={errors.auctionFrequency ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                {errors.auctionFrequency && <p className="text-sm text-red-500">{errors.auctionFrequency}</p>}
                <p className="text-xs text-gray-500">How often auctions will be conducted</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionStartDate" className="flex items-center gap-2">
                  Auction Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="auctionStartDate"
                  type="date"
                  value={formData.auctionStartDate}
                  onChange={(e) => handleInputChange("auctionStartDate", e.target.value)}
                  className={errors.auctionStartDate ? "border-red-500" : ""}
                />
                {errors.auctionStartDate && <p className="text-sm text-red-500">{errors.auctionStartDate}</p>}
                <p className="text-xs text-gray-500">When auctions will begin</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionStartTime" className="flex items-center gap-2">
                  Auction Start Time <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="auctionStartTime"
                  type="time"
                  value={formData.auctionStartTime}
                  onChange={(e) => handleInputChange("auctionStartTime", e.target.value)}
                  className={errors.auctionStartTime ? "border-red-500" : ""}
                />
                {errors.auctionStartTime && <p className="text-sm text-red-500">{errors.auctionStartTime}</p>}
                <p className="text-xs text-gray-500">Daily auction start time</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionDuration" className="flex items-center gap-2">
                  Auction Duration (hours) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="auctionDuration"
                  type="number"
                  min="1"
                  max="8"
                  placeholder="e.g., 2"
                  value={formData.auctionDuration}
                  onChange={(e) => handleInputChange("auctionDuration", e.target.value)}
                  className={errors.auctionDuration ? "border-red-500" : ""}
                />
                {errors.auctionDuration && <p className="text-sm text-red-500">{errors.auctionDuration}</p>}
                <p className="text-xs text-gray-500">How long each auction will run (1-8 hours)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionEndTime">Auction End Time</Label>
                <Input
                  id="auctionEndTime"
                  type="time"
                  value={formData.auctionEndTime}
                  readOnly
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">Auto-calculated: Start Time + Duration</p>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="minimumBid">Minimum Bid (₹)</Label>
                <Input id="minimumBid" type="number" value={formData.minimumBid} readOnly className="bg-gray-50" />
                <p className="text-xs text-gray-500">Auto-calculated: 5% of Chit Value (Regulatory Requirement)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maximumBid">Maximum Bid (₹)</Label>
                <Input id="maximumBid" type="number" value={formData.maximumBid} readOnly className="bg-gray-50" />
                <p className="text-xs text-gray-500">Auto-calculated: 30% of Chit Value (Regulatory Limit)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bidIncrement">Bid Increment</Label>
                <Select
                  value={formData.bidIncrement}
                  onValueChange={(value) => handleInputChange("bidIncrement", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select increment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">₹100</SelectItem>
                    <SelectItem value="250">₹250</SelectItem>
                    <SelectItem value="500">₹500</SelectItem>
                    <SelectItem value="1000">₹1,000</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Minimum amount by which bids can be increased</p>
              </div>

              {formData.bidIncrement === "manual" && (
                <div className="space-y-2">
                  <Label htmlFor="manualIncrement" className="flex items-center gap-2">
                    Manual Increment (₹) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="manualIncrement"
                    type="number"
                    placeholder="Enter custom increment"
                    value={formData.manualIncrement}
                    onChange={(e) => handleInputChange("manualIncrement", e.target.value)}
                    className={errors.manualIncrement ? "border-red-500" : ""}
                  />
                  {errors.manualIncrement && <p className="text-sm text-red-500">{errors.manualIncrement}</p>}
                  <p className="text-xs text-gray-500">Custom bid increment amount</p>
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Bidding Rules Summary</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>• Minimum bid: ₹{formData.minimumBid} (5% of chit value)</p>
                <p>• Maximum bid: ₹{formData.maximumBid} (30% of chit value)</p>
                <p>
                  • Bid increment: ₹
                  {formData.bidIncrement === "manual" ? formData.manualIncrement || "0" : formData.bidIncrement}
                </p>
                <p>• Winner pays the bid amount as discount to other subscribers</p>
                <p>• Winner receives: ₹{formData.chitValue} - Bid Amount - Commission</p>
              </div>
            </div>
          </div>
        )

      case 4:
        const documentFields = [
          { key: "commissionStructure", label: "Commission Structure", required: true },
          { key: "termsOfWithdrawal", label: "Terms of Withdrawal", required: true },
          { key: "liabilitiesDocument", label: "Liabilities Document", required: true },
          { key: "subscriberRights", label: "Subscriber Rights", required: true },
          { key: "fdrDocument", label: "FDR Document", required: true },
          { key: "draftAgreement", label: "Draft Agreement", required: true },
        ]

        return (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">Document Upload Guidelines</h4>
                  <ul className="mt-2 text-sm text-amber-800 space-y-1">
                    <li>• All documents must be in PDF format</li>
                    <li>• Maximum file size: 5MB per document</li>
                    <li>• Ensure documents are clear and readable</li>
                    <li>• FDR must be 10% of chit value as per regulations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {documentFields.map((field) => (
                <div key={field.key} className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </Label>

                  {formData[field.key as keyof SchemeData] ? (
                    <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-900 text-sm truncate max-w-[200px]">
                              {(formData[field.key as keyof SchemeData] as any)?.name}
                            </p>
                            <p className="text-xs text-green-700">
                              Uploaded:{" "}
                              {new Date((formData[field.key as keyof SchemeData] as any)?.uploadedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPreview(formData[field.key as keyof SchemeData])}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, [field.key]: null }))
                              setErrors((prev) => ({ ...prev, [field.key]: null }))
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          errors[field.key]
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400 bg-gray-50"
                        }`}
                      >
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleFileUpload(field.key, file)
                            }
                          }}
                          className="hidden"
                          id={`upload-${field.key}`}
                        />
                        <label htmlFor={`upload-${field.key}`} className="cursor-pointer">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-600">Click to upload {field.label}</p>
                          <p className="text-xs text-gray-500 mt-1">PDF files only, max 5MB</p>
                        </label>
                      </div>

                      {uploadProgress[field.key] !== undefined && uploadProgress[field.key] < 100 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Uploading...</span>
                            <span>{uploadProgress[field.key]}%</span>
                          </div>
                          <Progress value={uploadProgress[field.key]} className="h-2" />
                        </div>
                      )}

                      {errors[field.key] && <p className="text-sm text-red-500">{errors[field.key]}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {formData.schemeStatus === SchemeStatus.Draft && (
              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleSubmitSteps1to4}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Steps 1-4 for Admin Approval
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-2">PSO (Promoter's Security Obligation)</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>• PSO certificate is automatically generated after admin approval of Steps 1-4</p>
                <p>• PSO certificate is required as per Chit Funds Act regulations</p>
                <p>• Download the certificate for your records</p>
                <p>• This enables subscriber enrollment in the next step</p>
              </div>
            </div>

            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">PSO Generation Pending</h3>
              <p className="text-gray-500">Admin approval of Steps 1-4 required to generate PSO certificate.</p>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Subscriber Enrollment Locked</h3>
              <p className="text-gray-500">PSO approval required to unlock subscriber enrollment.</p>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Final Agreement Upload Locked</h3>
              <p className="text-gray-500">Add subscribers in the previous step to unlock this step.</p>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Commencement Certificate Locked</h3>
              <p className="text-gray-500">Submit the final agreement to unlock the Commencement Certificate.</p>
            </div>
          </div>
        )

      default:
        return <p>Unknown step</p>
    }
  }

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      router.push("/foreman/dashboard")
    }
  }

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/foreman">Foreman Portal</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Create Scheme</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Create New Scheme</h1>
            {getStatusBadge()}
          </div>
          <p className="text-gray-600">Complete the steps below to create a new chit scheme.</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Scheme Steps */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Scheme Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {schemeSteps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index + 1 === currentStep
                  const isCompleted = false
                  const canAccess = canAccessStep(index + 1)

                  return (
                    <div
                      key={step.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                        isActive ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50",
                        !canAccess && "opacity-50 cursor-not-allowed",
                      )}
                      onClick={() => canAccess && setCurrentStep(index + 1)}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                          isActive
                            ? "bg-blue-500 text-white"
                            : isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-500",
                        )}
                      >
                        {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={cn("font-medium text-sm", isActive ? "text-blue-900" : "text-gray-900")}>
                          {step.title}
                        </h3>
                        <p className={cn("text-xs mt-1", isActive ? "text-blue-700" : "text-gray-500")}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Step Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">{schemeSteps[currentStep - 1].title}</CardTitle>
                <p className="text-sm text-gray-600">{schemeSteps[currentStep - 1].description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderStepContent()}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 sm:flex-none bg-transparent"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <div className="flex gap-3 flex-1 sm:flex-none sm:ml-auto">
                    <Button
                      variant="outline"
                      onClick={handleSaveDraft}
                      disabled={isLoading}
                      className="flex-1 sm:flex-none bg-transparent"
                    >
                      {isLoading ? "Saving..." : "Save Draft"}
                    </Button>
                    {currentStep > 1 && (
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={isLoading}
                        className="flex-1 sm:flex-none bg-transparent"
                      >
                        Previous
                      </Button>
                    )}
                    {currentStep < 8 && currentStep !== 4 && (
                      <Button
                        onClick={handleNext}
                        disabled={isLoading}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? "Processing..." : "Next"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Document Preview Dialog */}
      <Dialog open={showPreview !== null} onOpenChange={(open) => !open && setShowPreview(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>Preview of the uploaded document.</DialogDescription>
          </DialogHeader>
          {showPreview?.url && <iframe src={showPreview.url} className="w-full h-[500px]" />}
        </DialogContent>
      </Dialog>

      {/* Subscriber Generator Dialog */}
      <SubscriberGenerator
        isOpen={showSubscriberGenerator}
        onClose={() => setShowSubscriberGenerator(false)}
        onSelectSubscribers={() => {}}
        schemeDetails={formData}
      />
    </div>
  )
}
