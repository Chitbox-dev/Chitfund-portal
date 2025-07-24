"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define the structure for all acts and their chapters
const ACTS_AND_RULES = [
  {
    id: "madras-chitfunds-act",
    title: "The Madras ChitFunds Act",
    path: "/legal/acts/madras-chitfunds-act",
    hasSubmenu: true,
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/legal/acts/madras-chitfunds-act/preliminary" },
      {
        id: "constitution",
        title: "Chapter II-Constitution and Registration",
        path: "/legal/acts/madras-chitfunds-act/constitution",
      },
      { id: "foreman", title: "Chapter III-Foreman", path: "/legal/acts/madras-chitfunds-act/foreman" },
      {
        id: "non-prized",
        title: "Chapter IV-Non-Prized Subscribers",
        path: "/legal/acts/madras-chitfunds-act/non-prized",
      },
      { id: "prized", title: "Chapter V-Prized Subscribers", path: "/legal/acts/madras-chitfunds-act/prized" },
      { id: "transfer", title: "Chapter VI-Transfer", path: "/legal/acts/madras-chitfunds-act/transfer" },
      {
        id: "termination",
        title: "Chapter VII-Termination of Chits",
        path: "/legal/acts/madras-chitfunds-act/termination",
      },
      {
        id: "inspection",
        title: "Chapter VIII-Inspection of Documents",
        path: "/legal/acts/madras-chitfunds-act/inspection",
      },
      { id: "winding", title: "Chapter IX-Winding Up of Chits", path: "/legal/acts/madras-chitfunds-act/winding" },
      {
        id: "officers",
        title: "Chapter X-Officers, Inspection and Fees",
        path: "/legal/acts/madras-chitfunds-act/officers",
      },
      {
        id: "miscellaneous",
        title: "Chapter XI-Miscellaneous",
        path: "/legal/acts/madras-chitfunds-act/miscellaneous",
      },
    ],
  },
  {
    id: "delhi-chit-fund-rules",
    title: "Delhi Chit Fund Rules",
    path: "/legal/acts/delhi-chit-fund-rules",
    hasSubmenu: true,
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/legal/acts/delhi-chit-fund-rules/preliminary" },
      { id: "registration", title: "Chapter II-Registration", path: "/legal/acts/delhi-chit-fund-rules/registration" },
      { id: "agreement", title: "Chapter III-Chit Agreement", path: "/legal/acts/delhi-chit-fund-rules/agreement" },
      {
        id: "certificate",
        title: "Chapter IV-Certificate of Commencement",
        path: "/legal/acts/delhi-chit-fund-rules/certificate",
      },
      { id: "security", title: "Chapter V-Furnishing of Security", path: "/legal/acts/delhi-chit-fund-rules/security" },
      {
        id: "foreman",
        title: "Chapter VI-A Foreman When Prized to Give Security",
        path: "/legal/acts/delhi-chit-fund-rules/foreman",
      },
      {
        id: "filing",
        title: "Chapter VII-Filing of Chit etc.Records With The Registrar",
        path: "/legal/acts/delhi-chit-fund-rules/filing",
      },
      {
        id: "transfer",
        title: "Chapter VIII-Transfer of Right of The Foreman",
        path: "/legal/acts/delhi-chit-fund-rules/transfer",
      },
      {
        id: "registers",
        title: "Chapter IX-Registers and Books of Account",
        path: "/legal/acts/delhi-chit-fund-rules/registers",
      },
      {
        id: "inspection",
        title: "Chapter X-Inspection of Chit Books and Records",
        path: "/legal/acts/delhi-chit-fund-rules/inspection",
      },
      {
        id: "registrar",
        title: "Chapter XI-The Registrar and Inspecting Officer to have Power of Court in Some Matters",
        path: "/legal/acts/delhi-chit-fund-rules/registrar",
      },
      {
        id: "maintenance",
        title: "Chapter XII-Maintenance and Custody Books, Paper and Documents etc. in the Registrar's Office",
        path: "/legal/acts/delhi-chit-fund-rules/maintenance",
      },
      { id: "winding", title: "Chapter XIII-Winding Up of Chit", path: "/legal/acts/delhi-chit-fund-rules/winding" },
      { id: "fees", title: "Chapter XIV-Different kinds of Fees", path: "/legal/acts/delhi-chit-fund-rules/fees" },
    ],
  },
  {
    id: "chit-funds-act-1982",
    title: "The Chit Funds Act, 1982",
    path: "/legal/acts/chit-funds-act-1982",
    hasSubmenu: false,
    chapters: [],
  },
  {
    id: "delhi-chit-fund-rules-2007",
    title: "Delhi Chit Fund Rules, 2007",
    path: "/legal/acts/delhi-chit-fund-rules-2007",
    hasSubmenu: true,
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/legal/acts/delhi-chit-fund-rules-2007/preliminary" },
      {
        id: "registration",
        title: "Chapter II-Registration",
        path: "/legal/acts/delhi-chit-fund-rules-2007/registration",
      },
      {
        id: "foreman",
        title: "Chapter III-Foreman",
        path: "/legal/acts/delhi-chit-fund-rules-2007/foreman",
      },
      {
        id: "winding",
        title: "Chapter IV-Winding up of chits",
        path: "/legal/acts/delhi-chit-fund-rules-2007/winding",
      },
      {
        id: "fees",
        title: "Chapter V-Fees",
        path: "/legal/acts/delhi-chit-fund-rules-2007/fees",
      },
      {
        id: "disputes",
        title: "Chapter VI-Disputes and Arbitration",
        path: "/legal/acts/delhi-chit-fund-rules-2007/disputes",
      },
      {
        id: "miscellaneous",
        title: "Chapter VII-Miscellaneous",
        path: "/legal/acts/delhi-chit-fund-rules-2007/miscellaneous",
      },
      {
        id: "appendix",
        title: "APPENDIX I",
        path: "/legal/acts/delhi-chit-fund-rules-2007/appendix",
      },
    ],
  },
  {
    id: "prize-chits-act-1978",
    title: "The Prize Chits and Money Circulation Schemes (Banking) Act 1978",
    path: "/legal/acts/prize-chits-act-1978",
    hasSubmenu: false,
    chapters: [],
  },
  {
    id: "prize-chits-delhi-rules-1980",
    title: "The Prize Chits and Money Circulation Schemes (Banking Delhi) Rules, 1980",
    path: "/legal/acts/prize-chits-delhi-rules-1980",
    hasSubmenu: false,
    chapters: [],
  },
  {
    id: "delhi-protection-depositors-act-2001",
    title: "The Delhi Protection of Interests of Depositors (In Financial Establishments) Act, 2001",
    path: "/legal/acts/delhi-protection-depositors-act-2001",
    hasSubmenu: false,
    chapters: [],
  },
]

export default function ActsDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredAct, setHoveredAct] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHoveredAct(null)
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
        className="flex items-center gap-1 text-slate-200 hover:text-white font-medium text-sm tracking-wide transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Acts and Rules
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Link
              href="/legal/acts/chit-funds-act-1982/preliminary"
              className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Chit Funds Act, 1982
            </Link>
            <Link
              href="/legal/acts/madras-chitfunds-act/preliminary"
              className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Madras Chit Funds Act
            </Link>
            <Link
              href="/legal/acts/delhi-chit-fund-rules/preliminary"
              className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Delhi Chit Fund Rules
            </Link>
            <Link
              href="/legal/acts/delhi-chit-fund-rules-2007/preliminary"
              className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Delhi Chit Fund Rules 2007
            </Link>
            <div className="border-t border-slate-200 mt-2 pt-2">
              <Link
                href="/legal/acts-and-rules"
                className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors font-medium"
              >
                View All Acts and Rules →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
