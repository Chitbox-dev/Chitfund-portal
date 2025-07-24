"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function RegistrationHeader({ currentStep, totalSteps }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 mb-8 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3 px-6 -mx-6 rounded-xl" : "bg-transparent py-5"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-blue-700">Chit Fund Portal</span>
          </Link>

          {scrolled && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              className="h-8 border-l border-gray-200 pl-3 flex items-center text-gray-500"
            >
              <span className="text-sm font-medium">
                Step {currentStep + 1}/{totalSteps}
              </span>
            </motion.div>
          )}
        </div>

        <Link href="/">
          <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-2" /> Exit
          </Button>
        </Link>
      </div>
    </header>
  )
}
