"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, FileText, BookOpen, Scale, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type ChapterType = {
  id: string
  title: string
  path: string
}

type ActType = {
  id: string
  title: string
  description?: string
  icon: React.ReactNode
  chapters: ChapterType[]
}

const ACTS_AND_RULES: ActType[] = [
  {
    id: "madras-chitfunds-act",
    title: "The Madras ChitFunds Act",
    description: "Regulatory framework for chit funds in Tamil Nadu",
    icon: <Scale className="h-5 w-5" />,
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/acts/madras-chitfunds-act/preliminary" },
      {
        id: "constitution",
        title: "Chapter II-Constitution and Registration",
        path: "/acts/madras-chitfunds-act/constitution",
      },
      { id: "foreman", title: "Chapter III-Foreman", path: "/acts/madras-chitfunds-act/foreman" },
      { id: "non-prized", title: "Chapter IV-Non-Prized Subscribers", path: "/acts/madras-chitfunds-act/non-prized" },
      { id: "prized", title: "Chapter V-Prized Subscribers", path: "/acts/madras-chitfunds-act/prized" },
      { id: "transfer", title: "Chapter VI-Transfer", path: "/acts/madras-chitfunds-act/transfer" },
      { id: "termination", title: "Chapter VII-Termination of Chits", path: "/acts/madras-chitfunds-act/termination" },
      {
        id: "inspection",
        title: "Chapter VIII-Inspection of Documents",
        path: "/acts/madras-chitfunds-act/inspection",
      },
      { id: "winding", title: "Chapter IX-Winding Up of Chits", path: "/acts/madras-chitfunds-act/winding" },
      { id: "officers", title: "Chapter X-Officers, Inspection and Fees", path: "/acts/madras-chitfunds-act/officers" },
      { id: "miscellaneous", title: "Chapter XI-Miscellaneous", path: "/acts/madras-chitfunds-act/miscellaneous" },
    ],
  },
  {
    id: "delhi-chit-fund-rules",
    title: "Delhi Chit Fund Rules",
    description: "Rules governing chit funds in Delhi",
    icon: <FileText className="h-5 w-5" />,
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/acts/delhi-chit-fund-rules/preliminary" },
      { id: "registration", title: "Chapter II-Registration", path: "/acts/delhi-chit-fund-rules/registration" },
      { id: "agreement", title: "Chapter III-Chit Agreement", path: "/acts/delhi-chit-fund-rules/agreement" },
      {
        id: "certificate",
        title: "Chapter IV-Certificate of Commencement",
        path: "/acts/delhi-chit-fund-rules/certificate",
      },
      { id: "security", title: "Chapter V-Furnishing of Security", path: "/acts/delhi-chit-fund-rules/security" },
      {
        id: "foreman",
        title: "Chapter VI-A Foreman When Prized to Give Security",
        path: "/acts/delhi-chit-fund-rules/foreman",
      },
      {
        id: "filing",
        title: "Chapter VII-Filing of Chit etc.Records With The Registrar",
        path: "/acts/delhi-chit-fund-rules/filing",
      },
      {
        id: "transfer",
        title: "Chapter VIII-Transfer of Right of The Foreman",
        path: "/acts/delhi-chit-fund-rules/transfer",
      },
      {
        id: "registers",
        title: "Chapter IX-Registers and Books of Account",
        path: "/acts/delhi-chit-fund-rules/registers",
      },
      {
        id: "inspection",
        title: "Chapter X-Inspection of Chit Books and Records",
        path: "/acts/delhi-chit-fund-rules/inspection",
      },
      {
        id: "registrar",
        title: "Chapter XI-The Registrar and Inspecting Officer to have Power of Court in Some Matters",
        path: "/acts/delhi-chit-fund-rules/registrar",
      },
      {
        id: "maintenance",
        title: "Chapter XII-Maintenance and Custody Books, Paper and Documents etc. in the Registrar's Office",
        path: "/acts/delhi-chit-fund-rules/maintenance",
      },
      { id: "winding", title: "Chapter XIII-Winding Up of Chit", path: "/acts/delhi-chit-fund-rules/winding" },
      { id: "fees", title: "Chapter XIV-Different kinds of Fees", path: "/acts/delhi-chit-fund-rules/fees" },
    ],
  },
  {
    id: "chit-funds-act-1982",
    title: "The Chit Funds Act, 1982",
    description: "Central legislation governing chit funds in India",
    icon: <BookOpen className="h-5 w-5" />,
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/acts/chit-funds-act-1982/preliminary" },
      { id: "registration", title: "Chapter II-Registration", path: "/acts/chit-funds-act-1982/registration" },
      { id: "foreman", title: "Chapter III-Foreman", path: "/acts/chit-funds-act-1982/foreman" },
      { id: "winding", title: "Chapter IV-Winding up of chits", path: "/acts/chit-funds-act-1982/winding" },
      { id: "fees", title: "Chapter V-Fees", path: "/acts/chit-funds-act-1982/fees" },
      { id: "disputes", title: "Chapter VI-Disputes and Arbitration", path: "/acts/chit-funds-act-1982/disputes" },
      { id: "miscellaneous", title: "Chapter VII-Miscellaneous", path: "/acts/chit-funds-act-1982/miscellaneous" },
      { id: "appendix", title: "APPENDIX I", path: "/acts/chit-funds-act-1982/appendix" },
    ],
  },
  {
    id: "delhi-chit-fund-rules-2007",
    title: "Delhi Chit Fund Rules, 2007",
    description: "Updated rules for chit funds in Delhi",
    icon: <FileText className="h-5 w-5" />,
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/acts/delhi-chit-fund-rules-2007/preliminary" },
      { id: "registration", title: "Chapter II-Registration", path: "/acts/delhi-chit-fund-rules-2007/registration" },
      {
        id: "chit-agreement",
        title: "Chapter III-Chit Agreement",
        path: "/acts/delhi-chit-fund-rules-2007/chit-agreement",
      },
      // Add more chapters as needed
    ],
  },
  {
    id: "prize-chits-money-circulation-schemes-act-1978",
    title: "The Prize Chits and Money Circulation Schemes (Banking) Act 1978",
    description: "Legislation to ban prize chits and money circulation schemes",
    icon: <AlertCircle className="h-5 w-5" />,
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/acts/prize-chits-act-1978/preliminary" },
      {
        id: "prohibition",
        title: "Chapter II-Prohibition of Prize Chits and Money Circulation Schemes",
        path: "/acts/prize-chits-act-1978/prohibition",
      },
      // Add more chapters as needed
    ],
  },
  {
    id: "prize-chits-money-circulation-schemes-delhi-rules-1980",
    title: "The Prize Chits and Money Circulation Schemes (Banking Delhi) Rules, 1980",
    description: "Delhi-specific rules for prize chits and money circulation schemes",
    icon: <AlertCircle className="h-5 w-5" />,
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/acts/prize-chits-delhi-rules-1980/preliminary" },
      {
        id: "powers",
        title: "Chapter II-Powers of Authorized Officers",
        path: "/acts/prize-chits-delhi-rules-1980/powers",
      },
      // Add more chapters as needed
    ],
  },
  {
    id: "delhi-protection-depositors-act-2001",
    title: "The Delhi Protection of Interests of Depositors (In Financial Establishments) Act, 2001",
    description: "Act to protect interests of depositors in Delhi",
    icon: <Scale className="h-5 w-5" />,
    chapters: [
      {
        id: "preliminary",
        title: "Chapter I-Preliminary",
        path: "/acts/delhi-protection-depositors-act-2001/preliminary",
      },
      {
        id: "attachment",
        title: "Chapter II-Attachment of Properties",
        path: "/acts/delhi-protection-depositors-act-2001/attachment",
      },
      // Add more chapters as needed
    ],
  },
]

