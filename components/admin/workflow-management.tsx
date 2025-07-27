"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WorkflowCreationDialog } from "./workflow-creation-dialog"
import {
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  Settings,
  BarChart3,
} from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  type: "approval" | "notification" | "action" | "condition"
  assignedTo: string[]
  description: string
  estimatedTime: number
  status: "pending" | "completed" | "failed"
}

interface Workflow {
  id: string
  name: string
  description: string
  category: "user_management" | "scheme_approval" | "document_review" | "compliance"
  status: "active" | "inactive" | "draft"
  steps: WorkflowStep[]
  createdAt: string
  lastModified: string
  totalExecutions: number
  successRate: number
}

const sampleWorkflows: Workflow[] = [
  {
    id: "wf-001",
    name: "User Registration Approval",
    description: "Complete workflow for approving new user registrations including KYC verification",
    category: "user_management",
    status: "active",
    steps: [
      {
        id: "step-001",
        name: "Document Verification",
        type: "approval",
        assignedTo: ["admin", "kyc_officer"],
        description: "Verify uploaded documents and identity proof",
        estimatedTime: 30,
        status: "completed",
      },
      {
        id: "step-002",
        name: "Background Check",
        type: "action",
        assignedTo: ["compliance_team"],
        description: "Perform background verification and credit check",
        estimatedTime: 60,
        status: "pending",
      },
      {
        id: "step-003",
        name: "Final Approval",
        type: "approval",
        assignedTo: ["admin"],
        description: "Final approval and account activation",
        estimatedTime: 15,
        status: "pending",
      },
    ],
    createdAt: "2025-01-15T10:00:00Z",
    lastModified: "2025-01-20T14:30:00Z",
    totalExecutions: 45,
    successRate: 89,
  },
  {
    id: "wf-002",
    name: "Scheme Approval Process",
    description: "Workflow for reviewing and approving new chit fund schemes",
    category: "scheme_approval",
    status: "active",
    steps: [
      {
        id: "step-004",
        name: "Scheme Review",
        type: "approval",
        assignedTo: ["scheme_reviewer"],
        description: "Review scheme details and compliance requirements",
        estimatedTime: 45,
        status: "completed",
      },
      {
        id: "step-005",
        name: "Legal Compliance Check",
        type: "condition",
        assignedTo: ["legal_team"],
        description: "Ensure scheme meets all legal requirements",
        estimatedTime: 90,
        status: "pending",
      },
    ],
    createdAt: "2025-01-12T09:15:00Z",
    lastModified: "2025-01-18T16:45:00Z",
    totalExecutions: 23,
    successRate: 95,
  },
]

export function WorkflowManagement() {
  const [workflows, setWorkflows] = useState<Workflow[]>(sampleWorkflows)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || workflow.category === filterCategory
    const matchesStatus = filterStatus === "all" || workflow.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleCreateWorkflow = (workflowData: Partial<Workflow>) => {
    const newWorkflow: Workflow = {
      id: `wf-${Date.now()}`,
      name: workflowData.name || "",
      description: workflowData.description || "",
      category: workflowData.category || "user_management",
      status: "draft",
      steps: workflowData.steps || [],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      totalExecutions: 0,
      successRate: 0,
    }
    setWorkflows([...workflows, newWorkflow])
    setIsCreateDialogOpen(false)
  }

  const toggleWorkflowStatus = (workflowId: string) => {
    setWorkflows(
      workflows.map((workflow) =>
        workflow.id === workflowId
          ? { ...workflow, status: workflow.status === "active" ? "inactive" : "active" }
          : workflow,
      ),
    )
  }

  const deleteWorkflow = (workflowId: string) => {
    setWorkflows(workflows.filter((workflow) => workflow.id !== workflowId))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "inactive":
        return <Pause className="h-4 w-4 text-gray-500" />
      case "draft":
        return <Edit className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "user_management":
        return <Users className="h-4 w-4" />
      case "scheme_approval":
        return <FileText className="h-4 w-4" />
      case "document_review":
        return <Settings className="h-4 w-4" />
      case "compliance":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow Management</h1>
          <p className="text-gray-600 mt-2">Create and manage automated workflows for your operations</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                <p className="text-2xl font-bold text-gray-900">{workflows.length}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workflows.filter((w) => w.status === "active").length}
                </p>
              </div>
              <Play className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Executions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workflows.reduce((sum, w) => sum + w.totalExecutions, 0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search Workflows</Label>
              <Input
                id="search"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="user_management">User Management</SelectItem>
                  <SelectItem value="scheme_approval">Scheme Approval</SelectItem>
                  <SelectItem value="document_review">Document Review</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflows List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWorkflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(workflow.category)}
                  <div>
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(workflow.status)}
                  <Badge variant={workflow.status === "active" ? "default" : "secondary"}>{workflow.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Steps:</span>
                    <span className="ml-2">{workflow.steps.length}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Executions:</span>
                    <span className="ml-2">{workflow.totalExecutions}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Success Rate:</span>
                    <span className="ml-2">{workflow.successRate}%</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Category:</span>
                    <span className="ml-2 capitalize">{workflow.category.replace("_", " ")}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    Modified {new Date(workflow.lastModified).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleWorkflowStatus(workflow.id)}>
                      {workflow.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedWorkflow(workflow)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteWorkflow(workflow.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterCategory !== "all" || filterStatus !== "all"
                ? "Try adjusting your search criteria"
                : "Create your first workflow to get started"}
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </CardContent>
        </Card>
      )}

      <WorkflowCreationDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSave={handleCreateWorkflow}
      />
    </div>
  )
}
