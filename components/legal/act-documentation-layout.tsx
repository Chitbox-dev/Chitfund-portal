"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Download, Printer, BookOpen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Chapter {
  id: string
  title: string
  path: string
  isActive?: boolean
}

interface Act {
  id: string
  title: string
  path: string
  isExpanded?: boolean
  isActive?: boolean
  chapters: Chapter[]
}

interface ActDocumentationLayoutProps {
  children: React.ReactNode
  currentAct: string
  currentChapter: string
  title: string
  subtitle?: string
  year?: string
}

// Define the structure for all acts and their chapters
const ACTS_AND_RULES: Act[] = [
  {
    id: "madras-chitfunds-act",
    title: "The Madras ChitFunds Act",
    path: "/legal/acts/madras-chitfunds-act",
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
    path: "/legal/acts/delhi-chit-fund-rules-2007",
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
    chapters: [
      { id: "preliminary", title: "Chapter I-Preliminary", path: "/legal/acts/prize-chits-act-1978/preliminary" },
      {
        id: "prohibition",
        title: "Chapter II-Prohibition of Prize Chits and Money Circulation Schemes",
        path: "/legal/acts/prize-chits-act-1978/prohibition",
      },
    ],
  },
  {
    id: "prize-chits-delhi-rules-1980",
    title: "The Prize Chits and Money Circulation Schemes (Banking Delhi) Rules, 1980",
    path: "/legal/acts/prize-chits-delhi-rules-1980",
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
    ],
  },
  {
    id: "delhi-protection-depositors-act-2001",
    title: "The Delhi Protection of Interests of Depositors (In Financial Establishments) Act, 2001",
    path: "/legal/acts/delhi-protection-depositors-act-2001",
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
    ],
  },
]

export default function ActDocumentationLayout({
  children,
  currentAct,
  currentChapter,
  title,
  subtitle,
  year,
}: ActDocumentationLayoutProps) {
  const [expandedActs, setExpandedActs] = useState<string[]>([currentAct])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleAct = (actId: string) => {
    setExpandedActs((prev) => (prev.includes(actId) ? prev.filter((id) => id !== actId) : [...prev, actId]))
  }

  // Mark current act and chapter as active
  const acts = ACTS_AND_RULES.map((act) => ({
    ...act,
    isExpanded: expandedActs.includes(act.id),
    isActive: act.id === currentAct,
    chapters: act.chapters.map((chapter) => ({
      ...chapter,
      isActive: act.id === currentAct && chapter.id === currentChapter,
    })),
  }))

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-chitfund-blue-950 text-white">
          <h2 className="text-lg font-bold">Navigation</h2>
        </div>

        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search acts and chapters..."
              className="w-full pl-9 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {acts.map((act) => (
            <div key={act.id} className="border-b border-gray-200">
              <button
                onClick={() => toggleAct(act.id)}
                className={cn(
                  "w-full text-left px-4 py-3 flex items-center justify-between",
                  act.isActive ? "bg-amber-100 font-medium" : "hover:bg-gray-50",
                )}
              >
                <span className="text-sm">{act.title}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-transform",
                    act.isExpanded ? "transform rotate-180" : "",
                  )}
                />
              </button>

              {act.isExpanded && (
                <div className="bg-gray-50">
                  {act.chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={chapter.path}
                      className={cn(
                        "block px-4 py-2.5 text-sm border-l-4",
                        chapter.isActive
                          ? "border-amber-500 bg-amber-50 font-medium"
                          : "border-transparent hover:bg-gray-100",
                      )}
                    >
                      {chapter.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            {year && <p className="text-gray-500 text-sm mt-1">{year}</p>}

            <div className="flex mt-4 gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span>View Full Act</span>
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="prose max-w-none">{children}</div>
        </div>
      </div>
    </div>
  )
}
