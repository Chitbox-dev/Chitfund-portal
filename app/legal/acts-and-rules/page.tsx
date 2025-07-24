"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define the structure for all acts and their chapters
const ACTS_AND_RULES = [
  {
    id: "madras-chitfunds-act",
    title: "The Madras ChitFunds Act",
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
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/legal/acts/chit-funds-act-1982/preliminary" },
      { id: "registration", title: "Chapter II-Registration", path: "/legal/acts/chit-funds-act-1982/registration" },
      { id: "foreman", title: "Chapter III-Foreman", path: "/legal/acts/chit-funds-act-1982/foreman" },
      { id: "winding", title: "Chapter IV-Winding up of chits", path: "/legal/acts/chit-funds-act-1982/winding" },
      { id: "fees", title: "Chapter V-Fees", path: "/legal/acts/chit-funds-act-1982/fees" },
      {
        id: "disputes",
        title: "Chapter VI-Disputes and Arbitration",
        path: "/legal/acts/chit-funds-act-1982/disputes",
      },
      {
        id: "miscellaneous",
        title: "Chapter VII-Miscellaneous",
        path: "/legal/acts/chit-funds-act-1982/miscellaneous",
      },
      { id: "appendix", title: "APPENDIX I", path: "/legal/acts/chit-funds-act-1982/appendix" },
    ],
  },
  {
    id: "delhi-chit-fund-rules-2007",
    title: "Delhi Chit Fund Rules, 2007",
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/legal/acts/delhi-chit-fund-rules-2007/preliminary" },
      {
        id: "registration",
        title: "Chapter II-Registration",
        path: "/legal/acts/delhi-chit-fund-rules-2007/registration",
      },
      {
        id: "chit-agreement",
        title: "Chapter III-Chit Agreement",
        path: "/legal/acts/delhi-chit-fund-rules-2007/chit-agreement",
      },
      // Add more chapters as needed
    ],
  },
  {
    id: "prize-chits-act-1978",
    title: "The Prize Chits and Money Circulation Schemes (Banking) Act 1978",
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/legal/acts/prize-chits-act-1978/preliminary" },
      {
        id: "prohibition",
        title: "Chapter II-Prohibition of Prize Chits and Money Circulation Schemes",
        path: "/legal/acts/prize-chits-act-1978/prohibition",
      },
      // Add more chapters as needed
    ],
  },
  {
    id: "prize-chits-delhi-rules-1980",
    title: "The Prize Chits and Money Circulation Schemes (Banking Delhi) Rules, 1980",
    chapters: [
      {
        id: "preliminary",
        title: "Chapter I-Preliminary",
        path: "/legal/acts/prize-chits-delhi-rules-1980/preliminary",
      },
      {
        id: "powers",
        title: "Chapter II-Powers of Authorized Officers",
        path: "/legal/acts/prize-chits-delhi-rules-1980/powers",
      },
      // Add more chapters as needed
    ],
  },
  {
    id: "delhi-protection-depositors-act-2001",
    title: "The Delhi Protection of Interests of Depositors (In Financial Establishments) Act, 2001",
    chapters: [
      {
        id: "preliminary",
        title: "Chapter I-Preliminary",
        path: "/legal/acts/delhi-protection-depositors-act-2001/preliminary",
      },
      {
        id: "attachment",
        title: "Chapter II-Attachment of Properties",
        path: "/legal/acts/delhi-protection-depositors-act-2001/attachment",
      },
      // Add more chapters as needed
    ],
  },
]

export default function ActsAndRulesPage() {
  const [expandedAct, setExpandedAct] = useState<string | null>(null)

  const toggleAct = (actId: string) => {
    setExpandedAct(expandedAct === actId ? null : actId)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Acts and Rules</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal framework governing chit funds in India, including acts, rules, and regulations at
            central and state levels.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {ACTS_AND_RULES.map((act) => (
            <div key={act.id} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleAct(act.id)}
                className="w-full text-left py-4 px-6 bg-chitfund-blue-950 text-white hover:bg-blue-900 transition-colors flex justify-between items-center"
              >
                <span>{act.title}</span>
                <ChevronRight className={`h-5 w-5 transition-transform ${expandedAct === act.id ? "rotate-90" : ""}`} />
              </button>

              <AnimatePresence>
                {expandedAct === act.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y divide-gray-200">
                      {act.chapters.map((chapter) => (
                        <Link
                          key={chapter.id}
                          href={chapter.path}
                          className="block py-3 px-6 bg-chitfund-blue-950 text-white hover:bg-blue-800 transition-colors"
                        >
                          {chapter.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Understanding Chit Fund Regulations</h2>
          <p className="text-gray-600 mb-4">
            Chit funds in India are regulated by both central and state legislation. The Chit Funds Act, 1982 is the
            central legislation that provides a comprehensive framework for the regulation of chit funds throughout
            India, except in the state of Jammu and Kashmir.
          </p>
          <p className="text-gray-600 mb-4">
            Various states have their own rules under the central Act, such as the Delhi Chit Fund Rules, which provide
            specific guidelines for the operation of chit funds in Delhi. These rules cover aspects like registration,
            security requirements, maintenance of books and records, and more.
          </p>
          <p className="text-gray-600">
            To navigate the legal framework effectively, please refer to the specific acts and rules listed above. Each
            chapter provides detailed guidelines on different aspects of chit fund operations.
          </p>
        </div>
      </div>
    </div>
  )
}
