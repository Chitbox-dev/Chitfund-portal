"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
              <span className="font-bold text-xl text-gray-900">ChitFund Portal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                How It Works
              </Link>
              <Link href="/system-flow" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                System Flow
              </Link>

              {/* Legal Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center">
                  Legal <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/legal/acts-and-rules">Acts & Rules</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/legal/acts/chit-funds-act-1982/preliminary">Chit Funds Act 1982</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/access-request" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Access Request
              </Link>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/system-flow"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              System Flow
            </Link>
            <Link
              href="/legal/acts-and-rules"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Legal
            </Link>
            <Link
              href="/access-request"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Access Request
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 space-x-3">
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
