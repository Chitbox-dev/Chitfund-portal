"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SubscriberGenerator } from "./subscriber-generator"
import {
  CheckCircle,
  Upload,
  FileText,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Gavel,
  Save,
  Send,
  Download,
  Eye,
  X,
  Lightbulb,
  Lock,
  RefreshCw,
  Wand2,
  Edit,
  Trash2,
  Phone,
  MapPin,
  CreditCard,
  User,
} from "lucide-react"

const STEPS = [
  {
    id: 1,
    title: "Chit Details",
    description: "Basic scheme information",
    icon: DollarSign,
    phase: 1,
    tips: [
      "Chit value should be realistic and achievable",
      "Duration equals number of subscribers (1 subscriber per month)",
      "Monthly premium is auto-calculated for convenience",
    ],
  },
  {
    id: 2,
    title: "Auction Rules",
    description: "Auction timing and frequency",
    icon: Calendar,
    phase: 1,
    tips: [
      "Choose auction frequency based on subscriber convenience",
      "Allow sufficient time between auctions for payments",
      "Set auction duration to allow fair bidding time",
    ],
  },
  {
    id: 3,
    title: "Bidding Rules",
    description: "Bidding parameters",
    icon: Gavel,
    phase: 1,
    tips: [
      "Minimum bid is 5% of chit value (regulatory requirement)",
      "Maximum bid is 30% of chit value (regulatory limit)",
      "Choose bid increment that encourages participation",
    ],
  },
  {
    id: 4,
    title: "Terms & FDR Upload",
    description: "Legal documents and FDR",
    icon: Upload,
    phase: 1,
    tips: [
      "All documents must be in PDF format",
      "Ensure documents are clear and readable",
      "File size should not exceed 5MB per document",
      "FDR must be 10% of chit value as per regulations",
    ],
  },
  {
    id: 5,
    title: "PSO Generation",
    description: "Auto generate PSO certificate",
    icon: CheckCircle,
    phase: 2,
    tips: [
      "PSO certificate is auto-generated after admin approval of Steps 1-4",
      "PSO certificate must be downloaded for records",
    ],
  },
  {
    id: 6,
    title: "Subscriber Enrollment",
    description: "Add subscribers and assign tickets",
    icon: Users,
    phase: 2,
    tips: [
      "Ensure all subscriber details are accurate",
      "UCFSIN verification is mandatory",
      "Assign tickets sequentially for fairness",
      "Use the generator to create sample subscribers with proper UCFSIN format",
    ],
  },
  {
    id: 7,
    title: "Final Agreement Upload",
    description: "Upload signed agreement",
    icon: FileText,
    phase: 2,
    tips: [
      "Upload final signed agreement with all subscribers",
      "Ensure all signatures are present and clear",
      "Document should be in PDF format",
    ],
  },
  {
    id: 8,
    title: "Commencement Certificate",
    description: "Final approval and Form 7",
    icon: CheckCircle,
    phase: 2,
    tips: [
      "Admin will review final agreement",
      "Form 7 (Commencement Certificate) will be auto-generated",
      "Scheme becomes live after final approval",
    ],
  },
]

// Updated status enum to match the exact workflow
enum SchemeStatus {
  Draft = "draft",
  Submitted = "submitted", // Steps 1-4 submitted for review
  Steps1_4_Approved = "steps_1_4_approved", // Admin approved steps 1-4, PSO request enabled
  PSO_Approved = "pso_approved", // Admin approved PSO, subscriber enrollment unlocked
  Subscribers_Added = "subscribers_added", // Foreman added subscribers
  Final_Agreement_Uploaded = "final_agreement_uploaded", // Foreman uploaded final agreement
  Commencement_Approved = "commencement_approved", // Admin approved, Form 7 generated
  Live = "live", // Scheme is active
}

const DEFAULT_STEP_STATUS = {
  1: "draft",
  2: "locked",
  3: "locked",
  4: "locked",
  5: "locked", // PSO Request
  6: "locked", // Subscriber Enrollment
  7: "locked", // Final Agreement
  8: "locked", // Commencement Certificate
}

const INITIAL_FORM_DATA = {
  // Generate later - Allow multiple schemes without restriction
  schemeId: "",
  schemeStatus: SchemeStatus.Draft,
  stepStatus: { ...DEFAULT_STEP_STATUS },
  adminComments: {},

  // Step 1
  chitValue: "",
  chitDuration: "",
  numberOfSubscribers: "",
  monthlyPremium: "",
  chitStartDate: "",
  chitEndDate: "",

  // Step 2
  auctionFrequency: "",
  auctionStartDate: "",
  auctionEndDate: "",
  auctionStartTime: "",
  auctionDuration: "",
  auctionEndTime: "",

  // Step 3
  minimumBid: "",
  maximumBid: "",
  bidIncrement: "250",
  manualIncrement: "",

  // Step 4
  commissionStructure: null,
  termsOfWithdrawal: null,
  liabilitiesDocument: null,
  subscriberRights: null,
  fdrDocument: null,
  draftAgreement: null,

  // PSO
  psoNumber: "",
  psoDocument: null,
  psoGeneratedDate: "",

  // Step 6
  subscribers: [],
  ticketsAssigned: 0,

  // Step 7
  finalAgreement: null,

  // Step 8
  commencementCertificate: null,
}

