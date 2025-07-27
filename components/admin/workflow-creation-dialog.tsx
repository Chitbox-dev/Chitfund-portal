"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, ArrowUp, ArrowDown, Users, Bell, Settings, GitBranch } from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  type: "approval" | "notification" | "action" | "condition"
  assignedTo: string[]
  description: string
  estimatedTime: number
}

interface WorkflowCreationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (workflow: any) => void
}

export function WorkflowCreationDialog({ open, onOpenChange, onSave }: WorkflowCreationDialogProps) {
  const [workflowData, setWorkflowData] = useState({
    name: "",
    description: "",
    category: "user_management" as "user_management" | "scheme_approval" | "document_review" | "compliance",
  })

  const [steps, setSteps] = useState<WorkflowStep[]>([])
  const [currentStep, setCurrentStep] = useState<Partial<WorkflowStep>>({
    name: "",
    type: "approval",
    assignedTo: [],
    description: "",
    estimatedTime: 30,
  })

  const availableRoles = [
    "admin",
    "kyc_officer",
    "compliance_team",
    "scheme_reviewer",
    "legal_team",
    "finance_team",
    "customer_support",
  ]

  const stepTypes = [
    { value: "approval", label: "Approval", icon: Users, description: "Requires manual approval from assigned users" },
    { value: "notification", label: "Notification", icon: Bell, description: "Sends notification to specified users" },
    { value: "action", label: "Action", icon: Settings, description: "Performs automated action or task" },
    { value: "condition", label: "Condition", icon: GitBranch, description: "Conditional logic based on criteria" },
  ]

  const addStep = () => {
    if (currentStep.name && currentStep.type && currentStep.description) {
      const newStep: WorkflowStep = {
        id: `step-${Date.now()}`,
        name: currentStep.name,
        type: currentStep.type as "approval" | "notification" | "action" | "condition",
        assignedTo: currentStep.assignedTo || [],
        description: currentStep.description,
        estimatedTime: currentStep.estimatedTime || 30,
      }
      setSteps([...steps, newStep])
      setCurrentStep({
        name: "",
        type: "approval",
        assignedTo: [],
        description: "",
        estimatedTime: 30,
      })
    }
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter((step) => step.id !== stepId))
  }

  const moveStep = (stepId: string, direction: "up" | "down") => {
    const currentIndex = steps.findIndex((step) => step.id === stepId)
    if (currentIndex === -1) return

    const newSteps = [...steps]
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    if (targetIndex >= 0 && targetIndex < steps.length) {
      ;[newSteps[currentIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[currentIndex]]
      setSteps(newSteps)
    }
  }

  const handleSave = () => {
    if (workflowData.name && workflowData.description && steps.length > 0) {
      onSave({
        ...workflowData,
        steps,
      })
      // Reset form
      setWorkflowData({
        name: "",
        description: "",
        category: "user_management",
      })
      setSteps([])
      setCurrentStep({
        name: "",
        type: "approval",
        assignedTo: [],
        description: "",
        estimatedTime: 30,
      })
    }
  }

  const getStepIcon = (type: string) => {
    const stepType = stepTypes.find((st) => st.value === type)
    return stepType ? stepType.icon : Settings
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workflow-name">Workflow Name *</Label>
                  <Input
                    id="workflow-name"
                    value={workflowData.name}
                    onChange={(e) => setWorkflowData({ ...workflowData, name: e.target.value })}
                    placeholder="Enter workflow name"
                  />
                </div>
                <div>
                  <Label htmlFor="workflow-category">Category *</Label>
                  <Select
                    value={workflowData.category}
                    onValueChange={(value: any) => setWorkflowData({ ...workflowData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user_management">User Management</SelectItem>
                      <SelectItem value="scheme_approval">Scheme Approval</SelectItem>
                      <SelectItem value="document_review">Document Review</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="workflow-description">Description *</Label>
                <Textarea
                  id="workflow-description"
                  value={workflowData.description}
                  onChange={(e) => setWorkflowData({ ...workflowData, description: e.target.value })}
                  placeholder="Describe what this workflow does"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Step */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Workflow Step</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="step-name">Step Name</Label>
                  <Input
                    id="step-name"
                    value={currentStep.name}
                    onChange={(e) => setCurrentStep({ ...currentStep, name: e.target.value })}
                    placeholder="Enter step name"
                  />
                </div>
                <div>
                  <Label htmlFor="step-type">Step Type</Label>
                  <Select
                    value={currentStep.type}
                    onValueChange={(value: any) => setCurrentStep({ ...currentStep, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stepTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="step-description">Step Description</Label>
                <Textarea
                  id="step-description"
                  value={currentStep.description}
                  onChange={(e) => setCurrentStep({ ...currentStep, description: e.target.value })}
                  placeholder="Describe what happens in this step"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="step-roles">Assigned Roles</Label>
                  <Select
                    value=""
                    onValueChange={(value) => {
                      if (!currentStep.assignedTo?.includes(value)) {
                        setCurrentStep({
                          ...currentStep,
                          assignedTo: [...(currentStep.assignedTo || []), value],
                        })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select roles to assign" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role.replace("_", " ").toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentStep.assignedTo?.map((role) => (
                      <Badge key={role} variant="secondary" className="gap-1">
                        {role.replace("_", " ").toUpperCase()}
                        <button
                          onClick={() =>
                            setCurrentStep({
                              ...currentStep,
                              assignedTo: currentStep.assignedTo?.filter((r) => r !== role),
                            })
                          }
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="step-time">Estimated Time (minutes)</Label>
                  <Input
                    id="step-time"
                    type="number"
                    value={currentStep.estimatedTime}
                    onChange={(e) =>
                      setCurrentStep({ ...currentStep, estimatedTime: Number.parseInt(e.target.value) || 30 })
                    }
                    min="1"
                  />
                </div>
              </div>

              <Button onClick={addStep} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Step to Workflow
              </Button>
            </CardContent>
          </Card>

          {/* Workflow Steps */}
          {steps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workflow Steps ({steps.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {steps.map((step, index) => {
                    const StepIcon = getStepIcon(step.type)
                    return (
                      <div key={step.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-sm font-medium">
                            {index + 1}
                          </div>
                          <StepIcon className="h-5 w-5 text-gray-600" />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate">{step.name}</div>
                            <div className="text-sm text-gray-600 truncate">{step.description}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {step.type}
                              </Badge>
                              <span className="text-xs text-gray-500">{step.estimatedTime}min</span>
                              {step.assignedTo.length > 0 && (
                                <span className="text-xs text-gray-500">→ {step.assignedTo.join(", ")}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveStep(step.id, "up")}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveStep(step.id, "down")}
                            disabled={index === steps.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeStep(step.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!workflowData.name || !workflowData.description || steps.length === 0}>
            Create Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
