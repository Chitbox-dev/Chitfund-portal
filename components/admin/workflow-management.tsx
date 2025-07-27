"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Edit,
  Play,
  Pause,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  FileText,
  Settings,
} from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  description: string
  assignedTo: string
  estimatedTime: number
  status: "pending" | "in_progress" | "completed" | "failed"
  dependencies: string[]
}

interface Workflow {
  id: string
  name: string
  description: string
  category: "user_registration" | "scheme_approval" | "document_verification" | "payment_processing"
  status: "active" | "inactive" | "draft"
  steps: WorkflowStep[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

const sampleWorkflows: Workflow[] = [
  {
    id: "WF001",
    name: "User Registration Workflow",
    description: "Complete user onboarding and UCFSIN generation process",
    category: "user_registration",
    status: "active",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-20T14:30:00Z",
    createdBy: "Admin",
    steps: [
      {
        id: "step1",
        name: "Basic Information Collection",
        description: "Collect user's basic personal information",
        assignedTo: "System",
        estimatedTime: 5,
        status: "completed",
        dependencies: [],
      },
      {
        id: "step2",
        name: "KYC Document Verification",
        description: "Verify uploaded KYC documents",
        assignedTo: "KYC Team",
        estimatedTime: 24,
        status: "in_progress",
        dependencies: ["step1"],
      },
      {
        id: "step3",
        name: "UCFSIN Generation",
        description: "Generate unique chit fund subscriber ID",
        assignedTo: "System",
        estimatedTime: 1,
        status: "pending",
        dependencies: ["step2"],
      },
    ],
  },
  {
    id: "WF002",
    name: "Scheme Approval Workflow",
    description: "Review and approve new chit fund schemes",
    category: "scheme_approval",
    status: "active",
    createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-01-18T16:45:00Z",
    createdBy: "Admin",
    steps: [
      {
        id: "step1",
        name: "Scheme Documentation Review",
        description: "Review scheme documents and compliance",
        assignedTo: "Compliance Team",
        estimatedTime: 48,
        status: "completed",
        dependencies: [],
      },
      {
        id: "step2",
        name: "Financial Assessment",
        description: "Assess financial viability and risk",
        assignedTo: "Finance Team",
        estimatedTime: 72,
        status: "in_progress",
        dependencies: ["step1"],
      },
      {
        id: "step3",
        name: "Final Approval",
        description: "Final approval by authorized personnel",
        assignedTo: "Senior Manager",
        estimatedTime: 24,
        status: "pending",
        dependencies: ["step2"],
      },
    ],
  },
]

export function WorkflowManagement() {
  const [workflows, setWorkflows] = useState<Workflow[]>(sampleWorkflows)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || workflow.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "user_registration":
        return <Users className="h-4 w-4" />
      case "scheme_approval":
        return <FileText className="h-4 w-4" />
      case "document_verification":
        return <CheckCircle className="h-4 w-4" />
      case "payment_processing":
        return <Settings className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const handleToggleWorkflowStatus = (workflowId: string) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === workflowId
          ? { ...workflow, status: workflow.status === "active" ? "inactive" : "active" }
          : workflow,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workflow Management</h2>
          <p className="text-gray-600 mt-1">Create and manage automated workflows for various processes</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workflowName">Workflow Name</Label>
                  <Input id="workflowName" placeholder="Enter workflow name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user_registration">User Registration</SelectItem>
                      <SelectItem value="scheme_approval">Scheme Approval</SelectItem>
                      <SelectItem value="document_verification">Document Verification</SelectItem>
                      <SelectItem value="payment_processing">Payment Processing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the workflow purpose" rows={3} />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Create Workflow</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                <p className="text-3xl font-bold text-gray-900">{workflows.length}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {workflows.filter((w) => w.status === "active").length}
                </p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-3xl font-bold text-gray-600">
                  {workflows.filter((w) => w.status === "inactive").length}
                </p>
              </div>
              <Pause className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {workflows.filter((w) => w.status === "draft").length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input placeholder="Search workflows..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Workflows Table */}
      <Card>
        <CardHeader>
          <CardTitle>Workflows ({filteredWorkflows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Steps</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{workflow.name}</div>
                      <div className="text-sm text-gray-500">{workflow.description}</div>
                      <div className="text-xs text-gray-400 mt-1">ID: {workflow.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(workflow.category)}
                      <span className="capitalize">{workflow.category.replace("_", " ")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {workflow.steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                          {getStepStatusIcon(step.status)}
                          {index < workflow.steps.length - 1 && <div className="w-2 h-px bg-gray-300 mx-1" />}
                        </div>
                      ))}
                      <span className="ml-2 text-sm text-gray-500">{workflow.steps.length} steps</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">{new Date(workflow.updatedAt).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedWorkflow(workflow)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleToggleWorkflowStatus(workflow.id)}>
                        {workflow.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Workflow Detail Dialog */}
      {selectedWorkflow && (
        <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {getCategoryIcon(selectedWorkflow.category)}
                {selectedWorkflow.name}
                <Badge className={getStatusColor(selectedWorkflow.status)}>{selectedWorkflow.status}</Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedWorkflow.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Workflow Steps</h4>
                <div className="space-y-4">
                  {selectedWorkflow.steps.map((step, index) => (
                    <Card key={step.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-medium text-gray-500">Step {index + 1}</span>
                              {getStepStatusIcon(step.status)}
                              <Badge variant="outline" className="capitalize">
                                {step.status.replace("_", " ")}
                              </Badge>
                            </div>
                            <h5 className="font-medium text-gray-900 mb-1">{step.name}</h5>
                            <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Assigned to: {step.assignedTo}</span>
                              <span>Est. Time: {step.estimatedTime}h</span>
                              {step.dependencies.length > 0 && <span>Dependencies: {step.dependencies.length}</span>}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