export function CreateSchemeForm({
  onCancel = () => {},
  onSuccess = () => {},
}: { onCancel?: () => void; onSuccess?: () => void }) {
  const searchParams = useSearchParams()
  const schemeIdFromUrl = searchParams?.get("schemeId")
  const stepFromUrl = searchParams?.get("step")

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(() => ({
    ...INITIAL_FORM_DATA,
    // Always generate new scheme ID - no restriction on multiple schemes
    schemeId: schemeIdFromUrl || `SCH-${Date.now()}`,
  }))

  const [errors, setErrors] = useState({})
  const [uploadProgress, setUploadProgress] = useState({})
  const [showPreview, setShowPreview] = useState(null)
  const [showTips, setShowTips] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(Date.now())
  const [showSubscriberGenerator, setShowSubscriberGenerator] = useState(false)
  const [editingSubscriber, setEditingSubscriber] = useState(null)

  // Ref to persist auto-refresh interval
  const autoRefreshInterval = useRef(null)

  // Load existing scheme data if schemeId is provided, otherwise start fresh
  useEffect(() => {
    console.log("Loading scheme data...", { schemeIdFromUrl, stepFromUrl })
    if (schemeIdFromUrl) {
      loadExistingScheme(schemeIdFromUrl)
    } else {
      // Always start with a fresh scheme when creating new - no restrictions
      const newSchemeId = `SCH-${Date.now()}`
      setFormData({
        ...INITIAL_FORM_DATA,
        schemeId: newSchemeId,
      })
    }
  }, [schemeIdFromUrl])

  // Set current step from URL parameter after data is loaded
  useEffect(() => {
    if (stepFromUrl && formData.schemeId) {
      const targetStep = Number.parseInt(stepFromUrl)
      if (targetStep >= 1 && targetStep <= 8 && canAccessStep(targetStep)) {
        console.log("Setting step from URL:", targetStep)
        setCurrentStep(targetStep)
      }
    }
  }, [stepFromUrl, formData.schemeId, formData.schemeStatus])

  const loadExistingScheme = (schemeId) => {
    try {
      console.log("Loading existing scheme:", schemeId)

      // Check all possible locations for the scheme
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const liveSchemes = JSON.parse(localStorage.getItem("liveSchemes") || "[]")

      let existingScheme = null

      // Find scheme in any of the lists
      existingScheme =
        pendingSchemes.find((s) => s.schemeId === schemeId) ||
        approvedSchemes.find((s) => s.schemeId === schemeId) ||
        liveSchemes.find((s) => s.schemeId === schemeId)

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
        console.log("Found existing scheme:", existingScheme)
        console.log("Scheme status:", existingScheme.schemeStatus)

        setFormData({
          ...INITIAL_FORM_DATA,
          ...existingScheme,
          stepStatus: { ...DEFAULT_STEP_STATUS, ...(existingScheme.stepStatus || {}) },
        })

        // Set current step based on scheme status and URL parameter
        const targetStep = Number.parseInt(stepFromUrl) || getLastAccessibleStep(existingScheme)
        console.log("Setting target step:", targetStep)
        setCurrentStep(targetStep)
      } else {
        console.log("Scheme not found, creating new scheme")
        // Create new scheme with fresh ID
        const newSchemeId = `SCH-${Date.now()}`
        setFormData({
          ...INITIAL_FORM_DATA,
          schemeId: newSchemeId,
        })
      }
    } catch (error) {
      console.error("Error loading existing scheme:", error)
      // Create new scheme on error
      const newSchemeId = `SCH-${Date.now()}`
      setFormData({
        ...INITIAL_FORM_DATA,
        schemeId: newSchemeId,
      })
    }
  }

  // Auto-calculate fields
  useEffect(() => {
    if (formData.chitValue && formData.chitDuration) {
      const monthlyPremium = Math.round(Number.parseFloat(formData.chitValue) / Number.parseInt(formData.chitDuration))
      setFormData((prev) => ({ ...prev, monthlyPremium: monthlyPremium.toString() }))
    }
  }, [formData.chitValue, formData.chitDuration])

  useEffect(() => {
    if (formData.chitStartDate && formData.chitDuration) {
      const startDate = new Date(formData.chitStartDate)
      const endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth() + Number.parseInt(formData.chitDuration))
      setFormData((prev) => ({ ...prev, chitEndDate: endDate.toISOString().split("T")[0] }))
    }
  }, [formData.chitStartDate, formData.chitDuration])

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

  useEffect(() => {
    if (formData.chitValue) {
      const chitValue = Number.parseFloat(formData.chitValue)
      const minimumBid = Math.round(chitValue * 0.05)
      const maximumBid = Math.round(chitValue * 0.3)
      setFormData((prev) => ({
        ...prev,
        minimumBid: minimumBid.toString(),
        maximumBid: maximumBid.toString(),
      }))
    }
  }, [formData.chitValue])

  const getLastAccessibleStep = (data) => {
    const status = data.schemeStatus || SchemeStatus.Draft
    console.log("Getting last accessible step for status:", status)

    switch (status) {
      case SchemeStatus.Draft:
        return 1
      case SchemeStatus.Submitted:
        return 4 // Can access steps 1-4, but stay on 4 to show submission status
      case SchemeStatus.PSO_Approved: // PSO is automatically generated after steps 1-4 approval
        return 6 // Can access subscriber enrollment directly
      case SchemeStatus.Subscribers_Added:
        return 7 // Can access final agreement upload
      case SchemeStatus.Final_Agreement_Uploaded:
        return 8 // Can view commencement certificate status
      case SchemeStatus.Commencement_Approved:
      case SchemeStatus.Live:
        return 8 // Scheme is complete
      default:
        return 1
    }
  }

  const canAccessStep = (stepId) => {
    const status = formData.schemeStatus || SchemeStatus.Draft
    console.log("Checking access for step", stepId, "with status", status)

    switch (status) {
      case SchemeStatus.Draft:
        return stepId <= 4 // Can access steps 1-4
      case SchemeStatus.Submitted:
        return stepId <= 4 // Can access steps 1-4
      case SchemeStatus.PSO_Approved: // PSO automatically generated
        return stepId <= 6 // Can access up to subscriber enrollment (skip step 5 request)
      case SchemeStatus.Subscribers_Added:
        return stepId <= 7 // Can access up to final agreement
      case SchemeStatus.Final_Agreement_Uploaded:
      case SchemeStatus.Commencement_Approved:
      case SchemeStatus.Live:
        return stepId <= 8 // Can access all steps
      default:
        return stepId === 1
    }
  }

  const validateSteps1to4 = () => {
    const newErrors = {}

    // Step 1 validation
    if (!formData.chitValue || Number.parseFloat(formData.chitValue) <= 0) {
      newErrors.chitValue = "Valid chit value is required"
    }
    if (!formData.chitDuration || Number.parseInt(formData.chitDuration) <= 0) {
      newErrors.chitDuration = "Valid duration is required"
    }
    if (!formData.numberOfSubscribers || Number.parseInt(formData.numberOfSubscribers) <= 0) {
      newErrors.numberOfSubscribers = "Valid number of subscribers is required"
    }
    if (!formData.chitStartDate) {
      newErrors.chitStartDate = "Start date is required"
    }

    // Validate that subscribers equal duration
    if (formData.numberOfSubscribers && formData.chitDuration) {
      const subscribers = Number.parseInt(formData.numberOfSubscribers)
      const duration = Number.parseInt(formData.chitDuration)
      if (subscribers !== duration) {
        newErrors.numberOfSubscribers = "Number of subscribers must equal duration"
      }
    }

    // Step 2 validation
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

    // Step 3 validation
    if (
      formData.bidIncrement === "manual" &&
      (!formData.manualIncrement || Number.parseFloat(formData.manualIncrement) <= 0)
    ) {
      newErrors.manualIncrement = "Valid manual increment value is required"
    }

    // Step 4 validation - Check all required documents
    const requiredDocuments = [
      { field: "commissionStructure", name: "Commission structure document" },
      { field: "termsOfWithdrawal", name: "Terms of withdrawal document" },
      { field: "liabilitiesDocument", name: "Liabilities document" },
      { field: "subscriberRights", name: "Subscriber rights document" },
      { field: "fdrDocument", name: "FDR document" },
      { field: "draftAgreement", name: "Draft agreement" },
    ]

    requiredDocuments.forEach((doc) => {
      if (!formData[doc.field]) {
        newErrors[doc.field] = `${doc.name} is required`
      }
    })

    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0

    if (!isValid) {
      console.log("Validation errors:", newErrors)
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0]
      const errorElement = document.getElementById(firstErrorField)
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    return isValid
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 6:
        if (!formData.subscribers || formData.subscribers.length === 0) {
          newErrors.subscribers = "At least one subscriber is required"
        }
        break

      case 7:
        if (!formData.finalAgreement) newErrors.finalAgreement = "Final signed agreement is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Enhanced file upload function that creates preview URLs
  const handleFileUpload = (fieldName, file) => {
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

          // Create a document object with preview URL
          const documentObject = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            url: URL.createObjectURL(file), // Create blob URL for preview
            uploadedAt: new Date().toISOString(),
            file: file, // Keep reference to original file
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

  const handleSubmitSteps1to4 = async () => {
    if (!validateSteps1to4()) {
      return
    }

    setIsSubmitting(true)

    try {
      const updatedFormData = {
        ...formData,
        schemeStatus: SchemeStatus.Submitted,
        lastUpdated: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        // Add additional required fields for admin review
        schemeName: `Scheme ${formData.schemeId}`,
        totalValue: Number.parseFloat(formData.chitValue),
        totalSubscribers: Number.parseInt(formData.numberOfSubscribers),
        duration: Number.parseInt(formData.chitDuration),
        installmentAmount: Number.parseFloat(formData.monthlyPremium),
        commissionRate: "5", // Default commission rate
        foremanName: "Current Foreman", // This should come from logged in user
        foremanEmail: "foreman@example.com", // This should come from logged in user
        foremanPhone: "+91 9876543210", // This should come from logged in user
        foremanCompany: "Foreman Company", // This should come from logged in user
        submittedDate: new Date().toISOString(),
        documents: [
          formData.commissionStructure,
          formData.termsOfWithdrawal,
          formData.liabilitiesDocument,
          formData.subscriberRights,
          formData.fdrDocument,
          formData.draftAgreement,
        ].filter(Boolean), // Remove null documents
      }

      console.log("Submitting steps 1-4:", updatedFormData)

      setFormData(updatedFormData)

      // Save to draft first
      localStorage.setItem("schemeDraft", JSON.stringify(updatedFormData))

      // Save to pending schemes for admin review
      const existingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const schemeIndex = existingSchemes.findIndex((s) => s.schemeId === formData.schemeId)

      if (schemeIndex >= 0) {
        // Update existing scheme
        existingSchemes[schemeIndex] = updatedFormData
      } else {
        // Add new scheme
        existingSchemes.push(updatedFormData)
      }

      localStorage.setItem("pendingSchemes", JSON.stringify(existingSchemes))
      console.log("Saved to pendingSchemes:", existingSchemes)

      // Also save to allSchemes for the admin schemes page
      const allSchemes = JSON.parse(localStorage.getItem("allSchemes") || "[]")
      const allSchemeIndex = allSchemes.findIndex((s) => s.schemeId === formData.schemeId)

      if (allSchemeIndex >= 0) {
        allSchemes[allSchemeIndex] = updatedFormData
      } else {
        allSchemes.push(updatedFormData)
      }
      localStorage.setItem("allSchemes", JSON.stringify(allSchemes))

      alert(
        "Steps 1-4 submitted for admin approval successfully! You will be notified once the admin reviews your submission.",
      )

      // Optionally redirect to schemes list
      // window.location.href = "/foreman/schemes"
    } catch (error) {
      console.error("Error submitting steps:", error)
      alert("Error submitting steps. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveSubscribers = async () => {
    if (!validateStep(6)) {
      return
    }

    setIsSubmitting(true)

    try {
      const updatedFormData = {
        ...formData,
        schemeStatus: SchemeStatus.Subscribers_Added,
        lastUpdated: new Date().toISOString(),
      }

      setFormData(updatedFormData)
      localStorage.setItem("schemeDraft", JSON.stringify(updatedFormData))

      alert("Subscribers saved successfully!")
      setCurrentStep(7) // Move to next step
    } catch (error) {
      console.error("Error saving subscribers:", error)
      alert("Error saving subscribers. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitFinalAgreement = async () => {
    if (!validateStep(7)) {
      return
    }

    setIsSubmitting(true)

    try {
      const updatedFormData = {
        ...formData,
        schemeStatus: SchemeStatus.Final_Agreement_Uploaded,
        lastUpdated: new Date().toISOString(),
      }

      setFormData(updatedFormData)
      localStorage.setItem("schemeDraft", JSON.stringify(updatedFormData))

      // Update pending schemes for admin review
      const existingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const schemeIndex = existingSchemes.findIndex((s) => s.schemeId === formData.schemeId)

      if (schemeIndex >= 0) {
        existingSchemes[schemeIndex] = updatedFormData
      } else {
        existingSchemes.push(updatedFormData)
      }

      localStorage.setItem("pendingSchemes", JSON.stringify(existingSchemes))

      alert("Final agreement submitted for admin approval!")
      setCurrentStep(8) // Move to final step
    } catch (error) {
      console.error("Error submitting final agreement:", error)
      alert("Error submitting final agreement. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRefreshStatus = async () => {
    setRefreshing(true)
    console.log("Refreshing status for scheme:", formData.schemeId)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check all possible locations for scheme updates
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const liveSchemes = JSON.parse(localStorage.getItem("liveSchemes") || "[]")

      console.log("Checking schemes:", { pendingSchemes, approvedSchemes, liveSchemes })

      // Find current scheme in any list
      const currentScheme =
        pendingSchemes.find((s) => s.schemeId === formData.schemeId) ||
        approvedSchemes.find((s) => s.schemeId === formData.schemeId) ||
        liveSchemes.find((s) => s.schemeId === formData.schemeId)

      console.log("Found current scheme:", currentScheme)

      if (currentScheme && currentScheme.schemeStatus !== formData.schemeStatus) {
        // Status has been updated by admin
        console.log("Status updated from", formData.schemeStatus, "to", currentScheme.schemeStatus)

        setFormData(currentScheme)
        localStorage.setItem("schemeDraft", JSON.stringify(currentScheme))

        const lastAccessibleStep = getLastAccessibleStep(currentScheme)
        setCurrentStep(lastAccessibleStep)
        setLastRefresh(Date.now())

        // Show notification about status change
        const statusMessages = {
          [SchemeStatus.PSO_Approved]:
            "Great! Steps 1-4 approved and PSO certificate generated automatically. You can now add subscribers.",
          [SchemeStatus.Live]: "Congratulations! Your scheme is now LIVE!",
        }

        if (statusMessages[currentScheme.schemeStatus]) {
          alert(statusMessages[currentScheme.schemeStatus])
        }
      } else {
        console.log("No status change detected")
        setLastRefresh(Date.now())
      }
    } catch (error) {
      console.error("Error refreshing status:", error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      lastSaved: new Date().toISOString(),
    }
    localStorage.setItem("schemeDraft", JSON.stringify(draftData))
    alert("Draft saved successfully!")
  }

  const handleAddSubscriber = () => {
    const existingSubscribers = formData.subscribers || []
    const nextTicketNumber = existingSubscribers.length + 1

    const newSubscriber = {
      id: Date.now(),
      ticketNumber: nextTicketNumber,
      name: "",
      mobile: "",
      ucfsin: "",
      address: "",
      paymentStatus: "pending",
      isGenerated: false,
      joinedDate: new Date().toISOString(),
    }

    setFormData((prev) => ({
      ...prev,
      subscribers: [...existingSubscribers, newSubscriber],
    }))
  }

  const handleUpdateSubscriber = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      subscribers: (prev.subscribers || []).map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub)),
    }))
  }

  const handleRemoveSubscriber = (id) => {
    setFormData((prev) => ({
      ...prev,
      subscribers: (prev.subscribers || []).filter((sub) => sub.id !== id),
    }))
  }

  const handleEditSubscriber = (subscriber) => {
    setEditingSubscriber(subscriber)
  }

  const handleSaveEditSubscriber = () => {
    if (editingSubscriber) {
      handleUpdateSubscriber(editingSubscriber.id, "name", editingSubscriber.name)
      handleUpdateSubscriber(editingSubscriber.id, "mobile", editingSubscriber.mobile)
      handleUpdateSubscriber(editingSubscriber.id, "ucfsin", editingSubscriber.ucfsin)
      handleUpdateSubscriber(editingSubscriber.id, "address", editingSubscriber.address)
      setEditingSubscriber(null)
    }
  }

  // Handle adding generated subscribers
  const handleAddGeneratedSubscribers = (generatedSubscribers) => {
    const existingSubscribers = formData.subscribers || []
    const nextTicketNumber = existingSubscribers.length + 1

    // Update ticket numbers for generated subscribers
    const subscribersWithTickets = generatedSubscribers.map((sub, index) => ({
      ...sub,
      ticketNumber: nextTicketNumber + index,
      id: Date.now() + index + Math.random(), // Ensure unique IDs
      joinedDate: new Date().toISOString(),
    }))

    setFormData((prev) => ({
      ...prev,
      subscribers: [...existingSubscribers, ...subscribersWithTickets],
    }))

    // Show success message
    alert(`Successfully added ${generatedSubscribers.length} subscribers to the enrollment list!`)
  }

  const getStatusBadge = () => {
    switch (formData.schemeStatus) {
      case SchemeStatus.Draft:
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case SchemeStatus.Submitted:
        return <Badge className="bg-yellow-100 text-yellow-800">Submitted for Review</Badge>
      case SchemeStatus.Steps1_4_Approved:
        return <Badge className="bg-blue-100 text-blue-800">Steps 1-4 Approved</Badge>
      case SchemeStatus.PSO_Approved:
        return <Badge className="bg-green-100 text-green-800">PSO Approved</Badge>
      case SchemeStatus.Subscribers_Added:
        return <Badge className="bg-purple-100 text-purple-800">Subscribers Added</Badge>
      case SchemeStatus.Final_Agreement_Uploaded:
        return <Badge className="bg-indigo-100 text-indigo-800">Final Agreement Uploaded</Badge>
      case SchemeStatus.Commencement_Approved:
        return <Badge className="bg-emerald-100 text-emerald-800">Commencement Approved</Badge>
      case SchemeStatus.Live:
        return <Badge className="bg-green-100 text-green-800">Live</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const currentStepData = STEPS.find((step) => step.id === currentStep)

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="chitValue" className="flex items-center gap-2">
                  Chit Value (₹)
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="chitValue"
                  type="number"
                  placeholder="e.g., 1000000"
                  value={formData.chitValue}
                  onChange={(e) => setFormData((prev) => ({ ...prev, chitValue: e.target.value }))}
                  className={errors.chitValue ? "border-red-500" : ""}
                  disabled={formData.schemeStatus !== SchemeStatus.Draft}
                />
                {errors.chitValue && <p className="text-sm text-red-500">{errors.chitValue}</p>}
                <p className="text-xs text-gray-500">Total amount to be distributed among subscribers</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chitDuration" className="flex items-center gap-2">
                  Chit Duration (months)
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="chitDuration"
                  type="number"
                  placeholder="e.g., 20"
                  value={formData.chitDuration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, chitDuration: e.target.value }))}
                  className={errors.chitDuration ? "border-red-500" : ""}
                  disabled={formData.schemeStatus !== SchemeStatus.Draft}
                />
                {errors.chitDuration && <p className="text-sm text-red-500">{errors.chitDuration}</p>}
                <p className="text-xs text-gray-500">Number of months the scheme will run</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfSubscribers" className="flex items-center gap-2">
                  Number of Subscribers
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="numberOfSubscribers"
                  type="number"
                  placeholder="Must equal duration"
                  value={formData.numberOfSubscribers}
                  onChange={(e) => setFormData((prev) => ({ ...prev, numberOfSubscribers: e.target.value }))}
                  className={errors.numberOfSubscribers ? "border-red-500" : ""}
                  disabled={formData.schemeStatus !== SchemeStatus.Draft}
                />
                {errors.numberOfSubscribers && <p className="text-sm text-red-500">{errors.numberOfSubscribers}</p>}
                <p className="text-xs text-gray-500">Must equal duration (1 subscriber per month)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyPremium">Monthly Premium (₹)</Label>
                <Input
                  id="monthlyPremium"
                  type="number"
                  value={formData.monthlyPremium}
                  readOnly
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">Auto-calculated: Chit Value ÷ Duration</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chitStartDate" className="flex items-center gap-2">
                  Chit Start Date
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="chitStartDate"
                  type="date"
                  value={formData.chitStartDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, chitStartDate: e.target.value }))}
                  className={errors.chitStartDate ? "border-red-500" : ""}
                  disabled={formData.schemeStatus !== SchemeStatus.Draft}
                />
                {errors.chitStartDate && <p className="text-sm text-red-500">{errors.chitStartDate}</p>}
                <p className="text-xs text-gray-500">When the scheme will commence</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chitEndDate">Chit End Date</Label>
                <Input id="chitEndDate" type="date" value={formData.chitEndDate} readOnly className="bg-gray-50" />
                <p className="text-xs text-gray-500">Auto-calculated: Start Date + Duration</p>
              </div>
            </div>
          </div>
        )

      case 2:
        if (!canAccessStep(2)) {
          return (
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Step Locked</h3>
              <p className="text-gray-500">Complete Step 1 to unlock this step.</p>
            </div>
          )
        }

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="auctionFrequency" className="flex items-center gap-2">
                  Auction Frequency
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.auctionFrequency}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, auctionFrequency: value }))}
                  disabled={formData.schemeStatus !== SchemeStatus.Draft}
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
                  Auction Start Date
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="auctionStartDate"
                  type="date"
                  value={formData.auctionStartDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, auctionStartDate: e.target.value }))}
                  className={errors.auctionStartDate ? "border-red-500" : ""}
                  disabled={formData.schemeStatus !== SchemeStatus.Draft}
                />
                {errors.auctionStartDate && <p className="text-sm text-red-500">{errors.auctionStartDate}</p>}
                <p className="text-xs text-gray-500">When auctions will begin</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionStartTime" className="flex items-center gap-2">
                  Auction Start Time
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="auctionStartTime"
                  type="time"
                  value={formData.auctionStartTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, auctionStartTime: e.target.value }))}
                  className={errors.auctionStartTime ? "border-red-500" : ""}
                  disabled={formData.schemeStatus !== SchemeStatus.Draft}
                />
                {errors.auctionStartTime && <p className="text-sm text-red-500">{errors.auctionStartTime}</p>}
                <p className="text-xs text-gray-500">Daily auction start time</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionDuration" className="flex items-center gap-2">
                  Auction Duration (hours)
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="auctionDuration"
                  type="number"
                  min="1"
                  max="8"
                  placeholder="e.g., 2"
                  value={formData.auctionDuration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, auctionDuration: e.target.value }))}
                  className={errors.auctionDuration ? "border-red-500" : ""}
                  disabled={formData.schemeStatus !== SchemeStatus.Draft}
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
        if (!canAccessStep(3)) {
          return (
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Step Locked</h3>
              <p className="text-gray-500">Complete previous steps to unlock this step.</p>
            </div>
          )
        }

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
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, bidIncrement: value }))}
                  disabled={formData.schemeStatus !== SchemeStatus.Draft}
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
                    Manual Increment (₹)
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="manualIncrement"
                    type="number"
                    placeholder="Enter custom increment"
                    value={formData.manualIncrement}
                    onChange={(e) => setFormData((prev) => ({ ...prev, manualIncrement: e.target.value }))}
                    className={errors.manualIncrement ? "border-red-500" : ""}
                    disabled={formData.schemeStatus !== SchemeStatus.Draft}
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
        if (!canAccessStep(4)) {
          return (
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Step Locked</h3>
              <p className="text-gray-500">Complete previous steps to unlock this step.</p>
            </div>
          )
        }

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

                  {formData[field.key] ? (
                    <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-900 text-sm truncate max-w-[200px]">
                              {formData[field.key].name}
                            </p>
                            <p className="text-xs text-green-700">
                              Uploaded: {new Date(formData[field.key].uploadedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPreview(formData[field.key])}
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
                            disabled={formData.schemeStatus !== SchemeStatus.Draft}
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
                          disabled={formData.schemeStatus !== SchemeStatus.Draft}
                        />
                        <label
                          htmlFor={`upload-${field.key}`}
                          className={`cursor-pointer ${
                            formData.schemeStatus !== SchemeStatus.Draft ? "cursor-not-allowed opacity-50" : ""
                          }`}
                        >
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
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                >
                  {isSubmitting ? (
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

            {formData.schemeStatus === SchemeStatus.Submitted && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-medium text-yellow-900">Submitted for Admin Review</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  Your steps 1-4 have been submitted and are under admin review. You'll be notified once approved.
                </p>
                <Button
                  onClick={handleRefreshStatus}
                  disabled={refreshing}
                  variant="outline"
                  size="sm"
                  className="mt-3 bg-transparent"
                >
                  {refreshing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Check Status
                    </>
                  )}
                </Button>
                <p className="text-xs text-yellow-700 mt-2">
                  Last checked: {new Date(lastRefresh).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        )

      case 5:
        if (!canAccessStep(5)) {
          return (
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Step Locked</h3>
              <p className="text-gray-500">Admin approval of Steps 1-4 required to unlock PSO certificate.</p>
              <Button
                onClick={handleRefreshStatus}
                disabled={refreshing}
                variant="outline"
                className="mt-4 bg-transparent"
              >
                {refreshing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Check Approval Status
                  </>
                )}
              </Button>
            </div>
          )
        }

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

            {formData.schemeStatus === SchemeStatus.PSO_Approved && formData.psoDocument && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-2">PSO Certificate Generated!</h3>
                <p className="text-green-800 mb-4">
                  Your PSO certificate has been automatically generated after admin approval. Download it for your
                  records.
                </p>

                <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">PSO Certificate</p>
                      <p className="text-sm text-green-700">PSO Number: {formData.psoNumber}</p>
                      <p className="text-xs text-green-600">
                        Generated: {new Date(formData.psoGeneratedDate).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(formData.psoDocument)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                      >
                        <a href={formData.psoDocument.url} download={formData.psoDocument.name}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={() => setCurrentStep(6)} className="bg-green-600 hover:bg-green-700 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Proceed to Subscriber Enrollment
                </Button>
              </div>
            )}

            {formData.schemeStatus !== SchemeStatus.PSO_Approved && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-yellow-900 mb-2">Awaiting Admin Approval</h3>
                <p className="text-yellow-800 mb-4">
                  Your Steps 1-4 are under admin review. PSO certificate will be generated automatically upon approval.
                </p>
                <Button
                  onClick={handleRefreshStatus}
                  disabled={refreshing}
                  variant="outline"
                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 bg-transparent"
                >
                  {refreshing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Check Approval Status
                    </>
                  )}
                </Button>
                <p className="text-xs text-yellow-700 mt-2">
                  Last checked: {new Date(lastRefresh).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        )

      case 6:
        if (!canAccessStep(6)) {
          return (
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Step Locked</h3>
              <p className="text-gray-500">PSO approval required to unlock subscriber enrollment.</p>
            </div>
          )
        }

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Subscriber Enrollment</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.subscribers?.length || 0} of {formData.numberOfSubscribers || 0} subscribers enrolled
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowSubscriberGenerator(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Random Subscribers
                </Button>
                <Button onClick={handleAddSubscriber} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Add Subscriber Manually
                </Button>
              </div>
            </div>

            {/* Subscribers List */}
            <div className="space-y-4">
              {formData.subscribers?.map((subscriber, index) => (
                <Card
                  key={subscriber.id}
                  className={`p-4 transition-all duration-200 ${
                    subscriber.isGenerated ? "border-purple-200 bg-purple-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Ticket Number */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        #{subscriber.ticketNumber.toString().padStart(2, "0")}
                      </span>
                    </div>

                    {/* Subscriber Details */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <Label className="text-xs text-gray-500">Name</Label>
                          {editingSubscriber?.id === subscriber.id ? (
                            <Input
                              value={editingSubscriber.name}
                              onChange={(e) => setEditingSubscriber({ ...editingSubscriber, name: e.target.value })}
                              className="h-8 text-sm"
                            />
                          ) : (
                            <p className="font-semibold text-gray-900">{subscriber.name || "Not provided"}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <div>
                          <Label className="text-xs text-gray-500">Mobile</Label>
                          {editingSubscriber?.id === subscriber.id ? (
                            <Input
                              value={editingSubscriber.mobile}
                              onChange={(e) => setEditingSubscriber({ ...editingSubscriber, mobile: e.target.value })}
                              className="h-8 text-sm font-mono"
                            />
                          ) : (
                            <p className="font-mono text-gray-900">{subscriber.mobile || "Not provided"}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <div>
                          <Label className="text-xs text-gray-500">UCFSIN</Label>
                          {editingSubscriber?.id === subscriber.id ? (
                            <Input
                              value={editingSubscriber.ucfsin}
                              onChange={(e) => setEditingSubscriber({ ...editingSubscriber, ucfsin: e.target.value })}
                              className="h-8 text-sm font-mono"
                            />
                          ) : (
                            <p className="font-mono text-sm text-gray-900">{subscriber.ucfsin || "Not provided"}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <div>
                          <Label className="text-xs text-gray-500">Address</Label>
                          {editingSubscriber?.id === subscriber.id ? (
                            <Input
                              value={editingSubscriber.address}
                              onChange={(e) => setEditingSubscriber({ ...editingSubscriber, address: e.target.value })}
                              className="h-8 text-sm"
                            />
                          ) : (
                            <p className="text-sm text-gray-600 truncate max-w-[200px]" title={subscriber.address}>
                              {subscriber.address || "Not provided"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {subscriber.isGenerated && (
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">Generated</Badge>
                      )}

                      {editingSubscriber?.id === subscriber.id ? (
                        <div className="flex gap-1">
                          <Button
                            onClick={handleSaveEditSubscriber}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white h-8 px-2"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => setEditingSubscriber(null)}
                            size="sm"
                            variant="outline"
                            className="h-8 px-2"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          <Button
                            onClick={() => handleEditSubscriber(subscriber)}
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50 h-8 px-2"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => handleRemoveSubscriber(subscriber.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 h-8 px-2"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Info Row */}
                  <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                    <span>Added: {new Date(subscriber.joinedDate).toLocaleDateString()}</span>
                    <Badge
                      variant="outline"
                      className={
                        subscriber.paymentStatus === "paid"
                          ? "border-green-200 text-green-700"
                          : "border-yellow-200 text-yellow-700"
                      }
                    >
                      {subscriber.paymentStatus === "paid" ? "Payment Complete" : "Payment Pending"}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {(!formData.subscribers || formData.subscribers.length === 0) && (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Subscribers Added Yet</h3>
                <p className="text-gray-500 mb-4">
                  Start by generating random subscribers for testing or add subscribers manually.
                </p>
                <div className="flex justify-center gap-3">
                  <Button
                    onClick={() => setShowSubscriberGenerator(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Random Subscribers
                  </Button>
                  <Button onClick={handleAddSubscriber} variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Add Manually
                  </Button>
                </div>
              </div>
            )}

            {/* Progress Summary */}
            {formData.subscribers && formData.subscribers.length > 0 && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900">Enrollment Progress</h4>
                    <p className="text-sm text-blue-700">
                      {formData.subscribers.length} of {formData.numberOfSubscribers || 0} subscribers enrolled
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-900">
                      {Math.round((formData.subscribers.length / (Number(formData.numberOfSubscribers) || 1)) * 100)}%
                    </div>
                    <div className="text-xs text-blue-600">Complete</div>
                  </div>
                </div>
                <Progress
                  value={(formData.subscribers.length / (Number(formData.numberOfSubscribers) || 1)) * 100}
                  className="mt-3 h-2"
                />
              </Card>
            )}

            {/* Save Button */}
            {formData.subscribers && formData.subscribers.length > 0 && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleSaveSubscribers}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Saving Subscribers...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save {formData.subscribers.length} Subscribers & Continue
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )

      case 7:
        if (!canAccessStep(7)) {
          return (
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Step Locked</h3>
              <p className="text-gray-500">Add subscribers in the previous step to unlock this step.</p>
            </div>
          )
        }

        return (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">Final Agreement Upload Guidelines</h4>
                  <ul className="mt-2 text-sm text-amber-800 space-y-1">
                    <li>• Upload the final signed agreement with all subscribers</li>
                    <li>• Ensure all signatures are present and clear</li>
                    <li>• Document should be in PDF format</li>
                    <li>• Maximum file size: 5MB</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium">
                Final Signed Agreement
                <span className="text-red-500">*</span>
              </Label>

              {formData.finalAgreement ? (
                <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900 text-sm truncate max-w-[200px]">
                          {formData.finalAgreement.name}
                        </p>
                        <p className="text-xs text-green-700">
                          Uploaded: {new Date(formData.finalAgreement.uploadedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(formData.finalAgreement)}
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
                          setFormData((prev) => ({ ...prev, finalAgreement: null }))
                          setErrors((prev) => ({ ...prev, finalAgreement: null }))
                        }}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        disabled={formData.schemeStatus !== SchemeStatus.Subscribers_Added}
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
                      errors.finalAgreement
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
                          handleFileUpload("finalAgreement", file)
                        }
                      }}
                      className="hidden"
                      id="upload-finalAgreement"
                      disabled={formData.schemeStatus !== SchemeStatus.Subscribers_Added}
                    />
                    <label
                      htmlFor="upload-finalAgreement"
                      className={`cursor-pointer ${
                        formData.schemeStatus !== SchemeStatus.Subscribers_Added ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Click to upload Final Agreement</p>
                      <p className="text-xs text-gray-500 mt-1">PDF files only, max 5MB</p>
                    </label>
                  </div>

                  {uploadProgress.finalAgreement !== undefined && uploadProgress.finalAgreement < 100 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress.finalAgreement}%</span>
                      </div>
                      <Progress value={uploadProgress.finalAgreement} className="h-2" />
                    </div>
                  )}

                  {errors.finalAgreement && <p className="text-sm text-red-500">{errors.finalAgreement}</p>}
                </div>
              )}
            </div>

            {formData.schemeStatus === SchemeStatus.Subscribers_Added && (
              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleSubmitFinalAgreement}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Final Agreement
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )

      case 8:
        if (!canAccessStep(8)) {
          return (
            <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Step Locked</h3>
              <p className="text-gray-500">Submit the final agreement to unlock the Commencement Certificate.</p>
            </div>
          )
        }

        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-2">Commencement Certificate (Form 7)</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>• Admin will review the final agreement</p>
                <p>• Form 7 (Commencement Certificate) will be auto-generated</p>
                <p>• Scheme becomes live after final approval</p>
              </div>
            </div>

            {formData.schemeStatus === SchemeStatus.Final_Agreement_Uploaded && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-yellow-900 mb-2">Awaiting Admin Approval</h3>
                <p className="text-yellow-800 mb-4">
                  Your final agreement is under admin review. The Commencement Certificate will be generated
                  automatically upon approval.
                </p>
                <Button
                  onClick={handleRefreshStatus}
                  disabled={refreshing}
                  variant="outline"
                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 bg-transparent"
                >
                  {refreshing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Check Approval Status
                    </>
                  )}
                </Button>
                <p className="text-xs text-yellow-700 mt-2">
                  Last checked: {new Date(lastRefresh).toLocaleTimeString()}
                </p>
              </div>
            )}

            {formData.schemeStatus === SchemeStatus.Commencement_Approved && formData.commencementCertificate && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-2">Commencement Approved!</h3>
                <p className="text-green-800 mb-4">
                  Your scheme has been approved and is now LIVE! Form 7 (Commencement Certificate) has been
                  automatically generated.
                </p>

                <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Commencement Certificate (Form 7)</p>
                      <p className="text-sm text-green-700">Scheme ID: {formData.schemeId}</p>
                      <p className="text-xs text-green-600">Generated: {new Date().toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(formData.commencementCertificate)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                      >
                        <a href={formData.commencementCertificate.url} download={formData.commencementCertificate.name}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <Badge className="bg-green-100 text-green-800 font-medium">Scheme is now LIVE!</Badge>
              </div>
            )}
          </div>
        )

      default:
        return <p>Unknown step</p>
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          {schemeIdFromUrl ? "Edit Scheme" : "Create New Scheme"}
          <span className="ml-4 inline-block align-middle">{getStatusBadge()}</span>
        </h1>
        <p className="text-gray-600">Complete the steps below to create a new chit scheme.</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar – steps & tips */}
        <div className="lg:w-1/3 space-y-8">
          <Card className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Scheme Steps</h2>
            <div className="space-y-2">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center justify-between p-3 rounded-md transition-colors cursor-pointer hover:bg-gray-100 ${
                    currentStep === step.id ? "bg-blue-50" : ""
                  } ${!canAccessStep(step.id) ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => canAccessStep(step.id) && setCurrentStep(step.id)}
                >
                  <div className="flex items-center gap-3">
                    <step.icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {formData.stepStatus[step.id] === "complete" && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Tips & Guidelines</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowTips(!showTips)}>
                {showTips ? "Hide" : "Show"}
              </Button>
            </div>
            {showTips && STEPS.find((s) => s.id === currentStep)?.tips && (
              <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc list-inside">
                {STEPS.find((s) => s.id === currentStep)!.tips!.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Step Content */}
        <div className="lg:w-2/3">
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">{STEPS[currentStep - 1].title}</h2>
            <p className="text-gray-600">{STEPS[currentStep - 1].description}</p>

            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                {currentStep > 1 && (
                  <Button variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>
                    Previous
                  </Button>
                )}
                {currentStep < STEPS.length && <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Subscriber Generator Dialog */}
      <SubscriberGenerator
        isOpen={showSubscriberGenerator}
        onClose={() => setShowSubscriberGenerator(false)}
        onSelectSubscribers={handleAddGeneratedSubscribers}
        schemeDetails={formData}
      />

      {/* Document-preview dialog */}
      <Dialog open={showPreview !== null} onOpenChange={(o) => !o && setShowPreview(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>Preview of the uploaded document.</DialogDescription>
          </DialogHeader>
          {showPreview?.url && <iframe src={showPreview.url} className="w-full h-[500px]" />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
