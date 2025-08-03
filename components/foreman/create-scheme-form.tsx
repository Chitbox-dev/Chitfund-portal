"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Upload, FileText, Calendar, Users, DollarSign, Gavel } from "lucide-react"

interface SchemeFormData {
  schemeId: string
  schemeName: string
  chitValue: number
  chitDuration: number
  numberOfSubscribers: number
  monthlyPremium: number
  chitStartDate: Date | null
  chitEndDate: Date | null
  auctionFrequency: string
  biddingRules: string
  termsAndConditions: string
  schemeStatus: string
  lastUpdated: string
}

interface CreateSchemeFormProps {
  onSave: (data: SchemeFormData) => void
  onCancel: () => void
  initialData?: Partial<SchemeFormData>
}

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
  PSO_Requested = "pso_requested", // Foreman requested PSO
  PSO_Approved = "pso_approved", // Admin approved PSO, subscriber enrollment unlocked
  Subscribers_Added = "subscribers_added", // Foreman added subscribers
  Final_Agreement_Uploaded = "final_agreement_uploaded", // Foreman uploaded final agreement
  Commencement_Approved = "commencement_approved", // Admin approved, Form 7 generated
  Live = "live", // Scheme is active
  Rejected = "rejected", // Admin rejected the scheme
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
  // Generate unique scheme ID to prevent duplicates
  schemeId: "",
  schemeStatus: SchemeStatus.Draft,
  stepStatus: { ...DEFAULT_STEP_STATUS },
  adminComments: {},

  // Step 1
  chitValue: "",
  chitDuration: "",
  numberOfSubscribers: "",
  monthlyPremium: "",
  chitStartDate: null,
  chitEndDate: null,

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
  const [formData, setFormData] = useState<any>(() => ({
    ...INITIAL_FORM_DATA,
    // Generate unique scheme ID to prevent duplicates
    schemeId: schemeIdFromUrl || `SCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
      // Always start with a fresh scheme when creating new - prevent duplicates
      const newSchemeId = `SCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
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

      // Check all possible locations for the scheme with proper deduplication
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
        // Create new scheme with fresh ID to prevent duplicates
        const newSchemeId = `SCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        setFormData({
          ...INITIAL_FORM_DATA,
          schemeId: newSchemeId,
        })
      }
    } catch (error) {
      console.error("Error loading existing scheme:", error)
      // Create new scheme on error
      const newSchemeId = `SCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
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
      case SchemeStatus.Steps1_4_Approved:
        return 5 // Can request PSO
      case SchemeStatus.PSO_Requested:
        return 5 // Stay on PSO step to show request status
      case SchemeStatus.PSO_Approved:
        return 6 // Can access subscriber enrollment
      case SchemeStatus.Subscribers_Added:
        return 7 // Can access final agreement upload
      case SchemeStatus.Final_Agreement_Uploaded:
        return 8 // Can view commencement certificate status
      case SchemeStatus.Commencement_Approved:
      case SchemeStatus.Live:
        return 8 // Scheme is complete
      case SchemeStatus.Rejected:
        return 4 // Return to step 4 to fix issues
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
      case SchemeStatus.Steps1_4_Approved:
        return stepId <= 5 // Can access up to PSO request
      case SchemeStatus.PSO_Requested:
        return stepId <= 5 // Can access up to PSO request
      case SchemeStatus.PSO_Approved:
        return stepId <= 6 // Can access up to subscriber enrollment
      case SchemeStatus.Subscribers_Added:
        return stepId <= 7 // Can access up to final agreement
      case SchemeStatus.Final_Agreement_Uploaded:
      case SchemeStatus.Commencement_Approved:
      case SchemeStatus.Live:
        return stepId <= 8 // Can access all steps
      case SchemeStatus.Rejected:
        return stepId <= 4 // Can only access steps 1-4 to fix issues
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
      { field: "commissionStructure", name: "Commission structure document" },\
      { field: "termsOfWithdrawal
