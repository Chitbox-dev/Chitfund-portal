"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle } from "lucide-react"

export default function UCFINScore() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const screens = [
    {
      type: "no-score",
      title: "No UCFIN score yet! There are 2 possible reasons",
      reasons: [
        "You may have never participated in a registered chit fund before",
        "Our system might not have enough data about your chit fund history",
      ],
      character: "/placeholder.svg?height=200&width=150",
      cta: "Play this game to find out how it works",
      ctaAction: "Start playing",
    },
    {
      type: "quiz",
      question: "CIBIL score is not the only credit score in India.",
      options: ["True", "False"],
      correctAnswer: "True",
      character: "/placeholder.svg?height=200&width=150",
    },
    {
      type: "quiz",
      question: "If you have life insurance & health insurance, it will improve your CIBIL score.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "While having insurance can protect you from unexpected financial distress, it is not considered by CIBIL to calculate your score.",
      character: "/placeholder.svg?height=200&width=150",
    },
  ]

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      setCurrentScreen(0) // Loop back to start for demo purposes
    }
  }

  const currentScreenData = screens[currentScreen]

  return (
    <div className="bg-chitfund-bg rounded-xl overflow-hidden shadow-md border border-gray-200">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-6"
        >
          {currentScreenData.type === "no-score" && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-chitfund-text-dark mb-4">{currentScreenData.title}</h3>

              <ul className="space-y-3 mb-6">
                {currentScreenData.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 flex-shrink-0">
                      <HelpCircle className="h-5 w-5 text-chitfund-blue-950" />
                    </div>
                    <p className="text-left text-chitfund-text-light">{reason}</p>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center mb-6">
                <img
                  src={currentScreenData.character || "/placeholder.svg"}
                  alt="Character"
                  className="h-48 object-contain"
                />
              </div>

              <p className="text-lg font-medium mb-6 text-chitfund-text-dark">{currentScreenData.cta}</p>

              <Button
                onClick={handleNext}
                className="w-full bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white py-3 rounded-xl"
              >
                {currentScreenData.ctaAction}
              </Button>
            </div>
          )}

          {currentScreenData.type === "quiz" && (
            <div>
              {/* Progress Circles */}
              <div className="flex justify-center gap-3 mb-6">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className={`h-5 w-5 rounded-full ${
                      index === currentScreen - 1
                        ? "bg-green-500"
                        : index === currentScreen
                          ? "bg-chitfund-blue-950"
                          : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="bg-white p-5 rounded-xl mb-6 shadow-sm">
                <p className="text-chitfund-text-dark font-medium">{currentScreenData.question}</p>
              </div>

              {/* Character */}
              <div className="flex justify-center mb-6">
                <img
                  src={currentScreenData.character || "/placeholder.svg"}
                  alt="Character"
                  className="h-48 object-contain"
                />
              </div>

              {/* Answer Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {currentScreenData.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`py-4 rounded-xl text-lg font-medium ${
                      option === "True"
                        ? "bg-red-100 text-red-800 border-red-300"
                        : "bg-green-100 text-green-800 border-green-300"
                    }`}
                    onClick={handleNext}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {/* Explanation */}
              {currentScreenData.explanation && (
                <div className="bg-blue-100 p-4 rounded-xl mb-6">
                  <p className="text-chitfund-text-light">{currentScreenData.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {currentScreenData.explanation && (
                <Button
                  onClick={handleNext}
                  className="w-full bg-chitfund-blue-950 hover:bg-chitfund-blue-900 text-white py-3 rounded-xl"
                >
                  Next question
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