export default function ActsAndRulesHeader() {
  const [activeAct, setActiveAct] = useState<string | null>(null)

  const toggleAct = (actId: string) => {
    setActiveAct(activeAct === actId ? null : actId)
  }

  return (
    <div className="w-full">
      {/* Main Header */}
      <div className="bg-gradient-to-r from-chitfund-blue-950 to-blue-800 text-white py-4 px-6 rounded-t-lg shadow-md">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Scale className="h-6 w-6" />
          <span>Chit Fund Legal Framework</span>
        </h2>
        <p className="text-blue-100 text-sm mt-1">Acts, Rules, and Regulations governing Chit Funds in India</p>
      </div>

      {/* Acts and Rules Navigation */}
      <div className="bg-white border border-gray-200 rounded-b-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {ACTS_AND_RULES.map((act) => (
            <div key={act.id} className="relative">
              <button
                onClick={() => toggleAct(act.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 text-left transition-colors",
                  activeAct === act.id ? "bg-blue-50" : "hover:bg-gray-50",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center",
                      activeAct === act.id ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600",
                    )}
                  >
                    {act.icon}
                  </div>
                  <div>
                    <h3 className={cn("font-medium", activeAct === act.id ? "text-blue-700" : "text-gray-800")}>
                      {act.title}
                    </h3>
                    {act.description && <p className="text-xs text-gray-500 mt-0.5">{act.description}</p>}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-400 transition-transform",
                    activeAct === act.id ? "transform rotate-180" : "",
                  )}
                />
              </button>

              <AnimatePresence>
                {activeAct === act.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-gray-50"
                  >
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {act.chapters.map((chapter) => (
                        <Link
                          key={chapter.id}
                          href={chapter.path}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-100 transition-colors text-sm text-gray-700 hover:text-blue-700"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                          <span>{chapter.title}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
