"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Save, X } from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  description: string
  assignedRole: string
  estimatedTime: string
  required: boolean
  autoApproval: boolean
  conditions: string[]
  notificationSettings: {
    email: boolean
    sms: boolean
    inApp: boolean
  }
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
    category: "",
    type: "",
  })

  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: "step-1",
      name: "Initial Step",
      description: "First step of the workflow",
      assignedRole: "user",
      estimatedTime: "30 minutes",
      required: true,
      autoApproval: false,
      conditions: ["Basic validation"],
      notificationSettings: {
        email: true,
        sms: false,
        inApp: true,
      },
    },
  ])

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: `step-${steps.length + 1}`,
      name: `Step ${steps.length + 1}`,
      description: "New workflow step",
      assignedRole: "user",
      estimatedTime: "30 minutes",
      required: true,
      autoApproval: false,
      conditions: ["Condition 1"],
      notificationSettings: {
        email: true,
        sms: false,
        inApp: true,
      },
    }
    setSteps([...steps, newStep])
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter((step) => step.id !== stepId))
  }

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setSteps(steps.map((step) => (step.id === stepId ? { ...step, ...updates } : step)))
  }

  const handleSave = () => {
    const workflow = {
      ...workflowData,
      steps: steps.map((step, index) => ({ ...step, order: index + 1 })),
    }
    onSave(workflow)
    onOpenChange(false)
    // Reset form
    setWorkflowData({ name: "", description: "", category: "", type: "" })
    setSteps([
      {
        id: "step-1",
        name: "Initial Step",
        description: "First step of the workflow",
        assignedRole: "user",
        estimatedTime: "30 minutes",
        required: true,
        autoApproval: false,
        conditions: ["Basic validation"],
        notificationSettings: {
          email: true,
          sms: false,
          inApp: true,
        },
      },
    ])
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Workflow
          </DialogTitle>
          <DialogDescription>Design a custom workflow with multiple steps and automated processes</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workflow-name">Workflow Name</Label>
                  <Input
                    id="workflow-name"
                    value={workflowData.name}
                    onChange={(e) => setWorkflowData({ ...workflowData, name: e.target.value })}
                    placeholder="Enter workflow name"
                  />
                </div>
                <div>
                  <Label htmlFor="workflow-type">Workflow Type</Label>
                  <Select
                    value={workflowData.type}
                    onValueChange={(value) => setWorkflowData({ ...workflowData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select workflow type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ucfsin_registration">UCFSIN Registration</SelectItem>
                      <SelectItem value="foreman_registration">Foreman Registration</SelectItem>
                      <SelectItem value="scheme_creation">Scheme Creation</SelectItem>
                      <SelectItem value="scheme_approval">Scheme Approval</SelectItem>
                      <SelectItem value="user_management">User Management</SelectItem>
                      <SelectItem value="monthly_reporting">Monthly Reporting</SelectItem>
                      <SelectItem value="landing_page_access">Landing Page Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="workflow-category">Category</Label>
                <Select
                  value={workflowData.category}
                  onValueChange={(value) => setWorkflowData({ ...workflowData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User Management">User Management</SelectItem>
                    <SelectItem value="Foreman Management">Foreman Management</SelectItem>
                    <SelectItem value="Scheme Management">Scheme Management</SelectItem>
                    <SelectItem value="Access Control">Access Control</SelectItem>
                    <SelectItem value="Reporting">Reporting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="workflow-description">Description</Label>
                <Textarea
                  id="workflow-description"
                  value={workflowData.description}
                  onChange={(e) => setWorkflowData({ ...workflowData, description: e.target.value })}
                  placeholder="Describe the workflow purpose and process"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Workflow Steps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Workflow Steps ({steps.length})</CardTitle>
                <Button onClick={addStep} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <Card key={step.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Step {index + 1}</h4>
                          <Badge className={getRoleColor(step.assignedRole)}>{step.assignedRole}</Badge>
                        </div>
                      </div>
                      {steps.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeStep(step.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`step-name-${step.id}`}>Step Name</Label>
                        <Input
                          id={`step-name-${step.id}`}
                          value={step.name}
                          onChange={(e) => updateStep(step.id, { name: e.target.value })}
                          placeholder="Enter step name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`step-time-${step.id}`}>Estimated Time</Label>
                        <Input
                          id={`step-time-${step.id}`}
                          value={step.estimatedTime}
                          onChange={(e) => updateStep(step.id, { estimatedTime: e.target.value })}
                          placeholder="e.g., 30 minutes, 2 hours"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor={`step-description-${step.id}`}>Description</Label>
                      <Textarea
                        id={`step-description-${step.id}`}
                        value={step.description}
                        onChange={(e) => updateStep(step.id, { description: e.target.value })}
                        placeholder="Describe what happens in this step"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`step-role-${step.id}`}>Assigned Role</Label>
                        <Select
                          value={step.assignedRole}
                          onValueChange={(value) => updateStep(step.id, { assignedRole: value })}
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
                        <Label htmlFor={`step-conditions-${step.id}`}>Conditions</Label>
                        <Input
                          id={`step-conditions-${step.id}`}
                          value={step.conditions.join(", ")}
                          onChange={(e) =>
                            updateStep(step.id, {
                              conditions: e.target.value
                                .split(",")
                                .map((c) => c.trim())
                                .filter(Boolean),
                            })
                          }
                          placeholder="Enter conditions separated by commas"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={step.required}
                          onCheckedChange={(checked) => updateStep(step.id, { required: checked })}
                        />
                        <Label className="text-sm">Required Step</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={step.autoApproval}
                          onCheckedChange={(checked) => updateStep(step.id, { autoApproval: checked })}
                        />
                        <Label className="text-sm">Auto Approval</Label>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-sm font-medium">Notification Settings</Label>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={step.notificationSettings.email}
                            onCheckedChange={(checked) =>
                              updateStep(step.id, {
                                notificationSettings: { ...step.notificationSettings, email: checked },
                              })
                            }
                          />
                          <Label className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={step.notificationSettings.sms}
                            onCheckedChange={(checked) =>
                              updateStep(step.id, {
                                notificationSettings: { ...step.notificationSettings, sms: checked },
                              })
                            }
                          />
                          <Label className="text-sm">SMS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={step.notificationSettings.inApp}
                            onCheckedChange={(checked) =>
                              updateStep(step.id, {
                                notificationSettings: { ...step.notificationSettings, inApp: checked },
                              })
                            }
                          />
                          <Label className="text-sm">In-App</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!workflowData.name || !workflowData.type}>
              <Save className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
