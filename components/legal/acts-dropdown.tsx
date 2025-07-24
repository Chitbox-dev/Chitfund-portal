"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, FileText, Scale } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ACTS_AND_RULES = [
  {
    id: "madras-chitfunds-act",
    title: "The Madras ChitFunds Act",
    path: "/acts/madras-chitfunds-act/preliminary",
  },
  {
    id: "delhi-chit-fund-rules",
    title: "Delhi Chit Fund Rules",
    path: "/acts/delhi-chit-fund-rules/preliminary",
  },
  {
    id: "chit-funds-act-1982",
    title: "The Chit Funds Act, 1982",
    path: "/acts/chit-funds-act-1982/preliminary",
  },
  {
    id: "delhi-chit-fund-rules-2007",
    title: "Delhi Chit Fund Rules, 2007",
    path: "/acts/delhi-chit-fund-rules-2007/preliminary",
  },
  {
    id: "prize-chits-act",
    title: "The Prize Chits and Money Circulation Schemes Act",
    path: "/acts/prize-chits-act/preliminary",
  },
]

export default function ActsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium"
      >
        Act and Rules <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 overflow-hidden"
          >
            <div className="py-2">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Legal Framework</span>
                </div>
              </div>
              <div className="py-1">
                {ACTS_AND_RULES.map((act) => (
                  <Link
                    key={act.id}
                    href={act.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{act.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-100">
                <Link
                  href="/legal/acts-and-rules"
                  className="block text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  View All Acts and Rules
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
