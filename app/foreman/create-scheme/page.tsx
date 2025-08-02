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
import { format } from "date-fns"
import { CalendarIcon, Check, DollarSign, Users, Upload, FileText, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

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
}

const schemeSteps = [
  {
    id: "chit-details",
    title: "Chit Details",
    description: "Basic scheme information",
    icon: DollarSign,
    status: "current",
  },
  {
    id: "auction-rules",
    title: "Auction Rules",
    description: "Auction timing and frequency",
    icon: Clock,
    status: "pending",
  },
  {
    id: "bidding-rules",
    title: "Bidding Rules",
    description: "Bidding parameters",
    icon: FileText,
    status: "pending",
  },
  {
    id: "terms-fdr",
    title: "Terms & FDR Upload",
    description: "Legal documents and FDR",
    icon: Upload,
    status: "pending",
  },
  {
    id: "pso-generation",
    title: "PSO Generation",
    description: "Auto generate PSO certificate",
    icon: CheckCircle,
    status: "pending",
  },
  {
    id: "subscriber-enrollment",
    title: "Subscriber Enrollment",
    description: "Add subscribers and assign tickets",
    icon: Users,
    status: "pending",
  },
  {
    id: "final-agreement",
    title: "Final Agreement Upload",
    description: "Upload signed agreement",
    icon: Upload,
    status: "pending",
  },
  {
    id: "commencement-certificate",
    title: "Commencement Certificate",
    description: "Final approval and Form 7",
    icon: CheckCircle,
    status: "pending",
  },
]

export default function CreateSchemePage() {
  const router = useRouter()
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
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Generate unique scheme ID on component mount
  useEffect(() => {
    const generateSchemeId = () => {
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
      return `SCH-${timestamp}-${randomStr}`
    }

    if (!formData.schemeId) {
      setFormData((prev) => ({
        ...prev,
        schemeId: generateSchemeId(),
      }))
    }
  }, [formData.schemeId])

  // Auto-calculate monthly premium and end date
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.chitValue || formData.chitValue <= 0) {
      newErrors.chitValue = "Chit value is required and must be greater than 0"
    }

    if (!formData.chitDuration || formData.chitDuration <= 0) {
      newErrors.chitDuration = "Chit duration is required and must be greater than 0"
    }

    if (!formData.chitStartDate) {
      newErrors.chitStartDate = "Chit start date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveDraft = async () => {
    setIsLoading(true)

    try {
      const foremanToken = localStorage.getItem("foremanToken")
      if (!foremanToken) {
        router.push("/auth/login")
        return
      }

      // Create unique storage key to prevent duplicates
      const uniqueKey = `foreman_schemes_${foremanToken}`
      const existingSchemes = JSON.parse(localStorage.getItem(uniqueKey) || "[]")

      // Remove any existing scheme with same ID to prevent duplicates
      const filteredSchemes = existingSchemes.filter((s: SchemeData) => s.schemeId !== formData.schemeId)

      // Add current scheme
      const updatedSchemes = [...filteredSchemes, formData]

      // Save to localStorage
      localStorage.setItem(uniqueKey, JSON.stringify(updatedSchemes))

      // Also save individual draft for easy access
      localStorage.setItem(`scheme_draft_${formData.schemeId}`, JSON.stringify(formData))

      alert("Draft saved successfully!")
    } catch (error) {
      console.error("Error saving draft:", error)
      alert("Error saving draft. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Save current progress
      await handleSaveDraft()

      // Navigate to next step (auction rules)
      router.push(`/foreman/schemes/${formData.schemeId}/auction-rules`)
    } catch (error) {
      console.error("Error proceeding to next step:", error)
      alert("Error proceeding to next step. Please try again.")
    } finally {
      setIsLoading(false)
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
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Draft
            </Badge>
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
                  const isActive = index === 0
                  const isCompleted = false

                  return (
                    <div
                      key={step.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg transition-colors",
                        isActive ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50",
                      )}
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

          {/* Right Content - Chit Details Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">Chit Details</CardTitle>
                <p className="text-sm text-gray-600">Basic scheme information</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chit Value */}
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

                  {/* Chit Duration */}
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

                  {/* Number of Subscribers */}
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

                  {/* Monthly Premium */}
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

                  {/* Chit Start Date */}
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

                  {/* Chit End Date */}
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
                    <Button
                      onClick={handleNext}
                      disabled={isLoading}
                      className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? "Processing..." : "Next"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
