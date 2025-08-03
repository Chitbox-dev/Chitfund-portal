"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Plus,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Type,
  CheckSquare,
  Circle,
  Calendar,
  Upload,
  Mail,
  Phone,
  FileText,
} from "lucide-react"

interface FormField {
  id: string
  type: "text" | "email" | "phone" | "textarea" | "select" | "checkbox" | "radio" | "date" | "file" | "number"
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
    min?: number
    max?: number
  }
  conditional?: {
    dependsOn: string
    value: string
  }
  order: number
}

interface WorkflowStep {
  id: string
  name: string
  description: string
  required: boolean
  order: number
  status: "active" | "inactive"
  estimatedTime: string
  assignedRole: string
  conditions: string[]
  autoApproval: boolean
  notificationSettings: {
    email: boolean
    sms: boolean
    inApp: boolean
  }
  formFields?: FormField[]
  mcqQuestions?: {
    id: string
    question: string
    options: string[]
    correct: number
    points: number
  }[]
  passThreshold?: number
}

interface NewWorkflow {
  name: string
  type: string
  category: string
  description: string
  steps: WorkflowStep[]
}

interface WorkflowCreationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (workflow: NewWorkflow) => void
}

export function WorkflowCreationDialog({ open, onOpenChange, onSave }: WorkflowCreationDialogProps) {
  const [workflow, setWorkflow] = useState<NewWorkflow>({
    name: "",
    type: "",
    category: "",
    description: "",
    steps: [],
  })

  const [currentStep, setCurrentStep] = useState<Partial<WorkflowStep>>({
    name: "",
    description: "",
    required: true,
    status: "active",
    estimatedTime: "30 minutes",
    assignedRole: "user",
    conditions: [""],
    autoApproval: false,
    notificationSettings: {
      email: true,
      sms: false,
      inApp: true,
    },
    formFields: [],
    mcqQuestions: [],
    passThreshold: 70,
  })

  const [currentField, setCurrentField] = useState<Partial<FormField>>({
    type: "text",
    label: "",
    placeholder: "",
    required: false,
    options: [],
    validation: {},
  })

  const [currentMCQ, setCurrentMCQ] = useState({
    question: "",
    options: ["", "", "", ""],
    correct: 0,
    points: 1,
  })

  const [activeStepTab, setActiveStepTab] = useState("basic")

  const addFormField = () => {
    if (!currentField.label) return

    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: (currentField.type as FormField["type"]) || "text",
      label: currentField.label,
      placeholder: currentField.placeholder,
      required: currentField.required || false,
      options: currentField.options?.filter((opt) => opt.trim()) || [],
      validation: currentField.validation || {},
      order: (currentStep.formFields?.length || 0) + 1,
    }

    setCurrentStep((prev) => ({
      ...prev,
      formFields: [...(prev.formFields || []), newField],
    }))

    // Reset current field
    setCurrentField({
      type: "text",
      label: "",
      placeholder: "",
      required: false,
      options: [],
      validation: {},
    })
  }

  const removeFormField = (fieldId: string) => {
    setCurrentStep((prev) => ({
      ...prev,
      formFields: (prev.formFields || []).filter((f) => f.id !== fieldId),
    }))
  }

  const addMCQQuestion = () => {
    if (!currentMCQ.question || currentMCQ.options.some((opt) => !opt.trim())) return

    const newMCQ = {
      id: `mcq-${Date.now()}`,
      question: currentMCQ.question,
      options: currentMCQ.options.filter((opt) => opt.trim()),
      correct: currentMCQ.correct,
      points: currentMCQ.points,
    }

    setCurrentStep((prev) => ({
      ...prev,
      mcqQuestions: [...(prev.mcqQuestions || []), newMCQ],
    }))

    // Reset current MCQ
    setCurrentMCQ({
      question: "",
      options: ["", "", "", ""],
      correct: 0,
      points: 1,
    })
  }

  const removeMCQQuestion = (mcqId: string) => {
    setCurrentStep((prev) => ({
      ...prev,
      mcqQuestions: (prev.mcqQuestions || []).filter((m) => m.id !== mcqId),
    }))
  }

  const addStep = () => {
    if (!currentStep.name || !currentStep.description) return

    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      name: currentStep.name,
      description: currentStep.description,
      required: currentStep.required || true,
      order: workflow.steps.length + 1,
      status: (currentStep.status as "active" | "inactive") || "active",
      estimatedTime: currentStep.estimatedTime || "30 minutes",
      assignedRole: currentStep.assignedRole || "user",
      conditions: currentStep.conditions?.filter((c) => c.trim()) || [],
      autoApproval: currentStep.autoApproval || false,
      notificationSettings: currentStep.notificationSettings || {
        email: true,
        sms: false,
        inApp: true,
      },
      formFields: currentStep.formFields || [],
      mcqQuestions: currentStep.mcqQuestions || [],
      passThreshold: currentStep.passThreshold || 70,
    }

    setWorkflow((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }))

    // Reset current step
    setCurrentStep({
      name: "",
      description: "",
      required: true,
      status: "active",
      estimatedTime: "30 minutes",
      assignedRole: "user",
      conditions: [""],
      autoApproval: false,
      notificationSettings: {
        email: true,
        sms: false,
        inApp: true,
      },
      formFields: [],
      mcqQuestions: [],
      passThreshold: 70,
    })
    setActiveStepTab("basic")
  }

  const removeStep = (stepId: string) => {
    setWorkflow((prev) => ({
      ...prev,
      steps: prev.steps
        .filter((s) => s.id !== stepId)
        .map((step, index) => ({
          ...step,
          order: index + 1,
        })),
    }))
  }

  const moveStep = (stepId: string, direction: "up" | "down") => {
    const steps = [...workflow.steps]
    const stepIndex = steps.findIndex((s) => s.id === stepId)

    if (direction === "up" && stepIndex > 0) {
      ;[steps[stepIndex], steps[stepIndex - 1]] = [steps[stepIndex - 1], steps[stepIndex]]
    } else if (direction === "down" && stepIndex < steps.length - 1) {
      ;[steps[stepIndex], steps[stepIndex + 1]] = [steps[stepIndex + 1], steps[stepIndex]]
    }

    // Update order numbers
    const updatedSteps = steps.map((step, index) => ({ ...step, order: index + 1 }))

    setWorkflow((prev) => ({ ...prev, steps: updatedSteps }))
  }

  const handleSave = () => {
    if (!workflow.name || !workflow.type || !workflow.category || workflow.steps.length === 0) {
      alert("Please fill in all required fields and add at least one step.")
      return
    }

    onSave(workflow)

    // Reset form
    setWorkflow({
      name: "",
      type: "",
      category: "",
      description: "",
      steps: [],
    })

    onOpenChange(false)
  }

  const updateCondition = (index: number, value: string) => {
    const newConditions = [...(currentStep.conditions || [])]
    newConditions[index] = value
    setCurrentStep((prev) => ({ ...prev, conditions: newConditions }))
  }

  const addCondition = () => {
    setCurrentStep((prev) => ({
      ...prev,
      conditions: [...(prev.conditions || []), ""],
    }))
  }

  const removeCondition = (index: number) => {
    setCurrentStep((prev) => ({
      ...prev,
      conditions: (prev.conditions || []).filter((_, i) => i !== index),
    }))
  }

  const updateFieldOption = (index: number, value: string) => {
    const newOptions = [...(currentField.options || [])]
    newOptions[index] = value
    setCurrentField((prev) => ({ ...prev, options: newOptions }))
  }

  const addFieldOption = () => {
    setCurrentField((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }))
  }

  const removeFieldOption = (index: number) => {
    setCurrentField((prev) => ({
      ...prev,
      options: (prev.options || []).filter((_, i) => i !== index),
    }))
  }

  const updateMCQOption = (index: number, value: string) => {
    const newOptions = [...currentMCQ.options]
    newOptions[index] = value
    setCurrentMCQ((prev) => ({ ...prev, options: newOptions }))
  }

  const getFieldTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <Type className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "textarea":
        return <FileText className="h-4 w-4" />
      case "select":
        return <Circle className="h-4 w-4" />
      case "checkbox":
        return <CheckSquare className="h-4 w-4" />
      case "radio":
        return <Circle className="h-4 w-4" />
      case "date":
        return <Calendar className="h-4 w-4" />
      case "file":
        return <Upload className="h-4 w-4" />
      case "number":
        return <Type className="h-4 w-4" />
      default:
        return <Type className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>Design a custom workflow with dynamic forms and assessments</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workflow Configuration */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Workflow Configuration</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workflow-name">Workflow Name *</Label>
                  <Input
                    id="workflow-name"
                    value={workflow.name}
                    onChange={(e) => setWorkflow((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Landing Page Access Control"
                  />
                </div>
                <div>
                  <Label htmlFor="workflow-type">Workflow Type *</Label>
                  <Select
                    value={workflow.type}
                    onValueChange={(value) => setWorkflow((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landing_page_access">Landing Page Access</SelectItem>
                      <SelectItem value="access_control">Access Control</SelectItem>
                      <SelectItem value="user_onboarding">User Onboarding</SelectItem>
                      <SelectItem value="approval_process">Approval Process</SelectItem>
                      <SelectItem value="verification">Verification</SelectItem>
                      <SelectItem value="custom">Custom Process</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="workflow-category">Category *</Label>
                <Select
                  value={workflow.category}
                  onValueChange={(value) => setWorkflow((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Access Control">Access Control</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="User Management">User Management</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="workflow-description">Description</Label>
                <Textarea
                  id="workflow-description"
                  value={workflow.description}
                  onChange={(e) => setWorkflow((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the purpose and scope of this workflow"
                  rows={3}
                />
              </div>
            </div>

            {/* Add Step Form */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold">Add Workflow Step</h3>

              <Tabs value={activeStepTab} onValueChange={setActiveStepTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="forms">Forms</TabsTrigger>
                  <TabsTrigger value="mcq">MCQ</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="step-name">Step Name *</Label>
                      <Input
                        id="step-name"
                        value={currentStep.name || ""}
                        onChange={(e) => setCurrentStep((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Request Submission"
                      />
                    </div>
                    <div>
                      <Label htmlFor="step-time">Estimated Time</Label>
                      <Input
                        id="step-time"
                        value={currentStep.estimatedTime || ""}
                        onChange={(e) => setCurrentStep((prev) => ({ ...prev, estimatedTime: e.target.value }))}
                        placeholder="e.g., 30 minutes"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="step-description">Step Description *</Label>
                    <Textarea
                      id="step-description"
                      value={currentStep.description || ""}
                      onChange={(e) => setCurrentStep((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe what happens in this step"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="step-role">Assigned Role</Label>
                      <Select
                        value={currentStep.assignedRole || ""}
                        onValueChange={(value) => setCurrentStep((prev) => ({ ...prev, assignedRole: value }))}
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
                        value={currentStep.status || ""}
                        onValueChange={(value) =>
                          setCurrentStep((prev) => ({ ...prev, status: value as "active" | "inactive" }))
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

                  <div>
                    <Label>Conditions</Label>
                    <div className="space-y-2 mt-2">
                      {(currentStep.conditions || [""]).map((condition, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={condition}
                            onChange={(e) => updateCondition(index, e.target.value)}
                            placeholder="Enter condition"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCondition(index)}
                            disabled={(currentStep.conditions || []).length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addCondition}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Condition
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="forms" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Add Form Field</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Field Type</Label>
                        <Select
                          value={currentField.type || "text"}
                          onValueChange={(value) =>
                            setCurrentField((prev) => ({ ...prev, type: value as FormField["type"] }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Input</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="textarea">Textarea</SelectItem>
                            <SelectItem value="select">Dropdown</SelectItem>
                            <SelectItem value="checkbox">Checkbox</SelectItem>
                            <SelectItem value="radio">Radio Group</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="file">File Upload</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Field Label *</Label>
                        <Input
                          value={currentField.label || ""}
                          onChange={(e) => setCurrentField((prev) => ({ ...prev, label: e.target.value }))}
                          placeholder="Enter field label"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Placeholder</Label>
                      <Input
                        value={currentField.placeholder || ""}
                        onChange={(e) => setCurrentField((prev) => ({ ...prev, placeholder: e.target.value }))}
                        placeholder="Enter placeholder text"
                      />
                    </div>

                    {(currentField.type === "select" ||
                      currentField.type === "radio" ||
                      currentField.type === "checkbox") && (
                      <div>
                        <Label>Options</Label>
                        <div className="space-y-2 mt-2">
                          {(currentField.options || [""]).map((option, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={option}
                                onChange={(e) => updateFieldOption(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeFieldOption(index)}
                                disabled={(currentField.options || []).length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addFieldOption}
                            className="w-full bg-transparent"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Option
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={currentField.required || false}
                        onCheckedChange={(checked) => setCurrentField((prev) => ({ ...prev, required: !!checked }))}
                      />
                      <Label>Required Field</Label>
                    </div>

                    <Button onClick={addFormField} disabled={!currentField.label} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Form Field
                    </Button>

                    {/* Display added fields */}
                    {(currentStep.formFields || []).length > 0 && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Added Fields:</h5>
                        {(currentStep.formFields || []).map((field) => (
                          <div key={field.id} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              {getFieldTypeIcon(field.type)}
                              <span className="text-sm">{field.label}</span>
                              {field.required && (
                                <Badge variant="outline" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFormField(field.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="mcq" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">MCQ Assessment</h4>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Pass Threshold:</Label>
                        <Input
                          type="number"
                          value={currentStep.passThreshold || 70}
                          onChange={(e) =>
                            setCurrentStep((prev) => ({ ...prev, passThreshold: Number(e.target.value) }))
                          }
                          className="w-20"
                          min="0"
                          max="100"
                        />
                        <span className="text-sm">%</span>
                      </div>
                    </div>

                    <div>
                      <Label>Question *</Label>
                      <Textarea
                        value={currentMCQ.question}
                        onChange={(e) => setCurrentMCQ((prev) => ({ ...prev, question: e.target.value }))}
                        placeholder="Enter your question"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Answer Options</Label>
                      <div className="space-y-2 mt-2">
                        {currentMCQ.options.map((option, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <RadioGroup
                              value={currentMCQ.correct.toString()}
                              onValueChange={(value) => setCurrentMCQ((prev) => ({ ...prev, correct: Number(value) }))}
                            >
                              <RadioGroupItem value={index.toString()} />
                            </RadioGroup>
                            <Input
                              value={option}
                              onChange={(e) => updateMCQOption(index, e.target.value)}
                              placeholder={`Option ${index + 1}`}
                              className="flex-1"
                            />
                            {index === currentMCQ.correct && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                Correct
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Points</Label>
                        <Input
                          type="number"
                          value={currentMCQ.points}
                          onChange={(e) => setCurrentMCQ((prev) => ({ ...prev, points: Number(e.target.value) }))}
                          min="1"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={addMCQQuestion}
                      disabled={!currentMCQ.question || currentMCQ.options.some((opt) => !opt.trim())}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add MCQ Question
                    </Button>

                    {/* Display added MCQ questions */}
                    {(currentStep.mcqQuestions || []).length > 0 && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Added Questions:</h5>
                        {(currentStep.mcqQuestions || []).map((mcq, index) => (
                          <div key={mcq.id} className="p-3 border rounded">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm mb-2">
                                  Q{index + 1}: {mcq.question}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {mcq.options.length} options • {mcq.points} point(s)
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeMCQQuestion(mcq.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={currentStep.required || false}
                        onCheckedChange={(checked) => setCurrentStep((prev) => ({ ...prev, required: checked }))}
                      />
                      <Label>Required Step</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={currentStep.autoApproval || false}
                        onCheckedChange={(checked) => setCurrentStep((prev) => ({ ...prev, autoApproval: checked }))}
                      />
                      <Label>Auto Approval</Label>
                    </div>
                  </div>

                  <div>
                    <Label>Notification Settings</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={currentStep.notificationSettings?.email || false}
                          onCheckedChange={(checked) =>
                            setCurrentStep((prev) => ({
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
                          checked={currentStep.notificationSettings?.sms || false}
                          onCheckedChange={(checked) =>
                            setCurrentStep((prev) => ({
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
                          checked={currentStep.notificationSettings?.inApp || false}
                          onCheckedChange={(checked) =>
                            setCurrentStep((prev) => ({
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
                </TabsContent>
              </Tabs>

              <Button onClick={addStep} className="w-full" disabled={!currentStep.name || !currentStep.description}>
                <Plus className="h-4 w-4 mr-2" />
                Add Step to Workflow
              </Button>
            </div>
          </div>

          {/* Workflow Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Workflow Preview</h3>

            {workflow.steps.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {workflow.steps
                  .sort((a, b) => a.order - b.order)
                  .map((step, index) => (
                    <Card key={step.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                              <div className="font-semibold">{step.name}</div>
                              {step.required && (
                                <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                  Required
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">{step.description}</div>
                            <div className="flex gap-2 text-xs mb-2">
                              <Badge variant="outline">{step.assignedRole}</Badge>
                              <Badge variant="outline">{step.estimatedTime}</Badge>
                              {step.autoApproval && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  Auto
                                </Badge>
                              )}
                            </div>

                            {/* Show form fields count */}
                            {step.formFields && step.formFields.length > 0 && (
                              <div className="text-xs text-blue-600 mb-1">
                                📝 {step.formFields.length} form field(s)
                              </div>
                            )}

                            {/* Show MCQ questions count */}
                            {step.mcqQuestions && step.mcqQuestions.length > 0 && (
                              <div className="text-xs text-green-600 mb-1">
                                ❓ {step.mcqQuestions.length} MCQ question(s) • {step.passThreshold}% pass rate
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveStep(step.id, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveStep(step.id, "down")}
                                disabled={index === workflow.steps.length - 1}
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeStep(step.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-lg font-medium mb-2">No steps added yet</div>
                <div className="text-sm">Add steps using the form on the left to build your workflow</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!workflow.name || !workflow.type || workflow.steps.length === 0}>
            <Save className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
