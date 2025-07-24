"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, ChevronRight, CheckCircle, Play } from "lucide-react"

interface UCFINEducationProps {
  onNext: () => void
  onBack: () => void
}

const educationModules = [
  {
    id: 1,
    title: "Introduction to Chit Funds",
    description: "Learn the basics of chit fund operations, benefits, and legal framework",
    duration: "5 min",
    completed: false,
    topics: [
      "What are Chit Funds?",
      "How do Chit Funds work?",
      "Benefits of joining Chit Funds",
      "Legal framework and regulations",
    ],
  },
  {
    id: 2,
    title: "UCFSIN System Overview",
    description: "Understand the Unified Chit Fund Identification Number system",
    duration: "4 min",
    completed: false,
    topics: [
      "Purpose of UCFSIN",
      "Benefits of UCFSIN registration",
      "How UCFSIN protects members",
      "Digital verification process",
    ],
  },
  {
    id: 3,
    title: "Rights and Responsibilities",
    description: "Know your rights as a member and responsibilities in chit fund participation",
    duration: "6 min",
    completed: false,
    topics: [
      "Member rights and protections",
      "Payment obligations",
      "Auction participation rules",
      "Grievance redressal mechanism",
    ],
  },
  {
    id: 4,
    title: "Risk Management",
    description: "Learn about potential risks and how to mitigate them",
    duration: "5 min",
    completed: false,
    topics: [
      "Understanding chit fund risks",
      "How to identify legitimate operators",
      "Red flags to watch out for",
      "Insurance and protection measures",
    ],
  },
]

export default function UCFINEducation({ onNext, onBack }: UCFINEducationProps) {
  const [modules, setModules] = useState(educationModules)
  const [currentModule, setCurrentModule] = useState<number | null>(null)
  const [showContent, setShowContent] = useState(false)

  const completedModules = modules.filter((m) => m.completed).length
  const progressPercentage = (completedModules / modules.length) * 100

  const startModule = (moduleId: number) => {
    setCurrentModule(moduleId)
    setShowContent(true)
  }

  const completeModule = (moduleId: number) => {
    setModules((prev) => prev.map((m) => (m.id === moduleId ? { ...m, completed: true } : m)))
    setCurrentModule(null)
    setShowContent(false)
  }

  const allModulesCompleted = modules.every((m) => m.completed)

  if (showContent && currentModule) {
    const module = modules.find((m) => m.id === currentModule)
    if (!module) return null

    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-[#1e3a8a]">{module.title}</CardTitle>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </div>
              <Badge variant="outline">{module.duration}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Module Content */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-[#1e3a8a] mb-4">Topics Covered:</h3>
              <ul className="space-y-3">
                {module.topics.map((topic, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Content Placeholder */}
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Interactive Learning Content</h4>
              <p className="text-gray-600 mb-4">
                This module contains interactive videos, animations, and quizzes to help you understand the concepts
                better.
              </p>
              <div className="bg-blue-100 rounded-lg p-4 text-left max-w-2xl mx-auto">
                <h5 className="font-semibold text-[#1e3a8a] mb-2">Key Learning Points:</h5>
                <ul className="text-sm text-[#3b82f6] space-y-1">
                  {module.topics.map((topic, index) => (
                    <li key={index}>• {topic}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Module Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={() => setShowContent(false)}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Back to Modules
              </Button>
              <Button
                onClick={() => completeModule(module.id)}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                Mark as Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <Card className="border-blue-200">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-[#1e3a8a] mb-2">UCFSIN Education Program</CardTitle>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete our comprehensive education program to understand chit funds, your rights, and how to participate
            safely.
          </p>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>
                {completedModules} of {modules.length} modules completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardHeader>
      </Card>

      {/* Education Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`border-2 transition-all duration-300 hover:shadow-lg ${
              module.completed ? "border-green-200 bg-green-50" : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-[#1e3a8a]">{module.title}</h3>
                    {module.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {module.duration}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-semibold text-gray-700">Topics:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {module.topics.slice(0, 3).map((topic, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-[#3b82f6] rounded-full"></div>
                      <span>{topic}</span>
                    </li>
                  ))}
                  {module.topics.length > 3 && (
                    <li className="text-[#3b82f6] font-medium">+{module.topics.length - 3} more topics</li>
                  )}
                </ul>
              </div>

              <Button
                onClick={() => startModule(module.id)}
                disabled={module.completed}
                className={`w-full ${
                  module.completed
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a]"
                } text-white`}
              >
                {module.completed ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Completed
                  </>
                ) : (
                  <>
                    Start Module
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completion Certificate */}
      {allModulesCompleted && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Congratulations!</h3>
            <p className="text-green-700 mb-4">
              You have successfully completed the UCFSIN Education Program. You are now ready to participate in chit
              funds safely and responsibly.
            </p>
            <Badge className="bg-green-600 text-white">Education Program Completed</Badge>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 bg-transparent"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!allModulesCompleted}
          className="flex-1 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a] text-white py-3 disabled:opacity-50"
        >
          Continue to Final Steps
        </Button>
      </div>
    </div>
  )
}
