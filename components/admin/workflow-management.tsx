"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { WorkflowCreationDialog } from "./workflow-creation-dialog"
import {
  Users,
  UserPlus,
  Settings,
  CreditCard,
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Copy,
  Eye,
  CheckCircle,
  Clock,
  Shield,
  Building,
  Gavel,
  BarChart3,
  AlertCircle,
  Play,
  RefreshCw,
  Download,
  Upload,
} from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  description: string
  required: boolean
  order: number
  status: "active" | "inactive"
  estimatedTime: string
  assignedRole: string
  conditions?: string[]
  nextSteps?: string[]
  autoApproval?: boolean
  notificationSettings?: {
    email: boolean
    sms: boolean
    inApp: boolean
  }
}

interface Workflow {
  id: string
  name: string
  type:
    | "ucfsin_registration"
    | "foreman_registration"
    | "foreman_management"
    | "scheme_creation"
    | "scheme_approval"
    | "scheme_management"
    | "user_management"
    | "monthly_reporting"
    | "landing_page_access"
  steps: WorkflowStep[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  version: string
  description: string
  category: string
  totalSteps: number
  avgCompletionTime: string
}

const defaultWorkflows: Workflow[] = [
  {
    id: "landing-page-access",
    name: "Landing Page Access Control Workflow",
    type: "landing_page_access",
    category: "Access Control",
    description: "Complete access control workflow for chitfundportal.vercel.app landing page",
    isActive: true,
    createdAt: "2025-01-27",
    updatedAt: "2025-01-27",
    version: "1.0",
    totalSteps: 6,
    avgCompletionTime: "2-3 days",
    steps: [
      {
        id: "access-request-submission",
        name: "Access Request Submission",
        description: "User submits access request with personal/company details and purpose",
        required: true,
        order: 1,
        status: "active",
        estimatedTime: "5 minutes",
        assignedRole: "user",
        conditions: [
          "Valid email address provided",
          "Phone number verification",
          "Purpose clearly stated",
          "User type selected (Company/User/Foreman)",
        ],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "user-type-routing",
        name: "User Type Based Routing",
        description: "Route request based on user type - Company goes to admin, others to MCQ",
        required: true,
        order: 2,
        status: "active",
        estimatedTime: "Instant",
        assignedRole: "system",
        conditions: ["User type identified", "Routing logic applied", "Next step determined"],
        autoApproval: true,
        notificationSettings: { email: false, sms: false, inApp: true },
      },
      {
        id: "mcq-assessment",
        name: "MCQ Knowledge Assessment",
        description: "Users and Foremen take relevant MCQ test (Users: 70%, Foremen: 80% pass rate)",
        required: false,
        order: 3,
        status: "active",
        estimatedTime: "10 minutes",
        assignedRole: "user",
        conditions: [
          "MCQ questions loaded based on user type",
          "All questions answered",
          "Minimum score achieved",
          "Assessment completed within time limit",
        ],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "admin-review",
        name: "Admin Review and Verification",
        description: "Admin reviews request details, MCQ scores, and makes approval decision",
        required: true,
        order: 4,
        status: "active",
        estimatedTime: "24-48 hours",
        assignedRole: "admin",
        conditions: [
          "Request details reviewed",
          "MCQ score evaluated (if applicable)",
          "Purpose assessment completed",
          "Background verification done",
          "Decision documented",
        ],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "access-credential-generation",
        name: "Access Credential Generation",
        description: "Generate login credentials and access permissions for approved users",
        required: true,
        order: 5,
        status: "active",
        estimatedTime: "5 minutes",
        assignedRole: "system",
        conditions: [
          "Admin approval received",
          "User account created",
          "Credentials generated",
          "Permissions assigned based on user type",
        ],
        autoApproval: true,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "access-notification",
        name: "Access Notification and Onboarding",
        description: "Send access credentials and onboarding information to approved users",
        required: true,
        order: 6,
        status: "active",
        estimatedTime: "Instant",
        assignedRole: "system",
        conditions: [
          "Credentials ready",
          "Welcome email sent",
          "Onboarding materials provided",
          "Access instructions delivered",
        ],
        autoApproval: true,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
    ],
  },
  {
    id: "ucfsin-registration",
    name: "UCFSIN Registration Workflow",
    type: "ucfsin_registration",
    category: "User Management",
    description: "Complete user registration and UCFSIN generation process",
    isActive: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-27",
    version: "2.1",
    totalSteps: 8,
    avgCompletionTime: "2-3 days",
    steps: [
      {
        id: "mobile-verification",
        name: "Mobile Verification",
        description: "Verify user's mobile number via OTP",
        required: true,
        order: 1,
        status: "active",
        estimatedTime: "2 minutes",
        assignedRole: "system",
        conditions: ["Valid mobile number", "OTP verification successful"],
        autoApproval: true,
        notificationSettings: { email: false, sms: true, inApp: true },
      },
      {
        id: "basic-info",
        name: "Basic Information Collection",
        description: "Collect user's basic details (Name, DOB, Email, Address)",
        required: true,
        order: 2,
        status: "active",
        estimatedTime: "5 minutes",
        assignedRole: "user",
        conditions: ["All mandatory fields filled", "Valid email format", "Age above 18"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "kyc-verification",
        name: "KYC Document Verification",
        description: "PAN and Aadhaar verification and document upload",
        required: true,
        order: 3,
        status: "active",
        estimatedTime: "10 minutes",
        assignedRole: "user",
        conditions: [
          "Valid PAN format",
          "Valid Aadhaar format",
          "Clear document images",
          "Documents match personal info",
        ],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "address-verification",
        name: "Address Verification",
        description: "Verify user's residential address",
        required: true,
        order: 4,
        status: "active",
        estimatedTime: "5 minutes",
        assignedRole: "user",
        conditions: ["Address proof uploaded", "Address matches Aadhaar", "Pincode verification"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "admin-review",
        name: "Admin Document Review",
        description: "Admin reviews and verifies all submitted documents",
        required: true,
        order: 5,
        status: "active",
        estimatedTime: "24 hours",
        assignedRole: "admin",
        conditions: ["All documents verified", "Information validated", "No discrepancies found"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "ucfsin-generation",
        name: "UCFSIN Generation",
        description: "Generate unique UCFSIN number for approved user",
        required: true,
        order: 6,
        status: "active",
        estimatedTime: "Instant",
        assignedRole: "system",
        conditions: ["Admin approval received", "Unique UCFSIN generated", "Database updated"],
        autoApproval: true,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "card-request",
        name: "Physical Card Request",
        description: "User can request physical UCFSIN card (Optional)",
        required: false,
        order: 7,
        status: "active",
        estimatedTime: "2 minutes",
        assignedRole: "user",
        conditions: ["UCFSIN generated", "Address verified", "Payment completed"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "registration-complete",
        name: "Registration Completion",
        description: "Send confirmation and welcome message to user",
        required: true,
        order: 8,
        status: "active",
        estimatedTime: "Instant",
        assignedRole: "system",
        conditions: ["All previous steps completed", "User profile activated"],
        autoApproval: true,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
    ],
  },
  {
    id: "foreman-registration",
    name: "Foreman Registration Workflow",
    type: "foreman_registration",
    category: "Foreman Management",
    description: "Complete foreman onboarding and approval process",
    isActive: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-27",
    version: "1.8",
    totalSteps: 7,
    avgCompletionTime: "5-7 days",
    steps: [
      {
        id: "company-info",
        name: "Company Information",
        description: "Collect company details and business registration",
        required: true,
        order: 1,
        status: "active",
        estimatedTime: "30 minutes",
        assignedRole: "foreman",
        conditions: ["Company registration certificate", "PAN card", "GST certificate", "Address proof"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "authorized-representative",
        name: "Authorized Representative Details",
        description: "Details of authorized person and contact information",
        required: true,
        order: 2,
        status: "active",
        estimatedTime: "15 minutes",
        assignedRole: "foreman",
        conditions: ["Personal details filled", "Contact verification", "Designation confirmed"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "license-verification",
        name: "Chit Fund License Verification",
        description: "Verify chit fund license and regulatory compliance",
        required: true,
        order: 3,
        status: "active",
        estimatedTime: "48 hours",
        assignedRole: "admin",
        conditions: ["Valid chit fund license", "License not expired", "State compliance verified"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "background-check",
        name: "Background Verification",
        description: "Conduct comprehensive background check",
        required: true,
        order: 4,
        status: "active",
        estimatedTime: "72 hours",
        assignedRole: "admin",
        conditions: ["Criminal record check", "Financial stability", "Previous business history"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "terms-acceptance",
        name: "Terms and Conditions",
        description: "Review and accept platform terms and conditions",
        required: true,
        order: 5,
        status: "active",
        estimatedTime: "10 minutes",
        assignedRole: "foreman",
        conditions: ["Terms reviewed", "Digital signature", "Agreement signed"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "final-approval",
        name: "Final Admin Approval",
        description: "Admin provides final approval and creates foreman account",
        required: true,
        order: 6,
        status: "active",
        estimatedTime: "24 hours",
        assignedRole: "admin",
        conditions: ["All checks passed", "Documentation complete", "Compliance verified"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "account-setup",
        name: "Account Setup and Onboarding",
        description: "Create foreman account and send login credentials",
        required: true,
        order: 7,
        status: "active",
        estimatedTime: "Instant",
        assignedRole: "system",
        conditions: ["Account created", "Credentials generated", "Welcome email sent"],
        autoApproval: true,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
    ],
  },
  {
    id: "scheme-creation",
    name: "Scheme Creation Workflow",
    type: "scheme_creation",
    category: "Scheme Management",
    description: "8-step process for creating new chit fund schemes",
    isActive: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-27",
    version: "2.0",
    totalSteps: 8,
    avgCompletionTime: "7-10 days",
    steps: [
      {
        id: "scheme-details",
        name: "Scheme Details Configuration",
        description: "Define basic scheme parameters and financial details",
        required: true,
        order: 1,
        status: "active",
        estimatedTime: "20 minutes",
        assignedRole: "foreman",
        conditions: ["Valid scheme amount", "Proper tenure defined", "Monthly premium calculated"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "auction-rules",
        name: "Auction Rules Setup",
        description: "Configure auction timing and bidding parameters",
        required: true,
        order: 2,
        status: "active",
        estimatedTime: "15 minutes",
        assignedRole: "foreman",
        conditions: ["Auction frequency set", "Bidding rules defined", "Commission structure"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "document-upload",
        name: "Legal Documents Upload",
        description: "Upload all required legal and compliance documents",
        required: true,
        order: 3,
        status: "active",
        estimatedTime: "45 minutes",
        assignedRole: "foreman",
        conditions: ["All documents uploaded", "FDR certificate", "Terms and conditions", "Draft agreement"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "compliance-review",
        name: "Regulatory Compliance Review",
        description: "Admin reviews scheme for regulatory compliance",
        required: true,
        order: 4,
        status: "active",
        estimatedTime: "48 hours",
        assignedRole: "admin",
        conditions: ["RBI compliance", "State regulations", "Documentation complete"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "pso-generation",
        name: "PSO Certificate Generation",
        description: "Generate PSO (Promoter's Security Obligation) certificate",
        required: true,
        order: 5,
        status: "active",
        estimatedTime: "24 hours",
        assignedRole: "admin",
        conditions: ["Compliance approved", "PSO amount verified", "Certificate generated"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "subscriber-enrollment",
        name: "Subscriber Enrollment",
        description: "Add subscribers and assign ticket numbers",
        required: true,
        order: 6,
        status: "active",
        estimatedTime: "2 hours",
        assignedRole: "foreman",
        conditions: ["All subscribers added", "UCFSIN verified", "Tickets assigned"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "final-agreement",
        name: "Final Agreement Upload",
        description: "Upload signed final agreement with all subscribers",
        required: true,
        order: 7,
        status: "active",
        estimatedTime: "30 minutes",
        assignedRole: "foreman",
        conditions: ["Agreement signed", "All signatures present", "Document clear"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "form7-generation",
        name: "Form 7 Generation and Scheme Activation",
        description: "Generate Form 7 commencement certificate and activate scheme",
        required: true,
        order: 8,
        status: "active",
        estimatedTime: "24 hours",
        assignedRole: "admin",
        conditions: ["Final agreement approved", "Form 7 generated", "Scheme activated"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
    ],
  },
  {
    id: "scheme-approval",
    name: "Scheme Approval Workflow",
    type: "scheme_approval",
    category: "Scheme Management",
    description: "Administrative approval process for submitted schemes",
    isActive: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-27",
    version: "1.5",
    totalSteps: 6,
    avgCompletionTime: "3-5 days",
    steps: [
      {
        id: "initial-review",
        name: "Initial Document Review",
        description: "First level review of submitted scheme documents",
        required: true,
        order: 1,
        status: "active",
        estimatedTime: "2 hours",
        assignedRole: "admin",
        conditions: ["All documents present", "Basic validation passed", "No obvious errors"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "financial-analysis",
        name: "Financial Analysis",
        description: "Analyze scheme financials and viability",
        required: true,
        order: 2,
        status: "active",
        estimatedTime: "4 hours",
        assignedRole: "admin",
        conditions: ["Financial projections reviewed", "Risk assessment completed", "Viability confirmed"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "legal-compliance",
        name: "Legal Compliance Check",
        description: "Ensure scheme complies with all regulations",
        required: true,
        order: 3,
        status: "active",
        estimatedTime: "24 hours",
        assignedRole: "admin",
        conditions: ["RBI guidelines followed", "State law compliance", "Terms legally sound"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "risk-assessment",
        name: "Risk Assessment",
        description: "Evaluate potential risks and mitigation strategies",
        required: true,
        order: 4,
        status: "active",
        estimatedTime: "3 hours",
        assignedRole: "admin",
        conditions: ["Risk factors identified", "Mitigation plans reviewed", "Acceptable risk level"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "senior-approval",
        name: "Senior Admin Approval",
        description: "Final approval from senior administrator",
        required: true,
        order: 5,
        status: "active",
        estimatedTime: "12 hours",
        assignedRole: "admin",
        conditions: ["All reviews completed", "Senior admin sign-off", "Approval documented"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "notification-dispatch",
        name: "Approval Notification",
        description: "Send approval notification and next steps to foreman",
        required: true,
        order: 6,
        status: "active",
        estimatedTime: "Instant",
        assignedRole: "system",
        conditions: ["Approval confirmed", "Notification sent", "Next steps communicated"],
        autoApproval: true,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
    ],
  },
  {
    id: "user-management",
    name: "User Management Workflow",
    type: "user_management",
    category: "User Management",
    description: "Comprehensive user lifecycle management process",
    isActive: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-27",
    version: "1.3",
    totalSteps: 5,
    avgCompletionTime: "Ongoing",
    steps: [
      {
        id: "profile-monitoring",
        name: "Profile Monitoring",
        description: "Continuous monitoring of user profiles and activities",
        required: true,
        order: 1,
        status: "active",
        estimatedTime: "Continuous",
        assignedRole: "system",
        conditions: ["Profile completeness", "Activity tracking", "Compliance monitoring"],
        autoApproval: true,
        notificationSettings: { email: false, sms: false, inApp: true },
      },
      {
        id: "kyc-renewal",
        name: "KYC Renewal Process",
        description: "Periodic KYC renewal and document updates",
        required: true,
        order: 2,
        status: "active",
        estimatedTime: "Annual",
        assignedRole: "user",
        conditions: ["KYC expiry check", "Document renewal", "Re-verification"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "account-maintenance",
        name: "Account Maintenance",
        description: "Regular account maintenance and updates",
        required: true,
        order: 3,
        status: "active",
        estimatedTime: "Monthly",
        assignedRole: "admin",
        conditions: ["Account status review", "Data cleanup", "Security updates"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "compliance-audit",
        name: "Compliance Audit",
        description: "Regular compliance audits and checks",
        required: true,
        order: 4,
        status: "active",
        estimatedTime: "Quarterly",
        assignedRole: "admin",
        conditions: ["Audit completed", "Issues identified", "Corrective actions"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "account-closure",
        name: "Account Closure Process",
        description: "Process for closing user accounts when requested",
        required: false,
        order: 5,
        status: "active",
        estimatedTime: "7 days",
        assignedRole: "admin",
        conditions: ["Closure request verified", "Outstanding cleared", "Data archived"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
    ],
  },
  {
    id: "monthly-reporting",
    name: "Monthly Reporting Workflow",
    type: "monthly_reporting",
    category: "Reporting",
    description: "Monthly reporting and compliance workflow for all schemes",
    isActive: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-27",
    version: "1.2",
    totalSteps: 6,
    avgCompletionTime: "Monthly",
    steps: [
      {
        id: "data-collection",
        name: "Data Collection",
        description: "Collect all required data for monthly reports",
        required: true,
        order: 1,
        status: "active",
        estimatedTime: "2 hours",
        assignedRole: "foreman",
        conditions: ["All transactions recorded", "Member data updated", "Financial data complete"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "report-generation",
        name: "Report Generation",
        description: "Generate standardized monthly reports",
        required: true,
        order: 2,
        status: "active",
        estimatedTime: "1 hour",
        assignedRole: "system",
        conditions: ["Reports generated", "Data validated", "Format compliance"],
        autoApproval: true,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "foreman-review",
        name: "Foreman Review and Submission",
        description: "Foreman reviews and submits monthly reports",
        required: true,
        order: 3,
        status: "active",
        estimatedTime: "30 minutes",
        assignedRole: "foreman",
        conditions: ["Reports reviewed", "Accuracy confirmed", "Submitted on time"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "admin-verification",
        name: "Admin Verification",
        description: "Admin verifies submitted monthly reports",
        required: true,
        order: 4,
        status: "active",
        estimatedTime: "45 minutes",
        assignedRole: "admin",
        conditions: ["Data accuracy verified", "Compliance checked", "Anomalies investigated"],
        autoApproval: false,
        notificationSettings: { email: true, sms: false, inApp: true },
      },
      {
        id: "regulatory-submission",
        name: "Regulatory Submission",
        description: "Submit reports to regulatory authorities",
        required: true,
        order: 5,
        status: "active",
        estimatedTime: "15 minutes",
        assignedRole: "admin",
        conditions: ["Reports approved", "Regulatory format", "Timely submission"],
        autoApproval: false,
        notificationSettings: { email: true, sms: true, inApp: true },
      },
      {
        id: "archive-storage",
        name: "Archive and Storage",
        description: "Archive reports for future reference and compliance",
        required: true,
        order: 6,
        status: "active",
        estimatedTime: "5 minutes",
        assignedRole: "system",
        conditions: ["Reports archived", "Backup created", "Access permissions set"],
        autoApproval: true,
        notificationSettings: { email: false, sms: false, inApp: true },
      },
    ],
  },
]

export function WorkflowManagement() {
  const [workflows, setWorkflows] = useState<Workflow[]>(defaultWorkflows)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(workflows[0])
  const [activeTab, setActiveTab] = useState("workflows")
  const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newStepData, setNewStepData] = useState<Partial<WorkflowStep>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Save workflows to localStorage
  useEffect(() => {
    localStorage.setItem("systemWorkflows", JSON.stringify(workflows))
  }, [workflows])

  // Load workflows from localStorage on mount
  useEffect(() => {
    const savedWorkflows = localStorage.getItem("systemWorkflows")
    if (savedWorkflows) {
      try {
        const parsed = JSON.parse(savedWorkflows)
        setWorkflows(parsed)
        setSelectedWorkflow(parsed[0] || null)
      } catch (error) {
        console.error("Error loading workflows:", error)
      }
    }
  }, [])

  const handleCreateWorkflow = (newWorkflow: any) => {
    const workflow: Workflow = {
      id: `workflow-${Date.now()}`,
      name: newWorkflow.name,
      type: newWorkflow.type as any,
      category: newWorkflow.category,
      description: newWorkflow.description,
      steps: newWorkflow.steps,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      version: "1.0",
      totalSteps: newWorkflow.steps.length,
      avgCompletionTime: "TBD",
    }

    setWorkflows((prev) => [...prev, workflow])
    setSelectedWorkflow(workflow)
  }

  const handleUpdateWorkflow = (workflowId: string, updates: Partial<Workflow>) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === workflowId
          ? { ...workflow, ...updates, updatedAt: new Date().toISOString().split("T")[0] }
          : workflow,
      ),
    )
  }

  const handleUpdateStep = (workflowId: string, stepId: string, updates: Partial<WorkflowStep>) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              steps: workflow.steps.map((step) => (step.id === stepId ? { ...step, ...updates } : step)),
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : workflow,
      ),
    )
  }

  const handleAddStep = (workflowId: string) => {
    const workflow = workflows.find((w) => w.id === workflowId)
    if (!workflow) return

    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      name: "New Step",
      description: "Step description",
      required: true,
      order: workflow.steps.length + 1,
      status: "active",
      estimatedTime: "30 minutes",
      assignedRole: "user",
      conditions: ["Condition 1"],
      autoApproval: false,
      notificationSettings: { email: true, sms: false, inApp: true },
    }

    handleUpdateWorkflow(workflowId, {
      steps: [...workflow.steps, newStep],
      totalSteps: workflow.steps.length + 1,
    })
  }

  const handleDeleteStep = (workflowId: string, stepId: string) => {
    const workflow = workflows.find((w) => w.id === workflowId)
    if (!workflow) return

    if (confirm("Are you sure you want to delete this step?")) {
      const updatedSteps = workflow.steps.filter((step) => step.id !== stepId)
      handleUpdateWorkflow(workflowId, {
        steps: updatedSteps,
        totalSteps: updatedSteps.length,
      })
    }
  }

  const handleMoveStep = (workflowId: string, stepId: string, direction: "up" | "down") => {
    const workflow = workflows.find((w) => w.id === workflowId)
    if (!workflow) return

    const steps = [...workflow.steps].sort((a, b) => a.order - b.order)
    const stepIndex = steps.findIndex((s) => s.id === stepId)

    if (direction === "up" && stepIndex > 0) {
      ;[steps[stepIndex], steps[stepIndex - 1]] = [steps[stepIndex - 1], steps[stepIndex]]
    } else if (direction === "down" && stepIndex < steps.length - 1) {
      ;[steps[stepIndex], steps[stepIndex + 1]] = [steps[stepIndex + 1], steps[stepIndex]]
    }

    // Update order numbers
    const updatedSteps = steps.map((step, index) => ({ ...step, order: index + 1 }))

    handleUpdateWorkflow(workflowId, { steps: updatedSteps })
  }

  const handleSaveStep = () => {
    if (!editingStep || !selectedWorkflow) return

    handleUpdateStep(selectedWorkflow.id, editingStep.id, newStepData)
    setIsEditDialogOpen(false)
    setEditingStep(null)
    setNewStepData({})
  }

  const openEditDialog = (step: WorkflowStep) => {
    setEditingStep(step)
    setNewStepData(step)
    setIsEditDialogOpen(true)
  }

  const duplicateWorkflow = (workflowId: string) => {
    const workflow = workflows.find((w) => w.id === workflowId)
    if (!workflow) return

    const newWorkflow: Workflow = {
      ...workflow,
      id: `${workflow.id}-copy-${Date.now()}`,
      name: `${workflow.name} (Copy)`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      version: "1.0",
    }

    setWorkflows((prev) => [...prev, newWorkflow])
  }

  const exportWorkflow = (workflow: Workflow) => {
    const dataStr = JSON.stringify(workflow, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `${workflow.name.replace(/\s+/g, "_")}_workflow.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || workflow.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(workflows.map((w) => w.category))]

  const getWorkflowIcon = (type: string) => {
    switch (type) {
      case "ucfsin_registration":
        return <CreditCard className="h-5 w-5" />
      case "foreman_registration":
        return <UserPlus className="h-5 w-5" />
      case "foreman_management":
        return <Users className="h-5 w-5" />
      case "scheme_creation":
        return <FileText className="h-5 w-5" />
      case "scheme_approval":
        return <CheckCircle className="h-5 w-5" />
      case "scheme_management":
        return <Gavel className="h-5 w-5" />
      case "user_management":
        return <Users className="h-5 w-5" />
      case "monthly_reporting":
        return <BarChart3 className="h-5 w-5" />
      case "landing_page_access":
        return <Shield className="h-5 w-5" />
      default:
        return <Settings className="h-5 w-5" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-300"
      case "foreman":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "user":
        return "bg-green-100 text-green-800 border-green-300"
      case "system":
        return "bg-purple-100 text-purple-800 border-purple-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow Management System</h1>
          <p className="text-gray-600 mt-2">Complete control over all system workflows and processes</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => {}}>
            <Upload className="h-4 w-4 mr-2" />
            Import Workflow
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Workflows ({workflows.length})
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            System Settings
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                    <p className="text-3xl font-bold text-gray-900">{workflows.length}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Settings className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                    <p className="text-3xl font-bold text-gray-900">{workflows.filter((w) => w.isActive).length}</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Play className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Steps</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {workflows.reduce((acc, w) => acc + w.steps.length, 0)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Categories</p>
                    <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search workflows by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Eye className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Workflow List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Available Workflows
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedWorkflow?.id === workflow.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "hover:bg-gray-50 hover:shadow-sm"
                    }`}
                    onClick={() => setSelectedWorkflow(workflow)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getWorkflowIcon(workflow.type)}
                        <h4 className="font-semibold text-gray-900 text-sm">{workflow.name}</h4>
                      </div>
                      <Badge
                        className={
                          workflow.isActive
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-gray-100 text-gray-800 border-gray-300"
                        }
                      >
                        {workflow.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">{workflow.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{workflow.steps.length} steps</span>
                        <span>v{workflow.version}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{workflow.category}</span>
                        <span>{workflow.avgCompletionTime}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          duplicateWorkflow(workflow.id)
                        }}
                        className="text-xs h-7"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          exportWorkflow(workflow)
                        }}
                        className="text-xs h-7"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Workflow Details */}
            <div className="lg:col-span-2">
              {selectedWorkflow ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {getWorkflowIcon(selectedWorkflow.type)}
                        <div>
                          <CardTitle className="text-xl">{selectedWorkflow.name}</CardTitle>
                          <p className="text-gray-600 mt-1">{selectedWorkflow.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>Category: {selectedWorkflow.category}</span>
                            <span>Version: {selectedWorkflow.version}</span>
                            <span>Steps: {selectedWorkflow.totalSteps}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={selectedWorkflow.isActive}
                          onCheckedChange={(checked) =>
                            handleUpdateWorkflow(selectedWorkflow.id, { isActive: checked })
                          }
                        />
                        <Button variant="outline" size="sm" onClick={() => handleAddStep(selectedWorkflow.id)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Step
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {selectedWorkflow.steps
                        .sort((a, b) => a.order - b.order)
                        .map((step, index) => (
                          <div key={step.id} className="border rounded-lg p-4 bg-white shadow-sm">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                                  <span className="text-sm font-bold text-white">{index + 1}</span>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-900">{step.name}</h4>
                                  {step.required && (
                                    <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                      Required
                                    </Badge>
                                  )}
                                  <Badge className={getRoleColor(step.assignedRole)}>{step.assignedRole}</Badge>
                                  <Badge
                                    className={
                                      step.status === "active"
                                        ? "bg-green-100 text-green-800 border-green-300"
                                        : "bg-gray-100 text-gray-800 border-gray-300"
                                    }
                                  >
                                    {step.status}
                                  </Badge>
                                  {step.autoApproval && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                                    >
                                      Auto
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div>
                                    <span className="font-medium text-gray-700">Estimated Time:</span>
                                    <span className="ml-1 text-gray-600">{step.estimatedTime}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-700">Notifications:</span>
                                    <div className="ml-1 flex gap-1">
                                      {step.notificationSettings?.email && (
                                        <Badge variant="outline" className="text-xs">
                                          Email
                                        </Badge>
                                      )}
                                      {step.notificationSettings?.sms && (
                                        <Badge variant="outline" className="text-xs">
                                          SMS
                                        </Badge>
                                      )}
                                      {step.notificationSettings?.inApp && (
                                        <Badge variant="outline" className="text-xs">
                                          App
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {step.conditions && step.conditions.length > 0 && (
                                  <div className="mt-3">
                                    <span className="text-xs font-medium text-gray-700">Conditions:</span>
                                    <ul className="mt-1 space-y-1">
                                      {step.conditions.map((condition, idx) => (
                                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                                          <CheckCircle className="h-3 w-3 text-green-500" />
                                          {condition}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleMoveStep(selectedWorkflow.id, step.id, "up")}
                                    disabled={index === 0}
                                  >
                                    <ArrowUp className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleMoveStep(selectedWorkflow.id, step.id, "down")}
                                    disabled={index === selectedWorkflow.steps.length - 1}
                                  >
                                    <ArrowDown className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="outline" size="sm" onClick={() => openEditDialog(step)}>
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteStep(selectedWorkflow.id, step.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Workflow</h3>
                    <p className="text-gray-500">Choose a workflow from the list to view and edit its configuration</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Completion Time</p>
                    <p className="text-2xl font-bold text-gray-900">3.2 days</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">94.7%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bottlenecks</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Auto-Approvals</p>
                    <p className="text-2xl font-bold text-gray-900">67%</p>
                  </div>
                  <RefreshCw className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getWorkflowIcon(workflow.type)}
                      <div>
                        <h4 className="font-semibold">{workflow.name}</h4>
                        <p className="text-sm text-gray-600">
                          {workflow.steps.length} steps • {workflow.avgCompletionTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Success Rate</p>
                        <p className="text-lg font-bold text-green-600">{Math.floor(Math.random() * 10) + 90}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Avg. Time</p>
                        <p className="text-lg font-bold text-blue-600">{workflow.avgCompletionTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Global Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-approve low-risk workflows</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Send email notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable SMS notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Require digital signatures</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Timeout Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="user-timeout">User Action Timeout (hours)</Label>
                      <Input id="user-timeout" type="number" defaultValue="72" />
                    </div>
                    <div>
                      <Label htmlFor="admin-timeout">Admin Review Timeout (hours)</Label>
                      <Input id="admin-timeout" type="number" defaultValue="48" />
                    </div>
                    <div>
                      <Label htmlFor="system-timeout">System Process Timeout (minutes)</Label>
                      <Input id="system-timeout" type="number" defaultValue="30" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline">Reset to Default</Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Processes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">UCFSIN Registrations</span>
                    <Badge className="bg-blue-100 text-blue-800">23</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Scheme Approvals</span>
                    <Badge className="bg-green-100 text-green-800">8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Foreman Reviews</span>
                    <Badge className="bg-yellow-100 text-yellow-800">5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Reports</span>
                    <Badge className="bg-purple-100 text-purple-800">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Admin Reviews</span>
                    <Badge className="bg-red-100 text-red-800">15</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Actions</span>
                    <Badge className="bg-orange-100 text-orange-800">7</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Processes</span>
                    <Badge className="bg-gray-100 text-gray-800">3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overdue Items</span>
                    <Badge className="bg-red-100 text-red-800">2</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Workflow Engine</span>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notification Service</span>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Services</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Step Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Workflow Step</DialogTitle>
            <DialogDescription>Modify the step configuration and settings</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="step-name">Step Name</Label>
                <Input
                  id="step-name"
                  value={newStepData.name || ""}
                  onChange={(e) => setNewStepData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="estimated-time">Estimated Time</Label>
                <Input
                  id="estimated-time"
                  value={newStepData.estimatedTime || ""}
                  onChange={(e) => setNewStepData((prev) => ({ ...prev, estimatedTime: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="step-description">Description</Label>
              <Textarea
                id="step-description"
                value={newStepData.description || ""}
                onChange={(e) => setNewStepData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assigned-role">Assigned Role</Label>
                <Select
                  value={newStepData.assignedRole || ""}
                  onValueChange={(value) => setNewStepData((prev) => ({ ...prev, assignedRole: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="foreman">Foreman</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="step-status">Status</Label>
                <Select
                  value={newStepData.status || ""}
                  onValueChange={(value) =>
                    setNewStepData((prev) => ({ ...prev, status: value as "active" | "inactive" }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newStepData.required || false}
                  onCheckedChange={(checked) => setNewStepData((prev) => ({ ...prev, required: checked }))}
                />
                <Label>Required Step</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newStepData.autoApproval || false}
                  onCheckedChange={(checked) => setNewStepData((prev) => ({ ...prev, autoApproval: checked }))}
                />
                <Label>Auto Approval</Label>
              </div>
            </div>
            <div>
              <Label>Notification Settings</Label>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newStepData.notificationSettings?.email || false}
                    onCheckedChange={(checked) =>
                      setNewStepData((prev) => ({
                        ...prev,
                        notificationSettings: {
                          ...prev.notificationSettings,
                          email: checked,
                          sms: prev.notificationSettings?.sms || false,
                          inApp: prev.notificationSettings?.inApp || false,
                        },
                      }))
                    }
                  />
                  <Label className="text-sm">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newStepData.notificationSettings?.sms || false}
                    onCheckedChange={(checked) =>
                      setNewStepData((prev) => ({
                        ...prev,
                        notificationSettings: {
                          ...prev.notificationSettings,
                          email: prev.notificationSettings?.email || false,
                          sms: checked,
                          inApp: prev.notificationSettings?.inApp || false,
                        },
                      }))
                    }
                  />
                  <Label className="text-sm">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newStepData.notificationSettings?.inApp || false}
                    onCheckedChange={(checked) =>
                      setNewStepData((prev) => ({
                        ...prev,
                        notificationSettings: {
                          ...prev.notificationSettings,
                          email: prev.notificationSettings?.email || false,
                          sms: prev.notificationSettings?.sms || false,
                          inApp: checked,
                        },
                      }))
                    }
                  />
                  <Label className="text-sm">In-App</Label>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="conditions">Conditions (one per line)</Label>
              <Textarea
                id="conditions"
                value={newStepData.conditions?.join("\n") || ""}
                onChange={(e) =>
                  setNewStepData((prev) => ({
                    ...prev,
                    conditions: e.target.value.split("\n").filter((c) => c.trim()),
                  }))
                }
                rows={3}
                placeholder="Enter conditions, one per line"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveStep}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Workflow Dialog */}
      <WorkflowCreationDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSave={handleCreateWorkflow}
      />
    </div>
  )
}
