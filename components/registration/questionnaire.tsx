"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X, HelpCircle, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Questionnaire({ formData, updateFormData, onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(formData.questionnaireAnswers || {})
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = [
    {
      question: "UCFIN is only valid for one chit fund company.",
      options: [
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      correctAnswer: false,
      explanation:
        "UCFIN (Unique Chit Fund Identification Number) is a universal identifier that works across all registered chit fund companies. Once issued, you can use the same UCFIN for all your chit fund activities.",
    },
    {
      question: "A good Chit Score can help you get better auction opportunities in chit funds.",
      options: [
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      correctAnswer: true,
      explanation:
        "Similar to a credit score, your Chit Score reflects your reliability as a chit fund participant. A good score can give you access to premium schemes and better auction opportunities.",
    },
    {
      question: "You need to create a new UCFIN every time you join a new chit fund scheme.",
      options: [
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      correctAnswer: false,
      explanation:
        "Once issued, your UCFIN remains valid for life. You'll use the same UCFIN for all chit fund schemes you participate in, making it easier to track your investments.",
    },
    {
      question: "Chit funds are regulated by the Reserve Bank of India (RBI).",
      options: [
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      correctAnswer: false,
      explanation:
        "Chit funds in India are regulated by state governments under the Chit Funds Act, 1982, not by the RBI. Each state has its own registrar of chit funds who oversees the operations.",
    },
    {
      question: "Your Chit Score is affected by your payment history in chit funds.",
      options: [
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      correctAnswer: true,
      explanation:
        "Your payment history is one of the most important factors in determining your Chit Score. Timely payments improve your score, while missed or delayed payments can significantly lower it.",
    },
  ]

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(newAnswers)
    setShowExplanation(true)
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // All questions answered, proceed to next step
      updateFormData({ questionnaireAnswers: answers })
      onNext()
    }
  }

  const currentQuestionData = questions[currentQuestion]
  const hasAnswered = answers[currentQuestion] !== undefined
  const isCorrect = hasAnswered && answers[currentQuestion] === currentQuestionData.correctAnswer
  const progress = ((currentQuestion + (hasAnswered ? 1 : 0)) / questions.length) * 100

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-chitfund-text-dark">UCFIN Knowledge Check</h3>
        <p className="text-sm text-chitfund-text-light">
          Let's test your understanding of UCFIN and chit funds with a few questions
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-chitfund-text-light">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-chitfund-text-light">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 p-6"
        >
          {/* Question */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-5 rounded-xl">
              <p className="text-chitfund-text-dark font-medium">{currentQuestionData.question}</p>
            </div>

            {/* Character */}
            <div className="flex justify-center">
              <div className="relative">
                <img src="/placeholder.svg?height=200&width=150" alt="Character" className="h-48 object-contain" />
                <div className="absolute top-0 right-0 bg-blue-100 p-2 rounded-full">
                  <HelpCircle className="h-6 w-6 text-chitfund-blue-950" />
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentQuestionData.options.map((option, index) => (
                <Button
                  key={index}
                  variant={hasAnswered ? "default" : "outline"}
                  className={`py-4 rounded-xl text-lg font-medium ${
                    hasAnswered
                      ? option.value === currentQuestionData.correctAnswer
                        ? "bg-green-100 text-green-800 border-green-300"
                        : answers[currentQuestion] === option.value
                          ? "bg-red-100 text-red-800 border-red-300"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      : ""
                  }`}
                  onClick={() => !hasAnswered && handleAnswer(option.value)}
                  disabled={hasAnswered}
                >
                  {option.text}
                  {hasAnswered && option.value === currentQuestionData.correctAnswer && (
                    <CheckCircle className="ml-2 h-5 w-5 text-green-600" />
                  )}
                  {hasAnswered &&
                    answers[currentQuestion] === option.value &&
                    option.value !== currentQuestionData.correctAnswer && <X className="ml-2 h-5 w-5 text-red-600" />}
                </Button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 p-4 rounded-xl"
              >
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium mb-1">{isCorrect ? "Correct!" : "Incorrect!"}</p>
                    <p className="text-chitfund-text-light">{currentQuestionData.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="pt-4">
        {showExplanation && (
          <Button
            onClick={handleNext}
            className="w-full bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white flex items-center justify-center gap-2"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}{" "}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
